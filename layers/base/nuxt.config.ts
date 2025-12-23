import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  alias: {
    '@base': currentDir
  },
  components: [
    {
      path: 'components/base',
      pathPrefix: false
    }
  ],
  css: [
    join(currentDir, 'assets/scss/style.scss')
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@base/assets/scss/foundation/_variables.scss" as *;'
        }
      }
    }
  }
})
