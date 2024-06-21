import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { WidgetComponentProvider } from './LoadAppContext';
import { ClearDashboardProvider } from './ClearDashboardContext';
import { act } from 'react-dom/test-utils';
import ResizableLayout from '../Layout/ResizableLayout';

it('should load components based on URL query parameter', async () => {
  Object.defineProperty(window, 'location', {
    value: {
      pathname: '/',
      search: '?cols=2&rows1=2&rows2=2&w=1,2,3',
    },
    writable: true,
  });

  render(
    <MemoryRouter>
      <WidgetComponentProvider>
        <ClearDashboardProvider>
          <ResizableLayout />
        </ClearDashboardProvider>
      </WidgetComponentProvider>
    </MemoryRouter>,
  );
  const widget1 = await screen.findByText('Mock Oil Well Info');
  expect(widget1).toBeInTheDocument();

  act(() => {
    window.dispatchEvent(new Event('unloadOilWellChartSvelte'));
  });
});

it('should load components based on URL query parameter resizeable', async () => {
  render(
    <MemoryRouter
      initialEntries={['/resizable?cols=2&rows1=2&rows2=2&w=1,2,3']}
    >
      <WidgetComponentProvider>
        <ClearDashboardProvider>
          <ResizableLayout />
        </ClearDashboardProvider>
      </WidgetComponentProvider>
    </MemoryRouter>,
  );

  const widget1 = await screen.findByText('Mock Oil Well Info');

  expect(widget1).toBeInTheDocument();
});

it('should unload apps in resizable comps', async () => {
  Object.defineProperty(window, 'location', {
    value: {
      pathname: '/resizable',
      search: '?cols=2&w=1,2',
    },
    writable: true,
  });
  const { unmount } = render(
    <MemoryRouter initialEntries={['/resizable?cols=2&w=1,2']}>
      <WidgetComponentProvider>
        <ClearDashboardProvider>
          <ResizableLayout />
        </ClearDashboardProvider>
      </WidgetComponentProvider>
    </MemoryRouter>,
  );

  // screen.debug();

  const widget1 = await screen.findByText('Mock Oil Well Info');
  const widget2 = await screen.findByText('Mock Rig Status');

  expect(widget1).toBeInTheDocument();
  expect(widget2).toBeInTheDocument();

  act(() => {
    window.dispatchEvent(new Event('unloadRigInfoVue'));
    window.dispatchEvent(new Event('unloadEmployeeInfo'));
  });

  act(() => {
    unmount();
  });
});

it('calls unload when no widgets are loaded', async () => {
  Object.defineProperty(window, 'location', {
    value: {
      pathname: '/resizable',
      search: '?cols=2',
    },
    writable: true,
  });
  const { unmount } = render(
    <MemoryRouter initialEntries={['/resizable?cols=2']}>
      <WidgetComponentProvider>
        <ClearDashboardProvider>
          <ResizableLayout />
        </ClearDashboardProvider>
      </WidgetComponentProvider>
    </MemoryRouter>,
  );

  act(() => {
    window.dispatchEvent(new Event('unloadRigInfoVue'));
    window.dispatchEvent(new Event('unloadEmployeeInfo'));
  });

  act(() => {
    unmount();
  });
});

test('should render context without provider', () => {
  console.error = jest.fn();

  expect(() => render(<ResizableLayout />)).toThrow();
});
