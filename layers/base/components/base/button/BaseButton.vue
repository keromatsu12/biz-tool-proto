<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  to?: string;
  block?: boolean;
}>(), {
  variant: 'primary',
  size: 'medium',
  disabled: false,
  type: 'button',
  to: undefined,
  block: false,
});

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

const componentTag = computed(() => props.to ? 'NuxtLink' : 'button');

const classes = computed(() => [
  'c-base-button',
  `c-base-button--${props.variant}`,
  `c-base-button--${props.size}`,
  { 'c-base-button--block': props.block },
  { 'is-disabled': props.disabled },
]);

const handleClick = (event: MouseEvent) => {
  if (props.disabled) {
    event.preventDefault();
    return;
  }
  emit('click', event);
};
</script>

<template>
  <component
    :is="componentTag"
    :to="to"
    :type="!to ? type : undefined"
    :class="classes"
    :disabled="disabled && !to ? true : undefined"
    @click="handleClick"
  >
    <slot />
  </component>
</template>

<style lang="scss" src="@base/assets/scss/object/component/_base-button.scss"></style>
