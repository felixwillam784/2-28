import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import Row from './row';
import { SnackBarContext } from '../../contexts';

import {
  Params, CarsWithCustomerData, CarsWithCustomerRow, CarWithCustomerInfo,
  SnackBarContextTypeWithDispatch,
} from '../../interfaces';
import { TableSkeleton } from '../skeletons';
import httpInstance from '../../services/axiosConfig';

type Props = {
  state : string
};

// eslint-disable-next-line react/no-array-index-key
const skeletonRows = Array(10).map((ele, index) => (<TableSkeleton key={`skeletonRows${index}`} />));

function RequestsTable(props:Props) {
  const { state } = props;
  const [carsData, setCarsData] = useState<CarsWithCustomerRow | [] >([]);
  const [page, setPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const { setSnackBarProperties }:SnackBarContextTypeWithDispatch = useContext(SnackBarContext);

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  useEffect(() => {
    const params:Params = { state, page };

    const getCarsWrap = async () => {
      try {
        setSnackBarProperties((preState) => ({ ...preState, open: false }));
        setLoading(true);
        const response: CarsWithCustomerData = await httpInstance.get('/cars/dashboard?', { params });
        setCarsData(response.data.rows);
        setPageCount(Math.ceil(response.data.count / 10));
        setLoading(false);
      } catch (err) {
        setSnackBarProperties({ open: true, message: 'something went wrong!', type: 'error' });
      }
    };
    getCarsWrap();
  }, [state, page]);

  return (
    <Box>
      <TableContainer sx={{ width: '100%' }} component={Paper} elevation={2}>
        <Table aria-label="collapsible table">
          <TableHead sx={{ backgroundColor: '#d4d3d36b' }}>
            <TableRow>
              <TableCell />
              <TableCell sx={{ fontSize: '20px' }}>Brand</TableCell>
              <TableCell sx={{ fontSize: '20px' }} align="center">Model</TableCell>
              <TableCell sx={{ fontSize: '20px' }} align="center">Year</TableCell>
              <TableCell sx={{ fontSize: '20px' }} align="center">Location</TableCell>
              <TableCell sx={{ fontSize: '20px' }} align="center">Mileage(KM)</TableCell>
              <TableCell sx={{ fontSize: '20px' }} align="center">Price($)</TableCell>
              <TableCell align="center" sx={{ fontSize: '20px' }}>Accept/Reject</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading
              ? skeletonRows
              : carsData.map((row:CarWithCustomerInfo) => (
                <Row
                  key={row.id}
                  car={row}
                  state={state}
                  setCarsData={setCarsData}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack sx={{ width: '100%' }} spacing={2}>
        <Pagination onChange={handleChangePage} sx={{ margin: '2rem auto 0 auto' }} count={pageCount} size="large" />
      </Stack>
    </Box>
  );
}

export default RequestsTable;
