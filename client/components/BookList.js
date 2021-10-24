import React from 'react';
import BookListItem from './BookListItem';

const BookList = ({ books }) => {
  const list = books.map(book => {
    return <BookListItem key={book.id} book={book} />;
  });
  return <div>{list}</div>;
};

export default BookList;
