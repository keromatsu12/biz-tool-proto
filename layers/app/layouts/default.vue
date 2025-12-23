<script setup lang="ts">
import { ref } from 'vue';
import { Home, Users, Settings, FileText, Shield, Lock } from 'lucide-vue-next';
import type { MenuItem } from '../../base/types/menu'; // Path relative to layers/app/layouts/default.vue?
// No, layers/app is parallel to layers/base?
// Structure:
// layers/app/layouts/default.vue
// layers/base/types/menu.ts
// So ../../base/types/menu is correct?
// layers/app/layouts -> ../ -> layers/app -> ../ -> layers -> /base -> /types.
// Actually: layers/app/layouts/default.vue -> ../../ -> layers/app?
// layers/app/layouts/default.vue
//   dirname: layers/app/layouts
//   .. -> layers/app
//   .. -> layers
//   base -> layers/base
// So ../../base/types/menu.ts seems correct.
// However, in Nuxt alias `@base` is configured in `layers/base/nuxt.config.ts`.
// But `layers/app` extends `base`. Does it inherit aliases? Usually yes.
// Let's try `@base/types/menu`.

const isSidebarOpen = ref(false);

const menuItems: MenuItem[] = [
  {
    label: 'Dashboard',
    icon: Home,
    to: '/'
  },
  {
    label: 'User Management',
    icon: Users,
    children: [
      {
        label: 'Users List',
        to: '/users'
      },
      {
        label: 'Roles',
        children: [
          { label: 'Admin', to: '/users/roles/admin' },
          { label: 'Editor', to: '/users/roles/editor' }
        ]
      }
    ]
  },
  {
    label: 'Reports',
    icon: FileText,
    children: [
      { label: 'Monthly', to: '/reports/monthly' },
      { label: 'Yearly', to: '/reports/yearly' }
    ]
  },
  {
    label: 'Settings',
    icon: Settings,
    children: [
      { label: 'General', to: '/settings/general' },
      { label: 'Security', icon: Shield, to: '/settings/security' }
    ]
  }
];
</script>

<template>
  <div class="l-app">
    <TheHeader :title="'BizTool'" @toggle-menu="isSidebarOpen = !isSidebarOpen" />

    <TheSidebar
      :items="menuItems"
      :is-open="isSidebarOpen"
      @close="isSidebarOpen = false"
    />

    <main class="l-main">
      <div class="l-main__inner">
        <slot />
      </div>
    </main>

    <TheFooter />
  </div>
</template>

<style lang="scss" src="@base/assets/scss/layout/_main.scss"></style>
