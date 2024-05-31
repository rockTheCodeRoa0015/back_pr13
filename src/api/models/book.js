const mongoose = require('mongoose')

const booksSchema = new mongoose.Schema(
  {
    id: { type: Number, trim: true, required: true, unique: true },
    title: { type: String, trim: true, required: true, unique: true },
    author: { type: String, trim: true, required: true },
    cover: { type: String, required: false },
    synopsis: { type: String, required: false },
    price: { type: Number, required: false },
    categories: {
      type: mongoose.Types.ObjectId,
      required: false,
      ref: 'categories'
    },
    sales: { type: Number, trim: true, required: false },
    stock: { type: Number, trim: true, required: false }
  },
  {
    timestamps: true,
    collection: 'books'
  }
)

const Book = mongoose.model('books', booksSchema, 'books')
module.exports = Book
