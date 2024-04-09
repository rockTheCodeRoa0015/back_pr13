const mongoose = require('mongoose')

const salesSchema = new mongoose.Schema(
  {
    id: { type: Number, trim: true, required: true, unique: true },
    user: { type: Number, required: false },
    book: { type: Number, required: false },
    price: { type: Number, required: false },
    numCopies: { type: Number, required: false },
    date: { type: Date, required: false },
    state: {
      type: String,
      trim: true,
      enum: ['comprado', 'enviado', 'entregado'],
      required: false
    },
    pay: {
      type: String,
      trim: true,
      enum: ['Visa', 'Paypal', 'Contrarembolso'],
      required: false
    }
  },
  {
    timestamps: true,
    collection: 'sales'
  }
)

const Sale = mongoose.model('sales', salesSchema, 'sales')
module.exports = Sale
