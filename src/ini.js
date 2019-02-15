import ini from 'ini';

export default class Ini {
  constructor (content) {
    this.name = 'ini';
    this.content = content;
  };

  toParse() {
    return ini.parse(this.content);
  }
};