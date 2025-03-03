import { mount } from '@vue/test-utils';
import BaseModal from '../../../../shared/ui/BaseModal/BaseModal.vue';
import { describe, it, beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';

describe('BaseModal', () => {


  /// Example of mocking store

  // vi.mock('@/stores/someStore', () => ({
  //   useSomeStore: () => ({
  //     someProperty: 'mocked-value', // Mock value
  //     someMethod: vi.fn(), // Mock method
  //   }),
  // }));

  let pinia;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
  });


  it.concurrent('should render base state of component', async () => {

    const wrapper = mount(BaseModal, {
      props:{id: 'test', title: 'test'},
    });

    wrapper.vm.modalShow();

    await wrapper.vm.$nextTick();

    console.log(wrapper.html(), '111');

  });
});
