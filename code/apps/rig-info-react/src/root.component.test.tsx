import { render, fireEvent } from '@testing-library/react';
import App from './root.component';
import '@testing-library/jest-dom';

jest.mock('@microsoft/signalr', () => {
  return {
    HubConnectionBuilder: jest.fn().mockImplementation(() => {
      return {
        withUrl: jest.fn().mockReturnThis(),
        build: jest.fn().mockReturnThis(),
        start: jest.fn().mockResolvedValue(null),
        on: jest.fn().mockReturnThis(),
        onclose: jest.fn().mockReturnThis(),
        stop: jest.fn().mockResolvedValue(null),
      };
    }),
  };
});

describe('App component tests', () => {
  test('renders App component', async () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });

  it('should click the unload button', async () => {
    const { getByTestId } = render(<App />);

    await fireEvent.click(getByTestId('unload-button'));

    expect(window.dispatchEvent).toBeTruthy();
  });
});
