/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { HighlightOff } from '@mui/icons-material';
import { useFormik } from 'formik';
import { Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SellCarModal from './Form';
import { addCarSchema } from '../../helpers/validationSchema';
import httpInstance from '../../services/axiosConfig';
import CustomizedSnackbars from '../snackbar';
import { UserContext } from '../../context';

const convertToKM = (value: number, type: string) => {
  if (type === 'mile') return value * 1.609344;
  return value;
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: '20px',
  boxShadow: 24,
  width: '40vw',
  p: 4,
};

function SendRequestModule({ open, handleClose }: { open: boolean,
  handleClose: () => void }) {
  const { userInfo } = useContext(UserContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [snackBarProperties, setSnackBarProperties] = useState<{
    open: boolean;
    message: string;
    type: 'success' | 'error';
  }>({ open: false, message: '', type: 'error' });

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      brand: '',
      model: '',
      price: '',
      year: 0,
      mileage: 0,
      location: '',
      type: '',
    },

    validationSchema: addCarSchema,
    onSubmit: async (values, { resetForm }) => {
      const newValue = Math.floor(convertToKM(values.mileage, values.type));
      // eslint-disable-next-line no-param-reassign
      values.mileage = newValue;
      try {
        setLoading(true);
        setSnackBarProperties((preState) => ({ ...preState, open: false }));
        await httpInstance.post('/cars', values);
        setLoading(false);
        setSnackBarProperties({
          open: true,
          message: 'Sell car request sent successfully',
          type: 'success',
        });
        handleClose();
        resetForm();
      } catch (err) {
        setLoading(false);
        setSnackBarProperties({
          open: true,
          message: 'something went wrong!',
          type: 'error',
        });
      }
    },
  });

  const handleCloseSnackBar = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBarProperties((preState) => ({ ...preState, open: false }));
  };

  return (
    <div style={{ backgroundColor: '#fff' }}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <HighlightOff
            sx={{
              position: 'absolute',
              cursor: 'pointer',
            }}
            onClick={handleClose}
          />

          <Typography
            sx={{ fontSize: '1.5rem', width: 'fit-content', margin: '0 auto' }}
            component="h2"
          >
            Sell Your Car Now!
          </Typography>
          <hr
            style={{
              height: '.3rem',
              width: '20rem',
              backgroundColor: '#0A20E6',
              margin: '0.5rem auto',
            }}
          />

          <SellCarModal id={undefined} modalType="addRequest" formik={formik}>
            {undefined}
          </SellCarModal>
        </Box>
      </Modal>
      <CustomizedSnackbars
        open={snackBarProperties.open}
        handleClose={handleCloseSnackBar}
        message={snackBarProperties.message}
        type={snackBarProperties.type}
      />
    </div>
  );
}

export default SendRequestModule;
