const Categorie = require('../models/categorie')

const getCategories = async (req, res, next) => {
  try {
    const categorie = await Categorie.find()
    return res.status(200).json(categorie)
  } catch (error) {
    return res.status(400).json('Error en la solicitud')
  }
}

const getCategorieById = async (req, res, next) => {
  try {
    const { id } = req.params
    const categorie = await Categorie.findById(id)
    return res.status(200).json(categorie)
  } catch (error) {
    return res.status(400).json('Error')
  }
}

const getCategoriesSelect = async (req, res, next) => {
  try {
    const categorie = await Categorie.find({ id: { $nin: [9, 10] } })
    return res.status(200).json(categorie)
  } catch (error) {
    return res.status(400).json('Error en la solicitud')
  }
}

const getCategorieByPersonalId = async (req, res, next) => {
  try {
    const { id } = req.params
    const categorie = await Categorie.find({ id: id })
    return res.status(200).json(categorie)
  } catch (error) {
    return res.status(400).json('Error')
  }
}

const postCategorie = async (req, res, next) => {
  try {
    const newCategorie = new Categorie(req.body)
    const categorieSaved = await newCategorie.save()
    return res.status(201).json({ mensaje: 'Categoria creada', categorieSaved })
  } catch (error) {
    return res.status(400).json('Error')
  }
}

const updateCategorie = async (req, res, next) => {
  try {
    const { id } = req.params
    const oldCategorie = await Categorie.findById(id)
    const newCategorie = new Categorie(req.body)
    newCategorie._id = id
    newCategorie.books = [...oldCategorie.books, ...newCategorie.books]
    const up = await Categorie.findByIdAndUpdate(id, newCategorie, {
      new: true
    })
    return res.status(200).json({ mensaje: 'Categoria modificada', up })
  } catch (error) {
    return res.status(400).json('Error')
  }
}

const deleteCategorie = async (req, res, next) => {
  try {
    const { id } = req.params
    const categorieDeleted = await Categorie.findByIdAndDelete(id)
    return res
      .status(200)
      .json({ mensaje: 'Categoria eliminada', categorieDeleted })
  } catch (error) {
    return res.status(400).json('Error')
  }
}

module.exports = {
  getCategories,
  getCategorieById,
  getCategoriesSelect,
  getCategorieByPersonalId,
  postCategorie,
  updateCategorie,
  deleteCategorie
}
