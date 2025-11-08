import { EntityAPI } from '@/shared';
import { Dictionary } from './types';

export const setActionsStrategy =
  (authState: boolean) =>
  async ({
    dictionary,
    localAction,
    cloudAction
  }: {
    dictionary: Dictionary | EntityAPI<Dictionary>;
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
