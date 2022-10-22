import { PaymentElement } from '@stripe/react-stripe-js';

function StripeForm() {
  return (
    <form>
      <PaymentElement />
      <button type="submit">Submit</button>
    </form>
  );
}
export default StripeForm;
