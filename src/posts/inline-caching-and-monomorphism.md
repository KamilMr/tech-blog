---
date: 2025-11-02
language: English
title: Inline Caching in V8
subtitle: I am learning how JavaScript engines optimize property access through call sites
tags:
  - JavaScript
  - V8
---

Today I learned about inline caching, one of the key optimization techniques that makes JavaScript fast. 

![pasted-image-20251102182935](/images/pasted-image-20251102182935.png)

What is it? 
Inline caching is an optimization technique where the V8 engine remembers property access patterns at specific locations in your code - called **call sites**.

A **call site** is a literal, physical place in your code where a dynamic operation happens. For example, when you access a property like `point.x`, that's a call site.

When a function receives a predictable object, V8 will cache the property access at the call site. The first time V8 hits the code, it will:
1. Check the hidden class
2. Scan x offset inside the memory
3. Get the value

Then it's going to "remember" and will use machine code instead of doing lookup on subsequent calls. This makes the code significantly faster.

## How can i think of this easily?

I like to think of it as a delivery person learning your neighborhood. The first time they deliver to your house, they need to check the address carefully, look at the map, and find the right door. But after a few visits to the same address, they remember exactly where to go - they've "cached" the route.

Similarly, V8 "learns" where properties are located in memory and creates a fast path to access them directly.

I learned about four stages of inline caching, where  V8 optimizes call sites through four stages:
1. **Empty** - The call site hasn't been executed yet
2. **Monomorphic** - The call site has seen objects with the same shape (hidden class)
3. **Polymorphic** - The call site has seen 2-4 different object shapes
4. **Megamorphic** - The call site has seen more than 4 different object shapes

Performance will decreases as you move from monomorphic to megamorphic. Monomorphic call sites are the fastest because V8 can make strong assumptions about the object structure.

What I would like to remember today?
- Keep object shapes consistent to maintain monomorphic call sites
- Monomorphic code is the fastest - avoid passing objects with different shapes to the same function

Understanding IC helps explain why JavaScript performance advice often emphasizes using consistent object structures throughout your code.
