<script setup lang="ts">
import { X } from 'lucide-vue-next';
import { onMounted, onUnmounted, watch } from 'vue';

const props = withDefaults(defineProps<{
  modelValue: boolean;
  title?: string;
  width?: string;
  closeOnOverlayClick?: boolean;
}>(), {
  title: '',
  width: '500px',
  closeOnOverlayClick: true,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'close'): void;
}>();

const close = () => {
  emit('update:modelValue', false);
  emit('close');
};

const handleOverlayClick = () => {
  if (props.closeOnOverlayClick) {
    close();
  }
};

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.modelValue) {
    close();
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
});

// Prevent body scroll when modal is open
watch(() => props.modelValue, (isOpen) => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }
});
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="modelValue" class="c-base-modal" role="dialog" aria-modal="true">
        <div class="c-base-modal__overlay" @click="handleOverlayClick"></div>

        <div class="c-base-modal__container" :style="{ maxWidth: width }">
          <header class="c-base-modal__header">
            <h2 class="c-base-modal__title">{{ title }}</h2>
            <button class="c-base-modal__close" @click="close" aria-label="Close modal">
              <X :size="20" />
            </button>
          </header>

          <div class="c-base-modal__content">
            <slot />
          </div>

          <footer v-if="$slots.footer" class="c-base-modal__footer">
            <slot name="footer" />
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" src="@base/assets/scss/object/component/_base-modal.scss"></style>
