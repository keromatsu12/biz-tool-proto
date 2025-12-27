import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['layers/**/*.{ts,vue}'],
      exclude: [
        '**/*.config.*',
        '**/*.d.ts',
        '**/tests/**',
        '**/coverage/**',
        '**/.nuxt/**',
        '**/node_modules/**',
        '**/dist/**',
      ]
    }
  }
})
