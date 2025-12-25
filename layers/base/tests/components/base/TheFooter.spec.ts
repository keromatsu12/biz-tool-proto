import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import TheFooter from '../../../components/base/TheFooter.vue';

describe('TheFooter', () => {
  it('renders current year', () => {
    // Arrange
    const currentYear = new Date().getFullYear();
    const wrapper = mount(TheFooter);

    // Act & Assert
    expect(wrapper.text()).toContain(currentYear.toString());
    expect(wrapper.text()).toContain('BizTool');
  });
});
