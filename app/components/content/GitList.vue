<script setup>
const props = defineProps({
  repos: {
    type: String,
    default: '/users/PennockProjects/repos'
  },
})

const {error, pending, data} = await useFetch('https://api.github.com' + props.repos)

const repos = computed(
  () => data.value.filter(repo => repo.description)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
)

</script>

<template>
  <div class="not-prose">
    <section v-if="pending">Loading...</section>
    <section v-else-if="error">Something went wrong... Try again!</section>
    <section v-else="pending">
      <ul class="grid grid-cols-1 gap-4">
        <li 
          class="border border-gray-200 dark:border-gray-800 rounded-sm p-4 hover:bg-gray-200 dark:hover:bg-gray-800 font-mono"
          v-for="repo in repos"
          :key="repo.id">
          <a :href="repo.html_url" target="_blank">
            <div class="flex items-center justify-between text-sm">
              <div class="font-semibold">{{repo.name}}</div>
              <div>{{ repo.stargazers_count }} *</div>
            </div>
            <p class="text-sm">{{ repo.description }}</p>
          </a>
        </li>
      </ul>
    </section>
  </div>
</template>

<style lang="">
  
</style>