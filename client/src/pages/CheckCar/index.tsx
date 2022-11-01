import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import CustomStepper from '../../components/stepper';

const style = {
  margin: '1rem auto',
  width: '90%',
};

export default function CheckCar() {
  const { id } = useParams();

  return (
    <Box sx={style}>
      <Typography
        sx={{
          textAlign: 'center',
          fontWeight: '500',
          fontSize: '25px',
          color: 'var(--text-color)',
        }}
        component="h2"
      >
        Car selling Details
        <hr style={{
          margin: '0.7rem auto',
          height: '.3rem',
          width: '20rem',
          backgroundColor: '#72a0fc',
        }}
        />
      </Typography>
      <CustomStepper id={id} />
    </Box>
  );
}
