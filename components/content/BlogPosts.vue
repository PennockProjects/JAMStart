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
        .only(['_path', 'title', 'publishedAt'])
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
    <section class="not-prose font-mono">
      <div class="column text-gray-400 text-sm">
        <div>date</div>
        <div>title</div>
      </div>
      <ul>
        <li v-for="post in posts" :key="post._path">
          <NuxtLink :to="post._path" class="column group hover:bg-gray-100 dark:hover:bg-gray-800">
            <div 
              :class="{'text-white dark:text-gray-900 group-hover:text-gray-100 dark:group-hover:text-gray-800': !post.isDisplayYear, 'text-gray-400 dark:text-gray-500': post.isDisplayYear}"
            >
              {{  post.displayYear }}
            </div>
            <div>{{ post.title }}</div>
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