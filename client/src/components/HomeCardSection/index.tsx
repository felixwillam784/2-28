import { Typography } from '@mui/material';
import './style.css';
// eslint-disable-next-line @typescript-eslint/naming-convention
interface colors {
  color: string,
  text: string,
  ask: string,
  children: JSX.Element[]
}

export default function HomeCardSection({
  color, text, ask, children,
}: colors) {
  return (
    <div
      style={
        {
          backgroundColor: color,
        }
      }
      className="home_card_section"
    >
      <div className="wrapper">
        <Typography
          sx={{ fontSize: '1.4rem' }}
          component="h1"
        >
          {text}
        </Typography>
        <Typography
          sx={{ fontSize: '1.4rem' }}
          component="p"
        >
          {ask}
        </Typography>
      </div>
      <Typography
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '80%',
          marginTop: '50px',
        }}
        component="div"
      >
        {children}
      </Typography>
    </div>
  );
}
