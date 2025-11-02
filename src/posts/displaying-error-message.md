---
title: Display the error message
subtitle: Print the error to the terminal in the catch block
date: 2024-05-18
language: English
tags:
  - beginner-guide
  - express
---
    
While reviewing my students code base, I've noticed that some people struggle with understanding why something isn't working. For example, they receive a message in Postman that simply states, "An error occurred," without any further information. The terminal doesn't display any error either. So, what just happened?

Today's example is when using a `try-catch` block in JavaScript. A common issue is not logging enough information about the error, which can make debugging difficult.

Here's an example where the error is not logged at all:

```javascript
try {
  // some code
} catch (error) {
  res.json({message: 'An error occurred'}); // The error details are missing
}
```

In this case, if an error occurs, we won't know what went wrong because the error is not logged to the console or terminal.

Another example logs only a basic message, which may not provide enough information:

```javascript
try {
  // some code
} catch (error) {
  console.log(error.message); // This logs only the error message, not where it occurred
  res.json({message: 'An error occurred'});
}
```

This approach is slightly better because it logs the error message, but it still doesn't provide information about where the error occurred.

A better solution is to log the entire error object, which includes both the message and the stack trace, providing more context about the error:

```javascript
try {
  // some code
} catch (error) {
  console.log(error); // Logs the entire error object
  res.json({message: error.message || 'Something went wrong when trying to create a new account'});
}
```

Logging the entire error object is more useful for debugging because it includes both the error message and the stack trace, which shows where the error occurred in the code.