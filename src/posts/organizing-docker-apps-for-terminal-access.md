---
date: 2026-01-04
language: English
title: Organizing Docker Apps for Easy Terminal Access
subtitle: My directory structure for self-hosted applications
tags:
  - Docker
---
I've been setting up more self-hosted applications lately on my pc and I found myself constantly wondering: where should I actually put all these Docker projects? After doing some research, I've landed on a structure that makes managing containers from the terminal much easier.

When I started self-hosting apps with Docker, things started to get messy fast. I had compose files scattered across random directories, data volumes in unexpected places, and no consistent way to quickly jump into a project and manage it.

What did I want? Something that lets me quickly navigate.

I created `~/docker/`. It's:
- Short to type
- Always in the same predictable location
- Easy to back up

For production servers, `/opt/docker/` is the most recommended location. 
## The Directory Structure

Here's what I settled on:
```bash
~/docker/
├── .env.shared             
├── some-app/                   
│   ├── docker-compose.yml
│   ├── .env
│   └── data/
```

Each app gets its own directory containing:
- `docker-compose.yml` - the service definition
- `.env` - environment variables (secrets, ports, paths)
- `data/` - persistent storage using relative bind mounts

## Shell Functions for Quick Access

I found the script below pretty useful.  

```bash
# Add to ~/.zshrc or ~/.bashrc
export DOCKER_HOME="$HOME/docker"

# Jump to docker home
alias dhome='cd $DOCKER_HOME'

# Jump to specific app and optionally run command
d() {
  if [ -z "$1" ]; then
    cd "$DOCKER_HOME" && ls -la
    return
  fi

  cd "$DOCKER_HOME/$1" || return

  # If second argument provided, run docker compose command
  if [ -n "$2" ]; then
    shift
    docker compose "$@"
  fi
}

# Quick docker compose commands (run from app directory)
alias dcu='docker compose up -d'
alias dcdown='docker compose down'
alias dcl='docker compose logs -f'
alias dcp='docker compose pull'
alias dcr='docker compose restart'

# List all docker apps
dls() { ls -1 "$DOCKER_HOME"; }
```

# Links

- [DoTheEvo/selfhosted-apps-docker](https://github.com/DoTheEvo/selfhosted-apps-docker)
- [Docker Compose Directory Structure](https://docker-compose.de/en/folder-structure/)
