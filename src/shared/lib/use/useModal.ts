import { useModalStore } from 'src/shared/ui/VModal/model';

export function useModal(key: string) {
  const modal = useModalStore();

  return {
    hide: () => modal.hide(key),
    show: () => modal.show(key)
  };
}
