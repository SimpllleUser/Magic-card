import { useModalStore } from 'stores/modal';

export function useModal(key: string) {
  const modal = useModalStore();

  return {
    hide: () => modal.hide(key),
    show: () => modal.show(key)
  };
}
