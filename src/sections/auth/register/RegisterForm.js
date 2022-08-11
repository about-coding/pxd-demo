import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputAdornment,
  Stack,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
// auth
import { signUp, confirmSignUp } from '../../../services/auth';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);

  const RegisterSchema = Yup.object().shape({
    givenName: Yup.string().required('Given name required'),
    familyName: Yup.string().required('Family name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: '',
    password: '',
    givenName: '',
    familyName: '',
    confirmationCode: null,
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async () => {
    const { getValues } = methods;
    const givenName = getValues('givenName');
    const familyName = getValues('familyName');
    const email = getValues('email');
    const password = getValues('password');

    const isRegistered = await signUp(email, password, givenName, familyName);

    if (isRegistered) {
      setOpen(true);
    }
  };

  const handleConfirm = async () => {
    const { getValues } = methods;
    const email = getValues('email');
    const confirmationCode = getValues('confirmationCode');

    const isConfirmed = await confirmSignUp(email, confirmationCode);

    if (isConfirmed) {
      navigate('/login', { replace: true });
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="givenName" label="Given name" />
          <RHFTextField name="familyName" label="Family name" />
        </Stack>

        <RHFTextField name="email" label="Email address" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Register
        </LoadingButton>
      </Stack>
      <Dialog open={open}>
        <DialogTitle>Confirm your email</DialogTitle>
        <DialogContent>
          <DialogContentText gutterBottom>
            To use to this dashboard, please enter your confirmation code here.
          </DialogContentText>
          <RHFTextField name="confirmationCode" label="Confirmation Code" />
        </DialogContent>
        <DialogActions>
          <Button onClose={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
}
