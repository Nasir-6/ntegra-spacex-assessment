import { TableCell, TableRow } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  launch: Launch;
};

const LaunchRow = ({ launch }: Props) => {
  const navigate = useNavigate();
  return (
    <TableRow hover onClick={() => navigate(`/${launch.id}`)} tabIndex={-1} key={launch.id} sx={{ cursor: 'pointer' }}>
      <TableCell component="th" scope="row">
        {launch.name}
      </TableCell>
      <TableCell align="left">{launch.date_utc.slice(0, 10)}</TableCell>
      <TableCell align="left">{launch.rocket}</TableCell>
      <TableCell
        style={{
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          maxWidth: '500px',
          // display: 'block',
          overflow: 'hidden',
        }}
        align="left">
        {launch.details ? launch.details : 'N/A'}
      </TableCell>
    </TableRow>
  );
};

export default LaunchRow;
