import React, { PropsWithChildren } from 'react';
import { render, screen } from '@testing-library/react';
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

const show10RowsPerPage = () => {
  const rowsPerPageInputBtn = screen.getByRole('button', { name: 'Rows per page: 5' });
  userEvent.click(rowsPerPageInputBtn);
  const option10PerPage = screen.getByRole('option', { name: '10' });
  userEvent.click(option10PerPage);
};

const expectNumOfLaunchRowsToBe = (numOfRows: number) => {
  const launchRows = screen.getAllByTestId(/launch-row-/i);
  expect(launchRows.length).toBe(numOfRows);
};

const clickNextPageBtn = () => {
  const nextPageBtn = screen.getByRole('button', { name: 'Go to next page' });
  userEvent.click(nextPageBtn);
};

const clickPrevPageBtn = () => {
  const prevPageBtn = screen.getByRole('button', { name: 'Go to previous page' });
  userEvent.click(prevPageBtn);
};

describe('LaunchTable rendering', () => {
  it('should render the Launch Table correctly', async () => {
    render(<LaunchesTable />, { wrapper });
    expect(await screen.findByRole('table')).toBeInTheDocument();

    const headerRow = screen.getByTestId(`header-row`);
    expect(headerRow.childElementCount).toBe(4);
    expectNumOfLaunchRowsToBe(5);
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });
});

describe('LaunchTable pagination', () => {
  it('should display launches 6-10 when clicking on next page button', async () => {
    render(<LaunchesTable />, { wrapper });
    expect(await screen.findByRole('table')).toBeInTheDocument();
    clickNextPageBtn();
    // No NEED TO USE wait for elementToBeRemoved or act - https://github.com/testing-library/user-event/discussions/906 - use override in package.json to use same @testing-library/dom version!
    expect(screen.getByText(/CRS-26/i)).toBeInTheDocument(); // 6th row
    expect(screen.queryByText(/FalconSat/i)).toBeNull();
    expectNumOfLaunchRowsToBe(5);
  });

  it('should display launch 11 with empty rows when clicking on next page button twice', async () => {
    render(<LaunchesTable />, { wrapper });
    expect(await screen.findByRole('table')).toBeInTheDocument();

    clickNextPageBtn();
    expect(screen.getByText(/CRS-26/i)).toBeInTheDocument();
    expect(screen.queryByText(/FalconSat/i)).toBeNull();

    clickNextPageBtn();
    expect(screen.getByText(/Transporter-6/i)).toBeInTheDocument(); // 11th Row
    expect(screen.queryByText(/FalconSat/i)).toBeNull();
    expect(screen.queryByText(/CRS-26/i)).toBeNull();
    expectNumOfLaunchRowsToBe(1);
    expect(screen.getByTestId(/empty-rows/i)).toBeInTheDocument();
  });

  it('should display launches 1-5 again when clicking on next page then previous', async () => {
    render(<LaunchesTable />, { wrapper });
    expect(await screen.findByRole('table')).toBeInTheDocument();

    clickNextPageBtn();
    expect(screen.getByText(/CRS-26/i)).toBeInTheDocument();
    expect(screen.queryByText(/FalconSat/i)).toBeNull();

    clickPrevPageBtn();
    expect(screen.getByText(/FalconSat/i)).toBeInTheDocument();
    expect(screen.queryByText(/CRS-26/i)).toBeNull();
    expectNumOfLaunchRowsToBe(5);
  });

  it('should display launches 1-10 when changing rows per page to 10', async () => {
    render(<LaunchesTable />, { wrapper });
    expect(await screen.findByRole('table')).toBeInTheDocument();
    expect(screen.getByText(/FalconSat/i)).toBeInTheDocument();
    expect(screen.queryByText(/CRS-26/i)).toBeNull();

    show10RowsPerPage();
    expect(screen.getByText(/CRS-26/i)).toBeInTheDocument();
    expect(screen.getByText(/FalconSat/i)).toBeInTheDocument();
    expectNumOfLaunchRowsToBe(10);
  });

  it('should display launch 11 with empty rows when changing rows per page to 10 and clicking next page', async () => {
    render(<LaunchesTable />, { wrapper });
    expect(await screen.findByRole('table')).toBeInTheDocument();
    expect(screen.getByText(/FalconSat/i)).toBeInTheDocument();

    show10RowsPerPage();
    expect(screen.getByText(/CRS-26/i)).toBeInTheDocument();

    clickNextPageBtn();
    expect(screen.queryByText(/CRS-26/i)).toBeNull();
    expect(screen.queryByText(/FalconSat/i)).toBeNull();
    expect(screen.getByText(/Transporter-6/i)).toBeInTheDocument();
    expectNumOfLaunchRowsToBe(1);
    expect(screen.getByTestId(/empty-rows/i)).toBeInTheDocument();
  });

  it('should reset to page 1 showing launches 1-10 when changing rows per page to 10 whilst on page 3', async () => {
    render(<LaunchesTable />, { wrapper });
    expect(await screen.findByRole('table')).toBeInTheDocument();
    expect(screen.getByText(/FalconSat/i)).toBeInTheDocument();

    clickNextPageBtn();
    expect(screen.getByText(/CRS-26/i)).toBeInTheDocument();
    expect(screen.queryByText(/FalconSat/i)).toBeNull();

    clickNextPageBtn();
    expect(screen.getByText(/Transporter-6/i)).toBeInTheDocument();
    expect(screen.queryByText(/FalconSat/i)).toBeNull();
    expect(screen.queryByText(/CRS-26/i)).toBeNull();

    show10RowsPerPage();
    expect(screen.getByText(/CRS-26/i)).toBeInTheDocument();
    expect(screen.getByText(/FalconSat/i)).toBeInTheDocument();
    expect(screen.queryByText(/Transporter-6/i)).toBeNull();
    expectNumOfLaunchRowsToBe(10);
  });
});
