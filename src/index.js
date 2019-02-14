import _ from 'lodash';
import { jsonParse } from './utils';

const newLine = '\n';

const gendiff = (pathToFileBefore, pathToFileAfter) => {
  const contentBefore = jsonParse(pathToFileBefore);
  const contentAfter = jsonParse(pathToFileAfter);
  const reducer1 = (acc, currentKey) => {
    if (!_.has(contentBefore, currentKey)) {
      return `${acc}  + ${currentKey}: ${contentAfter[currentKey]}${newLine}`;
    }
    if (contentBefore[currentKey] === contentAfter[currentKey]) {
      return `${acc}    ${currentKey}: ${contentAfter[currentKey]}${newLine}`;
    }
    return `${acc}  + ${currentKey}: ${contentAfter[currentKey]}${newLine}  - ${currentKey}: ${contentBefore[currentKey]}${newLine}`;
  };
  const gen = Object.keys(contentAfter).reduce(reducer1, '');

  const reducer2 = (acc, currentKey) => {
    if (!_.has(contentAfter, currentKey)) {
      return `${acc}  - ${currentKey}: ${contentBefore[currentKey]}${newLine}`;
    }
    return acc;
  };

  const gen2 = Object.keys(contentBefore).reduce(reducer2, gen);
  return `{${newLine}${gen2.slice(0, -1)}${newLine}}`;
};

export default gendiff;
