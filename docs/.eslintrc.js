module.exports = {
  extends: 'airbnb',
  env: {
    browser: true
  },
  plugins: [
    'babel',
    'sorting'
  ],
  settings: {
    'import/resolver': {
      webpack: 'webpack.config.babel.js'
    }
  },
  globals: {
    Prism: false // This is a library for highliting syntax that we are including in the script tag - will be replaced with a better module or be obsolete if we move to React-storybook
  },
  parser: 'babel-eslint',
  rules: {
    'arrow-body-style': ['error', 'as-needed'],
    'arrow-parens': ['error', 'as-needed'],
    'comma-dangle': ['error', 'never'],
    'max-len': 'off',
    'no-confusing-arrow': 'off',
    'no-param-reassign': ['error', {'props': false }],
    'no-prototype-builtins': 'off', // We don't yet create objects that don't extend from Object.prototype
    'object-curly-spacing': 'off', // Disabled in favour of babel/object-curly-spacing in order to avoid false positives with es6
    'quotes': ['error', 'single', {avoidEscape: true}],
    'space-before-function-paren': ['error', 'always'],
    'jsx-a11y/no-autofocus': 'off',
    'jsx-a11y/label-has-for': 'off',
    'jsx-a11y/anchor-is-valid': [
      "error", {
        "components": ["Link"],
        "specialLink": ["to"]
      }
    ],
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    // React rules
    'react/jsx-closing-bracket-location': ['error', 'after-props'],
    'react/self-closing-comp': ['error', {component: true, html: true}],
    'react/sort-prop-types': 'error',
    'react/forbid-prop-types': 'off',

    // Plugins
    'babel/object-curly-spacing': 'error',
    'import/order': ['error', {'newlines-between': 'always', groups: ['builtin', 'external', 'internal', 'sibling', 'parent', 'index']}],
    'import/no-named-default': 'off', // This does not work when trying to include text files; since every doc component index includes at least one text file, it is more convenient to disable this rule for now
    'sorting/sort-object-props': 'error'
  }
};
