require('dotenv').config()
const fs = require('fs')
const mongoose = require('mongoose')
const Categorie = require('../api/models/categorie')
const Book = require('../api/models/book')

const ARRCATEGORIES = []

const insertCategories = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log('La base de datos se conectó 😍')

    const allCat = await Categorie.find()
    if (allCat.length) {
      await Categorie.collection.drop()
      console.log('Coleccion borrada')
    }

    await Categorie.insertMany(ARRCATEGORIES)
    console.log('Datos insertados correctamente')

    await mongoose.disconnect()
  } catch (error) {
    console.log(error)
  }
}

const seedCategories = async () => {
  fs.readFile('C:/proyecto 13 - Categorías.csv', 'utf-8', (err, data) => {
    const array = data.split('\r\n')

    try {
      for (let i = 1; i < array.length; i++) {
        const catRow = array[i].split(',')
        const obCategorie = {
          id: catRow[0],
          categorie: catRow[1]
        }
        ARRCATEGORIES.push(obCategorie)
      }
      //
      //console.log(ARRCATEGORIES)
    } catch (error) {
      console.log(error)
    }
  })
  await insertCategories()
}

const getCategories = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log('La base de datos se conectó 😍')

    const allcat = await Categorie.find()

    await mongoose.disconnect()
    return allcat
  } catch (error) {
    console.log(error)
  }
}

const getBooks = async (categorie, id) => {
  //console.log(categorie + '---' + id)
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log('La base de datos se conectó 😍')

    const allbooks = await Book.find({ categories: categorie })
    const mapBooks = new Map()
    const arr = []
    for (const book of allbooks) {
      arr.push(book._id)
    }
    mapBooks.set(id, arr)

    await mongoose.disconnect()
    return mapBooks
  } catch (error) {
    console.log(error)
  }
}

const updateCategorie = async () => {
  const cat = await getCategories()
  //console.log(cat)
  for (const categorie of cat) {
    const books = await getBooks(categorie._id, categorie.id)
    //console.log(books)
    const newCategorie = new Categorie()
    newCategorie._id = categorie._id
    newCategorie.books = books.get(parseInt(categorie.id))
    //console.log(newCategorie)
    try {
      await mongoose.connect(process.env.DB_URL)
      console.log('La base de datos se conectó 😍')
      await Categorie.findByIdAndUpdate(categorie._id, newCategorie)
      await mongoose.disconnect()
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = {
  seedCategories,
  updateCategorie
}
