<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue?: string | number | boolean;
  value?: string | number | boolean;
  label?: string;
  name?: string;
  id?: string;
  disabled?: boolean;
  error?: string;
}>(), {
  modelValue: undefined,
  value: '',
  label: undefined,
  name: undefined,
  id: undefined,
  disabled: false,
  error: undefined,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | boolean): void;
  (e: 'change', value: string | number | boolean): void;
}>();

const radioId = computed(() => props.id || `radio-${Math.random().toString(36).substr(2, 9)}`);

const isChecked = computed(() => props.modelValue === props.value);

const handleChange = () => {
  if (props.disabled) return;
  emit('update:modelValue', props.value);
  emit('change', props.value);
};
</script>

<template>
  <div class="c-input-radio" :class="{ 'has-error': !!error, 'is-disabled': disabled }">
    <div class="c-input-radio__wrapper">
      <input
        :id="radioId"
        type="radio"
        :name="name"
        :value="value"
        :checked="isChecked"
        :disabled="disabled"
        class="c-input-radio__input"
        @change="handleChange"
      />
      <label v-if="label" :for="radioId" class="c-input-radio__label">{{ label }}</label>
    </div>
    <span v-if="error" class="c-input-radio__error">{{ error }}</span>
  </div>
</template>

<style lang="scss" src="@base/assets/scss/object/component/_input-radio.scss"></style>
