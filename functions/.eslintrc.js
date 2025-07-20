module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  ignorePatterns: ['lib/**/*', 'generated/**/*'],
  rules: {
    '@typescript-eslint/no-unused-expressions': 'error',
  },
};
