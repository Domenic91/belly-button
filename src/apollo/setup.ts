import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

import { defaults, resolvers } from './resolvers';

const typeDefs = `
  type GameCell {
    id: ID!
    value: String!
  }

  type GameField {
    id: ID!
    width: number
    height: number
    cells: [GameCell]
  }

  type Mutation {
    callCell(id: ID!): [GameCell]
  }

  extend type Query {
    gameField: GameField
  }
`;

export default new ApolloClient({
  clientState: {
    defaults,
    resolvers,
    typeDefs,
  },
});
