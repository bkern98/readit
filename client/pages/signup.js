import { Card, CardContent } from '@mui/material';
import React from 'react';
import SignUpForm from '../components/SignUpForm';

const Signup = () => {
  return (
    <>
      <Card sx={{ width: 'min-content', minWidth: 275, minHeight: 275 }}>
        <CardContent>
          <SignUpForm />
        </CardContent>
      </Card>
    </>
  );
};

export default Signup;
