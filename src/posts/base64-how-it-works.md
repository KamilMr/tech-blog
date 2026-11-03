---
title: "What I learned today: How Base64 actually works"
subtitle:
date: 2026-11-03
language: English
tags:
  - base64
  - learning
---

> I used AI to improve my grammar and English phrasing.

Today I was working on a task that involved sending an image encoded as Base64 over the internet and then decoding it into a Buffer to save it in an S3 bucket.

I've worked with Base64 many times before. I knew it was a way to represent binary data as a string, but I had never really thought about how it works internally.

So today I decided to understand it.

One byte consists of 8 bits. Base64 takes 3 bytes (24 bits) and divides them into four groups of 6 bits. Each group is represented by one character from the Base64 alphabet.

In simple terms:

`3 bytes × 8 bits = 24 bits`

`24 bits ÷ 6 = 4 Base64 characters`

But what happens when we don't have exactly 3 bytes?

This is where padding comes in.

For example:

- `"A"` — 1 byte → `QQ==` (two padding characters)
- `"AB"` — 2 bytes → `QUI=` (one padding character)
- `"ABC"` — 3 bytes → `QUJD` (no padding)

Base64 adds `=` characters when needed to complete the final group of four characters.

For example, if an image contains 13 bytes, we get four complete groups of 3 bytes and one remaining byte. The result is 20 Base64 characters, including padding.

This also explains why Base64-encoded data is larger than the original binary data—typically around 33% larger.
