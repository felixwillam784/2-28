import { WhatsApp } from '@mui/icons-material';
import './style.css';
import {
  Box, Button, Modal,
} from '@mui/material';
import { Elements } from '@stripe/react-stripe-js';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

import StripeForm from '../StripForm';
import CustomizedSnackbars from '../snackbar';

const stripePromise = loadStripe(
  'pk_test_TYooMQauvdEDq54NiTphI7jx',
);

function CarControll() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openSnackBar, setOpenSnackBar] = useState<boolean>(false);
  const [snackBarMessage, setSnackBarMessage] = useState<string>('');
  const [snackBarType, setSnackBarType] = useState<'error' | 'success'>('error');

  const options = {
    clientSecret: 'pi_1DseH42eZvKYlo2C5UQDyYph_secret_gowsU3j2SgDfFECrHNzE8UtGK',
  };
  const handleCloseSnackBar = () => {
    setOpenSnackBar(false);
  };
  return (
    <>
      <section className="buttons-container">
        <Button
          onClick={() => {
            const url = 'http://api.whatsapp.com/send?phone=0599504801';
            window.open(url);
          }}
          sx={{ color: '#0A20E6', borderColor: '#0A20E6' }}
          variant="outlined"
          size="large"
        >
          <WhatsApp />
          CONTACT
        </Button>
        <Button onClick={handleOpen} sx={{ backgroundColor: '#0A20E6' }} variant="contained" size="large">
          Buy
        </Button>
      </section>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          className="strip_Model"
        >
          <Elements stripe={stripePromise} options={options}>
            <StripeForm
              setSnackBarMessage={setSnackBarMessage}
              setSnackBarType={setSnackBarType}
              setOpenSnackBar={setOpenSnackBar}
            />
          </Elements>
          <CustomizedSnackbars
            open={openSnackBar}
            handleClose={handleCloseSnackBar}
            message={snackBarMessage}
            type={snackBarType}
          />
        </Box>
      </Modal>
    </>

  );
}

export default CarControll;
