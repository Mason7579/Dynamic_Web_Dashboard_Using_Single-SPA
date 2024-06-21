import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import RouterRoot from './RouterRoot';
import ClearDashboard from '../components/ClearDashboard/ClearDashboard';
import { WidgetComponentProvider } from './LoadAppContext';
import { ClearDashboardProvider } from './ClearDashboardContext';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import ResizableLayout from '../Layout/ResizableLayout';

test('Test adds widgets from url then remove with', async () => {
  render(<RouterRoot />);
  const clearDashbordButton = await screen.findByLabelText(
    'clear-dashboard-button',
  );
  expect(clearDashbordButton).toBeInTheDocument();

  userEvent.click(clearDashbordButton);
});

test('render clear dashboard without context provider', async () => {
  console.error = jest.fn();
  expect(() => render(<ClearDashboard />)).toThrow();
});

test('render app component and make sure there are widgets in url then remove', async () => {
  render(
    <MemoryRouter>
      <WidgetComponentProvider>
        <ClearDashboardProvider>
          <Navbar toggleSidebar={() => jest.fn()} />
          <ResizableLayout />
        </ClearDashboardProvider>
      </WidgetComponentProvider>
    </MemoryRouter>,
  );
  const clearDashbordButton = await screen.findByLabelText(
    'clear-dashboard-button',
  );
  expect(clearDashbordButton).toBeInTheDocument();

  await userEvent.click(clearDashbordButton);
});
