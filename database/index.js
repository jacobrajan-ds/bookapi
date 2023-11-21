const books = [
  {
    ISBN: "1",
    title: "Getting started with MERN",
    authors: [1, 2],
    language: "en",
    pubDate: "2023-05-10",
    numOfPage: 225,
    category: ["tech", "programming"],
    publication: 1,
  },
  {
    ISBN: "2",
    title: "Harry Potter",
    authors: [2],
    language: "en",
    pubDate: "2022-05-10",
    numOfPage: 225,
    category: ["fiction", "novel"],
    publication: 1,
  },
];

const authors = [
  {
    id: 1,
    name: "jacob",
    books: [1],
  },
  {
    id: 2,
    name: "rajan",
    books: [2, 3],
  },
  {
    id: 3,
    name: "samuel",
    books: [1, 3],
  },
];

const publication = [{ id: 1, name: "apj", books: [1] }];

module.exports = { books, authors, publication };
