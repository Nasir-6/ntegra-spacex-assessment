// import { Typography } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import LaunchesTable from './components/launches_table/LaunchesTable';
import LaunchModal from './components/launch_modal/LaunchModal';

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<LaunchesTable />}>
          <Route path="/:id" element={<LaunchModal />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
};

export default App;
