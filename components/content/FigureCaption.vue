<!--
FigureCaption - a Nuxt.js NuxtContent component from Pennock Projects, MIT License, Copyright (c) 2024 John Pennock
version: 1.0
-->

<template>
  <div class="figure-all">
    <figure class="figure-image not-prose">
      <slot />
    </figure>
    <figcaption v-if="$slots.caption" class="caption-container">
      <span class="figure-caption">
        <slot name="caption" />
      </span>
    </figcaption>
  </div>
</template>

<style scoped>
.figure-all {
  @apply p-2 m-0 w-full
}

.caption-container {
  @apply my-2 sm:text-center
}

.figure-image :deep(img) {
  max-height: 80%;
  max-width: 100%;
  @apply mx-auto
}
</style>