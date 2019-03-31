import { AuthenticationError } from 'apollo-server-express'
import { User } from './models'
import { SESS_NAME } from './config'

export const attemptSignIn = async (email, password) => {
  const message = (pram) => pram === user ? 'Incorrect email or not register, Please check and try again' : 'Incorrect password, Please check and try again'
  const user = await User.findOne({ email })
  if (!user) {
    throw new AuthenticationError(message(user))
  }

  if (!await user.matchesPassword(password)) {
    throw new AuthenticationError(message(password))
  }

  return user
}
const signedIn = req => req.session.userId

export const ensureSignedIn = req => {
  if (!signedIn(req)) {
    throw new AuthenticationError('You must be signed in.')
  }
}

export const ensureSignedOut = req => {
  if (signedIn(req)) {
    throw new AuthenticationError('You are already signed in.')
  }
}

export const signOut = (req, res) => new Promise(
  (resolve, reject) => {
    req.session.destroy(err => {
      if (err) reject(err)

      res.clearCookie(SESS_NAME)

      resolve(true)
    })
  }
)
