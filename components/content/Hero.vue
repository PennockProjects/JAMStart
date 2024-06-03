<template>
  <section class="hero">
    <div class="hero-content">
      <slot name="image" />
      <div class="text-container">
        <h1 class="hero-title">
          <slot />
        </h1>
        <h3 class="hero-subtitle">
          <slot name="subtitle" />
        </h3>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-content {
  position: relative;
  width: 100%;
  text-align: center;
}

.text-container {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(224, 224, 224, 0.9);
    @apply absolute p-2 text-center text-sm
}

</style>