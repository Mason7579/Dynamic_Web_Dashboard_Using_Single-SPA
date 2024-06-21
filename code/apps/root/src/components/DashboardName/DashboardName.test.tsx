import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import DashboardName from './DashboardName';
import { BrowserRouter } from 'react-router-dom';

test('dashboard name is updated correctly', async () => {
  render(
    <BrowserRouter>
      <DashboardName />
    </BrowserRouter>,
  );

  const input = screen.getByRole('textbox') as HTMLInputElement;
  fireEvent.change(input, { target: { value: 'Mock Dashboard' } });

  await waitFor(() => {
    expect(input.value).toBe('Mock Dashboard');
  });
});
