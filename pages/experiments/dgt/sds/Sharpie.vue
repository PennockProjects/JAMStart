<script setup>
import { VPdfViewer } from '@vue-pdf-viewer/viewer';
definePageMeta({
  layout: 'sdslayout'
})

const pdfSrc = ref("/pdf/Sharpie_3000.pdf")

</script>

<template>
  <!-- PDF works with client side only -->
   <div>
    <AppPdfViewer :src="pdfSrc" />
  </div>
</template>

<style></style>