---
title: Automating Blog Post Publishing from Obsidian
subtitle: A Node.js script to transform image links :-)
date: 2025-06-01
language: English
tags:
  - Nodejs
---
In my Obsidian vault, I have a directory called TechBlog that stores my blog posts. Whenever I want to add a new article, I create a new .md file with the content, copy-paste it into the blog directory, and push it to Git.

The first problem I had was that I had to do all of this manually. So, I wrote a small script in Bash to automate the process: it would add, commit, and push the file for me. However, this solution still lacked support for handling images in my articles.
In Obsidian, when I embed an image, it looks like this: `![[image path]]`

Today, I wrote a script that transforms:

`![[some image.png]]` to `![some image](/images/some-image.png)`. 

The script is intended to be run like this:

```bash
node publish.js <source> <target> <target image directory>
```

I chose to implement this using a transform stream, mainly as an exercise—though using a buffer alone would have sufficed.

### Helpers

First, I imported the necessary modules and wrote a few helper functions:

```js
const fs = require("node:fs");
const path = require("node:path");
const { Transform } = require("node:stream");
const { pipeline } = require("node:stream");

const IMAGE_ATTACHMENT_PATH = "attachments";

const assertExists = (p) => {
  const abs = resolveRelative(p);
  if (!fs.existsSync(abs)) throw new Error(`${abs} does not exist`);
};

const resolveRelative = (p) => {
  if (path.isAbsolute(p)) return p;

  return path.resolve(process.cwd(), p);
};

function doReplace(full, inner) {
  const imagePath = path.join(this.source, IMAGE_ATTACHMENT_PATH, inner);
  if (!fs.existsSync(resolveRelative(imagePath))) return full;

  const { ext, name } = path.parse(inner);
  const safe = name.toLowerCase().replace(/[\s.]/g, "-");
  const newName = safe + ext;
  fs.copyFileSync(
    resolveRelative(imagePath),
    path.join(this.imageDirectory, newName)
  );
  return `![${safe}](/images/${newName})`;
}
```

The core function here is doReplace. It receives the matched string and the image filename (inner). It checks whether the image exists, and if so, it sanitizes the filename and copies the image from the source to the target image directory. It then returns a transformed markdown image link compatible with Next.js.

### Transform stream

The transform stream leverages the helper functions. The interesting part is the transform method, which uses a tail to handle cases where image syntax might be split across chunks. The _flush_ method ensures any remaining data is processed at the end.

```js
class CustomTransformStream extends Transform {
  constructor({ searchPattern, source, target, options, imageDirectory }) {
    super({ ...options, encoding: "utf-8", objectMode: true });
    this.searchPattern = searchPattern;
    this.tail = "";
    this.source = source;
    this.target = target;
    this.imageDirectory = imageDirectory;
  }

  _transform(chunk, encoding, cb) {
    const overlap = 64;
    const str = this.tail + chunk;
    const replaced = str.replace(this.searchPattern, doReplace.bind(this));
    this.tail = replaced.slice(-overlap);
    this.push(replaced.slice(0, -overlap));
    cb();
  }

  _flush(cb) {
    this.push(this.tail);
    cb();
  }
}
```
### Execution 
In the final part, I check if the required directories exist, then iterate over each file and process them through the transform stream. I use pipeline to handle errors nicely.

```js
const iterateOverAll = (source, target, imageDirectory) => {
  assertExists(source);
  assertExists(target);
  assertExists(imageDirectory);

  const files = fs.readdirSync(source);

  for (const file of files) {
    if (fs.statSync(path.join(source, file)).isDirectory()) continue;
    const fileStream = fs.createReadStream(path.join(source, file), {
      encoding: "utf-8",
    });
    const writeStream = fs.createWriteStream(path.join(target, file));

    const transformStream = new CustomTransformStream({
      searchPattern: /!\[\[(.*?)\]\]/g,
      source,
      target,
      imageDirectory,
    });

    pipeline(fileStream, transformStream, writeStream, (err) => {
      if (err) {
        console.error(`There is an error: ${err}`);
        process.exit(1);
      }
    });
  }
};

const args = process.argv.slice(2);

if (args.length !== 3) {
  console.error("Usage: node publish.js <sourceDir> <targetDir> <imageDir>");
  process.exit(1);
}

const sourceDirectory = args[0];
const targetDirectory = args[1];
const imageDirectory = args[2];

iterateOverAll(sourceDirectory, targetDirectory, imageDirectory);
```

Link to commit in my lab: [commit](https://github.com/KamilMr/lab/commit/2d5ffc8e5ba75ff93ff966871caf837c8e3b1d1c)