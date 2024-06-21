export interface IStatusBarEvent {
  widget: number;
  status: 'load' | 'unload' | 'clear';
}

export enum WindowEvents {
  STATUSBAR = 'statusbar',
}

export const WindowEventService = {
  fire: (event: WindowEvents, body?: CustomEventInit): void => {
    const customEvent = new CustomEvent(event, body);

    window.dispatchEvent(customEvent);
  },
  subscribe: (event: WindowEvents, listener: EventListener) => {
    window.addEventListener(event, listener);
  },
  unsubscribe: (event: WindowEvents, listener: EventListener) => {
    window.removeEventListener(event, listener);
  },
};
