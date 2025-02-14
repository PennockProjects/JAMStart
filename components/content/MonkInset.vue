<!--
MonkInset - a Nuxt.js NuxtContent component from Pennock Projects, MIT License, Copyright (c) 2024 John Pennock
version: 1.0
-->
<script setup>

const props = defineProps({
  float: {
    type: String,
    default: 'left'
  },
  fontSize: {
    type: String
  },
  height: {
    type: String
  },
  lineHeight: {
    type: String
  },
  margin: { 
    type: String
  },
  maxHeight: {
    type: String
  },
  maxWidth: {
    type: String
  },
  size: {
    type: String,
    default: 'md'
  }
})

const sizeDefaults = {
  xs: {
    size: 'xs',
    divMarginContent: '0.1em',
    imgMaxHeight: '0.9em',
    imgMaxWidth: '0.9em',
    pFontSize: '0.5em',
    pHeight: '1em',
    pLineHeight: '1em',
    pMarginTop: '1.7em'
  },
  sm: {
    size: 'sm',
    divMarginContent: '0.2em',
    imgMaxHeight: '3em',
    imgMaxWidth: '3em',
    pFontSize: '1.3em',
    pHeight: '1.0em',
    pLineHeight: '1.0em',
    pMarginTop: '0.3em'
  },
  md: {
    divMarginContent: '0.4em',
    size: 'md',
    imgMaxHeight: '6em',
    imgMaxWidth: '6em',
    pFontSize: '1.8em',
    pHeight: '1.0em',
    pLineHeight: '1.0em',
    pMarginTop: '0.1em'
  },
  lg: {
    size: 'lg',
    divMarginContent: '0.6em',
    imgMaxHeight: '9em',
    imgMaxWidth: '9em',
    pFontSize:'3em',
    pHeight: '1.0em',
    pLineHeight: '1.0em',
    pMarginTop: '-0.1em'
  },
  xl: {
    size: 'xl',
    divMarginContent: '0.8em',
    imgMaxHeight: '12em',
    imgMaxWidth:  '12em',
    pFontSize: '5em',
    pHeight: '1.0em',
    pLineHeight: '1.0em',
    pMarginTop: '-0.25em'
  }
}

// 'size' parameter validation
const sizeString = ref(props.size)
const sizeStrings = ['xs', 'sm', 'md', 'lg', 'xl']
if(!sizeStrings.includes(sizeString.value)) {
  console.warn("MonkInset", "size='" + sizeString.value + "'", "is not a known value and not one of the known size values", "'" + sizeStrings.toString() + "'")
  sizeString.value = 'md'
}

const floatInsetClass = props.float == 'left' ? 'inset-left' : (props.float == 'right' ? 'inset-right' : '')
const divMarginContentClass = props.margin || sizeDefaults[sizeString.value].divMarginContent;
const divMarginOpposite = '0em'
const imgMaxHeightClass = props.maxHeight || sizeDefaults[sizeString.value].imgMaxHeight
const imgMaxWidthClass = props.maxWidth || sizeDefaults[sizeString.value].imgMaxWidth
const pFontSizeClass = props.fontSize || sizeDefaults[sizeString.value].pFontSize
const pLineHeightClass = props.lineHeight || sizeDefaults[sizeString.value].pLineHeight
const pHeightClass = props.height || sizeDefaults[sizeString.value].pHeight
const pMarginTop = sizeDefaults[sizeString.value].pMarginTop

</script>

<template>
  <div class="monk-inset" :class="floatInsetClass">
    <slot />
  </div>
</template>

<style scoped>
.inset-left {
  margin-left: v-bind('divMarginOpposite');
  margin-right: v-bind('divMarginContentClass');
  @apply clear-left float-left
}

.inset-right {
  margin-left: v-bind('divMarginContentClass');
  margin-right: v-bind('divMarginOpposite');
  @apply clear-right float-right
}


.monk-inset :deep(img) {
  max-width: v-bind('imgMaxWidthClass');
  max-height: v-bind('imgMaxHeightClass');
  margin-top: 1em;
  @apply p-0 mb-0
}

.monk-inset :deep(p) {
  font-size: v-bind('pFontSizeClass');
  margin-top: v-bind('pMarginTop');
  @apply p-0 ml-0 mr-0 mb-0
}

</style>

