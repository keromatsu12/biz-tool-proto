import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BasePagination from '../../../../components/base/data/BasePagination.vue';

describe('BasePagination', () => {
  const globalOptions = {
    stubs: {
      LucideChevronsLeft: true,
      LucideChevronLeft: true,
      LucideChevronRight: true,
      LucideChevronsRight: true
    }
  }

  it('renders correctly', () => {
    const wrapper = mount(BasePagination, {
      props: {
        currentPage: 1,
        totalPages: 10
      },
      global: globalOptions
    });
    expect(wrapper.find('.c-base-pagination').exists()).toBe(true);
  });

  it('renders total items info', () => {
    const wrapper = mount(BasePagination, {
      props: {
        currentPage: 1,
        totalPages: 10,
        totalItems: 100
      },
      global: globalOptions
    });
    expect(wrapper.text()).toContain('Total 100 items');
  });

  it('emits update:page when page button clicked', async () => {
    const wrapper = mount(BasePagination, {
      props: {
        currentPage: 1,
        totalPages: 10
      },
      global: globalOptions
    });

    // Find button for page 2
    const buttons = wrapper.findAll('.c-base-pagination__btn');
    const page2 = buttons.filter(b => b.text() === '2')[0];
    await page2.trigger('click');
    expect(wrapper.emitted('update:page')?.[0]).toEqual([2]);
  });

  it('disables prev/first on first page', () => {
    const wrapper = mount(BasePagination, {
      props: { currentPage: 1, totalPages: 5 },
      global: globalOptions
    });
    const buttons = wrapper.findAll('button');
    expect(buttons[0].attributes('disabled')).toBeDefined();
    expect(buttons[1].attributes('disabled')).toBeDefined();
  });

  it('disables next/last on last page', () => {
    const wrapper = mount(BasePagination, {
      props: { currentPage: 5, totalPages: 5 },
      global: globalOptions
    });
    const buttons = wrapper.findAll('button');
    const lastIndex = buttons.length - 1;
    expect(buttons[lastIndex].attributes('disabled')).toBeDefined();
    expect(buttons[lastIndex-1].attributes('disabled')).toBeDefined();
  });

  it('handles small number of pages (<=5)', () => {
    const wrapper = mount(BasePagination, {
      props: { currentPage: 1, totalPages: 5 },
      global: globalOptions
    });
    // Should show 1, 2, 3, 4, 5. No ellipses.
    expect(wrapper.text()).not.toContain('...');
    // Filter out buttons with no text (icons) or non-numeric text
    const pageButtons = wrapper.findAll('.c-base-pagination__btn').filter(b => {
      const text = b.text();
      return text.trim().length > 0 && !isNaN(Number(text));
    });
    expect(pageButtons.length).toBe(5);
  });

  it('handles ellipsis in middle pages (page > delta + 2)', () => {
    // total 10, current 5.
    // 1 ... 4 5 6 ... 10
    const wrapper = mount(BasePagination, {
      props: { currentPage: 5, totalPages: 10 },
      global: globalOptions
    });
    expect(wrapper.findAll('.c-base-pagination__ellipsis').length).toBeGreaterThanOrEqual(2);
  });

  it('handles ellipsis only at end (page near start)', () => {
    // total 10, current 2.
    // 1 2 3 ... 10
    const wrapper = mount(BasePagination, {
      props: { currentPage: 2, totalPages: 10 },
      global: globalOptions
    });
    expect(wrapper.findAll('.c-base-pagination__ellipsis').length).toBe(1);
    expect(wrapper.text()).toContain('...');
  });

  it('handles ellipsis only at start (page near end)', () => {
    // total 10, current 9.
    // 1 ... 8 9 10
    const wrapper = mount(BasePagination, {
      props: { currentPage: 9, totalPages: 10 },
      global: globalOptions
    });
    expect(wrapper.findAll('.c-base-pagination__ellipsis').length).toBe(1);
  });

  it('does not emit if clicking current page', async () => {
    const wrapper = mount(BasePagination, {
      props: { currentPage: 1, totalPages: 10 },
      global: globalOptions
    });
    const page1 = wrapper.findAll('.c-base-pagination__btn').filter(b => b.text() === '1')[0];
    await page1.trigger('click');
    expect(wrapper.emitted('update:page')).toBeFalsy();
  });
});
