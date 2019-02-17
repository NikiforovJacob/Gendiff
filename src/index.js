import _ from 'lodash';
import parse from './parsers';
import fs from 'fs';
import path from 'path';
import buildAst from './buildAst';
import stringify from './renderer';

const readFile = pathFile => fs.readFileSync(pathFile, { encoding: 'utf-8' });

const gendiff = (pathToFileBefore, pathToFileAfter) => {

  const contentBefore = readFile(pathToFileBefore);
  const contentAfter = readFile(pathToFileAfter);
  const extFileBefore = path.extname(pathToFileBefore);
  const extFileAfter = path.extname(pathToFileAfter);
  const before = parse(contentBefore, extFileBefore);
  const after = parse(contentAfter, extFileAfter);

  console.log((buildAst(before, after)));
  return stringify(buildAst(before, after));
};

export default gendiff;
