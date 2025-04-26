---
title: Dockerized atuin
subtitle: Learning docker
date: 2025-04-24
language: English
tags:
  - docker
  - self-hosted
---
This morning, I found a new self-hosted application that lets me persist the history of commands from my terminal. I like using Compose for my images, so I used it today as well.

The examples below are based on the official documentation. First, I created a .env file with content similar to this (I only changed the password to a common one I use locally):

```
ATUIN_DB_NAME=atuin
ATUIN_DB_USERNAME=atuin
ATUIN_DB_PASSWORD=really-insecure
```

Then, I created a docker-compose file with the following content:

```
services:
  atuin:
    restart: always 
    image: ghcr.io/atuinsh/atuin:5cd2353
    command: server start
    env_file: .env
    volumes:
      - "./config:/config"
    links:
      - postgresql:db
    depends_on:
      - postgresql
    ports:
      - 8888:8888
    environment:
      ATUIN_HOST: "0.0.0.0"
      ATUIN_OPEN_REGISTRATION: "true"
      ATUIN_DB_URI: "postgres://${ATUIN_DB_USERNAME}:${ATUIN_DB_PASSWORD}@db/${ATUIN_DB_NAME}"
      RUST_LOG: info,atuin_server=debug
  postgresql:
    image: postgres:14
    restart: unless-stopped
    ports:
      - 5432:5432
    env_file: dev.env
    volumes: # Don't remove permanent storage for index database files!
      - "./database:/var/lib/postgresql/data/"
    environment:
      POSTGRES_USER: ${ATUIN_DB_USERNAME}
      POSTGRES_PASSWORD: ${ATUIN_DB_PASSWORD}
      POSTGRES_DB: ${ATUIN_DB_NAME}
```

The release image needs to be pulled directly from the repository.

After creating the file, I ran:

```
docker compose up
```

Then, I installed the client version on my host using brew:

```
brew install atuin
echo 'eval "$(atuin init zsh)"' >> ~/.zshrc # had to do it in zsh
```

After I finished that, I went into the .config folder of Atuin to uncomment one line that tells the client to talk to my self-hosted server. I opened:

```
nvim ~/.config/atuin/config.toml
```

Found the line:

```
## address of the sync server
```

And added (or uncommented) this:

```
## address of the sync server
sync_address = "http://localhost:8888"
```

The address points to my server.

There are two commands left to finish the setup:

```
atuin register -u <YOUR_USERNAME> -e <YOUR_EMAIL>

atuin key # run this after registering

# last command
atuin sync
```

How cool is that? 
