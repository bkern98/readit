const express = require('express');
const cors = require('cors');
const db = require('../db');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/signup', async (req, res) => {
  try {
    const newUser = await db.createUser(req.body.username, req.body.email);
    res.sendStatus(201);
  } catch (err) {
    console.log('error creating user');
    res.sendStatus(400);
  }
});

app.post('/login', async (req, res) => {
  try {
    const user = await db.getUser(req.body.email);
    res.status(200).send(user.rows[0].username);
  } catch (err) {
    console.log('error creating user');
    res.sendStatus(400);
  }
});

app.get('/search/:term', async (req, res) => {
  try {
    const terms = req.params.term.split(' ').join('+');
    const { data } = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${terms}&printType=books`
    );
    res.send(data.items);
  } catch (err) {
    console.log('Could not find books');
    res.sendStatus(400);
  }
});

app.get('/volumeInfo/:volumeId', async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://www.googleapis.com/books/v1/volumes/${req.params.volumeId}`
    );
    res.send(data);
  } catch (err) {
    console.log(err.stack);
    res.sendStatus(400);
  }
});

app.get('/collection/:user', async (req, res) => {
  try {
    const collection = await db.getCollection(req.params.user);
    res.send(collection.rows);
  } catch (err) {
    console.log(err.stack);
    res.sendStatus(400);
  }
});

app.post('/collection/:user', async (req, res) => {
  try {
    const newAdditions = await db.addToCollection(
      req.params.user,
      req.body.book_id,
      req.body.title,
      req.body.authors[0],
      req.body.thumbnail
    );
    res.sendStatus(201);
  } catch (err) {
    console.log(err.stack);
    res.sendStatus(400);
  }
});

app.get('/posts/:bookId', async (req, res) => {
  try {
    const posts = await db.getPosts(req.params.bookId);
    res.send(posts.rows);
  } catch (err) {
    console.log(err.stack);
    res.sendStatus(400);
  }
});

app.post('/posts/:bookId', async (req, res) => {
  try {
    const newPost = await db.writePost(
      req.params.bookId,
      req.body.user,
      req.body.text
    );
    res.sendStatus(201);
  } catch (err) {
    console.log(err.stack);
    res.sendStatus(400);
  }
});

app.listen(5000, () => {
  console.log('Listening on port 5000');
});
