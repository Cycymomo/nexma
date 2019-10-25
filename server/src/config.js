const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  api_secret: process.env.PRISMA_MANAGEMENT_API_SECRET
};
