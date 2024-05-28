import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Preview from 'vite-plugin-vue-component-preview';
import Markdown from 'unplugin-vue-markdown/vite'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Markdown({ /* options */ }),
    // Depending on your project setup you might want to call  Preview.default()
    Preview.default(),
    vue()
  ],
})
