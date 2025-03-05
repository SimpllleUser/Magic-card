import { mount } from '@vue/test-utils';
import BaseModal from '../../../../shared/ui/BaseModal/BaseModal.vue';
import { describe, it, beforeEach, expect } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { testIdSelector } from '../../utils';
import { Props } from '@/shared/ui/BaseModal/types';

let props: Props;
const defaultProps = {
  id: 'modal-id',
  title: 'Modal title'
};

describe('BaseModal', () => {

  let pinia;

  beforeEach(() => {
    props = defaultProps;

    pinia = createPinia();
    setActivePinia(pinia);
  });

  it.concurrent('should render title and swicth "betweem "open" and "close" states', async () => {
    const wrapper = mount(BaseModal, { props });

    wrapper.vm.modalShow();

    await wrapper.vm.$nextTick();

    expect(wrapper.find(testIdSelector('base-modal-title')).text()).toContain(defaultProps.title);

    wrapper.vm.modalHide();

    await wrapper.vm.$nextTick();

    expect(wrapper.find(testIdSelector('base-modal-wrapper')).exists()).toBeFalsy();
  });
});
