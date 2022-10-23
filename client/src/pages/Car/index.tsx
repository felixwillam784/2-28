import { Button, Modal } from '@mui/material';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';

import CarInfo from '../../components/CarInfoSection';
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
    clientSecret: 'pi_1DseH42eZvKYlo2C5UQDyYph_secret_gowsU3j2SgDfFECrHNzE8UtGK',
  };

  const testInfo = {
    id: 1,
    brand: 'Toyota',
    model: 'Land Cruiser VXR 4.0L V6',
    price: 48000,
    year: 2022,
    mileage: 36000,
    quality: 95,
    isGoodPrice: true,
    location: 'palestine - gaza',
    state: 'on-market',
    transmission: 'auto',
    features: [
      'Rear entertainment screens',
      'Parking sensors',
      'Cruise Control',
      'Steering wheel control',
      'Navigation',
      'Bluetooth',
      'Brake assist',
    ],
    description: '',
    fuel: 'diesel',
    createdAt: '2022-10-17T08:26:03.560Z',
    updatedAt: '2022-10-17T08:26:03.560Z',
    customerId: 1,
  };

  return (
    <>
      <CarSlider />
      <CarInfo carInfo={testInfo} />
      <Button onClick={handleOpen}>Buy</Button>
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

export default Car;
