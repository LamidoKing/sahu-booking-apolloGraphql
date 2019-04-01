import { ApolloServer } from 'apollo-server-express'
import mongoose from 'mongoose'
import express from 'express'
import session from 'express-session'
import connectRedis from 'connect-redis'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import cors from 'cors'
import {
  PROD, DB_USERNAME, DB_PASSWORD,
  DB_HOST, DB_PORT, DB_NAME, SESS_NAME,
  SESS_SECRET, SESS_LIFETIME, REDI_HOST,
  REDIS_PORT, REDIS_PASSWORD
} from './config'
import schemaDirectives from './CustomDirective'

mongoose.connect(
  `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  {
    useNewUrlParser: true
  }
)

const PORT = process.env.PORT || 4000
const app = express()

app.use(cors())

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.applyMiddleware({ app, cors: false })

app.listen({ port: PORT }, () =>
  console.log(`http://localhost:${PORT}${server.graphqlPath}`)
)
