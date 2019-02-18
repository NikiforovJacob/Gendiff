import _ from 'lodash';

const buildAst = (before, after) => {
  const allKeys = _.union(Object.keys(before), Object.keys(after));

  const typesActions = [
    {
      type: 'added',
      check: (b, a, key) => !_.has(b, key) && _.has(a, key),
      build:  (before, after, key) => ({type: 'added', valueAfter: after[key]})
    },
    {
      type: 'deleted',
      check: (b, a, key) => _.has(b, key) && !_.has(a, key),
      build:  (before, after, key) => ({type: 'deleted', valueBefore: before[key]})
    },
    // 
    // Не понимаю почему не работает
    // 
    // {
    //   type: 'nesting',
    //   check: (b, a) => _.isObject(b[key]) && _.isObject(a[key]),
    //   build:  (before, after, key) => {type: 'nesting', children: buildAst(before[key], after[key])},
    // },
    {
      type: 'unchanged',
      check: (b, a, key) => b[key] === a[key],
      build:  (before, after, key) => ({type: 'unchanged', valueBefore: before[key]})
    },
    {
      type: 'changed',
      check: (b, a, key) => b[key] !== a[key],
      build:  (before, after, key) => ({type: 'changed', valueBefore: before[key], valueAfter: after[key]})
    }
  ];

  const iterAst = (key) => {
    const emptyNode = {name: key, type: '', valueBefore: '', valueAfter: '',  children: []};
    if (_.isObject(before[key]) && _.isObject(after[key])) {
      return {...emptyNode, type: 'nesting', children: buildAst(before[key], after[key])};
    };
    const getTypesAction = (before, after) => typesActions.find(({ check }) => check(before, after, key));
    const result = getTypesAction(before, after).build(before, after, key);
    return {...emptyNode, ...result};
  }
  return allKeys.map(iterAst);
}

export default buildAst;
