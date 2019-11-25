module.exports = {
  extends: [
    'standard',
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    'node',
    '@typescript-eslint',
  ],
  env: {
    'jest': true,
  },
  rules: {
    'indent': ['error', 2, {
      'MemberExpression': 'off',
    }],
    'node/no-extraneous-require': ['error'],
    'comma-dangle': ['error', 'always-multiline'],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
  },
}
