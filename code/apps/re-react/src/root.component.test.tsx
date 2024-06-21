import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Root from './root.component';
import '@testing-library/jest-dom';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { act } from 'react-dom/test-utils';
HTMLCanvasElement.prototype.getContext = jest.fn();
jest.mock('@microsoft/signalr', () => {
  const onMethodHandlers = {};

  const mockHubConnection = {
    start: jest.fn(() => new Promise((resolve) => setTimeout(resolve, 100))),
    stop: jest.fn(() => new Promise((resolve) => setTimeout(resolve, 100))),
    on: jest.fn((methodName, newHandler) => {
      onMethodHandlers[methodName] = newHandler;
    }),
    off: jest.fn(),
    onclose: jest.fn((handler) => {
      onMethodHandlers['onclose'] = handler;
    }),
    invoke: jest.fn(() => {
      return new Promise(() => {
        setTimeout(() => {
          mockHubConnection.simulateReceiveNumber(10);
        }, 100);
        setTimeout(() => mockHubConnection.simulateReceiveNumber(20), 200);
        setTimeout(() => mockHubConnection.simulateReceiveNumber(30), 300);
      });
    }),
    simulateReceiveNumber: (number) => {
      if (onMethodHandlers['ReceiveNumber']) {
        onMethodHandlers['ReceiveNumber'](number);
      }
    },
  };

  return {
    HubConnectionBuilder: jest.fn().mockImplementation(() => ({
      withUrl: jest.fn().mockReturnThis(),
      withAutomaticReconnect: jest.fn().mockReturnThis(),
      build: jest.fn(() => mockHubConnection),
    })),
  };
});
jest.mock('./BarChartComponent', () => {
  return ({ data, options }) => (
    <div
      data-testid="mockBarChart"
      data-props={JSON.stringify({ data, options })}
    ></div>
  );
});

describe('Root Component', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    render(<Root />);
  });

  it('renders with default title', () => {
    expect(screen.getByText('Drilling Data')).toBeInTheDocument();
  });

  it('toggles connection status on button click', async () => {
    const toggleButton = await screen.findByRole('button', { name: /stop/i });

    await act(async () => {
      fireEvent.click(toggleButton);
      await new Promise((resolve) => setTimeout(resolve, 100));
    });
    expect(toggleButton).toHaveTextContent('Start');

    await act(async () => {
      fireEvent.click(toggleButton);
      await new Promise((resolve) => setTimeout(resolve, 100));
    });
    expect(toggleButton).toHaveTextContent('Stop');
  });

  it('establishes a SignalR connection on component mount', () => {
    expect(HubConnectionBuilder).toHaveBeenCalled();
  });

  it('passes the correct data to BarChart', async () => {
    const barChartMock = screen.getByTestId('mockBarChart');
    const props = JSON.parse(barChartMock.getAttribute('data-props'));

    expect(props.data).toBeDefined();
  });
});
describe('Unload Widget Button', () => {
  let originalDispatchEvent;

  beforeEach(() => {
    originalDispatchEvent = window.dispatchEvent;
    window.dispatchEvent = jest.fn();

    render(<Root />);
  });

  it('dispatches the unload event on button click', () => {
    const unloadButton = screen.getByRole('button', {
      name: 'Unload Component',
    });

    fireEvent.click(unloadButton);

    expect(window.dispatchEvent).toHaveBeenCalledWith(expect.any(Event));
    expect(window.dispatchEvent).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    window.dispatchEvent = originalDispatchEvent;
  });
});
