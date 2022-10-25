/* eslint-disable @typescript-eslint/no-unused-vars */
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Row from './row';
import { CarsWithCustomerData, CarWithCustomerInfo } from '../../interfaces';

const carsInfo = {
  msg: 'done!',
  data: {
    count: 18,
    rows: [
      {
        id: 1,
        brand: 'Toyota',
        model: 'Land Cruiser VXR 4.0L V6',
        price: 48000,
        year: 2022,
        mileage: 36000,
        quality: 95,
        isGoodPrice: false,
        location: 'palestine - gaza',
        state: 'on-market',
        transmission: 'auto',
        features: [
          'Rear entertainment screens',
          'Parking sensors',
          'Cruise Control',
          'Steering wheel control',
          'Navigation',
          'Bluetooth',
          'Brake assist',
        ],
        description: 'This car had an accedent in the right side but the quality of the body generally is good',
        fuel: 'diesel',
        createdAt: '2022-10-17T08:26:03.560Z',
        updatedAt: '2022-10-17T08:26:03.560Z',
        customerId: 1,
        customer: {
          id: 1,
          fullName: 'husam',
          email: 'husam@gmail.com',
          password: '$2a$10$H6ecuHzDjK7IVyqJB2pKi.kPPMBDjQI4swryJNJgK0hh8M8BLpsBi',
          phoneNumber: '+9705*46374*9',
          createdAt: '2022-10-17T08:26:03.553Z',
          updatedAt: '2022-10-17T08:26:03.553Z',
        },
      },
      {
        id: 2,
        brand: 'BMW',
        model: 'X6 M - Sport',
        price: 55000,
        year: 2021,
        mileage: 21000,
        quality: 85,
        isGoodPrice: true,
        location: 'palestine - ramallah',
        state: 'on-market',
        transmission: 'manual',
        features: [
          'Reversing Camera',
          'Parking sensors',
          'Collision warning system',
          'Navigation',
        ],
        description: 'This car had an accedent in the left side but the quality of the body generally is good',
        fuel: 'petrol',
        createdAt: '2022-10-17T08:26:03.560Z',
        updatedAt: '2022-10-17T08:26:03.560Z',
        customerId: 2,
        customer: {
          id: 2,
          fullName: 'tariq',
          email: 'tariq@gmail.com',
          password: '$2a$10$H6ecuHzDjK7IVyqJB2pKi.kPPMBDjQI4swryJNJgK0hh8M8BLpsBi',
          phoneNumber: '+9705*4*37469',
          createdAt: '2022-10-17T08:26:03.553Z',
          updatedAt: '2022-10-17T08:26:03.553Z',
        },
      },
      {
        id: 3,
        brand: 'Mercedes',
        model: 'GLC300 2.0L I4 TC',
        price: 58000,
        year: 2021,
        mileage: 15800,
        quality: 90,
        isGoodPrice: true,
        location: 'palestine - alnazreth',
        state: 'on-market',
        transmission: 'auto',
        features: [
          'Rear mirror camera',
          'Brake assist',
          'Reversing Camera',
          'Collision warning system',
          'Navigation',
        ],
        description: 'This car had an accedent in the left side but the quality of the body generally is good',
        fuel: 'petrol',
        createdAt: '2022-10-17T08:26:03.560Z',
        updatedAt: '2022-10-17T08:26:03.560Z',
        customerId: 3,
        customer: {
          id: 3,
          fullName: 'abdo',
          email: 'abdo@gmail.com',
          password: '$2a$10$H6ecuHzDjK7IVyqJB2pKi.kPPMBDjQI4swryJNJgK0hh8M8BLpsBi',
          phoneNumber: '+9705*463*469',
          createdAt: '2022-10-17T08:26:03.553Z',
          updatedAt: '2022-10-17T08:26:03.553Z',
        },
      },
      {
        id: 4,
        brand: 'Range Rover',
        model: 'Sport HSE 3.0L Supercharged V6',
        price: 22000,
        year: 2017,
        mileage: 136000,
        quality: 70,
        isGoodPrice: false,
        location: 'palestine - alqods',
        state: 'on-market',
        transmission: 'manual',
        features: [
          'Parking sensors',
          'Navigation',
          'Premium sound system',
          'Bluetooth',
          'Brake assist',
        ],
        description: 'This car had an accedent in the left side but the quality of the body generally is good',
        fuel: 'petrol',
        createdAt: '2022-10-17T08:26:03.560Z',
        updatedAt: '2022-10-17T08:26:03.560Z',
        customerId: 4,
        customer: {
          id: 4,
          fullName: 'lina',
          email: 'lina@gmail.com',
          password: '$2a$10$H6ecuHzDjK7IVyqJB2pKi.kPPMBDjQI4swryJNJgK0hh8M8BLpsBi',
          phoneNumber: '+9705*4637*69',
          createdAt: '2022-10-17T08:26:03.553Z',
          updatedAt: '2022-10-17T08:26:03.553Z',
        },
      },
      {
        id: 5,
        brand: 'Porsche',
        model: 'Boxster S',
        price: 18000,
        year: 2013,
        mileage: 112000,
        quality: 60,
        isGoodPrice: true,
        location: 'palestine - Rafah',
        state: 'on-market',
        transmission: 'auto',
        features: [
          'Collision warning system',
          'Navigation',
          'Bluetooth',
          'Brake assist',
        ],
        description: 'This car had an accedent in the left side but the quality of the body generally is good',
        fuel: 'petrol',
        createdAt: '2022-10-17T08:26:03.560Z',
        updatedAt: '2022-10-17T08:26:03.560Z',
        customerId: 1,
        customer: {
          id: 1,
          fullName: 'husam',
          email: 'husam@gmail.com',
          password: '$2a$10$H6ecuHzDjK7IVyqJB2pKi.kPPMBDjQI4swryJNJgK0hh8M8BLpsBi',
          phoneNumber: '+9705*46374*9',
          createdAt: '2022-10-17T08:26:03.553Z',
          updatedAt: '2022-10-17T08:26:03.553Z',
        },
      },
      {
        id: 6,
        brand: 'Nissan',
        model: 'Patrol 4.0L V6',
        price: 14000,
        year: 2017,
        mileage: 41000,
        quality: 50,
        isGoodPrice: true,
        location: 'palestine - gaza',
        state: 'on-market',
        transmission: 'manual',
        features: [
          'Navigation',
          'Automated Parking',
          'Adaptive cruis control',
          'Collision warning system',
          'Paddle shifters',
        ],
        description: 'This car had an accedent in the left side but the quality of the body generally is good',
        fuel: 'petrol',
        createdAt: '2022-10-17T08:26:03.560Z',
        updatedAt: '2022-10-17T08:26:03.560Z',
        customerId: 2,
        customer: {
          id: 2,
          fullName: 'tariq',
          email: 'tariq@gmail.com',
          password: '$2a$10$H6ecuHzDjK7IVyqJB2pKi.kPPMBDjQI4swryJNJgK0hh8M8BLpsBi',
          phoneNumber: '+9705*4*37469',
          createdAt: '2022-10-17T08:26:03.553Z',
          updatedAt: '2022-10-17T08:26:03.553Z',
        },
      },
      {
        id: 7,
        brand: 'Hyundai',
        model: 'SantaFe 3.3L V.6',
        price: 16000,
        year: 2014,
        mileage: 69000,
        quality: 80,
        isGoodPrice: true,
        location: 'palestine - alqods',
        state: 'on-market',
        transmission: 'manual',
        features: [
          'Birdseye view camera',
          'Rear mirror camera',
          'Bluetooth',
          'Adaptive cruis control',
          'Digital display',
          'Push Start',
          'Keyless entry',
        ],
        description: 'This car had an accedent in the left side but the quality of the body generally is good',
        fuel: 'petrol',
        createdAt: '2022-10-17T08:26:03.560Z',
        updatedAt: '2022-10-17T08:26:03.560Z',
        customerId: 3,
        customer: {
          id: 3,
          fullName: 'abdo',
          email: 'abdo@gmail.com',
          password: '$2a$10$H6ecuHzDjK7IVyqJB2pKi.kPPMBDjQI4swryJNJgK0hh8M8BLpsBi',
          phoneNumber: '+9705*463*469',
          createdAt: '2022-10-17T08:26:03.553Z',
          updatedAt: '2022-10-17T08:26:03.553Z',
        },
      },
      {
        id: 8,
        brand: 'Volkswagen',
        model: 'Jetta 2.0L I4',
        price: 13000,
        year: 2016,
        mileage: 57000,
        quality: 70,
        isGoodPrice: false,
        location: 'palestine - ramallah',
        state: 'on-market',
        transmission: 'auto',
        features: [
          'Power seats',
          'Automated Parking',
          'Parking sensors',
          'Navigation',
          'Bluetooth',
          'Digital display',
          'Paddle shifters',
          'Apple carplay/ Android',
          'Rear entertainment screens',
          'Premium sound system',
          'Leather Seats',
          'Push Start',
          'Keyless entry',
        ],
        description: 'This car had an accedent in the left side but the quality of the body generally is good',
        fuel: 'petrol',
        createdAt: '2022-10-17T08:26:03.560Z',
        updatedAt: '2022-10-17T08:26:03.560Z',
        customerId: 4,
        customer: {
          id: 4,
          fullName: 'lina',
          email: 'lina@gmail.com',
          password: '$2a$10$H6ecuHzDjK7IVyqJB2pKi.kPPMBDjQI4swryJNJgK0hh8M8BLpsBi',
          phoneNumber: '+9705*4637*69',
          createdAt: '2022-10-17T08:26:03.553Z',
          updatedAt: '2022-10-17T08:26:03.553Z',
        },
      },
      {
        id: 9,
        brand: 'Mitsubishi',
        model: 'Montero Sport 3.0 L V6',
        price: 1400,
        year: 2017,
        mileage: 161000,
        quality: 75,
        isGoodPrice: true,
        location: 'palestine - gaza',
        state: 'on-market',
        transmission: 'auto',
        features: [
          'Automated Parking',
          'Parking sensors',
          'Blind spot moitor',
          'Collision warning system',
          'Cruise Control',
          'Steering wheel control',
          'Auto dimming mirror',
          'Rear entertainment screens',
        ],
        description: 'This car had an accedent in the left side but the quality of the body generally is good',
        fuel: 'petrol',
        createdAt: '2022-10-17T08:26:03.560Z',
        updatedAt: '2022-10-17T08:26:03.560Z',
        customerId: 1,
        customer: {
          id: 1,
          fullName: 'husam',
          email: 'husam@gmail.com',
          password: '$2a$10$H6ecuHzDjK7IVyqJB2pKi.kPPMBDjQI4swryJNJgK0hh8M8BLpsBi',
          phoneNumber: '+9705*46374*9',
          createdAt: '2022-10-17T08:26:03.553Z',
          updatedAt: '2022-10-17T08:26:03.553Z',
        },
      },
    ],
  },
};

type Props = {
  status : string
};

function RequestsTable(props:Props) {
  const { status } = props;
  const [carsData, setCarsData] = useState<CarsWithCustomerData >();
  const [pageCount, setPageCount] = useState<number>(1);
  const [requestsState, setRequestsState] = useState<string>(status);

  useEffect(() => {
    setCarsData(carsInfo);
  }, [requestsState, pageCount]);

  return (
    <Box>
      <TableContainer sx={{ width: '100%' }} component={Paper} elevation={2}>
        <Table aria-label="collapsible table">
          <TableHead sx={{ backgroundColor: '#d4d3d36b' }}>
            <TableRow>
              <TableCell />
              <TableCell sx={{ fontSize: '20px' }}>Model</TableCell>
              <TableCell sx={{ fontSize: '20px' }} align="center">Brand</TableCell>
              <TableCell sx={{ fontSize: '20px' }} align="center">Year</TableCell>
              <TableCell sx={{ fontSize: '20px' }} align="center">Location</TableCell>
              <TableCell sx={{ fontSize: '20px' }} align="center">Mileage(KM)</TableCell>
              <TableCell sx={{ fontSize: '20px' }} align="center">Price($)</TableCell>
              <TableCell align="center" sx={{ fontSize: '20px' }}>Accept/Reject</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {carsData?.data.rows.map((row:CarWithCustomerInfo) => (
              <Row key={row.model} state={requestsState} car={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack sx={{ width: '100%' }} spacing={2}>
        <Pagination sx={{ margin: '2rem auto 0 auto' }} count={pageCount} size="large" />
      </Stack>
    </Box>
  );
}

export default RequestsTable;
