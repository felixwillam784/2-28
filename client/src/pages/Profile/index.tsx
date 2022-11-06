import { useContext } from 'react';
import {
  Paper, Avatar, Box, Typography,
} from '@mui/material';
import ProfileInbox from '../../components/ProfileInbox';
import SellRequest from '../../components/ProfileInbox/SellRequest';
import { UserContext } from '../../context';
import { UserContextTypeWithDispatch } from '../../interfaces';
import './style.css';

function Profile() {
  const { userInfo }:UserContextTypeWithDispatch = useContext(UserContext);
  return (
    <Box className="profile-container">
      <Box className="user-info-container">
        <Avatar
          sx={{
            width: '150px',
            height: '150px',
            fontSize: '50px',
          }}
          alt={userInfo?.username.toUpperCase()}
          src="/static/images/avatar/2.jpg"
        />
        <Typography
          variant="body1"
          className="user-name"
        >
          {`${userInfo?.username}`}
        </Typography>
      </Box>
      <Paper
        elevation={3}
        sx={{
          width: { sm: '600px' }, margin: '0 auto', borderRadius: '10px',
        }}
      >
        <ProfileInbox
          primaryText="Sell requests"
          secondaryText="track your sell requests"
        >
          <SellRequest model="mmmmmmm" time="2020/21/1" state="pending" />
        </ProfileInbox>
      </Paper>
    </Box>

  );
}

export default Profile;
