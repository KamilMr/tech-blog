---
title: I am learning new git commands
subtitle: 
date: 2025-06-26
language: English
tags:
  - git
---
##  git status --porcelain
This command offers a concise, machine-readable representation of the Git repository’s status, which is suitable for scripting. I had to learn this because I needed to develop logic that required me to know the number of files currently being edited. If the output is empty, it indicated that no files had been edited.

## git rev-parse name-of-branch
This is as I understand is a basic command that is used for script manipulation. Some tools are created based on this. Basically it gives SHA1 of the revision. Revision is name of the branch.

We can pass different options to get different results.  More on this in docs [post](https://git-scm.com/docs/git-rev-parse)

## git checkout stash@{0} -- path/to/your/file
This command get one file from the stash instead all what's there.

## git show `branch:file` > `file`

```bash
# example 
git show master:src/components/layouts/AppBar.jsx > src/components/layouts/AppBar.jsx
```
This will override current AppBar.jsx file with the one from master. `git show` gives you the body of a file and `>` will pass it and override file you give.