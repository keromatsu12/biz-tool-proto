import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseTabs from '../../../../components/base/navigation/BaseTabs.vue';

describe('BaseTabs', () => {
  const items = [
    { label: 'Tab 1', value: 'tab1' },
    { label: 'Tab 2', value: 'tab2' }
  ];

  it('renders correctly', () => {
    const wrapper = mount(BaseTabs, {
      props: {
        items,
        modelValue: 'tab1'
      }
    });
    const tabs = wrapper.findAll('.c-base-tabs__tab');
    expect(tabs.length).toBe(2);
    expect(tabs[0].classes()).toContain('is-active');
  });

  it('emits update:modelValue on click', async () => {
    const wrapper = mount(BaseTabs, {
      props: {
        items,
        modelValue: 'tab1'
      }
    });
    await wrapper.findAll('.c-base-tabs__tab')[1].trigger('click');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['tab2']);
  });
});
