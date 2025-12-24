<script setup lang="ts">
import { computed } from 'vue';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-vue-next';

const props = withDefaults(defineProps<{
  currentPage: number;
  totalPages: number;
  totalItems?: number;
}>(), {
  totalItems: undefined,
});

const emit = defineEmits<{
  (e: 'update:page', page: number): void;
}>();

const visiblePages = computed(() => {
  const pages: (number | string)[] = [];
  const delta = 1; // Number of pages to show around current page

  if (props.totalPages <= 5) {
    for (let i = 1; i <= props.totalPages; i++) pages.push(i);
  } else {
    pages.push(1);

    if (props.currentPage > delta + 2) {
      pages.push('...');
    }

    const start = Math.max(2, props.currentPage - delta);
    const end = Math.min(props.totalPages - 1, props.currentPage + delta);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (props.currentPage < props.totalPages - delta - 1) {
      pages.push('...');
    }

    pages.push(props.totalPages);
  }

  return pages;
});

const setPage = (page: number) => {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit('update:page', page);
  }
};
</script>

<template>
  <nav class="c-base-pagination" role="navigation" aria-label="Pagination">
    <div v-if="totalItems !== undefined" class="c-base-pagination__info">
      Total {{ totalItems }} items
    </div>

    <ul class="c-base-pagination__list">
      <li>
        <button
          class="c-base-pagination__btn"
          :disabled="currentPage === 1"
          @click="setPage(1)"
          aria-label="First page"
        >
          <ChevronsLeft :size="16" />
        </button>
      </li>
      <li>
        <button
          class="c-base-pagination__btn"
          :disabled="currentPage === 1"
          @click="setPage(currentPage - 1)"
          aria-label="Previous page"
        >
          <ChevronLeft :size="16" />
        </button>
      </li>

      <li v-for="(page, index) in visiblePages" :key="index">
        <span v-if="page === '...'" class="c-base-pagination__ellipsis">...</span>
        <button
          v-else
          class="c-base-pagination__btn"
          :class="{ 'is-active': page === currentPage }"
          @click="setPage(page as number)"
        >
          {{ page }}
        </button>
      </li>

      <li>
        <button
          class="c-base-pagination__btn"
          :disabled="currentPage === totalPages"
          @click="setPage(currentPage + 1)"
          aria-label="Next page"
        >
          <ChevronRight :size="16" />
        </button>
      </li>
      <li>
        <button
          class="c-base-pagination__btn"
          :disabled="currentPage === totalPages"
          @click="setPage(totalPages)"
          aria-label="Last page"
        >
          <ChevronsRight :size="16" />
        </button>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" src="@base/assets/scss/object/component/_base-pagination.scss"></style>
