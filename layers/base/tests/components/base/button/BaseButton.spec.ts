import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseButton from '../../../../components/base/button/BaseButton.vue';

describe('BaseButton', () => {
  it('renders correctly', () => {
    const wrapper = mount(BaseButton, {
      slots: {
        default: 'Click me'
      }
    });
    expect(wrapper.text()).toBe('Click me');
    expect(wrapper.classes()).toContain('c-base-button');
    expect(wrapper.classes()).toContain('c-base-button--primary'); // default
    expect(wrapper.classes()).toContain('c-base-button--medium'); // default
  });

  it('applies variant classes', () => {
    const wrapper = mount(BaseButton, {
      props: { variant: 'danger' }
    });
    expect(wrapper.classes()).toContain('c-base-button--danger');
  });

  it('applies size classes', () => {
    const wrapper = mount(BaseButton, {
      props: { size: 'small' }
    });
    expect(wrapper.classes()).toContain('c-base-button--small');
  });

  it('emits click event', async () => {
    const wrapper = mount(BaseButton);
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeTruthy();
  });

  it('does not emit click when disabled', async () => {
    const wrapper = mount(BaseButton, {
      props: { disabled: true }
    });
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeFalsy();
    expect(wrapper.classes()).toContain('is-disabled');
  });

  it('renders as NuxtLink when to prop is provided', () => {
    const wrapper = mount(BaseButton, {
      props: { to: '/home' },
      global: {
        stubs: {
          NuxtLink: {
            template: '<a><slot /></a>'
          }
        }
      }
    });
    expect(wrapper.element.tagName).toBe('A');
  });
});
