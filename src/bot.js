import { reducer } from './utils';

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

const djShit = gameFieldData => {
  const gameField = gameFieldData.gameField;
  return gameField.cells.map(cell => {
    const newGameField = reducer(cell.id, gameField);
    const { path, pathLength } = dj(newGameField);
    return {
      path,
      pathLength,
      gameField: newGameField,
      clicks: [...gameFieldData.clicks, cell.id],
    };
  });
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

export default gameField => {
  let count = 0;
  let currentGameFields = [
    {
      path: '',
      pathLength: Infinity,
      gameField,
      clicks: [],
    },
  ];
  while (count < 100) {
    let fieldsWithPath = [];
    currentGameFields.forEach(currentGameField => {
      console.log(currentGameField);
      const gameFields = djShit(currentGameField);
      fieldsWithPath = fieldsWithPath.concat(gameFields);
    });
    currentGameFields = filterShortestArray(fieldsWithPath);
    count += 1;
    if (currentGameFields[0].pathLength === 0) {
      return { path: currentGameFields[0].clicks, count };
    }
  }
  return { path: [], count };
};
