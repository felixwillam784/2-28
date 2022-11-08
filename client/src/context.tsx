import {
  createContext, useEffect, useMemo, useState,
} from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import {
  UserContextType, UserContextTypeWithDispatch, SnackBarContextType,
  SnackBarContextTypeWithDispatch,
} from './interfaces';
import httpInstance from './services/axiosConfig';
import CustomizedSnackbars from './components/snackbar';

export const UserContext = createContext<UserContextTypeWithDispatch>({
  userInfo: {
    id: 0, email: '', username: '', role: '',
  },
  setUserInfo: () => ({
    id: 0, email: '', username: '', role: '',
  }),
});

export default function UserInfoProvider({ children }:any) {
  const [userInfo, setUserInfo] = useState<UserContextType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const result = await httpInstance.get('/auth/user');
        setUserInfo(result.data);
        setLoading(false);
      } catch (error) {
        setUserInfo(null);
        setLoading(false);
      }
    };
    getUserInfo();
  }, []);

  const value = useMemo(() => ({
    userInfo, setUserInfo,
  }), [userInfo]);

  if (loading) {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }
  return (
    <UserContext.Provider value={value}>
      { children }
    </UserContext.Provider>
  );
}

export const SnackBarContext = createContext<SnackBarContextTypeWithDispatch>({
  snackBarProperties:
  { open: false, message: '', type: 'error' },
  setSnackBarProperties: () => ({ open: false, message: '', type: 'error' }),
});

export function SnackBarProvider({ children }:any) {
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
