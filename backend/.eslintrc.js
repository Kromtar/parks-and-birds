module.exports = {
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': 'warn',
  },
  parserOptions: {
    ecmaVersion: 6,
  },
  env: {
    node: true,
  },
}
