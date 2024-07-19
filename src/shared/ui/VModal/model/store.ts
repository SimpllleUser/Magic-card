import { defineStore } from 'pinia';
import { ref } from 'vue';
import { VModalAction } from './types';

export const useModalStore = defineStore('modal', () => {
  const modalList = ref<Record<string, VModalAction>>({});
  const initModal = (key: string, actions: VModalAction) => {
    modalList.value[key] = actions;
  };

  const show = (key: string) => {
    modalList.value[key]?.show();
  };
  const hide = (key: string) => modalList.value[key]?.hide();

  return { modalList, initModal, show, hide };
});
