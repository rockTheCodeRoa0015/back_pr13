const { isAuth, isAdmin } = require('../../middleware/auth')
const {
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
} = require('../controllers/user')

const usersRoutes = require('express').Router()

usersRoutes.get('/nextUser', getNextUser)
usersRoutes.get('/byUserId/:id', [isAuth], getUserByUserId)
usersRoutes.get('/:id', [isAuth], getUserById)
usersRoutes.get('/', [isAuth], getUsers)
usersRoutes.post('/byUserAndMail', getUserByUsernameAndMail)
usersRoutes.post('/register', register)
usersRoutes.post('/login', login)
usersRoutes.put('/:id', [isAuth], updateUsers)
usersRoutes.put('/pass/:id', updateUsersPass)
usersRoutes.delete('/:id', [isAdmin], deleteUser)

module.exports = usersRoutes
