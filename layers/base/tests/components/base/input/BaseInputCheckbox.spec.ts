import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseInputCheckbox from '../../../../components/base/input/BaseInputCheckbox.vue';

describe('BaseInputCheckbox', () => {
  describe('Boolean mode', () => {
    it('renders correctly', () => {
      const wrapper = mount(BaseInputCheckbox, {
        props: {
          label: 'Accept Terms',
          modelValue: false
        }
      });
      expect(wrapper.find('label').text()).toBe('Accept Terms');
      expect(wrapper.find('input').element.checked).toBe(false);
    });

    it('emits update:modelValue when toggled', async () => {
      const wrapper = mount(BaseInputCheckbox, {
        props: { modelValue: false }
      });

      await wrapper.find('input').setChecked(true);
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true]);

      await wrapper.setProps({ modelValue: true });
      await wrapper.find('input').setChecked(false);
      expect(wrapper.emitted('update:modelValue')?.[1]).toEqual([false]);
    });
  });

  describe('Array mode', () => {
    it('is checked if value is in modelValue array', () => {
      const wrapper = mount(BaseInputCheckbox, {
        props: {
          modelValue: ['A', 'B'],
          value: 'A'
        }
      });
      expect(wrapper.find('input').element.checked).toBe(true);
    });

    it('is not checked if value is not in modelValue array', () => {
      const wrapper = mount(BaseInputCheckbox, {
        props: {
          modelValue: ['B'],
          value: 'A'
        }
      });
      expect(wrapper.find('input').element.checked).toBe(false);
    });

    it('adds value to array when checked', async () => {
      const wrapper = mount(BaseInputCheckbox, {
        props: {
          modelValue: ['B'],
          value: 'A'
        }
      });

      await wrapper.find('input').setChecked(true);
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([['B', 'A']]);
    });

    it('removes value from array when unchecked', async () => {
      const wrapper = mount(BaseInputCheckbox, {
        props: {
          modelValue: ['A', 'B'],
          value: 'A'
        }
      });

      await wrapper.find('input').setChecked(false);
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([['B']]);
    });
  });

  describe('Common states', () => {
    it('shows error message', () => {
      const wrapper = mount(BaseInputCheckbox, {
        props: { error: 'Required' }
      });
      expect(wrapper.find('.c-input-checkbox__error').text()).toBe('Required');
      expect(wrapper.classes()).toContain('has-error');
    });

    it('can be disabled', () => {
      const wrapper = mount(BaseInputCheckbox, {
        props: { disabled: true }
      });
      expect(wrapper.find('input').element.disabled).toBe(true);
      expect(wrapper.classes()).toContain('is-disabled');
    });
  });
});
