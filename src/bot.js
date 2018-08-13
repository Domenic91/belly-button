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
    pathMap: {},
  };
  nodes.forEach(node => {
    if (node.value < lowestNode.value && !node.visited) {
      lowestNode = node;
    }
  });

  return lowestNode;
};

const splitArray = (arr, testSet) => {
  const isIn = [];
  const notIn = [];

  arr.forEach(el => (testSet.has(el) ? isIn.push(el) : notIn.push(el)));
  return [isIn, notIn];
};

const RepChecker = () => {
  const testSet = new Set();
  return arrayToCheck => {
    let s = arrayToCheck.map(arr => arr.join('-'));
    s = s.sort();
    s = s.join(':');
    const ret = testSet.has(s);
    if (!ret) {
      testSet.add(s);
    }
    return ret;
  };
};

const calcPaths = (pathMap, possibleClicks, value) => {
  const retPaths = {};
  const possibleClicksArray = [...possibleClicks];
  if (Object.keys(pathMap).length === 0) {
    return {
      [value]: [Array.from({ length: value }).fill(possibleClicksArray)],
    };
  }

  const maxClicks = Math.min(...Object.keys(pathMap)) + value;
  Object.values(pathMap).forEach(paths => {
    paths.forEach(path => {
      if (path.length > maxClicks) {
        return;
      }
      const newPaths = [
        {
          clicks: [],
          value,
        },
      ];
      path.forEach(clicks => {
        const [isIn, notIn] = splitArray(clicks, possibleClicks);
        if (isIn.length > 0 && notIn.length > 0) {
          const concatPaths = [];
          newPaths.forEach(newPath => {
            const isInPath = [...newPath.clicks];
            isInPath.push(isIn);
            concatPaths.push({ clicks: isInPath, value: newPath.value - 1 });
            newPath.clicks.push(notIn);
          });
          newPaths.push(...concatPaths);
        } else if (isIn.length > 0) {
          newPaths.forEach(newPath => {
            newPath.clicks.push(isIn);
            newPath.value = newPath.value - 1;
          });
        } else {
          newPaths.forEach(newPath => {
            newPath.clicks.push(notIn);
          });
        }
      });
      const repChecker = RepChecker();
      newPaths.forEach(newPath => {
        if (newPath.clicks.length + newPath.value > maxClicks) {
          return;
        }
        if (newPath.value > 0) {
          const oldLength = newPath.clicks.length;
          newPath.clicks.length = oldLength + newPath.value;
          newPath.clicks.fill(possibleClicksArray, oldLength);
        }
        if (repChecker(newPath.clicks)) {
          return;
        }
        if (!retPaths[newPath.clicks.length]) {
          retPaths[newPath.clicks.length] = [];
        }
        retPaths[newPath.clicks.length].push(newPath.clicks);
      });
    });
  });
  return retPaths;

  // paths.forEach(path => {
  //   // path = { length: [firstclickIdizes, secondClickIndices, etc.]}
  //   Object.values(path).forEach(clickIndices => {
  //     // clickIndices = []
  //     // split clickIndices[0...n] in indices in possibleClicks and indices NOT in possibleClicks
  //     // push on every array of clicks (beginning []) the split arrays - remember tmpValue for Each array possibleClicks = tmpValue - 1
  //     // when iterated over every old click - iterate over all array combinations and add tmpValue times possibleClicks to the array
  //     // OVERTHINK THIS SHOULD BE WRONG (ERROR IF TWO ARRAYS HAVE SAME LENGTH) CHECK ALGO this would mean something is wrong i guess
  //     // add arrays to retPaths (array.length = array)
  //     // ------other idea------
  //     // 0 bis value? falls ALLE in possibleClicks sind tmpvlaue -1 wenn tmpvalue === 0 => selben clicks, falls tmpValue > 0 => [...oldClicks, tmpValue * Array.fill([possibleClicks])]
  //     // aber was is wenn nicht ALLE in possibeClicks sind minLength + 1 [clicksNotInPossibleClciks, ]
  //     // falls gar keins drinnen ist minminlength + 1
  //   });
  // });

  // return retPaths;
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

export default gameField => {
  const startId = gameField.cells.findIndex(cell => cell.value === 'start');
  const endId = gameField.cells.findIndex(cell => cell.value === 'end');

  // idx is the id
  const nodes = gameField.cells.map(cell => ({
    idx: cell.id,
    value: cell.id === startId ? 0 : Infinity,
    visited: false,
    pathMap: {},
  }));

  while (nodes.length > 0) {
    const minNode = findMinUnvisitedNode(nodes);
    if (minNode.idx === endId) {
      return {
        pathLength: minNode.value,
        paths: minNode.pathMap[minNode.value],
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
      if (minNode.pathLength > nodes[neighbor].pathLength) {
        return;
      }

      const value =
        typeof gameField.cells[neighbor].value === 'number'
          ? gameField.cells[neighbor].value
          : 0;
      const possibleClicks = isReducable(
        neighbor,
        gameField.width,
        gameField.height,
      );

      const newPaths = calcPaths(minNode.pathMap, possibleClicks, value);
      const newPathLength = Math.min(...Object.keys(newPaths));
      Object.keys(newPaths).forEach(key => {
        if (!nodes[neighbor].pathMap[key]) {
          nodes[neighbor].pathMap[key] = [];
        }
        nodes[neighbor].pathMap[key].push(...newPaths[key]);
      });

      nodes[neighbor].value = Math.min(nodes[neighbor].value, newPathLength);
    });
  }

  const endNode = nodes[endId];

  return {
    pathLength: nodes[endId].value,
    paths: endNode.pathMap[nodes[endId].value],
  };
};
