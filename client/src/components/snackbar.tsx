import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((
  props,
  ref,
// eslint-disable-next-line react/jsx-props-no-spreading
) => <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />);

interface Snackbars {
  open: boolean,
  handleClose: (event?: React.SyntheticEvent | Event, reason?: string) => void,
  message:string,
  type:'error' | 'success' | 'info'
}
export default function CustomizedSnackbars({
  open, handleClose, message, type,
}:Snackbars) {
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} sx={{ width: '100%' }} severity={type}>{message}</Alert>
      </Snackbar>
    </Stack>
  );
}
