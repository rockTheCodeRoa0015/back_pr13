const { generateSign } = require('../../utils/jwt')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const register = async (req, res, next) => {
  try {
    const newUser = new User(req.body)
    const { userName, email } = req.body

    const duplicatedUser = await User.findOne({
      $or: [{ userName }, { email }]
    })

    if (duplicatedUser) {
      return res.status(400).json('Ese nombre de usuario o email ya existe')
    }

    newUser.role = 'user'
    await newUser.save()
    const response = {
      status: 201,
      desc: 'Usuario Registrado'
    }
    return res.status(201).json(response)
  } catch (error) {
    return res.status(400).json(error)
  }
}

const login = async (req, res, next) => {
  try {
    let user = ''
    if (req.body.userName !== '' && req.body.userName !== undefined) {
      user = await User.findOne({ userName: req.body.userName })
    }
    if (!user) {
      return res.status(400).json('El usuario o la contraseña son incorrectos')
    }
    if (bcrypt.compareSync(req.body.password, user.password)) {
      //! lo que pasa cuando te logueas con jsonwebtoken
      const token = generateSign(user._id)
      return res.status(200).json({ user, token })
    } else {
      return res.status(400).json('El usuario o la contraseña son incorrectos')
    }
  } catch (error) {
    return res.status(400).json(error)
  }
}

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find()
    return res.status(200).json(users)
  } catch (error) {
    return res.status(400).json(error)
  }
}

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)
    return res.status(200).json(user)
  } catch (error) {
    return res.status(400).json('Error')
  }
}

const getUserByUserId = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await User.find({ id: id })
    return res.status(200).json(user)
  } catch (error) {
    return res.status(400).json('Error')
  }
}

const getUserByUsernameAndMail = async (req, res, next) => {
  try {
    const user = await User.find({
      userName: req.body.userName,
      email: req.body.email
    })
    const response = {
      user: user
    }
    user.length === 0
      ? ((response.status = 400),
        (response.msg = 'Usuario o email no correctos'))
      : (response.status = 200)

    return res.status(200).json(response)
  } catch (error) {
    return res.status(400).json('Error')
  }
}

const getNextUser = async (req, res, next) => {
  try {
    const user = await User.findOne().sort({ id: -1 })
    const nextUser = { next: parseInt(user.id) + 1 }
    return res.status(200).json(nextUser)
  } catch (error) {
    return res.status(400).json('Error')
  }
}

const updateUsers = async (req, res, next) => {
  try {
    const { id } = req.params
    const newUser = new User(req.body)
    newUser._id = id
    const updateUser = await User.findByIdAndUpdate(id, newUser, {
      new: true
    })
    return res
      .status(200)
      .json({ mensaje: 'Este usuario ha sido Modificado', updateUser })
  } catch (error) {
    return res.status(400).json('Error')
  }
}

const updateUsersPass = async (req, res, next) => {
  try {
    const { id } = req.params
    const newUser = new User(req.body)
    newUser._id = id
    const updateUser = await User.findByIdAndUpdate(id, newUser, {
      new: true
    })
    return res
      .status(200)
      .json({ mensaje: 'La contraseña ha sido modificada', updateUser })
  } catch (error) {
    return res.status(400).json('Error al modificar el password')
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const userDeleted = await User.findByIdAndDelete(id)
    return res.status(200).json({
      mensaje: 'Este usuario ha sido eliminado',
      userDeleted
    })
  } catch (error) {
    return res.status(400).json(error)
  }
}

module.exports = {
  register,
  login,
  getUsers,
  getUserById,
  getUserByUserId,
  getUserByUsernameAndMail,
  getNextUser,
  updateUsers,
  updateUsersPass,
  deleteUser
}
