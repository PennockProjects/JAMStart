<script setup>
const props = defineProps({
  limit: {
    type: Number,
    default: null
  }
})
</script>


<template>
  <BlogPosts v-slot="{posts}" :limit="limit">
    <div v-for="post in posts" :key="post.id">
      <NuxtLink :to="post._path">{{ post.title }}</NuxtLink>
    </div>
  </BlogPosts>
</template>