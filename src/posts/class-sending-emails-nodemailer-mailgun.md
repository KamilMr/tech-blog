---
date: " 2024-07-18"
language: English
title: Teaching Email Automation Using Handlebars and Nodemailer
subtitle: A Step-by-Step Guide for Students on Crafting and Sending Emails with Node.js
tags:
  - Nodejs
  - express
---
Yesterday, I had the pleasure of teaching a class for my students about sending emails to users. The goal was to create an email—if possible, using Handlebars—then send it to a test email account. We clicked on the link and verified the email on the server side.

Here is the link to what I intended to show: [Link to my Home Lab](https://github.com/KamilMr/lab/tree/master/nodejs/email). 
And here is what we accomplished during the class: [Class code](https://github.com/KamilMr/lab/tree/master/nodejs/email-class).

There were some topics I did not cover in the last class. For example, [Handlebars.js](https://handlebarsjs.com/installation/#npm-or-yarn-recommended).

How simple is this?

```js
import Handlebars from "handlebars";
const template = Handlebars.compile("Name: {{name}}");
console.log(template({ name: "Nils" }));
```

I use this to build up the email message. Templates are located inside the template folder. At the moment there are two templates: otc and welcome.

Additionally, I did not speak about sending emails using an API key. I also wrote an example with the code. One catch here is that I had to install an additional package, [nodemailer-mailgun-transport](https://www.npmjs.com/package/nodemailer-mailgun-transport), which creates the transport for us.

# Links
https://handlebarsjs.com/guide/#what-is-handlebars
https://www.npmjs.com/package/nodemailer-mailgun-transport
https://documentation.mailgun.com/docs/mailgun/quickstart-guide/quickstart/
https://nodemailer.com/smtp/
https://nodemailer.com/about/

https://developer.mozilla.org/en-US/docs/Glossary/SMTP
