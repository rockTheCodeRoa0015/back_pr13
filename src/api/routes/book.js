const { isAuth, isAdmin } = require('../../middleware/auth')
const upload = require('../../middleware/file')
const {
  getBooks,
  getBookById,
  getBookByPersonalId,
  getBookByCategorie,
  getBookByTitle,
  getBookTopSales,
  getBookLastAdd,
  postBook,
  updateBook,
  deleteBook
} = require('../controllers/book')

const booksRoutes = require('express').Router()

booksRoutes.get('/getByPersonalId/:id', [isAuth], getBookByPersonalId)
booksRoutes.get('/getByCategorie', getBookByCategorie)
booksRoutes.get('/getByTitle', getBookByTitle)
booksRoutes.get('/getTopSales', getBookTopSales)
booksRoutes.get('/getLastAdd', getBookLastAdd)
booksRoutes.get('/:id', getBookById)
booksRoutes.get('/', getBooks)
booksRoutes.post('/', [isAuth], upload.single('cover'), postBook)
booksRoutes.put('/:id', [isAuth], upload.single('cover'), updateBook)
booksRoutes.delete('/:id', [isAdmin], deleteBook)

module.exports = booksRoutes
