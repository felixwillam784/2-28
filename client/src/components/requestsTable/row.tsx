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
import httpInstance from '../../services/axiosConfig';
import './style.css';
import { RowProps, CarWithCustomerInfo } from '../../interfaces';
import CarAdminModel from '../CarAdminModule';

function Row(props:RowProps) {
  const {
    car, state, setCarsData, setSnackBarProperties,
  } = props;
  const [open, setOpen] = useState(false);

  const deleteCar = async (id:number) => {
    try {
      setSnackBarProperties((preState) => ({ ...preState, open: false }));
      const response = await httpInstance.delete(`/cars/${id}`);
      setCarsData((prevState) => prevState.filter(((element) => element.id !== id)));
      setSnackBarProperties({ open: true, message: 'Sell request deleted successfully', type: 'success' });
    } catch (err) {
      setSnackBarProperties({ open: true, message: 'something went wrong!', type: 'error' });
    }
  };

  const handleAccept = async (id:number) => {
    try {
      setSnackBarProperties((preState) => ({ ...preState, open: false }));
      const response = await httpInstance.put(`/cars/${id}`, { state: 'under-check' });
      setCarsData((prevState) => prevState.filter(((element) => element.id !== id)));
      setSnackBarProperties({ open: true, message: 'Sell request accepted successfully', type: 'success' });
    } catch (err) {
      setSnackBarProperties({ open: true, message: 'something went wrong!', type: 'error' });
    }
  };

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
            <Button
              onClick={() => handleAccept(car.id)}
              sx={{ marginRight: '0.5rem' }}
              variant="contained"
              color="success"
            >
              Accept
            </Button>
          ) : (
            <CarAdminModel id={car.id} />

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
