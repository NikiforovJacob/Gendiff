/* eslint-disable no-undef */
/* eslint-disable import/no-named-as-default-member */
import jsonParse from '../src/utils';
import gendiff from '../src';

const fileBefore = '/home/jacob/Documents/my-dir/Hexlet/Projects/Prj2_Difference-Calculator/__tests__/__fixtures__/before.json';
const fileAfter = '/home/jacob/Documents/my-dir/Hexlet/Projects/Prj2_Difference-Calculator/__tests__/__fixtures__/after.json';

const jsonBefore = jsonParse(fileBefore);
const jsonAfter = jsonParse(fileAfter);

test('Compares two JSON', () => {
  expect(gendiff(jsonBefore, jsonAfter)).toBe('{+ timeout: 20- timeout: 50+ verbose: true  host: hexlet.io- proxy: 123.234.53.22- follow: false}');
});
