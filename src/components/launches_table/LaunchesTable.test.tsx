import React, { PropsWithChildren } from 'react';
import { render, screen } from '@testing-library/react';
// import { debug } from 'console';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import userEvent from '@testing-library/user-event';
import LaunchesTable from './LaunchesTable';

const wrapper = ({ children }: PropsWithChildren) => {
  const queryClient = new QueryClient();
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </BrowserRouter>
  );
};

describe('LaunchTable rendering', () => {
  it('should render the Launch Table correctly', async () => {
    render(<LaunchesTable />, { wrapper });
    expect(await screen.findByRole('table')).toBeInTheDocument();

    const headerRow = screen.getByTestId(`header-row`);
    expect(headerRow.childElementCount).toBe(4);
    const launchRows = screen.getAllByTestId(/launch-row-/i);
    expect(launchRows.length).toBe(5);
    expect(screen.getByText(/Rows per page:/i)).toBeInTheDocument();
  });
});

describe('LaunchTable pagination', () => {
  it('should display launches 6-10 when clicking on next page button', async () => {
    render(<LaunchesTable />, { wrapper });
    expect(await screen.findByRole('table')).toBeInTheDocument();
    const nextPageBtn = screen.getByRole('button', { name: 'Go to next page' });
    userEvent.click(nextPageBtn);

    // No NEED TO USE wait for elementToBeRemoved or act - https://github.com/testing-library/user-event/discussions/906 - use override in package.json to use same @testing-library/dom version!
    expect(screen.getByText(/CRS-26/i)).toBeInTheDocument();
    expect(screen.queryByText(/FalconSat/i)).toBeNull();
    const launchRows = screen.getAllByTestId(/launch-row-/i);
    expect(launchRows.length).toBe(5);
    // screen.debug();
    // const pagination = screen.getByTestId('pagination');
    // screen.debug(pagination);
  });

  it('should display launch 11 with empty rows when clicking on next page button twice', async () => {
    render(<LaunchesTable />, { wrapper });
    expect(await screen.findByRole('table')).toBeInTheDocument();

    const nextPageBtn = screen.getByRole('button', { name: 'Go to next page' });
    userEvent.click(nextPageBtn);

    expect(screen.getByText(/CRS-26/i)).toBeInTheDocument();
    expect(screen.queryByText(/FalconSat/i)).toBeNull();

    userEvent.click(nextPageBtn);
    expect(await screen.findByText(/Transporter-6/i)).toBeInTheDocument();
    expect(screen.queryByText(/FalconSat/i)).toBeNull();
    expect(screen.queryByText(/CRS-26/i)).toBeNull();
    const launchRows = screen.getAllByTestId(/launch-row-/i);
    expect(launchRows.length).toBe(1);
    expect(screen.getByTestId(/empty-rows/i)).toBeInTheDocument();
  });

  it('should display launches 1-5 again when clicking on next page then previous', async () => {
    render(<LaunchesTable />, { wrapper });
    expect(await screen.findByRole('table')).toBeInTheDocument();

    const nextPageBtn = screen.getByRole('button', { name: 'Go to next page' });
    userEvent.click(nextPageBtn);
    expect(screen.getByText(/CRS-26/i)).toBeInTheDocument();
    expect(screen.queryByText(/FalconSat/i)).toBeNull();

    const prevPageBtn = screen.getByRole('button', { name: 'Go to previous page' });
    userEvent.click(prevPageBtn);
    expect(screen.getByText(/FalconSat/i)).toBeInTheDocument();
    expect(screen.queryByText(/CRS-26/i)).toBeNull();

    const launchRows = screen.getAllByTestId(/launch-row-/i);
    expect(launchRows.length).toBe(5);
  });

  it('should display launches 1-10 when changing rows per page to 10', async () => {
    render(<LaunchesTable />, { wrapper });
    expect(await screen.findByRole('table')).toBeInTheDocument();

    expect(screen.getByText(/FalconSat/i)).toBeInTheDocument();
    expect(screen.queryByText(/CRS-26/i)).toBeNull();

    // userEvent.click(screen.getByRole('button', { name: 'Rows per page: 5' }));
    const rowsPerPageInputBtn = screen.getByRole('button', { name: 'Rows per page: 5' });
    userEvent.click(rowsPerPageInputBtn);
    const option10PerPage = screen.getByRole('option', { name: '10' });
    userEvent.click(option10PerPage);

    expect(await screen.findByText(/CRS-26/i)).toBeInTheDocument();
    expect(screen.getByText(/FalconSat/i)).toBeInTheDocument();

    const launchRows = screen.getAllByTestId(/launch-row-/i);
    expect(launchRows.length).toBe(10);
  });

  it('should display launches 11 with empty rows when changing rows per page to 10 and clicking next page', async () => {
    render(<LaunchesTable />, { wrapper });
    expect(await screen.findByRole('table')).toBeInTheDocument();

    expect(screen.getByText(/FalconSat/i)).toBeInTheDocument();

    const rowsPerPageInputBtn = screen.getByRole('button', { name: 'Rows per page: 5' });
    userEvent.click(rowsPerPageInputBtn);
    const option10PerPage = screen.getByRole('option', { name: '10' });
    userEvent.click(option10PerPage);

    expect(await screen.findByText(/CRS-26/i)).toBeInTheDocument();

    const nextPageBtn = screen.getByRole('button', { name: 'Go to next page' });
    userEvent.click(nextPageBtn);
    expect(screen.queryByText(/CRS-26/i)).toBeNull();
    expect(screen.queryByText(/FalconSat/i)).toBeNull();

    expect(screen.getByText(/Transporter-6/i)).toBeInTheDocument();
    const launchRows = screen.getAllByTestId(/launch-row-/i);
    expect(launchRows.length).toBe(1);
    expect(screen.getByTestId(/empty-rows/i)).toBeInTheDocument();
  });

  it('should reset to page 1 showing launches 1-10 when changing rows per page to 10 whilst on page 3', async () => {
    render(<LaunchesTable />, { wrapper });
    expect(await screen.findByRole('table')).toBeInTheDocument();

    expect(screen.getByText(/FalconSat/i)).toBeInTheDocument();

    const nextPageBtn = screen.getByRole('button', { name: 'Go to next page' });
    userEvent.click(nextPageBtn);
    expect(screen.getByText(/CRS-26/i)).toBeInTheDocument();
    expect(screen.queryByText(/FalconSat/i)).toBeNull();

    userEvent.click(nextPageBtn);
    expect(screen.getByText(/Transporter-6/i)).toBeInTheDocument();
    expect(screen.queryByText(/FalconSat/i)).toBeNull();
    expect(screen.queryByText(/CRS-26/i)).toBeNull();

    const rowsPerPageInputBtn = screen.getByRole('button', { name: 'Rows per page: 5' });
    userEvent.click(rowsPerPageInputBtn);
    const option10PerPage = screen.getByRole('option', { name: '10' });
    userEvent.click(option10PerPage);

    expect(screen.getByText(/CRS-26/i)).toBeInTheDocument();
    expect(screen.getByText(/FalconSat/i)).toBeInTheDocument();

    expect(screen.queryByText(/Transporter-6/i)).toBeNull();
    const launchRows = screen.getAllByTestId(/launch-row-/i);
    expect(launchRows.length).toBe(10);
  });
});
