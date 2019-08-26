const WorkboxPlugin = require('workbox-webpack-plugin');
const path = require('path');

module.exports = {
  productionSourceMap: false,

  configureWebpack: {
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.esm.js',
      },
    },

    plugins: [
      new WorkboxPlugin.InjectManifest({
        swSrc: path.join(__dirname, 'sw.js'),
      }),
    ],
  },

  lintOnSave: 'error',

  outputDir: '../facuService/assets',

  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:1337/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
};
