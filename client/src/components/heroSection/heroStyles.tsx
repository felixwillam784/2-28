import { makeStyles } from '@material-ui/core/styles';
import { createTheme } from '@mui/material';

const useStyles = makeStyles((theme:any) => ({
  container: {
    height: '323px',
    display: 'flex !important',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
    alignItems: 'center',
    // backgroundColor: '#F6F7F9',
  },
  heroSection: {
    position: 'relative',
  },
  heroImage: {
    position: 'absolute',
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
  briefStatement: {
    transform: 'translateX(0)',
    textAlign: 'center',
    width: 'fit-content',
  },
}));

export default useStyles;

export const theme = createTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h4: {
      fontWeight: '600',
      marginBottom: '3px',
      textTransform: 'uppercase',
    },
    subtitle1: {
      fontWeight: '600',
      marginBottom: '3px',
      fontSize: '1rem',
      textTransform: 'uppercase',
    },
  },
});
