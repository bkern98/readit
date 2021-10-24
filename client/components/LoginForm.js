import { Button, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import * as yup from 'yup';
import { useRouter } from 'next/router';

const LoginSchema = yup.object({
  email: yup
    .string()
    .required('Email required')
    .email('Enter a valid email')
    .max(50, 'Must be fewer than 50 characters'),
  password: yup.string().required('Password required')
});

const LoginForm = () => {
  const router = useRouter();
  return (
    <>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={values => {
          axios.post('http://localhost:5000/login', values).then(({ data }) => {
            console.log(data);
            localStorage.setItem('Username', data);
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
                <Typography variant='h5'>Log In</Typography>
              </Grid>
              <Grid item xs={8} container>
                <Form>
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
                    <Button
                      onClick={() => {
                        console.log(stripHtml(str).result);
                      }}
                      type='submit'
                      variant='outlined'
                      color='inherit'
                    >
                      Login
                    </Button>
                  </Grid>
                </Form>
              </Grid>
            </Grid>
          ) : (
            <Grid container direction='column'>
              <Grid item xs={4}>
                <Typography variant='h5'>Login Successful</Typography>
              </Grid>
            </Grid>
          )
        }
      </Formik>
    </>
  );
};

export default LoginForm;
