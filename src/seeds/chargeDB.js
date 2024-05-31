const { seedBooks } = require('./books.seed')
const { seedCategories, updateCategorie } = require('./categories.seed')
const { seedSales } = require('./sales.seed')
const { seedUsers } = require('./users.seed')

const chargeAllSeeds = async () => {
  await seedUsers()
  await seedCategories()
  await seedBooks()
  await updateCategorie()
  await seedSales()
}

chargeAllSeeds()
