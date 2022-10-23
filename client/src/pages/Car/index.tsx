import './style.css';
import CarInfo from '../../components/CarInfoSection';
import CarSlider from '../../components/CarSlider';

function Car() {
  const testInfo = {
    id: 1,
    brand: 'Toyota',
    model: 'Land Cruiser VXR 4.0L V6',
    price: 48000,
    year: 2022,
    mileage: 36000,
    quality: 95,
    isGoodPrice: true,
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
    description: '',
    fuel: 'diesel',
    createdAt: '2022-10-17T08:26:03.560Z',
    updatedAt: '2022-10-17T08:26:03.560Z',
    customerId: 1,
  };

  return (
    <>
      <CarSlider />
      <CarInfo carInfo={testInfo} />
    </>
  );
}

export default Car;
