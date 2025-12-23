<script setup lang="ts">
import { ref } from 'vue';
import { Filter, ChevronDown, ChevronUp, X, Check } from 'lucide-vue-next';
import BaseButton from '../button/BaseButton.vue';

const props = withDefaults(defineProps<{
  title?: string;
  defaultOpen?: boolean;
}>(), {
  title: 'Filters',
  defaultOpen: false,
});

const emit = defineEmits<{
  (e: 'apply'): void;
  (e: 'reset'): void;
  (e: 'toggle', isOpen: boolean): void;
}>();

const isOpen = ref(props.defaultOpen);

const toggle = () => {
  isOpen.value = !isOpen.value;
  emit('toggle', isOpen.value);
};

const handleApply = () => {
  emit('apply');
};

const handleReset = () => {
  emit('reset');
};
</script>

<template>
  <div class="c-filter-panel" :class="{ 'is-open': isOpen }">
    <div class="c-filter-panel__header" @click="toggle">
      <div class="c-filter-panel__title-group">
        <Filter :size="18" class="c-filter-panel__icon" />
        <span class="c-filter-panel__title">{{ title }}</span>
      </div>
      <component :is="isOpen ? ChevronUp : ChevronDown" :size="18" class="c-filter-panel__chevron" />
    </div>

    <div v-show="isOpen" class="c-filter-panel__content">
      <div class="c-filter-panel__body">
        <slot />
      </div>
      <div class="c-filter-panel__actions">
        <BaseButton variant="secondary" size="small" @click="handleReset">
          Reset
        </BaseButton>
        <BaseButton variant="primary" size="small" @click="handleApply">
          Apply Filters
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<style lang="scss" src="@base/assets/scss/object/component/_filter-panel.scss"></style>
