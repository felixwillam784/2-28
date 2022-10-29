import { Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context';
import { AdminLoginSchema } from '../../helpers/validationSchema';
import { UserContextTypeWithDispatch } from '../../interfaces';
import httpInstance from '../../services';
import './styles.css';

function AdminLogin() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [responseError, setResponseError] = useState<string>('');
  const { setUserInfo }:UserContextTypeWithDispatch = useContext(UserContext);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: AdminLoginSchema,
    onSubmit: (values) => {
      const Admin = async () => {
        try {
          const result = await httpInstance.post('/admin/login', values);
          setUserInfo(result.data);
          console.log(result);

          navigate('/');
        } catch (error) {
          setResponseError('error');
        }
      };
      Admin();
    },
  });
  return (
    <div className="loginPage">
      <div
        className="loginImg"
      >
        <div className="decsLogin">
          <h2>
            The better way
            to
            buy or sell a used car
          </h2>
          <p>Great Value | Trusted Quality | All Online</p>
        </div>
      </div>
      <div className="formPage">
        <form className="formLogin" onSubmit={formik.handleSubmit}>
          <h1>LOG IN</h1>
          <TextField
            fullWidth
            id="username"
            name="username"
            label="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          {
            responseError
              && (
              <Typography sx={{ color: 'red' }} component="p">
                {responseError}
              </Typography>
              )

          }
          <Button
            className="button"
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
