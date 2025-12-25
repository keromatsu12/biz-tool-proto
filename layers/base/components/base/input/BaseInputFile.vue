<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue?: File | null;
  label?: string;
  accept?: string;
  disabled?: boolean;
  error?: string;
  id?: string;
}>(), {
  modelValue: null,
  label: undefined,
  accept: undefined,
  disabled: false,
  error: undefined,
  id: undefined,
});

const emit = defineEmits<{
  (e: 'update:modelValue', file: File | null): void;
}>();

const inputId = computed(() => props.id || `file-${Math.random().toString(36).substr(2, 9)}`);
const isDragging = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    emit('update:modelValue', target.files[0]);
  }
};

const handleDrop = (event: DragEvent) => {
  isDragging.value = false;
  if (props.disabled) return;

  if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
    emit('update:modelValue', event.dataTransfer.files[0]);
  }
};

const removeFile = () => {
  if (props.disabled) return;
  emit('update:modelValue', null);
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};

const triggerBrowse = () => {
  if (props.disabled) return;
  fileInput.value?.click();
};
</script>

<template>
  <div class="c-input-file" :class="{ 'has-error': !!error, 'is-disabled': disabled }">
    <label v-if="label" :for="inputId" class="c-input-file__label">{{ label }}</label>

    <div
      v-if="!modelValue"
      class="c-input-file__dropzone"
      :class="{ 'is-dragging': isDragging }"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="handleDrop"
      @click="triggerBrowse"
    >
      <input
        :id="inputId"
        ref="fileInput"
        type="file"
        class="c-input-file__input"
        :accept="accept"
        :disabled="disabled"
        @change="handleFileSelect"
      />
      <div class="c-input-file__placeholder">
        <LucideUpload :size="24" class="c-input-file__icon" />
        <span class="c-input-file__text">Click to upload or drag and drop</span>
        <span v-if="accept" class="c-input-file__subtext">{{ accept }}</span>
      </div>
    </div>

    <div v-else class="c-input-file__preview">
      <div class="c-input-file__info">
        <LucideFile :size="20" class="c-input-file__file-icon" />
        <span class="c-input-file__name">{{ modelValue.name }}</span>
        <span class="c-input-file__size">{{ (modelValue.size / 1024).toFixed(1) }} KB</span>
      </div>
      <button type="button" class="c-input-file__remove" @click="removeFile" :disabled="disabled">
        <LucideX :size="16" />
      </button>
    </div>

    <span v-if="error" class="c-input-file__error">{{ error }}</span>
  </div>
</template>

<style lang="scss" src="@base/assets/scss/object/component/_input-file.scss"></style>
