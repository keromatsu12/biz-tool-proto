import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseToast from '../../../../components/base/feedback/BaseToast.vue';

describe('BaseToast', () => {
  const globalOptions = {
    stubs: {
      Teleport: true,
      LucideCheckCircle: true,
      LucideXCircle: true,
      LucideInfo: true,
      LucideAlertCircle: true,
      LucideX: true
    }
  }

  it('renders when modelValue is true', () => {
    const wrapper = mount(BaseToast, {
      props: {
        modelValue: true,
        message: 'Success Message',
        type: 'success'
      },
      global: globalOptions
    });
    expect(wrapper.find('.c-base-toast').exists()).toBe(true);
    expect(wrapper.find('.c-base-toast__message').text()).toBe('Success Message');
    expect(wrapper.find('.c-base-toast').classes()).toContain('c-base-toast--success');
  });

  it('emits update:modelValue on close click', async () => {
    const wrapper = mount(BaseToast, {
      props: {
        modelValue: true,
        message: 'Test'
      },
      global: globalOptions
    });
    await wrapper.find('.c-base-toast__close').trigger('click');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false]);
  });

  it('auto-closes after duration', async () => {
    vi.useFakeTimers();
    const wrapper = mount(BaseToast, {
      props: {
        modelValue: true,
        message: 'Test',
        duration: 1000
      },
      global: globalOptions
    });

    vi.advanceTimersByTime(1000);
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false]);
    vi.useRealTimers();
  });

  it('clears timer on unmount', () => {
    vi.useFakeTimers();
    const wrapper = mount(BaseToast, {
      props: {
        modelValue: true,
        message: 'Test',
        duration: 1000
      },
      global: globalOptions
    });

    wrapper.unmount();
    vi.advanceTimersByTime(1000);
  });

  it('handles watch modelValue changes', async () => {
    vi.useFakeTimers();
    const wrapper = mount(BaseToast, {
      props: {
        modelValue: false,
        message: 'Test',
        duration: 1000
      },
      global: globalOptions
    });

    // Set to true, should start timer
    await wrapper.setProps({ modelValue: true });
    vi.advanceTimersByTime(1000);
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false]);

    // Set to false, should clear timer (coverage check)
    await wrapper.setProps({ modelValue: false });

    vi.useRealTimers();
  });

  it('does not start timer if duration is 0', () => {
    vi.useFakeTimers();
    const wrapper = mount(BaseToast, {
      props: {
        modelValue: true,
        message: 'Test',
        duration: 0
      },
      global: globalOptions
    });

    vi.advanceTimersByTime(5000);
    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
    vi.useRealTimers();
  });
});
