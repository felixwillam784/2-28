/* eslint-disable max-len */
import StripeCheckout, { Token } from 'react-stripe-checkout';

function handleToken(token: Token) {
  console.log(token);
}
function StripeCheckoutForm() {
  return (
    <StripeCheckout
      stripeKey="pk_test_51Luz0QK7KEWff3QCtg4mT8AFgOzOYCeNp1DaKtfisod4i2aZ0HWJQUZtAKPM8A20mnQKREir6VonFHzmJEoTUQtq00Jwh1wfOv"
      name="GOOD CAR Co."
      image="../../public/logo.jpg"
      billingAddress
      shippingAddress
      description="your total is $9999"
      amount={9999}
      token={handleToken}
    />
  );
}
export default StripeCheckoutForm;
