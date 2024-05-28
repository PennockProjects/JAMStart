<template>
  <nav class="font-mono">
    <ul class="flex flex-col sm:flex-row md:space-x-4">
      <li class="sm:hidden">
        <NuxtLink to="/" class="link">John Pennock</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/about" class="link">About</NuxtLink>
      </li>      
      <li>
        <NuxtLink to="/projects" class="link">Projects</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/sheets" class="link"><span class="sm:hidden lg:inline">Cheat </span>Sheets</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/blog" class="link">Blog</NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.link {
  @apply p-1 hover:bg-gray-200 dark:hover:bg-gray-800 text-2xl sm:text-base
}
</style>