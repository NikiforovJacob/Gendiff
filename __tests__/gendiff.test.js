/* eslint-disable no-undef */
/* eslint-disable import/no-named-as-default-member */
import { jsonParse, readFile } from '../src/utils';
import gendiff from '../src';

const fileBefore = '__tests__/__fixtures__/before.json';
const fileAfter = '__tests__/__fixtures__/after.json';
const fileCheck = '__tests__/__fixtures__/check.txt';

const jsonBefore = jsonParse(fileBefore);
const jsonAfter = jsonParse(fileAfter);
const checkValue = readFile(fileCheck);

test('Compares two JSON', () => {
  expect(gendiff(jsonBefore, jsonAfter)).toMatch(checkValue);
});
