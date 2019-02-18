import fs from 'fs';
import gendiff from '../src';

// test.each([
//   ['__tests__/__fixtures__/before.json', '__tests__/__fixtures__/after.json', '__tests__/__fixtures__/check.txt'],
//   ['__tests__/__fixtures__/before.ini', '__tests__/__fixtures__/after.ini', '__tests__/__fixtures__/check.txt'],
//   ['__tests__/__fixtures__/before.yml', '__tests__/__fixtures__/after.yml', '__tests__/__fixtures__/check.txt'],
//   ['__tests__/__fixtures__/beforeTree.json', '__tests__/__fixtures__/afterTree.json', '__tests__/__fixtures__/checkTree.txt'],
//   ['__tests__/__fixtures__/beforeTree.ini', '__tests__/__fixtures__/afterTree.ini', '__tests__/__fixtures__/checkTree.txt'],
//   ['__tests__/__fixtures__/beforeTree.yml', '__tests__/__fixtures__/afterTree.yml', '__tests__/__fixtures__/checkTree.txt']
// ])('Compares two JSON, YAML, ini',
//   (pathToFile1, pathToFile2, pathToCheck) => {
//     const readFile = pathFile => fs.readFileSync(pathFile, { encoding: 'utf-8' });
//     expect(gendiff(pathToFile1, pathToFile2, 'tree')).toMatch(readFile(pathToCheck));
//   }
// );

test.each([
  ['__tests__/__fixtures__/before.json', '__tests__/__fixtures__/after.json', '__tests__/__fixtures__/checkPlain.txt'],
  // ['__tests__/__fixtures__/before.ini', '__tests__/__fixtures__/after.ini', '__tests__/__fixtures__/checkPlain.txt'],
  // ['__tests__/__fixtures__/before.yml', '__tests__/__fixtures__/after.yml', '__tests__/__fixtures__/checkPlain.txt'],
  // ['__tests__/__fixtures__/beforeTree.json', '__tests__/__fixtures__/afterTree.json', '__tests__/__fixtures__/checkTreePlain.txt'],
  // ['__tests__/__fixtures__/beforeTree.ini', '__tests__/__fixtures__/afterTree.ini', '__tests__/__fixtures__/checkTreePlain.txt'],
  ['__tests__/__fixtures__/beforeTree.yml', '__tests__/__fixtures__/afterTree.yml', '__tests__/__fixtures__/checkTreePlain.txt']
])('Compares two JSON, YAML, ini',
  (pathToFile1, pathToFile2, pathToCheck) => {
    const readFile = pathFile => fs.readFileSync(pathFile, { encoding: 'utf-8' });
    expect(gendiff(pathToFile1, pathToFile2, 'plain')).toMatch(readFile(pathToCheck));
  }
);
