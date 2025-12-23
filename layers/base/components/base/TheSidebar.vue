<script setup lang="ts">
import SideMenu from './SideMenu.vue';
import type { MenuItem } from '../../../types/menu';

defineProps<{
  isOpen: boolean;
  items: MenuItem[];
}>();

const emit = defineEmits<{
  (e: 'close'): void
}>();
</script>

<template>
  <div>
    <aside class="l-sidebar" :class="{ 'is-open': isOpen }">
      <div class="l-sidebar__inner">
        <SideMenu :items="items" />
      </div>
    </aside>
    <!-- Overlay for mobile -->
    <div
      class="l-sidebar-overlay"
      :class="{ 'is-active': isOpen }"
      @click="emit('close')"
    ></div>
  </div>
</template>

<style lang="scss" src="@base/assets/scss/layout/_sidebar.scss"></style>
