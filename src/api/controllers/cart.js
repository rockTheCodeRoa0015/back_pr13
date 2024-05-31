const Cart = require('../models/cart')

const getCart = async (req, res, next) => {
  try {
    const cart = await Cart.find().populate('users').populate('books')
    return res.status(200).json(cart)
  } catch (error) {
    return res.status(400).json('Error en la solicitud')
  }
}

const getCartById = async (req, res, next) => {
  try {
    const { id } = req.params
    const cart = await Cart.findById(id).populate('users').populate('books')
    return res.status(200).json(cart)
  } catch (error) {
    return res.status(400).json('Error')
  }
}

const getCartByUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const sale = await Cart.find({ users: id })
      .populate('users')
      .populate('books')
    return res.status(200).json(sale)
  } catch (error) {
    return res.status(400).json('Error')
  }
}

const getCartByUserAndBook = async (req, res, next) => {
  try {
    const sale = await Cart.find({
      users: req.body.user,
      books: req.body.book
    })
      .populate('users')
      .populate('books')
    return res.status(200).json(sale)
  } catch (error) {
    return res.status(400).json('Error')
  }
}

const postCart = async (req, res, next) => {
  try {
    const newCart = new Cart(req.body)
    const cartSaved = await newCart.save()
    return res.status(201).json({ mensaje: 'Añadido a la cesta', cartSaved })
  } catch (error) {
    return res.status(400).json('Error')
  }
}

const updateCart = async (req, res, next) => {
  try {
    const { id } = req.params
    const newCart = new Cart(req.body)
    newCart._id = id
    const up = await Cart.findByIdAndUpdate(id, newCart, {
      new: true
    })
    return res.status(200).json({ mensaje: 'Articulo modificado', up })
  } catch (error) {
    return res.status(400).json('Error')
  }
}

const deleteCart = async (req, res, next) => {
  try {
    const { id } = req.params
    const cartDeleted = await Cart.findByIdAndDelete(id)
    return res.status(200).json({ mensaje: 'Articulo eliminado', cartDeleted })
  } catch (error) {
    return res.status(400).json('Error')
  }
}

module.exports = {
  getCart,
  getCartById,
  getCartByUser,
  getCartByUserAndBook,
  postCart,
  updateCart,
  deleteCart
}
