import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseInputRadio from '../../../../components/base/input/BaseInputRadio.vue';

describe('BaseInputRadio', () => {
  it('renders correctly', () => {
    const wrapper = mount(BaseInputRadio, {
      props: {
        value: 'option1',
        label: 'Option 1',
        name: 'test-radio'
      }
    });
    expect(wrapper.find('input').element.value).toBe('option1');
    expect(wrapper.find('label').text()).toBe('Option 1');
    expect(wrapper.find('input').attributes('name')).toBe('test-radio');
  });

  it('is checked when modelValue matches value', () => {
    const wrapper = mount(BaseInputRadio, {
      props: {
        modelValue: 'option1',
        value: 'option1'
      }
    });
    expect(wrapper.find('input').element.checked).toBe(true);
  });

  it('is not checked when modelValue does not match value', () => {
    const wrapper = mount(BaseInputRadio, {
      props: {
        modelValue: 'option2',
        value: 'option1'
      }
    });
    expect(wrapper.find('input').element.checked).toBe(false);
  });

  it('emits update:modelValue and change events when selected', async () => {
    const wrapper = mount(BaseInputRadio, {
      props: {
        modelValue: 'option2',
        value: 'option1'
      }
    });

    await wrapper.find('input').trigger('change');

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['option1']);
    expect(wrapper.emitted('change')?.[0]).toEqual(['option1']);
  });

  it('shows error message', () => {
    const wrapper = mount(BaseInputRadio, {
      props: { error: 'Selection required' }
    });
    expect(wrapper.find('.c-input-radio__error').text()).toBe('Selection required');
    expect(wrapper.classes()).toContain('has-error');
  });

  it('can be disabled', () => {
    const wrapper = mount(BaseInputRadio, {
      props: { disabled: true }
    });
    expect(wrapper.find('input').element.disabled).toBe(true);
    expect(wrapper.classes()).toContain('is-disabled');
  });

  it('does not emit events when disabled', async () => {
    const wrapper = mount(BaseInputRadio, {
      props: {
        disabled: true,
        value: 'option1'
      }
    });

    await wrapper.find('input').trigger('change');

    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
    expect(wrapper.emitted('change')).toBeFalsy();
  });
});
