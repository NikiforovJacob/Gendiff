import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';
import readFile from './utils';

const fileExtionActions =
  {
    '.json': pathFile => JSON.parse(readFile(pathFile)),
    '.yml': pathFile => yaml.safeLoad(readFile(pathFile)),
    '.ini': pathFile => ini.parse(readFile(pathFile)),
  };

const getExtensionName = pathFile => path.extname(pathFile);

const parse = (pathToFile) => {
  const extensionName = getExtensionName(pathToFile);
  return fileExtionActions[extensionName](pathToFile);
};

export default parse;
