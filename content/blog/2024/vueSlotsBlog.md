---
title: Intro to Vue 3 Slots
topic: Vue
description: How slots are used in Vue 3
publishedAt: 2024-05-23 10:00:00
isToc: true
---

A blog post for understanding the basics of Vue 3 slots.  See [Vue 3 Slot cheat sheet](/sheets/vueslots)

## What is a Slot?

[Vue.js 3 slot](https://vuejs.org/guide/components/slots.html#scoped-slots) is a way to pass template (HTML) data to a component.  Similarly how you can pass data via props, you pass the html data to the component via scoped slots.  All of the html data that the parent places between the start `<Element>` and closing `</Element>` of the custom component is passed in the slot.  For example if we have a `FancyButton` component which accepts slot data, the parent could add a component with `Click me!` within like:

```html
<FancyButton>
  Click me! <!-- slot content -->
</FancyButton>
```

And if we have a slot element defined in the component like:

```html
<button class="fancy-btn">
  <slot></slot> <!-- slot outlet -->
</button>
```

The final rendered DOM:
```html
<button class="fancy-btn">
  Click me!
</button>
```

With slots, the component is responsible for rendering the outer html content and styling, while the parents provides the inner html content and styling.

## Render Scope​
Slots are not limited to simple html

You can include multiple elements and even other components.

Slot content has access to the data scope of the parent component, because it is defined in the parent.

> Expressions in the parent template only have access to the parent scope; expressions in the child template only have access to the child scope.

## Fallback Content
Any html/template placed within the `<slot></slot>` **in the component itself** is considered fallback content that shows up if the parent using the component does not provide any html/template in the component **in the parent**

## Named Slots
You can have more than one slot in a component, but you have to name all others but one (the default)

```html
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
or
```html
<BaseLayout>
  <template #header>
    <h1>Here might be a page title</h1>
  </template>

  <!-- implicit default slot -->
  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template #footer>
    <p>Here's some contact info</p>
  </template>
</BaseLayout>
```

## Conditional Slots

Sometimes you want to render something based on whether or not a slot is present.

You can use the $slots property in combination with a v-if to achieve this.

In the example below we define a Card component with three conditional slots: `header`, `footer` and the `default` one. When the header / footer / default is present we want to wrap them to provide additional styling:

```html
<template>
  <div class="card">
    <div v-if="$slots.header" class="card-header">
      <slot name="header" />
    </div>
    
    <div v-if="$slots.default" class="card-content">
      <slot />
    </div>
    
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>
```

## Scoped Slots

Normally, the slot content does not have access to the child component state.  We can pass attributes from the child component like how we pass props.

```html
<!-- <MyComponent> template -->
<div>
  <slot :text="greetingMessage" :count="1"></slot>
</div>
```

To receive the child component state in the parent you use the v-slot and access the props off that.

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