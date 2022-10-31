/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Button,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
  FormHelperText,
  Box,
  Checkbox,
  Autocomplete,
  TextareaAutosize,
} from '@mui/material';
import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import { features } from 'process';
import httpInstance from '../../services';
import brands from '../../assets/data/brands.json';
import { checkCarSchema } from '../../helpers/validationSchema';
import CustomizedSnackbars from '../snackbar';
import { featuresArray } from '../../assets/data/features';
import { CarWithImages } from '../../interfaces';

const convertToKM = (value: number, type: string) => {
  if (type === 'mile') return value * 1.609344;
  return value;
};

type Props = {
  modalType: 'addRequest' | 'checkRequest',
  id: number | undefined
};

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

function SellCarModal(props:Props) {
  const { modalType, id } = props;
  const [carData, setCarData] = useState<CarWithImages>(initialData);
  const [loading, setLoading] = useState<boolean>(true);
  const [snackBarProperties, setSnackBarProperties] = useState<
  { open:boolean, message:string, type:'success' | 'error' }>({ open: false, message: '', type: 'error' });

  useEffect(() => {
    const getCarInfo = async () => {
      try {
        setLoading(true);
        setSnackBarProperties((preState) => ({ ...preState, open: false }));
        const response = await httpInstance.get(`/cars/${id}`);
        setCarData(response.data[0]);
        console.log(response.data[0]);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setSnackBarProperties({ open: true, message: 'something went wrong!', type: 'error' });
      }
    };
    getCarInfo();
  }, []);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBarProperties({ open: false, message: '', type: 'error' });
  };

  const formik = useFormik({
    initialValues: {
      ...carData, type: '',
    },
    enableReinitialize: true,
    validationSchema: checkCarSchema,
    onSubmit: (values, { resetForm }) => {
      const newValue = Math.floor(convertToKM(values.mileage, values.type));
      // eslint-disable-next-line no-param-reassign
      values.mileage = newValue;
      const addCar = async () => {
        try {
          setLoading(true);
          setSnackBarProperties((preState) => ({ ...preState, open: false }));
          if (modalType === 'checkRequest') {
            await httpInstance.put(`/cars/${id}`, values);
          } else {
            await httpInstance.post('/cars', values);
          }
          setLoading(false);
          setSnackBarProperties(
            {
              open: true,
              message: modalType === 'checkRequest' ? 'Car checked successfully' : 'Sell car request sent successfully',
              type: 'success',
            },
          );
        } catch (error) {
          setLoading(false);
          setSnackBarProperties({ open: true, message: 'something went wrong!', type: 'error' });
        }
      };
      addCar();
      if (!loading) {
        resetForm();
      }
      console.log(values);
    },
  });

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        marginTop: '0.3rem',
      }}
    >
      {modalType === 'checkRequest' ? null : (
        <>
          <Typography sx={{ fontSize: '1.7rem' }} component="h2">
            Sell Your Car Now!
          </Typography>
          <hr
            style={{
              height: '.3rem',
              width: '20rem',
              backgroundColor: '#0A20E6',
              marginBottom: '.5rem',
            }}
          />
        </>
      )}

      <form
        style={{
          maxHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '90%',
        }}
        onSubmit={formik.handleSubmit}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Box sx={{ width: '45%' }}>
            <Typography
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '30vw',
                marginBottom: '1rem',
              }}
              component="label"
            >
              Brand
              <Typography
                component="div"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.brand}
                  label="brand"
                  name="brand"
                  onChange={formik.handleChange}
                  sx={{ width: '14rem' }}
                  error={formik.touched.brand && Boolean(formik.errors.brand)}
                >
                  {brands.map((brand) => (
                    <MenuItem key={brand.id} value={brand.brand}>
                      {brand.brand}
                    </MenuItem>
                  ))}
                </Select>
                {formik.errors.brand && (
                <FormHelperText sx={{ color: 'red' }}>
                  {formik.touched.brand && formik.errors.brand}
                </FormHelperText>
                )}
              </Typography>
            </Typography>
            <Typography
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '30vw',
                marginBottom: '1rem',
              }}
              component="label"
            >
              Model
              <TextField
                id="model"
                name="model"
                label="model"
                value={formik.values.model}
                onChange={formik.handleChange}
                error={formik.touched.model && Boolean(formik.errors.model)}
                helperText={formik.touched.model && formik.errors.model}
              />
            </Typography>
            <Typography
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '30vw',
                marginBottom: '1rem',
              }}
              component="label"
            >
              Year
              <TextField
                id="year"
                name="year"
                label="year"
                type="number"
                value={!formik.values.year ? '' : formik.values.year}
                onChange={formik.handleChange}
                error={formik.touched.year && Boolean(formik.errors.year)}
                helperText={formik.touched.year && formik.errors.year}
              />
            </Typography>
            <Typography
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                width: '30vw',
                margin: '1rem 0',
              }}
              component="label"
            >
              Mileage (approx)
              <Typography
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '30vw',
                  margin: '1rem 0',
                }}
                component="div"
              >
                <TextField
                  id="mileage"
                  name="mileage"
                  label="mileage"
                  type="number"
                  value={!formik.values.mileage ? '' : formik.values.mileage}
                  onChange={formik.handleChange}
                  error={formik.touched.mileage && Boolean(formik.errors.mileage)}
                  helperText={formik.touched.mileage && formik.errors.mileage}
                />
                <RadioGroup
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    width: '15rem',
                  }}
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="km"
                  name="mileage"
                  onChange={formik.handleChange}
                >
                  <FormControlLabel name="type" value="km" control={<Radio />} label="km" />
                  <FormControlLabel name="type" value="mile" control={<Radio />} label="mile" />
                </RadioGroup>
              </Typography>
            </Typography>

            { modalType === 'checkRequest' ? null : (
              <Typography
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '30vw',
                  marginBottom: '1rem',
                }}
                component="label"
              >
                price
                <TextField
                  id="price"
                  name="price"
                  label="price"
                  type="number"
                  value={!formik.values.price ? '' : formik.values.price}
                  onChange={formik.handleChange}
                  error={formik.touched.price && Boolean(formik.errors.price)}
                  helperText={formik.touched.price && formik.errors.price}
                />
              </Typography>
            )}

            <Typography
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '30vw',
                marginBottom: '1rem',
              }}
              component="label"
            >
              location
              <TextField
                id="location"
                name="location"
                label="location"
                value={formik.values.location}
                onChange={formik.handleChange}
                error={formik.touched.location && Boolean(formik.errors.location)}
                helperText={formik.touched.location && formik.errors.location}
              />
            </Typography>

            <Typography
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                width: '30vw',
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
                // error={formik.touched.description && Boolean(formik.errors.description)}
                // helperText={formik.touched.description && formik.errors.description}
                style={{
                  width: '100%',
                  borderRadius: '4px',
                  border: '1px solid #80808066',
                  marginTop: '1rem',
                  height: '3rem',
                  padding: '0.2rem',
                }}
              />
            </Typography>
          </Box>

          <Box sx={{ width: '45%' }}>
            <Typography
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '30vw',
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
                width: '30vw',
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
                  width: '30vw',
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
                  flexDirection: 'column',
                  alignItems: 'start',
                  width: '50%',
                  margin: '1rem 0',
                }}
                component="label"
              >
                Price
                <Typography
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '30vw',
                    margin: '1rem 0',
                  }}
                  component="div"
                >
                  <TextField
                    id="price"
                    name="price"
                    label="price"
                    type="number"
                    value={!formik.values.price ? '' : formik.values.price}
                    onChange={formik.handleChange}
                    error={formik.touched.price && Boolean(formik.errors.price)}
                    helperText={formik.touched.price && formik.errors.price}
                  />
                </Typography>
              </Typography>

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
                  // error={formik.touched.isGoodPrice && Boolean(formik.errors.isGoodPrice)}
                  // helperText={formik.touched.isGoodPrice && formik.errors.isGoodPrice}
                />

                Is Good Price
              </Typography>
            </Box>

            <Typography
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                width: '30vw',
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
                onChange={(eee, values) => formik.setFieldValue('features', [...values.map((value) => value.title)])}
                id="features"
                // name="features"
                // onChange={formik.handleChange}
                // eslint-disable-next-line react/jsx-props-no-spreading
                // {...formik.getFieldProps('features')}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                  // eslint-disable-next-line react/jsx-props-no-spreading
                    {...params}
                    name="features"
                    // onChange={() => console.log('22222')}
                    error={formik.touched.features && Boolean(formik.errors.features)}
                    helperText={formik.touched.features && formik.errors.features}
                    label="Features"
                  />
                )}
              />
            </Typography>
          </Box>

        </Box>
        <Button
          sx={{
            mb: '1rem',
            width: modalType === 'checkRequest' ? '50%' : '100%',
          }}
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
        >
          Submit
        </Button>

      </form>
      <CustomizedSnackbars
        open={snackBarProperties.open}
        handleClose={handleClose}
        message={snackBarProperties.message}
        type={snackBarProperties.type}
      />
    </Box>
  );
}
export default SellCarModal;
