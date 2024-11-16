import { Colors, Variants } from '@/core/models/enums';
import { Icons } from '@/core/models/icons';

export interface ConfirmModalContentMain {
  title: string;
  description?: string;
}

export interface BtnParams {
  color: Colors;
  variant: Variants;
  icon?: Icons;
}

export interface ConfirmModalButtons {
  cancelBtn: BtnParams;
  confirmBtn: BtnParams;
}

export type ConfirmModalContent<AddtionalType = ConfirmModalButtons> = ConfirmModalContentMain & AddtionalType;

export type Props = { id: string } & Partial<ConfirmModalContentMain>;

export type ModalParams = ConfirmModalContent<Partial<ConfirmModalButtons>>;
