<script setup>
import { VPdfViewer } from '@vue-pdf-viewer/viewer';
definePageMeta({
  layout: 'sdslayout'
})

const pdfSrc = ref("/pdf/cloroxregular-bleach12015-06-12.pdf")

</script>

<template>
  <!-- PDF works with client side only -->
   <div>
    <AppPdfViewer :src="pdfSrc" />
  </div>
  <!-- <div class="w-full">
    <h1>Clorox Bleach</h1>
    <embed src="/pdf/cloroxregular-bleach12015-06-12.pdf" width="100%" height="900px" />
  </div> -->
</template>

<style>
</style>