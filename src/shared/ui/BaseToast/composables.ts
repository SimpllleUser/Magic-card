import { createApp } from 'vue';
import BaseToast from './BaseToast.vue';
import { Colors, Variants } from '@/core/models/enums';
import vuetify from '@/plugins/vuetify';

let containerApp: any = null;
let containerInstance: any = null;

export interface ToastOptions {
  title?: string;
  message: string;
  autoHideDelay?: number;
  color?: Colors;
  variatn?: Variants;
  location?: 'top left' | 'top right' | 'bottom left' | 'bottom right';
}

export interface ToastOptionsInternal extends ToastOptions {
  id: string;
  visible: boolean;
}

const generateId = () => Math.random().toString(36).substring(2, 10);

export const useToast = () => {
  const toast = (options: ToastOptions) => {
    if (!containerApp) {
      const container = document.createElement('div');
      document.body.appendChild(container);

      containerApp = createApp(BaseToast, {
        location: options.location || 'top right'
      });

      containerApp.use(vuetify);
      containerInstance = containerApp.mount(container);
    }

    const id = generateId();

    const toastData: ToastOptionsInternal = {
      ...options,
      id,
      visible: true
    };

    containerInstance.toasts.push(toastData);

    if (options.autoHideDelay && options.autoHideDelay > 0) {
      setTimeout(() => {
        toastData.visible = false;

        setTimeout(() => {
          containerInstance.toasts = containerInstance.toasts.filter((t: ToastOptionsInternal) => t.id !== id);
        }, 300);
      }, options.autoHideDelay);
    }
  };

  return { toast };
};
