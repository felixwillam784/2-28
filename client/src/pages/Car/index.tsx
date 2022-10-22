import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import CarSlider from '../../components/CarSlider';
import StripeForm from '../../components/StripForm';
import StripeCheckoutForm from '../../components/StripCheckoutForm';

const stripePromise = loadStripe(
  'pk_test_51Luz0QK7KEWff3QCtg4mT8AFgOzOYCeNp1DaKtfisod4i2aZ0HWJQUZtAKPM8A20mnQKREir6VonFHzmJEoTUQtq00Jwh1wfOv',
);

function Car() {
  const options = {
    // passing the client secret obtained from the server
    clientSecret: '{{CLIENT_SECRET}}',
  };
  return (
    <>
      <CarSlider />
      <Elements stripe={stripePromise} options={options}>
        <StripeForm />
      </Elements>

      <StripeCheckoutForm />
    </>
  );
}

export default Car;
