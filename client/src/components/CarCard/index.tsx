import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardMedia, CircularProgress } from '@mui/material';
import './style.css';
import { Link } from 'react-router-dom';

interface OutlineCardProps {
  id: number,
  image:string
  carName:string
  quality:number
  price:number
  mileage:number
  isGoodPrice:boolean
}

export default function CarCard({
  image,
  carName,
  quality,
  price,
  mileage,
  isGoodPrice,
  id,
}:OutlineCardProps) {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '19vw',
        mb: '1rem',
        borderRadius: '20px',
        position: 'relative',
        maxHeight: '25rem',
      }}
      className="car"
    >
      <CardMedia
        component="img"
        image={image}
        alt={carName}
        height="150rem"
        sx={{ minWidth: '100%', objectFit: 'cover' }}
      />
      <CardContent sx={{
        height: '50%',
      }}
      >
        <Typography
          sx={{
            color: 'black',
            fontSize: 16,
            fontWeight: '900',
            display: 'flex',
            alignItems: 'start',
            justifyContent: 'space-between',
            width: '14rem',
            mb: '1rem',
            maxHeight: '3rem',
            height: '3rem',
            overflow: 'hidden',
          }}
          color="text.secondary"
          gutterBottom
          component="h2"
        >
          {carName}
          <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" value={quality} />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography
                variant="caption"
                component="div"
                color="text.secondary"
              >
                {quality}
                %
              </Typography>
            </Box>
          </Box>
        </Typography>

        <Typography
          sx={{
            fontSize: '1rem',
            fontWeight: '500',
            width: '13rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: '1rem',
          }}
          component="p"
        >

          {price}
          $
          {' '}
          <span
            style={{
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            {mileage}
            km
          </span>
        </Typography>
        <Link to={`/car/${id}`}>
          <Button
            fullWidth
            sx={{
              borderRadius: '15px',
              padding: '.5rem',
              mt: '.5rem',
              cursor: 'pointer',
            }}
            variant="contained"
          >
            Buy Now
          </Button>
        </Link>
      </CardContent>
      {
        isGoodPrice && (
          <Typography
            sx={{
              position: 'absolute',
              backgroundColor: 'red',
              top: '0rem',
              height: '4rem',
              width: '3rem',
              color: 'white',
              padding: '.5rem',
            }}
            component="label"
          >
            good price
          </Typography>
        )
      }
    </Card>
  );
}
