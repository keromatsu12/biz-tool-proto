<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue?: number | null;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  id?: string;
  name?: string;
  min?: number;
  max?: number;
  step?: number;
  readonly?: boolean;
}>(), {
  modelValue: null,
  label: undefined,
  placeholder: '',
  disabled: false,
  error: undefined,
  id: undefined,
  name: undefined,
  min: undefined,
  max: undefined,
  step: 1,
  readonly: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: number | null): void;
  (e: 'blur', event: FocusEvent): void;
  (e: 'focus', event: FocusEvent): void;
}>();

const inputId = computed(() => props.id || `input-number-${Math.random().toString(36).substr(2, 9)}`);

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const val = target.value === '' ? null : Number(target.value);
  emit('update:modelValue', val);
};

const handleBlur = (event: FocusEvent) => emit('blur', event);
const handleFocus = (event: FocusEvent) => emit('focus', event);
</script>

<template>
  <div class="c-input-number" :class="{ 'has-error': !!error, 'is-disabled': disabled }">
    <label v-if="label" :for="inputId" class="c-input-number__label">{{ label }}</label>
    <div class="c-input-number__wrapper">
      <input
        :id="inputId"
        type="number"
        :name="name"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :min="min"
        :max="max"
        :step="step"
        class="c-input-number__input"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
      />
    </div>
    <span v-if="error" class="c-input-number__error">{{ error }}</span>
  </div>
</template>

<style lang="scss" src="@base/assets/scss/object/component/_input-number.scss"></style>
