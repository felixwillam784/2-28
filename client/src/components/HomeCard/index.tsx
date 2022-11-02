import { Typography } from '@mui/material';
import './style.css';

interface HomeCardProps {
  title: string,
  description: string,
  src: string,
  alt: string
}

export default function HomeCard(
  {
    title, description, src, alt,
  }: HomeCardProps,
) {
  return (
    <div className="home_card">
      <img className="card-image" src={src} alt={alt} />
      <div>
        <Typography
          sx={{ fontSize: '1.4rem', textAlign: 'center' }}
          component="h1"
        >
          {title}

        </Typography>
        <Typography
          sx={{
            textAlign: 'center',
            color: '#939AA3',
            lineHeight: '2',
            fontWidth: '100',
          }}
          component="p"
        >
          {description}
        </Typography>
      </div>
    </div>
  );
}
