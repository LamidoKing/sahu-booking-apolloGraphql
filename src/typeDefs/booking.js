import { gql } from 'apollo-server-express'

export default gql` 
  extend type Query {
    booking(id: ID!): Booking @guest
    bookings: [Booking!]! @guest
  }

  extend type Mutation {
    bookRide( 
        username: String!,
        pickUp: PickUpInput!,
        dropOff: DropOffInput!,
        fare: Int!,
        status: String!
    ): Booking
  }
  type Booking {
      id:ID!
      username: String!
      pickUp: Detail!
      dropOff: Detail!
      fare: Int!
      status: String!
      updatedAt: String!
      createAt: String!
  }
  input PickUpInput {
    address: String!,
    name: String!,
    latitude: Float,
    longitude: Float
  }
  input DropOffInput {
    address: String!,
    name: String!,
    latitude: Float,
    longitude: Float
  }
 type Detail {
    address: String!,
    name: String!,
    latitude: Float,
    longitude: Float
  }
`
