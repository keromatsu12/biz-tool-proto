import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import SideMenu from './SideMenu.vue'
import { Home } from 'lucide-vue-next'

const mockItems = [
  {
    label: 'Item 1',
    icon: Home,
    children: [
      { label: 'Sub 1', to: '/sub1' }
    ]
  },
  {
    label: 'Item 2',
    children: [
      { label: 'Sub 2', to: '/sub2' }
    ]
  }
]

describe('SideMenu', () => {
  it('renders top level items', () => {
    const wrapper = mount(SideMenu, { props: { items: mockItems } })
    expect(wrapper.text()).toContain('Item 1')
    expect(wrapper.text()).toContain('Item 2')
  })

  it('children are hidden initially', () => {
    const wrapper = mount(SideMenu, { props: { items: mockItems } })
    expect(wrapper.text()).not.toContain('Sub 1')
  })

  it('toggles accordion on click', async () => {
    const wrapper = mount(SideMenu, { props: { items: mockItems } })

    // Find the click target for Item 1
    // The structure is .c-side-menu__row with click handler
    const rows = wrapper.findAll('.c-side-menu__row')
    await rows[0].trigger('click')

    expect(wrapper.text()).toContain('Sub 1')

    // Close
    await rows[0].trigger('click')
    expect(wrapper.text()).not.toContain('Sub 1')
  })

  it('enforces exclusive open (accordion behavior)', async () => {
    const wrapper = mount(SideMenu, { props: { items: mockItems } })
    const rows = wrapper.findAll('.c-side-menu__row')

    // Open Item 1
    await rows[0].trigger('click')
    expect(wrapper.text()).toContain('Sub 1')

    // Open Item 2
    await rows[1].trigger('click')
    expect(wrapper.text()).toContain('Sub 2')
    expect(wrapper.text()).not.toContain('Sub 1') // Item 1 should close
  })
})
