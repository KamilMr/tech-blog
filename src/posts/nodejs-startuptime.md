---
title: Heart not beating yet
subtitle: Studying Nodejs startup time
date: 2026-01-23
language: English
tags:
  - Nodejs
---
Today I have been reading about Node.js startup time. Up until now, I've been thinking that when I type `node myapp.js`, the application just works. It's so fast. There is a simple black box that just works. I didn't think about how complicated it is. So today I've been diving deep into the Node.js internals. 

I understood that before my code is executed, there are so many things happening behind the scenes. 

When I start the application and pass arguments, all command-line arguments are parsed, and the V8 engine is woken up. The shared resources like thread pools for background tasks are set up and that happens only once. In the next step, a V8 Isolate is created. After that, a V8 Context is created inside that isolate. This is the place where objects, arrays, all built-in stuff, and the global object live. And only after that the event loop is initialized by libuv. The heart of the Node application is created, but it's not beating yet. The libuv thread pool is configured and its threads are standing by waiting for orders. The event loop will give them a job when it finds out that there is some task that is slow and blocking. And after that, the Node.js Environment is created. That environment is a glue that holds everything together. 

Now the Node.js standard library is loaded. They are partially JavaScript, but under the hood, there are C++ components that talk to the operating system. And then the bootstrap script is run, the script that builds up the JavaScript world we know in Node.js. It sets up the process object and creates the require function itself, and gets everything ready for my code. And the last step is my code that starts to run. 