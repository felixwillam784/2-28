import { Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts';
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
      repassword: '',
    },
    validationSchema: signupschema,
    onSubmit: ({
      fullName, email, phoneNumber, password,
    }) => {
      const signup = async () => {
        try {
          setResError('');
          const result = await httpInstance
            .post(
              '/auth/signup',
              {
                fullName, email, phoneNumber, password,
              },
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
    <div className="form">
      <form className="signup-form" onSubmit={forma.handleSubmit}>
        <h1>Sign Up</h1>
        <TextField
          fullWidth
          id="fullName"
          name="fullName"
          label="full Name"
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
          onInput={() => {
            setResError('');
          }}
          error={forma.touched.email && Boolean(forma.errors.email)}
          helperText={forma.touched.email && forma.errors.email}
        />
        <TextField
          fullWidth
          id="phoneNumber"
          name="phoneNumber"
          label="phone Number"
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
        <TextField
          fullWidth
          id="repassword"
          name="repassword"
          label="Confirm Password"
          type="password"
          value={forma.values.repassword}
          onChange={forma.handleChange}
          error={forma.touched.repassword && Boolean(forma.errors.repassword)}
          helperText={forma.touched.repassword && forma.errors.repassword}
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
        <h4 className="login">
          Already you have an account!
          {' '}
          <Link to="/login">Log In</Link>
          .
        </h4>
      </form>
    </div>
  );
}
