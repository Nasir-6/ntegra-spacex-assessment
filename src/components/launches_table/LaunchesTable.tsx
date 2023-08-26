import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getAllLaunches } from '../../api/spacex';

// type Props = {}

const LaunchesTable = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data: launches } = useQuery({
    queryKey: ['launches'],
    queryFn: () => getAllLaunches(),
  });

  console.log('launches :>> ', launches);
  return <div>LaunchesTable</div>;
};

export default LaunchesTable;
