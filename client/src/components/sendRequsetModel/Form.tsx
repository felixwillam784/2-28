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
} from '@mui/material';
import { useFormik } from 'formik';
import brands from '../../brand.json';
import { addCarSchema } from '../../helpers/validationSchema';

function SellCarModal() {
  const formik = useFormik({
    initialValues: {
      brand: '',
      model: '',
      year: '',
      milage: [],
      price: '',
      location: '',
    },
    validationSchema: addCarSchema,
    onSubmit: (values) => {
      console.log(values);
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
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
      <form
        style={{
          maxHeight: '80vh',
        }}
        onSubmit={formik.handleSubmit}
      >
        <Typography
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '35vw',
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
            width: '35vw',
            marginBottom: '1rem',
          }}
          component="label"
        >
          model
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
            width: '35vw',
            marginBottom: '1rem',
          }}
          component="label"
        >
          Year
          <TextField
            id="year"
            name="year"
            label="year"
            value={formik.values.year}
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
            width: '35vw',
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
              width: '35vw',
              margin: '1rem 0',
            }}
            component="div"
          >
            <TextField
              id="milage"
              name="milage"
              label="milage"
              value={formik.values.milage}
              onChange={formik.handleChange}
              error={formik.touched.milage && Boolean(formik.errors.milage)}
              helperText={formik.touched.milage && formik.errors.milage}
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
              defaultValue="mile"
              name="milage"
              onChange={formik.handleChange}
            >
              <FormControlLabel value="mile" control={<Radio />} label="mile" />
              <FormControlLabel value="km" control={<Radio />} label="km" />
            </RadioGroup>
          </Typography>
        </Typography>
        <Typography
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '35vw',
            marginBottom: '1rem',
          }}
          component="label"
        >
          price
          <TextField
            id="price"
            name="price"
            label="price"
            value={formik.values.price}
            onChange={formik.handleChange}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
          />
        </Typography>
        <Typography
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '35vw',
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
        <Button
          sx={{
            mb: '1rem',
          }}
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
export default SellCarModal;
