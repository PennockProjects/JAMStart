<script setup>
const { data } = await useAsyncData(
    'sheet-list',
    () => queryContent('sheet')
      .where({_path: { $ne: '/sheets'} })
      .sort({publishedAt: -1})
      .find()
)

const sheets = computed(() => {
  if(!data.value) return []

  const result = []

  for(const sheet of data.value) {
    result.push(sheet)
  }
  return result
})
// console.log(sheets)
</script>

<template>
  <section class="mx-16 not-prose font-mono">
    <div class="column text-gray-400 text-sm">
      <div>Cheat Sheet</div>
    </div>
    <ul>
      <li v-for="sheet in sheets" :key="sheet._path">
        <NuxtLink :to="sheet._path" class="column hover:bg-gray-100 dark:hover:bg-gray-800">
          <div>{{ sheet.title }}</div>
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.column {
  @apply flex items-center space-x-8 py-2 border-b border-gray-200 dark:border-gray-700
}
</style>