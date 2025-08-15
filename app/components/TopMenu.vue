<template>
  <nav class="font-mono flex flex-row">
    <ul class="flex flex-row space-x-4">
      <li class="inline">
        <NuxtLink to="/" class="link p-0 m-0">
          <div class="inline-block">
            <img class="max-w-7 md:max-w-8 max-h-7 md:max-h-8" src="/images/JAMStartLogoClear.png" />
          </div>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/about" class="link">About</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/articles" class="link">Articles</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/gitprojects" class="link">Git</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/blog" class="link">Blog</NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.link {
  @apply p-1 hover:bg-gray-200 dark:hover:bg-gray-800 text-sm md:text-base
}
</style>