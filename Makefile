install:
	npm install
start:
	npx babel-node -- src/bin/gendiff.js
publish:
	npm publish
lint:
	npx eslint ./
babel:
	npx babel src --out-dir dist
test:
	npm run test
