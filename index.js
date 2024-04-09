require('dotenv').config()
const express = require('express')
const { connectDB } = require('./src/config/db')
const cloudinary = require('cloudinary').v2
const cors = require('cors')
const salesRoutes = require('./src/api/routes/sale')
const usersRoutes = require('./src/api/routes/user')
const booksRoutes = require('./src/api/routes/book')
const categoriesRoutes = require('./src/api/routes/categorie')
const cartsRoutes = require('./src/api/routes/cart')

const app = express()

connectDB()

app.use(cors())

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

app.use(express.json())

app.use('/api/v1/users', usersRoutes)
app.use('/api/v1/books', booksRoutes)
app.use('/api/v1/categories', categoriesRoutes)
app.use('/api/v1/sales', salesRoutes)
app.use('/api/v1/carts', cartsRoutes)

app.use('*', (req, res, next) => {
  return res.status(404).json('Route not found')
})

app.listen(3000, () => {
  console.log('El servidor está funcionando en: http://localhost:3000')
})
