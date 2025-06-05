---
title: Kernel
subtitle: Learning about IO
date: 2025-06-05
language: English
tags:
  - Nodejs
  - Kernel
---

05/06/2025

Here are part of my notes of today’s kernel studies. I had to read them to understand more how libuv works. The kernel, however, is _not part of_ that library; _knowing how it works in this tiny aspect makes a difference when we want to understand blocking_.

Read, write and accept are blocking. This is the default behaviour. _Timeouts only limit how long the call blocks._ write blocks when the destination buffer is full. read will block when there is no data and accept will block _when_ no connection is pending.

Blocking means, for the user, that the thread is stuck in some operation like the ones mentioned before (networking, file I/O, etc.). One approach to solve it is to ask the kernel to notify _us_ when a file descriptor is ready. This is how epoll and kqueue work. This approach is called **readiness notification**. Another, **completion-based** approach is to submit a job to the kernel and get a completion event. IOCP and io_uring work this way; _the kernel performs the read and then reports completion._

Interesting, epoll _does_ work with files, but we need a completion approach for true asynchronous file I/O. _Regular files are always reported ready, so epoll does not provide asynchronicity here—the kernel immediately says “ready.”_

select was the first one. Basically, it is a bunch of file descriptors passed to the kernel. All fds are checked once per select(). If anything is ready, we do the job and pass it to a buffer. _Kernel scans the whole set each time—this is costly._

We register the interest list only once. Then we can use epoll_ctl to add or remove from the list. Then we do epoll_wait to see what is ready and execute it.

Syscalls in epoll copy data back and forth between kernel and user, _but only tiny event structures—the actual payload is not copied until we call_ read. 

[Link to Udemy course](https://www.udemy.com/course/nodejs-internals-and-architecture/learn/lecture/47890103#overview)
