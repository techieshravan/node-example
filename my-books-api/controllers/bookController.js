const bookController = (Book) => {

  const getBooks = (req, res) => {

    const query = {};

    if (req.query.genre) {
      query.genre = req.query.genre;
    }

    Book.find(query, (err, books) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(books);
      }
    });
  };

  const getBook = (req, res) => {
    res.json(req.book);
  };

  const saveBook = (req, res) => {
    const book = new Book(req.body);
    book.save();
    res.status(200).send(book);
  };

  const updateBook = (req, res) => {
    const updatedBook = req.body;
    const dbBook = req.book;
    dbBook.title = updatedBook.title;
    dbBook.author = updatedBook.author;
    dbBook.genre = updatedBook.genre;
    dbBook.read = updatedBook.read;
    dbBook.save((err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(dbBook);
      }
    });
  };

  const patchBook = (req, res) => {

    const dbBook = req.book;
    const updatedBook = req.body;

    if (updatedBook._id) {
      delete updatedBook._id
    }

    for (const prop in updatedBook) {
      dbBook[prop] = updatedBook[prop];
    }

    dbBook.save((err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(dbBook);
      }
    });
  };

  const deleteBook = (req, res) => {
    req.book.remove((err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(204).send('Removed');
      }
    });
  };

  return {
    getBooks,
    saveBook,
    getBook,
    updateBook,
    patchBook,
    deleteBook
  };
};

module.exports = bookController;