---
title: To create docker image
date: 2025-04-01
language: English
tags:
  - docker
---

The next session of learning Docker. Today I was working on a few basics.

First, you have to install dependencies, then the app.

He first uses the ubuntu image and runs it with the bash command so it doesn’t stop immediately:

```bash
docker run -it ubuntu bash
```

After that, I’ll be connected to the container. This gives me the ability to play around without messing up the Docker host. When I exit the container, everything will be gone.

To dockerize it, I need to create a Dockerfile:

```dockerfile
FROM <base-image>

RUN <some-setup-commands>

COPY app.py /place-to-copy/  # This assumes the file and path exist

ENTRYPOINT ["python3", "/place-to-copy/app.py"]  # Or similar, depending on the app
```

Then build the image with:

```bash
docker build .
```

If I forget to name it, I can use the same build command with the -t parameter. Because of caching, it will build quickly:

```bash
docker build . -t my-image
```

To publish it, I have to tag it with my account name first. Otherwise, it will try to publish it to the default official image repository:

```bash
docker build . -t kamil/my-image
```

