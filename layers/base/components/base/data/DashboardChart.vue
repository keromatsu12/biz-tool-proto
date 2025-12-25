<script setup lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Pie, Doughnut } from 'vue-chartjs';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const props = withDefaults(defineProps<{
  type?: 'line' | 'bar' | 'pie' | 'doughnut';
  data: any;
  options?: any;
  height?: number;
}>(), {
  type: 'line',
  options: () => ({}),
  height: 300,
});

const chartComponent = computed(() => {
  switch (props.type) {
    case 'bar': return Bar;
    case 'pie': return Pie;
    case 'doughnut': return Doughnut;
    case 'line':
    default: return Line;
  }
});

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  ...props.options,
}));
</script>

<template>
  <div class="c-dashboard-chart" :style="{ height: `${height}px` }">
    <component :is="chartComponent" :data="data" :options="chartOptions" />
  </div>
</template>

<style lang="scss" src="@base/assets/scss/object/component/_dashboard-chart.scss"></style>
