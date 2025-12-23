import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import DashboardChart from '../../../../components/base/data/DashboardChart.vue';

// Mock vue-chartjs and chart.js components because they use canvas which is not fully supported in jsdom
vi.mock('vue-chartjs', () => ({
  Line: { template: '<div class="mock-chart-line"></div>', props: ['data', 'options'] },
  Bar: { template: '<div class="mock-chart-bar"></div>', props: ['data', 'options'] },
  Pie: { template: '<div class="mock-chart-pie"></div>', props: ['data', 'options'] },
  Doughnut: { template: '<div class="mock-chart-doughnut"></div>', props: ['data', 'options'] },
}));

vi.mock('chart.js', () => ({
  Chart: { register: vi.fn() },
  CategoryScale: {},
  LinearScale: {},
  PointElement: {},
  LineElement: {},
  BarElement: {},
  ArcElement: {},
  Title: {},
  Tooltip: {},
  Legend: {},
}));

describe('DashboardChart', () => {
  const chartData = {
    labels: ['Jan', 'Feb'],
    datasets: [{ data: [10, 20] }]
  };

  it('renders line chart by default', () => {
    const wrapper = mount(DashboardChart, {
      props: {
        data: chartData
      }
    });
    expect(wrapper.find('.mock-chart-line').exists()).toBe(true);
  });

  it('renders bar chart when type is bar', () => {
    const wrapper = mount(DashboardChart, {
      props: {
        data: chartData,
        type: 'bar'
      }
    });
    expect(wrapper.find('.mock-chart-bar').exists()).toBe(true);
  });
});
