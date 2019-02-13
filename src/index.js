import _ from 'lodash';

const gendiff = (before, after) => {
  const reducer1 = (acc, currentKey) => {
    if (!_.has(before, currentKey)) {
      return `${acc}+ ${currentKey}: ${after[currentKey]}`;
    }
    if (before[currentKey] === after[currentKey]) {
      return `${acc}  ${currentKey}: ${after[currentKey]}`;
    }
    return `${acc}+ ${currentKey}: ${after[currentKey]}- ${currentKey}: ${before[currentKey]}`;
  };
  const gen = Object.keys(after).reduce(reducer1, '');

  const reducer2 = (acc, currentKey) => {
    if (!_.has(after, currentKey)) {
      return `${acc}- ${currentKey}: ${before[currentKey]}`;
    }
    return acc;
  };

  const gen2 = Object.keys(before).reduce(reducer2, gen);
  return `{${gen2}}`;
};

export default gendiff;
