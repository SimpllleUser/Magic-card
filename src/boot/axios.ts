import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

const api = axios.create({ baseURL: 'https://api.example.com' });

export default boot(({ app }) => {
  const appConfig = app;
  appConfig.config.globalProperties.$axios = axios;
  appConfig.config.globalProperties.$api = api;
});
