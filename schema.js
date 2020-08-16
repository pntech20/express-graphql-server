const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLSchema
} = require('graphql')
const axios = require('axios')

const API_URL = 'http://localhost:3000'

const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt },
  })
})

const rootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    customers: {
      type: new GraphQLList(CustomerType),
      resolve(parentValue, args) {
        return axios.get(`${API_URL}/customers/`)
          .then(res => res.data)
      }
    },
    customer: {
      type: CustomerType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        return axios.get(`${API_URL}/customers/${args.id}`)
          .then(res => res.data)
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: rootQuery
})