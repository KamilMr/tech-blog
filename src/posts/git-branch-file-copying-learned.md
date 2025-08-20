---
date: 2025-08-20
title: Git Branch File Copying - Problem and Solution
subtitle: Learning how to selectively copy files from one branch to another
language: English
tags:
  - git
  - branch-management
---

**Short reflection**

Today I encountered a git branching issue and learned a technique for selectively copying files between branches. 
The problem arose from a revert commit that accidentally removed important files while trying to preserve development work on another feature.

The challenge was selectively copying only specific directories/files without losing existing work

**The Solution:**
Used the `git checkout <branch> -- <path>` command to selectively copy files/directory from another branch:

```bash
# Copy entire directory from another branch
git checkout source-branch-name -- path/to/dir 

# Copy specific files
git checkout source-branch-name -- path/to/file.jsx

# Copy with patterns
git checkout source-branch-name -- path/to/*.jsx
```

**What the command does:**
- Takes files/directories from the specified branch at their current state
- Copies them to the current working directory
- Automatically stages the changes for commit
- Preserves the file structure and content exactly as they exist in the source branch
- Does not affect other files in the current branch

**Key Learning:**
This technique is especially useful when you need to restore accidentally deleted files or selectively incorporate features from other branches.

The files are immediately staged after copying, making it easy to review changes with `git diff --cached` before committing.
