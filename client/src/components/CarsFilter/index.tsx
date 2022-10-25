/* eslint-disable react/jsx-props-no-spreading */
import {
  Autocomplete, TextField, Switch, Slider, FormControlLabel,
} from '@mui/material';
import {
  useState, useEffect, SetStateAction,
} from 'react';
import { useLocation } from 'react-router-dom';
import brands from '../../assets/data/brands.json';
import models from '../../assets/data/models.json';
import { CarsWithImagesData, CarsFilterProps, Params } from '../../interfaces';
import httpInstance from '../../services/axiosCongif';
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

  const [brand, setBrand] = useState<string>(state?.brand || '');
  const [model, setModel] = useState<string | null>('');
  const [mileage, setMileage] = useState<number | number[] >(0);
  const [year, setYear] = useState<string | null>(null);
  const [fuel, setFuel] = useState<string | null>('');
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [isGoodPrice, setPriceBool] = useState<boolean>(false);
  const [openSnackBar, setOpenSnackBar] = useState<boolean>(false);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackBar(false);
  };

  const changePriceType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPriceBool(event.target.checked);
  };

  const changeBrand = (
    event: React.SyntheticEvent<Element, Event>,
    value: SetStateAction<string>,
  ) => {
    setBrand(value);
  };
  const changeModel = (
    event: React.SyntheticEvent<Element, Event>,
    value: string | null,
  ) => {
    setModel(value);
  };
  const changeYear = (
    event: React.SyntheticEvent<Element, Event>,
    value: string | null,
  ) => {
    setYear(value);
  };
  const changeMileage = (
    event: Event,
    value: number | number[],
  ) => {
    setMileage(+value * 10000);
  };
  const changefuelType = (
    event: React.SyntheticEvent<Element, Event>,
    value: SetStateAction<string | null>,
  ) => {
    setFuel(value);
  };
  const changeMaxPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    const num = Number(event.target.value);
    setMaxPrice(num);
  };

  useEffect(() => {
    const params:Params = {
      page: currentPage,
      state: 'on-market',
    };
    if (model?.length !== 0 || search.length !== 0) {
      params.model = model || search;
    }
    if (brand?.length !== 0) {
      params.brand = brand;
    }
    if (year?.length !== 0) {
      params.year = year;
    }
    if (fuel?.length !== 0) {
      params.fuel = fuel;
    }
    if (maxPrice > 0) {
      params.maxPrice = maxPrice;
    }
    if (isGoodPrice) {
      params.goodPrice = 1;
    }
    if (mileage !== 0) {
      params.mileage = mileage;
    }
    const getCars = async () => {
      try {
        setLoading(true);
        setOpenSnackBar(false);
        const response: CarsWithImagesData = await httpInstance.get('/cars?', { params });
        setCars(response.data.rows);
        setPagination(response.data.count);
        if (Math.ceil(response.data.count / 9) < currentPage) {
          setCurrentPAge(1);
        }
        setLoading(false);
      } catch (error) {
        setOpenSnackBar(true);
      }
    };
    getCars();
  }, [brand, model, mileage, year, fuel, isGoodPrice, currentPage, search, maxPrice]);

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
          err="something went wrong"
          open={openSnackBar}
          handleClose={handleClose}
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
