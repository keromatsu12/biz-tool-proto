import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseInputText from '../../../../components/base/input/BaseInputText.vue';

describe('BaseInputText', () => {
  it('renders correctly', () => {
    const wrapper = mount(BaseInputText, {
      props: {
        modelValue: 'test value',
        label: 'Test Label',
        placeholder: 'Enter text'
      }
    });
    expect(wrapper.find('input').element.value).toBe('test value');
    expect(wrapper.find('label').text()).toBe('Test Label');
    expect(wrapper.find('input').attributes('placeholder')).toBe('Enter text');
  });

  it('emits update:modelValue on input', async () => {
    const wrapper = mount(BaseInputText);
    const input = wrapper.find('input');
    await input.setValue('new value');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['new value']);
  });

  it('shows error message', () => {
    const wrapper = mount(BaseInputText, {
      props: { error: 'Required field' }
    });
    expect(wrapper.find('.c-input-text__error').text()).toBe('Required field');
    expect(wrapper.classes()).toContain('has-error');
  });

  it('can be disabled', () => {
    const wrapper = mount(BaseInputText, {
      props: { disabled: true }
    });
    expect(wrapper.find('input').element.disabled).toBe(true);
    expect(wrapper.classes()).toContain('is-disabled');
  });
});
