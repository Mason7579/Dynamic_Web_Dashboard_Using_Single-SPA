import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vitePluginSingleSpa from 'vite-plugin-single-spa';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        format: 'system',
        name: '',
      },
    },
    sourcemap: true,
    watch: {
      clearScreen: true,
    },
  },

  plugins: [
    vue({}),
    vitePluginSingleSpa({
      serverPort: 5151,
      spaEntryPoints: 'src/rig-overview-vue.ts',

      cssStrategy: 'singleMife',
    }),
  ],
});
