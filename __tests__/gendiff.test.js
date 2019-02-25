import fs from 'fs';
import gendiff from '../src';

test.each([
  ['__tests__/__fixtures__/flat/before.json', '__tests__/__fixtures__/flat/after.json', '__tests__/__fixtures__/flat/check.txt'],
  ['__tests__/__fixtures__/flat/before.ini', '__tests__/__fixtures__/flat/after.ini', '__tests__/__fixtures__/flat/check.txt'],
  ['__tests__/__fixtures__/flat/before.yml', '__tests__/__fixtures__/flat/after.yml', '__tests__/__fixtures__/flat/check.txt'],
  ['__tests__/__fixtures__/nesting/beforeTree.json', '__tests__/__fixtures__/nesting/afterTree.json', '__tests__/__fixtures__/nesting/checkTree.txt'],
  ['__tests__/__fixtures__/nesting/beforeTree.ini', '__tests__/__fixtures__/nesting/afterTree.ini', '__tests__/__fixtures__/nesting/checkTree.txt'],
  ['__tests__/__fixtures__/nesting/beforeTree.yml', '__tests__/__fixtures__/nesting/afterTree.yml', '__tests__/__fixtures__/nesting/checkTree.txt'],
])('Compares two JSON, YAML, ini, conclusions in nesting',
  (pathToFile1, pathToFile2, pathToCheck) => {
    const readFile = pathFile => fs.readFileSync(pathFile, { encoding: 'utf-8' });
    expect(gendiff(pathToFile1, pathToFile2, 'tree')).toMatch(readFile(pathToCheck));
  });

test.each([
  ['__tests__/__fixtures__/flat/before.json', '__tests__/__fixtures__/flat/after.json', '__tests__/__fixtures__/flat/checkPlain.txt'],
  ['__tests__/__fixtures__/flat/before.ini', '__tests__/__fixtures__/flat/after.ini', '__tests__/__fixtures__/flat/checkPlain.txt'],
  ['__tests__/__fixtures__/flat/before.yml', '__tests__/__fixtures__/flat/after.yml', '__tests__/__fixtures__/flat/checkPlain.txt'],
  ['__tests__/__fixtures__/nesting/beforeTree.json', '__tests__/__fixtures__/nesting/afterTree.json', '__tests__/__fixtures__/nesting/checkTreePlain.txt'],
  ['__tests__/__fixtures__/nesting/beforeTree.ini', '__tests__/__fixtures__/nesting/afterTree.ini', '__tests__/__fixtures__/nesting/checkTreePlain.txt'],
  ['__tests__/__fixtures__/nesting/beforeTree.yml', '__tests__/__fixtures__/nesting/afterTree.yml', '__tests__/__fixtures__/nesting/checkTreePlain.txt'],
])('Compares two JSON, YAML, ini, conclusions in plain',
  (pathToFile1, pathToFile2, pathToCheck) => {
    const readFile = pathFile => fs.readFileSync(pathFile, { encoding: 'utf-8' });
    expect(gendiff(pathToFile1, pathToFile2, 'plain')).toMatch(readFile(pathToCheck));
  });

test.each([
  ['__tests__/__fixtures__/flat/before.json', '__tests__/__fixtures__/flat/after.json', '__tests__/__fixtures__/flat/checkJSON.txt'],
  ['__tests__/__fixtures__/flat/before.ini', '__tests__/__fixtures__/flat/after.ini', '__tests__/__fixtures__/flat/checkJSON.txt'],
  ['__tests__/__fixtures__/flat/before.yml', '__tests__/__fixtures__/flat/after.yml', '__tests__/__fixtures__/flat/checkJSON.txt'],
  ['__tests__/__fixtures__/nesting/beforeTree.json', '__tests__/__fixtures__/nesting/afterTree.json', '__tests__/__fixtures__/nesting/checkTreeJSON.txt'],
  ['__tests__/__fixtures__/nesting/beforeTree.ini', '__tests__/__fixtures__/nesting/afterTree.ini', '__tests__/__fixtures__/nesting/checkTreeJSON.txt'],
  ['__tests__/__fixtures__/nesting/beforeTree.yml', '__tests__/__fixtures__/nesting/afterTree.yml', '__tests__/__fixtures__/nesting/checkTreeJSON.txt'],
])('Compares two JSON, YAML, ini, conclusions in JSON AST',
  (pathToFile1, pathToFile2, pathToCheck) => {
    const readFile = pathFile => fs.readFileSync(pathFile, { encoding: 'utf-8' });
    expect(gendiff(pathToFile1, pathToFile2, 'json')).toMatch(readFile(pathToCheck));
  });
