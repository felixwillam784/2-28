import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardMedia, CircularProgress } from '@mui/material';

interface OutlineCardProps {
  image:string
  carName:string
  quality:number
  price:number
  mailage:number
  description:string
  goodPrice:boolean
}

export default function CarCard({
  image,
  carName,
  quality,
  price,
  mailage,
  description,
  goodPrice,
}:OutlineCardProps) {
  return (
    <Card sx={{
      display: 'flex',
      maxWidth: '50vw',
      mb: '1rem',
    }}
    >
      <CardMedia
        component="img"
        height="300px"
        image={image}
        alt={carName}
        sx={{ width: '300px', objectFit: 'cover' }}
      />
      <CardContent>
        <Typography
          sx={{
            color: 'black',
            fontSize: 24,
            fontWeight: '900',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '15rem',
            mb: '1.5rem',
          }}
          color="text.secondary"
          gutterBottom
          component="h1"
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
            fontWeight: '900',
            width: '15rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          component="p"
        >
          price:
          {price}
          $
          {' '}
          <span
            style={{
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            {mailage}
            km
          </span>
        </Typography>
        <Typography
          sx={{ mb: 1.5, mt: '1.5rem' }}
          color="text.secondary"
          component="p"
        >
          {description}
        </Typography>

        <Button
          sx={{
            width: '10rem',
            borderRadius: '15px',
            padding: '.5rem',
            mt: '1.5rem',
            cursor: 'pointer',
          }}
          variant="contained"
        >
          Buy Now
        </Button>
      </CardContent>
      {
        goodPrice ? (
          <Typography
            sx={{
              position: 'relative',
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
        ) : ''
      }
    </Card>
  );
}
