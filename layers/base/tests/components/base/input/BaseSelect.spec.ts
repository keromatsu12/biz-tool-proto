import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseSelect from '../../../../components/base/input/BaseSelect.vue';

describe('BaseSelect', () => {
  const options = [
    { label: 'Option 1', value: 'opt1' },
    { label: 'Option 2', value: 'opt2' }
  ];

  it('renders correctly', () => {
    const wrapper = mount(BaseSelect, {
      props: {
        modelValue: 'opt1',
        options,
        label: 'Select Label'
      }
    });
    expect(wrapper.find('select').element.value).toBe('opt1');
    expect(wrapper.find('label').text()).toBe('Select Label');
    expect(wrapper.findAll('option').length).toBe(3); // +1 for placeholder
  });

  it('emits update:modelValue on change', async () => {
    const wrapper = mount(BaseSelect, {
      props: { options }
    });
    const select = wrapper.find('select');
    await select.setValue('opt2');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['opt2']);
  });

  it('shows error message', () => {
    const wrapper = mount(BaseSelect, {
      props: { options, error: 'Required' }
    });
    expect(wrapper.find('.c-base-select__error').text()).toBe('Required');
    expect(wrapper.classes()).toContain('has-error');
  });
});
