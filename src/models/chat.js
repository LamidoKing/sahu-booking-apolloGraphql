import { Schema, model } from 'mongoose'
import { User } from './'

const { ObjectId } = Schema.Types
const USER_LIMIT = 5

const chatSchema = new Schema({
  title: String,
  users: [{
    type: ObjectId,
    ref: 'User'
  }],
  lastMessage: {
    type: ObjectId,
    ref: 'Message'
  }
}, {
  timestamps: true
})

chatSchema.pre('save', async function () {
  if (!this.title) {
    const users = await User.where('_id').in(this.users).limit(USER_LIMIT).select('name')
    let title = users.map(user => user.name).join(', ')

    if (this.users.length > USER_LIMIT) {
      title += '...'
    }
    this.title = title
  }
})
const chat = model('Chat', chatSchema)

export default chat
