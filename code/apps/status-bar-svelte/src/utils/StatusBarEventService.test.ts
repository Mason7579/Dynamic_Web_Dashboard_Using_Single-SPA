import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { WindowEvents, WindowEventService } from './StatusBarEventService';

const createMockListener = () => vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
});

it('should attach an event listener to the window object', () => {
  const mockListener = createMockListener();
  const spy = vi.spyOn(window, 'addEventListener');

  WindowEventService.subscribe(WindowEvents.STATUSBAR, mockListener);

  expect(spy).toHaveBeenCalledWith(WindowEvents.STATUSBAR, mockListener);
  spy.mockRestore();
});

it('should detach an event listener to the window object', () => {
  const mockListener = createMockListener();
  const spy = vi.spyOn(window, 'removeEventListener');

  WindowEventService.unsubscribe(WindowEvents.STATUSBAR, mockListener);

  expect(spy).toHaveBeenCalledWith(WindowEvents.STATUSBAR, mockListener);
  spy.mockRestore();
});

it('should dispatch a custom event', () => {
  const mockCustomEvent = new CustomEvent(WindowEvents.STATUSBAR);
  const spy = vi.spyOn(window, 'dispatchEvent');

  WindowEventService.fire(WindowEvents.STATUSBAR);

  expect(spy).toHaveBeenCalledWith(mockCustomEvent);
  spy.mockRestore();
});
