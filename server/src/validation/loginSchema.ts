import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Must be a valid email').required('email is require'),
  password: Yup.string().required('password is require'),
});

export default loginSchema;
