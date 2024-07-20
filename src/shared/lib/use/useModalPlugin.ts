import { useQuasar } from 'quasar';

interface IConfirmParams {
  title: string;
  message?: string;
  html?: boolean;
  onOk?: CallableFunction;
  onCancel?: CallableFunction;
}
export function useModalPlugin() {
  const $q = useQuasar();
  const confirm = (
    { title, message, onOk, html, onCancel }: IConfirmParams = {
      title: '',
      message: '',
      html: true,
      onOk: () => {
        /// empt
      },
      onCancel: () => {
        /// empt
      }
    }
  ) => {
    const CONFIRM_PARAMS = {
      message: message ? `<div class="dialog-plugin q-pa-sm">${message}</div>` : ''
    };

    $q.dialog({
      title: `<div class="dialog-plugin bg-secondary text-dark q-pa-sm">${title}</div>`,
      ...CONFIRM_PARAMS,
      html: true,
      cancel: {
        flat: true,
        color: 'primary'
      },
      persistent: true,
      ok: {
        color: 'primary'
      }
    })
      .onOk(() => {
        onOk && onOk();
      })
      .onDismiss(() => {
        onCancel && onCancel();
      });
  };

  return { confirm };
}
