import React, { useState, useEffect } from 'react';
import { InputBase, IconButton, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BookList from '../components/BookList';
import axios from 'axios';

const Discover = () => {
  const [term, setTerm] = useState('');
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const search = async term => {
      const { data } = await axios.get(`http://localhost:5000/search/${term}`);
      setBooks(data);
    };

    const timerId = setTimeout(() => {
      if (term) {
        search(term);
      }
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [term]);

  return (
    <div>
      <Paper
        component='form'
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: 200
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder='Search for a book'
          inputProps={{ 'aria-label': 'search' }}
          value={term}
          onChange={e => setTerm(e.target.value)}
        />
        <IconButton type='submit' sx={{ p: '10px' }} aria-label='search'>
          <SearchIcon />
        </IconButton>
      </Paper>
      <BookList books={books} />
    </div>
  );
};

export default Discover;
