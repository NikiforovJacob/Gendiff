#!/usr/bin/env node
import program from 'commander';
import gendiff from '..';

program
  .version('0.3.1', '-V, --version')
  .option('-f, --format [type]', 'Output format')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .action((pathToFile1, pathToFile2) => {
    console.log(gendiff(pathToFile1, pathToFile2));
  });
program.parse(process.argv);
