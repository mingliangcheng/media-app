import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import TransformPages from "uni-read-pages-vite";
import { resolve } from "path";
import eslintPlugin from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni(), eslintPlugin()],
  define: {
    ROUTES: new TransformPages().routes // 注入路由表
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src")
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: "@import '@/style/custom_theme.scss';@import \"nutui-uniapp/styles/variables.scss\";"
      }
    }
  },
  build: {
    rollupOptions: {
      external: []
    }
  }
});
