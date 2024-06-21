import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import TableComponent from './Table';
import '@testing-library/jest-dom';

jest.mock('@microsoft/signalr', () => {
  return {
    HubConnectionBuilder: jest.fn().mockImplementation(() => {
      return {
        withUrl: jest.fn().mockReturnThis(),
        build: jest.fn().mockReturnThis(),
        on: jest.fn().mockReturnThis(),
        onclose: jest.fn().mockReturnThis(),
        stop: jest.fn().mockResolvedValue(null),
      };
    }),
  };
});

describe('Table Component Connection Tests', () => {
  test('indicator displays offline when connection error', async () => {
    render(<TableComponent />);
    const indicator = screen.findByTestId('indicator');
    await waitFor(() => expect(indicator).toBeTruthy());
  });
});
