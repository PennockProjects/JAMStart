<script setup>
const route = useRoute()
defineProps({
  links: {
    type: Array,
    required: true
  },
  level: {
    type: Number,
    default: 0
  },
  activeId: {
    type: String,
    default: null
  }
})

</script>

<template>
  <ul>
    <li v-for="link in links" :key="link.id">
      <NuxtLink 
        :to="{path: route.path, hash: `#${link.id}`}"
        :class="{ 'ml-4 text-sm': level, 'text-green-600 dark:text-green-400': activeId === link.id}"
      >
        {{  link.text }}
      </NuxtLink>
      <TocLinks v-if="link.children && link.children.length" :links="link.children" :level="level + 1" :active-id="activeId"/>
    </li>
  </ul>
</template>

<style>

</style>