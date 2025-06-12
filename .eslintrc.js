module.exports = {
  root: true,
  extends: ['@react-native', 'eslint:recommended', 'plugin:react/recommended'],
  rules: {
    'react/jsx-curly-spacing': ['error', 'never'],
    'react/jsx-indent': ['error', 2],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        jsxBracketSameLine: true,
      },
    ],
  },
};
