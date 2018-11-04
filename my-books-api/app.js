const express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose');

const db = mongoose.connect('mongodb://localhost/booksDb');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extend: true }));
app.use(bodyParser.json());

const Book = require('./models/bookModel');
bookRouter = require('./routes/bookRoutes')(Book);

app.use('/api/books', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my API!');
});

app.listen(port, () => {
  console.log(`app running on port: ${port}`)
});
