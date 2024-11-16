import { useModalStore } from './store';

export const useModalState = (id: string): { state: Ref<boolean>; hide: CallableFunction; show: CallableFunction } => {
  const { initModal } = useModalStore();

  onMounted(() => initModal(id, { hide, show }));

  const state = ref(false);
  const show = () => {
    /// TODO add set params and callback on show and hide, set callback on show in useModal argument

    state.value = true;
  };
  const hide = () => {
    state.value = false;
  };

  return { state, show, hide };
};
