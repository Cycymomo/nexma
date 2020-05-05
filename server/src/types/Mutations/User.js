const { stringArg, mutationField } = require('@nexus/schema')
const { hash, compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')

const signup = mutationField('signup', {
  type: 'User',
  args: {
    name: stringArg({ nullable: true }),
    email: stringArg({ required: true }),
    password: stringArg({ required: true }),
  },
  resolve: async (parent, { name, email, password }, context) => {
    const hashedPassword = await hash(password, 10)
    const user = await context.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })
    const token = sign({ userId: user.id }, process.env.APP_SECRET)
    context.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
    })
    return user
  },
})

const login = mutationField('login', {
  type: 'User',
  args: {
    email: stringArg({ required: true }),
    password: stringArg({ required: true }),
  },
  resolve: async (parent, { email, password }, context) => {
    const user = await context.prisma.user.findOne({
      where: {
        email,
      },
    })
    if (!user) {
      throw new Error(`No user found for email: ${email}`)
    }
    const passwordValid = await compare(password, user.password)
    if (!passwordValid) {
      throw new Error('Invalid password')
    }
    const token = sign({ userId: user.id }, process.env.APP_SECRET)
    context.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
    })
    return user
  },
})

const logout = mutationField('logout', {
  type: 'String',
  nullable: true,
  resolve: async (parent, { email, password }, context) => {
    context.response.clearCookie('token')
  },
})

module.exports = {
  signup,
  login,
  logout,
}
