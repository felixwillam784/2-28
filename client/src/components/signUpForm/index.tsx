import { Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context';
import { signupschema } from '../../helpers/validationSchema';
import { UserContextTypeWithDispatch } from '../../interfaces';
import httpInstance from '../../services';
import './style.css';

export default function SignUpform() {
  const { setUserInfo }:UserContextTypeWithDispatch = useContext(UserContext);
  const [resError, setResError] = useState<string>('');
  const navigate = useNavigate();
  const forma = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      password: '',
    },
    validationSchema: signupschema,
    onSubmit: (formValues) => {
      const signup = async () => {
        try {
          const result = await httpInstance
            .post(
              '/auth/signup',
              formValues,
            );
          setUserInfo(result.data);
          navigate('/');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          setResError(error.response.data.message);
        }
      };
      signup();
    },
  });

  return (
    <div className="formPage">
      <form className="signup-form" onSubmit={forma.handleSubmit}>
        <h1>Sign Up</h1>
        <TextField
          fullWidth
          id="fullName"
          name="fullName"
          label="fullName"
          value={forma.values.fullName}
          onChange={forma.handleChange}
          error={forma.touched.fullName && Boolean(forma.errors.fullName)}
          helperText={forma.touched.fullName && forma.errors.fullName}
        />
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={forma.values.email}
          onChange={forma.handleChange}
          error={forma.touched.email && Boolean(forma.errors.email)}
          helperText={forma.touched.email && forma.errors.email}
        />
        <TextField
          fullWidth
          id="phoneNumber"
          name="phoneNumber"
          label="phoneNumber"
          value={forma.values.phoneNumber}
          onChange={forma.handleChange}
          error={forma.touched.phoneNumber && Boolean(forma.errors.phoneNumber)}
          helperText={forma.touched.phoneNumber && forma.errors.phoneNumber}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={forma.values.password}
          onChange={forma.handleChange}
          error={forma.touched.password && Boolean(forma.errors.password)}
          helperText={forma.touched.password && forma.errors.password}
        />
        {
          resError
            && (
            <Typography sx={{ color: 'red' }} component="p">
              {resError}
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
          Sign Up
        </Button>
        <h4 className="another-way">
          Already you have an account!
          {' '}
          <a href="/login">Log In</a>
          .
        </h4>
      </form>
    </div>
  );
}
