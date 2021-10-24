import React from 'react';
import Nav from './Nav';
import { Container } from '@mui/material';

const Layout = ({ children, setBooks }) => {
  return (
    <>
      <Nav setBooks={setBooks} />
      <Container
        maxWidth='lg'
        sx={{
          paddingTop: '20px',
          paddingBottom: '20px'
        }}
      >
        <main>{children}</main>
      </Container>
    </>
  );
};

export default Layout;
