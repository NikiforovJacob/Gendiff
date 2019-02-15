export default class Json {
  constructor (content) {
    this.name = 'JSON';
    this.content = content;
  };
  toParse() {
    return JSON.parse(this.content);
  }
};