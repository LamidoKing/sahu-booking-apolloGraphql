
import { Booking } from '../models'

export default {
  Query: {
    bookings: (root, args, { req }, info) => {
      return Booking.find({})
    },
    booking: async (root, args, context, info) => {
      return Booking.findById(args.id)
    }

  },
  Mutation: {
    bookRide: async (root, args, { req }, info) => {
      const data = {
        username: args.username,
        pickUp: {
          address: args.pickUp.address,
          name: args.pickUp.name,
          latitude: args.pickUp.latitude,
          longitude: args.pickUp.longitude
        },
        dropOff: {
          address: args.dropOff.address,
          name: args.dropOff.name,
          latitude: args.dropOff.latitude,
          longitude: args.dropOff.longitude
        },
        fare: args.fare,
        status: args.status

      }
      const booking = await Booking.create(data)
      return booking
    }
  }
}
