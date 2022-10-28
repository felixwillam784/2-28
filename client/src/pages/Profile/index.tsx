import { Typography } from '@mui/material';
import ProfileInbox from '../../components/ProfileInbox';
import SellRequest from '../../components/ProfileInbox/SellRequest';
import UpdateSettingForm from '../../components/ProfileInbox/UpdateSettingForm';
import SendRequestModule from '../../components/sendRequsetModel';
import './styles.css';

function Profile() {
  return (
    <div className="profile_container">
      <header className="profile_header">
        <Typography component="p">
          example@example.com
        </Typography>
        <SendRequestModule />
      </header>
      <section className="over_section">
        <Typography sx={{ fontSize: '20px', color: '#424B5A' }} component="h2">
          Overview
        </Typography>
        <ProfileInbox primaryText="Basic" secondaryText="Change your settings">
          <UpdateSettingForm />
        </ProfileInbox>
        <ProfileInbox primaryText="Sell requests" secondaryText="track your sell requests">
          <SellRequest />
        </ProfileInbox>
      </section>
    </div>
  );
}

export default Profile;
