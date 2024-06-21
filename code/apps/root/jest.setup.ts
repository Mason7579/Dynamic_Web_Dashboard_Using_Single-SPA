// global.Request = function () { };

window.HTMLElement.prototype.hasPointerCapture = jest.fn();
Element.prototype.scrollIntoView = jest.fn();

global['Request'] = jest.fn().mockImplementation(() => ({
  signal: {
    removeEventListener: () => {},
    addEventListener: () => {},
  },
}));

import crypto from 'crypto';
import 'cross-fetch/polyfill';

Object.defineProperty(global, 'crypto', {
  value: {
    randomUUID: () => crypto.randomUUID(),
  },
});

// localStorage.setItem('theme', 'dark');

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(() => ({
    matches: false,
  })),
});
