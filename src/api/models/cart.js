const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema(
  {
    user: { type: Number, required: false },
    book: { type: Number, required: false },
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
