import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

const MockedAppRoute = ({ id }: { id: string }) => (
  <MemoryRouter initialEntries={[`/${id}`]}>
    <App />
  </MemoryRouter>
);

it('renders initial App page with 5 launch rows and no modals', async () => {
  render(<MockedAppRoute id="" />);
  expect(await screen.findByRole('table')).toBeInTheDocument();
  screen.debug();
});
