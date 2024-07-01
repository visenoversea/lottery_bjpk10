import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import postcsspxtoviewport from 'postcss-px-to-viewport'
// const url = 'https://www.vdemo16.xyz/'
const url = 'https://cryptfi2-api.facaige.dev/'
// https://vitejs.dev/config/
export default defineConfig({
  base: './', //开发或生产环境服务的公共基础路径 index.html 引用css js的方式

  // 项目中的静态资源文件夹名称
  // publicDir: 'public',

  // lintOnSave: false,
  css: {
    // postcss: {
    //   plugins: [
    //       postcsspxtoviewport({
    //         unitToConvert: 'px', // 要转化的单位
    //         viewportWidth: 375, // UI设计稿的宽度
    //         unitPrecision: 6, // 转换后的精度，即小数点位数
    //         propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
    //         viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
    //         fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
    //         // selectorBlackList: ['van-'], // 指定不转换为视窗单位的类名,例如van-（vantUI组件），
    //         minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
    //         mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
    //         replace: true, // 是否转换后直接更换属性值
    //         // exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配，最好不要排除node_modules 文件，排除后在项目中会发现字体不能跟随页面放大
    //         exclude: [],
    //         landscape: false // 是否处理横屏情况
    //       })
    //     ]
    //   },

    preprocessorOptions: {
      // 全局样式引入
      scss: {
        additionalData: `@import "./src/assets/css/mixins.scss";`,
        javascriptEnabled: true
      }
    }
  },

  server: {
    // host: '0.0.0.0', //ip地址
    // port: 8080,
		proxy: {
			'/api': { 
				target: url, // 接口域名
				changeOrigin: true, //是否跨域
        rewrite: (path) => path.replace(/^\/api/, '')
			},
			// '/img/': { 
			// 	target: url, // 接口域名
			// 	changeOrigin: true, //是否跨域
			// },
			'/upload/': { 
				target: url, // 接口域名
				changeOrigin: true, //是否跨域
			},
			'/ws': {
				target: url,
				changeOrigin: true,
				ws: true,
        // rewrite: (path) => path.replace(/^\/devws/, '/ws')
			},
		}
  },
  optimizeDeps: {
    exclude: ['buffer']
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
      // 'ethers$': 'ethers/dist/ethers.esm.js' //这个配置告诉Vite将ethers库的ES6模块映射到它的ESM构建中。
    }
  },

  build: {
    assetsDir: 'index', //默认值assets 生成静态资源的存放路径 各种js css
    // 替换webpack的魔法注释 webpackChunkName 分块加载
    rollupOptions: {
      // 打包的输出的html名字 改input就行了 index.html文件要改成相应的
      // input: 'app.html',
      // https://rollupjs.org/guide/en/#outputmanualchunks
      output: {
        manualChunks: {
          // 'main': [
          //   './src/views/login/Login.vue',
          //   './src/views/register/Register.vue',
          //   './src/views/mainview/MainView.vue',
          //   './src/views/market/Market.vue',
          //   './src/views/order/Order.vue',
          //   './src/views/orderdianwei/OrderDianWei.vue',
          //   './src/views/orderheyue/OrderHeYue.vue',
          //   './src/views/ordertime/OrderTime.vue',
          //   './src/views/chart/Chart.vue',
          //   './src/views/finance/Finance.vue',
          //   './src/views/mycenter/MyCenter.vue',
          // ],
        }
    }
  }
}
})
