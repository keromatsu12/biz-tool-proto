<script setup lang="ts">
import { computed } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const props = withDefaults(defineProps<{
  modelValue?: Date | null;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  id?: string;
  format?: string;
  enableTimePicker?: boolean;
}>(), {
  modelValue: null,
  label: undefined,
  placeholder: 'Select date',
  disabled: false,
  error: undefined,
  id: undefined,
  format: 'yyyy/MM/dd',
  enableTimePicker: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: Date | null): void;
}>();

const dateId = computed(() => props.id || `date-${Math.random().toString(36).substr(2, 9)}`);

const handleUpdate = (value: Date | null) => {
  emit('update:modelValue', value);
};
</script>

<template>
  <div class="c-input-date" :class="{ 'has-error': !!error, 'is-disabled': disabled }">
    <label v-if="label" :for="dateId" class="c-input-date__label">{{ label }}</label>
    <div class="c-input-date__wrapper">
      <VueDatePicker
        :uid="dateId"
        :model-value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :format="format"
        :enable-time-picker="enableTimePicker"
        auto-apply
        :clearable="true"
        @update:model-value="handleUpdate"
      />
    </div>
    <span v-if="error" class="c-input-date__error">{{ error }}</span>
  </div>
</template>

<style lang="scss" src="@base/assets/scss/object/component/_input-date.scss"></style>
