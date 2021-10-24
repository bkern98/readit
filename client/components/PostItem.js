import React from 'react';
import { Grid, Divider, Typography } from '@mui/material';
import moment from 'moment';

const PostItem = ({ post }) => {
  const timeFromNow = moment(post.date).fromNow();

  return (
    <>
      <Grid item xs={12}>
        <Typography variant='body1'>{post.body}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='body2' sx={{ color: '#808080' }}>
          Posted by {post.username} {timeFromNow}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
    </>
  );
};

export default PostItem;
