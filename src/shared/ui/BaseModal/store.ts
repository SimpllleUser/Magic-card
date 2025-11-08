import { defineStore } from 'pinia';
import { ref } from 'vue';
import { ModalAction, ModalParams } from '@/shared';

export const useModalStore = defineStore('modal', () => {
  const modalList = ref<Record<string, ModalAction>>({});

  const initModal = (key: string, actions: ModalAction) => {
    modalList.value[key] = actions;
  };

  const show = (key: string, params?: ModalParams) => {
    modalList.value[key]?.show(params);
  };

  const hide = (key: string) => modalList.value[key]?.hide();

  return { modalList, initModal, show, hide };
});
