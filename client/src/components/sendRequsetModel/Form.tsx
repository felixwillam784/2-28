import {
  Button,
  FormControlLabel,
  Radio, RadioGroup, TextField, Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

function Form() {
  const formik = useFormik({
    initialValues: {
      brand: '',
      model: '',
      year: '',
      Mileage: '',
      price: '',
      location: '',
    },
    validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
    >
      <Typography sx={{ fontSize: '1.7rem' }} component="h1">
        Sell Car Request
      </Typography>
      <hr style={{
        height: '.3rem',
        width: '20rem',
        backgroundColor: '#0A20E6',
        margin: '2rem 0',
      }}
      />
      <form onSubmit={formik.handleSubmit}>
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
          <TextField
            id="brand"
            name="brand"
            label="brand"
            value={formik.values.brand}
            onChange={formik.handleChange}
            error={formik.touched.brand && Boolean(formik.errors.brand)}
            helperText={formik.touched.brand && formik.errors.brand}
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
              id="Mileage"
              name="Mileage"
              label="Mileage"
              value={formik.values.Mileage}
              onChange={formik.handleChange}
              error={formik.touched.Mileage && Boolean(formik.errors.Mileage)}
              helperText={formik.touched.Mileage && formik.errors.Mileage}
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
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="mile"
                control={<Radio />}
                label="mile"
              />
              <FormControlLabel
                value="km"
                control={<Radio />}
                label="km"
              />
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
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}
export default Form;
