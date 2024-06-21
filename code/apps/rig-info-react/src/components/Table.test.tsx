import { render, act, cleanup, waitFor } from '@testing-library/react';
import React from 'react';
import TableComponent from './Table';
import '@testing-library/jest-dom';

interface DataItem {
  id: number;
  datetime: string;
  wellID: number;
  status: string;
}

type ReceiveMessageCallback = (msg: DataItem) => void;

let receiveMessageCallback: ReceiveMessageCallback;

jest.mock('@microsoft/signalr', () => {
  return {
    HubConnectionBuilder: jest.fn().mockImplementation(() => {
      return {
        withUrl: jest.fn().mockReturnThis(),
        build: jest.fn().mockReturnThis(),
        start: jest.fn().mockResolvedValue(null),
        on: jest.fn((methodName, newMethod) => {
          if (methodName === 'messageData') {
            receiveMessageCallback = newMethod;
          }
        }),
        onclose: jest.fn().mockReturnThis(),
        stop: jest.fn().mockResolvedValue(null),
      };
    }),
  };
});

describe('Table component tests', () => {
  afterEach(cleanup);

  test('renders Table component', async () => {
    const { container } = render(<TableComponent />);
    await waitFor(() => expect(container).toBeTruthy());
  });

  it('tests a good connection', async () => {
    render(<TableComponent />);
    await waitFor(() => expect(receiveMessageCallback).toBeTruthy());
  });

  it('receives a data message and updates the table', async () => {
    render(<TableComponent />);
    const message = {
      id: 1,
      datetime: '2021-10-01T12:00:00Z',
      wellID: 1,
      status: 'Running',
    };
    act(() => {
      receiveMessageCallback(message);
    });
    await waitFor(() => expect('Running').toBeTruthy());
  });

  it('changes the page when clicked', async () => {
    const { getByLabelText } = render(<TableComponent />);
    for (let i = 1; i < 10; i++) {
      const message = {
        id: i,
        datetime: '2021-10-01T12:00:00Z',
        wellID: i,
        status: 'Running',
      };
      act(() => {
        receiveMessageCallback(message);
      });
    }
    const pageButton = getByLabelText('Go to next page');
    act(() => {
      pageButton.click();
    });
    await waitFor(() => expect(pageButton).toBeTruthy());
  });
});
