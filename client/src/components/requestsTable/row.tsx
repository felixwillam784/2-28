/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import httpInstance from '../../services/axiosConfig';
import './style.css';
import { RowProps, SnackBarContextTypeWithDispatch } from '../../interfaces';
import { SnackBarContext } from '../../contexts';

function Row(props:RowProps) {
  const {
    car, state, setCarsData,
  } = props;
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { setSnackBarProperties }:SnackBarContextTypeWithDispatch = useContext(SnackBarContext);

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
        <TableCell className="cell" component="th" scope="row">{car.brand}</TableCell>
        <TableCell className="cell">{car.model}</TableCell>
        <TableCell className="cell">{car.year}</TableCell>
        <TableCell className="cell">{car.location}</TableCell>
        <TableCell className="cell">{car.mileage}</TableCell>
        <TableCell className="cell">{car.price}</TableCell>
        <TableCell className="cell">
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
            <Button
              onClick={() => navigate(`check/${car.id}`)}
              sx={{ marginRight: '0.5rem' }}
              variant="contained"
              color="success"
            >
              Check
            </Button>

          )}
          <Button
            variant="contained"
            color="error"
            onClick={() => deleteCar(car.id)}
          >
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
