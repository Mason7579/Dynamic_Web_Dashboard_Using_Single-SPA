import { render, cleanup } from '@testing-library/svelte';
import DropDown from './DropDown.svelte';
import '@testing-library/jest-dom';

afterEach(cleanup);

test('renders App component', async () => {
  const { container, component } = render(DropDown);

  expect(container).toBeTruthy();
  component.$set({ liveData: false });
});
