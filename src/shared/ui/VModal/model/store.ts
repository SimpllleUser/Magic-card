import { Ref, ref } from 'vue';
import { useModalStore } from 'stores/modal';

interface useVModal {
  state: Ref<boolean>;
  show: CallableFunction;
  hide: CallableFunction;
  init: (id: string) => void;
}

export function useVModal(emit: CallableFunction) {
  const state = ref(false);
  const { initModal } = useModalStore();

  const show = () => {
    state.value = true;
    emit('show');
  };
  const hide = () => {
    state.value = false;
    emit('hide');
  };

  const init = (id: string) => {
    initModal(id, { show, hide });
  };

  return {
    state,
    show,
    hide,
    init
  };
}
