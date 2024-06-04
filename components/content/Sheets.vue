<script setup>
const sort = {title: 1};
</script>

<template>
  <PostList v-slot="{posts}" content-root="sheets" :sort="sort">
    <section class="mr-16 border border-r-2 border-t-0 border-l-0 border-b-0 not-prose font-mono">
      <div class=" text-gray-400 text-sm grid grid-cols-6">
        <div class="col-span-2 md:col-span-1">Topic</div>
        <div class="col-span-4 md:col-span-2">Cheat Sheet</div>
      </div>
      <ul>
        <li v-for="post in posts" :key="post._path">
          <NuxtLink 
            :to="post._path" 
            class="grid grid-cols-6 hover:bg-gray-100 dark:hover:bg-gray-800">
            <div class="col-span-2 md:col-span-1">{{ post.topic }}</div>
            <div class="col-span-4 md:col-span-2">{{ post.title }}</div>
          </NuxtLink>
        </li>
      </ul>
    </section>
  </PostList>
</template>