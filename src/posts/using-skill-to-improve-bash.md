---
title: Using skill to learn new language.
subtitle:
date: 2026-07-05
language: English
tags:
  - skills
  - learning
---
So, I created a skill that is helping me learn. Today was my first day of practical learning with that skill. I would say it is very much for beginners. I need to improve it a little so it gives me a more advanced way of learning, because, for example, when I was practicing with it, it was giving me suggestions that I already knew. So I guess if you are new to the stuff, that skill works well.

https://github.com/KamilMr/lab/commit/826cb6981d79096496f65e4a67443a6638b40cac

And I produce this code.
```bash
#!/usr/bin/env bash
#
url=$1

if [[ -z "$url" ]]; then
  echo "Usage: ./health.sh <url>"
  exit 1
fi  

http_code=$(curl -s -o /dev/null -w "%{http_code}\n" "$url")
curl_exit=$?

if [[ "${curl_exit}" != 0 ]]; then
  echo "Host does not exist: $url"
  exit 1;
fi

if [[ "$http_code" == "200" ]]; then
  echo "healthy"
else 
  echo "unhealthy"
  exit 1
fi
```

I use `pi.dev` as the harness. 