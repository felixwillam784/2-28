import { Tune } from '@mui/icons-material';
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { IconButton } from '@mui/material';
import { CarsFilterProps } from '../interfaces';
import CarsFilter from './CarsFilter';

export default function DrawerAppBar(props: CarsFilterProps) {
  const {
    setCars, setPagination, setLoading, currentPage, search,
    setCurrentPAge,
  } = props;
  const [openDrawer, setOpenDrawer] = React.useState<boolean>(false);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown'
        && ((event as React.KeyboardEvent).key === 'Tab'
          || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setOpenDrawer(open);
  };
  const list = (
    <CarsFilter
      setCars={setCars}
      setPagination={setPagination}
      setLoading={setLoading}
      currentPage={currentPage}
      search={search}
      setCurrentPAge={setCurrentPAge}
    />
  );

  return (
    <Box sx={{ padding: '1rem', height: '3rem', position: 'absolute' }}>

      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={toggleDrawer(true)}
        onKeyDown={toggleDrawer(true)}
        sx={{ mr: 2, display: { sm: 'none' }, fontSize: '14px' }}
      >
        <Tune />
        FILTER
      </IconButton>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={toggleDrawer(false)}
      >
        {list}
      </Drawer>

    </Box>
  );
}
