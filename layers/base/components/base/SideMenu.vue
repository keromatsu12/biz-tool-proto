<script setup lang="ts">
import { ref } from 'vue';
import { ChevronDown, ChevronRight } from 'lucide-vue-next';
import type { MenuItem } from '../../../types/menu';

const props = defineProps<{
  items: MenuItem[]
}>();

const openIndex = ref<number | null>(null);

const toggleAccordion = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index;
};
</script>

<template>
  <nav class="c-side-menu">
    <ul class="c-side-menu__list">
      <li v-for="(item, index) in items" :key="index" class="c-side-menu__item">
        <!-- Level 1 -->
        <div
          class="c-side-menu__row"
          :class="{ 'is-active': openIndex === index }"
          @click="item.children ? toggleAccordion(index) : null"
        >
          <component
            :is="item.children ? 'div' : 'NuxtLink'"
            :to="!item.children ? item.to : undefined"
            class="c-side-menu__header"
          >
            <component :is="item.icon" v-if="item.icon" class="c-side-menu__icon" />
            <span class="c-side-menu__label">{{ item.label }}</span>

            <span v-if="item.children" class="c-side-menu__arrow-wrapper">
              <ChevronDown v-if="openIndex === index" :size="16" />
              <ChevronRight v-else :size="16" />
            </span>
          </component>
        </div>

        <!-- Level 2 -->
        <div v-if="item.children && openIndex === index" class="c-side-menu__submenu">
          <ul class="c-side-menu__list">
            <li v-for="(child, childIndex) in item.children" :key="childIndex" class="c-side-menu__item c-side-menu__item--sub">
              <div class="c-side-menu__row">
                <component
                  :is="child.children ? 'div' : 'NuxtLink'"
                  :to="!child.children ? child.to : undefined"
                  class="c-side-menu__header c-side-menu__header--sub"
                >
                  <span class="c-side-menu__label">{{ child.label }}</span>
                </component>
              </div>

              <!-- Level 3 -->
              <div v-if="child.children" class="c-side-menu__submenu c-side-menu__submenu--deep">
                <ul class="c-side-menu__list">
                  <li v-for="(grandChild, gIndex) in child.children" :key="gIndex" class="c-side-menu__item c-side-menu__item--deep">
                    <NuxtLink :to="grandChild.to || '#'" class="c-side-menu__header c-side-menu__header--deep">
                      <span class="c-side-menu__label">{{ grandChild.label }}</span>
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" src="@base/assets/scss/object/component/_side-menu.scss"></style>
