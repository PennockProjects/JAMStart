<script setup>
const sort = {topic: 1};
</script>

<template>
  <PostList v-slot="{posts}" content-root="code" :sort="sort">
    <section class="border border-r-2 border-t-0 border-l-0 border-b-0 not-prose font-mono">
      <div class=" text-gray-400 text-sm grid grid-cols-10">
        <div class="col-span-3 md:col-span-2">Topic</div>
        <div class="col-span-7 md:col-span-8">Examples</div>
      </div>
      <ul>
        <li v-for="post in posts" :key="post._path">
          <NuxtLink 
            :to="post._path" 
            class="grid grid-cols-10 hover:bg-gray-100 dark:hover:bg-gray-800">
            <div class="col-span-3 md:col-span-2">{{ post.topic }}</div>
            <div class="col-span-7 md:col-span-8">{{ post.title }}</div>
          </NuxtLink>
        </li>
      </ul>
    </section>
  </PostList>
</template>