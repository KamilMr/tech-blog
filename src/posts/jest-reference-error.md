---
title: Jest Worker reference error
subtitle: Mocking Web Workers
date: 2024-05-29
language: English
tags:
  - React
---
Date: 202405271325

In one project, I am using a worker to perform some heavy tasks. When trying to commit changes, `jest` gives a `ReferenceError`. I had to use the code below to create a reference for `Worker` to run on `jest`.

```js
window.Worker = jest.fn().mockImplementation(() => ({
  postMessage: jest.fn(),
  onmessage: jest.fn(),
  onerror: jest.fn(),
  terminate: jest.fn(),
}));
```

[Here is more info](https://jestjs.io/docs/mock-function-api#mockfnmockimplementation) about the function itself.

Here is another solution. 
a. First, I created a dummy worker.

```js
class Worker {
  constructor() {
    this.onmessage = () => {};
  }

  postMessage(msg) {
    this.onmessage(msg);
  }
  terminate() { // I am actually calling this method, so I had to add it here too.
    () => {};
  }
}

export default Worker;
```

b. Here is the structure
```js
├── src
│   ├── __mocks__
│   │   └── worker.js // created a simple worker
│   └── pages 
│       └── worker.js
```

c. Imported and assigned to the window object:
```js
import Worker from '../../__mocks__/worker';

window.Worker = Worker;
```

Then I found out that there is some chat about this [here](https://github.com/jestjs/jest/issues/3449#issuecomment-750345973).

[[react]]
[[testing]]