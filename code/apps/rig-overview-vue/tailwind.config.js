/** @type {import('tailwindcss').Config} */
export default {
  content: ['src/**/*'],
  darkMode: ['class'],
  theme: {
    extend: {
      animation: {
        oneroa: 'oneroa  1s ease-in-out',
      },
      keyframes: {
        oneroa: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
};
