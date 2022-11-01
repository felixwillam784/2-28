/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from 'react';

import {
  Checkbox, Button,
  FormControlLabel, FormHelperText, StepLabel, Step, Stepper, Box,
  Radio, RadioGroup, TextField, Typography, Autocomplete, TextareaAutosize,
} from '@mui/material';

import { useFormik } from 'formik';
import SellCarModal from './sendRequsetModel/Form';
import { checkCarSchema } from '../helpers/validationSchema';
import { featuresArray } from '../assets/data/features';
import CustomizedSnackbars from './snackbar';
import { CarWithImages } from '../interfaces';
import httpInstance from '../services';

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
  const [loading, setLoading] = useState<boolean>(true);
  const [snackBarProperties, setSnackBarProperties] = useState<
  { open:boolean, message:string, type:'success' | 'error' }>({ open: false, message: '', type: 'error' });
  const [activeStep, setActiveStep] = useState(0);

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
    <Box sx={{ width: '47%' }}>
      <Typography
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '32vw',
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
          value={formik.values.quality}
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
          width: '32vw',
          margin: '1rem 0',
        }}
        component="label"
      >
        Transmission
        <Typography
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '32vw',
            margin: '1rem 0',
          }}
          component="div"
        >
          <RadioGroup
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              width: '100%',
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

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>

        <Typography
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '50%',
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
      </Box>
      <Typography
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '32vw',
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
          width: '32vw',
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

  }, { label: 'Car Image', component: 'second' }];

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBarProperties((preState) => ({ ...preState, open: false }));
  };

  const handleNext = () => {
    setActiveStep((prevSate) => prevSate + 1);
  };

  const handleBack = () => {
    if (!activeStep) {
      //  here will send request to server then setActiveStep +1
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map(({ label }) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {steps[activeStep].component}
      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Button
            onClick={handleBack}
            sx={{ mr: 1 }}
            disabled={activeStep === 0}
          >
            Back
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />
          <Button onClick={handleNext}>
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </Box>
      )}

      <CustomizedSnackbars
        open={snackBarProperties.open}
        handleClose={handleClose}
        message={snackBarProperties.message}
        type={snackBarProperties.type}
      />
    </Box>
  );
}

export default CustomStepper;
