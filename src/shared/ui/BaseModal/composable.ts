import { useModalStore } from './store';

export const useModalState = (id: string): { state: Ref<boolean>; hide: CallableFunction; show: CallableFunction } => {
  const { initModal } = useModalStore();

  onMounted(() => initModal(id, { hide, show }));

  const state = ref(false);
  const show = () => {
    state.value = true;
  };
  const hide = () => {
    state.value = false;
  };

  return { state, show, hide };
};
