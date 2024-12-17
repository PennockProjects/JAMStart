<script setup>
  import { VPdfViewer, VPVBaseProps, useLicense } from '@vue-pdf-viewer/viewer';
  const runtimeConfig = useRuntimeConfig()

  const props = defineProps({ 
    ...VPVBaseProps, 
    title: String,
    licenseKey: { 
      type: String, 
      required: false 
    }
  })

  const licenseKey = props.licenseKey ?? runtimeConfig.public.vuePdfViewerLicenseKey 
  
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