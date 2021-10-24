import { Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const BookInfo = ({ bookId }) => {
  const [book, setBook] = useState(null);

  useEffect(() => {
    const search = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/volumeInfo/${bookId}`
      );
      setBook(data);
    };
    if (bookId) {
      search();
    }
  }, [bookId]);

  return book ? (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Card
            sx={{
              minHeight: 'fit-content',
              width: '20vw'
            }}
          >
            <CardMedia
              sx={{ height: '50vh' }}
              component='img'
              image={book.volumeInfo.imageLinks.thumbnail}
            />
            <CardContent sx={{ height: '20%' }}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography sx={{ fontWeight: 600 }} variant='body1'>
                    {book.volumeInfo.title}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='body2'>
                    {book.volumeInfo.authors}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  ) : null;
};

export default BookInfo;
