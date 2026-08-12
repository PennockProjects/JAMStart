<script setup>
defineProps({ error: {
  type: Object,
  default: () => ({})
}})

</script>

<template>
  <NuxtLayout>
    <section>
      <h1 class="text-4xl mb-4`">
        Oops Error {{ error?.statusCode || 'Unknown' }}
      </h1>
      <h2 class="text-xl text-gray-500 dark:text-gray-400">
        {{  error?.statusMessage || 'An unexpected error occurred.' }}
      </h2>
    </section>
  </NuxtLayout>
</template>