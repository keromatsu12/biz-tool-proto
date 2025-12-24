<script setup lang="ts">
import { computed } from 'vue';
import { ArrowUp, ArrowDown } from 'lucide-vue-next';

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  width?: string;
}

const props = withDefaults(defineProps<{
  columns: TableColumn[];
  items: any[];
  sortKey?: string;
  sortOrder?: 'asc' | 'desc';
  selectable?: boolean;
  selectedItems?: any[];
  loading?: boolean;
}>(), {
  sortKey: '',
  sortOrder: 'asc',
  selectable: false,
  selectedItems: () => [],
  loading: false,
});

const emit = defineEmits<{
  (e: 'update:sort', key: string): void;
  (e: 'update:selected', items: any[]): void;
  (e: 'row-click', item: any): void;
}>();

const allSelected = computed(() => {
  return props.items.length > 0 && props.selectedItems.length === props.items.length;
});

const indeterminate = computed(() => {
  return props.selectedItems.length > 0 && props.selectedItems.length < props.items.length;
});

const toggleSelectAll = (event: Event) => {
  const checked = (event.target as HTMLInputElement).checked;
  if (checked) {
    emit('update:selected', [...props.items]);
  } else {
    emit('update:selected', []);
  }
};

const toggleSelectRow = (item: any) => {
  const selected = [...props.selectedItems];
  const index = selected.indexOf(item);
  if (index === -1) {
    selected.push(item);
  } else {
    selected.splice(index, 1);
  }
  emit('update:selected', selected);
};

const handleSort = (key: string) => {
  emit('update:sort', key);
};
</script>

<template>
  <div class="c-data-table-wrapper">
    <div class="c-data-table-container">
      <table class="c-data-table">
        <thead>
          <tr>
            <th v-if="selectable" class="c-data-table__th c-data-table__th--checkbox">
              <input
                type="checkbox"
                :checked="allSelected"
                :indeterminate="indeterminate"
                @change="toggleSelectAll"
              />
            </th>
            <th
              v-for="col in columns"
              :key="col.key"
              class="c-data-table__th"
              :class="[
                `c-data-table__th--align-${col.align || 'left'}`,
                { 'is-sortable': col.sortable }
              ]"
              :style="{ width: col.width }"
              @click="col.sortable ? handleSort(col.key) : null"
            >
              <div class="c-data-table__th-content">
                {{ col.label }}
                <span v-if="col.sortable" class="c-data-table__sort-icon">
                  <ArrowUp v-if="sortKey === col.key && sortOrder === 'asc'" :size="14" />
                  <ArrowDown v-else-if="sortKey === col.key && sortOrder === 'desc'" :size="14" />
                  <!-- Placeholder to keep height consistent -->
                  <div v-else class="c-data-table__sort-placeholder"></div>
                </span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in items"
            :key="index"
            class="c-data-table__tr"
            :class="{ 'is-selected': selectedItems.includes(item) }"
            @click="emit('row-click', item)"
          >
            <td v-if="selectable" class="c-data-table__td c-data-table__td--checkbox" @click.stop>
              <input
                type="checkbox"
                :checked="selectedItems.includes(item)"
                @change="toggleSelectRow(item)"
              />
            </td>
            <td
              v-for="col in columns"
              :key="col.key"
              class="c-data-table__td"
              :class="`c-data-table__td--align-${col.align || 'left'}`"
            >
              <slot :name="`cell-${col.key}`" :item="item" :value="item[col.key]">
                {{ item[col.key] }}
              </slot>
            </td>
          </tr>
          <tr v-if="items.length === 0 && !loading">
            <td :colspan="selectable ? columns.length + 1 : columns.length" class="c-data-table__empty">
              <slot name="empty">No data available</slot>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="loading" class="c-data-table__loading">
        <div class="c-data-table__spinner"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" src="@base/assets/scss/object/component/_data-table.scss"></style>
