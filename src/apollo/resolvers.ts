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

const djWrapper = (gameField: IGameField) => {
  const clicks = [];
  let currentGameField = gameField;
  let won = false;
  while (!won) {
    const shortest = djShit(currentGameField);
    clicks.push(shortest.idx);
    if (shortest.pathLength === 0) {
      won = true;
    }
  }
};

const dj = (gameField: IGameField) => {};

const djShit = (gameField: IGameField) => {
  const shortestPaths = gameField.cells.map(cell => {
    const newGameField = reducer(cell.id, gameField);
    return {
      pathLength: dj(newGameField),
      gameField: newGameField,
      idx: cell.id,
    };
  });
  return shortestPaths.reduce(
    (old, obj) => {
      if (obj.pathLength < old.pathLength) {
        return obj;
      }
      return old;
    },
    { pathLength: Infinity, idx: -1, gameField: gameField },
  );
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
