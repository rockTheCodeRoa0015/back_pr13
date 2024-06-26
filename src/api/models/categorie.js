const mongoose = require('mongoose')

const categoriesSchema = new mongoose.Schema(
  {
    id: { type: Number, trim: true, required: true, unique: true },
    categorie: { type: String, required: true },
    books: [{ type: mongoose.Types.ObjectId, required: false, ref: 'books' }]
  },
  {
    timestamps: true,
    collection: 'categories'
  }
)

const Categorie = mongoose.model('categories', categoriesSchema, 'categories')
module.exports = Categorie
