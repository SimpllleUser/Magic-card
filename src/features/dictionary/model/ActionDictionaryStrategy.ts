import { EnitityAPI } from '@/shared/index/types';
import { Dictionary } from './types';

export const setActionsStrategy =
  (authState: boolean) =>
  async ({
    dictionary,
    localAction,
    cloudAction
  }: {
    dictionary: Dictionary | EnitityAPI<Dictionary>;
    localAction: Function;
    cloudAction: Function;
  }) => {
    if (!authState) {
      localAction(dictionary);
      return;
    }
    const cloudItem = await cloudAction(dictionary);
    localAction(cloudItem);
  };
