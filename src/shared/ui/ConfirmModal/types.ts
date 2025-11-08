import { Colors, Icons, Variants } from '@/core';

export interface ConfirmModalContentMain {
  title: string;
  description?: string;
  type?: Colors;
  onConfirm?: CallableFunction;
  icon?: Icons | string;
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
