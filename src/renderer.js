import _ from 'lodash';

const newLine = '\n';

const stringify = (ast, depth = 0) => {
  const spaces = ' '.repeat(depth * 2);
  
  const strinifyChangedNode = (value, depth) => {
    if (!_.isObject(value)) return value;
    const spaces = ' '.repeat(depth * 2);
    const gen = Object.keys(value).map((key => {
      return `${spaces}    ${key}: ${value[key]}${newLine}`;
    }));
    return `{${newLine}${gen.join('').slice(0, -1)}${newLine}${spaces}}`;
  }

  const iter = current => {
    const {name, type, valueBefore, valueAfter, children} = current;
    // const 
    const renderStr = 
      {
        added: `${spaces}  + ${name}: ${strinifyChangedNode(valueAfter, depth + 2)}${newLine}`,
        deleted: `${spaces}  - ${name}: ${strinifyChangedNode(valueBefore, depth + 2)}${newLine}`,
        nesting: `${spaces}    ${name}: ${stringify(children, depth + 2)}${newLine}`,
        unchanged: `${spaces}    ${name}: ${strinifyChangedNode(valueBefore, depth + 2)}${newLine}`,
        changed: [`${spaces}  + ${name}: ${strinifyChangedNode(valueAfter, depth + 2)}${newLine}`,
                  `${spaces}  - ${name}: ${strinifyChangedNode(valueBefore, depth + 2)}${newLine}`],
      };
    return renderStr[type];
  };
  const renderedAst = _.flatten(ast.map(iter));
  return `{${newLine}${renderedAst.join('').slice(0, -1)}${newLine}${spaces}}`;
}

export default stringify;
