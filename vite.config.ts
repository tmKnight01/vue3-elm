import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve:{
    alias: {
      "@": path.resolve(__dirname,'./src')
    }
  },
  css:{
        /* CSS 预处理器 */
        preprocessorOptions: {
          scss: {
            additionalData: ''
          }
        }
  },
  envDir:'env',
  server:{
    port:5173,
    proxy:{
      "/api":{
        target:'http://192.168.0.83:3000/',
        changeOrigin:true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      }
    }
  }

  
})

