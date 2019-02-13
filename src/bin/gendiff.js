#!/usr/bin/env node
import program from 'commander';
import _ from 'lodash';

program
  .version('0.1.0', '-V, --version')
  .option('-f, --format [type]', 'Output format')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>');

program.parse(process.argv);

const gendiff = (before, after) => {
  const reducer1 = (acc, currentKey) => {
    if (!_.has(before, currentKey)) {
      return `${acc}+ ${currentKey}: ${after[currentKey]}`;
    }
    if (before[currentKey] === after[currentKey]) {
      return `${acc}  ${currentKey}: ${after[currentKey]}`;
    }
    return `${acc}+ ${currentKey}: ${after[currentKey]}- ${currentKey}: ${before[currentKey]}`;
  };
  const gen = Object.keys(after).reduce(reducer1, '');

  const reducer2 = (acc, currentKey) => {
    if (!_.has(after, currentKey)) {
      return `${acc}- ${currentKey}: ${before[currentKey]}`;
    }
    return acc;
  };

  const gen2 = Object.keys(before).reduce(reducer2, gen);
  return `{${gen2}}`;
};

export default gendiff;
