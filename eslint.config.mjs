// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt([
  // Your other global configs...
  {
    rules: {
      'vue/multi-word-component-names': ['error', {
        ignores: ['error', 'index', 'default', '[...slug]'] // 'error' fixes your issue
      }]
    }
  }
])
