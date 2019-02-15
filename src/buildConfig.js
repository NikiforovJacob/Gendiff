import path from 'path';
import readFile from './utils';
import Ini from './ini';
import Json from './json';
import Yaml from './yaml';

const fileExtionActions = [
  {
    name: 'json',
    check: pathFile => path.extname(pathFile) === '.json',
    build: contentFile => new Json(contentFile),
  },
  {
    name: 'yml',
    check: pathFile => path.extname(pathFile) === '.yml',
    build: contentFile => new Yaml(contentFile),
  },
  {
    name: 'ini',
    check: pathFile => path.extname(pathFile) === '.ini',
    build: contentFile => new Ini(contentFile),
  },
];

const buildConfig = (pathToFile) => {
  const contentFile = readFile(pathToFile);
  return fileExtionActions.find(({ check }) => check(pathToFile)).build(contentFile);
};

export default buildConfig;