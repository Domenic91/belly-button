export const gameWon = gameField => {
  const startId = gameField.cells.findIndex(cell => cell.value === 'start');
  const endId = gameField.cells.findIndex(cell => cell.value === 'end');
  const resultSet = recBlue(startId, gameField, new Set([startId]));
  return {
    path: resultSet,
    won: resultSet.has(endId),
  };
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

const recBlue = (idx, gf, resultSet) => {
  const neighbours = zeroNeighbours(idx, gf.width, gf.height);
  neighbours.forEach(neighbour => {
    if (gf.cells[neighbour].value === 0 && !resultSet.has(neighbour)) {
      resultSet.add(neighbour);
      recBlue(neighbour, gf, resultSet);
    } else if (gf.cells[neighbour].value === 'end') {
      resultSet.add(neighbour);
    }
  });
  return resultSet;
};
