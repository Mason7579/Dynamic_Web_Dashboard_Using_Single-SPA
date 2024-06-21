export default {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts'],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/parcels',
    'dk-react-ui.tsx',
    '<rootDir>/src/shadcn-components',
  ],
  testEnvironment: 'jsdom',
  watchPlugins: ['jest-watch-typeahead/filename'],
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.ts',
    '<rootDir>/jest.mocks.js',
    '<rootDir>/__mocks__/localstorage.ts',
  ],
};
