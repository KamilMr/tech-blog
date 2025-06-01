---
title: A simple Node.js script to streamline Storybook publishing workflow
subtitle: Node.js script that automates build and syncing
date: 2025-05-14
language: English
tags:
  - Nodejs
---

And so first step to automate repetitive tasks of Storybook deployment with help of `aws cli`. 
Node.js script that automates build and syncing, making Storybook deployment very simple.  

```js
#!/usr/bin/env node
// this is a script to sync the storybook to S3
// local usage inside the root of the project

const { exec } = require("child_process");
const { promisify } = require("util");
const fs = require("fs");

const execAsync = promisify(exec);

const {DIRECTORY_NAME = "storybook-static";
const DIR = "./storybook-static";
const BUCKET_NAME = "company-storybook";

// check if directory exists
if (!fs.existsSync(DIR)) {
  console.error(`Directory ${DIR} does not exist`);
  process.exit(1);
}

(async () => {
  try {
    console.log("Building storybook...");
    await execAsync(`npm run build:storybook`);
  } catch (error) {
    console.error(error);
    console.log("Failed to build storybook");
    process.exit(1);
  }
  try {
    console.log("Syncing storybook to S3...");
    await execAsync(
      `aws s3 sync ${DIR} s3://${BUCKET_NAME}/${DIRECTORY_NAME} --delete`
    );
    console.log("Synced storybook to S3");
  } catch (error) {
    console.error(error);
    console.log("Failed to sync storybook to S3");
    process.exit(1);
  }
})();
```
