import { Typography } from '@mui/material';
import React from 'react';
import './App.css';
import LandingsTable from './components/landings_table/LandingsTable';

const App = () => (
  <div className="App">
    <Typography variant="h1">SpaceX Landing Page</Typography>
    <LandingsTable />
  </div>
);

export default App;
