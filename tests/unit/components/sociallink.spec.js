import Vue from 'vue';
import { shallowMount } from '@vue/test-utils';
import SocialLink from '@/components/SocialLink.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTwitter, faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faTwitter, faGithub, faLinkedinIn);

Vue.component('font-awesome-icon', FontAwesomeIcon);

describe('SocialLink', () => {
  it('should render the correct icon', () => {
    const wrapper = shallowMount(SocialLink, {
      propsData: {
        href: 'some-url',
        icon: 'some-icon',
      },
    });

    expect(wrapper.props().href).toBe('some-url');
    expect(wrapper.props().icon).toBe('some-icon');
    expect(wrapper.vm.iconName).toEqual(['fab', 'some-icon']);
  });
});
