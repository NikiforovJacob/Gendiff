import _ from 'lodash';
import parse from './parsers';

const newLine = '\n';

const gendiff = (pathToFileBefore, pathToFileAfter) => {
  const contentBefore = parse(pathToFileBefore);
  const contentAfter = parse(pathToFileAfter);

  const unionContentKeys = Array.from(new Set(Object.keys(contentAfter).concat(Object.keys(contentBefore))));
  const compare = (currentKey) => {
    const stringKeyValueAfter = `${currentKey}: ${contentAfter[currentKey]}`;
    const stringKeyValueBefore = `${currentKey}: ${contentBefore[currentKey]}`;
    if (!_.has(contentBefore, currentKey)) {
      return `  + ${stringKeyValueAfter}${newLine}`;
    }
    if (contentBefore[currentKey] === contentAfter[currentKey]) {
      return `    ${stringKeyValueAfter}${newLine}`;
    }
    if (_.has(contentAfter, currentKey) && contentBefore[currentKey] !== contentAfter[currentKey]) {
      return `  + ${stringKeyValueAfter}${newLine}  - ${stringKeyValueBefore}${newLine}`;
    }
    return `  - ${stringKeyValueBefore}${newLine}`;
  };
  const gen = unionContentKeys.map(compare);
  return `{${newLine}${gen.join('').slice(0, -1)}${newLine}}`;
};

export default gendiff;
