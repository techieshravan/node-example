const express = require('express');

const routes = (Book) => {
  const bookRouter = express.Router();
  const bookController = require('../controllers/bookController')(Book);

  bookRouter.route('/')
    .get(bookController.getBooks)
    .post(bookController.saveBook);

  bookRouter.use('/:bookId', (req, res, next) => {

    Book.findById(req.params.bookId, (err, book) => {
      if (err) {
        res.status(500).send(err);
      } else if (book) {
        req.book = book;
        next();
      } else {
        res.status(400).send('no book found');
      }
    });

  });

  bookRouter.route('/:bookId')
    .get(bookController.getBook)
    .put(bookController.updateBook)
    .patch(bookController.patchBook)
    .delete(bookController.deleteBook);

  return bookRouter;
};

module.exports = routes;