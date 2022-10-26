import * as Yup from 'yup';

const signupSchema = Yup.object({
  email: Yup
    .string()
    .email('enter a valid email')
    .required('Email is required'),
  fullName: Yup
    .string()
    .required('name is required'),
  password: Yup
    .string()
    .required('password is required')
    .min(8, 'Password should be of minimum 8 characters length'),
  phoneNumber: Yup
    .number()
    .required('phone number required'),
});

export default signupSchema;
