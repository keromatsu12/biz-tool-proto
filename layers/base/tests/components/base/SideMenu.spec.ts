import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import SideMenu from '../../../components/base/SideMenu.vue'

const mockItems = [
  {
    label: 'Item 1',
    icon: 'LucideHome',
    children: [
      { label: 'Sub 1', to: '/sub1' }
    ]
  },
  {
    label: 'Item 2',
    children: [
      { label: 'Sub 2', to: '/sub2' },
      {
        label: 'Sub 2b',
        children: [
          { label: 'Deep 1', to: '/deep1' }
        ]
      }
    ]
  },
  {
    label: 'Leaf Item',
    to: '/leaf'
  }
]

describe('SideMenu', () => {
  const globalOptions = {
    stubs: {
      NuxtLink: {
        template: '<a><slot /></a>',
        props: ['to']
      },
      LucideHome: true,
      LucideChevronDown: true,
      LucideChevronRight: true
    }
  }

  it('renders top level items', () => {
    const wrapper = mount(SideMenu, {
      props: { items: mockItems },
      global: globalOptions
    })
    expect(wrapper.text()).toContain('Item 1')
    expect(wrapper.text()).toContain('Item 2')
    expect(wrapper.text()).toContain('Leaf Item')
  })

  it('children are hidden initially', () => {
    const wrapper = mount(SideMenu, {
      props: { items: mockItems },
      global: globalOptions
    })
    expect(wrapper.text()).not.toContain('Sub 1')
  })

  it('toggles accordion on click', async () => {
    const wrapper = mount(SideMenu, {
      props: { items: mockItems },
      global: globalOptions
    })

    const item1 = wrapper.findAll('.c-side-menu__row')[0]
    await item1.trigger('click')

    expect(wrapper.text()).toContain('Sub 1')

    // Close
    await item1.trigger('click')
    expect(wrapper.text()).not.toContain('Sub 1')
  })

  it('enforces exclusive open (accordion behavior)', async () => {
    const wrapper = mount(SideMenu, {
      props: { items: mockItems },
      global: globalOptions
    })

    const rows = wrapper.findAll('.c-side-menu__row')

    // Open Item 1
    await rows[0].trigger('click')
    expect(wrapper.text()).toContain('Sub 1')

    // Open Item 2
    await rows[1].trigger('click')
    expect(wrapper.text()).toContain('Sub 2')
    expect(wrapper.text()).not.toContain('Sub 1') // Item 1 should close
  })

  it('renders level 3 items (deep nesting)', async () => {
    const wrapper = mount(SideMenu, {
      props: { items: mockItems },
      global: globalOptions
    })

    // Open Item 2
    const rows = wrapper.findAll('.c-side-menu__row')
    await rows[1].trigger('click')

    expect(wrapper.text()).toContain('Sub 2b')
    expect(wrapper.text()).toContain('Deep 1')
  })

  it('handles leaf items correctly', async () => {
    const wrapper = mount(SideMenu, {
      props: { items: mockItems },
      global: globalOptions
    })
    const rows = wrapper.findAll('.c-side-menu__row')

    // Clicking a leaf item (index 2)
    await rows[2].trigger('click')

    // No changes expected
    expect(wrapper.text()).not.toContain('Sub 1')
  })
});
