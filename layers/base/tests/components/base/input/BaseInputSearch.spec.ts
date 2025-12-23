import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseInputSearch from '../../../../components/base/input/BaseInputSearch.vue';

describe('BaseInputSearch', () => {
  it('renders correctly', () => {
    const wrapper = mount(BaseInputSearch, {
      props: {
        modelValue: 'search term',
        placeholder: 'Search here'
      }
    });
    expect(wrapper.find('input').element.value).toBe('search term');
    expect(wrapper.find('input').attributes('placeholder')).toBe('Search here');
  });

  it('emits update:modelValue on input', async () => {
    const wrapper = mount(BaseInputSearch);
    const input = wrapper.find('input');
    await input.setValue('new term');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['new term']);
  });

  it('emits search event on enter', async () => {
    const wrapper = mount(BaseInputSearch);
    const input = wrapper.find('input');
    await input.trigger('keydown.enter');
    expect(wrapper.emitted('search')).toBeTruthy();
  });
});
