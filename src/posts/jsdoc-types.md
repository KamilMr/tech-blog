---
date: " 2024-11-09"
language: English
title: JsDoc types in Node.js without TypeScript
tags:
  - JsDoc
---
Interesting! Although I was not ready to use  use TypeScript in my Nodejs app yet, I began exploring how JsDoc could provide similar benefits. Basically I defined types in one file and imported them in my root project file in `index.js`. The wile with types, has types definitions like this:

```js
/**
 * @typedef {Object} House
 * @property {String} [id] - The house ID 36 .
 */
```

What surprised me and what I learned today is that I can use JsDoc comment within the function to reference created types. This allows me to benefit from annotations without transforming code base to TS. 

```js
/**
 * Selects a house.
 * @param {import('knex').Knex} db - The Knex connection instance.
 */
export const insertHouseId = (db) => {
  console.log({id: createV4String()});
  return db('house').insert(/** @type {House}*/ ({id: createV4String()}));
};
```

With the TS language model enabled, I can validate types without not comiting fully to typescript. 
