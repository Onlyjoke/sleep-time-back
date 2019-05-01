require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const PostController = require('./controllers/PostController');
const Post = new PostController();
const app = express();
const cors = require('cors');
const PORT = process.env.PORT;
const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.get('/actions', Post.index);
app.post('/action', Post.create);
app.get('/action/:id', Post.read);
app.delete('/action/:id', Post.delete);
app.put('/action/update/:id', Post.update);

app.listen(PORT, () => {
    console.log('SERVER STARTED!', PORT);
});
