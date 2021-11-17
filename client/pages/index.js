import * as React from 'react';
import { Grid, Typography, Container, Box, Button } from '@mui/material';
import Link from '../src/Link';
import Copyright from '../src/Copyright';

export default function Index() {
  return (
    <Container>
      <Box sx={{ my: 4, alignContent: 'center' }}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant='h1' sx={{ fontSize: '20vw' }}>
              Readit.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant='h5'
              gutterBottom
              sx={{ ml: '0.8em', pb: '0.8em' }}
            >
              A Place for Readers to Discuss Their Favorite Books
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ ml: '1em' }}>
            <Typography>
              <Button variant='outlined' href='/signup'>
                Create An Account
              </Button>{' '}
              or{' '}
              <Button variant='outlined' href='/login'>
                Login Here
              </Button>
            </Typography>
          </Grid>
          <Grid xs={1}></Grid>
          <Grid item></Grid>
        </Grid>
      </Box>
    </Container>
  );
}
