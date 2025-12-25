import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import DashboardMetric from '../../../../components/base/data/DashboardMetric.vue';

describe('DashboardMetric', () => {
  const globalOptions = {
    stubs: {
      LucideTrendingUp: true,
      LucideTrendingDown: true,
      LucideMinus: true,
      LucideUser: true
    }
  }

  it('renders label and value', () => {
    const wrapper = mount(DashboardMetric, {
      props: {
        label: 'Total Users',
        value: 1234
      },
      global: globalOptions
    });
    expect(wrapper.text()).toContain('Total Users');
    expect(wrapper.text()).toContain('1234');
  });

  it('renders positive trend correctly', () => {
    const wrapper = mount(DashboardMetric, {
      props: {
        label: 'Sales',
        value: '$1000',
        trend: 15
      },
      global: globalOptions
    });
    expect(wrapper.findComponent({ name: 'LucideTrendingUp' }).exists()).toBe(true);
    expect(wrapper.find('.c-dashboard-metric__trend').classes()).toContain('text-success');
    expect(wrapper.text()).toContain('15%');
  });

  it('renders negative trend correctly', () => {
    const wrapper = mount(DashboardMetric, {
      props: {
        label: 'Bounce Rate',
        value: '50%',
        trend: -5
      },
      global: globalOptions
    });
    expect(wrapper.findComponent({ name: 'LucideTrendingDown' }).exists()).toBe(true);
    expect(wrapper.find('.c-dashboard-metric__trend').classes()).toContain('text-danger');
    expect(wrapper.text()).toContain('5%');
  });

  it('renders neutral trend correctly (zero)', () => {
    const wrapper = mount(DashboardMetric, {
      props: {
        label: 'Stability',
        value: '100',
        trend: 0
      },
      global: globalOptions
    });
    expect(wrapper.findComponent({ name: 'LucideMinus' }).exists()).toBe(true);
    expect(wrapper.find('.c-dashboard-metric__trend').classes()).toContain('text-muted');
  });

  it('renders icon', () => {
    const wrapper = mount(DashboardMetric, {
      props: {
        label: 'Visits',
        value: 100,
        icon: 'LucideUser',
        color: 'info'
      },
      global: globalOptions
    });
    expect(wrapper.findComponent({ name: 'LucideUser' }).exists()).toBe(true);
    expect(wrapper.find('.c-dashboard-metric__icon').classes()).toContain('bg-info');
  });
});
