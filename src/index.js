import _ from 'lodash';
import parse from './parsers';
import fs from 'fs';
import path from 'path';
import buildAst from './buildAst';
import render from './renderers';

const readFile = pathFile => fs.readFileSync(pathFile, { encoding: 'utf-8' });

const gendiff = (pathToFileBefore, pathToFileAfter, format) => {

  const contentBefore = readFile(pathToFileBefore);
  const contentAfter = readFile(pathToFileAfter);
  const extFileBefore = path.extname(pathToFileBefore);
  const extFileAfter = path.extname(pathToFileAfter);
  const before = parse(contentBefore, extFileBefore);
  const after = parse(contentAfter, extFileAfter);
  const ast = (buildAst(before, after));
  return render(ast, format);
};

export default gendiff;
