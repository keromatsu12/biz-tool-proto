import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FilterPanel from '../../../../components/base/input/FilterPanel.vue';
import BaseButton from '../../../../components/base/button/BaseButton.vue';

describe('FilterPanel', () => {
  it('renders correctly', () => {
    const wrapper = mount(FilterPanel, {
      props: { title: 'Advanced Search' }
    });
    expect(wrapper.find('.c-filter-panel__title').text()).toBe('Advanced Search');
  });

  it('toggles content visibility', async () => {
    const wrapper = mount(FilterPanel, {
      props: { defaultOpen: false }
    });
    // v-show uses display: none
    expect(wrapper.find('.c-filter-panel__content').attributes('style')).toContain('display: none');

    await wrapper.find('.c-filter-panel__header').trigger('click');
    const style = wrapper.find('.c-filter-panel__content').attributes('style');
    // If style is undefined or does not contain display: none
    if (style) {
      expect(style).not.toContain('display: none');
    } else {
      expect(style).toBeUndefined();
    }
  });

  it('emits actions', async () => {
    const wrapper = mount(FilterPanel, {
      props: { defaultOpen: true }
    });

    const buttons = wrapper.findAllComponents(BaseButton);
    // Reset is first (secondary), Apply is second (primary)

    await buttons[0].trigger('click');
    expect(wrapper.emitted('reset')).toBeTruthy();

    await buttons[1].trigger('click');
    expect(wrapper.emitted('apply')).toBeTruthy();
  });
});
