import { defineStore } from 'pinia';
import { ref } from 'vue';

interface IActions {
  // eslint-disable-next-line @typescript-eslint/ban-types
  show: Function;
  // eslint-disable-next-line @typescript-eslint/ban-types
  hide: Function;
}

export const useModalStore = defineStore('modal', () => {
  const modalList = ref<Record<string, IActions>>({});
  const initModal = (key: string, actions: IActions) => {
    modalList.value[key] = actions;
  };

  const show = (key: string) => {
    modalList.value[key]?.show();
  };
  const hide = (key: string) => modalList.value[key]?.hide();

  return { modalList, initModal, show, hide };
});
