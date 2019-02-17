import _ from 'lodash';

const newLine = '\n';

const stringify = (ast, depth = 0) => {
  const spaces = ' '.repeat(depth * 2);
  const strinifyNode = (value, depth) => {
    if (_.isObject(value)) {
      const spaces = ' '.repeat(depth * 2);
      const gen = Object.keys(value).map((key => {
        // if (_.isObject(value[key])) return strinifyNode(value[key], depth + 2);
        return `${spaces}    ${key}: ${value[key]}${newLine}`;
      }));
      return `{${newLine}${gen.join('').slice(0, -1)}${newLine}${spaces}}`;
    }
    return value;
  };

  const iter = current => {
    const {name, type, valueBefore, valueAfter, children} = current;
    const typeRender = 
      {
        added: `${spaces}  + ${name}: ${strinifyNode(valueAfter, depth + 2)}${newLine}`,
        deleted: `${spaces}  - ${name}: ${strinifyNode(valueBefore, depth + 2)}${newLine}`,
        nesting: `${spaces}    ${name}: ${stringify(children, depth + 2)}${newLine}`,
        unchanged: `${spaces}    ${name}: ${strinifyNode(valueBefore, depth + 2)}${newLine}`,
        changed: [`${spaces}  + ${name}: ${strinifyNode(valueAfter, depth + 2)}${newLine}`,
                  `${spaces}  - ${name}: ${strinifyNode(valueBefore, depth + 2)}${newLine}`],
      };
    return typeRender[type];
  };
  const renderedAst = _.flatten(ast.map(iter));
  return `{${newLine}${renderedAst.join('').slice(0, -1)}${newLine}${spaces}}`;
}

export default stringify;
