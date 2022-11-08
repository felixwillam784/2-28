import {
  Typography, Box, Container, Paper, CircularProgress,
} from '@mui/material';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import SpeedTwoToneIcon from '@mui/icons-material/SpeedTwoTone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import StarIcon from '@mui/icons-material/Star';
import './style.css';
import features from '../../assets/data/features';
import CarControll from '../carControll';
import { CarWithImages } from '../../interfaces';

type Props = {
  carInfo: CarWithImages
};

const numberWithCommas = (x: number) => {
  const parts = x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};

function CarInfo({ carInfo }: Props) {
  return (
    <Container
      className="car-info-container"
      fixed
    >
      <section className="car-info">
        {carInfo?.isGoodPrice ? (
          <section className="good-price-label">
            <span className="circle"><StarIcon fontSize="small" /></span>
            <span className="good-price">Great price</span>
          </section>
        ) : ''}
        <section className="main-info-container general">
          <div className="head-info">
            <Typography className="car-name" variant="h5">{`${carInfo?.brand} ${carInfo?.model}`}</Typography>
            <Typography className="price" variant="subtitle1">
              {`$ ${numberWithCommas(carInfo?.price || 0)}`}
            </Typography>
          </div>
          <div className="info-container">
            <CalendarTodayOutlinedIcon />
            <Typography className="info-value" variant="body1">{carInfo?.year}</Typography>
            <span className="dot-divider">.</span>
            <SpeedTwoToneIcon />
            <Typography className="info-value" variant="body1">
              {`${carInfo?.mileage} KM`}
            </Typography>
            <span className="dot-divider">.</span>
            <Box
              sx={{
                mt: '-5px',
                position: 'relative',
                display: 'inline-flex',
              }}
            >
              <CircularProgress
                variant="determinate"
                value={carInfo?.quality}
              />
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
                  {`${Math.round(carInfo?.quality)}%`}
                </Typography>
              </Box>
            </Box>

          </div>
          <div className="info-container">
            <LocationOnIcon />
            <Typography className="info-value" variant="body1">{carInfo?.location}</Typography>
            <span className="dot-divider">.</span>
            <LocalGasStationIcon />
            <Typography className="info-value" variant="body1">{carInfo?.fuel}</Typography>
          </div>

        </section>

        <Typography className="subtitle" variant="subtitle1"> Car overview</Typography>
        <section className="main-info-container overview">
          {carInfo?.transmission
            ? (
              <Paper className="feature-card" elevation={2}>
                <Box
                  className="feature-image"
                  component="img"
                  alt={`transmission ${carInfo?.transmission}`}
                  src={features[carInfo?.transmission === 'automatic'
                    ? 'Automatic Transmission' : 'Manual Transmission']}
                />
              </Paper>
            ) : ''}

          {carInfo?.features.map((feature) => (
            <Paper key={feature} className="feature-card" elevation={2}>
              <Box
                className="feature-image"
                component="img"
                alt={feature}
                src={features[feature]}
              />
            </Paper>
          ))}
        </section>

        <Typography className="subtitle" variant="subtitle1">Description</Typography>
        <section className="main-info-container description">

          {carInfo?.description ? (
            <Typography variant="body1">
              {carInfo?.description}
              .
            </Typography>
          ) : <Typography sx={{ color: 'gray' }} variant="body1">No description provided</Typography> }
        </section>

      </section>
      <CarControll />
    </Container>
  );
}

export default CarInfo;
