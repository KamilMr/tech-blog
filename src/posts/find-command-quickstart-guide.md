---
date: 2025-09-01
language: English
title: Find Command Quickstart Guide
subtitle: Essential terminal find examples for daily use
tags:
  - Linux
  - Command-Line
---
I had nice morning today. I learned more about find command. 

I needed a quick reference for the `find` command while working on file management tasks. My current workflow was to google almost all the time. Now instead of constantly googling syntax I spend some time today to practice below commands. Had a lot of fun.

The `find` command is incredibly powerful but as almost all linux commands I learn has complex syntax that's easy to forget. Whether you're searching for files by name, size, or modification date, having examples at hand saves time.

### Basic Syntax
```bash
find [path] [options] [expression]
```

### Find Files by Name
```bash
find . -name "*.js"              # Find all .js files
find . -name "config*"           # Find files starting with "config"  
find . -iname "*.PDF"            # Case-insensitive search for .pdf files
```

### Find by File Type
```bash
find . -type f                   # Find files only
find . -type d                   # Find directories only
find . -type l                   # Find symbolic links
```

### Find by Size
```bash
find . -size +100M               # Files larger than 100MB
find . -size -1k                 # Files smaller than 1KB
find . -empty                    # Empty files/directories
```

### Find by Time
```bash
find . -mtime -7                 # Modified in last 7 days
find . -atime +30                # Accessed more than 30 days ago
find . -newer file.txt           # Newer than file.txt
```

### Find and Execute Actions
```bash
find . -name "*.tmp" -delete     # Find and delete .tmp files
find . -name "*.py" -exec grep -l "import os" {} \;
```

### Multiple Conditions
```bash
find . -name "*.js" -size +1M    # .js files larger than 1MB
find . -type f \( -name "*.jpg" -o -name "*.png" \)  # jpg OR png files
```

Having these examples readily available eliminates the need to remember complex syntax or search documentation repeatedly. The `find` command becomes much more approachable with practical examples.

# Links
- `man find` - Complete manual
- [GNU Find Documentation](https://www.gnu.org/software/findutils/)