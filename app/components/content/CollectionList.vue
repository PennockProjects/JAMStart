<script setup>
const props = defineProps({
  collection: {
    type: String,
    default: 'blog'
  },
  isShowTopic: {
    type: Boolean,
    default: false
  }
})
const route = useRoute()

const { data: docs } = await useAsyncData(props.collection+'-list', () => {
  return queryCollection('content')
    .where('path',  'LIKE', '/'+props.collection+'/%')
    .select('title', 'path', 'description', 'topic', 'dateCreated')
    .all()
})

const posts = computed(() => {
  if(!docs.value) return []

  const result = []
  let lastYear = null;

  // Create date strings for display
  for(const post of docs.value) {
    const dateCreated = dateNoonLocal(new Date(post?.dateCreated))
    post.date = dateCreated
    const year = dateCreated.getFullYear()
    const month = dateCreated.getMonth() + 1
    const pMonth = month.toString().padStart(2,"0");
    const day = dateCreated.getDate()
    const pDay = day.toString().padStart(2,"0");
    post.monthDay = `${pMonth}-${pDay}`
    post.monthDayYear = `${pMonth}-${pDay}-${year}`
    result.push(post)
  }

  // Sort the list by date
  result.sort((a, b) => b.date - a.date)

  // Add flag if this is the most recent post in the year
  for(const post of result) {
    const dateCreated = post.date
    const year = dateCreated.getFullYear()
    post.isDisplayYear = (year != lastYear) ? true : false
    lastYear = year
  }

  return result
})
</script>


<template>
  <slot :posts="posts">
    <section class="not-prose font-mono mr-2 md:mr-8">
      <div class="grid grid-cols-10 font-light text-xs/7 md:text-lg/9 border-b">
        <div class="col-span-2">date</div>
        <div v-if="props.isShowTopic" class="hidden md:block md:col-span-2">topic</div>
        <div v-if="props.isShowTopic" class="col-span-8 md:col-span-6">title</div>
        <div v-else class="col-span-8">title</div>
      </div>
      <ul>
        <li v-for="post in posts" :key="post.path">
          <NuxtLink 
            :to="post.path" 
            class="grid grid-cols-10 border-b hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <div class="col-span-2 text-xs/7 md:text-lg/9 font-light">
              {{ post.isDisplayYear ? post.monthDayYear : post.monthDay }}
            </div>
            <div v-if="props.isShowTopic" class="hidden md:block md:col-span-2 font-light">{{ post.topic }}</div>
            <div v-if="props.isShowTopic" class="col-span-8 md:col-span-6 font-semibold">{{ post.title }}</div>
            <div v-else class="col-span-8 font-semibold">{{ post.title }}</div>
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