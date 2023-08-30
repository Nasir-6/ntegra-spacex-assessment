import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import userEvent from '@testing-library/user-event';
import LaunchModal from './LaunchModal';

const MockedLaunchModal = ({ id }: { id: string }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[`/${id}`]}>
        <Routes>
          <Route path="/:id" element={<LaunchModal />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
};

describe('LaunchModal rendering', () => {
  it('should render the LaunchModal correctly with FalconSat details', async () => {
    render(<MockedLaunchModal id="5eb87cd9ffd86e000604b32a" />);
    expect(await screen.findByText(/FalconSat/i)).toBeInTheDocument();
    expect(screen.getByText(/Failed/i)).toBeInTheDocument();
    expect(screen.getByText(/Launch Date /i)).toBeInTheDocument();
    expect(screen.getByText(/2006-03-24/i)).toBeInTheDocument();

    expect(screen.getByText(/Rocket ID:/i)).toBeInTheDocument();
    expect(screen.getByText(/5e9d0d95eda69955f709d1eb/i)).toBeInTheDocument();

    expect(screen.getByText(/Launchpad ID:/i)).toBeInTheDocument();
    expect(screen.getByText(/5e9e4502f5090995de566f86/i)).toBeInTheDocument();

    expect(screen.getByText(/Details:/i)).toBeInTheDocument();
    expect(screen.getByText(/Engine failure at 33 seconds and loss of vehicle/i)).toBeInTheDocument();
  });

  it('should render the Success chip for RatSat details since launch.success is true', async () => {
    render(<MockedLaunchModal id="5eb87cdbffd86e000604b32d" />);
    expect(await screen.findByText('RatSat')).toBeInTheDocument();
    expect(screen.getByText('Success')).toBeInTheDocument();
  });

  it('should not render the Success or Failure chip for Transporter-6 details as launch.success is null', async () => {
    render(<MockedLaunchModal id="633f72580531f07b4fdf59c6" />);
    expect(await screen.findByText('Transporter-6')).toBeInTheDocument();
    expect(screen.queryByText('Success')).not.toBeInTheDocument();
    expect(screen.queryByText('Failure')).not.toBeInTheDocument();
  });

  it('should render N/A for Transporter-6 details as launch.details is null', async () => {
    render(<MockedLaunchModal id="633f72580531f07b4fdf59c6" />);
    expect(await screen.findByText('Transporter-6')).toBeInTheDocument();
    expect(screen.getByText('N/A')).toBeInTheDocument();
  });

  it('should remove modal details when overlay is closed', async () => {
    render(<MockedLaunchModal id="633f72580531f07b4fdf59c6" />);

    expect(await screen.findByRole('presentation')).toBeInTheDocument();
    const modal = screen.getByRole('presentation');
    expect(screen.getByText('Transporter-6')).toBeInTheDocument();

    const closeBtn = screen.getByRole('button', { name: 'modal-close-btn' });
    userEvent.click(closeBtn);

    expect(modal).not.toBeInTheDocument();
    expect(screen.queryByText('Transporter-6')).not.toBeInTheDocument();
  });

  // TODO: setups tests for loading and error/empty state
  //   it('should not render Modal if id is wrong', async () => {
  //     render(<MockedLaunchModal id="wrong" />);
  //     expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
  //   });
});
