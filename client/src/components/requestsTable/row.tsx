/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
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
import { CarsWithCustomerRow, CarWithCustomerInfo } from '../../interfaces';
import CustomizedSnackbars from '../snackbar';

type Props = { car:CarWithCustomerInfo, state:string,
  setCarsData:React.Dispatch<React.SetStateAction<CarsWithCustomerRow>>,
  setOpenSnackBar:React.Dispatch<React.SetStateAction<boolean>>,
  setSnackbarMessage:React.Dispatch<React.SetStateAction<string>>,
  setSnackbarType:React.Dispatch<React.SetStateAction<'success' | 'error'>>,
};

function Row(props:Props) {
  const {
    car, state, setCarsData, setOpenSnackBar, setSnackbarMessage, setSnackbarType,
  } = props;
  const [open, setOpen] = useState(false);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackBar(false);
  };

  const handleReject = async (id:number) => {
    try {
      setOpenSnackBar(false);
      const response = await httpInstance.delete(`/cars/${id}`);
      setCarsData((prevState) => prevState.filter(((element) => element.id !== car.id)));
      setSnackbarMessage('Reject request successfully');
      setSnackbarType('success');
      setOpenSnackBar(true);
    } catch (err) {
      setSnackbarMessage('something went wrong!');
      setSnackbarType('error');
      setOpenSnackBar(true);
    }
  };

  const handleAccept = async (id:number) => {
    try {
      setOpenSnackBar(false);
      const response = await httpInstance.put(`/cars/${id}`, { state: 'under-check' });
      setCarsData((prevState) => prevState.filter(((element) => element.id !== car.id)));
      setSnackbarMessage('Accept request successfully');
      setSnackbarType('success');
      setOpenSnackBar(true);
    } catch (err) {
      setSnackbarMessage('something went wrong!');
      setSnackbarType('error');
      setOpenSnackBar(true);
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
          )
            : (
              <Button sx={{ marginRight: '0.5rem' }} variant="contained" color="success">
                Check
              </Button>
            )}

          <Button onClick={() => handleReject(car.id)} variant="contained" color="error">
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
