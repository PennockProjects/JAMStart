---
title: Vue 3 Basics
description: A beginner's guide to getting started with Vue 3.
topic: Vue
isToc: true
createDate: 2023-05-03
createAuthor: John Pennock
image: /images/vue-logo.png
imageAlt: Vue Logo
---

::hero
{{ title }}

#subtitle
A JavaScript front end framework

#image
![Vue 3 Introduction]({/images/vue-logo.png})
::


Vue.js 3 is a progressive JavaScript framework for building user interfaces on the web. It's designed to be incrementally adoptable and can easily scale between a library and a full-featured framework.

---

## Why Choose Vue 3?

Vue 3 comes with several exciting features that make it an excellent choice for developers:

* **Composition API:** This new API provides a set of additive, function-based APIs that allow flexible composition of component logic.

* **Faster rendering:** Vue 3 features a faster virtual DOM and improved runtime performance.

* **Improved TypeScript support:** Vue 3's codebase is written in TypeScript, allowing for better TypeScript integration.

---

## Getting Started with Vue 3

Here's a basic Vue 3 application setup:

```javascript
const { createApp } = Vue
const app = createApp({
  data() {
    return {
      message: 'Hello Vue 3!'
    }
  }
})
app.mount('#app')
```

### State 

#### ref() vs. reactive(): Which should you use?
The significant difference between ref() and reactive() is that the ref() function allows us to declare reactive state for *objects and primatives*, while reactive() only declares reactive state for *objects*.

reactive advantages
- access the state directly instead of with .value.
- backwards compatible.

ref() advantages
- use primatives
- update the entire object at once
- generally more flexible
- typescript support (if you use typescript)

### provide/inject  - avoids props drilling from parent to child.

App                   provide state, eg. [4,6.9,3,7]  Provide("numbers", numbers);
|
Parent
|
Child             <= Inject  const numbers = inject("numbers");
|
GrandChild
|
GreatGrandChild   <= Inject  const numbers = inject("numbers");

- advantage - great for reading state across components
- disadvantage - methods for modifying state need to be duplicated.  Best for readonly.
