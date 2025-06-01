---
title: Cloudflare R2
language: English
date: 2025-04-19
tags:
  - AWS
---

Today, in one of my projects, I needed to store files—mostly images for now—that would later be accessed by other services. While researching this topic, I came across [Cloudflare R2](https://developers.cloudflare.com/r2/), a storage solution designed for handling large amounts of unstructured data.

The pricing is reasonable, and they offer 10GB of storage for free, which is more than enough for my current needs. I went ahead and created a bucket. By default, buckets aren’t publicly accessible. To make them public, you either need to configure a custom domain or use an r2.dev subdomain. The latter has a few limitations, but it works fine for development purposes.

Setting everything up was straightforward since R2 is compatible with the AWS SDK. For now, the snippet below does the job.

```js
// Cloudflare R2 Storage Integration
const S3 = new S3Client({
  region: 'auto',
  endpoint: process.env.CLOUDFLARE_ENDPOINT,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY,
    secretAccessKey: process.env.CLOUDFLARE_SECRET_KEY,
  },
});

// File Upload Function
const upload = async (file) => {
    const command = new PutObjectCommand({
        Bucket: process.env.CLOUDFLARE_BUCKET,
        Key: file.originalname,
        Body: file.buffer,
    })
    return await S3.send(command);
};
```