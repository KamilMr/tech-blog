---
title: How to Approach Debugging by Mark Erikson
subtitle: Notes from Mark Erikson's talk on making Immer twice as fast
date: 2026-04-22
language: English
tags:
  - debugging
---
https://www.youtube.com/watch?v=5l_cYsU7wgY
by: Mark Erikson

I listened to Mark Erikson's talk about how he made Immer twice as fast. Here are some notes that stood out to me.
# How to approach debugging
- Understand what the problem is.
- Reproduce it and understand when it's happening.
- Determine why the problem is happening, then narrow down the possibilities using a hypothesis, test, and experiment approach.
- Trace it to a root cause.
- Find the best way to fix it — it could be changing one line, changing a component, or changing the system approach. Fix the root cause, not the symptoms, and understand the constraints, severity, and code requirements.
- Document as much as possible.

- Use the right tools for the job. Keep a lot of tools in your toolbox.
- Be willing to dig into abstractions and look at underlying implementations. Sometimes that means looking at lower levels of code to understand behavior, and that includes third-party libraries. Be willing to dig into unfamiliar spaces in the code, including code you don't own, to understand what is happening beneath it.

- Eliminate unnecessary work.
- Cache work that has already been done.
- Parallelize the work across threads and machines.

- Set up a benchmark so you can test it now and after the implementation.