---
title: Friendly commits
subtitle: Commits are not just a track of what you did - they should be independently mergeable units
date: 2025-12-23
language: English
tags:
  - git
---
# Cherry-pick friendly commits

Lesson I re-learn today:
Commits are not just a track of what you did - they should be **independently mergeable units**. 

## What is my model?

I think of commits like of React components:

```
// Bad: God Component (does everything, hard to reuse)
const EverythingComponent = () => {
  // 500 lines of mixed concerns
}

// Good: Single Responsibility (easy to compose, reuse, test)
const Button = () => { /* one job */ }
const Input = () => { /* one job */ }
const Form = () => <><Input /><Button /></>
```

Same applies to commits, here are the one I created `<ups>`

```bash
# Bad: God Commit (hard to cherry-pick, review, revert)
"Add Carousel, refactor ImageCarousel, update imports, fix bug"

# Good: Atomic Commits (easy to cherry-pick, review, revert)
"Add Carousel component"
"Refactor ImageCarousel to use Carousel"
"Fix scroll state initialization"
```

## So what are the rules i find for cherry-pickable commits

### Quick the "and" rule

When you think to create a commit message and in your had you see that you would want to add word "and" it's a sign the commit should be split further.

```bash
# Bad: Contains "and"
"Add Carousel and update imports"
"Fix bug and refactor helper"

# Good: Split them
"Add Carousel component"
"Update imports to use Carousel"
```

### First self-contained (like pure components)

Each commit should:
- Build successfully on its own
- Not break existing functionality
- Include ALL files needed for that change

```
// React: Component includes its dependencies
import { useState } from 'react'
const Counter = () => { /* works standalone */ }

// Git: Commit includes its dependencies
+ helpers/calculateDays.js     // new function
+ components/Card.jsx          // uses the function
```

### Next correct dependency order (like import order)

```
// React: Can't use before define
import { helper } from './helper'  // must exist first
const Component = () => helper()

// Git: Can't cherry-pick usage before creation
Commit 1: "Add helper function"        // creates it
Commit 2: "Use helper in Component"    // uses it
```

### This is important lesson for me: parallel paths 

When refactoring, keep old code working:

```jsx
// React: Gradual migration
const NewCarousel = () => { /* new implementation */ }
const OldCarousel = () => { /* still works */ }

// Usage can switch gradually
<NewCarousel /> // or <OldCarousel />
```

```bash
# Git: Same pattern
Commit 1: "Add NewCarousel component"      # old still works
Commit 2: "Switch Media to NewCarousel"    # migration
Commit 3: "Remove OldCarousel"             # cleanup
```

### Then avoid extract + delete + use in one commit

```bash
# Bad: All in one (breaks cherry-picking)
- Delete OldComponent.jsx
+ Add NewComponent.jsx
+ Update imports in 5 files

# Good: Separated (each cherry-pickable)
Commit 1: + Add NewComponent.jsx           # safe addition
Commit 2: + Update Consumer to use New     # safe switch
Commit 3: - Delete OldComponent.jsx        # safe removal
```


Now before committing I ask myself:  **"can someone cherry-pick just this commit onto master?"**

If no - split it further. Ofc sometimes it will needed to pick a few commits in the row for feature to be fully movable but still it makes it easier the having one commit with many changes. 

Here is my example, what I did and was problematic:

```bash
5d9fb929 "Rename ImageCarousel to ImageCarouselWithDialog"
  - Deletes ImageCarousel.jsx (233 lines)
  - Creates ImageCarouselWithDialog.jsx (uses Carousel)
  - Updates MarkerData import
  # Problem: Depends on Carousel.jsx from previous commit

# What would be better, from my perspective is to split it:
xxxxxxxx "Add ImageCarouselWithDialog component"     # standalone
xxxxxxxx "Switch MarkerData to ImageCarouselWithDialog"
xxxxxxxx "Remove deprecated ImageCarousel"
```
