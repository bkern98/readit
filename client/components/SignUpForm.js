import { Button, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import * as yup from 'yup';
import { useRouter } from 'next/router';

const SignupSchema = yup.object({
  username: yup
    .string()
    .required('Username required')
    .max(50, 'Must be fewer than 50 characters'),
  email: yup
    .string()
    .required('Email required')
    .email('Enter a valid email')
    .max(50, 'Must be fewer than 50 characters'),
  password: yup.string().required('Password required')
});

const SignUpForm = () => {
  const router = useRouter();
  return (
    <>
      <Formik
        initialValues={{ username: '', email: '', password: '' }}
        validationSchema={SignupSchema}
        onSubmit={values => {
          axios.post('http://localhost:5000/signup', values).then(() => {
            localStorage.setItem('Username', values.username);
            setTimeout(() => {
              router.push('/library');
            }, 2000);
          });
        }}
      >
        {({ touched, errors, isSubmitting, values, handleChange }) =>
          !isSubmitting ? (
            <Grid container direction='column'>
              <Grid item xs={4}>
                <Typography variant='h5'>Create An Account</Typography>
              </Grid>
              <Grid item xs={8} container>
                <Form>
                  <Grid item xs={12}>
                    <TextField
                      required
                      name='username'
                      label='Username'
                      variant='standard'
                      value={values.username}
                      onChange={handleChange}
                      error={touched.username && Boolean(errors.username)}
                      helperText={touched.username && errors.username}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      name='email'
                      label='Email address'
                      variant='standard'
                      type='email'
                      value={values.email}
                      onChange={handleChange}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      name='password'
                      label='Password'
                      variant='standard'
                      type='password'
                      value={values.password}
                      onChange={handleChange}
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                    />
                  </Grid>
                  <br />
                  <Grid item xs={12}>
                    <Button type='submit' variant='outlined' color='inherit'>
                      Create Account
                    </Button>
                  </Grid>
                </Form>
              </Grid>
            </Grid>
          ) : (
            <Grid container direction='column'>
              <Grid item xs={4}>
                <Typography variant='h5'>Account Created</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant='body1'>
                  Thanks for joining Readit. Have fun discussing your favorite
                  books!
                </Typography>
              </Grid>
            </Grid>
          )
        }
      </Formik>
    </>
  );
};

export default SignUpForm;
