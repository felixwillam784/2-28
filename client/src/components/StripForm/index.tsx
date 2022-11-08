import { useContext } from 'react';
import { Button } from '@mui/material';
import { PaymentElement } from '@stripe/react-stripe-js';
import { useParams } from 'react-router-dom';
import { SnackBarContext } from '../../context';
import httpInstance from '../../services';

import './style.css';
import { SnackBarContextTypeWithDispatch } from '../../interfaces';

function StripeForm() {
  const { id } = useParams();
  const { setSnackBarProperties }:SnackBarContextTypeWithDispatch = useContext(SnackBarContext);
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
  const handleClick = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    buyCar();
  };

  return (
    <form className="stripe-form">
      <PaymentElement />
      {' '}
      <Button
        onClick={(e) => handleClick(e)}
        sx={{ color: '#0A20E6', borderColor: '#0A20E6' }}
        className="pay-button"
        type="submit"
      >
        Pay

      </Button>
    </form>
  );
}
export default StripeForm;
