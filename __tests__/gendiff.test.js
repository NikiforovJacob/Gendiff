import fs from 'fs';
import gendiff from '../src';

const subjectJson = ['__tests__/__fixtures__/flat/before.json', '__tests__/__fixtures__/flat/after.json'];
const subjectIni = ['__tests__/__fixtures__/flat/before.ini', '__tests__/__fixtures__/flat/after.ini'];
const subjectYaml = ['__tests__/__fixtures__/flat/before.yml', '__tests__/__fixtures__/flat/after.yml'];

const subjectJsonTree = ['__tests__/__fixtures__/nesting/beforeTree.json', '__tests__/__fixtures__/nesting/afterTree.json'];
const subjectIniTree = ['__tests__/__fixtures__/nesting/beforeTree.ini', '__tests__/__fixtures__/nesting/afterTree.ini'];
const subjectYamlTree = ['__tests__/__fixtures__/nesting/beforeTree.yml', '__tests__/__fixtures__/nesting/afterTree.yml'];


test.each([
  [...subjectJson, '__tests__/__fixtures__/flat/check.txt'],
  [...subjectIni, '__tests__/__fixtures__/flat/check.txt'],
  [...subjectYaml, '__tests__/__fixtures__/flat/check.txt'],
  [...subjectJsonTree, '__tests__/__fixtures__/nesting/checkTree.txt'],
  [...subjectIniTree, '__tests__/__fixtures__/nesting/checkTree.txt'],
  [...subjectYamlTree, '__tests__/__fixtures__/nesting/checkTree.txt'],
])('Compares two JSON, YAML, ini, conclusions in nesting',
  (pathToFile1, pathToFile2, pathToCheck) => {
    const readFile = pathFile => fs.readFileSync(pathFile, { encoding: 'utf-8' });
    expect(gendiff(pathToFile1, pathToFile2, 'tree')).toMatch(readFile(pathToCheck));
  });

test.each([
  [...subjectJson, '__tests__/__fixtures__/flat/checkPlain.txt'],
  [...subjectIni, '__tests__/__fixtures__/flat/checkPlain.txt'],
  [...subjectYaml, '__tests__/__fixtures__/flat/checkPlain.txt'],
  [...subjectJsonTree, '__tests__/__fixtures__/nesting/checkTreePlain.txt'],
  [...subjectIniTree, '__tests__/__fixtures__/nesting/checkTreePlain.txt'],
  [...subjectYamlTree, '__tests__/__fixtures__/nesting/checkTreePlain.txt'],
])('Compares two JSON, YAML, ini, conclusions in plain',
  (pathToFile1, pathToFile2, pathToCheck) => {
    const readFile = pathFile => fs.readFileSync(pathFile, { encoding: 'utf-8' });
    expect(gendiff(pathToFile1, pathToFile2, 'plain')).toMatch(readFile(pathToCheck));
  });

test.each([
  [...subjectJson, '__tests__/__fixtures__/flat/checkJSON.txt'],
  [...subjectIni, '__tests__/__fixtures__/flat/checkJSON.txt'],
  [...subjectYaml, '__tests__/__fixtures__/flat/checkJSON.txt'],
  [...subjectJsonTree, '__tests__/__fixtures__/nesting/checkTreeJSON.txt'],
  [...subjectIniTree, '__tests__/__fixtures__/nesting/checkTreeJSON.txt'],
  [...subjectYamlTree, '__tests__/__fixtures__/nesting/checkTreeJSON.txt'],
])('Compares two JSON, YAML, ini, conclusions in JSON AST',
  (pathToFile1, pathToFile2, pathToCheck) => {
    const readFile = pathFile => fs.readFileSync(pathFile, { encoding: 'utf-8' });
    expect(gendiff(pathToFile1, pathToFile2, 'json')).toMatch(readFile(pathToCheck));
  });
