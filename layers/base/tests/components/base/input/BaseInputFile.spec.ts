import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseInputFile from '../../../../components/base/input/BaseInputFile.vue';

describe('BaseInputFile', () => {
  it('renders correctly', () => {
    const wrapper = mount(BaseInputFile, {
      props: {
        label: 'Upload File'
      }
    });
    expect(wrapper.find('label').text()).toBe('Upload File');
    expect(wrapper.find('.c-input-file__dropzone').exists()).toBe(true);
  });

  it('displays selected file info', async () => {
    const file = new File(['content'], 'test.txt', { type: 'text/plain' });
    const wrapper = mount(BaseInputFile, {
      props: {
        modelValue: file
      }
    });
    expect(wrapper.find('.c-input-file__preview').exists()).toBe(true);
    expect(wrapper.find('.c-input-file__name').text()).toBe('test.txt');
  });

  it('emits remove event', async () => {
    const file = new File(['content'], 'test.txt', { type: 'text/plain' });
    const wrapper = mount(BaseInputFile, {
      props: {
        modelValue: file
      }
    });
    await wrapper.find('.c-input-file__remove').trigger('click');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([null]);
  });
});
