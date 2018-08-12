export const reducer = (id, gameField) => {
  const reduceCells = isReducable(id, gameField.width, gameField.height);
  const cells = gameField.cells.map(cell => {
    if (reduceCells.has(cell.id) && typeof cell.value === 'number') {
      return {
        id: cell.id,
        value: Math.max(cell.value - 1, 0),
      };
    }
    return cell;
  });

  return {
    cells,
    width: gameField.width,
    height: gameField.height,
  };
};

const isReducable = (idx, width, height) => {
  const reducers = new Set([
    idx - width - 1,
    idx - width,
    idx - width + 1,
    idx - 1,
    idx,
    idx + 1,
    idx + width - 1,
    idx + width,
    idx + width + 1,
  ]);

  if (idx < width) {
    reducers.delete(idx - width - 1);
    reducers.delete(idx - width);
    reducers.delete(idx - width + 1);
  } else if (width * height - width <= idx) {
    reducers.delete(idx + width - 1);
    reducers.delete(idx + width);
    reducers.delete(idx + width + 1);
  }

  if ((idx + 1) % width === 1) {
    reducers.delete(idx - width - 1);
    reducers.delete(idx - 1);
    reducers.delete(idx + width - 1);
  } else if ((idx + 1) % width === 0) {
    reducers.delete(idx - width + 1);
    reducers.delete(idx + 1);
    reducers.delete(idx + width + 1);
  }
  return reducers;
};
