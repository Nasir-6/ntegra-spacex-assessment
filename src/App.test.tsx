import React from 'react';
import { fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from './App';

const MockedAppRoute = ({ id }: { id: string }) => (
  <MemoryRouter initialEntries={[`/${id}`]}>
    <App />
  </MemoryRouter>
);

describe('renders App correctly', () => {
  it('renders initial App page with 5 launch rows and no modals', async () => {
    render(<MockedAppRoute id="" />);
    expect(await screen.findByRole('table')).toBeInTheDocument();

    const headerRow = screen.getByTestId(`header-row`);
    expect(headerRow.childElementCount).toBe(4);
    const launchRows = screen.getAllByTestId(/launch-row-/i);
    expect(launchRows.length).toBe(5);
    expect(screen.getByRole('button', { name: 'Rows per page: 5' })).toBeInTheDocument();

    expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
  });

  it('renders FalconSat Modal if FalconSat launchRow is clicked ', async () => {
    render(<MockedAppRoute id="" />);
    expect(await screen.findByRole('table')).toBeInTheDocument();
    const table = screen.getByRole('table');

    expect(screen.queryByRole('presentation')).not.toBeInTheDocument();

    const falconSatlaunchRow = screen.getByTestId(/launch-row-5eb87cd9ffd86e000604b32a/i);
    userEvent.click(falconSatlaunchRow);

    expect(await screen.findByRole('presentation')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'FalconSat' }));
    expect(screen.getByText(/Launchpad ID:/i)).toBeInTheDocument();
    expect(screen.getByText(/5e9e4502f5090995de566f86/i)).toBeInTheDocument();

    expect(table).toBeInTheDocument();
  });

  it('renders FalconSat Modal with table in the back if FalconSat id is in the URL params', async () => {
    render(<MockedAppRoute id="5eb87cd9ffd86e000604b32a" />);
    expect(await screen.findByRole('table')).toBeInTheDocument();
    expect(await screen.findByRole('presentation')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'FalconSat' }));
    expect(screen.getByText(/Launchpad ID:/i)).toBeInTheDocument();
    expect(screen.getByText(/5e9e4502f5090995de566f86/i)).toBeInTheDocument();
  });

  // TODO: Figure out how to test clicking out of modal - waitForElementToBeRemoved times out
  // OR TODO: Add a close btn
  // it('renders initial Modal if launchRow is clicked ', async () => {
  //   render(<MockedAppRoute id="" />);
  //   expect(await screen.findByRole('table')).toBeInTheDocument();
  //   const table = screen.getByRole('table');

  //   expect(screen.queryByRole('presentation')).not.toBeInTheDocument();

  //   const falconSatlaunchRow = screen.getByTestId(/launch-row-5eb87cd9ffd86e000604b32a/i);
  //   userEvent.click(falconSatlaunchRow);

  //   expect(await screen.findByRole('presentation')).toBeInTheDocument();
  //   const modal = screen.getByRole('presentation');
  //   expect(screen.getByRole('heading', { name: 'FalconSat' }));
  //   expect(screen.getByText(/Launchpad ID:/i)).toBeInTheDocument();
  //   expect(screen.getByText(/5e9e4502f5090995de566f86/i)).toBeInTheDocument();

  //   expect(table).toBeInTheDocument();
  //   fireEvent.click(screen.getByText(/SpaceX Landing/i));
  //   // fireEvent.keyDown(table, {
  //   //   key: 'Escape',
  //   //   code: 'Escape',
  //   // });
  //   // await waitForElementToBeRemoved(() => modal);

  //   expect(screen.queryByRole('heading', { name: 'FalconSat' })).not.toBeInTheDocument();
  // });
});
