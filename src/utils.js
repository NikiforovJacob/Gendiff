import fs from 'fs';

const fileBefore = '/home/jacob/Documents/my-dir/Hexlet/Projects/Prj2_Difference-Calculator/__tests__/__fixtures__/before.json';
const fileAfter = '/home/jacob/Documents/my-dir/Hexlet/Projects/Prj2_Difference-Calculator/__tests__/__fixtures__/after.json';

export const jsonBefore = JSON.parse(fs.readFileSync(fileBefore, { encoding: 'utf-8' }));
export const jsonAfter = JSON.parse(fs.readFileSync(fileAfter, { encoding: 'utf-8' }));
