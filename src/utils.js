import fs from 'fs';

const readFile = pathFile => fs.readFileSync(pathFile, { encoding: 'utf-8' });
export default readFile;
