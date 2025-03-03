import { onMounted, ref, Ref } from 'vue';
import { ModalParams } from '../ConfirmModal/types';
import { useModalStore } from './store';

interface Actions {
  onShow?: (params?: ModalParams) => void;
}

export const useModalState = (
  id: string,
  actions?: Actions
): {
  state: Ref<boolean>;
  hide: CallableFunction;
  show: CallableFunction;
} => {
  const { initModal } = useModalStore();

  onMounted(() => initModal(id, { hide, show }));

  const state = ref(false);
  const show = (params: ModalParams) => {
    state.value = true;
    params && actions?.onShow && actions.onShow(params);
  };
  const hide = () => {
    state.value = false;
  };

  return { state, show, hide };
};
