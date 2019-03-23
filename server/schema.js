const {makeExecutableSchema} = require('graphql-tools');
var resolvers  = require('./resolvers/resolvers-in-memory');

const typeDefs = `

type Product {
    id : ID!
    name : String!
    
}

type Order {

    id: ID!
    total:Float!
    products: [Product!]!

} 

type Client {

    id:ID!
    name: String!
    orders:[Order]

}

type Query {

    products:[Product]
    clients:[Client]
    clientById(id: ID!): Client
    productById(id: ID!): Product

}

type Mutation {

    addProduct(name: String!): Product

    addClient(name: String): Client

    deleteProduct(id: ID!): Product

    deleteClient(id: ID! ): Client

}

`;

const schema = makeExecutableSchema({typeDefs,resolvers})
module.exports = schema

