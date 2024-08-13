<script setup>
const props = defineProps({
  limit: {
    type: Number,
    default: null
  }
})
</script>


<template>
  <PostList v-slot="{posts}" :limit="limit" :sort="{createDate: -1}" contentRoot="blog" >
    <div v-for="post in posts" :key="post.id">
      <NuxtLink :to="post._path">{{ post.title }}</NuxtLink>
    </div>
  </PostList>
</template>