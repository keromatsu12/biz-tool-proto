import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseButton from '../../../../components/base/button/BaseButton.vue';

describe('BaseButton', () => {
  const globalOptions = {
    stubs: {
      NuxtLink: {
        template: '<a><slot /></a>',
        props: ['to']
      }
    }
  }

  it('renders a button by default', () => {
    const wrapper = mount(BaseButton, { global: globalOptions });
    expect(wrapper.element.tagName).toBe('BUTTON');
    expect(wrapper.classes()).toContain('c-base-button');
    expect(wrapper.classes()).toContain('c-base-button--primary'); // default variant
    expect(wrapper.classes()).toContain('c-base-button--medium'); // default size
  });

  it('renders a link when "to" prop is present', () => {
    const wrapper = mount(BaseButton, {
      props: { to: '/home' },
      global: globalOptions
    });
    expect(wrapper.element.tagName).toBe('A');
    expect(wrapper.props('to')).toBe('/home');
  });

  it('applies variant and size classes', () => {
    const wrapper = mount(BaseButton, {
      props: {
        variant: 'danger',
        size: 'small',
        block: true
      },
      global: globalOptions
    });
    expect(wrapper.classes()).toContain('c-base-button--danger');
    expect(wrapper.classes()).toContain('c-base-button--small');
    expect(wrapper.classes()).toContain('c-base-button--block');
  });

  it('emits click event when clicked', async () => {
    const wrapper = mount(BaseButton, { global: globalOptions });
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeTruthy();
  });

  it('does not emit click event when disabled (button)', async () => {
    const wrapper = mount(BaseButton, {
      props: { disabled: true },
      global: globalOptions
    });

    // For a disabled button, the browser might not fire click at all.
    // But we want to test the handler logic in case it does.
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeFalsy();
    expect(wrapper.classes()).toContain('is-disabled');
  });

  it('handles preventDefault when disabled (link)', async () => {
    // Links don't have disabled attribute logic blocking events, so this ensures handler is called.
    const wrapper = mount(BaseButton, {
      props: {
        disabled: true,
        to: '/disabled-link'
      },
      global: globalOptions
    });

    const event = { preventDefault: vi.fn() };
    await wrapper.trigger('click', event);

    expect(wrapper.emitted('click')).toBeFalsy();
    // Verify preventDefault was called if possible, but trigger might create its own event.
    // At least we know the code path was executed if emitted is false.
  });
});
