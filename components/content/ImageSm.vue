<script setup>
const props = defineProps({
  float: {
    type: String,
    default: 'left'
  },
  maxHeight: {
    type: String,
    default: '4rem'
  },
  maxWidth: {
    type: String,
    default: '4rem'
  },
  size: {
    type: String,
    default: null
  }
})

const floatClass = props.float
const maxHeightClass = props.maxHeight
</script>

<template>
  <div class="image-small-block-img">
    <slot />
  </div>
  <span class="image-small-post-text">
    <slot name="postText" />    
  </span>
</template>

<style scoped>
.image-small-block-img {
  float: v-bind('props.float');
  @apply m-2
}

.image-small-block-img :deep(img) {
  max-height: v-bind('props.maxHeight');
  max-width: v-bind('props.maxWidth');
  @apply m-0
}
</style>

