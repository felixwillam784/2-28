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

  const [brand, setBrand] = useState(state?.brand || '');
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
          defaultValue={state?.brand || ''}
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
