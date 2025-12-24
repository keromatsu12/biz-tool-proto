import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BasePagination from '../../../../components/base/data/BasePagination.vue';

describe('BasePagination', () => {
  it('renders correctly', () => {
    const wrapper = mount(BasePagination, {
      props: {
        currentPage: 1,
        totalPages: 10
      }
    });
    expect(wrapper.find('.c-base-pagination').exists()).toBe(true);
    // 1 2 3 ... 10 + prev + next + first + last = ?
    // implementation details: 1 (current), 2, 3 (delta), ..., 10
    // + arrows
  });

  it('emits update:page on click', async () => {
    const wrapper = mount(BasePagination, {
      props: {
        currentPage: 1,
        totalPages: 10
      }
    });
    // Click page 2
    // We need to find the button with text "2".
    const buttons = wrapper.findAll('.c-base-pagination__btn');
    const page2Btn = buttons.find(b => b.text() === '2');
    await page2Btn?.trigger('click');
    expect(wrapper.emitted('update:page')?.[0]).toEqual([2]);
  });

  it('disables previous button on first page', () => {
    const wrapper = mount(BasePagination, {
      props: {
        currentPage: 1,
        totalPages: 10
      }
    });
    const prevBtn = wrapper.find('[aria-label="Previous page"]');
    expect(prevBtn.attributes('disabled')).toBeDefined();
  });
});
