import _ from 'lodash';

const buildAst = (before, after) => {
  const allKeys = _.union(Object.keys(before), Object.keys(after));
  const iterAst = (key) => {
    const emptyNode = {name: key, type: '', valueBefore: '', valueAfter: '',  children: []};
    if (_.isObject(before[key]) && _.isObject(after[key])) {
      return {...emptyNode, type: 'nesting', children: buildAst(before[key], after[key])};
    };

    const typesActions = [
      {
        type: 'added',
        check: (b, a) => !_.has(b, key) && _.has(a, key),
        build:  {...emptyNode, type: 'added', valueAfter: after[key]}
      },
      {
        type: 'deleted',
        check: (b, a) => _.has(b, key) && !_.has(a, key),
        build:  {...emptyNode, type: 'deleted', valueBefore: before[key]}
      },
      // 
      // Не понимаю почему не работает
      // 
      // {
      //   type: 'nesting',
      //   check: (b, a) => _.isObject(b[key]) && _.isObject(a[key]),
      //   build:  {...emptyNode, type: 'nesting', children: buildAst(before[key], after[key])},
      // },
      {
        type: 'unchanged',
        check: (b, a) => b[key] === a[key],
        build:  {...emptyNode, type: 'unchanged', valueBefore: before[key]}
      },
      {
        type: 'changed',
        check: (b, a) => b[key] !== a[key],
        build:  {...emptyNode, type: 'changed', valueBefore: before[key], valueAfter: after[key]}
      }
    ];

    const getTypesAction = (before, after) => typesActions.find(({ check }) => check(before, after));
    return getTypesAction(before, after).build;
  }
  return allKeys.map(iterAst);
}

export default buildAst;
