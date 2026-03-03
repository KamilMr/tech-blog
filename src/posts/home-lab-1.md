---
title: Turning an Old Laptop into a Home Server
subtitle: Lid behavior, screen blanking and Docker setup on Ubuntu
date: 2026-03-03
language: English
tags:
  - docker
  - linux
  - homelab
---
Yesterday and today I've been working on my home lab. The reason I started now is because someone asked me to run an application for booking LuxMed appointments, and since I also use LuxMed, it gave me a good reason to have a PC running as part of my home lab almost all day. I decided to use my Dell Latitude E5530, which was lying on my shelf, full of dust. After cleaning it up, it was ready to go. I installed Ubuntu 24 LTS. The installation was straightforward — after downloading the ISO from the internet, I used a command to flash it to my USB drive.

```bash
sudo dd if=/Users/kamilmrowka/Downloads/ubuntu-24.04.4-live-server-amd64.iso of=/dev/rdisk8 bs=4m status=progress
```

That created a bootable USB, which made it easy to install the system on my machine. Once installed, I had to do a couple of configurations.

The first thing I wanted to do was close the lid and make sure the laptop would not go to sleep. The file responsible for this is `logind.conf`, which lives inside the `/etc/systemd` directory. More about it [here](https://www.freedesktop.org/software/systemd/man/latest/logind.conf.html).

```bash
vim /etc/systemd/logind.conf

# uncomment HandleLidSwitch and set it to ignore
HandleLidSwitch=ignore
```

I set `HandleLidSwitch` to `ignore`, so no action is taken when I close or open the lid.

Then I noticed the screen did not turn off after closing the lid. To fix that, I edited the GRUB configuration:

```bash
sudo nano /etc/default/grub
```

Find `GRUB_CMDLINE_LINUX_DEFAULT` and add `consoleblank=60` (seconds):

```
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash consoleblank=60"
```

This blanks the screen after 60 seconds of inactivity. Apply the change with:

```bash
sudo update-grub
```

Once the lid was working as expected, I installed Docker on my machine. I followed the official instructions from the docs:
[Docker installation](https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository)

Next, I added my user to the `docker` group so I could run Docker commands without `sudo`:

```bash
sudo usermod -aG docker $USER
newgrp docker
docker ps
```

The last step was to add the `docker-compose.yml` file and run it.
```docker
version: '3.4'
services:
  luxmedbookingservice:
    image: eugenezadyra/luxmed-bot:latest
    env_file: secrets.env
    environment:
      DB_HOST: "database"
      DB_PORT: 5432
    volumes:
    - lbs:/lbs
    restart: unless-stopped

  database:
    image: postgres:10.7
    volumes:
    - postgres:/var/lib/postgresql/data
    ports:
    - "5432:5432"
    environment:
    - POSTGRES_USER=lbs
    - POSTGRES_PASSWORD=your_secure_password
    - POSTGRES_DB=lbs
    - TZ=Europe/Warsaw
    restart: unless-stopped

volumes:
  postgres:
    name: postgres
  lbs:
    name: lbs
```

The application itself also requires creating a Telegram bot, but that's outside the scope of what I did here.