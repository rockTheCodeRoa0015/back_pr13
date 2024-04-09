const { isAuth, isAdmin } = require('../../middleware/auth')
const {
  getSales,
  getSalesById,
  getSalesByUser,
  getNextSales,
  postSale,
  updateSale,
  deleteSale
} = require('../controllers/sale')

const salesRoutes = require('express').Router()

salesRoutes.get('/getByUser', [isAuth], getSalesByUser)
salesRoutes.get('/getNextSale', [isAuth], getNextSales)
salesRoutes.get('/:id', [isAuth], getSalesById)
salesRoutes.get('/', [isAuth], getSales)
salesRoutes.post('/', [isAuth], postSale)
salesRoutes.put('/:id', [isAuth], updateSale)
salesRoutes.delete('/:id', [isAdmin], deleteSale)

module.exports = salesRoutes
