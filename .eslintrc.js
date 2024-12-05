module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    "next/core-web-vitals", "next/typescript"
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off' // Disable this rule globally
  }
};
