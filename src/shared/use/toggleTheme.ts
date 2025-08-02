import { useStorage } from '@vueuse/core/index';
import { useTheme } from 'vuetify';
import { Themes } from '@/core/models/enums';
import { computed } from 'vue';
import { Icons } from '@/core/models/icons';

export function useToggleTheme() {
  const themeConfig = useTheme();
  const theme = useStorage('theme', themeConfig.global.name.value);

  themeConfig.global.name.value = theme.value;

  const toggle = () => {
    const isDarkMode = themeConfig.global.current.value.dark;
    theme.value = isDarkMode ? Themes.Light : Themes.Dark;
    themeConfig.global.name.value = theme.value;
  };

  const themeIcon = computed(() => (theme.value === Themes.Light ? Icons.Moon : Icons.Sun));

  return {
    toggle,
    themeIcon
  };
}
