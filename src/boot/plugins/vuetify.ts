import Vue from 'vue';
import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Імпорт стилів Vuetify
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Створюємо інстанс Vuetify
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
    }
  }
});

export default vuetify;
