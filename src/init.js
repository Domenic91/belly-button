import Chance from 'chance';

export default (width, height) => seed => {
  const chance = new Chance(seed);
  const startID = chance.natural({ min: 0, max: width - 1 });
  const length = width * height;
  const endMin = (height - 1) * width + 1;
  const endID = chance.natural({ min: endMin, max: length - 1 });
  const cells = Array.from({ length: length }, (_, idx) => {
    if (idx === startID) {
      return {
        id: idx,
        value: 'start',
      };
    } else if (idx === endID) {
      return {
        id: idx,
        value: 'end',
      };
    }
    return {
      id: idx,
      value: chance.natural({ min: 1, max: 9 }),
    };
  });

  return {
    cells,
    width,
    height,
  };
};
