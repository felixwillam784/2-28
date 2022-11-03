import { Button } from '@mui/material';
import { PaymentElement } from '@stripe/react-stripe-js';
import { useParams } from 'react-router-dom';
import httpInstance from '../../services';

import './style.css';

function StripeForm({
  setSnackBarMessage,
  setSnackBarType,
  setOpenSnackBar,
}:{ setSnackBarMessage: React.Dispatch<React.SetStateAction<string>>,
  setSnackBarType:React.Dispatch<React.SetStateAction<'error' | 'success'>>,
  setOpenSnackBar: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const { id } = useParams();
  const handleClick = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const buyCar = async () => {
      try {
        await httpInstance.patch('/cars/buy', { id });
        setOpenSnackBar(true);
        setSnackBarMessage('payment successfully check your email to more information');
        setSnackBarType('success');
        console.log(1);
      } catch (error) {
        setOpenSnackBar(true);
        setSnackBarMessage('car not available to sell');
        setSnackBarType('error');
        console.log(2);
      }
    };
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
