require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const database = require("./database/index");

//Models
const BookModel = require("./database/book");
const AuthorModel = require("./database/author");
const PublicationModel = require("./database/publication");

const port = 3000;

app.use(express.json());

//Database connection

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Database Connected");
  });

/********** Books ************/

// get all books

app.get("/", async (req, res) => {
  const getAllBooks = await BookModel.find();
  res.json({ books: getAllBooks });
});

app.get("/isbn/:isbn", async (req, res) => {
  const getSpecificBook = await BookModel.findOne({ ISBN: req.params.isbn });

  if (!getSpecificBook) {
    return res.json({ error: `No Book Found for the ISBN ${req.params.isbn}` });
  }

  res.json({ book: getSpecificBook });
});

//Category Based

app.get("/c/:category", async (req, res) => {
  const getSpecificBook = await BookModel.findOne({
    category: req.params.category,
  });

  if (!getSpecificBook) {
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

// Delete a book

app.delete("/:isbn", async (req, res) => {
  const updatedBookDatabase = await BookModel.findOneAndDelete({
    ISBN: req.params.isbn,
  });
});

/********** Authors ************/

// get all authors

app.get("/author", async (req, res) => {
  const getAllAuthor = await AuthorModel.find();
  res.json({ authors: getAllAuthor });
});

//specific author

app.get("/author/:id", async (req, res) => {
  const getAuthor = await AuthorModel.findOne({ id: req.params.id });

  if (!getAuthor) {
    return res.json({ error: `No author found ${req.params.id}` });
  }

  res.json({ author: getAuthor });
});

// get author based on isbn

app.get("/author/book/:isbn", async (req, res) => {
  const getSpecificAuthors = await AuthorModel.findOne({
    books: req.params.isbn,
  });

  if (!getSpecificAuthors) {
    return res.json({ error: "" });
  }

  res.json({ author: getSpecificAuthors });
});

// update author

app.put("/book/author/update/:isbn", async (req, res) => {
  const updatedBook = await BookModel.findOneAndUpdate(
    {
      ISBN: req.params.isbn,
    },
    {
      $push: {
        authors: req.body.newAuthor,
      },
    },
    {
      new: true,
    }
  );

  const updatedAuthor = await AuthorModel.findOneAndUpdate(
    {
      id: req.body.newAuthor,
    },
    {
      $addToSet: {
        books: req.params.isbn,
      },
    },

    {
      new: true,
    }
  );

  return res.json({
    books: updatedBook,
    authors: updatedAuthor,
    message: "New Author was added",
  });
});

/********** Publication ************/

// get all publication

app.get("/publications", async (req, res) => {
  const getAllPublication = await PublicationModel.find();
  res.json({ publication: getAllPublication });
});

//specific publication

app.get("/publication/:id", async (req, res) => {
  const getPublication = await PublicationModel.findOne({ id: req.params.id });

  if (!getPublication) {
    return res.json({ error: `No Publication found ${req.params.id}` });
  }

  res.json({ publication: getPublication });
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

app.post("/book/new", async (req, res) => {
  const { newBook } = req.body;

  const addNewBook = BookModel.create(newBook);

  return res.json({ message: "book was added" });
});

// Add new author

app.post("/author/new", (req, res) => {
  const { newAuthor } = req.body;
  const addNewAuthor = AuthorModel.create(newAuthor);
  return res.json({ message: "Author was added" });
});

// Add new Publication

app.post("/publication/new", (req, res) => {
  const { newPublication } = req.body;
  const addNewPublication = PublicationModel.create(newPublication);
  return res.json({ message: "Publication was added" });
});

// Update Book

app.put("/book/:isbn", async (req, res) => {
  const updatedBook = await BookModel.findOneAndUpdate(
    {
      ISBN: req.params.isbn,
    },
    {
      title: req.body.bookTitle,
    },
    {
      new: true,
    }
  );

  return res.json({ books: updatedBook });
});

//Server

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
