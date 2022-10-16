import { Typography } from '@mui/material';
import Images from '../../assets';
import HomeCard from '../HomeCard';
import './style.css';

export default function HomeCardSection() {
  return (
    <div className="home_card_section">
      <div className="wrapper">

        <Typography
          sx={{ fontSize: '1.4rem' }}
          component="h1"
        >
          Buying a used car?
        </Typography>
        <Typography
          sx={{ fontSize: '1.4rem' }}
          component="p"
        >
          Here is why you should do it on
          {' '}
          <br />
          {' '}
          Carswitch
        </Typography>
      </div>
      <Typography
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '80%',
          position: 'absolute',
          top: '10rem',
        }}
        component="div"
      >
        <HomeCard
          title="Great Value"
          description="Skip the dealership margins, and buy directly"
          src={Images.privateSeller}
          alt="privateSeller"
        />
        <HomeCard
          title="Trusted Quality"
          description="Condition reports upfront & online, "
          src={Images.inspected}
          alt="inspected"
        />
        <HomeCard
          title="All Online"
          description="Ve handle every step, you just click click click"
          src={Images.rating}
          alt="rating"
        />
      </Typography>
    </div>
  );
}
