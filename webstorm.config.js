'use strict';
const path = require('path');

module.exports = {
  context: path.resolve(__dirname, './'),
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': path.resolve('src'),
      js: path.resolve('./src/js'),
      model: path.resolve('./src/js/model/'),
      components: path.resolve('./src/components/'),
      views: path.resolve('./src/views/')
    }
  }
};
