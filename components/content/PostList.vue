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
    default: {createDate: -1}
  }
})

const { data } = useAsyncData(
  props.contentRoot + '-list',
  () => {
    const query = queryContent(props.contentRoot)
      .where({_path: { $ne: '/'+props.contentRoot} })
      .where({_partial: false})
      .only(['_path', 'title', 'topic', 'createDate'])
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
    const createDate = new Date(post.createDate)
    const year = createDate.getFullYear()
    const month = createDate.getMonth() + 1
    const pMonth = month.toString().padStart(2,"0");
    const day = createDate.getDate()
    const pDay = day.toString().padStart(2,"0");
    post.monthDay = `${pMonth}-${pDay}`
    post.monthDayYear = `${pMonth}-${pDay}-${year}`
    post.isDisplayYear = (year != lastYear) ? true : false
    lastYear = year
    result.push(post)
  }
  return result
})
// console.log(posts)
</script>

<!-- :class="{'text-white dark:text-gray-900 group-hover:text-gray-100 dark:group-hover:text-gray-800': !post.isDisplayYear, 'text-gray-400 dark:text-gray-500': post.isDisplayYear}" -->

<template>
  <slot :posts="posts">
    <section class="not-prose font-mono mr-2 md:mr-8">
      <div class="grid grid-cols-10 font-light text-xs/7 md:text-lg/9 border-b">
        <div class="col-span-2">date</div>
        <div class="hidden md:block md:col-span-2">topic</div>
        <div class="col-span-8 md:col-span-6">title</div>
      </div>
      <ul>
        <li v-for="post in posts" :key="post._path">
          <NuxtLink 
            :to="post._path" 
            class="grid grid-cols-10 border-b hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <div class="col-span-2 text-xs/7 md:text-lg/9 font-light">
              {{ post.isDisplayYear ? post.monthDayYear : post.monthDay }}
            </div>
            <div class="hidden md:block md:col-span-2 font-light">{{ post.topic }}</div>
            <div class="col-span-8 md:col-span-6 font-semibold">{{ post.title }}</div>
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