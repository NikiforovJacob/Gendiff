/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-undef */
import { jsonBefore, jsonAfter } from '../src/utils';
import gendiff from '../src/bin/gendiff';

test('Compares two JSON', () => {
  expect(gendiff(jsonBefore, jsonAfter)).toBe('{+ timeout: 20- timeout: 50+ verbose: true  host: hexlet.io- proxy: 123.234.53.22- follow: false}');
});
