import _ from 'lodash';

const buildAst = (before, after) => {
  const allKeys = _.union(Object.keys(after), Object.keys(before));
  const iterAst = (acc, currentKey) => {
    const emptyNode = {name: currentKey, type: '', value: '', compareMark: ' ', children: []};
    const valueBefore = before[currentKey];
    const valueAfter = after[currentKey];

    if (!_.has(before, currentKey) && _.has(after, currentKey)) {
      if (_.isObject(valueBefore)) {
        return [...acc, {...emptyNode, type: 'sympleNode', value: valueBefore, compareMark: '+'}];
      }
      if (_.isObject(valueAfter)) {
        return [...acc, {...emptyNode, type: 'sympleNode', value: valueAfter, compareMark: '+'}];
      }
      return [...acc, {...emptyNode, type: 'leafNode', value: valueAfter, compareMark: '+'}];
    }

    if (_.has(before, currentKey) && !_.has(after, currentKey)) {
      if (_.isObject(valueBefore)) {
        return [...acc, {...emptyNode, type: 'sympleNode', value: valueBefore, compareMark: '-'}];
      }
      if (_.isObject(valueAfter)) {
        return [...acc, {...emptyNode, type: 'sympleNode', value: valueAfter, compareMark: '-'}];
      }
      return [...acc, {...emptyNode, type: 'leafNode', value: valueBefore, compareMark: '-'}];
    }

    if (_.isObject(valueBefore) && _.isObject(valueAfter)) {
      return [...acc, {...emptyNode, type: 'node', children: buildAst(valueBefore, valueAfter)}];
    }

    if (valueBefore === valueAfter) {
      return [...acc, {...emptyNode, type: 'leafNode', value: valueAfter, compareMark: ' '}];
    }

    if (_.has(after, currentKey) && valueBefore !== valueAfter) {
      if (_.isObject(valueBefore)) {
        return [...acc, 
          {...emptyNode, type: 'sympleNode', value: valueBefore, compareMark: '-'},
          {...emptyNode, type: 'leafNode', value: valueAfter, compareMark: '+'}
        ];
      }
      if (_.isObject(valueAfter)) {
        return [...acc, 
          {...emptyNode, type: 'leafNode', value: valueBefore, compareMark: '-'},
          {...emptyNode, type: 'sympleNode', value: valueAfter, compareMark: '+'}
        ];
      }
      return [...acc, 
                {...emptyNode, type: 'leafNode', value: valueBefore, compareMark: '-'},
                {...emptyNode, type: 'leafNode', value: valueAfter, compareMark: '+'}
              ];
      };
  }
  return allKeys.reduce(iterAst, []);
}

export default buildAst;
