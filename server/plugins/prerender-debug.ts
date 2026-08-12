export default defineNitroPlugin((nitroApp) => {
    nitroApp.hooks.hook('error', (error, { event }) => {
    console.error('[nitro:error]', event?.path, error?.stack || error)
  })
})
