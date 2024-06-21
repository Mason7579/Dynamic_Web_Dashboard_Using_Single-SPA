import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DashboardNamesProvider } from './DashboardNamesContext';
import DashboardName from '../components/DashboardName/DashboardName';
import { BrowserRouter } from 'react-router-dom';

test('updates the dashboard name for a given path', async () => {
  render(
    <DashboardNamesProvider>
      <BrowserRouter>
        <DashboardName />
      </BrowserRouter>
    </DashboardNamesProvider>,
  );

  const input = screen.getByRole('textbox') as HTMLInputElement;
  fireEvent.change(input, { target: { value: 'Mock Dashboard' } });

  await waitFor(() => {
    expect(input.value).toBe('Mock Dashboard');
  });
});

test('it should load dashboard names from localStorage', async () => {
  localStorage.setItem('/', 'new dashboard name');

  render(
    <DashboardNamesProvider>
      <BrowserRouter>
        <DashboardName />
      </BrowserRouter>
    </DashboardNamesProvider>,
  );

  const input = screen.getByRole('textbox') as HTMLInputElement;
  fireEvent.change(input, { target: { value: 'Mock Dashboard' } });

  await waitFor(() => {
    expect(input.value).toBe('Mock Dashboard');
  });
});

test('it should load dashboard names from localStorage with null', async () => {
  localStorage.setItem('/', '');

  render(
    <DashboardNamesProvider>
      <BrowserRouter>
        <DashboardName />
      </BrowserRouter>
    </DashboardNamesProvider>,
  );

  const input = screen.getByRole('textbox') as HTMLInputElement;
  fireEvent.change(input, { target: { value: 'Mock Dashboard' } });

  await waitFor(() => {
    expect(input.value).toBe('Mock Dashboard');
  });
});
