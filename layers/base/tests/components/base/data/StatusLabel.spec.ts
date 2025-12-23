import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import StatusLabel from '../../../../components/base/data/StatusLabel.vue';

describe('StatusLabel', () => {
  it('renders label correctly', () => {
    const wrapper = mount(StatusLabel, {
      props: { label: 'Active' }
    });
    expect(wrapper.text()).toBe('Active');
  });

  it('applies default variant class', () => {
    const wrapper = mount(StatusLabel, {
      props: { label: 'Pending' }
    });
    expect(wrapper.classes()).toContain('c-status-label--secondary');
  });

  it('applies specific variant class', () => {
    const wrapper = mount(StatusLabel, {
      props: { label: 'Error', variant: 'danger' }
    });
    expect(wrapper.classes()).toContain('c-status-label--danger');
  });
});
