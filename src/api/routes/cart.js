const { isAuth } = require('../../middleware/auth')
const {
  getCart,
  getCartById,
  getCartByUser,
  getCartByUserAndBook,
  postCart,
  updateCart,
  deleteCart
} = require('../controllers/cart')

const cartsRoutes = require('express').Router()

cartsRoutes.get('/getByUser/:id', [isAuth], getCartByUser)
cartsRoutes.get('/:id', [isAuth], getCartById)
cartsRoutes.get('/', [isAuth], getCart)
cartsRoutes.post('/getCartUserAndBook', [isAuth], getCartByUserAndBook)
cartsRoutes.post('/', [isAuth], postCart)
cartsRoutes.put('/:id', [isAuth], updateCart)
cartsRoutes.delete('/:id', [isAuth], deleteCart)

module.exports = cartsRoutes
