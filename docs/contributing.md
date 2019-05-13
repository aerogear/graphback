## Contribution

This project is intended to be used with v8 (LTS Carbon) release of [Node.js](https://nodejs.org/dist/latest-v8.x/docs/api/) or newer and [NPM](https://npmjs.com). Make sure you have those installed. Then just type following commands:

```sh
npm install
npm run build
```

### Available scripts

+ `clean` - remove coverage data, Jest cache and transpiled files,
+ `build` - transpile TypeScript to ES6,
+ `watch` - interactive watch mode to automatically transpile source files,
+ `lint` - lint source files and tests,
+ `test` - run tests,
+ `test:watch` - interactive watch mode to automatically re-run tests
