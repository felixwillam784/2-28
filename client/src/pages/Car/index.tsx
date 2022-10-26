import './style.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import CarInfo from '../../components/CarInfoSection';
import CarSlider from '../../components/CarSlider';
import httpInstance from '../../services/axiosCongif';
import { CarWithImages } from '../../interfaces';
import CarNotFound from '../../components/CarNotFound';

function Car() {
  const [carInfo, setCarInfo] = useState<CarWithImages>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { id } = useParams();
  useEffect(() => {
    const getCarInfo = async () => {
      setIsLoading(true);
      const response = await httpInstance.get(`/cars/car/${id}`);
      setCarInfo(response.data[0]);
      setIsLoading(false);
      // eslint-disable-next-line no-empty
    };
    getCarInfo();
  }, [id]);
  if (isLoading) return <CircularProgress />;
  if (!carInfo) return <CarNotFound />;
  return (
    <>
      <CarSlider carInfo={carInfo} />
      <CarInfo carInfo={carInfo} />
    </>
  );
}

export default Car;
