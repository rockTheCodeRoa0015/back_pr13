const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const usersSchema = new mongoose.Schema(
  {
    id: { type: Number, trim: true, required: true, unique: true },
    email: { type: String, trim: true, required: true, unique: true },
    userName: { type: String, trim: true, required: true, unique: true },
    password: { type: String, trim: true, required: true },
    name: { type: String, trim: true, required: false },
    lastName1: { type: String, trim: true, required: false },
    lastName2: { type: String, trim: true, required: false },
    telephone: { type: String, trim: true, required: false },
    street: { type: String, trim: true, required: false },
    number: { type: String, trim: true, required: false },
    floor: { type: String, trim: true, required: false },
    door: { type: String, trim: true, required: false },
    postalCode: { type: String, trim: true, required: false },
    city: { type: String, trim: true, required: false },
    province: { type: String, trim: true, required: false },
    role: {
      type: String,
      required: false,
      enum: ['admin', 'user']
    }
  },
  {
    timestamps: true,
    collection: 'users'
  }
)

usersSchema.pre('save', function () {
  this.password = bcrypt.hashSync(this.password, 10)
})

usersSchema.pre('findOneAndUpdate', function (next) {
  if (this._update.password !== undefined) {
    this._update.password = bcrypt.hashSync(this._update.password, 10)
    next()
  }
  next()
})

const User = mongoose.model('users', usersSchema, 'users')
module.exports = User
