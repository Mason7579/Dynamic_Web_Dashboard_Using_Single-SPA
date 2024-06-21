import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Layout from './Layout';
import { MemoryRouter } from 'react-router-dom';

it('should toggle the side bar', async () => {
  render(
    <MemoryRouter>
      <Layout />
    </MemoryRouter>,
  );

  const sidebar = await screen.findByLabelText('sidebar-button');

  fireEvent.click(sidebar);

  expect(sidebar).toBeInTheDocument();
});
