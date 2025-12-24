<script setup lang="ts">
import { CheckCircle, AlertCircle, Info, XCircle, X } from 'lucide-vue-next';
import { onMounted, onUnmounted } from 'vue';

const props = withDefaults(defineProps<{
  modelValue: boolean;
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}>(), {
  type: 'info',
  duration: 3000,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

let timer: ReturnType<typeof setTimeout> | null = null;

const close = () => {
  emit('update:modelValue', false);
};

const startTimer = () => {
  if (props.duration > 0) {
    timer = setTimeout(() => {
      close();
    }, props.duration);
  }
};

onMounted(() => {
  if (props.modelValue) {
    startTimer();
  }
});

onUnmounted(() => {
  if (timer) clearTimeout(timer);
});

// Assuming usage: <BaseToast v-model="show" ... />
// Whenever modelValue becomes true, reset timer
import { watch } from 'vue';
watch(() => props.modelValue, (val) => {
  if (val) {
    if (timer) clearTimeout(timer);
    startTimer();
  } else {
    if (timer) clearTimeout(timer);
  }
});

const icons = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
  warning: AlertCircle,
};
</script>

<template>
  <Teleport to="body">
    <Transition name="toast-slide">
      <div v-if="modelValue" class="c-base-toast" :class="`c-base-toast--${type}`" role="alert">
        <component :is="icons[type]" :size="20" class="c-base-toast__icon" />
        <span class="c-base-toast__message">{{ message }}</span>
        <button class="c-base-toast__close" @click="close" aria-label="Close notification">
          <X :size="16" />
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" src="@base/assets/scss/object/component/_base-toast.scss"></style>
