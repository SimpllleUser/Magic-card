export interface ModalAction {
  show: CallableFunction;
  hide: CallableFunction;
}

export enum EmitActions {
  Show = 'show',
  Hide = 'hide'
}

export interface Emits {
  (event: EmitActions.Show): void;
  (event: EmitActions.Hide): void;
}

export interface Props {
  id: string;
  title: string;
  persistent?: boolean;
  noClickAnimation?: boolean;
  fullscreen?: boolean;
}
