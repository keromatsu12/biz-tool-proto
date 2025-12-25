<script setup lang="ts">
interface BreadcrumbItem {
  label: string;
  to?: string;
}

const props = defineProps<{
  items: BreadcrumbItem[];
}>();
</script>

<template>
  <nav class="c-base-breadcrumb" aria-label="Breadcrumb">
    <ol class="c-base-breadcrumb__list">
      <li class="c-base-breadcrumb__item">
        <NuxtLink to="/" class="c-base-breadcrumb__link">
          <LucideHome :size="16" />
        </NuxtLink>
        <LucideChevronRight :size="14" class="c-base-breadcrumb__separator" />
      </li>

      <li v-for="(item, index) in items" :key="index" class="c-base-breadcrumb__item">
        <component
          :is="item.to && index < items.length - 1 ? 'NuxtLink' : 'span'"
          :to="item.to"
          class="c-base-breadcrumb__link"
          :class="{ 'is-current': index === items.length - 1 }"
          :aria-current="index === items.length - 1 ? 'page' : undefined"
        >
          {{ item.label }}
        </component>

        <LucideChevronRight
          v-if="index < items.length - 1"
          :size="14"
          class="c-base-breadcrumb__separator"
        />
      </li>
    </ol>
  </nav>
</template>

<style lang="scss" src="@base/assets/scss/object/component/_base-breadcrumb.scss"></style>
