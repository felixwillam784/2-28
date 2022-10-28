import { Chip, Typography } from '@mui/material';
import './style.css';

export default function SellRequest() {
  return (
    <div className="sell_row_container">
      <div className="sell_row">
        <Typography component="h2">
          carName
        </Typography>
        <Typography component="p">
          2022/10/15
        </Typography>
        <Chip sx={{ color: '#FFB502' }} label="pending" variant="outlined" />
      </div>
      <div className="sell_row">
        <Typography component="h2">
          carName
        </Typography>
        <Typography component="p">
          2022/10/15
        </Typography>
        <Chip label="primary" color="primary" variant="outlined" />
      </div>
    </div>

  );
}
