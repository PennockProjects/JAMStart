<script setup>
import { siteDefaults } from '~~/shared/utils/siteDefaults'

const props = defineProps({
  addendum: {
    type: String,
    default: 'All rights reserved.'
  }
})
</script>

<template>
  <span>
    {{siteDefaults.siteCopyright}}.
  </span>
  <span class="hidden lg:inline-block">
    {{props.addendum}}
  </span>
</template>