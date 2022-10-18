import * as yup from 'yup';

const validationSchema = yup.object({
  brand: yup
    .string()
    .required('brand is required'),
  model: yup
    .string()
    .required('model is required'),
  year: yup
    .number()
    .required('year is required'),
  milage: yup
    .string(),
  price: yup
    .number()
    .required('price is required'),
  location: yup
    .string()
    .required('location is required'),
});

export default validationSchema;
