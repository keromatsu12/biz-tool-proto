<script setup lang="ts">
import { computed } from 'vue';
import { ChevronDown } from 'lucide-vue-next';

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

const props = withDefaults(defineProps<{
  modelValue?: string | number | null;
  options: SelectOption[];
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  id?: string;
  name?: string;
}>(), {
  modelValue: null,
  label: undefined,
  placeholder: 'Select an option',
  disabled: false,
  error: undefined,
  id: undefined,
  name: undefined,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
  (e: 'blur', event: FocusEvent): void;
  (e: 'focus', event: FocusEvent): void;
}>();

const selectId = computed(() => props.id || `select-${Math.random().toString(36).substr(2, 9)}`);

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  emit('update:modelValue', target.value);
};

const handleBlur = (event: FocusEvent) => emit('blur', event);
const handleFocus = (event: FocusEvent) => emit('focus', event);
</script>

<template>
  <div class="c-base-select" :class="{ 'has-error': !!error, 'is-disabled': disabled }">
    <label v-if="label" :for="selectId" class="c-base-select__label">{{ label }}</label>
    <div class="c-base-select__wrapper">
      <select
        :id="selectId"
        :name="name"
        :value="modelValue"
        :disabled="disabled"
        class="c-base-select__input"
        @change="handleChange"
        @blur="handleBlur"
        @focus="handleFocus"
      >
        <option value="" disabled selected>{{ placeholder }}</option>
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          :disabled="option.disabled"
        >
          {{ option.label }}
        </option>
      </select>
      <ChevronDown class="c-base-select__icon" :size="16" />
    </div>
    <span v-if="error" class="c-base-select__error">{{ error }}</span>
  </div>
</template>

<style lang="scss" src="@base/assets/scss/object/component/_base-select.scss"></style>
