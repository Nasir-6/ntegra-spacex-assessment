import React from 'react';
import { render, screen } from '@testing-library/react';
// import { debug } from 'console';
import { Table } from '@mui/material';
import TableHeaders from './TableHeaders';

const MockTableHeaders = () => (
  <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
    <TableHeaders />
  </Table>
);

it('renders the correct headers', () => {
  render(<MockTableHeaders />);
  const headerRow = screen.getByTestId('header-row');
  expect(headerRow.childElementCount).toBe(4);
  expect(screen.getByText(/Name/i)).toBeInTheDocument();
  expect(screen.getByText(/Launch Date/i)).toBeInTheDocument();
  expect(screen.getByText(/Rocket ID/i)).toBeInTheDocument();
  expect(screen.getByText(/Details/i)).toBeInTheDocument();
});
