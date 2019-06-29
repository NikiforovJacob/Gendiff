import _ from 'lodash';

const typesDiffs = [
  {
    check: (b, a, key) => _.isObject(b[key]) && _.isObject(a[key]),
    build: (b, a, buildAst) => ({ type: 'nesting', children: buildAst(b, a) }),
  },
  {
    check: (b, a, key) => !_.has(b, key) && _.has(a, key),
    build: (b, a) => ({ type: 'added', valueAfter: a }),
  },
  {
    check: (b, a, key) => _.has(b, key) && !_.has(a, key),
    build: b => ({ type: 'deleted', valueBefore: b }),
  },
  {
    check: (b, a, key) => b[key] === a[key],
    build: b => ({ type: 'unchanged', valueBefore: b }),
  },
  {
    check: (b, a, key) => b[key] !== a[key],
    build: (b, a) => ({ type: 'changed', valueBefore: b, valueAfter: a }),
  },
];

const buildAst = (before, after) => {
  const allKeys = _.union(Object.keys(before), Object.keys(after));
  const iterAst = (key) => {
    const emptyNode = { name: key };
    const getTypesAction = (b, a) => typesDiffs.find(({ check }) => check(b, a, key));
    const bodyNodes = getTypesAction(before, after).build(before[key], after[key], buildAst);
    return { ...emptyNode, ...bodyNodes };
  };
  return allKeys.map(iterAst);
};

export default buildAst;
