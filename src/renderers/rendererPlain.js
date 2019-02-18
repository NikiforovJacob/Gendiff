import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) return '[complex value]';
  if (typeof value === 'string' && `${Number(value)}` === value) return Number(value);
  return Number.isInteger(value) || typeof value === 'boolean' ? value : `'${value}'`;
};
const div = nameNest => nameNest.length > 0 ? '.' : '';

const typeRender = 
  {
    added: (node, nameNest) => `Property '${nameNest}${div(nameNest)}${node.name}' was added with value: ${stringify(node.valueAfter)}`,
    deleted: (node, nameNest) => `Property '${nameNest}${div(nameNest)}${node.name}' was removed`,
    nesting: (node, nameNest, render) => render(node.children, `${nameNest}${div(nameNest)}${node.name}`),
    changed: (node, nameNest) => `Property '${nameNest}${div(nameNest)}${node.name}' was updated. From ${stringify(node.valueBefore)} to ${stringify(node.valueAfter)}`
  };

const render = (ast, nameNest = '') => _.flattenDeep(ast
    .filter(node => node.type !== 'unchanged')
    .map(node => typeRender[node.type](node, nameNest, render)),
).join('\n');

export default render;
