import { Button, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';

const Library = () => {
  const [collection, setCollection] = useState([]);
  let user;
  if (typeof window !== 'undefined') {
    user = window.localStorage.getItem('Username');
  }
  const router = useRouter();

  useEffect(() => {
    const search = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/collection/${user}`
      );
      setCollection(data);
    };
    search();
  }, [user]);

  const renderedCollection = collection.map(book => {
    return (
      <>
        <Grid item xs={3}>
          <BookCard key={book.book_id} book={book} />
        </Grid>
      </>
    );
  });

  return collection.length > 0 ? (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant='h3'>My Library</Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            sx={{ marginTop: 3, marginBottom: 3 }}
            variant='contained'
            onClick={() => router.push('/discover')}
          >
            Search More Books
          </Button>
        </Grid>
        <Grid item xs={12} container>
          {renderedCollection}
        </Grid>
      </Grid>
    </>
  ) : (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant='h3'>My Library</Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            sx={{ marginTop: 3, marginBottom: 3 }}
            variant='contained'
            onClick={() => router.push('/discover')}
          >
            Search More Books
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Library;
