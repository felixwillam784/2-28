/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context';
import { UserContextTypeWithDispatch } from '../../interfaces';
import httpInstance from '../../services/axiosConfig';
import CustomizedSnackbars from '../snackbar';

const pages = ['HOME', 'HOW IT WORK', 'SHOP', 'CONTACT'];
const settings = ['Profile', 'Logout'];

function NavBar() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { userInfo }:UserContextTypeWithDispatch = useContext(UserContext);
  const [snackBarProperties, setSnackBarProperties] = useState<
  { open:boolean, message:string, type:'success' | 'error' }>({ open: false, message: '', type: 'error' });

  const Navigate = useNavigate();

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBarProperties({ open: false, message: '', type: 'error' });
  };
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleSetting = (setting:string) => {
    console.log(setting);
    if (setting === 'Profile') {
      Navigate('/profile');
    } else if (setting === 'Logout') {
      const logout = async () => {
        try {
          setSnackBarProperties((preState) => ({ ...preState, open: false }));
          const response = await httpInstance.get('auth/logout');
        } catch (err) {
          setSnackBarProperties({ open: true, message: 'something went wrong! Try again.', type: 'error' });
        }
      };
      logout();
    }
  };
  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: '#fff',
        color: 'var(--text-color)',
        boxShadow:
        '0px 2px 4px -1px rgb(0 0 0 / 5%), 0px 4px 5px 0px rgb(0 0 0 / 6%), 0px 1px 10px 0px rgb(0 0 0 / 0%)',
        height: '3.7rem',
      }}
    >
      <Container maxWidth="xl" sx={{ height: '3.7rem' }}>
        <Toolbar disableGutters sx={{ height: { xs: '3.5rem', md: '3.5rem' } }}>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          {/* <Box
            component="img"
            src="https://cdn-icons-png.flaticon.com/512/8085/8085712.png"
            sx={{ width: '2rem', height: 'auto', marginRight: '0.4rem' }}
          /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              fontSize: '27px',
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            GoodCar
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            GoodCar
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, marginLeft: '2rem' }}>
            {pages.map((page) => (
              <Link key={`link${page}`} href="/" sx={{ textDecoration: 'none' }}>
                <Button
                  key={page}
                  component="button"
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    display: 'block',
                    color: 'var(--text-color)',
                    fontFamily: 'var(--font-family)',
                    fontWeight: '400',
                    fontSize: '14px',
                  }}
                >
                  {page}
                </Button>
              </Link>
            ))}
          </Box>

          { userInfo !== null
            ? (
              <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={userInfo.userName.toUpperCase()} src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
                <Typography
                  variant="body1"
                  sx={{ marginLeft: '0.5rem', cursor: 'pointer' }}
                  onClick={handleOpenUserMenu}
                >
                  {` ${userInfo.userName}`}

                </Typography>
                <Menu
                  sx={{ mt: '40px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center" onClick={() => handleSetting(setting)}>{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            ) : (
              <Box sx={{ flexGrow: 0 }}>
                <Link href="/login" sx={{ textDecoration: 'none' }}>
                  <Button
                    variant="text"
                    sx={{
                      color: 'var(--text-color)',
                    }}
                  >
                    Login

                  </Button>
                </Link>
                <Link href="signup" sx={{ textDecoration: 'none' }}>
                  <Button
                    variant="outlined"
                    sx={{
                      borderColor: 'var(--text-color)',
                      color: 'var(--text-color)',
                      ':hover': {
                        backgroundColor: '#2f36430f',
                        borderColor: 'var(--text-color)',
                      },
                    }}
                  >
                    SingUp

                  </Button>
                </Link>
              </Box>
            ) }
        </Toolbar>
      </Container>
      <CustomizedSnackbars
        open={snackBarProperties.open}
        handleClose={handleClose}
        message={snackBarProperties.message}
        type={snackBarProperties.type}
      />
    </AppBar>
  );
}
export default NavBar;
