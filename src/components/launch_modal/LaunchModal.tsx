import { Box, Modal, Typography } from '@mui/material';
import React from 'react';

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
  launch: Launch;
  setLaunchToShowOnModal: React.Dispatch<React.SetStateAction<Launch | null>>;
};

const LaunchModal = ({ launch, setLaunchToShowOnModal }: Props) => (
  <Modal
    // eslint-disable-next-line react/jsx-boolean-value
    open={true}
    onClose={() => setLaunchToShowOnModal(null)}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description">
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        {launch.name}
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        {launch.date_utc}
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        {`Rocket ID: ${launch.rocket}`}
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        {`Launchpad ID: ${launch.launchpad}`}
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        {launch.details}
      </Typography>
    </Box>
  </Modal>
);

export default LaunchModal;
