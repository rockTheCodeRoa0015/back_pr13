require('dotenv').config()
const fs = require('fs')
const mongoose = require('mongoose')
const Sale = require('../api/models/sale')
const Book = require('../api/models/book')
const User = require('../api/models/user')

const ARRSALES = []

const insertSales = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log('La base de datos se conectó 😍')

    const allBooks = await Sale.find()
    if (allBooks.length) {
      await Sale.collection.drop()
      console.log('Coleccion borrada')
    }

    await Sale.insertMany(ARRSALES)
    console.log('Datos insertados correctamente')

    await mongoose.disconnect()
  } catch (error) {
    console.log(error)
  }
}

const getBooks = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log('La base de datos se conectó 😍')

    const allBooks = await Book.find()
    const mapBooks = new Map()

    for (const book of allBooks) {
      mapBooks.set(book.id, book._id)
    }

    await mongoose.disconnect()
    return mapBooks
  } catch (error) {
    console.log(error)
  }
}

const getUsers = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log('La base de datos se conectó 😍')

    const allUsers = await User.find()
    const mapUser = new Map()

    for (const user of allUsers) {
      mapUser.set(user.id, user._id)
    }

    await mongoose.disconnect()
    return mapUser
  } catch (error) {
    console.log(error)
  }
}

const seedSales = async () => {
  const books = await getBooks()
  const users = await getUsers()
  fs.readFile('C:/proyecto 13 - Ventas.csv', 'utf-8', (err, data) => {
    const array = data.split('\r\n')
    try {
      for (let i = 1; i < array.length; i++) {
        const saleRow = array[i].split(',')
        const obSale = {
          id: saleRow[0],
          users: users.get(parseInt(saleRow[1])),
          books: books.get(parseInt(saleRow[2])),
          price: saleRow[3],
          numCopies: saleRow[4],
          date: saleRow[5],
          state: saleRow[6],
          pay: saleRow[7]
        }
        ARRSALES.push(obSale)
      }
      //console.log(ARRSALES)
      //insertSales()
    } catch (error) {
      console.log(error)
    }
  })
  await insertSales()
}

module.exports = {
  seedSales
}
