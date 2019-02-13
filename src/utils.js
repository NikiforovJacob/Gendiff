import fs from 'fs';

const jsonParse = file => JSON.parse(fs.readFileSync(file, { encoding: 'utf-8' }));

export default jsonParse;
