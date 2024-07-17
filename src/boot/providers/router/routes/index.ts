import type { RouteRecordRaw } from 'vue-router';

import { route as routeMain } from './main';

export const routes: readonly RouteRecordRaw[] = [routeMain] as const;
