// import { Typography } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';
import LaunchesTable from './components/launches_table/LaunchesTable';
import LaunchModal from './components/launch_modal/LaunchModal';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: ['Oxanium', 'Roboto', 'Arial', 'sans-serif'].join(','),
  },
});

const App = () => {
  const queryClient = new QueryClient();
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/ntegra-spacex-assessment" element={<LaunchesTable />}>
            <Route path="/ntegra-spacex-assessment/:id" element={<LaunchModal />} />
          </Route>
        </Routes>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
