import { Typography } from '@mui/material';
import './style.css';

interface HomeCardProps {
  title: string,
  par: string,
  src: string
}

export default function HomeCard({ title, par, src }:HomeCardProps) {
  return (
    <div className="home_card">
      <img className="card-image" src={src} alt="ss" />
      <Typography component="h1">{title}</Typography>
      <Typography
        sx={{
          textAlign: 'center',
          color: '#939AA3',
          lineHeight: '2',
          fontWidth: '100',
        }}
        component="p"
      >
        {par}
      </Typography>
    </div>
  );
}
