DROP DATABASE IF EXISTS readit;
CREATE DATABASE readit;
\c readit;

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS collections;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS replies;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL
);

CREATE TABLE collections (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  book_id VARCHAR(40) NOT NULL,
  title VARCHAR(300) NOT NULL,
  author VARCHAR(100) NOT NULL,
  thumbnail VARCHAR(200) NOT NULL,
  FOREIGN KEY(user_id)
    REFERENCES users(id)
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  book_id VARCHAR(40) NOT NULL,
  body VARCHAR(1000) NOT NULL,
  likes INT DEFAULT 0,
  reported BOOLEAN DEFAULT false,
  date TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY(user_id)
    REFERENCES users(id)
);

CREATE TABLE replies (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  post_id INT NOT NULL,
  body VARCHAR(1000) NOT NULL,
  likes INT DEFAULT 0,
  reported BOOLEAN DEFAULT false,
  date TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY(user_id)
    REFERENCES users(id),
  FOREIGN KEY(post_id)
    REFERENCES posts(id)
);