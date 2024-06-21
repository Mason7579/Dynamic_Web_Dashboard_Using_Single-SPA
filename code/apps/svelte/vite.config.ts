import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import vitePluginSingleSpa from 'vite-plugin-single-spa';
import livereload from 'rollup-plugin-livereload';

const production = !process.env.ROLLUP_WATCH;

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
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
    svelte({
      emitCss: true,
    }),
    vitePluginSingleSpa({
      serverPort: 4141,
      spaEntryPoints: 'src/svelte-app.ts',
      cssStrategy: 'singleMife',
    }),

    // Watch the `dist` directory and refresh the
    // browser on changes when not in production
    !production && livereload('dist'),
  ],

  resolve: {
    conditions: mode === 'test' ? ['browser'] : [],
  },

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest-setup.ts'],
    alias: [{ find: /^svelte$/, replacement: 'svelte/internal' }],
    coverage: {
      include: ['src/**'],
      exclude: [
        'src/main.ts',
        'src/svelte-app.ts',
        'src/vite-env.d.ts',
        'src/getApiUrl.ts',
      ],
    },
  },
}));
