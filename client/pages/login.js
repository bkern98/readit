import { Card, CardContent } from '@mui/material';
import React from 'react';
import LoginForm from '../components/LoginForm';

const Login = () => {
  return (
    <>
      <Card sx={{ width: 'min-content', minWidth: 275, minHeight: 275 }}>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </>
  );
};

export default Login;
