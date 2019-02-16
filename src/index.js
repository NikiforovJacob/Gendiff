import _ from 'lodash';
import parse from './parsers';
import readFile from './utils';
import path from 'path';

const newLine = '\n';

const gendiff = (pathToFileBefore, pathToFileAfter) => {

  const contentBefore = readFile(pathToFileBefore);
  const contentAfter = readFile(pathToFileAfter);
  const extFileBefore = path.extname(pathToFileBefore);
  const extFileAfter = path.extname(pathToFileAfter);
  const before = parse(contentBefore, extFileBefore);
  const after = parse(contentAfter, extFileAfter);

  const allKeys = _.union(Object.keys(after), Object.keys(before));
  const compareGen = (currentKey) => {
    const stringKeyValueAfter = `${currentKey}: ${after[currentKey]}`;
    const stringKeyValueBefore = `${currentKey}: ${before[currentKey]}`;
    if (!_.has(before, currentKey)) {
      return `  + ${stringKeyValueAfter}${newLine}`;
    }
    if (before[currentKey] === after[currentKey]) {
      return `    ${stringKeyValueAfter}${newLine}`;
    }
    if (_.has(after, currentKey) && before[currentKey] !== after[currentKey]) {
      return `  + ${stringKeyValueAfter}${newLine}  - ${stringKeyValueBefore}${newLine}`;
    }
    return `  - ${stringKeyValueBefore}${newLine}`;
  };
  const gen = allKeys.map(compareGen);
  return `{${newLine}${gen.join('').slice(0, -1)}${newLine}}`;
};

export default gendiff;
