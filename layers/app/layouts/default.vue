<script setup lang="ts">
import type { MenuItem } from '../../base/types/menu';

const isSidebarOpen = ref(false);

const menuItems: MenuItem[] = [
  {
    label: 'Dashboard',
    icon: 'LucideHome',
    to: '/'
  },
  {
    label: 'User Management',
    icon: 'LucideUsers',
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
    icon: 'LucideFileText',
    children: [
      { label: 'Monthly', to: '/reports/monthly' },
      { label: 'Yearly', to: '/reports/yearly' }
    ]
  },
  {
    label: 'Settings',
    icon: 'LucideSettings',
    children: [
      { label: 'General', to: '/settings/general' },
      { label: 'Security', icon: 'LucideShield', to: '/settings/security' }
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
