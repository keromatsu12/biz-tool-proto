import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseToast from '../../../../components/base/feedback/BaseToast.vue';

describe('BaseToast', () => {
  it('renders when modelValue is true', () => {
    const wrapper = mount(BaseToast, {
      props: {
        modelValue: true,
        message: 'Success Message',
        type: 'success'
      },
      global: {
        stubs: {
          Teleport: true
        }
      }
    });
    expect(wrapper.find('.c-base-toast').exists()).toBe(true);
    expect(wrapper.find('.c-base-toast__message').text()).toBe('Success Message');
    // The class is on the inner div, but wrapper points to it because Teleport is stubbed
    expect(wrapper.find('.c-base-toast').classes()).toContain('c-base-toast--success');
  });

  it('emits update:modelValue on close click', async () => {
    const wrapper = mount(BaseToast, {
      props: {
        modelValue: true,
        message: 'Test'
      },
      global: {
        stubs: {
          Teleport: true
        }
      }
    });
    await wrapper.find('.c-base-toast__close').trigger('click');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false]);
  });
});
