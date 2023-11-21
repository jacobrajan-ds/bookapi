const express = require("express");
const app = express();

const database = require("./database/index");

const port = 3000;

app.use(express.json());

// get all books

app.get("/", (req, res) => {
  res.json({ books: database.books });
});

app.get("/isbn/:isbn", (req, res) => {
  const getSpecificBook = database.books.filter((book) => {
    return book.ISBN === req.params.isbn;
  });

  if (getSpecificBook.length === 0) {
    return res.json({ error: `No Book Found for the ISBN ${req.params.isbn}` });
  }

  res.json({ book: getSpecificBook });
});

//Category Based

app.get("/c/:category", (req, res) => {
  const getSpecificBook = database.books.filter((book) => {
    return book.category.includes(req.params.category);
  });

  if (getSpecificBook.length === 0) {
    return res.json({
      error: `No Book Found for the category ${req.params.category}`,
    });
  }

  res.json({ book: getSpecificBook });
});

// Based on Author

app.get("/a/:author", (req, res) => {
  const getSpecificAuthor = database.books.filter((book) => {
    return book.authors.includes(parseInt(req.params.author));
  });
  if (getSpecificAuthor.length === 0) {
    return res.json({
      error: `No Book Found for the Author ${req.params.author}`,
    });
  }

  res.json({ book: getSpecificAuthor });
});

// get all authors

app.get("/author", (req, res) => {
  res.json({ authors: database.authors });
});

//specific author

app.get("/author/:id", (req, res) => {
  const getAuthor = database.authors.filter((author) => {
    return author.id === parseInt(req.params.id);
  });

  if (getAuthor.length === 0) {
    return res.json({ error: `No author found ${req.params.id}` });
  }

  res.json({ author: getAuthor });
});

// get author based on isbn

app.get("/author/book/:isbn", (req, res) => {
  const getSpecificAuthors = database.authors.filter((author) =>
    author.books.includes(parseInt(req.params.isbn))
  );

  if (getSpecificAuthors.length === 0) {
    return res.json({ error: "" });
  }

  res.json({ author: getSpecificAuthors });
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
