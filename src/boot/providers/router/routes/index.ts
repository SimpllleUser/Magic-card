import type { RouteRecordRaw } from 'vue-router';

import { route as routeMain } from './main';
import { route as quizePage } from './quize';

export const routes: readonly RouteRecordRaw[] = [routeMain, quizePage] as const;
