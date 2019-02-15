import yaml from 'js-yaml';

export default class Yaml {
  constructor (content) {
    this.name = 'yaml';
    this.content = content;
  };

  toParse() {
    return yaml.safeLoad(this.content);
  }
};