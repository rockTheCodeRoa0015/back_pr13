require('dotenv').config()
const fs = require('fs')
const mongoose = require('mongoose')
const Book = require('../api/models/book')

const ARRBOOKS = []

fs.readFile('C:/proyecto 13 - Libros.csv', 'utf-8', (err, data) => {
  const array = data.split('\r\n')
  try {
    for (let i = 1; i < array.length; i++) {
      const bookRow = array[i].split(',')
      const obBook = {
        id: bookRow[0],
        title: bookRow[1],
        author: bookRow[2],
        cover: bookRow[3],
        synopsis: bookRow[8].replaceAll(';', ',').replaceAll('/', '\r\n'),
        price: bookRow[4],
        categories: bookRow[5],
        sales: bookRow[6],
        stock: bookRow[7]
      }
      ARRBOOKS.push(obBook)
    }
    //console.log(ARRBOOKS)
    insertBooks()
  } catch (error) {
    console.log(error)
  }
})

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
