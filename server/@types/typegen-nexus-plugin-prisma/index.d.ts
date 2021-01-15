import * as Typegen from 'nexus-plugin-prisma/typegen'
import * as Prisma from '@prisma/client';

// Pagination type
type Pagination = {
  first?: boolean
  last?: boolean
  before?: boolean
  after?: boolean
}

// Prisma custom scalar names
type CustomScalars = 'DateTime'

// Prisma model type definitions
interface PrismaModels {
  User: Prisma.User
  Post: Prisma.Post
  Comment: Prisma.Comment
}

// Prisma input types metadata
interface NexusPrismaInputs {
  Query: {
    users: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'email' | 'password' | 'name' | 'posts' | 'comments' | 'createdAt' | 'updatedAt'
      ordering: 'id' | 'email' | 'password' | 'name' | 'createdAt' | 'updatedAt'
    }
    posts: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'title' | 'content' | 'published' | 'author' | 'authorId' | 'comments' | 'createdAt' | 'updatedAt'
      ordering: 'id' | 'title' | 'content' | 'published' | 'authorId' | 'createdAt' | 'updatedAt'
    }
    comments: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'author' | 'authorId' | 'post' | 'postId' | 'content' | 'createdAt' | 'updatedAt'
      ordering: 'id' | 'authorId' | 'postId' | 'content' | 'createdAt' | 'updatedAt'
    }
  },
  User: {
    posts: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'title' | 'content' | 'published' | 'author' | 'authorId' | 'comments' | 'createdAt' | 'updatedAt'
      ordering: 'id' | 'title' | 'content' | 'published' | 'authorId' | 'createdAt' | 'updatedAt'
    }
    comments: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'author' | 'authorId' | 'post' | 'postId' | 'content' | 'createdAt' | 'updatedAt'
      ordering: 'id' | 'authorId' | 'postId' | 'content' | 'createdAt' | 'updatedAt'
    }
  }
  Post: {
    comments: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'author' | 'authorId' | 'post' | 'postId' | 'content' | 'createdAt' | 'updatedAt'
      ordering: 'id' | 'authorId' | 'postId' | 'content' | 'createdAt' | 'updatedAt'
    }
  }
  Comment: {

  }
}

// Prisma output types metadata
interface NexusPrismaOutputs {
  Query: {
    user: 'User'
    users: 'User'
    post: 'Post'
    posts: 'Post'
    comment: 'Comment'
    comments: 'Comment'
  },
  Mutation: {
    createOneUser: 'User'
    updateOneUser: 'User'
    updateManyUser: 'BatchPayload'
    deleteOneUser: 'User'
    deleteManyUser: 'BatchPayload'
    upsertOneUser: 'User'
    createOnePost: 'Post'
    updateOnePost: 'Post'
    updateManyPost: 'BatchPayload'
    deleteOnePost: 'Post'
    deleteManyPost: 'BatchPayload'
    upsertOnePost: 'Post'
    createOneComment: 'Comment'
    updateOneComment: 'Comment'
    updateManyComment: 'BatchPayload'
    deleteOneComment: 'Comment'
    deleteManyComment: 'BatchPayload'
    upsertOneComment: 'Comment'
  },
  User: {
    id: 'Int'
    email: 'String'
    password: 'String'
    name: 'String'
    posts: 'Post'
    comments: 'Comment'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
  }
  Post: {
    id: 'String'
    title: 'String'
    content: 'String'
    published: 'Boolean'
    author: 'User'
    authorId: 'Int'
    comments: 'Comment'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
  }
  Comment: {
    id: 'String'
    author: 'User'
    authorId: 'Int'
    post: 'Post'
    postId: 'String'
    content: 'String'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
  }
}

// Helper to gather all methods relative to a model
interface NexusPrismaMethods {
  User: Typegen.NexusPrismaFields<'User'>
  Post: Typegen.NexusPrismaFields<'Post'>
  Comment: Typegen.NexusPrismaFields<'Comment'>
  Query: Typegen.NexusPrismaFields<'Query'>
  Mutation: Typegen.NexusPrismaFields<'Mutation'>
}

interface NexusPrismaGenTypes {
  inputs: NexusPrismaInputs
  outputs: NexusPrismaOutputs
  methods: NexusPrismaMethods
  models: PrismaModels
  pagination: Pagination
  scalars: CustomScalars
}

declare global {
  interface NexusPrismaGen extends NexusPrismaGenTypes {}

  type NexusPrisma<
    TypeName extends string,
    ModelOrCrud extends 'model' | 'crud'
  > = Typegen.GetNexusPrisma<TypeName, ModelOrCrud>;
}
  