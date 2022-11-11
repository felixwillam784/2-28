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
  InputLabel,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { EditCarFormProps } from '../../interfaces';
import brands from '../../assets/data/brands.json';
import './style.css';

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
        marginTop: '1rem',
      }}
    >

      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '90%',
        }}
        onSubmit={formik.handleSubmit}
      >
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          width: '98%',
          marginBottom: '2rem',
          // overflowY: { md: 'auto', xs: 'auto' },
        }}
        >
          <Box
            className="input_wrapper"
            sx={{
              width:
            { sm: '100%', md: modalType === 'addRequest' ? '100%' : '47%' },
              display: 'flex',
              flexDirection: 'column',
              alignItems: modalType === 'addRequest' ? 'center' : 'space-between',
            }}
          >
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
              className="input_field"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '90%',
                marginBottom: '1rem',
              }}
              component="label"
            >
              Model
              <TextField
                id="model"
                name="model"
                value={formik.values.model}
                onChange={formik.handleChange}
                error={formik.touched.model && Boolean(formik.errors.model)}
                helperText={formik.touched.model && formik.errors.model}
                className="form_field"
              />
            </Typography>
            <Typography
              className="input_field"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '90%',
                marginBottom: '1rem',
              }}
              component="label"
            >
              Year
              <TextField
                id="year"
                name="year"
                type="number"
                value={!formik.values.year ? '' : formik.values.year}
                onChange={formik.handleChange}
                error={formik.touched.year && Boolean(formik.errors.year)}
                helperText={formik.touched.year && formik.errors.year}
                className="form_field"
              />
            </Typography>
            <Typography
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                width: '90%',
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
                  width: '100%',
                  margin: '1rem 0',
                }}
                component="div"
                className="form_field"
              >
                <TextField
                  id="mileage"
                  name="mileage"
                  type="number"
                  value={!formik.values.mileage ? '' : formik.values.mileage}
                  onChange={formik.handleChange}
                  error={formik.touched.mileage && Boolean(formik.errors.mileage)}
                  helperText={formik.touched.mileage && formik.errors.mileage}
                  className="form_field"
                />
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
              className="input_field"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '90%',
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
                className="form_field"
                sx={{ mb: '1.5rem' }}
              />
            </Typography>
            <Typography
              className="input_field"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '90%',
                marginBottom: '1rem',
              }}
              component="label"
            >
              price
              <TextField
                id="price"
                name="price"
                type="number"
                value={!formik.values.price ? '' : formik.values.price}
                onChange={formik.handleChange}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
                className="form_field"
              />
            </Typography>
          </Box>
          {children}
        </Box>
        <Button
          endIcon={<SendIcon />}
          sx={{
            mb: '1.3rem',
            width: modalType === 'checkRequest' ? '50%' : '50%',
          }}
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
        >
          Send
        </Button>

      </form>

    </Box>
  );
}
export default SellCarModal;
