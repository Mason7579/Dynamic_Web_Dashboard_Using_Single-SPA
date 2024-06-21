import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      include: ['src/**'],
      exclude: [
        'src/main.ts',
        'src/rig-overview-vue.ts',
        'src/vite-env.d.ts',
        'src/getApiUrl.ts',
      ],
    },
  },
});
