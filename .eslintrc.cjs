module.exports = {
  root: true,

  parserOptions: {
    parser: require.resolve('@typescript-eslint/parser'),
    ecmaVersion: 12,
    sourceType: "module",
    extraFileExtensions: [ '.vue' ]
  },

  env: {
    browser: true,
    es2021: true,
    node: true,
    'vue/setup-compiler-macros': true
  },

  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:vue/vue3-essential',
    'prettier'
  ],

  plugins: [
    '@typescript-eslint',
    'vue'

  ],

  globals: {
    ga: 'readonly', // Google Analytics
    cordova: 'readonly',
    __statics: 'readonly',
    __QUASAR_SSR__: 'readonly',
    __QUASAR_SSR_SERVER__: 'readonly',
    __QUASAR_SSR_CLIENT__: 'readonly',
    __QUASAR_SSR_PWA__: 'readonly',
    process: 'readonly',
    Capacitor: 'readonly',
    chrome: 'readonly'
  },

  rules: {

    'prefer-promise-reject-errors': 'off',

    quotes: ['warn', 'single', { avoidEscape: true }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'no-unused-vars': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "no-param-reassign": [
      "error",
      {
        props: true,
        ignorePropertyModificationsFor: ["state", "config"]
      }
    ],
    "no-shadow": "off",
    "prefer-destructuring": "off",
    "import/no-unresolved": "off",
    "import/extensions": "off",
    "import/no-absolute-path": "off",
    "import/no-extraneous-dependencies": "off",
  }
}
