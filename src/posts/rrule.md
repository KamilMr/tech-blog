---
title: Using rrule for creating events
subtitle: 
date: 2024-05-23
tags:
  - npm
language: English
---
I am building a small booking system that will allow people to book meetings with a therapist, but it can also be used in other fields. To make it work, I decided to build a simple calendar system where events can be created and stored in the database. However, I didn't want to clutter the database with many events, just one. Based on this event, I wanted to populate the rest on the fly. At first, I was almost building this function myself, but then I came across a package called `rrule`. I will have to think a bit more about how to take advantage of [rrule - see docs](https://www.npmjs.com/package/rrule). Here is a piece of code from the documentation.

I am currently using the method `all()` that gets all occurrences from `dtstart` up to `until`.

```js
const rule = new RRule({
  freq: RRule.WEEKLY, // weekly session
  interval: 1, // one for weekly session
  // byweekday: [RRule.MO, RRule.FR], not using
  dtstart: new Date(2012, 1, 1, 10, 30), // corrected datetime usage
  until: new Date(2012, 11, 31) // corrected datetime usage
});
```