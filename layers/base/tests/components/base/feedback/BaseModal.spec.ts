import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseModal from '../../../../components/base/feedback/BaseModal.vue';

describe('BaseModal', () => {
  it('renders when modelValue is true', () => {
    // Teleport needs to be stubbed or handled, usually disabled in tests or we look at body
    const wrapper = mount(BaseModal, {
      props: {
        modelValue: true,
        title: 'Test Modal'
      },
      global: {
        stubs: {
          Teleport: true
        }
      }
    });
    // With Teleport stubbed true, it renders in place
    expect(wrapper.find('.c-base-modal').exists()).toBe(true);
    expect(wrapper.find('.c-base-modal__title').text()).toBe('Test Modal');
  });

  it('does not render when modelValue is false', () => {
    const wrapper = mount(BaseModal, {
      props: {
        modelValue: false
      },
      global: {
        stubs: {
          Teleport: true
        }
      }
    });
    expect(wrapper.find('.c-base-modal').exists()).toBe(false);
  });

  it('emits close event on close button click', async () => {
    const wrapper = mount(BaseModal, {
      props: {
        modelValue: true
      },
      global: {
        stubs: {
          Teleport: true
        }
      }
    });
    await wrapper.find('.c-base-modal__close').trigger('click');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false]);
    expect(wrapper.emitted('close')).toBeTruthy();
  });
});
