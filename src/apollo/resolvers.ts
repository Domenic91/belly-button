import { InMemoryCache } from 'apollo-boost';

import { initialize } from '../init';
import { IGameField } from '../types';
import { reducer } from '../utils';
import { gameFieldQuery } from '../graphql';
import { GameFieldQuery } from '../graphql.types';

const addTypedefToData = (data: IGameField) => ({
  id: 0,
  ...data,
  cells: data.cells.map(cell => ({
    ...cell,
    __typename: 'GameCell',
  })),
  __typename: 'GameField',
});

export const defaults = {
  gameField: addTypedefToData(initialize(8, 8)),
};

export const resolvers = {
  Mutation: {
    callCell: (
      _: any,
      { id }: { id: number },
      { cache }: { cache: InMemoryCache },
    ) => {
      console.log('test');
      const data = cache.readQuery<GameFieldQuery>({
        query: gameFieldQuery,
      });
      console.log(data);
      const newGameField = reducer(id, data.gameField);

      data.gameField = addTypedefToData(newGameField);

      console.log(data);

      cache.writeQuery({
        query: gameFieldQuery,
        data: data,
      });

      return data.gameField.cells;
    },
  },
};
