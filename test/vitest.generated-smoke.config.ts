import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['shared/utils/contentGenerated.compat.smoke.ts'],
  },
})