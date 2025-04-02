import { Dictionary } from '../model/types';

export const useDictionaryComputed = (dictionaries: Ref<Dictionary[]>, userId: string) => {
  return userId
    ? dictionaries.value.filter((item) => item?.userId === userId)
    : dictionaries.value.filter((item) => !item?.userId);
};
