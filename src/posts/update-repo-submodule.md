---
title: Submodule Update Cheatsheet
subtitle: minimal commands reminder
date: 2025-07-12
language: English
tags:
  - git
  - Cheatsheet
---
In one of **my projects** I have **a repository that contains a reference to another repository**. The first one is the main page; the second is the page where the client can book a session. **Because it is only a reference (a Git sub-module),** after changing the sub-module I need to update the main repo to point at the new commit. How do I do that?

I use those two commands in my root repo. First downloads the latest remote commits. And the second merge latest remote master into each submodule’s current branch

```bash
git submodule foreach --recursive git fetch
git submodule foreach git merge origin master
``` 

After running them I need to add and commit changes and then push changes to remote. 

```bash
git add .
git commit -m 'Update sub-module'
git push
```