---
title: Narrowing agent instructions
subtitle:
date: 2026-06-17
language: English
tags:
  - harness
  - short-post
---
The problem that had been bothering me for quite some time was that when I asked the agent to help me with something, it would first explain what it was going to do. It would ask itself a couple of questions and investigate the repository to answer some of the questions it had asked itself beforehand. That took a considerable amount of time, despite the fact that I had provided it only with files that should have been relevant to it. It seams to me that this prompt works well and solves its "need" to know more then necessary. 

```
---
description: Strictly scoped edit using only explicitly provided files
argument-hint: "<task>"
---

Work in strict scope for this task.

Treat files I explicitly reference with `@` as the working boundary. Read only those files unless I explicitly approve more context.

Do not search the repo, inspect nearby files, stories, assets, contracts, backend files, or documentation just to confirm usage. If required information is missing, stop and ask me instead of looking elsewhere.

Make only the minimal change requested. Do not opportunistically refactor, rename, clean up, or adjust surrounding code.

If code changes are made, run only the narrowest relevant quality check available for the changed file(s), then follow the project completion rules.

Task: $ARGUMENTS

```

I noticed that it still asked itself a question, but then, based on this prompt, it said that I didn't want it to check any files, so it stuck to the requirements. Probably what is also important is that it does not have any additional instructions. There are no agent.md files in repo or parent directories that might interfere with my prompt. 

This is also how I work with AI, I give him required context. 