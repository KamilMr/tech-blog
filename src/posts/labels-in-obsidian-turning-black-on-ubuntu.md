---
date: " 2025-01-05"
language: English
title: Labels in Obsidian Turning Black on Ubuntu 22
tags:
  - Obsidian
---
On Ubuntu 22 (not sure about other systems), every few months I need to run the script below to fix an issue with labels turning black in Obsidian's graph view. The problem likely arises due to a cache issue.

```bash
 rm -rf ~/.config/obsidian/GPUCache/
```

I haven’t looked into the details of why this happens. For more information, see the link below:

# Links
https://forum.obsidian.md/t/in-graph-view-nodes-names-appear-all-black-or-white-without-showing-text/78398/3

[[obsidian]]