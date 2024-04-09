require('dotenv').config()
const fs = require('fs')
const mongoose = require('mongoose')
const Categorie = require('../api/models/categorie')

const ARRCATEGORIES = []

fs.readFile('C:/proyecto 13 - Categorías.csv', 'utf-8', (err, data) => {
  const array = data.split('\r\n')

  try {
    for (let i = 1; i < array.length; i++) {
      const catRow = array[i].split(',')
      const obCategorie = {
        id: catRow[0],
        categorie: catRow[1],
        books: catRow[2].split('-')
      }
      ARRCATEGORIES.push(obCategorie)
    }
    insertCategories()
  } catch (error) {
    console.log(error)
  }
})

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
