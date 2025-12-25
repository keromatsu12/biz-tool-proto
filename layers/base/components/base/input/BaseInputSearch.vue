<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue?: string;
  placeholder?: string;
  disabled?: boolean;
}>(), {
  modelValue: '',
  placeholder: 'Search...',
  disabled: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'search'): void;
}>();

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};

const handleEnter = () => {
  emit('search');
};
</script>

<template>
  <div class="c-input-search" :class="{ 'is-disabled': disabled }">
    <LucideSearch class="c-input-search__icon" :size="18" />
    <input
      type="search"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      class="c-input-search__input"
      @input="handleInput"
      @keydown.enter="handleEnter"
    />
  </div>
</template>

<style lang="scss" src="@base/assets/scss/object/component/_input-search.scss"></style>
