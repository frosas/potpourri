## Potpourri

[![Build Status](https://travis-ci.org/frosas/potpourri.svg)](https://travis-ci.org/frosas/potpourri)

_pot•pour•ri  (pō′pŏŏ rē′), n._

1. _A mixture of dried petals of roses or other flowers with spices, kept in a jar for their fragrance._
2. _A musical medley._
3. _**A collection of miscellaneous ~~literary~~ JS extracts.**_
4. _**Any mixture, esp. of unrelated objects, ~~subjects~~ functions, etc.**_

### Usage

```bash
$ npm i potpourri [--save|--save-dev]
```

With ES6:

```js
import {promisify} from 'potpourri';
import * as fs from 'fs';

process.on('unhandledRejection', console.log);

promisify(fs, 'readFile')('/etc/hosts', 'utf8').then(console.log);
```

With ES5:

```js
var promisify = require('potpourri/dist/es5').promisify;

...
```

### API reference

- [`promisify()`](src/index.js)
- [`toFunction()`](src/index.js)

### Development

```bash
$ npm i
$ npm run build
```

Testing:

```bash
$ npm test
```

Continuous building and testing:

```bash
$ npm run watch
```
