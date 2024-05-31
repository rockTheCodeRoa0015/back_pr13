const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema(
  {
    users: { type: mongoose.Types.ObjectId, required: false, ref: 'users' },
    books: { type: mongoose.Types.ObjectId, required: false, ref: 'books' },
    numCopies: { type: Number, required: false },
    price: { type: Number, required: false }
  },
  {
    timestamps: true,
    collection: 'carts'
  }
)

const Cart = mongoose.model('carts', cartSchema, 'carts')
module.exports = Cart
