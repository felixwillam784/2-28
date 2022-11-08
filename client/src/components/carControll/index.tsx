import { WhatsApp } from '@mui/icons-material';
import './style.css';
import {
  Box, Button, Modal,
} from '@mui/material';
import { Elements } from '@stripe/react-stripe-js';

import { useContext, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

import { useLocation, useNavigate } from 'react-router-dom';
import StripeForm from '../StripForm';
import { UserContext } from '../../contexts';

const stripePromise = loadStripe(
  'pk_test_TYooMQauvdEDq54NiTphI7jx',
);

function CarControll() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const options = {
    clientSecret: 'pi_1DseH42eZvKYlo2C5UQDyYph_secret_gowsU3j2SgDfFECrHNzE8UtGK',
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
        <Button
          onClick={() => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            userInfo?.role === 'user'
              ? handleOpen()
              : navigate('/login', { state: { currentLocation: pathname } });
          }}
          sx={{ backgroundColor: '#0A20E6' }}
          variant="contained"
          size="large"
        >
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
            <StripeForm />
          </Elements>
        </Box>
      </Modal>
    </>

  );
}

export default CarControll;
