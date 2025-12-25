import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import TheSidebar from '../../../components/base/TheSidebar.vue';

describe('TheSidebar', () => {
  const defaultItems = [
    { label: 'Home', to: '/' },
    { label: 'Settings', to: '/settings' }
  ];

  it('renders correctly with items', () => {
    // Arrange
    const wrapper = mount(TheSidebar, {
      props: {
        isOpen: false,
        items: defaultItems
      },
      global: {
        stubs: {
          SideMenu: true
        }
      }
    });

    // Act & Assert
    expect(wrapper.find('.l-sidebar').exists()).toBe(true);
    // Check if SideMenu is rendered (stubbed)
    expect(wrapper.findComponent({ name: 'SideMenu' }).exists()).toBe(true);
  });

  it('applies open class when isOpen is true', () => {
    // Arrange
    const wrapper = mount(TheSidebar, {
      props: {
        isOpen: true,
        items: defaultItems
      },
      global: {
        stubs: {
          SideMenu: true
        }
      }
    });

    // Act & Assert
    expect(wrapper.find('.l-sidebar').classes()).toContain('is-open');
    expect(wrapper.find('.l-sidebar-overlay').classes()).toContain('is-active');
  });

  it('does not apply open class when isOpen is false', () => {
    // Arrange
    const wrapper = mount(TheSidebar, {
      props: {
        isOpen: false,
        items: defaultItems
      },
      global: {
        stubs: {
          SideMenu: true
        }
      }
    });

    // Act & Assert
    expect(wrapper.find('.l-sidebar').classes()).not.toContain('is-open');
    expect(wrapper.find('.l-sidebar-overlay').classes()).not.toContain('is-active');
  });

  it('emits close event when overlay is clicked', async () => {
    // Arrange
    const wrapper = mount(TheSidebar, {
      props: {
        isOpen: true,
        items: defaultItems
      },
      global: {
        stubs: {
          SideMenu: true
        }
      }
    });

    // Act
    await wrapper.find('.l-sidebar-overlay').trigger('click');

    // Assert
    expect(wrapper.emitted('close')).toBeTruthy();
    expect(wrapper.emitted('close')).toHaveLength(1);
  });
});
