<!--
ButtonImage - a Nuxt.js NuxtContent component from Pennock Projects, MIT License, Copyright (c) 2024 John Pennock
version: 1.0
-->

<template>
  <div class="button-container">
    <button class="button not-prose">
      <slot />
    </button>
  </div>
</template>

<style scoped>
.button-container {
  @apply p-2 m-0 w-1/3 inline-block
}

.button :deep(img) {
  max-height: 80%;
  max-width: 100%;
  @apply mx-auto
}
</style>