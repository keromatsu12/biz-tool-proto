<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue?: boolean | any[];
  value?: string | number | boolean;
  label?: string;
  name?: string;
  id?: string;
  disabled?: boolean;
  error?: string;
}>(), {
  modelValue: false,
  value: undefined, // Used when modelValue is an array
  label: undefined,
  name: undefined,
  id: undefined,
  disabled: false,
  error: undefined,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean | any[]): void;
  (e: 'change', event: Event): void;
}>();

const checkboxId = computed(() => props.id || `checkbox-${Math.random().toString(36).substr(2, 9)}`);

const isChecked = computed(() => {
  if (Array.isArray(props.modelValue)) {
    return props.modelValue.includes(props.value);
  }
  return props.modelValue === true;
});

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const isChecked = target.checked;

  if (Array.isArray(props.modelValue)) {
    const newValue = [...props.modelValue];
    if (isChecked) {
      newValue.push(props.value);
    } else {
      const index = newValue.indexOf(props.value);
      if (index !== -1) {
        newValue.splice(index, 1);
      }
    }
    emit('update:modelValue', newValue);
  } else {
    emit('update:modelValue', isChecked);
  }
  emit('change', event);
};
</script>

<template>
  <div class="c-input-checkbox" :class="{ 'has-error': !!error, 'is-disabled': disabled }">
    <div class="c-input-checkbox__wrapper">
      <input
        :id="checkboxId"
        type="checkbox"
        :name="name"
        :value="value"
        :checked="isChecked"
        :disabled="disabled"
        class="c-input-checkbox__input"
        @change="handleChange"
      />
      <label v-if="label" :for="checkboxId" class="c-input-checkbox__label">{{ label }}</label>
    </div>
    <span v-if="error" class="c-input-checkbox__error">{{ error }}</span>
  </div>
</template>

<style lang="scss" src="@base/assets/scss/object/component/_input-checkbox.scss"></style>
