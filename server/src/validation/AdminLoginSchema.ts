import * as Yup from 'yup';

const AdminLoginSchema = Yup.object({
  username: Yup
    .string()
    .required('name is required'),
  password: Yup
    .string()
    .required('password is required')
    .min(8, 'password should be of minimum 8 characters length'),
});
export default AdminLoginSchema;
