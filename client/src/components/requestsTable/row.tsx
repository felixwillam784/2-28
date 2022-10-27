/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import BadgeIcon from '@mui/icons-material/Badge';
import './style.css';
import { CarWithCustomerInfo } from '../../interfaces';
import CarAdminModel from '../CarAdminModule';

function Row(props:{ car:CarWithCustomerInfo, state:string }) {
  const { car, state } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' }, fontSize: '16px' }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell sx={{ fontSize: '16px' }} component="th" scope="row">
          {car.model}
        </TableCell>
        <TableCell sx={{ fontSize: '16px' }} align="center">{car.brand}</TableCell>
        <TableCell sx={{ fontSize: '16px' }} align="center">{car.year}</TableCell>
        <TableCell sx={{ fontSize: '16px' }} align="center">{car.location}</TableCell>
        <TableCell sx={{ fontSize: '16px' }} align="center">{car.mileage}</TableCell>
        <TableCell sx={{ fontSize: '16px' }} align="center">{car.price}</TableCell>
        <TableCell sx={{ fontSize: '16px' }} align="center">
          { state === 'pending' ? (
            <Button sx={{ marginRight: '0.5rem' }} variant="contained" color="success">
              Accept
            </Button>
          ) : (
            <CarAdminModel />

          )}
          <Button variant="contained" color="error">
            Reject
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          sx={!open ? { border: 'none' } : {}}
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={8}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box className="details-container">
              <Box className="sub1-details-container">
                <Typography className="info-title" variant="subtitle1">
                  Customer information
                </Typography>
                <Box className="sub2-details-container">
                  <Typography variant="body1">
                    -
                    {' '}
                    {car.customer?.fullName}
                  </Typography>
                  <Typography variant="body1">
                    -
                    {' '}
                    {car.customer?.email}
                  </Typography>
                  <Typography variant="body1">
                    -
                    {' '}
                    {car.customer?.phoneNumber}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default Row;
