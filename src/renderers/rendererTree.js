import _ from 'lodash';

const newLine = '\n';

const stringifyNode = (value, depth) => {
  if (_.isObject(value)) {
    const spaces = ' '.repeat(depth * 2);
    const gen = Object.keys(value).map((key => {
      // if (_.isObject(value[key])) return stringifyNode(value[key], depth + 2);
      return `${spaces}    ${key}: ${value[key]}${newLine}`;
    }));
    return `{${newLine}${gen.join('').slice(0, -1)}${newLine}${spaces}}`;
  }
  return value;
};

const typeRender = 
{
  added: (node, depth, spaces) => `${spaces}  + ${node.name}: ${stringifyNode(node.valueAfter, depth + 2)}${newLine}`,
  deleted: (node, depth, spaces) => `${spaces}  - ${node.name}: ${stringifyNode(node.valueBefore, depth + 2)}${newLine}`,
  nesting: (node, depth, spaces) => `${spaces}    ${node.name}: ${render(node.children, depth + 2)}${newLine}`,
  unchanged: (node, depth, spaces) => `${spaces}    ${node.name}: ${stringifyNode(node.valueBefore, depth + 2)}${newLine}`,
  changed: (node, depth, spaces) => [`${spaces}  + ${node.name}: ${stringifyNode(node.valueAfter, depth + 2)}${newLine}`,
                                     `${spaces}  - ${node.name}: ${stringifyNode(node.valueBefore, depth + 2)}${newLine}`],
};

const render = (ast, depth = 0) => {
  const spaces = ' '.repeat(depth * 2);
  const iter = node => typeRender[node.type](node, depth, spaces);
  const renderedAst = _.flatten(ast.map(iter));
  return `{${newLine}${renderedAst.join('').slice(0, -1)}${newLine}${spaces}}`;
}

export default render;
