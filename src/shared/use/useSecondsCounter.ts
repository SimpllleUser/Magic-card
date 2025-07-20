import { useIntervalFn } from '@vueuse/core';

interface UseSecondsCounterConfig {
  onStart?: (value: number) => void;
  onFinish?: (value: number) => void;
}

export function useSecondsCounter(initialSeconds = 0, { onStart, onFinish }: UseSecondsCounterConfig) {
  const SECOND = 1000;

  const intervalFn = useIntervalFn(countSeconds, SECOND);
  const seconds = ref<number>(initialSeconds);

  function countSeconds() {
    seconds.value++;
  }

  function resetSeconds() {
    seconds.value = 0;
  }

  function init() {
    intervalFn.pause();
    if (initialSeconds === 0) resetSeconds();
  }

  function start() {
    intervalFn.resume();
    onStart && onStart(seconds.value);
  }

  function finish() {
    intervalFn.pause();
    onFinish && onFinish(seconds.value);
    resetSeconds();
  }

  onBeforeMount(init);

  return {
    value: computed(() => seconds.value),
    start,
    finish
  };
}
