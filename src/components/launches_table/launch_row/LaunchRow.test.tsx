import React from 'react';
import { render, screen } from '@testing-library/react';
import { debug } from 'console';
import { Table, TableBody } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import LaunchRow from './LaunchRow';
import { Launch } from '../../../types/spacexapi';

const launchId = '5eb87cd9ffd86e000604b32a';
const rocketId = '5e9d0d95eda69955f709d1eb';

const mockLaunchRow = (mockLaunch: Launch) => (
  <BrowserRouter>
    <Table sx={{ minWidth: 750 }} size="medium">
      <TableBody>
        <LaunchRow launch={mockLaunch} />
      </TableBody>
    </Table>
  </BrowserRouter>
);

describe('LaunchRow rendering', () => {
  it('should render the launch information correctly', () => {
    const mockLaunch: Launch = {
      name: 'FalconSat',
      success: false,
      date_utc: '2006-03-24T22:30:00.000Z',
      details: 'Engine failure at 33 seconds and loss of vehicle',
      launchpad: '5e9e4502f5090995de566f86',
      rocket: rocketId,
      id: launchId,
    };
    render(mockLaunchRow(mockLaunch));
    //   const launchRow = screen.getByTestId(`launch-row-${launchId}`);
    const launchRow = screen.getByRole('row');
    debug();
    expect(launchRow.childElementCount).toBe(4);
    expect(screen.getByText(/FalconSat/i)).toBeInTheDocument();
    expect(screen.getByText(/2006-03-24/i)).toBeInTheDocument();
    expect(screen.getByText(/Engine failure at 33 seconds and loss of vehicle/i)).toBeInTheDocument();
    expect(screen.getByText(rocketId)).toBeInTheDocument();
  });

  it('should render N/A when details is null', () => {
    const mockLaunch: Launch = {
      name: 'FalconSat',
      success: false,
      date_utc: '2006-03-24T22:30:00.000Z',
      details: null,
      launchpad: '5e9e4502f5090995de566f86',
      rocket: rocketId,
      id: launchId,
    };
    render(mockLaunchRow(mockLaunch));
    const launchRow = screen.getByRole('row');
    debug();
    expect(launchRow.childElementCount).toBe(4);
    expect(screen.getByText(/FalconSat/i)).toBeInTheDocument();
    expect(screen.getByText(/2006-03-24/i)).toBeInTheDocument();
    expect(screen.getByText('N/A')).toBeInTheDocument();
    expect(screen.getByText(rocketId)).toBeInTheDocument();
  });

  it('should render the ellipses for details if details is too long', () => {
    const mockLaunch: Launch = {
      name: 'FalconSat',
      success: false,
      date_utc: '2006-03-24T22:30:00.000Z',
      details: 'Engine failure at 33 seconds and loss of vehicle',
      launchpad: '5e9e4502f5090995de566f86',
      rocket: rocketId,
      id: launchId,
    };
    render(mockLaunchRow(mockLaunch));
    const launchRow = screen.getByRole('row');
    debug();
    expect(launchRow.childElementCount).toBe(4);
    expect(screen.getByText(/FalconSat/i)).toBeInTheDocument();
    expect(screen.getByText(/2006-03-24/i)).toBeInTheDocument();
    expect(screen.queryByText(/Engine failure at 33 seconds and loss of vehicle/i)).toHaveStyle(`whiteSpace: nowrap;
        text-overflow: ellipsis;
        max-width: 500px;
        overflow: hidden;`);
    expect(screen.getByText(rocketId)).toBeInTheDocument();
  });
});
