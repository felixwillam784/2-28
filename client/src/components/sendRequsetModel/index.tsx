import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { HighlightOff } from '@mui/icons-material';
import SellCarModal from './Form';

export default function SendRequestModule() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <HighlightOff
            sx={{
              position: 'absolute',
              cursor: 'pointer',
            }}
            onClick={handleClose}
          />
          <SellCarModal />
        </Box>
      </Modal>
    </div>
  );
}
