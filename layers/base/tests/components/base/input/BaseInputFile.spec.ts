import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseInputFile from '../../../../components/base/input/BaseInputFile.vue';

describe('BaseInputFile', () => {
  const globalOptions = {
    stubs: {
      LucideUpload: true,
      LucideFile: true,
      LucideX: true
    }
  }

  it('renders correctly in default state (no file selected)', () => {
    const wrapper = mount(BaseInputFile, {
      props: { label: 'Upload Document' },
      global: globalOptions
    });

    expect(wrapper.find('.c-input-file__label').text()).toBe('Upload Document');
    expect(wrapper.find('.c-input-file__dropzone').exists()).toBe(true);
    expect(wrapper.find('.c-input-file__preview').exists()).toBe(false);
  });

  it('renders correctly with file selected', () => {
    const file = new File(['content'], 'test.pdf', { type: 'application/pdf' });

    const wrapper = mount(BaseInputFile, {
      props: {
        modelValue: file,
        label: 'Upload Document'
      },
      global: globalOptions
    });

    expect(wrapper.find('.c-input-file__dropzone').exists()).toBe(false);
    expect(wrapper.find('.c-input-file__preview').exists()).toBe(true);
    expect(wrapper.find('.c-input-file__name').text()).toBe('test.pdf');
  });

  it('handles file selection via input', async () => {
    const wrapper = mount(BaseInputFile, { global: globalOptions });
    const file = new File(['content'], 'test.png', { type: 'image/png' });

    const input = wrapper.find('input[type="file"]');
    // Simulate file selection
    Object.defineProperty(input.element, 'files', {
      value: [file]
    });
    await input.trigger('change');

    expect(wrapper.emitted('update:modelValue')?.[0][0]).toBe(file);
  });

  it('handles drag and drop events', async () => {
    const wrapper = mount(BaseInputFile, { global: globalOptions });
    const dropzone = wrapper.find('.c-input-file__dropzone');

    await dropzone.trigger('dragover');
    expect(dropzone.classes()).toContain('is-dragging');

    await dropzone.trigger('dragleave');
    expect(dropzone.classes()).not.toContain('is-dragging');

    // Test Drop
    const file = new File([''], 'dragged.jpg');
    const dropEvent = {
      dataTransfer: {
        files: [file]
      }
    };
    await dropzone.trigger('drop', dropEvent);
    expect(wrapper.emitted('update:modelValue')?.[0][0]).toBe(file);
  });

  it('does not handle drop if disabled', async () => {
    const wrapper = mount(BaseInputFile, {
      props: { disabled: true },
      global: globalOptions
    });
    const dropzone = wrapper.find('.c-input-file__dropzone');

    const file = new File([''], 'dragged.jpg');
    const dropEvent = {
      dataTransfer: {
        files: [file]
      }
    };
    await dropzone.trigger('drop', dropEvent);
    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
  });

  it('removes file when remove button clicked', async () => {
    const file = new File([''], 'test.pdf');
    const wrapper = mount(BaseInputFile, {
      props: { modelValue: file },
      global: globalOptions
    });

    await wrapper.find('.c-input-file__remove').trigger('click');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([null]);
  });

  it('does not remove file if disabled', async () => {
    const file = new File([''], 'test.pdf');
    const wrapper = mount(BaseInputFile, {
      props: {
        modelValue: file,
        disabled: true
      },
      global: globalOptions
    });

    await wrapper.find('.c-input-file__remove').trigger('click');
    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
  });

  it('triggers browse on click', async () => {
    const wrapper = mount(BaseInputFile, { global: globalOptions });
    const input = wrapper.find('input');
    const clickSpy = vi.spyOn(input.element, 'click');

    await wrapper.find('.c-input-file__dropzone').trigger('click');
    expect(clickSpy).toHaveBeenCalled();
  });

  it('does not trigger browse if disabled', async () => {
    const wrapper = mount(BaseInputFile, {
      props: { disabled: true },
      global: globalOptions
    });
    const input = wrapper.find('input');
    const clickSpy = vi.spyOn(input.element, 'click');

    await wrapper.find('.c-input-file__dropzone').trigger('click');
    expect(clickSpy).not.toHaveBeenCalled();
  });
});
