import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseTextarea from '../../../../components/base/input/BaseTextarea.vue';

describe('BaseTextarea', () => {
  it('renders correctly', () => {
    const wrapper = mount(BaseTextarea, {
      props: {
        modelValue: 'initial text',
        label: 'Comments',
        placeholder: 'Enter comments',
        rows: 5
      }
    });

    const textarea = wrapper.find('textarea');
    expect(textarea.element.value).toBe('initial text');
    expect(wrapper.find('label').text()).toBe('Comments');
    expect(textarea.attributes('placeholder')).toBe('Enter comments');
    expect(textarea.attributes('rows')).toBe('5');
  });

  it('emits update:modelValue on input', async () => {
    const wrapper = mount(BaseTextarea);
    await wrapper.find('textarea').setValue('updated text');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['updated text']);
  });

  it('emits focus and blur events', async () => {
    const wrapper = mount(BaseTextarea);
    const textarea = wrapper.find('textarea');

    await textarea.trigger('focus');
    expect(wrapper.emitted('focus')).toBeTruthy();

    await textarea.trigger('blur');
    expect(wrapper.emitted('blur')).toBeTruthy();
  });

  it('shows error message', () => {
    const wrapper = mount(BaseTextarea, {
      props: { error: 'Too long' }
    });
    expect(wrapper.find('.c-input-textarea__error').text()).toBe('Too long');
    expect(wrapper.classes()).toContain('has-error');
  });

  it('can be disabled', () => {
    const wrapper = mount(BaseTextarea, {
      props: { disabled: true }
    });
    expect(wrapper.find('textarea').element.disabled).toBe(true);
    expect(wrapper.classes()).toContain('is-disabled');
  });

  it('can be readonly', () => {
    const wrapper = mount(BaseTextarea, {
      props: { readonly: true }
    });
    expect(wrapper.find('textarea').element.readOnly).toBe(true);
  });
});
