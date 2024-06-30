const express = require('express');
const app = express();
const errorHandler = require('./middleware/errorHandler');
const dotenv = require("dotenv").config()
const connectDb = require('./config/connectDb');

connectDb();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(logger)
app.use(express.json())

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {

    res.render('index', { title: 'Home' });
})

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/posts');
const contactRoutes = require('./routes/contactRoutes');


app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/users', userRoutes);

app.use(errorHandler)

function logger(req, res, next){
    console.log(req.originalUrl)
    next()
}

app.listen(5000)