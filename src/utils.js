import fs from 'fs';

export const readFile = file => fs.readFileSync(file, { encoding: 'utf-8' });
export const jsonParse = file => JSON.parse(fs.readFileSync(file, { encoding: 'utf-8' }));
