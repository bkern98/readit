import React, { useState } from 'react';
import { Box, TextField, Button, Grid } from '@mui/material';
import axios from 'axios';

const NewPost = ({ bookId }) => {
  const [text, setText] = useState('');
  let user;
  if (typeof window !== 'undefined') {
    user = localStorage.getItem('Username');
  }

  const handleClick = async () => {
    const post = {
      user,
      text
    };
    const newPost = await axios.post(
      `http://localhost:5000/posts/${bookId}`,
      post
    );
    setText('');
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Box
            component='form'
            sx={{
              '& .MuiTextField-root': { m: 1, width: '50vw' }
            }}
            noValidate
            autoComplete='off'
          >
            <TextField
              fullWidth
              multiline
              placeholder='Share your thoughts'
              rows={3}
              value={text}
              onChange={e => setText(e.target.value)}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Button onClick={() => handleClick()} variant='outlined'>
            Submit
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default NewPost;
