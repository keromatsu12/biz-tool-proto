<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
}>(), {
  title: 'BizTool'
});

const emit = defineEmits<{
  (e: 'toggle-menu'): void
}>();
</script>

<template>
  <header class="l-header">
    <div class="l-header__inner">
      <button class="l-header__toggle" @click="emit('toggle-menu')" aria-label="Toggle Menu">
        <LucideMenu :size="24" />
      </button>
      <div class="l-header__logo">
        {{ title }}
      </div>
      <div class="l-header__actions">
        <slot name="actions"></slot>
      </div>
    </div>
  </header>
</template>

<style lang="scss" src="@base/assets/scss/layout/_header.scss"></style>
