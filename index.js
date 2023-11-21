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

// get all publication

app.get("/publications", (req, res) => {
  res.json({ publication: database.publication });
});

//specific publication

app.get("/publication/:id", (req, res) => {
  const getPublication = database.publication.filter((publication) => {
    return publication.id === parseInt(req.params.id);
  });

  if (getPublication.length === 0) {
    return res.json({ error: `No Publication found ${req.params.id}` });
  }

  res.json({ author: getPublication });
});

// get publication based on book
app.get("/publication/book/:id", (req, res) => {
  const getSpecificPublication = database.publication.filter((publication) =>
    publication.books.includes(parseInt(req.params.id))
  );

  if (getSpecificPublication.length === 0) {
    return res.json({ error: "No publication found" });
  }

  res.json({ author: getSpecificPublication });
});

// Add new book

app.post("/book/new", (req, res) => {
  const { newBook } = req.body;
  database.books.push(newBook);
  return res.json({ books: database.books, message: "book was added" });
});

// Add new author

app.post("/author/new", (req, res) => {
  const { newAuthor } = req.body;
  database.authors.push(newAuthor);
  return res.json({ books: database.authors, message: "Author was added" });
});

// Update Book

app.put("/book/:isbn", (req, res) => {
  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      book.title = req.body.bookTitle;
      return;
    }
  });
  return res.json({ books: database.books });
});

//Server

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
