import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import ResizableLayout from './ResizableLayout';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { WidgetComponentProvider } from '../utils/LoadAppContext';
import userEvent from '@testing-library/user-event';
import { ClearDashboardProvider } from '../utils/ClearDashboardContext';

test('Tests the render of resizable layout', () => {
  render(
    <BrowserRouter>
      <WidgetComponentProvider>
        <ClearDashboardProvider>
          <ResizableLayout />
        </ClearDashboardProvider>
      </WidgetComponentProvider>
    </BrowserRouter>,
  );

  const handle = screen.getByTestId('resizableLayout');
  expect(handle).toBeInTheDocument();
});

test('resizable layout with handle', async () => {
  Object.defineProperty(window, 'location', {
    value: {
      pathname: '/resizable',
      search: '?cols=2,2',
    },
    writable: true,
  });

  // @ts-expect-error - only need to have ok value in fetch return
  global.fetch = jest.fn((url) => {
    if (url === 'http://localhost:5151/rig-overview-vue.js') {
      return Promise.resolve({ ok: false });
    }

    if (url === 'http://localhost:4141/svelte-app.js') {
      return Promise.reject('something went wrong');
    }

    return Promise.resolve({ ok: true });
  });

  const oldEnv = process.env;

  process.env = { ...oldEnv, NODE_ENV: 'development' };
  render(
    <MemoryRouter initialEntries={['/resizable?cols=2,2']}>
      <WidgetComponentProvider>
        <ClearDashboardProvider>
          <ResizableLayout />
        </ClearDashboardProvider>
      </WidgetComponentProvider>
    </MemoryRouter>,
  );

  const element = await screen.findAllByTestId('widget-select');
  await act(async () => {
    await userEvent.click(element[0], {
      pointerState: await userEvent.pointer({ target: element[0] }),
    });
  });

  const option = screen.getAllByTestId('widget-select-item')[0];
  await act(async () => {
    await userEvent.click(option);
  });

  const handle = screen.getByTestId('resizableLayout');
  expect(handle).toBeInTheDocument();
});

test('should have w items in url', async () => {
  Object.defineProperty(window, 'location', {
    value: {
      pathname: '/resizable',
      search: '?cols=2,2&w=2',
    },
    writable: true,
  });
  render(
    <MemoryRouter initialEntries={['/resizable?cols=2,2&w=2']}>
      <WidgetComponentProvider>
        <ClearDashboardProvider>
          <ResizableLayout />
        </ClearDashboardProvider>
      </WidgetComponentProvider>
    </MemoryRouter>,
  );

  const element = await screen.findAllByTestId('widget-select');
  await act(async () => {
    await userEvent.click(element[0], {
      pointerState: await userEvent.pointer({ target: element[0] }),
    });
  });

  const option = screen.getAllByTestId('widget-select-item')[0];

  await act(async () => {
    await userEvent.click(option);
  });

  const handle = screen.getByTestId('resizableLayout');
  expect(handle).toBeInTheDocument();
});

test('should fetch a unavailable widget', async () => {
  // @ts-expect-error - only need to have ok value in fetch return
  global.fetch = jest.fn(() => Promise.resolve({ ok: false }));

  const oldEnv = process.env;

  process.env = { ...oldEnv, NODE_ENV: 'production' };

  render(
    <MemoryRouter initialEntries={['/resizable?cols=2,2&w=2']}>
      <WidgetComponentProvider>
        <ClearDashboardProvider>
          <ResizableLayout />
        </ClearDashboardProvider>
      </WidgetComponentProvider>
    </MemoryRouter>,
  );

  const element = await screen.findAllByTestId('widget-select');

  await act(async () => {
    await userEvent.click(element[0], {
      pointerState: await userEvent.pointer({ target: element[0] }),
    });
  });
});
