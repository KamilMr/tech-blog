---
date: 2024-10-31
language: English
title: Write to buffer with formidable
subtitle: Practicing with writable stream
tags:
  - Nodejs
  - Streams
---
Today, I experimented with using formidable to receive a file from the fronted and write it directly to a buffer instead of storing it temporarily on the server. The initial set up is very easy. You will see in documentation, in express section that you will use this:

```js
const form = formidable({});
// here you pass request
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
  });
```

By default, `formidable` save files in the `/tmp/`directory. This is fine, however you will have to move it somewhere else for long-term storage or load it into a buffer for further processing. I wanted to skip `tmp`  directory and write directly to a buffer. The solution lies in using `fileWriteStreamHanlder`: 

```js
const form = formidable({
  fileWriteStreamHandler: () => {},
});
```

The `fileWriteStreamHandler` allows to intercept writing process, allowing you to redirect the data to a custom location instead, for example to AWS bucket or as I want today, to a buffer. To achieve that, you will have to create writable stream that collects all chunks of file and at the end of writing process assemble them into a buffer.   

First, create new writable with some methods that will be needed. Let's the Writable constructor and pass some functions that will implement custom logic. 

```js
      const files = {};
      const chunks = [];
      const writable = new Writable({
        write(chunk, enc, cb) {
        chunks.push(chunk); // Collect each chunk of data
        cb(); // Signal completion of the write operation
        },
        destroy() {
          files= {};
        },
        final(cb) {
          const buffer = Buffer.concat(chunks);
          files[file.newFilename] = buffer;
          cb();

        },
      });
```

Write method will receive chunks of a  file and add them to an array. Callback is used when chunk is flushed into resource. Next method, `destroy` , reset the file on destroy. And `final` triggers once the stream closes, concatenating chunks into a single `Buffer`.   

Now lets take above code and combine with `fileWriteStreamHandler`

```js
const files = {};
const form = formidable({
  fileWriteStreamHandler: () => {
      const chunks = [];
      const writable = new Writable({
        write(chunk, _, cb) {
          chunks.push(chunk);
          cb();
        },
        destroy() {
          files= {};
        },
        final(cb) {
          const buffer = Buffer.concat(chunks);
          files[file.newFilename] = buffer;
          cb();

        },
      });

    return writable;
  },
});

await form.parse(req);
console.log(Object.values(files)[0]);
```


