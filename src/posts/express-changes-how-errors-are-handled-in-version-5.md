---
title: Express 5 Error Handling Has Changed
date: 2025-04-04
language: English
tags:
  - express
---
```
app.get('/user/:id', async (req, res, next) => {
  const user = await getUserById(req.params.id);
  res.send(user);
});
```

In earlier versions, if an error occurred inside getUserById, the app would crash. To handle this properly, we need to wrap the asynchronous operation in a try-catch block and pass any errors to the next callback. Express will treat this as an error and handle it using its error-handling middleware.

```
app.get('/user/:id', async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id);
    res.send(user);
  } catch (err) {
    next(err);
  }
});
```

The key point is ensuring that Express can catch all errors that occur during the execution of route handlers or middleware. For synchronous code, Express automatically catches errors. For asynchronous operations, you must explicitly catch and forward the error using next().

Here’s another example from the Express documentation. If getUserById throws an error, and that promise is returned correctly, Express will handle it—assuming you’re using a version of Express that supports async route handlers:

```
app.get('/user/:id', async (req, res, next) => {
  const user = await getUserById(req.params.id);
  res.send(user);
});
```

However, it’s important to remember: when working with asynchronous code, always ensure that errors are properly passed to Express, either by using try-catch or by returning the promise and relying on Express’s built-in support.

[Link to Express error handling documentation](https://expressjs.com/en/guide/error-handling.html)

