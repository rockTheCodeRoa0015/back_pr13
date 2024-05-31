require('dotenv').config()
const fs = require('fs')
const mongoose = require('mongoose')
const User = require('../api/models/user')

const ARRUSERS = []

const insertUsers = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log('La base de datos se conectó 😍')

    const allusers = await User.find()
    if (allusers.length) {
      await User.collection.drop()
      console.log('Coleccion borrada')
    }

    for (const user of ARRUSERS) {
      const newUser = new User(user)
      await newUser.save()
    }
    console.log('Datos insertados correctamente')

    await mongoose.disconnect()
  } catch (error) {
    console.log(error)
  }
}

const seedUsers = async () => {
  fs.readFile('C:/proyecto 13 - Usuarios.csv', 'utf-8', (err, data) => {
    const array = data.split('\r\n')

    try {
      for (let i = 1; i < array.length; i++) {
        let userRow = array[i].split(',')

        const obj = {}

        for (let j = 0; j < userRow.length; j++) {
          obj[array[0].split(',')[j]] = userRow[j]
        }
        ARRUSERS.push(obj)
      }
    } catch (error) {
      console.log(error)
    }
  })
  await insertUsers()
}

module.exports = {
  seedUsers
}
