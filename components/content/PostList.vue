<script setup>
const props = defineProps({
  limit: {
    type: Number,
    default: null
  },
  contentRoot: {
    type: String,
    default: 'blog'
  },
  sort: {
    type: Object,
    default: {publishedAt: -1}
  }
})
const { data } = await useAsyncData(
    props.contentRoot + '-list',
    () => {
      const query = queryContent(props.contentRoot)
        .where({_path: { $ne: '/'+props.contentRoot} })
        .only(['_path', 'title', 'topic', 'publishedAt'])
        .sort(props.sort)

      if (props.limit) {
        query.limit(props.limit)
      }

      return query.find()
    }
)

const posts = computed(() => {
  if(!data.value) return []

  const result = []
  let lastYear = null;

  for(const post of data.value) {
    const year = new Date(post.publishedAt).getFullYear()
    post.isDisplayYear = (year != lastYear)
    post.displayYear = year
    lastYear = year
    result.push(post)
  }
  return result
})
// console.log(posts)
</script>

<template>
  <slot :posts="posts">
    <section class="not-prose font-mono mr-4 md:mr-16">
      <div class="text-gray-400 text-sm grid grid-cols-7">
        <div class="col-span-1">date</div>
        <div class="col-span-6 md:col-span-5">title</div>
        <div class="hidden md:block md:col-span-1">topic</div>
      </div>
      <ul>
        <li v-for="post in posts" :key="post._path">
          <NuxtLink :to="post._path" class="grid grid-cols-7 hover:bg-gray-100 dark:hover:bg-gray-800">
            <div 
              class="col-span-1"
              :class="{'text-white dark:text-gray-900 group-hover:text-gray-100 dark:group-hover:text-gray-800': !post.isDisplayYear, 'text-gray-400 dark:text-gray-500': post.isDisplayYear}"
            >
              {{  post.displayYear }}
            </div>
            <div class="col-span-6 md:col-span-5">{{ post.title }}</div>
            <div class="hidden md:block md:col-span-1">{{ post.topic }}</div>
          </NuxtLink>
        </li>
      </ul>
    </section>
  </slot>
</template>

<style scoped>
.column {
  @apply flex items-center space-x-8 py-2 border-b border-gray-200 dark:border-gray-700
}
</style>