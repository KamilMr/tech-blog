---
title: "DB Pool Leak Fix Part 2: req.destroyed vs req.socket.destroyed"
subtitle: " The readable stream ends before the connection does"
date: 2026-04-08
language: English
tags:
  - Nodejs
  - express
---
In [this article](https://kamilmrowka.com/posts/db-pool-not-releasing), I wrote about a fix for db connection leaking.

In there I did something like this: 

```
if (req.destroyed) {
  release();
  return;
}
```

Apparently `req.destroyed` is set to true not only when the connection is destroyed but also during normal request processing. According to the documentation, destroyed "is `true` after [`request.destroy()`](https://nodejs.org/api/http.html#requestdestroyerror) has been called". And that follows readable stream rules — when all data is read, the stream is [automatically destroyed](https://github.com/nodejs/node/issues/42422#issuecomment-1074999429). The readable stream ends and `req.destroyed` becomes `true` while the socket is still alive. This means my check was a false positive on every request.

So, I had to look for something more reliable. I came to the finding that what I have to check is the request [socket destroyed](https://nodejs.org/api/net.html#socketdestroyed) property.

```
if (req.socket.destroyed) {
  release();
  return;
}
```

`req.socket.destroyed` reflects the TCP connection state, not the readable stream lifecycle. It is only `true` when the client actually drops the connection.

[Lab](https://github.com/KamilMr/lab/commit/88f341e8f946df46f81cdf28eb8c7c49b05746c6)
