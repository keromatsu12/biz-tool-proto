import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import TheHeader from '../../../components/base/TheHeader.vue';

describe('TheHeader', () => {
  it('renders default title when no title prop is provided', () => {
    // Arrange
    const wrapper = mount(TheHeader, {
      global: {
        stubs: {
          LucideMenu: true
        }
      }
    });

    // Act & Assert
    expect(wrapper.find('.l-header__logo').text()).toBe('BizTool');
  });

  it('renders provided title', () => {
    // Arrange
    const title = 'My Custom App';
    const wrapper = mount(TheHeader, {
      props: { title },
      global: {
        stubs: {
          LucideMenu: true
        }
      }
    });

    // Act & Assert
    expect(wrapper.find('.l-header__logo').text()).toBe(title);
  });

  it('emits toggle-menu event when toggle button is clicked', async () => {
    // Arrange
    const wrapper = mount(TheHeader, {
      global: {
        stubs: {
          LucideMenu: true
        }
      }
    });

    // Act
    await wrapper.find('.l-header__toggle').trigger('click');

    // Assert
    expect(wrapper.emitted('toggle-menu')).toBeTruthy();
    expect(wrapper.emitted('toggle-menu')).toHaveLength(1);
  });

  it('renders actions slot content', () => {
    // Arrange
    const wrapper = mount(TheHeader, {
      slots: {
        actions: '<button class="action-btn">Action</button>'
      },
      global: {
        stubs: {
          LucideMenu: true
        }
      }
    });

    // Act & Assert
    expect(wrapper.find('.action-btn').exists()).toBe(true);
  });
});
