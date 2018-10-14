import { shallowMount } from '@vue/test-utils';
import Logo from '@/components/Logo.vue';

describe('Logo.vue', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(Logo);
    expect(wrapper.html()).toBe('<div id="logo-container"><img src="../assets/logo.png" alt="logo"></div>');
  });
});
