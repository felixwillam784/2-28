import {
  SetStateAction, useEffect, useState, useContext,
} from 'react';
import { useLocation } from 'react-router-dom';
import { SnackBarContext } from '../contexts';
import {
  CarsFilterProps, CarsWithImagesData, Params, SnackBarContextTypeWithDispatch,
} from '../interfaces';
import httpInstance from '../services';

export default function useFIlter({
  setCars, setPagination, setLoading, currentPage, search,
  setCurrentPAge,
}:CarsFilterProps) {
  const { state } = useLocation();

  const [brand, setBrand] = useState<string>(state?.brand || '');
  const [mileage, setMileage] = useState<number | number[] >(0);
  const [year, setYear] = useState<string | null>(null);
  const [fuel, setFuel] = useState<string | null>('');
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [isGoodPrice, setPriceBool] = useState<boolean>(false);
  const { setSnackBarProperties }:SnackBarContextTypeWithDispatch = useContext(SnackBarContext);

  const changePriceType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPriceBool(event.target.checked);
  };

  const changeBrand = (
    event: React.SyntheticEvent<Element, Event>,
    value: SetStateAction<string>,
  ) => {
    setBrand(value);
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
    setMileage(value);
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
        setSnackBarProperties((preState) => ({ ...preState, open: false }));
        const response: CarsWithImagesData = await httpInstance.get('/cars?', { params });
        setCars(response.data.rows);
        setPagination(response.data.count);
        if (Math.ceil(response.data.count / 9) < currentPage) {
          setCurrentPAge(1);
        }
        setLoading(false);
      } catch (error) {
        setSnackBarProperties({ open: true, message: 'something went wrong!', type: 'error' });
      }
    };
    getCars();
  }, [brand, mileage, year, fuel, isGoodPrice, currentPage, search, maxPrice]);
  return {
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
  };
}
