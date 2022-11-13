import { useContext, useState } from 'react';
import { Button } from '@mui/material';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useParams } from 'react-router-dom';
import { SnackBarContext } from '../../contexts';
import httpInstance from '../../services';

import './style.css';
import { SnackBarContextTypeWithDispatch } from '../../interfaces';

function StripeForm() {
  const stripe = useStripe();
  const elements = useElements();
  const { id } = useParams();
  const { setSnackBarProperties }:SnackBarContextTypeWithDispatch = useContext(SnackBarContext);
  const [isProcessing, setIsProcessing] = useState(false);

  const buyCar = async () => {
    try {
      await httpInstance.patch('/cars/buy', { id });
      setSnackBarProperties({
        type: 'success',
        message: 'payment successfully check your email to more information',
        open: true,
      });
    } catch (error) {
      setSnackBarProperties({
        type: 'error',
        message: 'car not available to sell',
        open: true,
      });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    const { error } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    });

    if (error?.type === 'card_error' || error?.type === 'validation_error') {
      setSnackBarProperties({
        type: 'error',
        message: error?.message || '',
        open: true,
      });
    } else {
      buyCar();
    }

    setIsProcessing(false);
  };

  return (
    <form className="stripe-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      {' '}
      <Button
        disabled={isProcessing || !stripe || !elements}
        id="submit"
        sx={{ color: '#0A20E6', borderColor: '#0A20E6' }}
        className="pay-button"
        type="submit"
      >
        <span id="button-text">
          {isProcessing ? 'Processing ... ' : 'Pay now'}
        </span>
      </Button>
    </form>
  );
}
export default StripeForm;
