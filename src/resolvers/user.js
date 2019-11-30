import Joi from 'joi'
import { User } from '../models'
import { signUp, signIn, ObjectId } from '../schemasValidation'
import * as Auth from '../auth'

export default {
  Query: {
    me: (root, args, { req }, info) => {
      return User.findById(req.session.userId)
    },
    users: (root, args, { req }, info) => {
      return User.find({})
    },
    user: async (root, args, context, info) => {
      await Joi.validate(args, ObjectId)
      return User.findById(args.id)
    }

  },
  Mutation: {
    signUp: async (root, args, { req }, info) => {
      await Joi.validate(args, signUp, { abortEarly: false })

      const user = await User.create(args)

      req.session.userId = user.id

      return user
    },
    signIn: async (root, args, { req }, info) => {
      const { email, password } = args
      await Joi.validate(args, signIn, { abortEarly: false })

      const user = await Auth.attemptSignIn(email, password)
      req.session.userId = user.id
      return user
    },
    signOut: (root, args, { req, res }, info) => {
      return Auth.signOut(req, res)
    }
  },
  User: {
    chats: async (user, args, context, info) =>
      (await user.populate('chats').execPopulate()).chats
  }
}
