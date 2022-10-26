import * as Yup from 'yup';

const signupSchema = Yup.object({
  email: Yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup
    .string()
    .required('password is required')
    .min(8, 'Password should be of minimum 8 characters length'),
});

export default signupSchema;
