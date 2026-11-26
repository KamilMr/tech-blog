---
title: "The PC Behind My Home Lab"
subtitle: "My EliteDesk Mini, K3s, and the applications I run at home"
date: 2026-11-26
language: English
tags: [homelab, kubernetes, fluxcd]
---

> AI helped me with the grammar in this post.

Hello there. I’ve written about my home lab in a couple of posts already, and I wanted to share a quick update on my current setup.

Right now, I have an HP EliteDesk 800 G4 Mini running 24 hours a day, seven days a week, in my closet. It has a 1 TB SSD connected to it. I run a few applications on it, and you can find their configuration in my [Home Lab GitHub repo](https://github.com/KamilMr/home-lab).

![My HP EliteDesk Mini and its external SSD in the closet](/images/home-lab-elite-mini.webp)

My setup is:

- **K3s**, a lightweight version of Kubernetes, runs my applications. I have Audiobookshelf for audiobooks, Linkding for bookmarks, and Paperless-ngx for documents configured in the repo.
- **Flux CD** keeps the cluster in sync with GitHub. When I push a change to the repo, Flux picks it up and applies it to the cluster.
- **Prometheus and Grafana** help me see what’s happening on the machine, including how much memory and disk space it’s using.

I have to admit, it’s quite interesting to have a small computer in my closet running my applications all the time. Soon, I want to spend a bit more time on the physical setup. I might get a small rack or find a better place for the drives. I already have another drive that I still need to connect.
