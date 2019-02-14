import _ from 'lodash';
import parse from './parsers';

const newLine = '\n';

const gendiff = (pathToFileBefore, pathToFileAfter) => {
  const contentBefore = parse(pathToFileBefore);
  const contentAfter = parse(pathToFileAfter);
  const reduceAfterToBefore = (acc, currentKey) => {
    if (!_.has(contentBefore, currentKey)) {
      return `${acc}  + ${currentKey}: ${contentAfter[currentKey]}${newLine}`;
    }
    if (contentBefore[currentKey] === contentAfter[currentKey]) {
      return `${acc}    ${currentKey}: ${contentAfter[currentKey]}${newLine}`;
    }
    return `${acc}  + ${currentKey}: ${contentAfter[currentKey]}${newLine}  - ${currentKey}: ${contentBefore[currentKey]}${newLine}`;
  };
  const genAfterToBefore = Object.keys(contentAfter).reduce(reduceAfterToBefore, '');

  const reduceBeforeToAfter = (acc, currentKey) => {
    if (!_.has(contentAfter, currentKey)) {
      return `${acc}  - ${currentKey}: ${contentBefore[currentKey]}${newLine}`;
    }
    return acc;
  };

  const genBeforeToAfter = Object.keys(contentBefore).reduce(reduceBeforeToAfter, genAfterToBefore);
  return `{${newLine}${genBeforeToAfter.slice(0, -1)}${newLine}}`;
};

export default gendiff;
