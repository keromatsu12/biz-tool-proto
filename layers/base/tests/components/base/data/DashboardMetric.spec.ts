import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import DashboardMetric from '../../../../components/base/data/DashboardMetric.vue';
import { Home } from 'lucide-vue-next';

describe('DashboardMetric', () => {
  it('renders correctly', () => {
    const wrapper = mount(DashboardMetric, {
      props: {
        label: 'Total Users',
        value: '1,234'
      }
    });
    expect(wrapper.find('.c-dashboard-metric__label').text()).toBe('Total Users');
    expect(wrapper.find('.c-dashboard-metric__value').text()).toBe('1,234');
  });

  it('renders trend correctly', () => {
    const wrapper = mount(DashboardMetric, {
      props: {
        label: 'Sales',
        value: '$500',
        trend: 15,
        trendLabel: 'vs last month'
      }
    });
    expect(wrapper.find('.c-dashboard-metric__trend').text()).toContain('15%');
    expect(wrapper.find('.c-dashboard-metric__trend').text()).toContain('vs last month');
    expect(wrapper.find('.c-dashboard-metric__trend').classes()).toContain('text-success');
  });

  it('renders icon', () => {
    const wrapper = mount(DashboardMetric, {
      props: {
        label: 'Users',
        value: '10',
        icon: Home
      }
    });
    expect(wrapper.find('.c-dashboard-metric__icon').exists()).toBe(true);
  });
});
