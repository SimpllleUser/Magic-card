import { computed } from 'vue';
import { useBreakpoints } from '@vueuse/core';

export enum Breakpoints {
  Xs = 'xs',
  Sm = 'sm',
  Md = 'md',
  Lg = 'lg',
  Xl = 'xl'
}

export const breakpoints = useBreakpoints({
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1264,
  xl: 1904
});

export const literalBreakpoint = computed(() => {
  if (breakpoints.xl.value) return Breakpoints.Xl;
  if (breakpoints.lg.value) return Breakpoints.Lg;
  if (breakpoints.md.value) return Breakpoints.Md;
  if (breakpoints.sm.value) return Breakpoints.Sm;
  return Breakpoints.Xs;
});
