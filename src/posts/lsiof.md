---
title: lsof
subtitle: list open files
date: 2026-01-01
language: English
tags:
  - Nodejs
  - docker
---
This command displays a list of all files, sockets, and devices currently open/used by processes. 

I use this command to know what is running on a port, in this case 8080
```bash
lsof -i :8080
```