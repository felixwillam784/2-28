/* eslint-disable react/jsx-props-no-spreading */
import {
  Autocomplete, TextField, Switch, Slider, FormControlLabel,
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import brands from '../../assets/data/brands.json';
import models from '../../assets/data/models.json';
import useFIlter from '../../Hooks/UseFIlter';
import { CarsFilterProps } from '../../interfaces';
import CustomizedSnackbars from '../snackbar';

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

function CarsFilter({
  setCars, setPagination, setLoading, currentPage, search,
  setCurrentPAge,
}:CarsFilterProps) {
  const { state } = useLocation();
  const {
    brand,
    model,
    mileage,
    year,
    fuel,
    maxPrice,
    isGoodPrice,
    openSnackBar,
    handleClose,
    changePriceType,
    changeBrand,
    changeModel,
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
            value={+mileage / 10000}
            valueLabelDisplay="auto"
            onChange={changeMileage}
            marks={mileRang}
          />
        </div>
        <CustomizedSnackbars
          open={openSnackBar}
          handleClose={handleClose}
          message="something went wrong"
          type="error"
        />
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
