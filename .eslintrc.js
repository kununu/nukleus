module.exports = {
  extends: 'airbnb',
  env: {
    browser: true,
    jest: true
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
  parser: 'babel-eslint',
  rules: {
    'arrow-body-style': ['error', 'as-needed'],
    'arrow-parens': ['error', 'as-needed'],
    'comma-dangle': ['error', 'never'],
    'max-len': 'off',
    'no-confusing-arrow': 'off',
    'no-param-reassign': ['error', {'props': false }],
    'no-prototype-builtins': 'off', // We don't yet create objects that don't extend from Object.prototype
    'no-return-assign': 'off', // We need this when using refs, this was removed from create-react-apps linting here: https://github.com/facebookincubator/create-react-app/issues/528
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
    // React rules
    'react/jsx-closing-bracket-location': ['error', 'after-props'],
    'react/self-closing-comp': ['error', {component: true, html: true}],
    'react/sort-prop-types': 'error',
    'react/forbid-prop-types': 'off',
    'react/no-array-index-key': 0,
    "react/jsx-filename-extension": 'off',

    // Plugins
    'babel/object-curly-spacing': 'error',
    'import/order': ['error', {'newlines-between': 'always', groups: ['builtin', 'external', 'internal', 'sibling', 'parent', 'index']}],
    'import/no-extraneous-dependencies': [
      'error', {
        'devDependencies': [
          '.storybook/**',
          'src/components/**',
          'stories/**',
          'jestSetup.js',
          '**/*.test.jsx'
        ]
      }
    ],
    "import/extensions": 'off',
    "import/no-unresolved": 'off',
    'sorting/sort-object-props': 'error'
  }
};
