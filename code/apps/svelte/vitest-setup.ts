import '@testing-library/svelte/vitest';
import '@testing-library/jest-dom/vitest';
import 'vitest-canvas-mock';
import * as ResizeObserverModule from 'resize-observer-polyfill';

global.ResizeObserver = ResizeObserverModule.default;
