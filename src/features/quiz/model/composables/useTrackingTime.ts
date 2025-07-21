import { useSecondsCounter } from '@/shared/use/useSecondsCounter';

export function useTrackingTime() {
  const actualId = ref('');
  let secondsPerId = new Map<string, number>([]);

  const toFixTimePerQuestion = (value: number) => {
    const prevValue = secondsPerId.get(actualId.value) || 0;
    secondsPerId.set(actualId.value, prevValue + value);
  };

  const { value, finish, start } = useSecondsCounter(0, {
    onStart: toFixTimePerQuestion,
    onFinish: toFixTimePerQuestion
  });

  const initTime = (id: string) => {
    actualId.value = id;
    start();
  };

  const changeRecordingItem = (id: string) => {
    finish();
    actualId.value = id;
    start();
  };

  function getResult(): Map<string, number> {
    return secondsPerId;
  }

  function reset() {
    finish();
    secondsPerId = new Map<string, number>([]);
  }

  watch(
    () => value.value,
    (value) => {
      secondsPerId.set(actualId.value, value);
    }
  );

  return {
    value,
    initTime,
    changeRecordingItem,
    getResult,
    reset
  };
}
