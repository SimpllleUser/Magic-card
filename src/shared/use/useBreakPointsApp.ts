import { useBreakpoints } from '@vueuse/core';

type BreakPoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export function useBreakPointsApp() {
  const breakpoints = useBreakpoints({
    xs: 0, // < 600px (Small to large phone)
    sm: 600, // 600px > < 960px (Small to medium tablet)
    md: 960, // 960px > < 1280px (Large tablet to laptop)
    lg: 1280, // 1280px > < 1920px (Laptop to desktop)
    xl: 1920, // 1920px > < 2560px (1080p to 1440p desktop)
    xxl: 2560 // > 2560px (4k and ultra-wide)
  });

  const active = computed(() => {
    return breakpoints.active().value as BreakPoints;
  });

  const isActive = (breakPoint: BreakPoints) => {
    return active.value === breakPoint;
  };

  return {
    active,
    isActive
  };
}
