import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Button, Grid, Typography } from '@mui/material';
import NewPost from '../../components/NewPost';
import PostItem from '../../components/PostItem';
import BookInfo from '../../components/BookInfo';

const Posts = () => {
  const router = useRouter();
  const { bookId } = router.query;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const search = async () => {
      const { data } = await axios.get(`http://localhost:5000/posts/${bookId}`);
      setPosts(data);
    };
    search();
  }, [posts, bookId]);

  const renderedPosts = posts.map(post => {
    return (
      <Grid key={post.id} item xs={12}>
        <PostItem post={post} />
      </Grid>
    );
  });

  return (
    <>
      <Grid container>
        <Grid item xs={4}>
          <BookInfo bookId={bookId} />
        </Grid>
        <Grid item xs={8} container>
          <Grid item xs={12}>
            <Typography variant='h4'>Posts</Typography>
          </Grid>
          {renderedPosts}
          <Grid item xs={12}>
            <NewPost bookId={bookId} />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Posts;
