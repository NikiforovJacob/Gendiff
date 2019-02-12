#!/usr/bin/env node
import program from 'commander';

program
  .version('0.0.3', '-V, --version')
  .option('-f, --format [type]', 'Output format')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>');

program.parse(process.argv);
