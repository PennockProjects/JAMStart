<script setup>
const sort = {title: 1};
</script>

<template>
  <BlogPosts v-slot="{posts}" content-root="sheets" :sort="sort">
    <section class="mx-16 not-prose font-mono">
      <div class="column text-gray-400 text-sm">
        <div>Cheat Sheet</div>
      </div>
      <ul>
        <li v-for="post in posts" :key="post._path">
          <NuxtLink :to="post._path" class="column hover:bg-gray-100 dark:hover:bg-gray-800">
            <div>{{ post.title }}</div>
          </NuxtLink>
        </li>
      </ul>
    </section>
  </BlogPosts>
</template>