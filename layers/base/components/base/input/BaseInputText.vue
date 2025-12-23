<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  modelValue?: string | number;
  label?: string;
  type?: 'text' | 'password' | 'email' | 'tel' | 'url';
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  id?: string;
  name?: string;
  readonly?: boolean;
}>(), {
  modelValue: '',
  label: undefined,
  type: 'text',
  placeholder: '',
  disabled: false,
  error: undefined,
  id: undefined,
  name: undefined,
  readonly: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'blur', event: FocusEvent): void;
  (e: 'focus', event: FocusEvent): void;
}>();

const inputId = computed(() => props.id || `input-${Math.random().toString(36).substr(2, 9)}`);

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};

const handleBlur = (event: FocusEvent) => emit('blur', event);
const handleFocus = (event: FocusEvent) => emit('focus', event);
</script>

<template>
  <div class="c-input-text" :class="{ 'has-error': !!error, 'is-disabled': disabled }">
    <label v-if="label" :for="inputId" class="c-input-text__label">{{ label }}</label>
    <div class="c-input-text__wrapper">
      <input
        :id="inputId"
        :type="type"
        :name="name"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        class="c-input-text__input"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
      />
    </div>
    <span v-if="error" class="c-input-text__error">{{ error }}</span>
  </div>
</template>

<style lang="scss" src="@base/assets/scss/object/component/_input-text.scss"></style>
