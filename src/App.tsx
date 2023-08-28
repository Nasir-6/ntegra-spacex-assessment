import { Typography } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import './App.css';
import LaunchesTable from './components/launches_table/LaunchesTable';
import LaunchModal from './components/launch_modal/LaunchModal';

const App = () => {
  const queryClient = new QueryClient();

  const [launchToShowOnModal, setLaunchToShowOnModal] = React.useState<string | null>(null);
  console.log('launchToShowOnModal :>> ');
  console.log(JSON.stringify(launchToShowOnModal));
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Typography variant="h1">SpaceX Landing Page</Typography>
        <LaunchesTable setLaunchToShowOnModal={setLaunchToShowOnModal} />
        {launchToShowOnModal && <LaunchModal launchId={launchToShowOnModal} setLaunchToShowOnModal={setLaunchToShowOnModal} />}
      </div>
    </QueryClientProvider>
  );
};

export default App;
