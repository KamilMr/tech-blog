---
title: Selectors in React Redux
tags:
  - React
date: " 2025-03-28"
language: English
---

Yesterday, I was going through one of our repositories, trying to understand how selectors are placed in our components. Should I move them down into the components, or leave them in the parent component? To figure that out, I skimmed through the documentation and took some basic notes—mostly as a reminder and so I can add this to my digital garden—on what I should know about them.

Selectors are primarily used to encapsulate logic for retrieving specific values from state. A selector accepts the state and returns either the whole state or a portion of it.

**Naming convention:**

```js 
// [select] + [description of value being selected]
const selectTodoById = state => state.todo;
```

Selectors run on every dispatched action, regardless of which part of the state was updated. They use === to check references. So, if you use methods like filter or map that return a new array, it will create a new reference.

**Example from the documentation:**

```js
function TodoList() {
  // ❌ WARNING: this _always_ returns a new reference, so it will _always_ re-render!
  const completedTodos = useSelector(state =>
    state.todos.map(todo => todo.completed)
  )
}
```

Memoization is important because it allows the selector to cache its output and return the same reference if the input hasn’t changed.

An important pattern is that **input selectors** should only extract values, while **output selectors** should handle transformation logic. Keep in mind, Reselect compares input selector data and the output using strict equality (===).

If:

```js
selectA === previousSelectA && a === previousA
```

Then the selector will skip recomputation.

```js
const selectABC2 = createSelector(selectA, selectB, selectC, (a, b, c) => {
  // transformation logic here
});
```

Output selectors should always contain transformation logic.