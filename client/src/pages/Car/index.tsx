import './style.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import CarInfo from '../../components/CarInfoSection';
import CarSlider from '../../components/CarSlider';
import httpInstance from '../../services/axiosCongif';
import { CarWithImages } from '../../interfaces';
import CarNotFound from '../../components/CarNotFound';
import CustomizedSnackbars from '../../components/snackbar';

function Car() {
  const [carInfo, setCarInfo] = useState<CarWithImages>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [openSnackBar, setOpenSnackBar] = useState<boolean>(false);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackBar(false);
  };
  const { id } = useParams();
  useEffect(() => {
    const getCarInfo = async () => {
      try {
        setIsLoading(true);
        const response = await httpInstance.get(`/cars/${id}`);
        setCarInfo(response.data[0]);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setOpenSnackBar(true);
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
      <>
        <CarNotFound />
        <CustomizedSnackbars
          err="something went wrong"
          open={openSnackBar}
          handleClose={handleClose}
        />
      </>
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
