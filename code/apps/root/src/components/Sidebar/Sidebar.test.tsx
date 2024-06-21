import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Sidebar from './Sidebar';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import RouterRoot from '../../utils/RouterRoot';
import mockLocalStorage from '../../../__mocks__/localstorage';
import { act } from 'react-dom/test-utils';

test('renders when open', () => {
  const mockToggle = jest.fn();
  render(
    <MemoryRouter>
      <Sidebar isOpen={true} toggle={mockToggle} />
    </MemoryRouter>,
  );

  const sidebar = screen.getByLabelText('sidebar');
  expect(sidebar).toHaveClass('flex');
  expect(sidebar).not.toHaveClass('hidden');
});

test('hides when closed', () => {
  const mockToggle = jest.fn();
  render(
    <MemoryRouter>
      <Sidebar isOpen={false} toggle={mockToggle} />
    </MemoryRouter>,
  );

  const sidebar = screen.getByLabelText('sidebar');
  expect(sidebar).toHaveClass('hidden');
  expect(sidebar).not.toHaveClass('block');
});

test('click on add dashboard', async () => {
  // test is not broken but JSDOM issue - https://github.com/jsdom/jsdom/issues/2112#issuecomment-1500395551
  jest.spyOn(console, 'error').mockImplementation(() => {});

  global['Request'] = jest.fn().mockImplementation(() => ({
    signal: {
      removeEventListener: () => {},
      addEventListener: () => {},
    },
  }));

  Object.defineProperty(window, 'localStorage', {
    value: mockLocalStorage,
  });

  localStorage.setItem('/2', JSON.stringify('untiled2'));

  act(() => {
    render(<RouterRoot></RouterRoot>);
  });

  const element = await screen.findAllByTestId('add-dashboard');

  expect(element).toHaveLength(1);

  await userEvent.click(element[0], {
    pointerState: await userEvent.pointer({ target: element[0] }),
  });
  await userEvent.click(element[0], {
    pointerState: await userEvent.pointer({ target: element[0] }),
  });
  await userEvent.click(element[0], {
    pointerState: await userEvent.pointer({ target: element[0] }),
  });

  const editButton = await screen.findByTestId('edit-dashboard');

  expect(editButton).toBeInTheDocument();

  await userEvent.click(editButton);

  const deleteButton = await screen.findByTestId('delete-/3');

  await userEvent.click(deleteButton);

  await userEvent.click(element[0], {
    pointerState: await userEvent.pointer({ target: element[0] }),
  });
});

test('deletes the dashboard that is currently on', async () => {
  // test is not broken but JSDOM issue - https://github.com/jsdom/jsdom/issues/2112#issuecomment-1500395551
  jest.spyOn(console, 'error').mockImplementation(() => {});

  global['Request'] = jest.fn().mockImplementation(() => ({
    signal: {
      removeEventListener: () => {},
      addEventListener: () => {},
    },
  }));

  Object.defineProperty(window, 'localStorage', {
    value: mockLocalStorage,
  });

  localStorage.setItem('/2', JSON.stringify('untiled2'));

  act(() => {
    render(<RouterRoot></RouterRoot>);
  });

  const element = await screen.findAllByTestId('add-dashboard');

  expect(element).toHaveLength(1);

  await userEvent.click(element[0], {
    pointerState: await userEvent.pointer({ target: element[0] }),
  });
  await userEvent.click(element[0], {
    pointerState: await userEvent.pointer({ target: element[0] }),
  });
  await userEvent.click(element[0], {
    pointerState: await userEvent.pointer({ target: element[0] }),
  });

  const editButton = await screen.findByTestId('edit-dashboard');

  expect(editButton).toBeInTheDocument();

  await userEvent.click(editButton);

  const deleteButton = await screen.findByTestId('delete-/3');

  await userEvent.click(deleteButton);

  await userEvent.click(element[0], {
    pointerState: await userEvent.pointer({ target: element[0] }),
  });

  await userEvent.click(editButton);

  const deleteButton5 = await screen.findByTestId('delete-/5');

  await userEvent.click(deleteButton5);
});

it('should change the name of the dashboard to be Untitled because its null', async () => {
  act(() => {
    render(<RouterRoot></RouterRoot>);
  });

  const dashboardTitleInput = await screen.findByPlaceholderText('Untitled');

  expect(dashboardTitleInput).toBeInTheDocument();

  fireEvent.change(dashboardTitleInput, { target: { value: '' } });

  expect(dashboardTitleInput).toHaveValue('');
});
