import {
  createContext, useMemo, useState,
} from 'react';
import {
  SnackBarContextType,
  SnackBarContextTypeWithDispatch,
} from '../interfaces';
import CustomizedSnackbars from '../components/snackbar';

export const SnackBarContext = createContext<SnackBarContextTypeWithDispatch>({
  snackBarProperties:
    { open: false, message: '', type: 'error' },
  setSnackBarProperties: () => ({ open: false, message: '', type: 'error' }),
});

type Props = {
  children :JSX.Element
};

export default function SnackBarProvider({ children }:Props) {
  const [snackBarProperties, setSnackBarProperties] = useState<SnackBarContextType>(
    { open: false, message: '', type: 'error' },
  );

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBarProperties((preState) => ({ ...preState, open: false }));
  };
  const value = useMemo(() => ({
    snackBarProperties, setSnackBarProperties,
  }), [snackBarProperties]);

  return (
    <SnackBarContext.Provider value={value}>
      { children }
      <CustomizedSnackbars
        open={snackBarProperties.open}
        handleClose={handleClose}
        message={snackBarProperties.message}
        type={snackBarProperties.type}
      />
    </SnackBarContext.Provider>
  );
}
