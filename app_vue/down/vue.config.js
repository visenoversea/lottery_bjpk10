// const autoprefixer = require('autoprefixer');
// const pxtoviewport = require('postcss-px-to-viewport');
const url = 'https://www.vdemo7.xyz/'

module.exports = {
  publicPath: './',

  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  assetsDir: 'down',

  //打包后的index.html 名字
  indexPath: 'down.html',

  // 取消js map后缀
  productionSourceMap: false,

  //配置全局样式变量
  devServer: {
    proxy: {
      '/api': {
        target: url,
        changeOrigin: true, //是否跨域
        pathRewrite: {
          '^/api': '' //需要rewrite的,
        }
      },
      '/img': {
        target: url,
        changeOrigin: true, //是否跨域
      },
      '/upload': {
        target: url,
        changeOrigin: true, //是否跨域
      },
    }
  },

  // 去掉文件名中的 hash
  // filenameHashing: false,
  // 去掉打包后的hash值
  // chainWebpack: config => {
  //   if (process.env.NODE_ENV === 'production') {
  //     config.output.filename('js/app.js').end();
  //     config.output.chunkFilename('js/chunk.js').end();
  //     // 修改生产配置
  //     config.plugin('extract-css').tap(() => [{
  //         filename: `css/[name].css`,
  //         chunkFilename: `css/[name].css`
  //       }])
  //   }
  // }

  //全局变量
  // //svg配置
  // chainWebpack: config => {
  //   config.module
  //     .rule('svg-sprite')
  //     .use('svgo-loader')
  //     .loader('svgo-loader')
  // },
  // pluginOptions: {
  //   svgSprite: {
  //     dir: 'src/assets/icons',
  //     test: /\.(svg)(\?.*)?$/,
  //     loaderOptions: {
  //       extract: true,
  //       spriteFilename: 'down/img/icons.[hash:8].svg'
  //     },
  //     pluginOptions: {
  //       plainSprite: true
  //     }
  //   }
  // }
  css: {
    loaderOptions: {
      // postcss: {
      //   plugins: [
      //     autoprefixer(),
      //     pxtoviewport({
      //       viewportWidth: 375,
      //       selectorBlackList: ['ignore', '__KEFU__emoji-'],// 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
      //     })
      //   ]
      // },
      scss: {
        prependData: `@import "~@/assets/css/variables.scss";@import "~@/assets/css/mixins.scss";`
      }
    }
  }
}
