## Potpourri

_pot•pour•ri  (pō′pŏŏ rē′), n._

1. _A mixture of dried petals of roses or other flowers with spices, kept in a jar for their fragrance._
2. _A musical medley._
3. _**A collection of miscellaneous ~~literary~~ JS extracts.**_
4. _**Any mixture, esp. of unrelated objects, ~~subjects~~ functions, etc.**_

### Usage

```bash
$ npm i potpourri [--save|--save-dev]
```

With ES2015:

```js
import {promisify} from 'potpourri';

promisify(fs, 'readFile')('/etc/passwd').then(passwd => console.log(String(passwd)));
```

With ES5:

```js
var potpourri = require('potpourri/dist/es5');

potpourri.promisify(fs, 'readFile')('/etc/passwd').then(passwd => console.log(String(passwd)));
```

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
