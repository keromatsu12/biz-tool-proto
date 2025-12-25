<script setup lang="ts">
const props = withDefaults(defineProps<{
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info';
  label: string;
}>(), {
  variant: 'secondary',
});

const classes = computed(() => [
  'c-status-label',
  `c-status-label--${props.variant}`,
]);
</script>

<template>
  <span :class="classes">
    {{ label }}
  </span>
</template>

<style lang="scss" src="@base/assets/scss/object/component/_status-label.scss"></style>
