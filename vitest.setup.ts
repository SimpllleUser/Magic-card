import { config } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


export const vuetify = createVuetify({
  components,
  directives,
})

global.IntersectionObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
}


global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
}

config.global.plugins = [vuetify]


  /// Example of mocking store

  // vi.mock('@/stores/someStore', () => ({
  //   useSomeStore: () => ({
  //     someProperty: 'mocked-value', // Mock value
  //     someMethod: vi.fn(), // Mock method
  //   }),
  // }));
