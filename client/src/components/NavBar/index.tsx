import { useState, useContext } from 'react';
import {
  AppBar, Toolbar, Box, IconButton, Typography,
  Menu, Container, Avatar, Button, Tooltip, MenuItem,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
// import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate, NavLink, useLocation } from 'react-router-dom';
import Images from '../../assets/index';
import { SnackBarContext, UserContext } from '../../contexts';
import { SnackBarContextTypeWithDispatch, UserContextTypeWithDispatch } from '../../interfaces';
import httpInstance from '../../services/axiosConfig';
import SendRequestModule from '../sendRequsetModel';

function NavBar() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { userInfo, setUserInfo }: UserContextTypeWithDispatch = useContext(UserContext);
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleCloseSell = () => setOpen(false);
  const { setSnackBarProperties }: SnackBarContextTypeWithDispatch = useContext(SnackBarContext);

  const pages = userInfo?.role.toLowerCase() === 'admin'
    ? [{ title: 'HOME', path: '' }, { title: 'Dashboard', path: 'admin' }, { title: 'Market', path: 'cars' }]
    : [{ title: 'HOME', path: '' }, { title: 'Buy car', path: 'cars' }];

  const settings = userInfo?.role.toLowerCase() === 'admin'
    ? []
    : [{ title: 'Profile', path: 'profile' }];

  const navigate = useNavigate();

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

  const handleSetting = (setting: string) => {
    if (setting === 'Profile') {
      navigate('/profile');
    }
  };
  const handleLogout = async () => {
    try {
      setSnackBarProperties((preState) => ({ ...preState, open: false }));
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await httpInstance.get('auth/logout');
      setUserInfo(null);
    } catch (err) {
      setSnackBarProperties({ open: true, message: 'something went wrong! Try again.', type: 'error' });
    }
    navigate('/login');
  };
  const location = pathname.slice(1);
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
        <Toolbar disableGutters sx={{ height: '64px' }}>
          <NavLink to="/">
            <Box
              component="img"
              src={Images.logo}
              alt="logo"
              sx={{
                display: { xs: 'none', md: 'flex' },
                width: '170px',
              }}
            />
          </NavLink>

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
                <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                  <NavLink to={page.path}>{page.title}</NavLink>
                </MenuItem>
              ))}
              <MenuItem onClick={handleCloseNavMenu}>

                {userInfo?.role === 'admin' ? null : (
                  <Button
                    component="button"
                    onClick={() => {
                      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                      userInfo?.role === 'user' ? handleOpen() : navigate('/login');
                    }}
                    sx={{
                      display: 'block',
                      color: 'var(--text-color)',
                      fontFamily: 'var(--font-family)',
                      fontWeight: '500',
                      fontSize: '14px',
                      marginBottom: '0.1rem',
                      paddingLeft: '0.1rem',
                      marginTop: '-0.5rem',
                    }}
                  >
                    Sell Car
                  </Button>
                )}
              </MenuItem>
            </Menu>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 1, mr: 2 }}>
            <NavLink to="/">
              <Box
                component="img"
                src={Images.logo}
                alt="logo"
                sx={{
                  width: '160px',
                  margin: '0 auto',
                  marginTop: '0.6rem',
                }}
              />
            </NavLink>
          </Box>

          <Box sx={{
            flexGrow: 1,
            display: { xs: 'none', md: 'flex' },
            marginLeft: '2rem',
            alignItems: { md: 'center' },
          }}
          >
            {pages.map((page) => (
              <NavLink
                key={`link${page.title}`}
                to={page.path}
                end
                style={
                  ({ isActive }) => (isActive ? {
                    borderBottom: '2px solid black',
                    textDecoration: 'none',
                  }
                    : { borderBottom: 'none', textDecoration: 'none' })
                }
              >
                <Button
                  key={page.title}
                  component="button"
                  onClick={handleCloseNavMenu}
                  sx={{
                    display: 'block',
                    color: 'var(--text-color)',
                    fontFamily: 'var(--font-family)',
                    fontWeight: '500',
                    fontSize: '14px',
                    marginBottom: '0.1rem',
                    lineHeight: '2.75',
                  }}
                >
                  {page.title}
                </Button>
              </NavLink>
            ))}

            {userInfo?.role === 'admin' ? null : (
              <>
                <Button
                  component="button"
                  onClick={() => {
                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                    userInfo?.role === 'user' ? handleOpen() : navigate('/login');
                  }}
                  sx={{
                    display: 'block',
                    color: 'var(--text-color)',
                    fontFamily: 'var(--font-family)',
                    fontWeight: '500',
                    fontSize: '14px',
                    marginBottom: '0.1rem',
                    lineHeight: '2.75',
                  }}
                >
                  Sell Car
                </Button>
                <SendRequestModule open={open} handleClose={handleCloseSell} />
              </>
            )}
          </Box>

          {(userInfo === null) ? (

            <Box sx={{ flexGrow: 0, display: 'flex', flexWrap: 'no-wrap' }}>
              {location !== 'login' && location !== 'admin/login' && (
                <NavLink to="login" style={{ textDecoration: 'none' }}>
                  <Button
                    variant="text"
                    sx={{
                      color: 'var(--text-color)',
                    }}
                  >
                    Login

                  </Button>
                </NavLink>

              )}
              {location !== 'signup' && location !== 'admin/login' && (
                <NavLink to="signup" style={{ textDecoration: 'none' }}>
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
                </NavLink>
              )}
            </Box>
          )
            : (
              <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={userInfo.username.toUpperCase()} src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
                <Typography
                  variant="body1"
                  sx={{ marginLeft: '0.5rem', cursor: 'pointer', display: { xs: 'none', md: 'block' } }}
                  onClick={handleOpenUserMenu}
                >
                  {` ${userInfo.username}`}

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
                    <MenuItem key={setting.title} onClick={handleCloseUserMenu}>
                      <Button
                        variant="text"
                        sx={{
                          textAlign: 'center',
                          color: 'var(--text-color)',
                          ':hover': { backgroundColor: 'transparent' },
                          textTransform: 'capitalize',
                        }}
                        onClick={() => handleSetting(setting.title)}
                      >
                        {setting.title}
                      </Button>
                    </MenuItem>
                  ))}
                  <MenuItem key="logout" onClick={handleCloseUserMenu}>
                    <Button
                      variant="text"
                      sx={{
                        textAlign: 'center',
                        color: 'var(--text-color)',
                        ':hover': { backgroundColor: 'transparent' },
                        textTransform: 'capitalize',
                      }}
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </MenuItem>
                </Menu>
              </Box>
            )}

        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
