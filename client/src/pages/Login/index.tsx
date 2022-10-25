import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { loginSchema } from '../../helpers/validationSchema';
import httpInstance from '../../services/axiosCongif';
import './style.css';

function Login() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      const response = await httpInstance.post('/auth/login', values);
      if (response.data.message === 'user not found') {
        formik.errors.email = response.data.message;
      } else if (response.data.message === 'password not match') {
        formik.errors.password = response.data.message;
      } else {
        navigate('/');
      }
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
