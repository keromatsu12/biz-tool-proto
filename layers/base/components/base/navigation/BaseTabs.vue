<script setup lang="ts">
export interface TabItem {
  label: string;
  value: string | number;
  disabled?: boolean;
}

const props = defineProps<{
  items: TabItem[];
  modelValue: string | number;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
}>();

const selectTab = (value: string | number) => {
  emit('update:modelValue', value);
};
</script>

<template>
  <div class="c-base-tabs">
    <div class="c-base-tabs__header" role="tablist">
      <button
        v-for="item in items"
        :key="item.value"
        class="c-base-tabs__tab"
        :class="{
          'is-active': modelValue === item.value,
          'is-disabled': item.disabled
        }"
        role="tab"
        :aria-selected="modelValue === item.value"
        :disabled="item.disabled"
        @click="selectTab(item.value)"
      >
        {{ item.label }}
      </button>
    </div>
    <div class="c-base-tabs__content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" src="@base/assets/scss/object/component/_base-tabs.scss"></style>
