<!-- components/MyContentComponent.vue -->
<script setup>
import { useRuntimeConfig } from '#app';

const runtimeConfig = useRuntimeConfig();
const siteVersion = runtimeConfig.public.version;
const nuxtVersion = runtimeConfig.public.nuxtVersion;
const nuxtContentVersion = runtimeConfig.public.nuxtContentVersion;
const vueVersion = runtimeConfig.public.vueVersion;

</script>

<template>
  <div>
    <table class="versionTable">
      <tbody>
        <tr>
          <td>JAMStart</td>
          <td><span class="info">{{ siteVersion }}</span></td>
        </tr>
        <tr>
          <td>Nuxt</td>
          <td><span class="info">{{ nuxtVersion }}</span></td>
        </tr>
        <tr>
          <td>Vue</td>
          <td><span class="info">{{ vueVersion }}</span></td>
        </tr>
        <tr>
          <td>Nuxt Content</td>
          <td><span class="info">{{ nuxtContentVersion }}</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.versionTable td {
  text-align:center
}
</style>