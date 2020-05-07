; (function () {
  /** Detect free variable `global` from Node.js. */
  var freeGlobal = typeof global === 'object' && global && global.Object === Object && global;

  var self = this;
  /** Detect free variable `self`. */
  var freeSelf = typeof self === 'object' && self && self.Object === Object && self;

  /** Used as a reference to the global object. */
  var root = freeGlobal || freeSelf || self;

  /** Detect free variable `exports`. */
  var freeExports = typeof exports === 'object' && exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && typeof module === 'object' && module && !module.nodeType && module;

  var runPromise = function () {
    var promisify = function (asyncFunc, context) {
      return function () {
        var args = arguments;
        return new Promise(function (resolve, reject) {
          try {
            var ret = asyncFunc.apply(context, [].slice.call(args).concat(virtualCallback));
            // fix sync operation
            if (typeof ret !== "undefined") {
              resolve(ret);
            }
          } catch (err) {
            reject(err);
          }
          function virtualCallback(err, data) {
            if (err) {
              return reject(err);
            }
            return resolve(data);
          }
        });
      };
    };
    promisify.VERSION = "1.0.0";
    return promisify;
  };

  var promisify = runPromise();

  if (
    typeof window === "object"
    && typeof window.define == "function"
    && typeof window.define.amd == "object"
    && window.define.amd
  ) {
    root.promisify = promisify;
    window.define(function () {
      return promisify;
    });
  } else if (freeModule) {
    (freeModule.exports = promisify).promisify = promisify;
    freeExports.promisify = promisify;
  } else {
    root.promisify = promisify;
  }
}.call(this));