import { AppBar, Divider, Grid, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import Link from '../src/Link';
import axios from 'axios';

const Nav = ({ setBooks }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Grid container spacing={1}>
            <Grid item>
              <Link href='/' color='inherit'>
                <Typography>Home</Typography>
              </Link>
            </Grid>
            <Grid item>
              <Divider orientation='vertical' sx={{ borderColor: 'white' }} />
            </Grid>
            <Grid item>
              <Link href='/library' color='inherit'>
                <Typography>My Library</Typography>
              </Link>
            </Grid>
            <Grid item>
              <Divider orientation='vertical' sx={{ borderColor: 'white' }} />
            </Grid>
            <Grid item>
              <Link href='/discover' color='inherit'>
                <Typography>Discover</Typography>
              </Link>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Nav;
