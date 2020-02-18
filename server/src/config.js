const dotenv = require('dotenv')
dotenv.config()
module.exports = {
  PRISMA_MANAGEMENT_API_SECRET: process.env.PRISMA_MANAGEMENT_API_SECRET,
  PRISMA_URL: process.env.PRISMA_URL
}
