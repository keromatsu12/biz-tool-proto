// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['./layers/app'],
  devtools: { enabled: true },
  typescript: {
    strict: true
  }
})
