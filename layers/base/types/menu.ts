import type { Component } from 'vue';

export interface MenuItem {
  label: string;
  icon?: string | Component;
  to?: string;
  children?: MenuItem[];
}
