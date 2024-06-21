import '@testing-library/jest-dom';
import { WindowEvents, WindowEventService } from './StatusBarEventService';

const createMockListener = () => jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

it('should attach an event listener to the window object', () => {
  const mockListener = createMockListener();
  const spy = jest.spyOn(window, 'addEventListener');

  WindowEventService.subscribe(WindowEvents.STATUSBAR, mockListener);

  expect(spy).toHaveBeenCalledWith(WindowEvents.STATUSBAR, mockListener);
  spy.mockRestore();
});

it('should detach an event listener to the window object', () => {
  const mockListener = createMockListener();
  const spy = jest.spyOn(window, 'removeEventListener');

  WindowEventService.unsubscribe(WindowEvents.STATUSBAR, mockListener);

  expect(spy).toHaveBeenCalledWith(WindowEvents.STATUSBAR, mockListener);
  spy.mockRestore();
});

it('should dispatch a custom event', () => {
  const mockCustomEvent = new CustomEvent(WindowEvents.STATUSBAR);
  const spy = jest.spyOn(window, 'dispatchEvent');

  WindowEventService.fire(WindowEvents.STATUSBAR);

  expect(spy).toHaveBeenCalledWith(mockCustomEvent);
  spy.mockRestore();
});
