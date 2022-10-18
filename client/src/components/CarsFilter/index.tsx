/* eslint-disable react/jsx-props-no-spreading */
import {
  Autocomplete, TextField, Switch, Slider,
} from '@mui/material';
import {
  useState, SetStateAction, useEffect,
} from 'react';
import './style.css';

function CarsFilter() {
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
  const brands = ['Toyota',
    'BMW',
    'Mercedes',
    'Range Rover',
    'Porsche',
    'Nissan',
    'Hyundai',
    'Volkswagen',
    'Mitsubishi',
    'Kia',
    'Lexus',
    'MG',
    'Tesla',
    'Ford',
    'Audi',
    'Jeep',
    'Lamborghini',
    'Infiniti'];
  const models = ['Land Cruiser VXR 4.0L V6',
    'X6 M - Sport', 'GLC300 2.0L I4 TC',
    'Sport HSE 3.0L Supercharged V6',
    'Boxster S',
    'Patrol 4.0L V6',
    'SantaFe 3.3L V.6',
    'Jetta 2.0L I4',
    'Montero Sport 3.0 L V6',
    'Optima 2.0L I4',
    'IS350 3.5L V6', 'HS 2.0L TC I4',
    'Model Y Standard',
    'Mustang 2.3L i4 EcoBoost',
    'A8 6.3L W12',
    'Wrangler 3.6L V6', 'Huracan 5.2 V10',
    'QX70 3.7L V6'];
    /* const getArray = (array: Array<any>) => {
      const newArray = array.map((c) => c.model).sort(
        (a, b) => b - a,
      );
      console.log(newArray);
    };
    getArray(data); */

  const getYears = ():Array<string> => {
    const arrayYears = [];
    const yearNow = new Date().getFullYear();

    for (let i = 1990; i <= yearNow; i += 1) {
      arrayYears.push(`${i}`);
    }
    return arrayYears;
  };
  const [data, setData] = useState([...cars]);
  const [model, setModel] = useState('');
  const [mileage, setMileage] = useState(100000);
  const [year, setYear] = useState(null);
  const [fuel, setFuel] = useState('');
  const [maxPrice, setMaxPrice] = useState(0);
  const [isGoodPrice, setPriceBool] = useState(false);

  /* const getOptions = (carsArray :Array<any>, filter :string) => {
    if (filter === 'year' || filter === 'mileage') {
      return carsArray.map((c) => c[filter].toString()).sort(
        (a, b) => -b.localeCompare(a),
      );
    }
    return carsArray.map((c) => c[filter]).sort(
      (a, b) => b - a,
    );
    } */
  const changePriceType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPriceBool(event.target.checked);
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
    setData(data);
    console.log(data);
  }, [model, mileage, year, fuel, isGoodPrice]);

  console.log(model, mileage, isGoodPrice, fuel, maxPrice);

  return (
    <section className="filter">
      <fieldset>
        <legend>Cars Filter</legend>
        {' '}
        <Autocomplete
          disablePortal
          id="combo-box"
          onChange={changeModel}
          options={models}
          sx={{ width: 250 }}
          renderInput={(params :any) => (
            <TextField
              {...params}
              label="Model"
              value={model}
            />
          )}
        />
        {' '}
        <Autocomplete
          disablePortal
          id="combo-box"
          options={getYears()}
          onChange={changeYear}
          sx={{ width: 250 }}
          renderInput={(params :any) => (
            <TextField
              {...params}
              label="Year"
              value={year}
            />
          )}
        />
        <div style={{ width: 200, margin: 40 }}>
          <span> Max mileage (KM) : </span>
          {' '}
          <Slider
            value={mileage / 10000}
            valueLabelDisplay="auto"
            onChange={changeMileage}
            marks={mileRang}
          />
        </div>
        {' '}
        <Autocomplete
          disablePortal
          id="combo-box"
          options={['diesel', 'petrol']}
          onChange={changefuelType}
          sx={{ width: 250 }}
          renderInput={(params :any) => (
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
        {' '}
        <Switch
          checked={isGoodPrice}
          onChange={changePriceType}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </fieldset>
    </section>
  );
}
export default CarsFilter;
