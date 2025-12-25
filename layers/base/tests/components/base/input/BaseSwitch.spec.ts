import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseSwitch from '../../../../components/base/input/BaseSwitch.vue';

describe('BaseSwitch', () => {
  it('renders correctly', () => {
    const wrapper = mount(BaseSwitch, {
      props: {
        label: 'Enable Notifications',
        modelValue: false
      }
    });
    expect(wrapper.find('.c-switch__label').text()).toBe('Enable Notifications');
    expect(wrapper.find('input').element.checked).toBe(false);
  });

  it('reflects modelValue state', () => {
    const wrapper = mount(BaseSwitch, {
      props: { modelValue: true }
    });
    expect(wrapper.find('input').element.checked).toBe(true);
  });

  it('emits update:modelValue and change events on toggle', async () => {
    const wrapper = mount(BaseSwitch, {
      props: { modelValue: false }
    });

    await wrapper.find('input').setChecked(true);

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true]);
    expect(wrapper.emitted('change')?.[0]).toEqual([true]);
  });

  it('shows error message', () => {
    const wrapper = mount(BaseSwitch, {
      props: { error: 'Failed to sync' }
    });
    expect(wrapper.find('.c-switch__error').text()).toBe('Failed to sync');
    expect(wrapper.classes()).toContain('has-error');
  });

  it('can be disabled', () => {
    const wrapper = mount(BaseSwitch, {
      props: { disabled: true }
    });
    expect(wrapper.find('input').element.disabled).toBe(true);
    expect(wrapper.classes()).toContain('is-disabled');
  });
});
