import * as React from 'react';
import { Grid, Typography, Container, Box } from '@mui/material';
import Link from '../src/Link';
import Copyright from '../src/Copyright';

export default function Index() {
  return (
    <Container maxWidth='sm'>
      <Box sx={{ my: 4 }}>
        <Grid container sx={{ alignItems: 'center' }}>
          <Grid item xs={12}>
            <Typography
              variant='h4'
              component='h1'
              gutterBottom
              textAlign='center'
            >
              Welcome to Readit!
            </Typography>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={7}>
            <Typography>Returning User?</Typography>
            <Link href='/login' color='secondary'>
              Login
            </Link>
          </Grid>
          <br />
          <Grid item>
            <Typography>First Time Here?</Typography>
            <Link href='/signup' color='secondary'>
              Sign Up
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
