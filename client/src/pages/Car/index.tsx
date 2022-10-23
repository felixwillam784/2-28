import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Button, Modal } from '@mui/material';

import { useState } from 'react';
import CarSlider from '../../components/CarSlider';
import StripeForm from '../../components/StripForm';

const stripePromise = loadStripe(
  'pk_test_TYooMQauvdEDq54NiTphI7jx',
);

function Car() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const options = {
    // passing the client secret obtained from the server
    clientSecret: 'pi_1DseH42eZvKYlo2C5UQDyYph_secret_gowsU3j2SgDfFECrHNzE8UtGK',
  };
  return (
    <>
      <CarSlider />
      <Button onClick={handleOpen}>Buy</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Elements
          stripe={stripePromise}
          options={options}
        >
          <StripeForm />
        </Elements>
      </Modal>
    </>
  );
}

export default Car;
