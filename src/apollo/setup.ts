import ApolloClient from "apollo-boost";
import { defaults, resolvers } from "./resolvers";

const typeDefs = `
  type GameCell {
    id: ID!
    value: String!
  }

  type Mutation {
    callCell(id: ID!): [GameCell]
  }

  type Query {
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
