module.exports = {
  plugins: ['react'],
  extends: [
    'next',
    'plugin:react-hooks/recommended',
    'eslint:recommended',
    'plugin:react/recommended',
    'prettier',
  ],
  rules: {
    'react/prop-types': 0,
  },
};
