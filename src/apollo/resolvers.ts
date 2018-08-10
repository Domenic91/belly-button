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
  clicks: 0,
};

const zeroNeighbours = (
  idx: number,
  width: number,
  height: number,
): Set<number> => {
  const reducers: Set<number> = new Set([
    idx - width,
    idx - 1,
    idx + 1,
    idx + width,
  ]);

  if (idx < width) {
    reducers.delete(idx - width);
  } else if (width * height - width <= idx) {
    reducers.delete(idx + width);
  }

  if ((idx + 1) % width === 1) {
    reducers.delete(idx - 1);
  } else if ((idx + 1) % width === 0) {
    reducers.delete(idx + 1);
  }
  return reducers;
};

const djRec = (
  gameField: IGameField,
  currentIdx: number,
  endIdx: number,
  length: number,
  currentFields: Set<number>,
): number => {
  if (currentIdx === endIdx) {
    return length;
  }
  const neighbors = zeroNeighbours(
    currentIdx,
    gameField.width,
    gameField.height,
  );
  const neighborsArray = Array.from(neighbors).filter(
    neighbor => !currentFields.has(neighbor),
  );
  const pathLength = neighborsArray.map(neighbor => {
    const n: number = gameField.cells[neighbor].value as any;
    return djRec(
      gameField,
      neighbor,
      endIdx,
      length + n,
      new Set([...(Array.from(currentFields) as any), neighbor]),
    );
  });
  return Math.min.apply(pathLength);
};

const findMinUnvisitedNode = (
  nodes: Array<{ idx: number; value: number; visited: boolean }>,
) => {
  let lowestNode = {
    idx: -1,
    value: Number.POSITIVE_INFINITY,
    visited: true,
  };
  nodes.forEach(node => {
    if (node.value < lowestNode.value && !node.visited) {
      lowestNode = node;
    }
  });
  return lowestNode;
};

const dj = (gameField: IGameField) => {
  const startId = gameField.cells.findIndex(cell => cell.value === 'start');
  const endId = gameField.cells.findIndex(cell => cell.value === 'end');

  // idx is the id
  const nodes: Array<{
    idx: number;
    value: number;
    visited: boolean;
  }> = gameField.cells.map(cell => ({
    idx: cell.id,
    value: cell.id === startId ? 0 : Infinity,
    visited: false,
  }));

  while (nodes.length > 0) {
    const minNode = findMinUnvisitedNode(nodes);
    if (minNode.idx === endId) {
      return minNode.value;
    }
    minNode.visited = true;

    const neighbors = zeroNeighbours(
      minNode.idx,
      gameField.width,
      gameField.height,
    );

    neighbors.forEach(neighbor => {
      if (nodes[neighbor].visited) {
        return;
      }
      const value =
        typeof gameField.cells[neighbor].value === 'number'
          ? (gameField.cells[neighbor].value as any)
          : 0;
      const testLength = minNode.value + value;
      if (testLength < nodes[neighbor].value) {
        nodes[neighbor].value = testLength;
      }
    });
  }

  return nodes[endId].value;
};

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

const djWrapper = (gameField: IGameField) => {
  const clicks = [];
  let currentGameField = gameField;
  let won = false;
  while (!won) {
    const shortest = djShit(currentGameField);
    console.log(shortest);
    currentGameField = shortest.gameField;
    clicks.push(shortest.idx);
    if (shortest.pathLength === 0) {
      won = true;
    }
  }
  return clicks;
};

console.log(djWrapper(defaults.gameField));

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
      data.clicks = data.clicks + 1;

      console.log(data);

      cache.writeQuery({
        query: gameFieldQuery,
        data: data,
      });

      return data.gameField.cells;
    },
  },
};
