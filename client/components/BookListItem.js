import {
  Button,
  Divider,
  Grid,
  Paper,
  Rating,
  Typography
} from '@mui/material';
import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const BookListItem = ({ book }) => {
  const router = useRouter();
  const user = localStorage.getItem('Username');
  const info = book.volumeInfo;
  const image = info.imageLinks ? info.imageLinks.thumbnail : '';

  const thumbnailStyle = {
    margin: '4px',
    width: '100px',
    height: '100px',
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  };

  const authors = info.authors ? (
    info.authors.map(author => <Typography key={author}>{author}</Typography>)
  ) : (
    <Typography>Unknown</Typography>
  );

  const date = info.publishedDate ? info.publishedDate.slice(0, 4) : null;

  const handleAddClick = async () => {
    const bookInfo = {
      book_id: book.id,
      title: info.title,
      authors: info.authors,
      thumbnail: image
    };
    console.log(bookInfo);
    const newBook = await axios.post(
      `http://localhost:5000/collection/${user}`,
      bookInfo
    );
  };

  return (
    <>
      <Grid container>
        <Grid item xs={9} container>
          <Grid item xs={2}>
            <Paper
              onClick={() => setOpen(true)}
              sx={thumbnailStyle}
              elevation={3}
            ></Paper>
          </Grid>
          <Grid item xs={7} container>
            <Grid item xs={12}>
              <Typography variant='h6'>{`${info.title} (${date})`}</Typography>
            </Grid>
            <Grid item xs={12}>
              {authors}
            </Grid>
            <Grid item xs={12}>
              <Rating value={info.averageRating} readOnly></Rating>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3} container>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}>
            <Button
              onClick={() => handleAddClick()}
              color='inherit'
              variant='outlined'
              size='small'
            >
              <Typography>Add to Library</Typography>
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={() => router.push(`/posts/${book.id}`)}
              sx={{ minWidth: 145 }}
              color='inherit'
              variant='outlined'
              size='small'
            >
              <Typography>See More</Typography>
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
      </Grid>
    </>
  );
};

export default BookListItem;
