import { InMemoryCache } from "apollo-boost";

export const defaults = {
  gameField: []
};

export const resolvers = {
  callCell: (
    _: any,
    { id }: { id: number },
    { cache }: { cache: InMemoryCache }
  ) => {
    return { id, cache };
  }
};
