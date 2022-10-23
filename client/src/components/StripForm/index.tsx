import { Button } from '@mui/material';
import { PaymentElement } from '@stripe/react-stripe-js';

function StripeForm() {
  return (
    <form>
      <PaymentElement />
      <Button type="submit">Pay</Button>
    </form>
  );
}
export default StripeForm;
