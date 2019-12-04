const path = require('path');

module.exports = {
  port: 9012,
  root: 'dist',
  stat: false,
  openBrowser: false,
  webpack: {
    console: false,
    publicPath: '/',
    output: {
      './index.html': {
        entry: './src/app'
      }
    },
    alias: {
      node_modules: './node_modules/',
      model: './src/js/model/',
      js: './src/js/',
      components: './src/components/',
      views: './src/views/'
    },
    global: {
      Utils: [path.resolve(__dirname, 'src/js/common/utils'), 'default'],
      Manba: 'manba',
      HeyUI: 'heyui',
      Model: 'js-model',
      G: 'hey-global',
      log: 'hey-log',
      R: [path.resolve(__dirname, 'src/js/common/request'), 'default']
    },
    devServer: {
      proxy: {
        // 此处应该配置为开发服务器的后台地址
        '/api': {
          target: 'http://localhost:8080',
          pathRewrite: {
            '^/api': ''
          }
        }
      },
      historyApiFallback: true
    },
    globalVars: './src/css/var.less',
    externals: {}
  },
  copy: ['static/images/*', 'call/*']
};
