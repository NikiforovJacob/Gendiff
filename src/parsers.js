import path from 'path';
import yaml from 'js-yaml';
import readFile from './utils';

const parse = (pathToFile) => {
  const fileExtionActions = [
    {
      name: 'json',
      check: pathFile => path.extname(pathFile) === '.json',
      parse: pathFile => JSON.parse(readFile(pathFile)),
    },
    {
      name: 'yml',
      check: pathFile => path.extname(pathFile) === '.yml',
      parse: pathFile => yaml.safeLoad(readFile(pathFile)),
    },
  ];
  return fileExtionActions.find(({ check }) => check(pathToFile)).parse(pathToFile);
};

export default parse;
