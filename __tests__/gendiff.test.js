import test, { expect } from 'jest';
import readFile from '../src/utils';
import gendiff from '../src';

test('Compares two JSON', () => {
  const pathToFile1 = '__tests__/__fixtures__/before.json';
  const pathToFile2 = '__tests__/__fixtures__/after.json';
  const contentCheck = readFile('__tests__/__fixtures__/check.txt');
  expect(gendiff(pathToFile1, pathToFile2)).toMatch(contentCheck);
});

test('Compares two YAML', () => {
  const pathToFile1 = '__tests__/__fixtures__/before.yml';
  const pathToFile2 = '__tests__/__fixtures__/after.yml';
  const contentCheck = readFile('__tests__/__fixtures__/check.txt');
  expect(gendiff(pathToFile1, pathToFile2)).toMatch(contentCheck);
});

test('Compares two ini', () => {
  const pathToFile1 = '__tests__/__fixtures__/before.ini';
  const pathToFile2 = '__tests__/__fixtures__/after.ini';
  const contentCheck = readFile('__tests__/__fixtures__/check.txt');
  expect(gendiff(pathToFile1, pathToFile2)).toMatch(contentCheck);
});
