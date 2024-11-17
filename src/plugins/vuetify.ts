/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
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
      background: '#F8FAFC',
      surface: '#FFFFFF',
      'surface-bright': '#F1F5F9',
      'surface-light': '#E2E8F0',
      'surface-variant': '#CBD5E1',
      'on-surface-variant': '#475569',
      primary: '#0EA5E9',
      'primary-darken-1': '#0284C7',
      secondary: '#10B981',
      'secondary-darken-1': '#059669',
      accent: '#A855F7',
      error: '#EF4444',
      info: '#3B82F6',
      success: '#22C55E',
      warning: '#F59E0B'
    },
    variables: {
      'border-color': '#94A3B8',
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
      'theme-kbd': '#1E293B',
      'theme-on-kbd': '#FFFFFF',
      'theme-code': '#F1F5F9',
      'theme-on-code': '#1E293B'
    }
  },
  dark: {
    dark: true,
    colors: {
      background: '#1E293B',
      surface: '#273447',
      'surface-bright': '#334155',
      'surface-light': '#4B5563',
      'surface-variant': '#6B7280',
      'on-surface-variant': '#D1D5DB',
      primary: '#38BDF8',
      'primary-darken-1': '#0284C7',
      secondary: '#34D399',
      'secondary-darken-1': '#10B981',
      accent: '#A855F7', // Тот же ярко-пурпурный акцентный цвет
      error: '#F87171',
      info: '#60A5FA',
      success: '#4ADE80',
      warning: '#FACC15'
    },
    variables: {
      'border-color': '#334155',
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
      'theme-kbd': '#E5E7EB',
      'theme-on-kbd': '#1E293B',
      'theme-code': '#1E293B',
      'theme-on-code': '#F8FAFC'
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
