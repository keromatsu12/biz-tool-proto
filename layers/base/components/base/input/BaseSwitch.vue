<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue?: boolean;
  label?: string;
  disabled?: boolean;
  error?: string;
  id?: string;
  name?: string;
}>(), {
  modelValue: false,
  label: undefined,
  disabled: false,
  error: undefined,
  id: undefined,
  name: undefined,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'change', value: boolean): void;
}>();

const switchId = computed(() => props.id || `switch-${Math.random().toString(36).substr(2, 9)}`);

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.checked);
  emit('change', target.checked);
};
</script>

<template>
  <div class="c-switch" :class="{ 'has-error': !!error, 'is-disabled': disabled }">
    <label class="c-switch__wrapper" :for="switchId">
      <input
        :id="switchId"
        type="checkbox"
        :name="name"
        :checked="modelValue"
        :disabled="disabled"
        class="c-switch__input"
        @change="handleChange"
      />
      <div class="c-switch__track">
        <div class="c-switch__thumb"></div>
      </div>
      <span v-if="label" class="c-switch__label">{{ label }}</span>
    </label>
    <span v-if="error" class="c-switch__error">{{ error }}</span>
  </div>
</template>

<style lang="scss" src="@base/assets/scss/object/component/_switch.scss"></style>
