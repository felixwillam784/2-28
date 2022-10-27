import { Button } from '@mui/material';
import { PaymentElement } from '@stripe/react-stripe-js';

import './style.css';

function StripeForm() {
  return (
    <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <PaymentElement />
      {' '}
      <Button sx={{ color: '#0A20E6', borderColor: '#0A20E6' }} className="pay-button" type="submit">Pay</Button>
    </form>
  );
}
export default StripeForm;
