import { initialize } from '../init';
import { reducer } from '../utils';
import { gameFieldQuery } from '../graphql';

const addTypedefToData = data => ({
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

const zeroNeighbours = (idx, width, height) => {
  const reducers = new Set([idx - width, idx - 1, idx + 1, idx + width]);

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

const djRec = (gameField, currentIdx, endIdx, length, currentFields) => {
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
    const n = gameField.cells[neighbor].value;
    return djRec(
      gameField,
      neighbor,
      endIdx,
      length + n,
      new Set([...Array.from(currentFields), neighbor]),
    );
  });
  return Math.min.apply(pathLength);
};

const findMinUnvisitedNode = nodes => {
  let lowestNode = {
    idx: -1,
    value: Number.POSITIVE_INFINITY,
    visited: true,
    prev: null,
  };
  nodes.forEach(node => {
    if (node.value < lowestNode.value && !node.visited) {
      lowestNode = node;
    }
  });

  return lowestNode;
};

const buildPath = endNode => {
  const path = [];
  let currentNode = endNode;
  while (currentNode) {
    path.push(currentNode.idx);
    currentNode = currentNode.prev;
  }
  return path.join('-');
};

const dj = gameField => {
  const startId = gameField.cells.findIndex(cell => cell.value === 'start');
  const endId = gameField.cells.findIndex(cell => cell.value === 'end');

  // idx is the id
  const nodes = gameField.cells.map(cell => ({
    idx: cell.id,
    value: cell.id === startId ? 0 : Infinity,
    visited: false,
    prev: null,
  }));

  while (nodes.length > 0) {
    const minNode = findMinUnvisitedNode(nodes);
    if (minNode.idx === endId) {
      return {
        pathLength: minNode.value,
        path: buildPath(minNode),
      };
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
          ? gameField.cells[neighbor].value
          : 0;
      const testLength = minNode.value + value;
      if (testLength < nodes[neighbor].value) {
        nodes[neighbor].value = testLength;
        nodes[neighbor].prev = minNode;
      }
    });
  }

  return {
    pathLength: nodes[endId].value,
    path: buildPath(nodes[endId]),
  };
};

const djShit = gameField => {
  return gameField.cells.map(cell => {
    const newGameField = reducer(cell.id, gameField);
    const { path, pathLength } = dj(newGameField);
    return {
      path,
      pathLength,
      gameField: newGameField,
      idx: cell.id,
    };
  });
  // return shortestPaths.reduce(
  //   (old, obj) => {
  //     if (obj.pathLength < old.pathLength) {
  //       return obj;
  //     }
  //     return old;
  //   },
  //   { pathLength: Infinity, idx: -1, gameField: gameField },
  // );
};

const filterShortestArray = fieldsWithPath => {
  const arr = {};
  let minPath = Infinity;

  fieldsWithPath.forEach(fieldWithPath => {
    const { pathLength: len, path } = fieldWithPath;
    if (!arr[len]) {
      arr[len] = {};
      minPath = Math.min(minPath, len);
    }

    if (!arr[len][path]) {
      arr[len][path] = fieldWithPath;
    }
  });

  return Object.keys(arr[minPath]).map(key => arr[minPath][key]);
};

const djWrapper = gameField => {
  let count = 0;
  let currentGameFields = [gameField];
  let won = false;
  while (!won) {
    let fieldsWithPath = [];
    currentGameFields.forEach(gameField => {
      const gameFields = djShit(gameField);
      fieldsWithPath = fieldsWithPath.concat(gameFields);
    });
    const shortestFields = filterShortestArray(fieldsWithPath);
    currentGameFields = currentGameFields.concat(
      shortestFields.map(({ gameField }) => gameField),
    );
    count += 1;
    if (shortestFields[0].pathLength === 0) {
      won = true;
      return count;
    }
  }
  return count;
};

console.log(djWrapper(defaults.gameField));

export const resolvers = {
  Mutation: {
    callCell: (_, { id }, { cache }) => {
      console.log('test');
      const data = cache.readQuery({
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
