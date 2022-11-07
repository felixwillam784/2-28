import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Collapse, ListItemButton, ListItemText, Typography,
} from '@mui/material';
import { useState } from 'react';
import './style.css';

export default function ProfileInbox({
  children,
  primaryText,
  secondaryText,
}: { children: JSX.Element[], secondaryText: string, primaryText: string }) {
  const [open, setOpen] = useState<boolean>(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className="profile_basic">
      <ListItemButton
        disableRipple
        sx={
        {
          '&:hover': { backgroundColor: '#FFF' },
        }
        }
        onClick={handleClick}
      >
        <ListItemText primary={<Typography variant="body1" sx={{ fontWeight: '500' }}>{primaryText}</Typography>} />
        <ListItemText
          sx={{

          }}
          secondary={secondaryText}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse className="collapse" in={open} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </div>
  );
}
