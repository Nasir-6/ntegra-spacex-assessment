import { Box, Chip, Modal, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getLaunchById } from '../../api/spacex';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type Props = {
  launchId: string;
  setLaunchToShowOnModal: React.Dispatch<React.SetStateAction<string | null>>;
};

const LaunchModal = ({ launchId, setLaunchToShowOnModal }: Props) => {
  const { data: launch } = useQuery({
    queryKey: ['launch', launchId],
    queryFn: () => getLaunchById(launchId),
  });

  // TODO: Add a loading/empty state?
  if (!launch) return null;

  return (
    <Modal
      // eslint-disable-next-line react/jsx-boolean-value
      open={true}
      onClose={() => setLaunchToShowOnModal(null)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Stack direction="row" spacing={1}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {launch.name}
          </Typography>
          {launch.success ? (
            <Chip label="Success" color="success" variant="outlined" />
          ) : (
            <Chip label="Failed" color="warning" variant="outlined" />
          )}
        </Stack>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {`Launch Date (UTC): ${launch.date_utc.slice(0, 10)}`}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {`Rocket ID: ${launch.rocket}`}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {`Launchpad ID: ${launch.launchpad}`}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Details:
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {launch.details ? launch.details : 'N/A'}
        </Typography>
      </Box>
    </Modal>
  );
};

export default LaunchModal;
