---
date: " 2024-08-08"
language: English
title: Linux command journey 1
subtitle: What command I have learned?
tags:
---
# Some cool Linux command I have learned this week:

Do you want some command run continuously for example every 1 sec? 
```bash
watch -n 1 "ls -1 | wc -l" #1
```

`watch` Every one second it will run command written inside `""`
`ls -1`: Lists the items in the directory, one item per line.
`|`: Pipes the output of the ls -1 command to the next command.
`wc -l`: Counts the number of lines

How about checking the disk size?

```bash
df -h #2
```

What if I want to know the specific directory size?

```bash
du -sh * 
```

I can also sort the output with `sort` command in human readable way

```bash
du -sh * | sort -h
```

I can pipie above output to another command that will display only needed number

```bash
du -sh * | sort -h | head -n 2 # only 2 items will be shown
```
# Links
[[Linux]]