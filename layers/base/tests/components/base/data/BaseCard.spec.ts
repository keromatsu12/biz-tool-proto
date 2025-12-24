import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseCard from '../../../../components/base/data/BaseCard.vue';

describe('BaseCard', () => {
  it('renders correctly', () => {
    const wrapper = mount(BaseCard, {
      slots: {
        default: 'Card Content'
      }
    });
    expect(wrapper.find('.c-base-card__body').text()).toBe('Card Content');
  });

  it('renders title', () => {
    const wrapper = mount(BaseCard, {
      props: { title: 'Card Title' }
    });
    expect(wrapper.find('.c-base-card__title').text()).toBe('Card Title');
  });

  it('renders footer slot', () => {
    const wrapper = mount(BaseCard, {
      slots: {
        footer: 'Footer Content'
      }
    });
    expect(wrapper.find('.c-base-card__footer').text()).toBe('Footer Content');
  });

  it('shows loading state', () => {
    const wrapper = mount(BaseCard, {
      props: { loading: true }
    });
    expect(wrapper.find('.c-base-card__loading').exists()).toBe(true);
  });
});
