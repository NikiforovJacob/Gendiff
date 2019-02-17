import _ from 'lodash';

const newLine = '\n';

const stringify = (ast, depth = 0) => {
  const spaces = ' '.repeat(depth * 2);

  const strinifyChangedNode = (obj, depth) => {
    const spaces = ' '.repeat(depth * 2);
    const gen = Object.keys(obj).map((currentKey => {
      return `${spaces}    ${currentKey}: ${obj[currentKey]}${newLine}`;
    }));
    return `{${newLine}${gen.join('').slice(0, -1)}${newLine}${spaces}}${newLine}`;
  }

  const iter = current => {
    const {name, type, value, compareMark, children} = current;
    const stringKeyValue = `${name}: ${value}`;
    if (type === 'node') {
      return `${spaces}    ${name}: ${stringify(children, depth + 2)}${newLine}`;
    }
    if (type === 'sympleNode') {
      return `${spaces}  ${compareMark} ${name}: ${strinifyChangedNode(value, depth + 2)}`;
    }
    return `${spaces}  ${compareMark} ${stringKeyValue}${newLine}`;
  };
  const renderedAst = ast.map(iter);
  return `{${newLine}${renderedAst.join('').slice(0, -1)}${newLine}${spaces}}`;
}

export default stringify;
