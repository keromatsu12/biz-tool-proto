import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseModal from '../../../../components/base/feedback/BaseModal.vue';

describe('BaseModal', () => {
  const globalOptions = {
    stubs: {
      Teleport: true,
      LucideX: true
    }
  }

  it('renders when modelValue is true', () => {
    const wrapper = mount(BaseModal, {
      props: {
        modelValue: true,
        title: 'Test Modal'
      },
      global: globalOptions
    });
    expect(wrapper.find('.c-base-modal').exists()).toBe(true);
    expect(wrapper.find('.c-base-modal__title').text()).toBe('Test Modal');
  });

  it('does not render when modelValue is false', () => {
    const wrapper = mount(BaseModal, {
      props: {
        modelValue: false
      },
      global: globalOptions
    });
    expect(wrapper.find('.c-base-modal').exists()).toBe(false);
  });

  it('emits close event on close button click', async () => {
    const wrapper = mount(BaseModal, {
      props: {
        modelValue: true
      },
      global: globalOptions
    });
    await wrapper.find('.c-base-modal__close').trigger('click');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false]);
    expect(wrapper.emitted('close')).toBeTruthy();
  });

  it('closes on overlay click if enabled', async () => {
    const wrapper = mount(BaseModal, {
      props: {
        modelValue: true,
        closeOnOverlayClick: true
      },
      global: globalOptions
    });
    await wrapper.find('.c-base-modal__overlay').trigger('click');
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
  });

  it('does not close on overlay click if disabled', async () => {
    const wrapper = mount(BaseModal, {
      props: {
        modelValue: true,
        closeOnOverlayClick: false
      },
      global: globalOptions
    });
    await wrapper.find('.c-base-modal__overlay').trigger('click');
    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
  });

  it('closes on Escape key press', async () => {
    const wrapper = mount(BaseModal, {
      props: {
        modelValue: true
      },
      global: globalOptions
    });

    // Simulate keydown on document
    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(event);

    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
  });

  it('does not close on Escape key press if not open', async () => {
    const wrapper = mount(BaseModal, {
      props: {
        modelValue: false
      },
      global: globalOptions
    });

    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(event);

    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
  });

  it('locks body scroll when open', async () => {
    const wrapper = mount(BaseModal, {
      props: {
        modelValue: false
      },
      global: globalOptions
    });

    await wrapper.setProps({ modelValue: true });
    expect(document.body.style.overflow).toBe('hidden');

    await wrapper.setProps({ modelValue: false });
    expect(document.body.style.overflow).toBe('');
  });

  it('removes event listener on unmount', () => {
    const removeSpy = vi.spyOn(document, 'removeEventListener');
    const wrapper = mount(BaseModal, {
      props: { modelValue: true },
      global: globalOptions
    });

    wrapper.unmount();
    expect(removeSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
  });
});
