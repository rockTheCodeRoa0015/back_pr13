require('dotenv').config()
const fs = require('fs')
const mongoose = require('mongoose')
const Book = require('../api/models/book')
const Categorie = require('../api/models/categorie')

const ARRBOOKS = []

const insertBooks = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log('La base de datos se conectó 😍')

    const allBooks = await Book.find()
    if (allBooks.length) {
      await Book.collection.drop()
      console.log('Coleccion borrada')
    }

    await Book.insertMany(ARRBOOKS)
    console.log('Datos insertados correctamente')

    await mongoose.disconnect()
  } catch (error) {
    console.log(error)
  }
}

const getCategories = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log('La base de datos se conectó 😍')

    const allcat = await Categorie.find()
    const mapCat = new Map()

    for (const cat of allcat) {
      mapCat.set(cat.id, cat._id)
    }

    await mongoose.disconnect()
    return mapCat
  } catch (error) {
    console.log(error)
  }
}

const seedBooks = async () => {
  const cat = await getCategories()
  fs.readFile('C:/proyecto 13 - Libros.csv', 'utf-8', (err, data) => {
    const array = data.split('\r\n')
    /*try {
      for (let i = 1; i < array.length; i++) {
        const bookRow = array[i].split(',')
        const obBook = {
          id: bookRow[0],
          title: bookRow[1],
          author: bookRow[2],
          cover: bookRow[3],
          synopsis: bookRow[8].replaceAll(';', ',').replaceAll('/', '\r\n'),
          price: bookRow[4],
          categories: cat.get(parseInt(bookRow[5])),
          sales: bookRow[6],
          stock: bookRow[7]
        }
        ARRBOOKS.push(obBook)
      }
      //console.log(ARRBOOKS)
      //insertBooks()
    } catch (error) {
      console.log(error)
    }*/
    try {
      for (let i = 1; i < array.length; i++) {
        let bookRow = array[i].split(',')

        const obj = {}

        for (let j = 0; j < bookRow.length; j++) {
          if (array[0].split(',')[j] === 'synopsis') {
            obj[array[0].split(',')[j]] = bookRow[j]
              .replaceAll(';', ',')
              .replaceAll('/', '\r\n')
          } else if (array[0].split(',')[j] === 'categories') {
            obj[array[0].split(',')[j]] = cat.get(parseInt(bookRow[j]))
          } else {
            obj[array[0].split(',')[j]] = bookRow[j]
          }
        }
        ARRBOOKS.push(obj)
      }
      //console.log(ARRBOOKS)
    } catch (error) {
      console.log(error)
    }
  })
  await insertBooks()
}

module.exports = {
  seedBooks
}
