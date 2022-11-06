import { Button } from '@mui/material';
import { PaymentElement } from '@stripe/react-stripe-js';
import { useParams } from 'react-router-dom';
import httpInstance from '../../services';

import './style.css';

function StripeForm({
  setSnackBar,

}:{ setSnackBar: React.Dispatch<React.SetStateAction<{
  type: 'error' | 'success';
  message: string;
  open: boolean;
}>> }) {
  const { id } = useParams();
  const buyCar = async () => {
    try {
      await httpInstance.patch('/cars/buy', { id });
      setSnackBar({
        type: 'success',
        message: 'payment successfully check your email to more information',
        open: true,
      });
    } catch (error) {
      setSnackBar({
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
