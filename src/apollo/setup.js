import ApolloClient from 'apollo-boost';

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
    cliks: number
  }
`;

export default new ApolloClient({
  clientState: {
    defaults,
    resolvers,
    typeDefs,
  },
});
