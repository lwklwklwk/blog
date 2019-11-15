const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : './',
  devServer: {
    hot: true
  },
  configureWebpack: config => {
    // if (process.env.NODE_ENV === 'production') {
    //   return {
    //     plugins: [
    //       new BundleAnalyzerPlugin()
    //     ],
    //     externals: {
    //       'vue': 'Vue',
    //       'vue-router': 'VueRouter',
    //       'vuex': 'Vuex',
    //       'axios': 'axios',
    //       'element-ui': 'ELEMENT'
    //     }
    //   }
    // }
    return {
      externals: {
        'vue': 'Vue',
        'vue-router': 'VueRouter',
        'vuex': 'Vuex',
        'axios': 'axios',
        'element-ui': 'ELEMENT'
      }
    }
  }

}
