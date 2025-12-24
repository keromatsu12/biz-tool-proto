import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseInputNumber from '../../../../components/base/input/BaseInputNumber.vue';

describe('BaseInputNumber', () => {
  it('renders correctly', () => {
    const wrapper = mount(BaseInputNumber, {
      props: {
        modelValue: 123,
        label: 'Number Input'
      }
    });
    expect(wrapper.find('input').element.value).toBe('123');
    expect(wrapper.find('label').text()).toBe('Number Input');
  });

  it('emits update:modelValue on input', async () => {
    const wrapper = mount(BaseInputNumber);
    const input = wrapper.find('input');
    await input.setValue('456');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([456]);
  });

  it('emits null when input is empty', async () => {
    const wrapper = mount(BaseInputNumber, {
      props: { modelValue: 123 }
    });
    const input = wrapper.find('input');
    await input.setValue('');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([null]);
  });

  it('respects min/max attributes', () => {
    const wrapper = mount(BaseInputNumber, {
      props: { min: 0, max: 100 }
    });
    const input = wrapper.find('input');
    expect(input.attributes('min')).toBe('0');
    expect(input.attributes('max')).toBe('100');
  });
});
