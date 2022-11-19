/* eslint-disable react/jsx-props-no-spreading */
import {
  Autocomplete, TextField, Switch, Slider, FormControlLabel,
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import brands from '../../assets/data/brands.json';
import useFIlter from '../../Hooks/UseFIlter';
import { CarsFilterProps } from '../../interfaces';

import './style.css';

const getYears = ():Array<string> => {
  const yearsArr = [];
  const yearNow = new Date().getFullYear();

  for (let i = 1990; i <= yearNow; i += 1) {
    yearsArr.push(`${i}`);
  }
  return yearsArr;
};

function CarsFilter({
  setCars, setPagination, setLoading, currentPage, search,
  setCurrentPAge,
}:CarsFilterProps) {
  const { state } = useLocation();
  const {
    brand,
    mileage,
    year,
    fuel,
    maxPrice,
    isGoodPrice,
    changePriceType,
    changeBrand,
    changeYear,
    changeMileage,
    changefuelType,
    changeMaxPrice,
  } = useFIlter({
    setCars,
    setPagination,
    setLoading,
    currentPage,
    search,
    setCurrentPAge,
  });
  return (
    <section className="filter">
      <fieldset className="filters">
        <p className="title">Cars filter</p>
        <Autocomplete
          disablePortal
          id="combo-box"
          onChange={changeBrand}
          options={brands.map((e) => e.brand)}
          defaultValue={state?.brand || null}
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
            value={mileage}
            valueLabelDisplay="auto"
            onChange={changeMileage}
            max={1000000}
            min={10000}
            step={10000}
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
