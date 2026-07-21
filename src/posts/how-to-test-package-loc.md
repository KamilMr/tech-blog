---
title: "Testing npm Packages Locally with npm pack"
subtitle:
date: 2026-07-21
language: English
tags:
  - how-to
---
Today I learned about the `npm pack` command, which creates a package archive and allows you to test the package without publishing it. It creates a `.tgz` file similar to the one sent to the registry when you run `npm publish`.

This helped me test the package by installing it in my frontend application and checking whether it breaks anything.

To install it locally, I had to provide the path to the generated package file during installation:

`npm install ../path-to-the-file/package.tgz`