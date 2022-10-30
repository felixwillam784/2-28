import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { basicSchema } from '../../helpers/validationSchema';
import './style.css';

export default function UpdateSettingForm() {
  const formik = useFormik({
    initialValues: {
      fullName: '',
      password: '',
      phoneNumber: '',
      passwordConfirm: '',
    },
    validationSchema: basicSchema,
    onSubmit: ({ fullName, password, phoneNumber }) => {
      alert(JSON.stringify({ fullName, password, phoneNumber }, null, 2));
    },
  });

  return (
    <div>
      <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} onSubmit={formik.handleSubmit}>
        <div style={{ height: '40vh' }}>
          <div className="row" style={{ height: '50%', width: '100%' }}>
            <TextField
              sx={{ width: '40%' }}
              id="fullName"
              name="fullName"
              label="Full Name"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
            />
            <TextField
              sx={{ width: '40%' }}
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </div>
          <div className="row">
            <TextField
              sx={{ width: '40%' }}
              id="phoneNumber"
              name="phoneNumber"
              label="Phone Number"
              type="text"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
              helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
            />

            <TextField
              sx={{ width: '40%' }}
              id="passwordConfirm"
              name="passwordConfirm"
              label="Password Confirm"
              type="password"
              value={formik.values.passwordConfirm}
              onChange={formik.handleChange}
              error={formik.touched.passwordConfirm && Boolean(formik.errors.passwordConfirm)}
              helperText={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
            />
          </div>
        </div>
        <Button
          className="basic_button"
          color="primary"
          variant="contained"
          type="submit"
        >
          UPDATE
        </Button>
      </form>
    </div>
  );
}
