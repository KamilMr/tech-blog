---
title: "Weekend Server Experiments with Node.js: Exploring `setTimeout`, HTTP/HTTPS, and Certificates"
subtitle: A hands-on Saturday
date: 2025-06-14
language: English
tags:
  - Nodejs
---
Saturday morning, playing with servers—just doing some basic experimentation.

In this commit, I tested how `setTimeout` behaves when an error occurs during file reading. Most of the time, it runs after the poll and check phases—in the next cycle of the event loop.

🔗 [View commit](https://github.com/KamilMr/lab/commit/d8eb0b53097ab9584fb78fe228c5336461323368)


In my lab, I added raw servers—one for HTTP and another for HTTPS. I also included corresponding clients for both protocols.

🔗 [HTTP/HTTPS server and client commit](https://github.com/KamilMr/lab/commit/bd3cb858d61f68a445686b72ddb8d50f1476c231)  
🔗 [HTTPS client commit](https://github.com/KamilMr/lab/commit/b88b6729060b014cd74efee3cd2343269b74caab)

For the HTTPS server, I needed to generate a self-signed certificate. Here's the commit and the OpenSSL commands I used:

🔗 [Certificate creation commit](https://github.com/KamilMr/lab/commit/db9009a99d9f2f3b302bfffc794247fbb8266e13)

```bash
# Create a private key
openssl genrsa -out private-key.pem 2048

# Create a certificate and self-sign it with the private key
openssl req -new -x509 -key private-key.pem -out certificate.pem -days 365
````
