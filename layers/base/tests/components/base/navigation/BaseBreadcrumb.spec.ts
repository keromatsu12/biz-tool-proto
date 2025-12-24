import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseBreadcrumb from '../../../../components/base/navigation/BaseBreadcrumb.vue';

describe('BaseBreadcrumb', () => {
  const items = [
    { label: 'Parent', to: '/parent' },
    { label: 'Child' }
  ];

  it('renders correctly', () => {
    const wrapper = mount(BaseBreadcrumb, {
      props: { items },
      global: {
        stubs: {
          NuxtLink: {
            template: '<a><slot /></a>',
            props: ['to']
          }
        }
      }
    });
    const links = wrapper.findAll('.c-base-breadcrumb__link');
    // Home + Parent + Child
    expect(links.length).toBe(3);
    expect(links[1].text()).toBe('Parent');
    expect(links[2].text()).toBe('Child');
    expect(links[2].classes()).toContain('is-current');
  });
});
