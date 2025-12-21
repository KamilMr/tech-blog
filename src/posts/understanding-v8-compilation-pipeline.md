---
date: 2025-10-31
language: English
title: Reading on how engine sees my code
subtitle: How JavaScript engines optimize code at runtime
tags:
  - JavaScript
  - V8
---

Today I dove into V8's internals and understood a bit more on how JavaScript engines actually optimize code at runtime.

While studying V8's architecture, I mapped out the entire compilation pipeline and learned why object shape consistency matters so much for performance.

**Hidden Classes**

V8 creates internal structures to track object shapes. When you add or delete properties dynamically, V8 has to create new hidden classes and transition between them. This isn't free - it costs performance, especially on hot paths. On those paths it is important to keep objects shapes consistent.

**The Compilation Pipeline**
It starts with Ignition, which walks the AST and converts it to [[bytecode]]. As code executes, V8 collects data about types and usage patterns. Then the optimization kicks in:

- **Sparkplug** - compiles to machine code without optimizations, fast compilation for warm code
- **Maglev** - uses SSA for better optimization with the motto "good enough code, fast enough"
- **Turbofan** - the aggressive optimizer that kicks in for truly hot code

The whole system is built on assumptions about code predictability. That changes my understanding of performance that isn't just about algorithms - it's about understanding how the engine sees your code. The more consistent and predictable your code patterns, the better V8 can optimize.

# Link
https://www.thenodebook.com/node-arch/v8-engine-intro