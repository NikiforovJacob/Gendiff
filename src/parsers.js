import yaml from 'js-yaml';
import ini from 'ini';

const fileExtionActions = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

export default (content, ext) => fileExtionActions[ext](content);
