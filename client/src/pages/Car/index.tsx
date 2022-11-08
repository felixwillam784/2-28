import './style.css';
import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import CarInfo from '../../components/CarInfoSection';
import CarSlider from '../../components/CarSlider';
import httpInstance from '../../services/index';
import { CarWithImages, SnackBarContextTypeWithDispatch } from '../../interfaces';
import CarNotFound from '../../components/CarNotFound';
import { SnackBarContext } from '../../contexts';

function Car() {
  const [carInfo, setCarInfo] = useState<CarWithImages>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { setSnackBarProperties }:SnackBarContextTypeWithDispatch = useContext(SnackBarContext);

  const { id } = useParams();
  useEffect(() => {
    const getCarInfo = async () => {
      try {
        setSnackBarProperties((preState) => ({ ...preState, open: false }));
        setIsLoading(true);
        const response = await httpInstance.get(`/cars/${id}`);
        setCarInfo(response.data[0]);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setSnackBarProperties({ open: true, message: 'something went wrong!', type: 'error' });
      }
    };
    getCarInfo();
  }, [id]);
  if (isLoading) {
    return (
      <CircularProgress className="progress" />
    );
  }
  if (!carInfo) {
    return (
      <CarNotFound />
    );
  }
  return (
    <>
      <CarSlider carImages={carInfo.images} />
      <CarInfo carInfo={carInfo} />
    </>
  );
}

export default Car;
