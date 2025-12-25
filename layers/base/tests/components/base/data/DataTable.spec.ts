import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import DataTable from '../../../../components/base/data/DataTable.vue';

describe('DataTable', () => {
  const globalOptions = {
    // Stubs are not effectively replacing auto-imported icons in this environment,
    // so we verify the real icons or allow them to render.
  }

  const columns = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'role', label: 'Role' }
  ];

  const items = [
    { id: 1, name: 'Alice', role: 'Admin' },
    { id: 2, name: 'Bob', role: 'User' }
  ];

  it('renders correctly', () => {
    const wrapper = mount(DataTable, {
      props: { columns, items },
      global: globalOptions
    });
    expect(wrapper.find('table').exists()).toBe(true);
    expect(wrapper.findAll('tbody tr').length).toBe(2);
    expect(wrapper.text()).toContain('Alice');
  });

  it('renders empty state', () => {
    const wrapper = mount(DataTable, {
      props: { columns, items: [] },
      global: globalOptions
    });
    expect(wrapper.find('.c-data-table__empty').exists()).toBe(true);
    expect(wrapper.text()).toContain('No data available');
  });

  it('renders loading state', () => {
    const wrapper = mount(DataTable, {
      props: { columns, items: [], loading: true },
      global: globalOptions
    });
    expect(wrapper.find('.c-data-table__loading').exists()).toBe(true);
    expect(wrapper.find('.c-data-table__empty').exists()).toBe(false);
  });

  it('handles sorting', async () => {
    const wrapper = mount(DataTable, {
      props: { columns, items },
      global: globalOptions
    });

    await wrapper.findAll('th')[0].trigger('click');
    expect(wrapper.emitted('update:sort')?.[0]).toEqual(['id']);

    await wrapper.findAll('th')[2].trigger('click');
    expect(wrapper.emitted('update:sort')).toHaveLength(1);
  });

  it('handles row selection (single)', async () => {
    const wrapper = mount(DataTable, {
      props: {
        columns,
        items,
        selectable: true,
        selectedItems: []
      },
      global: globalOptions
    });

    const checkboxes = wrapper.findAll('tbody input[type="checkbox"]');
    await checkboxes[0].trigger('change');

    expect(wrapper.emitted('update:selected')?.[0][0]).toEqual([items[0]]);
  });

  it('handles row unselection', async () => {
    const wrapper = mount(DataTable, {
      props: {
        columns,
        items,
        selectable: true,
        selectedItems: [items[0]]
      },
      global: globalOptions
    });

    const checkboxes = wrapper.findAll('tbody input[type="checkbox"]');
    await checkboxes[0].trigger('change');

    expect(wrapper.emitted('update:selected')?.[0][0]).toEqual([]);
  });

  it('handles select all', async () => {
    const wrapper = mount(DataTable, {
      props: {
        columns,
        items,
        selectable: true,
        selectedItems: []
      },
      global: globalOptions
    });

    const selectAllCheckbox = wrapper.find('thead input[type="checkbox"]');
    (selectAllCheckbox.element as HTMLInputElement).checked = true;
    await selectAllCheckbox.trigger('change');

    expect(wrapper.emitted('update:selected')?.[0][0]).toEqual([items[0], items[1]]);
  });

  it('handles unselect all', async () => {
    const wrapper = mount(DataTable, {
      props: {
        columns,
        items,
        selectable: true,
        selectedItems: [items[0], items[1]]
      },
      global: globalOptions
    });

    const selectAllCheckbox = wrapper.find('thead input[type="checkbox"]');
    (selectAllCheckbox.element as HTMLInputElement).checked = false;
    await selectAllCheckbox.trigger('change');

    expect(wrapper.emitted('update:selected')?.[0][0]).toEqual([]);
  });

  it('emits row-click', async () => {
    const wrapper = mount(DataTable, {
      props: { columns, items },
      global: globalOptions
    });

    await wrapper.findAll('tbody tr')[0].trigger('click');
    expect(wrapper.emitted('row-click')?.[0]).toEqual([items[0]]);
  });

  it('stops propagation on checkbox click', async () => {
    const wrapper = mount(DataTable, {
      props: { columns, items, selectable: true },
      global: globalOptions
    });

    const checkboxCell = wrapper.findAll('td.c-data-table__td--checkbox')[0];
    await checkboxCell.trigger('click');

    expect(wrapper.emitted('row-click')).toBeFalsy();
  });

  it('shows sort icons correctly', () => {
    const wrapper = mount(DataTable, {
      props: {
        columns,
        items,
        sortKey: 'id',
        sortOrder: 'asc'
      },
      global: globalOptions
    });

    // Check for the class that Lucide icons render
    expect(wrapper.find('.lucide-arrow-up').exists()).toBe(true);
    expect(wrapper.find('.lucide-arrow-down').exists()).toBe(false);
  });
});
