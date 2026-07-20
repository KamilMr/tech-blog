---
title: Learning and adding cd.yaml
subtitle:
date: 2026-07-20
language: English
tags:
  - prostezapisy
  - what-i-did
---
Today I spent some time working on my CD pipeline better for [ProsteZapisy](prostezapisy.pl). It took me some time. I was so focus on adding more code to main app that I neglected CD/CI pipelines. 

 This was basic one: I push code to master, GitHub Actions connects to my server over SSH, pulls the newest code, rebuilds the API Docker container, and restarts it.

 ```text
   push to master
   → GitHub Actions starts
   → SSH into server
   → git pull
   → docker compose up -d --build api
 ```

 I learned couple of things. I also learned why it is better to pin GitHub Actions versions, for example:

 ```yaml
   appleboy/ssh-action@v1.2.5
 ```

 instead of using:

 ```yaml
   appleboy/ssh-action@master
 ```

because master can change in the future and break the pipeline without me changing anything. Small but useful information. 

