<script setup lang="ts">
const props = defineProps<{
  title?: string;
  loading?: boolean;
}>();
</script>

<template>
  <div class="c-base-card">
    <div v-if="title || $slots.header" class="c-base-card__header">
      <h3 v-if="title" class="c-base-card__title">{{ title }}</h3>
      <slot name="header" />
    </div>

    <div class="c-base-card__body">
      <slot />
    </div>

    <div v-if="$slots.footer" class="c-base-card__footer">
      <slot name="footer" />
    </div>

    <div v-if="loading" class="c-base-card__loading">
      <div class="c-base-card__spinner"></div>
    </div>
  </div>
</template>

<style lang="scss" src="@base/assets/scss/object/component/_base-card.scss"></style>
