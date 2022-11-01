import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Collapse, ListItemButton, ListItemText,
} from '@mui/material';
import { useState } from 'react';
import './style.css';

export default function ProfileInbox({
  children,
  primaryText,
  secondaryText,
}: { children: JSX.Element, secondaryText: string, primaryText: string }) {
  const [open, setOpen] = useState<boolean>(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className="profile_basic">
      <ListItemButton onClick={handleClick}>
        <ListItemText primary={primaryText} />
        <ListItemText secondary={secondaryText} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse className="collapse" in={open} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </div>
  );
}
