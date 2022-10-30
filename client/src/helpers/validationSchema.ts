import * as yup from 'yup';

const addCarSchema = yup.object({
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

const checkCarSchema = addCarSchema.shape({
  isGoodPrice: yup.boolean().required('Is good price is required'),
  quality: yup.number().required('Quality is required'),
  transmission: yup.string().required('Transmission is required'),
  description: yup.string().required('Description is required'),
  features: yup.array().of(yup.string()).required('Features is required'),
});

const loginSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});
export { loginSchema, addCarSchema, checkCarSchema };
