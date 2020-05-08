const path = require('path');

// Prepend all files with Sass entry point
module.exports = {
  // data: '@import "./src/styles/main.scss";',
  // data: `@import "${path.resolve(__dirname, './src/styles/main.scss')}";`,
  data: `@import "${path.resolve(__dirname, './src/styles/prepend.scss')}";`,
};
