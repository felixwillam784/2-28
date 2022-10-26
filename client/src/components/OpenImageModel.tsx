import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '39vw',
  height: '59vh',
  bgcolor: 'background.paper',
  boxShadow: 24,
};

interface CarImageModelProp {
  imageSrc:string,
  openModel:boolean,
  setOpenModel:React.Dispatch<React.SetStateAction<boolean>>
}

export default function CarImageModel({ imageSrc, openModel, setOpenModel }:CarImageModelProp) {
  const handleClose = () => setOpenModel(false);

  return (
    <div>
      <Modal
        open={openModel}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img
            style={{
              objectFit: 'cover',
              maxHeight: '60vh',
              maxWidth: '100%',
            }}
            src={imageSrc}
            alt="car "
          />
        </Box>
      </Modal>
    </div>
  );
}
