---
title: Auto-publish Docker image on merge to main
date: 2026-01-04
language: English
tags:
  - docker
  - github-actions
  - ci-cd
---

Today I set up a GitHub Actions workflow to automatically push my Docker image to Docker Hub when I merge to main. I wanted my task-tracker to be public on both npm and Docker Hub with proper versioning.

## The workflow file

I created `.github/workflows/docker-publish.yml`:

```yaml
name: Build and Push Docker

on:
  push:
    branches:
      - main

jobs:
  build-and-push:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Get version from package.json
        id: version
        run: echo "VERSION=$(node -p 'require("./package.json").version')" >> $GITHUB_OUTPUT

      - name: Login to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{secrets.DOCKERHUB_USERNAME}}
          password: ${{secrets.DOCKERHUB_TOKEN}}

      - name: Build and push
        uses: docker/build-push-action@v6
        with:
          context: .
          push: true
          tags: |
            kamilmrowka/task-tracker:latest
            kamilmrowka/task-tracker:${{ steps.version.outputs.VERSION }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
```

## What I learned

**actions/checkout@v4** clones the repo into the runner. GitHub Actions runners start empty, so without this step Docker can't access the Dockerfile or source code.

**Passing data between steps** uses `$GITHUB_OUTPUT`. I write `VERSION=1.2.0` to this file, then access it via `steps.version.outputs.VERSION`. Each step is isolated, so this is the way to share values.

**Versioning choices:**
- SHA (commit hash) - automatic, good for internal tools
- Semantic version - human-readable, standard for public packages

I chose to read version from `package.json` so Docker and npm stay in sync. One source of truth.

**Caching** with `cache-from` and `cache-to` speeds up builds by reusing unchanged layers.

## Setup required

Before this works, add two secrets in GitHub (Settings → Secrets → Actions):
- `DOCKERHUB_USERNAME`
- `DOCKERHUB_TOKEN` (create at hub.docker.com/settings/security)
