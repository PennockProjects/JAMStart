<script setup>
const colorMode = useColorMode()
const isShowNextModeLabel = ref(false)

const modes = ['system', 'light', 'dark', 'sepia']

const nextModeIcons = {
  system: '🌓',
  light: '🌕',
  dark: '🌑',
  sepia: '🌒'
}

const nextMode = computed(() => {
  const currentModeIndex = modes.indexOf(colorMode.preference)
  const nextModeIndex = currentModeIndex+1 >= modes.length ? 0 : currentModeIndex+1

  return modes[nextModeIndex]
})

const nextModeIcon = computed(() => nextModeIcons[nextMode.value])

const toggleMode = () => colorMode.preference = nextMode.value
</script>

<template>
  <div class="flex space-x-2 items-center">
    <div class="text-gray-500 text-xs helptext" v-if="isShowNextModeLabel">{{ nextMode }}</div>
    <button 
      @click="toggleMode" 
      @mouseenter="isShowNextModeLabel = true"
      @mouseleave="isShowNextModeLabel = false"
      class="hover:bg-gray-200 dark:hover:bg-gray-600 px-2 py-1 text-gray-500 text-base">
        {{ nextModeIcon }}
    </button>
  </div>
</template>

<style scoped>
.helptext {
  position: absolute;
  transform: translateY(130%);
}
</style>