import { TableCell, TableRow } from '@mui/material';
import React from 'react';

type Props = {
  launch: Launch;
  setLaunchToShowOnModal: (value: React.SetStateAction<Launch | null>) => void;
};

const LaunchRow = ({ launch, setLaunchToShowOnModal }: Props) => (
  <TableRow hover onClick={() => setLaunchToShowOnModal(launch)} tabIndex={-1} key={launch.name} sx={{ cursor: 'pointer' }}>
    <TableCell component="th" scope="row">
      {launch.name}
    </TableCell>
    <TableCell align="left">{launch.date_local}</TableCell>
    <TableCell align="left">{launch.rocket}</TableCell>
    <TableCell
      style={{
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        width: '500px',
        display: 'block',
        overflow: 'hidden',
      }}
      align="left">
      {launch.details ? launch.details : 'N/A'}
    </TableCell>
  </TableRow>
);

export default LaunchRow;
