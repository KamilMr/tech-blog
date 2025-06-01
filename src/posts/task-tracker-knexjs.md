---
date: 2024-08-05
language: English
title: Adding knex.js to my project
tags:
  - task-tracker
  - project
---

Today, I took some time early in the morning to push one of my projects a little further. The project is a small task-tracker, and I started by creating a basic schema for the database. Now, I am considering how to manage interactions with the database. Previously, I used **Knex.js** in my work, and for this project, I debated between using **mysql2** with raw SQL or building a query builder helper. However, I ultimately decided to use **Knex.js**.

**Knex.js** offers several advantages. First, it simplifies database migrations and schema building, allowing for easy setup and updates. Second, it enables the construction of SQL queries without needing to write raw SQL, which can help avoid potential errors. Third, using **Knex.js** provides me with an opportunity to practice with this library, improve my skills, and potentially use it in other projects.

To set up migrations, I will use the `knex.js` CLI:

```bash
npx knex init # I use npx because knex is not installed globally
```

This command creates a file containing various database configurations. I rewrote this file to use ECMAScript modules.

Next, I created an initial migration file:

```bash
npx knex migrate:make init
```

The `knexfile.js` will pull environment variables from the `.env` file. However, I encountered a small problem. When running scripts via `package.json`, the environment variables weren't being loaded:

```json
"migrate": "npx knex migrate:latest --knexfile src/db/knexfile.js",
```

Everything worked fine with:

```bash
node src/db/knexfile.js
```

To resolve this, I had to specify the exact location of the `.env` file because `dotenv` expects it to be in the directory where the script is executed. In my case, that was the `src/db` directory, but I wanted to keep the `.env` file in the project's root. By adding a `path` parameter, I could specify the correct location:

```js
import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });
```

This solution ensured that the environment variables were correctly loaded regardless of the script's execution path.

# Links
https://knexjs.org/guide/migrations.html#transactions-in-migrations
https://github.com/motdotla/dotenv#path

https://github.com/KamilMr/task-tracker/blob/main/README.md