const { hash, compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')

const Mutation = {
  signup: async (parent, { name, email, password }, context) => {
    const hashedPassword = await hash(password, 10)
    const user = await context.prisma.createUser({
      name,
      email,
      password: hashedPassword,
    })
    const token = sign({ userId: user.id }, process.env.PRISMA_MANAGEMENT_API_SECRET)
    context.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
    })
    return user
  },
  login: async (parent, { email, password }, context) => {
    const user = await context.prisma.user({ email })
    if (!user) {
      throw new Error(`No user found for email: ${email}`)
    }
    const passwordValid = await compare(password, user.password)
    if (!passwordValid) {
      throw new Error('Invalid password')
    }
    const token = sign({ userId: user.id }, process.env.PRISMA_MANAGEMENT_API_SECRET)
    context.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
    })
    return user
  },
  logout: (parent, args, context) => {
    context.response.clearCookie('token')
    return { message: 'See you !' }
  },
  createDraft: async (parent, { title, content }, context) => {
    return context.prisma.createPost({
      title,
      content,
      author: { connect: { id: context.request.userId } },
    })
  },
  deletePost: async (parent, { id }, context) => {
    return context.prisma.deletePost({ id })
  },
  publish: async (parent, { id }, context) => {
    return context.prisma.updatePost({
      where: { id },
      data: { published: true },
    })
  },
}

module.exports = {
  Mutation,
}
