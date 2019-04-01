export const {
  NODE_ENV = 'development',
  DB_USERNAME = 'phantom',
  DB_PASSWORD = 'sahu1989',
  DB_HOST = 'ds123196.mlab.com',
  DB_PORT = 23196,
  DB_NAME = 'sahu',

  SESS_NAME = 'sid',
  SESS_SECRET = 'ssh!secret!',
  SESS_LIFETIME = 1000 * 60 * 60 * 2,

  REDI_HOST = 'redis-15083.c90.us-east-1-3.ec2.cloud.redislabs.com',
  REDIS_PORT = 15083,
  REDIS_PASSWORD = 'G14Uc6iye9puo62njCQCODhUyI0wD5Oh'

} = process.env

export const PROD = NODE_ENV === 'production'
