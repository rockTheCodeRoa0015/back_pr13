const Book = require('../models/book')
const { deleteFile } = require('../../utils/deleteFile')

const getBooks = async (req, res, next) => {
  try {
    const book = await Book.find()
    return res.status(200).json(book)
  } catch (error) {
    return res.status(400).json('Error en la solicitud')
  }
}

const getBookById = async (req, res, next) => {
  try {
    const { id } = req.params
    const book = await Book.findById(id)
    return res.status(200).json(book)
  } catch (error) {
    return res.status(400).json('Error')
  }
}

const getBookByPersonalId = async (req, res, next) => {
  try {
    const { id } = req.params
    const book = await Book.find({ id: id })
    return res.status(200).json(book)
  } catch (error) {
    return res.status(400).json('Error')
  }
}

const getBookByCategorie = async (req, res, next) => {
  try {
    const { categorie, page, limit } = req.query
    let countbook = 0
    let book = ''
    if (categorie !== 'all') {
      countbook = await Book.find({ categories: categorie })
      book = await Book.find({ categories: categorie })
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ title: 1 })
    } else {
      countbook = await Book.find({ categories: { $nin: [9, 10] } })
      book = await Book.find({ categories: { $nin: [9, 10] } })
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ title: 1 })
    }
    const fullInfoBook = {
      metadata: {
        count: countbook.length,
        pageNumber: page,
        totalPage: Math.ceil(countbook.length / limit)
      },
      data: book
    }

    return res.status(200).json(fullInfoBook)
  } catch (error) {
    return res.status(400).json('Error')
  }
}

const getBookByTitle = async (req, res, next) => {
  try {
    const { title, page, limit } = req.query
    const countbook = await Book.find({
      title: { $regex: '.*' + title + '.*' }
    })
    const book = await Book.find({
      title: { $regex: '.*' + title + '.*' }
    })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ title: 1 })

    const fullInfoBook = {
      metadata: {
        count: countbook.length,
        pageNumber: page,
        totalPage: Math.ceil(countbook.length / limit)
      },
      data: book
    }
    return res.status(200).json(fullInfoBook)
  } catch (error) {
    return res.status(400).json('Error')
  }
}

const getBookTopSales = async (req, res, next) => {
  try {
    const { title } = req.params
    const book = await Book.find().limit(5).sort({ sales: -1 })
    return res.status(200).json(book)
  } catch (error) {
    return res.status(400).json('Error')
  }
}

const getBookLastAdd = async (req, res, next) => {
  try {
    const { title } = req.params
    const book = await Book.find().limit(5).sort({ createdAt: -1 })
    return res.status(200).json(book)
  } catch (error) {
    return res.status(400).json('Error')
  }
}

const postBook = async (req, res, next) => {
  try {
    const newBook = new Book(req.body)
    if (req.file) {
      newBook.cover = req.file.path
    }
    const bookSaved = await newBook.save()
    return res.status(201).json({ mensaje: 'Libro creado', bookSaved })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json('El Libro ya esta en la bdd')
    }
    return res.status(400).json('error')
  }
}

const updateBook = async (req, res, next) => {
  try {
    const { id } = req.params
    const bookPreUpdate = await Book.findById(id)
    const newBook = new Book(req.body)
    newBook._id = id
    if (req.file) {
      newBook.cover = req.file.path
      deleteFile(bookPreUpdate.cover)
    }
    const up = await Book.findByIdAndUpdate(id, newBook, {
      new: true
    })
    return res.status(200).json({ mensaje: 'Libro modificado', up })
  } catch (error) {
    return res.status(400).json('Error')
  }
}

const deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params
    const bookDeleted = await Book.findByIdAndDelete(id)
    deleteFile(bookDeleted.cover)
    return res.status(200).json({ mensaje: 'Libro eliminado', bookDeleted })
  } catch (error) {
    return res.status(400).json('Error')
  }
}

module.exports = {
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
}
