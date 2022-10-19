/* eslint-disable react/jsx-props-no-spreading */
import {
  Autocomplete, TextField, Switch, Slider, FormControlLabel,
} from '@mui/material';
import {
  useState, SetStateAction, useEffect,
} from 'react';
import { useLocation } from 'react-router-dom';
import brands from '../../brands.json';
import models from '../../models.json';

import './style.css';

const mileRang = [
  {
    value: 0,
    label: '0',
  },
  {
    value: 25,
    label: '250K',
  },
  {
    value: 50,
    label: '500K',
  },
  {
    value: 75,
    label: '750K',
  },
  {
    value: 100,
    label: '1M',
  },
];

const cars = [
  {
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
    customerId: 1,
  },
  {
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
    customerId: 2,
  },
  {
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
    customerId: 3,
  },
  {
    brand: 'Infiniti',
    model: 'QX70 3.7L V6',
    price: 16500,
    year: 2015,
    mileage: 191000,
    quality: 70,
    isGoodPrice: false,
    location: 'palestine - gaza',
    state: 'under-check',
    transmission: 'auto',
    features: [
      'Navigation',
      'Bluetooth',
      'Brake assist',
      'Collision warning system',
      'Auto dimming mirror',
      'Headsup display',
      'Automated Parking',
      'Adaptive cruis control',
    ],
    description: '',
    fuel: 'petrol',
    customerId: 2,
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars

const getYears = ():Array<string> => {
  const yearsArr = [];
  const yearNow = new Date().getFullYear();

  for (let i = 1990; i <= yearNow; i += 1) {
    yearsArr.push(`${i}`);
  }
  return yearsArr;
};

function CarsFilter() {
  const { state } = useLocation();

  const [brand, setBrand] = useState(state.brand);
  const [model, setModel] = useState('');
  const [mileage, setMileage] = useState(100000);
  const [year, setYear] = useState(null);
  const [fuel, setFuel] = useState('');
  const [maxPrice, setMaxPrice] = useState(0);
  const [isGoodPrice, setPriceBool] = useState(false);

  const changePriceType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPriceBool(event.target.checked);
  };

  const changeBrand = (e: any, values: SetStateAction<any>) => {
    setBrand(values);
  };
  const changeModel = (e: any, values: SetStateAction<any>) => {
    setModel(values);
  };
  const changeYear = (e: any, values: SetStateAction<any>) => {
    setYear(values);
  };
  const changeMileage = (e: any, values: SetStateAction<any>) => {
    setMileage(values * 10000);
  };
  const changefuelType = (e: React.SyntheticEvent<Element, Event>, values: SetStateAction<any>) => {
    setFuel(values);
  };
  const changeMaxPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    const num = Number(event.target.value);
    setMaxPrice(num);
  };

  useEffect(() => {
    // here we will fetch the data and set it on a props that it defined in parent component
    console.log([...cars]);
  }, [brand, model, mileage, year, fuel, isGoodPrice]);

  return (
    <section className="filter">
      <fieldset className="filters">
        <p className="title">Cars filter</p>
        <Autocomplete
          disablePortal
          id="combo-box"
          onChange={changeBrand}
          options={brands.map((e) => e.brand)}
          defaultValue={state.brand}
          sx={{ width: 250 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Brand"
              value={brand}
            />
          )}
        />
        <Autocomplete
          disablePortal
          id="combo-box"
          onChange={changeModel}
          options={models.map((e) => e.model)}
          sx={{ width: 250 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Model"
              value={model}
            />
          )}
        />
        <Autocomplete
          disablePortal
          id="combo-box"
          options={getYears()}
          onChange={changeYear}
          sx={{ width: 250 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Year"
              value={year}
            />
          )}
        />
        <div style={{ width: 200, margin: 40 }}>
          <span> Max mileage (KM) : </span>
          <Slider
            value={mileage / 10000}
            valueLabelDisplay="auto"
            onChange={changeMileage}
            marks={mileRang}
          />
        </div>
        <Autocomplete
          disablePortal
          id="combo-box"
          options={['diesel', 'petrol']}
          onChange={changefuelType}
          sx={{ width: 250 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Fuel"
              value={fuel}
            />
          )}
        />
        <TextField
          label="Max price"
          sx={{ width: 250 }}
          type="number"
          onChange={changeMaxPrice}
          value={!maxPrice ? '' : maxPrice}
        />
        <FormControlLabel
          value="end"
          control={(
            <Switch
              checked={isGoodPrice}
              color="primary"
              onChange={changePriceType}
              inputProps={{ 'aria-label': 'controlled' }}
            />
)}
          label="Good price"
        />

      </fieldset>
    </section>
  );
}
export default CarsFilter;
