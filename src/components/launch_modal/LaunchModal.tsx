import { Box, Chip, IconButton, Modal, Stack, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getLaunchById } from '../../api/spacex';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 400,
  bgcolor: 'rgba(0,0,25,1)',
  border: '0.1px dotted #fff',
  overflow: 'scroll',
  maxHeight: '90%',
  display: 'flex',
  flexDirection: 'column',
  gap: 1.5,
};

const LaunchModal = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) return null;

  const { data: launch, isError } = useQuery({
    queryKey: ['launch', id],
    queryFn: () => getLaunchById(id),
  });

  // TODO: Add a loading/empty state?
  if (!launch || isError) return null;

  const handleOnClose = () => {
    navigate('/ntegra-spacex-assessment');
  };

  return (
    <Modal
      // eslint-disable-next-line react/jsx-boolean-value
      open={true}
      onClose={handleOnClose}
      aria-labelledby="modal-launch-name"
      aria-describedby="modal-launch-details">
      <Box paddingX={3} paddingY={2} sx={modalStyle}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography id="modal-launch-name" variant="h6" component="h2">
            {launch.name}
          </Typography>
          <IconButton aria-label="modal-close-btn" onClick={handleOnClose}>
            <CloseIcon />
          </IconButton>
        </Stack>

        {launch.success !== null &&
          (launch.success ? (
            <Chip label="Success" color="success" variant="outlined" sx={{ maxWidth: 100 }} />
          ) : (
            <Chip label="Failed" color="error" variant="outlined" sx={{ maxWidth: 100 }} />
          ))}

        <Stack direction="row" flexWrap="wrap">
          <Typography variant="body2" paddingRight={0.5} aria-label="Date">
            <strong>Launch Date (UTC):</strong>
          </Typography>
          <Typography variant="body2">{launch.date_utc.slice(0, 10)}</Typography>
        </Stack>

        <Typography variant="body2">
          <strong>Rocket ID: </strong>
          {launch.rocket}
        </Typography>

        <Typography variant="body2">
          <strong>Launchpad ID: </strong>
          {launch.launchpad}
        </Typography>

        <Stack direction="column">
          <Typography variant="body2" paddingRight={0.5}>
            <strong>Details:</strong>
          </Typography>
          <Typography variant="body2">{launch.details ? launch.details : 'N/A'}</Typography>
        </Stack>
      </Box>
    </Modal>
  );
};

export default LaunchModal;
