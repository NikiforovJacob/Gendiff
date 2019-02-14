import _ from 'lodash';

const newLine = '\n';

const gendiff = (before, after) => {
  const reducer1 = (acc, currentKey) => {
    if (!_.has(before, currentKey)) {
      return `${acc}  + ${currentKey}: ${after[currentKey]}${newLine}`;
    }
    if (before[currentKey] === after[currentKey]) {
      return `${acc}    ${currentKey}: ${after[currentKey]}${newLine}`;
    }
    return `${acc}  + ${currentKey}: ${after[currentKey]}${newLine}  - ${currentKey}: ${before[currentKey]}${newLine}`;
  };
  const gen = Object.keys(after).reduce(reducer1, '');

  const reducer2 = (acc, currentKey) => {
    if (!_.has(after, currentKey)) {
      return `${acc}  - ${currentKey}: ${before[currentKey]}${newLine}`;
    }
    return acc;
  };

  const gen2 = Object.keys(before).reduce(reducer2, gen);
  return `{${newLine}${gen2.slice(0, -1)}${newLine}}`;
};

export default gendiff;
