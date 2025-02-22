/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com
 */

// Styles
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

// Composables
import { createVuetify } from 'vuetify';

const myCustomThemes = {
  light: {
    dark: false,
    colors: {
      background: '#FFFFFF',
      surface: '#F2EFFE',
      'surface-bright': '#E4DEFE',
      'surface-light': '#CABDFC',
      'surface-variant': '#9E9E9E',
      'on-surface-variant': '#464646',
      primary: '#7A5AF8',
      'primary-darken-1': '#4D37A5',
      secondary: '#2E90FA',
      'secondary-darken-1': '#1C5696',
      accent: '#EE46BC',
      error: '#E54545',
      info: '#58A6FB',
      success: '#0F9918',
      warning: '#FF8800',
      grey: '#636363',
      'grey-light': '#818181',
      'grey-dark': '#282828',
      grey900: '#080808',
      grey800: '#101010',
      grey700: '#181818',
      grey600: '#202020',
      grey500: '#282828',
      grey400: '#464646',
      grey300: '#636363',
      grey200: '#818181',
      grey100: '#9E9E9E',
      grey50: '#ADADAD'
    },
    variables: {
      'border-color': '#ADADAD', // Gray 50
      'border-opacity': 0.15,
      'high-emphasis-opacity': 0.92,
      'medium-emphasis-opacity': 0.65,
      'disabled-opacity': 0.42,
      'idle-opacity': 0.06,
      'hover-opacity': 0.08,
      'focus-opacity': 0.18,
      'selected-opacity': 0.1,
      'activated-opacity': 0.16,
      'pressed-opacity': 0.22,
      'dragged-opacity': 0.12,
      'theme-kbd': '#282828', // Gray 500
      'theme-on-kbd': '#FFFFFF',
      'theme-code': '#E4DEFE', // Primary 100
      'theme-on-code': '#201452' // Primary 900
    }
  },
  dark: {
    dark: true,
    colors: {
      background: '#080808',
      surface: '#181818',
      'surface-bright': '#202020',
      'surface-light': '#282828',
      'surface-variant': '#636363',
      'on-surface-variant': '#9E9E9E',
      primary: '#4D37A5',
      'primary-darken-1': '#201452',
      secondary: '#1C5696',
      'secondary-darken-1': '#091D32',
      accent: '#932A74',
      error: '#892929',
      info: '#2573C8',
      success: '#0C7A13',
      warning: '#CC6D00',
      grey: '#464646',
      'grey-light': '#636363',
      'grey-dark': '#101010', //
      grey900: '#080808',
      grey800: '#101010',
      grey700: '#181818',
      grey600: '#202020',
      grey500: '#282828',
      grey400: '#464646',
      grey300: '#636363',
      grey200: '#818181',
      grey100: '#9E9E9E',
      grey50: '#ADADAD'
    },
    variables: {
      'border-color': '#464646',
      'border-opacity': 0.2,
      'high-emphasis-opacity': 0.9,
      'medium-emphasis-opacity': 0.7,
      'disabled-opacity': 0.4,
      'idle-opacity': 0.1,
      'hover-opacity': 0.1,
      'focus-opacity': 0.2,
      'selected-opacity': 0.15,
      'activated-opacity': 0.22,
      'pressed-opacity': 0.26,
      'dragged-opacity': 0.15,
      'theme-kbd': '#9E9E9E',
      'theme-on-kbd': '#080808',
      'theme-code': '#181818',
      'theme-on-code': '#F2EFFE'
    }
  }
};

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: myCustomThemes.light,
      dark: myCustomThemes.dark
    }
  }
});
