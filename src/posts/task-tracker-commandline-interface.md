---
date: " 2024-08-07"
language: English
title: Choosing command line interface
tags:
  - Nodejs
  - project
  - task-tracker
subtitle:
---
Today, I chose two command-line interfaces to use in my task tracker app. The first one is the **Inquirer** library. The main reason I chose **Inquirer** is that it has several features that are very useful for my application. 

First, it can ask questions, which is essential for creating an interactive app that will recursively ask what actions I want to perform. After completing an action, the app will return to the beginning to prompt for the next action. This feature ensures a smooth and user-friendly workflow.

Second, **Inquirer** provides answer validation. This means I can attach validation logic to each question to ensure the inputs are correct, and provide immediate error feedback if they are not. From my perspective, this package is the best match for my needs at the moment.

The next library I plan to use is **Commander**. I think it will be helpful for users who prefer to use command-line options to perform actions instead of running the entire application interactively. **Commander** makes it easier to handle command-line arguments, create commands, and organize the CLI structure efficiently.

---
# Links
https://www.npmjs.com/package/commander
https://www.npmjs.com/package/inquirer

https://github.com/KamilMr/task-tracker/tree/task-3-4-5-owner


