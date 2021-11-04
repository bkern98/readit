"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("../db"));
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.post('/signup', async (req, res) => {
    try {
        await db_1.default.createUser(req.body.username, req.body.email);
        res.sendStatus(201);
    }
    catch (err) {
        console.log('error creating user');
        res.sendStatus(400);
    }
});
app.post('/login', async (req, res) => {
    try {
        const user = await db_1.default.getUser(req.body.email);
        res.status(200).send(user.rows[0].username);
    }
    catch (err) {
        console.log('error creating user');
        res.sendStatus(400);
    }
});
app.get('/search/:term', async (req, res) => {
    try {
        const terms = req.params.term.split(' ').join('+');
        const { data } = await axios_1.default.get(`https://www.googleapis.com/books/v1/volumes?q=${terms}&printType=books`);
        res.send(data.items);
    }
    catch (err) {
        console.log('Could not find books');
        res.sendStatus(400);
    }
});
app.get('/volumeInfo/:volumeId', async (req, res) => {
    try {
        const { data } = await axios_1.default.get(`https://www.googleapis.com/books/v1/volumes/${req.params.volumeId}`);
        res.send(data);
    }
    catch (err) {
        console.log(err.stack);
        res.sendStatus(400);
    }
});
app.get('/collection/:user', async (req, res) => {
    try {
        const collection = await db_1.default.getCollection(req.params.user);
        res.send(collection.rows);
    }
    catch (err) {
        console.log(err.stack);
        res.sendStatus(400);
    }
});
app.post('/collection/:user', async (req, res) => {
    try {
        await db_1.default.addToCollection(req.params.user, req.body.book_id, req.body.title, req.body.authors[0], req.body.thumbnail);
        res.sendStatus(201);
    }
    catch (err) {
        console.log(err.stack);
        res.sendStatus(400);
    }
});
app.get('/posts/:bookId', async (req, res) => {
    try {
        const posts = await db_1.default.getPosts(req.params.bookId);
        res.send(posts.rows);
    }
    catch (err) {
        console.log(err.stack);
        res.sendStatus(400);
    }
});
app.post('/posts/:bookId', async (req, res) => {
    try {
        await db_1.default.writePost(req.params.bookId, req.body.user, req.body.text);
        res.sendStatus(201);
    }
    catch (err) {
        console.log(err.stack);
        res.sendStatus(400);
    }
});
app.listen(5000, () => {
    console.log('Listening on port 5000');
});
//# sourceMappingURL=index.js.map