import { InMemoryCache } from "apollo-boost";

import { initialize } from "../init";
import { reducer } from "../utils";
import { gameFieldQuery } from "../graphql";
import { GameFieldQuery } from "../graphql.types";

export const defaults = {
  gameField: initialize(8, 8)
};

export const resolvers = {
  callCell: (
    _: any,
    { id }: { id: number },
    { cache }: { cache: InMemoryCache }
  ) => {
    const data = cache.readQuery<GameFieldQuery>({
      query: gameFieldQuery
    });
    const newGameField = reducer(id, data.data);

    data.data = newGameField;

    cache.writeQuery({ query: gameFieldQuery, data });

    return newGameField;
  }
};
