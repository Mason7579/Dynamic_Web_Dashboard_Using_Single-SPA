import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import vitePluginSingleSpa from 'vite-plugin-single-spa';
import livereload from 'rollup-plugin-livereload';

const production = !process.env.ROLLUP_WATCH;

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
    svelte(),
    vitePluginSingleSpa({
      serverPort: 2424,
      spaEntryPoints: 'src/spa.ts',
    }),

    // Watch the `dist` directory and refresh the
    // browser on changes when not in production
    !production && livereload('dist'),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      include: ['src/**'],
      exclude: ['src/main.ts', 'src/spa.ts', 'src/vite-env.d.ts'],
    },
  },
});
