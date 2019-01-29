module.exports = {
  extends: "airbnb",
  parser: "babel-eslint",
  globals: {
    localStorage: true,
    window: true,
    navigator: true
  },
  rules: {
    "no-console": "off"
  }
};
