---
title: Understanding journalctl
subtitle: The essential tool for reading systemd logs
date: 2025-12-30
language: English
tags:
  - linux
---
Today I learned about `journalctl`. This tool is used to investigate logs from systems based on `systemd`. With this command, it is much easier to investigate various logs. It is the main interface to query journals that are stored in binary format and already indexed. 

```bash
journalctl [OPTIONS] [FILTERS]
```

You can filter by service:

```bash
journalctl -u nginx           # specific service
journalctl -u nginx -u php-fpm  # multiple services
journalctl -u docker -f       # follow specific service
```

Or see disk usage and manipulate it

```bash
journalctl --disk-usage       # check current usage
journalctl --vacuum-size=500M # reduce to 500MB
journalctl --vacuum-time=2weeks # keep only last 2 weeks
```

To set a permanent limit, edit `/etc/systemd/journald.conf`:

```
[Journal]
SystemMaxUse=500M
```

## for help see:

```bash
journalctl --help
```