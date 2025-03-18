<template>
  <div class="mt-2 mb-2 container mx-auto">
    <header class="flex justify-between items-start sm:items-center">
      <div class="flex items-center sm:space-x-12">
        <div class="hidden sm:block">
          <NuxtLink to="/" class="text-xl font-semibold p-2 hover:bg-gray-200 dark:hover:bg-gray-800">JAMStart</NuxtLink>
        </div>
        <TopMenu />
      </div>
      
      <ClientOnly>
        <ColorModeSelector />
      </ClientOnly>
    </header>
    <main class="p-1 md:p-2 mt-0 mx-auto">
      <slot />
    </main>
    <footer class="text-center">Copyright © 2025 JAMStart. This website is licensed under the MIT License.</footer>
  </div>
</template>