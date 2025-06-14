---
title: Recreated the MySQL Root User
subtitle: Using --skip-grant-tables to recover from accidental root deletion
date: 2025-06-07
language: English
tags:
  - Mysql
---

Some time ago, I removed the root user and was unable to perform certain actions on the database. I needed to recreate the root account. To do this, I first stopped the MySQL service:

```bash
# stop the normal service first
sudo systemctl stop mysql
```

Next, I restarted MySQL in a special mode that skips the grant tables, allowing unrestricted access without a password. This is useful for recovery but should be used cautiously:

```bash
# start in skip-grant mode, safely isolated
sudo mysqld_safe --skip-grant-tables --skip-networking &
# give it a moment sleep 5   

# opened a local client (no password needed) in another terminal instance
mysql

```

Inside the MySQL prompt, I reloaded the grant tables and recreated the root user:

```bash
# inside the MySQL prompt:
FLUSH PRIVILEGES;                       # In the `mysql` client, tell the server to reload the grant tables so that account-management statements work

CREATE USER 'root'@'localhost' IDENTIFIED BY 'Some0ngStrong!';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost' WITH GRANT OPTION;

FLUSH PRIVILEGES;
EXIT;
```

You should now be able to connect to the MySQL server as root using the new password. Stop the server and restart it in normal mode (without --skip-grant-tables and --skip-networking):

```bash
sudo systemctl start mysql   
mysql -u root -p             # test the new account, it should all work with new password created
```

To allow remote connections (if needed), create a root user accessible from any host:

```bash
CREATE USER 'root'@'%' IDENTIFIED BY 'SomePasswordH!ere';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
```

[Resetting MySQL Permissions (Official Docs)](https://dev.mysql.com/doc/refman/8.4/en/resetting-permissions.html)