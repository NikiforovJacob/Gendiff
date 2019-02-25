import _ from 'lodash';

const buildAst = (before, after) => {
  const allKeys = _.union(Object.keys(before), Object.keys(after));

  const typesActions = [
    {
      type: 'nesting',
      check: (b, a, key) => _.isObject(b[key]) && _.isObject(a[key]),
      build: (b, a, key) => ({ type: 'nesting', children: buildAst(b[key], a[key]) }),
    },
    {
      type: 'added',
      check: (b, a, key) => !_.has(b, key) && _.has(a, key),
      build: (b, a, key) => ({ type: 'added', valueAfter: a[key] }),
    },
    {
      type: 'deleted',
      check: (b, a, key) => _.has(b, key) && !_.has(a, key),
      build: (b, a, key) => ({ type: 'deleted', valueBefore: b[key] }),
    },
    {
      type: 'unchanged',
      check: (b, a, key) => b[key] === a[key],
      build: (b, a, key) => ({ type: 'unchanged', valueBefore: b[key] }),
    },
    {
      type: 'changed',
      check: (b, a, key) => b[key] !== a[key],
      build: (b, a, key) => ({ type: 'changed', valueBefore: b[key], valueAfter: a[key] }),
    },
  ];

  const iterAst = (key) => {
    const emptyNode = { name: key };
    const getTypesAction = (b, a) => typesActions.find(({ check }) => check(b, a, key));
    const result = getTypesAction(before, after).build(before, after, key);
    return { ...emptyNode, ...result };
  };
  return allKeys.map(iterAst);
};

export default buildAst;
