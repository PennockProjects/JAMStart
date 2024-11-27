<script setup>
  import { VPdfViewer, VPVBaseProps, useLicense } from '@vue-pdf-viewer/viewer';

  const props = defineProps({ 
    ...VPVBaseProps, 
    title: String,
    licenseKey: { 
      type: String, 
      required: false 
    }
  })

  const licenseKey = '20f433a9-1401-4652-a6cc-7a9d909f13e1';
  // props.licenseKey ?? import.meta.env.VITE_VPV_LICENSE ?? 
  
  // useLicense must be used here to ensure proper license 
  // initialization before the component renders.
  useLicense({ licenseKey }); 

</script>
<template>
  <div>
    <h2>
      {{ props.title }}
    </h2>
    <div :style="{ width: '100%', height: '900px', margin: '0 auto' }">
      <VPdfViewer v-bind="$props" />
    </div>
  </div>
</template>