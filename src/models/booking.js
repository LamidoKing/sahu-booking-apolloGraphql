import { Schema, model } from 'mongoose'

const bookingSchema = new Schema({
  username: {
    type: String
  },
  pickUp: {
    type: Object
  },
  dropOff: {
    type: Object
  },
  fare: Number,
  status: String
}, {
  timestamps: true
})

const Booking = model('Booking', bookingSchema)

export default Booking
