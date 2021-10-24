import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Button,
  CardActionArea
} from '@mui/material';
import React from 'react';
import Link from '../src/Link';

const BookCard = ({ book }) => {
  return (
    <Link href='/posts/[bookId]' as={`/posts/${book.book_id}`}>
      <Card
        sx={{
          height: 'fit-content',
          width: '15vw',
          minHeight: 'fit-content'
        }}
      >
        <CardActionArea>
          <CardMedia
            sx={{ height: '35vh' }}
            component='img'
            image={book.thumbnail}
          />
          <CardContent>
            <Grid container>
              <Grid item xs={12}>
                <Typography sx={{ fontWeight: 600 }} variant='body1'>
                  {book.title}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant='body2'>{book.author}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default BookCard;
