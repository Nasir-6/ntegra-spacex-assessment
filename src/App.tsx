import { Typography } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import './App.css';
import LaunchesTable from './components/launches_table/LaunchesTable';

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Typography variant="h1">SpaceX Landing Page</Typography>
        <LaunchesTable />
      </div>
    </QueryClientProvider>
  );
};

export default App;
