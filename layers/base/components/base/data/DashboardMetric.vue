<script setup lang="ts">
const props = defineProps<{
  label: string;
  value: string | number;
  trend?: number; // Percentage change, positive or negative
  trendLabel?: string;
  icon?: any; // Component type
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
}>();

const trendIcon = computed(() => {
  if (props.trend === undefined) return null;
  if (props.trend > 0) return 'LucideTrendingUp';
  if (props.trend < 0) return 'LucideTrendingDown';
  return 'LucideMinus';
});

const trendColorClass = computed(() => {
  if (props.trend === undefined) return '';
  if (props.trend > 0) return 'text-success';
  if (props.trend < 0) return 'text-danger';
  return 'text-muted';
});
</script>

<template>
  <div class="c-dashboard-metric">
    <div class="c-dashboard-metric__content">
      <span class="c-dashboard-metric__label">{{ label }}</span>
      <div class="c-dashboard-metric__value-wrapper">
        <span class="c-dashboard-metric__value">{{ value }}</span>
        <div v-if="trend !== undefined" class="c-dashboard-metric__trend" :class="trendColorClass">
          <component :is="trendIcon" :size="16" />
          <span>{{ Math.abs(trend) }}%</span>
          <span v-if="trendLabel" class="c-dashboard-metric__trend-label">{{ trendLabel }}</span>
        </div>
      </div>
    </div>
    <div v-if="icon" class="c-dashboard-metric__icon" :class="`bg-${color || 'primary'}`">
      <component :is="icon" :size="24" />
    </div>
  </div>
</template>

<style lang="scss" src="@base/assets/scss/object/component/_dashboard-metric.scss"></style>
