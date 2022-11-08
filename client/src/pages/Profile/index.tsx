import { useContext, useEffect, useState } from 'react';
import {
  Paper, Avatar, Box, Typography,
} from '@mui/material';
import ProfileInbox from '../../components/ProfileInbox';
import SellRequest from '../../components/ProfileInbox/SellRequest';
import { SnackBarContext, UserContext } from '../../contexts';
import {
  SnackBarContextTypeWithDispatch,
  UserContextTypeWithDispatch, UserSellRequest, UserSellRequestsResponse,
} from '../../interfaces';
import './style.css';
import httpInstance from '../../services';

function Profile() {
  const { userInfo }:UserContextTypeWithDispatch = useContext(UserContext);
  const { setSnackBarProperties }:SnackBarContextTypeWithDispatch = useContext(SnackBarContext);
  const [SellRequestData, setSellRequestData] = useState<UserSellRequest[]>([]);
  useEffect(() => {
    const getSellRequests = async () => {
      try {
        setSnackBarProperties((preState) => ({ ...preState, open: false }));
        const response:UserSellRequestsResponse = await httpInstance.get('/cars/user');
        setSellRequestData(response.data);
      } catch (err) {
        setSnackBarProperties({ open: true, message: 'something went wrong!', type: 'error' });
      }
    };
    getSellRequests();
  }, []);

  return (
    <Box className="profile-container">
      <Box className="user-info-container">
        <Avatar
          className="avatar"
          alt={userInfo?.username.toUpperCase()}
          src="/static/images/avatar/2.jpg"
        />
        <Typography
          variant="body1"
          className="user-name"
        >
          {`${userInfo?.username}`}
        </Typography>
        <Typography
          variant="body1"
          className="user-email"
        >
          {`${userInfo?.email}`}
        </Typography>
      </Box>
      <Paper
        elevation={3}
        className="sell-requests"
        sx={{
          width: { sm: '600px' },
        }}
      >
        <ProfileInbox
          primaryText="Sell requests"
          secondaryText="track your sell requests"
        >
          {SellRequestData.map((request:UserSellRequest) => (
            <SellRequest
              key={`${request.model}${request.createdAt}`}
              model={request.model}
              time={request.createdAt.split('T')[0]}
              state={request.state}
            />
          ))}
        </ProfileInbox>
      </Paper>
    </Box>

  );
}

export default Profile;
