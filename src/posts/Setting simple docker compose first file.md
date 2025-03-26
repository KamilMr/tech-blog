---
date: " 2025-03-26"
language: English
title: Learning Docker 
tags: Note
--- 

 I’m working on a simple module that uploads files from one directory to an S3 bucket. I’m trying to implement the sidecar pattern.

The first thing I learned today was how to use Docker Compose.

```yaml
version: '3.8'
services:
    ome:
    image: airensoft/ovenmediaengine:latest
    container_name: ome
    environment:
        - OME_HOST_IP=127.0.0.1
    volumes:
        - ${OME_DOCKER_HOME}/conf:/opt/ovenmediaengine/bin/origin_conf
        - ${OME_DOCKER_HOME}/logs:/var/log/ovenmediaengine
        - ${OME_DOCKER_HOME}/rec:/home
    ports:
        - '1935:1935'
        - '9999:9999/udp'
        - '9000:9000'
        - '3333:3333'
        - '3478:3478'
        - '10000-10009:10000-10009/udp'
    restart: unless-stopped
```