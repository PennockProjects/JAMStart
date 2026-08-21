<script setup>
import { normalizeDateToNoon } from '#shared/utils/time'

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

const { data: docs } = await useAsyncData(props.collection+'-list', () => {
  return queryCollection('content')
    .where('stem',  'LIKE', props.collection+'/%')
    .where('stem', '!=', props.collection+'/index')
    .all()
})

const posts = computed(() => {
  if(!docs.value) return []

  const result = []
  let lastYear = null;

  // Create meta data, date strings, file type, for display
  for(const post of docs.value) {
    const date_created = normalizeDateToNoon(post?.date_created ?? '')
    const date_obj = new Date(date_created)
    post.date = date_obj
    const year = date_obj.getFullYear()
    const month = date_obj.getMonth() + 1
    const pMonth = month.toString().padStart(2,"0");
    const day = date_obj.getDate()
    const pDay = day.toString().padStart(2,"0");
    post.monthDay = `${pMonth}-${pDay}`
    post.monthDayYear = `${pMonth}-${pDay}-${year}`
    post.hasLeadingUnderscore = /(^|\/)_/.test(post?.path || '');
    result.push(post)
  }

  // Sort the list by date
  result.sort((a, b) => b.date - a.date)

  // Add flag if this is the most recent post in the year
  for(const post of result) {
    const date_created = post.date
    const year = date_created.getFullYear()
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
            <div v-if="props.isShowTopic" class="col-span-8 md:col-span-6 font-semibold">
              <span v-if="post.hasLeadingUnderscore" class="info">
                {{ post.title }} dev only
              </span>
              <span v-else>
                {{ post.title }}
              </span>
            </div>
            <div v-else class="col-span-8 font-semibold">
              <span v-if="post.hasLeadingUnderscore" class="info">
                {{ post.title }} dev only
              </span>
              <span v-else>
                {{ post.title }}
              </span>
            </div>
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