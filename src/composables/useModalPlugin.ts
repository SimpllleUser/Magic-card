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
    { title, message, html, onOk, onCancel }: IConfirmParams = {
      title: '',
      message: '',
      html: false,
      onOk: () => {
        /// empt
      },
      onCancel: () => {
        /// empt
      }
    }
  ) => {
    $q.dialog({
      title,
      message,
      html,
      cancel: {
        outline: true,
        color: 'secondary'
      },
      persistent: true,
      ok: {
        push: true,
        class: 'text-black',
        color: 'secondary'
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
