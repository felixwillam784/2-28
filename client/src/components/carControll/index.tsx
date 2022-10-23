import './style.css';
import { Button, Modal } from '@mui/material';
import { Elements } from '@stripe/react-stripe-js';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

import StripeForm from '../StripForm';

const stripePromise = loadStripe(
  'pk_test_TYooMQauvdEDq54NiTphI7jx',
);

function CarControll() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const options = {
    clientSecret: 'pi_1DseH42eZvKYlo2C5UQDyYph_secret_gowsU3j2SgDfFECrHNzE8UtGK',
  };
  return (
    <>
      <section className="buttons-container">
        <Button sx={{ color: '#0A20E6', borderColor: '#0A20E6' }} variant="outlined" size="large">
          Arrange visit
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
        <Elements stripe={stripePromise} options={options}>
          <StripeForm />
        </Elements>
      </Modal>
    </>

  );
}

export default CarControll;
