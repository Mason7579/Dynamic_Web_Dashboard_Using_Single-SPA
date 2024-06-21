import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from './Navbar';
import { BrowserRouter } from 'react-router-dom';
import { WidgetComponentProvider } from '../../utils/LoadAppContext';
import { ClearDashboardProvider } from '../../utils/ClearDashboardContext';

test('renders correctly', () => {
  localStorage.setItem('layout-resizable', JSON.stringify('?cols=1'));
  const mockToggleSidebar = jest.fn();
  render(
    <BrowserRouter>
      <WidgetComponentProvider>
        <ClearDashboardProvider>
          <Navbar toggleSidebar={mockToggleSidebar} />
        </ClearDashboardProvider>
      </WidgetComponentProvider>
    </BrowserRouter>,
  );

  const button = screen.getByLabelText('sidebar-button');
  expect(button).toBeInTheDocument();

  fireEvent.click(button);
  expect(mockToggleSidebar).toHaveBeenCalledTimes(1);
});

Object.defineProperty(window, 'location', {
  value: {
    pathname: '/resizable',
  },
  writable: true,
});

test('renders correctly with resizable widget select when pathname is /resizable', () => {
  const mockToggleSidebar = jest.fn();
  localStorage.setItem('layout-resizable', JSON.stringify('?cols=1'));
  render(
    <BrowserRouter>
      <WidgetComponentProvider>
        <ClearDashboardProvider>
          <Navbar toggleSidebar={mockToggleSidebar} />
        </ClearDashboardProvider>
      </WidgetComponentProvider>
    </BrowserRouter>,
  );

  const resizableWidgetSelect = screen.getByTestId('resizable-layout-select');
  expect(resizableWidgetSelect).toBeInTheDocument();
});
