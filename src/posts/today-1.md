---
title: Just summary of my day
subtitle:
date: 2026-08-20
language: English
tags:
  - what-i-did
---
What I did today? 

- Working on renovate. I tried to group some of my updates into one PR. That seams to work.
  ```    
  {
      matchPackageNames: ["react", "react-dom"],
      matchUpdateTypes: ["patch", "minor", "major"],
      groupName: "React",
  },
  ```
- I refreshed my fundamental knowledge of Kubernetes. I tried to instal helm chart. That was quite fun.  Homarr failed to start because its database encryption key was set to a short word instead of a secure key, causing environment-variable validation to fail. 
  To fix it I generated secure 32-byte key with `openssl rand -hex 32`, storing it in a Kubernetes Secret, and restarting Homarr so it could load the new value.
- Then in our team we are moving (finally) to typescript. So I refresh basics of in https://www.executeprogram.com/courses/typescript-basics and started advanced course. 
- https://www.youtube.com/watch?v=sTLiqkMwJb4&feature=youtu.be Nice video - the untold story of Kubernetes.
- I did also yoga exercises with Andy: https://www.youtube.com/@YogaHomepl
- In the mean time I let agent to run test and compare different databases for prostezapisy.pl 

>Ai did not check my gramma this time. 