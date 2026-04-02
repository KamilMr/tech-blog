---
title: Database Connections Were Leaking and I Didn't Know Why
subtitle: Debugging a connection pool leak
date: 2026-04-02
language: English
tags:
  - Nodejs
  - debugging
  - express
---
Today I fixed a problem that I've been experiencing from time to time. I have a connection pool of twenty connections to communicate with the database. Sometimes my server stopped responding. It didn't happen immediately or at a certain point. Sometimes after a couple of weeks of usage. In the console logs I saw all connections being used and that was the moment when the server stopped responding.

There were also cases where I saw that twenty connections had been used but the server was still responding. So my initial thought was the problem is related to database connections, but I was not able to pin it down.

## it was a normal set up

I create a pool of connections when the server starts. Every time a new request arrives, I pick one connection from the pool and keep using it throughout the request. At the end of the request I release it back. So the connection is tied to the request and available in every middleware along the way.

```js
// Middleware order
app.use(assignConnection);  // async — awaits pool.getConnection()
app.use(afterMiddleware);   // registers finish/close listeners HERE
```

To release the connection, I had a listener attached to the `finish` event in one of the later middleware. For some requests, that listener was not firing.

## finding the bug

I wrote three shell scripts to test this.

```bash
# sends normal requests
seq 1 "$COUNT" | xargs -P"$CONCURRENCY" -I{} \
  curl -s -o /dev/null -w "%{http_code}\n" --max-time "$MAX_TIME" "$URL" \
  -H "Authorization: Bearer $TOKEN"
```

```bash
# sends aborted requests to exhaust the pool
seq 1 "$COUNT" | xargs -P"$CONCURRENCY" -I{} \
  curl -s -o /dev/null --max-time 0.001 "$URL" \
  -H "Authorization: Bearer $TOKEN"
```

```bash
# checks if the server still responds
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 5 "$URL" \
  -H "Authorization: Bearer $TOKEN")
```

First I ran the load test with normal requests. The server handled them fine. Then I ran the connection leak test — aborted requests. After that, the health check came back dead. Destroying the request mid-flight was the root of the problem.

## Root cause

So what was actually happening?

When the server receives a request, it starts processing it. In the `assignConnection` middleware it asks the pool for a connection. This is an async operation — it awaits. By the time moves on to the next step, the client disconnects. The `close` event is emitted on the request, but no listener catches it because the listeners haven't been registered yet. They get registered later, in `afterMiddleware`.

```
getConnection()  →  [await]  →  beginTransaction()  →  afterMiddleware
                       ↑                                     ↑
                 client disconnects                   registers close listener
                 close event emits                    (too late)
```

By the time `afterMiddleware` runs and attaches the listeners, `req.destroyed` is already `true`. The `close` event has already been emitted and is gone. So the connection never gets released. It stays checked out from the pool until the server restarts.

## write about fix

The fix was simple. In `afterMiddleware`, before calling `next()`, I check if `req.destroyed` is already `true`. If it is, I release the connection and stop the middleware chain.

```js
// afterMiddleware
const release = () => { conn.rollback(); conn.release(); };
res.on('finish', release);
req.on('close', release);

if (req.destroyed) {
  release();
  return;
}
next();
```

The `finish` and `close` listeners still handle the normal case. The `req.destroyed` check catches the edge case when the event was emitted before the listeners were attached.
