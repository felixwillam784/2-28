import { Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import { AdminLoginSchema } from '../../helpers/validationSchema';
import httpInstance from '../../services/axiosConfig';
import './styles.css';
import { UserContext } from '../../context';
import { UserContextTypeWithDispatch } from '../../interfaces';

function AdminLogin() {
  const [responseError, setResponseError] = useState<string>('');
  const { setUserInfo }:UserContextTypeWithDispatch = useContext(UserContext);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      UserName: '',
      password: '',
    },
    validationSchema: AdminLoginSchema,
    onSubmit: (values) => {
      console.log(values);
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
            id="outlined-basic"
            label="username"
            variant="outlined"
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
