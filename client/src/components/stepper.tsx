import { useEffect, useState, useContext } from 'react';

import {
  Checkbox, Button,
  FormControlLabel, FormHelperText, StepLabel, Step, Stepper, Box,
  Radio, RadioGroup, TextField, Typography, Autocomplete, TextareaAutosize,
} from '@mui/material';

import { useFormik } from 'formik';
import SellCarModal from './sendRequsetModel/Form';
import { checkCarSchema } from '../helpers/validationSchema';
import { featuresArray } from '../assets/data/features';
import { CarWithImages, SnackBarContextTypeWithDispatch } from '../interfaces';
import httpInstance from '../services';
import UploadFiles from './UpLoadImages';
import { SnackBarContext } from '../contexts';

const initialData = {
  id: 0,
  brand: '',
  model: '',
  price: 0,
  year: 0,
  mileage: 0,
  quality: 0,
  isGoodPrice: false,
  location: '',
  state: '',
  transmission: '',
  features: [],
  description: '',
  fuel: '',
  createdAt: '',
  updatedAt: '',
  customerId: 2,
  images: [],
};

const convertToKM = (value: number, type: string) => {
  if (type === 'mile') return value * 1.609344;
  return value;
};

function CustomStepper({ id }:{ id:string | undefined }) {
  const [carData, setCarData] = useState<CarWithImages>(initialData);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState<boolean>(true);
  const { setSnackBarProperties }:SnackBarContextTypeWithDispatch = useContext(SnackBarContext);
  const [activeStep, setActiveStep] = useState<number>(0);

  useEffect(() => {
    const getCarInfo = async () => {
      try {
        setLoading(true);
        setSnackBarProperties((preState) => ({ ...preState, open: false }));
        const response = await httpInstance.get(`/cars/${id}`);
        setCarData(response.data[0]);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setSnackBarProperties({ open: true, message: 'something went wrong!', type: 'error' });
      }
    };
    getCarInfo();
  }, []);

  const handleNext = () => {
    setActiveStep((prevState) => prevState + 1);
  };

  const handleBack = () => {
    if (activeStep) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };
  const formik = useFormik({
    initialValues: {
      ...carData, type: '',
    },
    enableReinitialize: true,
    validationSchema: checkCarSchema,
    onSubmit: async (values) => {
      const newValue = Math.floor(convertToKM(values.mileage, values.type));
      // eslint-disable-next-line no-param-reassign
      values.mileage = newValue;
      try {
        setLoading(true);
        setSnackBarProperties((preState) => ({ ...preState, open: false }));
        await httpInstance.put(`/cars/${id}`, values);
        setLoading(false);
        handleNext();
        setSnackBarProperties(
          {
            open: true,
            message: 'Sell car request sent successfully',
            type: 'success',
          },
        );
      } catch (err) {
        setLoading(false);
        setSnackBarProperties({ open: true, message: 'something went wrong!', type: 'error' });
      }
    },
  });

  const steps = [{
    label: 'Car Into',
    component:
  <SellCarModal id={id} modalType="checkRequest" formik={formik}>
    <Box sx={{ width: { sm: '100%', md: '47%' }, marginTop: { sm: '1rem', md: '0' } }}>
      <Typography
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '90%',
          marginBottom: '1rem',
        }}
        component="label"
      >
        Quality
        <TextField
          id="quality"
          name="quality"
          label="quality"
          type="number"
          value={formik.values.quality || 0}
          onChange={formik.handleChange}
          error={formik.touched.quality && Boolean(formik.errors.quality)}
          helperText={formik.touched.quality && formik.errors.quality}
        />
      </Typography>

      <Typography
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: { xs: '100%', ms: '100%', md: '90%' },
          margin: '1rem 0',
        }}
        component="label"
      >
        Transmission
        <Typography
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'end',
            width: '90%',
            margin: '1rem 0',
          }}
          component="div"
        >
          <RadioGroup
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-around',
              flexWrap: 'nowrap',
              width: '15rem',
            }}
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="manual"
            name="transmission"
            onChange={formik.handleChange}
            value={!formik.values.transmission ? '' : formik.values.transmission}
          >
            <FormControlLabel name="transmission" value="manual" control={<Radio />} label="Manual" />
            <FormControlLabel name="transmission" value="automatic" control={<Radio />} label="Automatic" />
          </RadioGroup>
        </Typography>
      </Typography>
      <Typography
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '90%',
          margin: '1rem 0',
        }}
        component="label"
      >
        Fuel
        <Typography
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'end',
            width: '90%',
            margin: '1rem 0',
          }}
          component="div"
        >
          <RadioGroup
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-around',
              flexWrap: 'nowrap',
              width: '15rem',
            }}
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="manual"
            name="fuel"
            onChange={formik.handleChange}
            value={!formik.values.fuel ? '' : formik.values.fuel}
          >
            <FormControlLabel name="fuel" value="petrol" control={<Radio />} label="petrol" />
            <FormControlLabel name="fuel" value="diesel" control={<Radio />} label="diesel" />
          </RadioGroup>
        </Typography>
      </Typography>

      <Typography
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          margin: '1rem 0',
        }}
        component="label"
      >
        <Checkbox
          name="isGoodPrice"
          id="isGoodPrice"
          value={formik.values.isGoodPrice}
          onChange={formik.handleChange}
        />

        Is Good Price
      </Typography>
      <Typography
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '90%',
          marginBottom: '1rem',
        }}
        component="label"
      >
        Description
        <TextareaAutosize
          id="description"
          name="description"
          value={!formik.values.description ? '' : formik.values.description}
          onChange={formik.handleChange}
          style={{
            width: '100%',
            borderRadius: '4px',
            border: '1px solid',
            borderColor:
            formik.touched.description && Boolean(formik.errors.description) ? 'red' : '#80808066',
            marginTop: '1rem',
            minHeight: '3rem',
            padding: '0.2rem',
          }}
        />
        <FormHelperText
          sx={{
            padding: '0 1rem',
          }}
          error
        >
          {formik.touched.description && formik.errors.description}
        </FormHelperText>
      </Typography>
      <Typography
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '90%',
          marginBottom: '1rem',
        }}
        component="label"
      >
        Features
        <Autocomplete
          multiple
          sx={{ marginTop: '1rem' }}
          options={featuresArray}
          getOptionLabel={(option) => option}
          defaultValue={[featuresArray[4]]}
          value={!formik.values.features ? [] : formik.values.features}
          onChange={(eee, values) => {
            formik.setFieldValue('features', [...values]);
          }}
          id="features"
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              name="features"
                  // eslint-disable-next-line react/jsx-props-no-spreading
              {...params}
              error={formik.touched.features && Boolean(formik.errors.features)}
              helperText={formik.touched.features && formik.errors.features}
              label="Features"
            />
          )}
        />
      </Typography>
    </Box>
  </SellCarModal>,

  }, {
    label: 'Upload Images',
    component: <UploadFiles carId={id} />,
  }];

  return (
    <Box sx={{ mb: '1.3rem', width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map(({ label }) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {steps[activeStep].component}
      {activeStep < steps.length ? (
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          {activeStep === 0 ? <> </> : (
            <Button
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
          )}

        </Box>
      ) : (
        <> </>
      )}

    </Box>
  );
}

export default CustomStepper;
