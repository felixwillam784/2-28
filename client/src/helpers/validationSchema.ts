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
  isGoodPrice: yup.boolean().nullable().required('Is good price is required'),
  quality: yup.number().nullable().min(0, 'Minimum atleast 0')
    .max(100, 'Allowed maximum is 100')
    .required('Quality is required'),
  transmission: yup.string().nullable().required('Transmission is required'),
  description: yup.string().nullable().required('Description is required'),
  features: yup.array().nullable().of(yup.string()).min(1, 'Features is required')
    .required('Features is required'),
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
const signupschema = yup.object({
  fullName: yup
    .string()
    .required('Name is required')
    .min(3, 'name must contain at least 3 characters')
    .max(50, 'name must contain at most 50 characters'),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required!'),
  phoneNumber: yup
    .string()
    .required('Phone number is required!'),
  password: yup
    .string()
    .min(8, 'password must contain at least 8 characters')
    .required('Password is required!'),
  repassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords not match')
    .required('Confirm Password is required!'),
});

const basicSchema = yup.object({
  fullName: yup
    .string(),
  phoneNumber: yup.string(),
  password: yup.string().min(8, 'Password should be of minimum 8 characters length'),
  passwordConfirm: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});
const AdminLoginSchema = yup.object({
  username: yup
    .string()
    .required('user name is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});
export {
  loginSchema, addCarSchema, signupschema, AdminLoginSchema, basicSchema, checkCarSchema,
};
