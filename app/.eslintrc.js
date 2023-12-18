module.exports = {
  plugins: ["react"],
  extends: [
    "next",
    "plugin:react-hooks/recommended",
    "eslint:recommended",
    "plugin:react/recommended",
  ],
  rules: {
    "react/prop-types": 0,
  },
};
