import { chunk } from 'lodash';

export function useChunkList<T>(list: T[], amount: number) {
  const actualChinkIndex = ref(0);
  const internalList = ref(chunk(list, amount));
  const actualChunk = computed({
    get: () => internalList.value[actualChinkIndex.value],
    set: (value) => {
      if (Array.isArray(value) && actualChinkIndex.value >= 0 && actualChinkIndex.value < internalList.value.length) {
        internalList.value[actualChinkIndex.value] = value;
      }
    }
  });
  return { fullList: internalList, chunkIndex: actualChinkIndex, actualChunk };
}
