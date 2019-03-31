import { ApolloServer } from 'apollo-server-express'
import mongoose from 'mongoose'
import express from 'express'
import session from 'express-session'
import connectRedis from 'connect-redis'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import cors from 'cors'
import {
  PORT, PROD, DB_USERNAME, DB_PASSWORD,
  DB_HOST, DB_PORT, DB_NAME, SESS_NAME,
  SESS_SECRET, SESS_LIFETIME, REDI_HOST,
  REDIS_PORT, REDIS_PASSWORD
} from './config'
import schemaDirectives from './CustomDirective'

(async () => {
  try {
    await mongoose.connect(
      `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
      {
        useNewUrlParser: true
      }
    )

    const app = express()

    app.disable('x-powered-by')
    const RedisStore = connectRedis(session)
    const store = new RedisStore({
      host: REDI_HOST,
      port: REDIS_PORT,
      pass: REDIS_PASSWORD
    })

    app.use(cors())

    app.use(session({
      store,
      name: SESS_NAME,
      secret: SESS_SECRET,
      resave: true,
      rolling: true,
      saveUninitialized: false,
      cookie: {
        maxAge: parseInt(SESS_LIFETIME),
        sameSite: true,
        secure: PROD
      }
    }))
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      schemaDirectives,
      playground: PROD ? false : {
        'request.credentials': 'include'
      },
      context: ({ req, res }) => ({ req, res })
    })

    server.applyMiddleware({ app, cors: false })
    server.listen({ port: process.env.PORT || PORT })

    app.listen({ port: process.env.PORT || PORT }, () =>
      console.log(`http://localhost:${PORT}${server.graphqlPath}`)
    )
  } catch (e) {
    console.error(e)
  }
})()
