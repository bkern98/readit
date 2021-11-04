"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE
});
pool
    .connect()
    .then(() => console.log('Connected to database'))
    .catch(() => console.log('Error connecting to database'));
const createUser = (username, email) => {
    return pool.query('INSERT INTO users VALUES (DEFAULT, $1, $2)', [
        username,
        email
    ]);
};
const getUser = (email) => {
    return pool.query('SELECT username FROM users WHERE email = $1', [email]);
};
const getCollection = (username) => {
    return pool.query('SELECT * FROM users u INNER JOIN collections c ON u.id = c.user_id WHERE u.username = $1', [username]);
};
const addToCollection = async (user, bookId, title, author, thumbnail) => {
    const userId = await pool.query('SELECT id FROM users WHERE username = $1', [
        user
    ]);
    return pool.query('INSERT INTO collections VALUES (DEFAULT, $1, $2, $3, $4, $5)', [userId.rows[0].id, bookId, title, author, thumbnail]);
};
const getPosts = (bookId) => {
    return pool.query('SELECT * FROM users u INNER JOIN posts p ON u.id = p.user_id WHERE book_id = $1', [bookId]);
};
const writePost = async (bookId, user, text) => {
    const userId = await pool.query('SELECT id FROM users WHERE username = $1', [
        user
    ]);
    return pool.query('INSERT INTO posts VALUES (DEFAULT, $1, $2, $3)', [
        userId.rows[0].id,
        bookId,
        text
    ]);
};
exports.default = {
    createUser,
    getUser,
    addToCollection,
    getCollection,
    getPosts,
    writePost
};
//# sourceMappingURL=index.js.map