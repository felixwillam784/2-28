import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function CarNotFound() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '50vh',
      fontSize: '48px',
      flexDirection: 'column',
    }}
    >
      OOP!
      {' '}
      <br />
      Car Not Found
      <Link to="/cars">
        <Button sx={{
          backgroundColor: 'blue', width: '15rem', height: '3rem', color: 'black',
        }}
        >
          GO Back
        </Button>
      </Link>
    </div>
  );
}
