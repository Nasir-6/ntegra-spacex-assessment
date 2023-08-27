import { Typography } from '@mui/material';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import React from 'react';
import { getAllLaunches } from './api/spacex';
import './App.css';
import LaunchesTable from './components/launches_table/LaunchesTable';

const App = () => {
  const queryClient = new QueryClient();

  const { data: launches } = useQuery({
    queryKey: ['launches'],
    queryFn: () => getAllLaunches(),
  });

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Typography variant="h1">SpaceX Landing Page</Typography>
        {launches && <LaunchesTable launches={launches} />}
      </div>
    </QueryClientProvider>
  );
};

export default App;
