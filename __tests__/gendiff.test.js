/* eslint-disable no-undef */
/* eslint-disable import/no-named-as-default-member */
import jsonParse from '../src/utils';
import gendiff from '../src';

const fileBefore = '__tests__/__fixtures__/before.json';
const fileAfter = '__tests__/__fixtures__/after.json';

const jsonBefore = jsonParse(fileBefore);
const jsonAfter = jsonParse(fileAfter);

test('Compares two JSON', () => {
  expect(gendiff(jsonBefore, jsonAfter)).toMatch('{+ timeout: 20- timeout: 50+ verbose: true  host: hexlet.io- proxy: 123.234.53.22- follow: false}');
});
