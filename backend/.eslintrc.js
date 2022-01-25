module.exports = {
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': 'warn',
  },
  parserOptions: {
    ecmaVersion: 2017,
  },
  env: {
    es6: true,
    node: true,
  },
}
