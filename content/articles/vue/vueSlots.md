---
title: Vue 3 Slots
description: A cheat sheet for Vue 3 Slots
topic: Vue
format: Cheat Sheet
isToc: true
createDate: 2023-05-23
createAuthor: John Pennock
---

A cheat sheet with examples and snippets for Vue 3 Slots.  See [Vue 3 Slot blog post](/blog/2024/vueslotsblog) for more information.

## Named Slots
You can have more than one slot in a component, but you have to name all others but one (the default)

```html
<!-- <MyComponent> template -->
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

A parent who wants to use the named component slots needs to specify the name with a `#{name}` or no name for default, like:

```html
<!-- <MyParent> template -->
<BaseLayout>
  <template #header>
    <h1>Here might be a page title</h1>
  </template>

  <template #default>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </template>

  <template #footer>
    <p>Here's some contact info</p>
  </template>
</BaseLayout>
```

## Scoped Slots

```html
<!-- <MyComponent> template -->
<div>
  <slot :text="greetingMessage" :count="1"></slot>
</div>
```

```html
<!-- <MyParent> template -->
<MyComponent v-slot="slotProps">
  {{ slotProps.text }} {{ slotProps.count }}
</MyComponent>

<!-- destructuring also works -->
<MyComponent v-slot="{ text, count }">
  {{ text }} {{ count }}
</MyComponent>
```

