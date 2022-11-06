import { Chip, Paper, Typography } from '@mui/material';
import './style.css';

export default function SellRequest({ model, time, state }:{ model:string, time:string, state:string }) {
  return (
    <div className="sell_row_container">
      <Paper
        className="sell_row"
        elevation={1}
      >
        <Typography component="h2">
          {model}
        </Typography>
        <Typography component="p">
          {time}
        </Typography>
        <Chip sx={{ color: 'var(--text-color)' }} className={state} label={state} variant="outlined" />
      </Paper>
    </div>

  );
}
