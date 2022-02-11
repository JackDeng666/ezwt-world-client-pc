import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  open: true,
  base: '/ying-nav/',
  plugins: [
    vue()
  ],
  resolve: {
    extensions: ['.vue', '.js', '.json'],
    alias: {
      "@": "/src"
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/styles/variables.scss";`
      }
    }
  },
  server: {
    proxy: {} // 原本项目的后端接口代理
  }
})
