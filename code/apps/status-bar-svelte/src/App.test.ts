import { render, cleanup, screen, waitFor } from '@testing-library/svelte';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import App from './App.svelte';

interface StatusData {
  safetyIndex: number;
  safetyIndexUp: boolean;
}

type ReceiveMessageCallback = (statusData: StatusData) => void;

let receiveMessageCallback: ReceiveMessageCallback;

vi.mock('@microsoft/signalr', () => {
  return {
    HubConnectionBuilder: vi.fn().mockImplementation(() => {
      return {
        withUrl: vi.fn().mockReturnThis(),
        build: vi.fn().mockReturnThis(),
        start: vi.fn().mockResolvedValue(null),
        on: vi.fn((methodName, newMethod) => {
          if (methodName === 'ReceiveRandomNumber') {
            receiveMessageCallback = newMethod;
          }
        }),
        stop: vi.fn().mockResolvedValue(null),
      };
    }),
  };
});

afterEach(cleanup);

test('renders correctly', () => {
  render(App);

  expect(screen.getByText(/Safety Performance Index:/)).toBeInTheDocument();
});

test('getIcon returns UpArrow when isUp is true', async () => {
  render(App);

  receiveMessageCallback({
    safetyIndex: 5,
    safetyIndexUp: true,
  });

  await waitFor(() => {
    const upArrow = screen.getByLabelText('up-arrow');
    expect(upArrow).toBeTruthy();
  });
});
