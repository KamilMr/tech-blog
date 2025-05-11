---
title: Mysql security open port and firewall
subtitle: 
date: 2025-05-11
language: English
tags:
  - Mysql
---
I read about security guidelines in the MySQL documentation, and it got me interested in the topic. I learned that I need to check the firewall on my server and I could use for the following command to check whether I can connect to my MySQL instance from an external server:

```bash
$> telnet _server_host_ 3306
```

This port should not be accessible from untrusted hosts. For example, if I run the command above, the connection should either hang or be refused. Any other result may indicate that the port is accessible, which could be a security concern.