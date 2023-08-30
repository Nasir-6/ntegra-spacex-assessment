import { TableCell, TableRow } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Launch } from '../../../types/spacexapi';

type Props = {
  launch: Launch;
};

const LaunchRow = ({ launch }: Props) => {
  const navigate = useNavigate();

  return (
    <TableRow
      data-testid={`launch-row-${launch.id}`}
      hover
      onClick={() => navigate(`/${launch.id}`)}
      tabIndex={-1}
      sx={{ cursor: 'pointer' }}>
      <TableCell component="th">{launch.name}</TableCell>
      <TableCell>{launch.date_utc.slice(0, 10)}</TableCell>
      <TableCell>{launch.rocket}</TableCell>
      <TableCell
        style={{
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          maxWidth: '500px',
          overflow: 'hidden',
        }}>
        {launch.details ? launch.details : 'N/A'}
      </TableCell>
    </TableRow>
  );
};

export default LaunchRow;
