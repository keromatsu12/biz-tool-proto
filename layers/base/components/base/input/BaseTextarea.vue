<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  id?: string;
  name?: string;
  readonly?: boolean;
  rows?: number;
}>(), {
  modelValue: '',
  label: undefined,
  placeholder: '',
  disabled: false,
  error: undefined,
  id: undefined,
  name: undefined,
  readonly: false,
  rows: 3,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'blur', event: FocusEvent): void;
  (e: 'focus', event: FocusEvent): void;
}>();

const textareaId = computed(() => props.id || `textarea-${Math.random().toString(36).substr(2, 9)}`);

const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement;
  emit('update:modelValue', target.value);
};

const handleBlur = (event: FocusEvent) => emit('blur', event);
const handleFocus = (event: FocusEvent) => emit('focus', event);
</script>

<template>
  <div class="c-input-textarea" :class="{ 'has-error': !!error, 'is-disabled': disabled }">
    <label v-if="label" :for="textareaId" class="c-input-textarea__label">{{ label }}</label>
    <div class="c-input-textarea__wrapper">
      <textarea
        :id="textareaId"
        :name="name"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :rows="rows"
        class="c-input-textarea__input"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
      ></textarea>
    </div>
    <span v-if="error" class="c-input-textarea__error">{{ error }}</span>
  </div>
</template>

<style lang="scss" src="@base/assets/scss/object/component/_input-textarea.scss"></style>
