---
date: 2024-08-24
language: English
tags:
  - Nodejs
  - Streams
title: Basic notes about streams
subtitle: Streams 1
---

### What Are Streams?

Streams allow you to work with data in chunks as soon as it becomes available. This means you don't have to wait for all pieces of data to arrive before starting to process them.

### How Can I Think of Streams Easily?

One way to understand streams is by imagining how you read a book. You don't read the entire book at once; instead, you consume it slowly, line by line, page by page, chapter by chapter. Similarly, streams allow you to process data incrementally.

Another analogy is to think of streams as pipelines through which water flows. The pipes exist even without water, just as streams can exist without immediate data. For example, you can create a readable stream without reading from a source right away. Pipes have capacities—they can't handle more water than they were designed to carry. Streams, like pipes, can also be forked and merged, allowing different types of data to flow through them.

### Pros

- **Time-efficient**: Process data as soon as it arrives, reducing waiting time.
- **Memory-efficient**: Handle data in chunks rather than loading everything into memory at once.
- **Composability**: Easily combine streams for complex data processing.

### Types of Streams

- **Writable**: Streams you can write data to.
- **Readable**: Streams you can read data from.
- **Duplex**: Streams that can be both read from and written to.
- **Transform**: Streams that can modify or transform data as it is read or written.
- **PassThrough**: A simple type of Transform stream that outputs what it receives without altering the data.

All of these are instances of the `EventEmitter` class, meaning they produce events. They can handle both binary data and any JavaScript value when in object mode.
### Links
[[Nodejs]]
[[Streams]]
