import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseInputDate from '../../../../components/base/input/BaseInputDate.vue';

describe('BaseInputDate', () => {
  it('renders correctly', () => {
    const wrapper = mount(BaseInputDate, {
      props: {
        label: 'Date Label',
        placeholder: 'Select a date'
      }
    });
    expect(wrapper.find('label').text()).toBe('Date Label');
  });

  // Since we are mocking or using a library component, deep testing of the library itself is not needed.
  // We check if props are passed correctly.

  it('shows error state', () => {
    const wrapper = mount(BaseInputDate, {
      props: { error: 'Invalid date' }
    });
    expect(wrapper.find('.c-input-date__error').text()).toBe('Invalid date');
    expect(wrapper.classes()).toContain('has-error');
  });
});
