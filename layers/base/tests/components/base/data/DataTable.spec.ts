import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import DataTable from '../../../../components/base/data/DataTable.vue';

describe('DataTable', () => {
  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'age', label: 'Age', sortable: true }
  ];
  const items = [
    { name: 'John', age: 30 },
    { name: 'Jane', age: 25 }
  ];

  it('renders correctly', () => {
    const wrapper = mount(DataTable, {
      props: { columns, items }
    });
    expect(wrapper.findAll('tbody tr').length).toBe(2);
    expect(wrapper.findAll('th').length).toBe(2);
    expect(wrapper.text()).toContain('John');
  });

  it('emits sort event', async () => {
    const wrapper = mount(DataTable, {
      props: { columns, items }
    });
    const ageHeader = wrapper.findAll('th').find(th => th.text().includes('Age'));
    await ageHeader?.trigger('click');
    expect(wrapper.emitted('update:sort')?.[0]).toEqual(['age']);
  });

  it('handles selection', async () => {
    const wrapper = mount(DataTable, {
      props: { columns, items, selectable: true }
    });
    const checkbox = wrapper.find('tbody tr input[type="checkbox"]');
    await checkbox.setValue(true);
    expect(wrapper.emitted('update:selected')?.[0]).toEqual([[{ name: 'John', age: 30 }]]);
  });
});
