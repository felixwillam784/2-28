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
import { EditCarFormProps } from '../../interfaces';
import brands from '../../assets/data/brands.json';

function SellCarModal(props:EditCarFormProps) {
  const {
    modalType, id, formik, children,
  } = props;
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
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          marginBottom: '2rem',
        }}
        >
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
                width: '32vw',
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
                width: '32vw',
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
                width: '32vw',
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
                  width: '32vw',
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
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '32vw',
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
          </Box>
          {children}
        </Box>
        <Button
          sx={{
            mb: '0.5rem',
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

    </Box>
  );
}
export default SellCarModal;
