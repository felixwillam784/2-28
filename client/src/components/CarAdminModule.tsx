import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Typography } from '@mui/material';
import CustomStepper from './stepper';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  borderRadius: '20px',
  boxShadow: 24,
  p: 4,
};

export default function CarAdminModel() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        sx={{ marginRight: '0.5rem' }}
        variant="contained"
        color="success"
        onClick={handleOpen}
      >
        Check

      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx={{ textAlign: 'center' }} component="h2">
            Car selling Details
            <hr style={{
              margin: '1rem 0rem',
              height: '.3rem',
              width: '20rem',
              backgroundColor: '#0A20E6',
            }}
            />
          </Typography>
          <CustomStepper />
        </Box>
      </Modal>
    </>
  );
}
