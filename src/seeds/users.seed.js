require('dotenv').config()
const fs = require('fs')
const mongoose = require('mongoose')
const User = require('../api/models/user')

const ARRUSERS = []

fs.readFile('C:/proyecto 13 - Usuarios.csv', 'utf-8', (err, data) => {
  const array = data.split('\r\n')

  try {
    for (let i = 1; i < array.length; i++) {
      const userRow = array[i].split(',')
      const obUser = {
        id: userRow[0],
        email: userRow[1],
        userName: userRow[2],
        password: userRow[3],
        name: userRow[4],
        lastName1: userRow[5],
        lastName2: userRow[6],
        telephone: userRow[7],
        street: userRow[8],
        number: userRow[9],
        floor: userRow[10],
        door: userRow[11],
        postalCode: userRow[12],
        city: userRow[13],
        province: userRow[14]
      }
      ARRUSERS.push(obUser)
    }
    //console.log(ARRUSERS)
    insertUsers()
  } catch (error) {
    console.log(error)
  }
})

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
