---
title: Python Virtual Environments
subtitle: How to isolate Python versions and packages per project
date: 2026-02-17
language: English
tags:
  - python
  - venv
---
While working on audio to text feature I used python to implement it. It is my first step to get to know python a bit more. The problem I had is that my python was Python 3.14 — mlx-whisper requires Python 3.11. Python has this cool feature(?) where I can create virtual environment and install an isolated Python with its own set of packages. I had to run

```bash
 source venv/bin/activate
```

So currently I can switch back and forth when needed. Like it. 