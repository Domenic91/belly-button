import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

import { defaults, resolvers } from "./resolvers";

const typeDefs = gql`
  type GameCell {
    id: ID!
    value: String!
  }

  extend type Mutation {
    callCell(id: ID!): [GameCell]
  }

  extend type Query {
    gameField: [GameCell]
  }
`;

export default new ApolloClient({
  clientState: {
    defaults,
    resolvers,
    typeDefs
  }
});
