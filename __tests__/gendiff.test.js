import { readFile } from '../src/utils';
import gendiff from '../src';

test('Compares two JSON', () => {
  const pathToFile1 = '__tests__/__fixtures__/before.json';
  const pathToFile2 = '__tests__/__fixtures__/after.json';
  const contentCheck = readFile('__tests__/__fixtures__/check.txt');
  expect(gendiff(pathToFile1, pathToFile2)).toMatch(contentCheck);
});
