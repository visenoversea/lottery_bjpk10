import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const apiUrl='https://cryptfi2-super.facaige.dev/'

// https://vitejs.dev/config/
export default defineConfig({
  base:'./',
  // publicDir:'public',
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  build:{
    //outDir:'dist',
    assetsDir: 'super',
    // rollupOptions: {
    //   // https://rollupjs.org/guide/en/#outputmanualchunks
    //   output: {
    //     manualChunks: {
    //       // 'base': [
    //       //   './src/views/Home/IndexView.vue',
    //       //   './src/views/Refresh/IndexView.vue',
    //       //   './src/views/Layout/IndexView.vue',
    //       //   './src/views/Login/IndexView.vue',
    //       //   './src/views/All/IndexView.vue',
    //       // ]
    //     }
    //   }
    // }
  },
  server: {
    proxy: {
      //选项写法
      '/api': {
        target: apiUrl,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/upload': {
        target: apiUrl,
        changeOrigin: true
      },
      '/img': {
        target: apiUrl,
        changeOrigin: true
      },
      '/audio': {
        target: apiUrl,
        changeOrigin: true
      },
      // Proxying websockets or socket.io
      '/ws': {
        target: apiUrl,
        changeOrigin: true,
        ws: true
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/css/mixins.scss";`
      }
    }
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
