const mongoose = require("mongoose");

const AuthorSchema = mongoose.Schema({
  id: Number,
  name: String,
  books: [Number],
});

const AuthorModel = mongoose.model(AuthorSchema);

module.exports = AuthorModel;
