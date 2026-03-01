---
title: Working on homelab
subtitle: Wake-on-LAN, External Storage, and Filebrowser Setup
date: 2026-03-01
language: English
tags:
  - homelab
  - linux
  - docker
---
Today was about setting up the home lab again. I set one of my old laptops to wake up on a LAN request. That gives me the ability to wake the computer up using its MAC address and the `wakeonlan` command in bash. I didn't want to run it all the time, but have it accessible when needed.

Then I moved on to finding and mounting external drives. I used `lsblk` / `lsblk -f` and then for some reason — still need to investigate — had to manually mount the drive to a specific location.

```bash
mount | grep sd # check what's mounted
sudo mount /dev/sdb3 /mnt/external # mount manually
```

I need to auto-mount it on boot by adding an entry to `/etc/fstab` with the `nofail` flag.

Then using `ncdu` I investigated what was on the external hard drive and how much space things were using.

Filebrowser — lightweight web UI for file management:
```bash
docker run -d --name filebrowser \
  --restart unless-stopped \
  -v /mnt/external:/srv \
  -v filebrowser_database:/database \
  -v filebrowser_config:/config \
  -p 8080:80 \
  filebrowser/filebrowser
```

