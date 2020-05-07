# a promisify method used to transform error-first async functions into promised one

such as some methods contained by Node.js `fs` module, we can promisify these async operations, codes like below:

```
const fs = require("fs");
const promisify = require("promisify");
const readFilePromise = promisify(fs.readFile, fs); // context is not required, ie fs
readFilePromise("file/path", "utf8")
  .then(file => console.log(file))
  .catch(error => console.log(error));
```

It also works in browsers and ESM environment.  
If you directly link this file in HTML script tag, it will automatically attach to `window`, window.promisify
