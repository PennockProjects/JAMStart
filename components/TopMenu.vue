<template>
  <nav class="font-mono">
    <ul class="flex flex-col sm:flex-row md:space-x-4">
      <li class="sm:hidden">
        <NuxtLink to="/" class="link">Pennock Projects</NuxtLink>
      </li>    
      <li>
        <NuxtLink to="/code" class="link">Code</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/ops" class="link">Ops</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/contenttips" class="link">Content</NuxtLink>
      </li>      
      <li>
        <NuxtLink to="/gitprojects" class="link">Git</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/blog" class="link">Blog</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/about" class="link">About</NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.link {
  @apply p-1 hover:bg-gray-200 dark:hover:bg-gray-800 text-2xl sm:text-base
}
</style>