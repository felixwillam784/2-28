import { Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useState } from 'react';
import { loginSchema } from '../../helpers/validationSchema';
import httpInstance from '../../services/axiosCongif';
import './style.css';

function Login() {
  const [responseError, setResponseError] = useState<string>('');
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      const login = async () => {
        try {
          setResponseError('');
          await httpInstance.post('/auth/login', values);
          navigate('/');
        } catch (error:any) {
          setResponseError(error.response.data.message);
        }
      };
      login();
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
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
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
          <h4 className="signup">
            Don&apos;t you have an account?
            {' '}
            <a href="/signup">Create one!</a>
          </h4>
        </form>
      </div>
    </div>
  );
}

export default Login;
