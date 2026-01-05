---
date: 2026-01-05
language: English
title: Vim Replace Entire File Content with External File
subtitle: Quick file content replacement using external commands
tags:
  - vim
  - productivity
---
New vim shortcut that I learned. This is part of the process of thinking Vim.

Sometimes you need to quickly replace entire file content with content from another file. Instead of copy-pasting, Vim offers a one-command solution. :-) 

## when?

You have a file open in Vim and want to replace all its content with content from another file. Maybe you're copying a configuration template or restoring from backup.

Then do: 

```vim
:%!cat /path/to/source/file
```

Short explanation: 
- `:%` = select all lines in current buffer
- `!cat` = execute external cat command  
- The result overwrites current buffer content

# Links 

- `:help :!` - Vim external command documentation