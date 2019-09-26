(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["vendor"],{

/***/ "../node_modules/css-loader/dist/runtime/api.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return '@media ' + item[2] + '{' + content + '}';
      } else {
        return content;
      }
    }).join('');
  }; // import a list of modules into the list


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (i = 0; i < modules.length; i++) {
      var item = modules[i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = '(' + item[2] + ') and (' + mediaQuery + ')';
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || '';
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;
  return '/*# ' + data + ' */';
}

/***/ }),

/***/ "../node_modules/fast-levenshtein/levenshtein.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;(function() {
  'use strict';
  
  var collator;
  try {
    collator = (typeof Intl !== "undefined" && typeof Intl.Collator !== "undefined") ? Intl.Collator("generic", { sensitivity: "base" }) : null;
  } catch (err){
    console.log("Collator could not be initialized and wouldn't be used");
  }
  // arrays to re-use
  var prevRow = [],
    str2Char = [];
  
  /**
   * Based on the algorithm at http://en.wikipedia.org/wiki/Levenshtein_distance.
   */
  var Levenshtein = {
    /**
     * Calculate levenshtein distance of the two strings.
     *
     * @param str1 String the first string.
     * @param str2 String the second string.
     * @param [options] Additional options.
     * @param [options.useCollator] Use `Intl.Collator` for locale-sensitive string comparison.
     * @return Integer the levenshtein distance (0 and above).
     */
    get: function(str1, str2, options) {
      var useCollator = (options && collator && options.useCollator);
      
      var str1Len = str1.length,
        str2Len = str2.length;
      
      // base cases
      if (str1Len === 0) return str2Len;
      if (str2Len === 0) return str1Len;

      // two rows
      var curCol, nextCol, i, j, tmp;

      // initialise previous row
      for (i=0; i<str2Len; ++i) {
        prevRow[i] = i;
        str2Char[i] = str2.charCodeAt(i);
      }
      prevRow[str2Len] = str2Len;

      var strCmp;
      if (useCollator) {
        // calculate current row distance from previous row using collator
        for (i = 0; i < str1Len; ++i) {
          nextCol = i + 1;

          for (j = 0; j < str2Len; ++j) {
            curCol = nextCol;

            // substution
            strCmp = 0 === collator.compare(str1.charAt(i), String.fromCharCode(str2Char[j]));

            nextCol = prevRow[j] + (strCmp ? 0 : 1);

            // insertion
            tmp = curCol + 1;
            if (nextCol > tmp) {
              nextCol = tmp;
            }
            // deletion
            tmp = prevRow[j + 1] + 1;
            if (nextCol > tmp) {
              nextCol = tmp;
            }

            // copy current col value into previous (in preparation for next iteration)
            prevRow[j] = curCol;
          }

          // copy last col value into previous (in preparation for next iteration)
          prevRow[j] = nextCol;
        }
      }
      else {
        // calculate current row distance from previous row without collator
        for (i = 0; i < str1Len; ++i) {
          nextCol = i + 1;

          for (j = 0; j < str2Len; ++j) {
            curCol = nextCol;

            // substution
            strCmp = str1.charCodeAt(i) === str2Char[j];

            nextCol = prevRow[j] + (strCmp ? 0 : 1);

            // insertion
            tmp = curCol + 1;
            if (nextCol > tmp) {
              nextCol = tmp;
            }
            // deletion
            tmp = prevRow[j + 1] + 1;
            if (nextCol > tmp) {
              nextCol = tmp;
            }

            // copy current col value into previous (in preparation for next iteration)
            prevRow[j] = curCol;
          }

          // copy last col value into previous (in preparation for next iteration)
          prevRow[j] = nextCol;
        }
      }
      return nextCol;
    }

  };

  // amd
  if ( true && __webpack_require__("../node_modules/webpack/buildin/amd-define.js") !== null && __webpack_require__("../node_modules/webpack/buildin/amd-options.js")) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
      return Levenshtein;
    }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }
  // commonjs
  else if ( true && module !== null && typeof exports !== "undefined" && module.exports === exports) {
    module.exports = Levenshtein;
  }
  // web worker
  else if (typeof self !== "undefined" && typeof self.postMessage === 'function' && typeof self.importScripts === 'function') {
    self.Levenshtein = Levenshtein;
  }
  // browser main thread
  else if (typeof global.global !== "undefined" && global.global !== null) {
    global.global.Levenshtein = Levenshtein;
  }
}());


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "../node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var ReactIs = __webpack_require__("../node_modules/react-is/index.js");
var REACT_STATICS = {
    childContextTypes: true,
    contextType: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    getDerivedStateFromError: true,
    getDerivedStateFromProps: true,
    mixins: true,
    propTypes: true,
    type: true
};

var KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    callee: true,
    arguments: true,
    arity: true
};

var FORWARD_REF_STATICS = {
    '$$typeof': true,
    render: true,
    defaultProps: true,
    displayName: true,
    propTypes: true
};

var MEMO_STATICS = {
    '$$typeof': true,
    compare: true,
    defaultProps: true,
    displayName: true,
    propTypes: true,
    type: true
};

var TYPE_STATICS = {};
TYPE_STATICS[ReactIs.ForwardRef] = FORWARD_REF_STATICS;

function getStatics(component) {
    if (ReactIs.isMemo(component)) {
        return MEMO_STATICS;
    }
    return TYPE_STATICS[component['$$typeof']] || REACT_STATICS;
}

var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = Object.prototype;

function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
    if (typeof sourceComponent !== 'string') {
        // don't hoist over string (html) components

        if (objectPrototype) {
            var inheritedComponent = getPrototypeOf(sourceComponent);
            if (inheritedComponent && inheritedComponent !== objectPrototype) {
                hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
            }
        }

        var keys = getOwnPropertyNames(sourceComponent);

        if (getOwnPropertySymbols) {
            keys = keys.concat(getOwnPropertySymbols(sourceComponent));
        }

        var targetStatics = getStatics(targetComponent);
        var sourceStatics = getStatics(sourceComponent);

        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
                var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
                try {
                    // Avoid failures from read-only properties
                    defineProperty(targetComponent, key, descriptor);
                } catch (e) {}
            }
        }

        return targetComponent;
    }

    return targetComponent;
}

module.exports = hoistNonReactStatics;


/***/ }),

/***/ "../node_modules/nativescript-dev-webpack/hmr/hmr-update.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const hot = __webpack_require__("../node_modules/nativescript-dev-webpack/hot.js");
const file_system_1 = __webpack_require__("tns-core-modules/file-system");
function hmrUpdate() {
    const currentAppFolder = file_system_1.knownFolders.currentApp();
    const latestHash = __webpack_require__["h"]();
    return hot(latestHash, filename => {
        const fullFilePath = file_system_1.path.join(currentAppFolder.path, filename);
        return file_system_1.File.exists(fullFilePath) ? currentAppFolder.getFile(filename) : null;
    });
}
exports.hmrUpdate = hmrUpdate;
//# sourceMappingURL=hmr-update.js.map

/***/ }),

/***/ "../node_modules/nativescript-dev-webpack/hmr/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var hmr_update_1 = __webpack_require__("../node_modules/nativescript-dev-webpack/hmr/hmr-update.js");
exports.hmrUpdate = hmr_update_1.hmrUpdate;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../node_modules/nativescript-dev-webpack/hot.js":
/***/ (function(module, exports, __webpack_require__) {

const hmrPrefix = 'HMR:';
const log = {
    info: (message) => console.info(`${hmrPrefix} ${message}`),
    warn: (message) => console.warn(`${hmrPrefix} ${message}`),
    error: (message) => console.error(`${hmrPrefix} ${message}`),
};
const refresh = 'Application needs to be restarted in order to apply the changes.';
const hotOptions = {
    ignoreUnaccepted: false,
    ignoreDeclined: false,
    ignoreErrored: false,
    onUnaccepted(data) {
        const chain = [].concat(data.chain);
        const last = chain[chain.length - 1];

        if (last === 0) {
            chain.pop();
        }

        log.warn(`Ignored an update to unaccepted module: `);
        chain.forEach(mod => log.warn(`         ➭ ${mod}`));
    },
    onDeclined(data) {
        log.warn(`Ignored an update to declined module:`);
        data.chain.forEach(mod => log.warn(`         ➭ ${mod}`));
    },
    onErrored(data) {
        log.warn(
            `Ignored an error while updating module ${data.moduleId} <${data.type}>`
        );
        log.warn(data.error);
    },
};

let nextHash;
let currentHash;

function upToDate() {
    return nextHash.indexOf(__webpack_require__.h()) >= 0;
}

function result(modules, appliedModules) {
    const unaccepted = modules.filter(
        (moduleId) => appliedModules && appliedModules.indexOf(moduleId) < 0
    );

    if (unaccepted.length > 0) {
        log.warn('The following modules could not be updated:');

        for (const moduleId of unaccepted) {
            log.warn(`          ⦻ ${moduleId}`);
        }
    }

    if (!(appliedModules || []).length) {
        log.info('No Modules Updated.');
    } else {
        log.info('The following modules were updated:');

        for (const moduleId of appliedModules) {
            log.info(`         ↻ ${moduleId}`);
        }

        const numberIds = appliedModules.every(
            (moduleId) => typeof moduleId === 'number'
        );
        if (numberIds) {
            log.info(
                'Please consider using the NamedModulesPlugin for module names.'
            );
        }
    }
}

function check(options) {
    return module.hot
        .check()
        .then((modules) => {
            if (!modules) {
                log.warn(
                    `Cannot find update. ${refresh}`
                );
                return null;
            }

            return module.hot
                .apply(hotOptions)
                .then((appliedModules) => {
                    let nextCheck;
                    if (!upToDate()) {
                        nextCheck = check(options);
                    }

                    result(modules, appliedModules);

                    if (upToDate()) {
                        // Do not modify message - CLI depends on this exact content to determine hmr operation status.
                        log.info(`Successfully applied update with hmr hash ${currentHash}. App is up to date.`);
                    }

                    return nextCheck || null;
                })
                .catch((err) => {
                    const status = module.hot.status();
                    if (['abort', 'fail'].indexOf(status) >= 0) {
                        // Do not modify message - CLI depends on this exact content to determine hmr operation status.
                        log.error(`Cannot apply update with hmr hash ${currentHash}.`);
                        log.error(err.message || err.stack);
                    } else {
                        log.error(`Update failed: ${err.message || err.stack}`);
                    }
                });
        })
        .catch((err) => {
            const status = module.hot.status();
            if (['abort', 'fail'].indexOf(status) >= 0) {
                log.error(`Cannot check for update. ${refresh}`);
                log.error(err.message || err.stack);
            } else {
                log.error(`Update check failed: ${err.message || err.stack}`);
            }
        });
}

if (true) {
    log.info('Hot Module Replacement Enabled. Waiting for signal.');
} else {}

function update(latestHash, options) {
    nextHash = latestHash;
    if (!upToDate()) {
        const status = module.hot.status();

        if (status === 'idle') {
            //Do not modify message - CLI depends on this exact content to determine hmr operation status.
            log.info(`Checking for updates to the bundle with hmr hash ${currentHash}.`);
            return check(options);
        } else if (['abort', 'fail'].indexOf(status) >= 0) {
            log.warn(
                `Cannot apply update. A previous update ${status}ed. ${refresh}`
            );
        }
    }
};

function getNextHash(hash, getFileContent) {
    const file = getFileContent(`${hash}.hot-update.json`);
    if (!file) {
        return Promise.resolve(hash);
    }

    return file.readText().then(hotUpdateContent => {
        if (hotUpdateContent) {
            const manifest = JSON.parse(hotUpdateContent);
            const newHash = manifest.h;
            return getNextHash(newHash, getFileContent);
        } else {
            return Promise.resolve(hash);
        }
    }).catch(error => Promise.reject(error));
}

module.exports = function checkState(initialHash, getFileContent) {
    currentHash = initialHash;
    return getNextHash(initialHash, getFileContent).then(nextHash => {
        if (nextHash != initialHash) {
            return update(nextHash, {});
        }
    })
}


/***/ }),

/***/ "../node_modules/nativescript-dev-webpack/load-application-css-regular.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {const loadCss = __webpack_require__("../node_modules/nativescript-dev-webpack/load-application-css.js");

module.exports = function() {
    loadCss(function() {
        const appCssContext = __webpack_require__("./ sync ^\\.\\/app\\.(css|scss|less|sass)$");
        global.registerWebpackModules(appCssContext);
    });
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../node_modules/nativescript-dev-webpack/load-application-css.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = function (loadModuleFn) {
    const application = __webpack_require__("tns-core-modules/application");
    __webpack_require__("tns-core-modules/ui/styling/style-scope");

    loadModuleFn();

    application.loadAppCss();
}


/***/ }),

/***/ "../node_modules/object-assign/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ "../node_modules/prop-types/checkPropTypes.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var printWarning = function() {};

if (true) {
  var ReactPropTypesSecret = __webpack_require__("../node_modules/prop-types/lib/ReactPropTypesSecret.js");
  var loggedTypeFailures = {};
  var has = Function.call.bind(Object.prototype.hasOwnProperty);

  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (true) {
    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning(
            (componentName || 'React class') + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          );
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

/**
 * Resets warning cache when testing.
 *
 * @private
 */
checkPropTypes.resetWarningCache = function() {
  if (true) {
    loggedTypeFailures = {};
  }
}

module.exports = checkPropTypes;


/***/ }),

/***/ "../node_modules/prop-types/factoryWithTypeCheckers.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactIs = __webpack_require__("../node_modules/react-is/index.js");
var assign = __webpack_require__("../node_modules/object-assign/index.js");

var ReactPropTypesSecret = __webpack_require__("../node_modules/prop-types/lib/ReactPropTypesSecret.js");
var checkPropTypes = __webpack_require__("../node_modules/prop-types/checkPropTypes.js");

var has = Function.call.bind(Object.prototype.hasOwnProperty);
var printWarning = function() {};

if (true) {
  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (true) {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
          err.name = 'Invariant Violation';
          throw err;
        } else if ( true && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            printWarning(
              'You are manually calling a React.PropTypes validation ' +
              'function for the `' + propFullName + '` prop on `' + componentName  + '`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!ReactIs.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      if (true) {
        if (arguments.length > 1) {
          printWarning(
            'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
            'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
          );
        } else {
          printWarning('Invalid argument supplied to oneOf, expected an array.');
        }
      }
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value);
        if (type === 'symbol') {
          return String(value);
        }
        return value;
      });
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (has(propValue, key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
       true ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : undefined;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning(
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
        );
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // falsy value can't be a Symbol
    if (!propValue) {
      return false;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),

/***/ "../node_modules/prop-types/index.js":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (true) {
  var ReactIs = __webpack_require__("../node_modules/react-is/index.js");

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__("../node_modules/prop-types/factoryWithTypeCheckers.js")(ReactIs.isElement, throwOnDirectAccess);
} else {}


/***/ }),

/***/ "../node_modules/prop-types/lib/ReactPropTypesSecret.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),

/***/ "../node_modules/react-hot-loader/dist/react-hot-loader.development.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = __webpack_require__("../node_modules/react/index.js");
var React__default = _interopDefault(React);
var shallowEqual = _interopDefault(__webpack_require__("../node_modules/shallowequal/index.js"));
var levenshtein = _interopDefault(__webpack_require__("../node_modules/fast-levenshtein/levenshtein.js"));
var ReactDOM = _interopDefault(__webpack_require__("../node_modules/react-nativescript/dist/index.js"));
var PropTypes = _interopDefault(__webpack_require__("../node_modules/prop-types/index.js"));
var defaultPolyfill = __webpack_require__("../node_modules/react-lifecycles-compat/react-lifecycles-compat.es.js");
var defaultPolyfill__default = _interopDefault(defaultPolyfill);
var hoistNonReactStatic = _interopDefault(__webpack_require__("../node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js"));

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

/* eslint-disable no-underscore-dangle */

var isCompositeComponent = function isCompositeComponent(type) {
  return typeof type === 'function';
};
var isReloadableComponent = function isReloadableComponent(type) {
  return typeof type === 'function' || (typeof type === 'undefined' ? 'undefined' : _typeof(type)) === 'object';
};

var getComponentDisplayName = function getComponentDisplayName(type) {
  var displayName = type.displayName || type.name;
  return displayName && displayName !== 'ReactComponent' ? displayName : 'Component';
};

var reactLifeCycleMountMethods = ['componentWillMount', 'componentDidMount'];

function isReactClass(Component) {
  return !!(Component.prototype && (React__default.Component.prototype.isPrototypeOf(Component.prototype) ||
  // react 14 support
  Component.prototype.isReactComponent || Component.prototype.componentWillMount || Component.prototype.componentWillUnmount || Component.prototype.componentDidMount || Component.prototype.componentDidUnmount || Component.prototype.render));
}

function isReactClassInstance(Component) {
  return Component && isReactClass({ prototype: Object.getPrototypeOf(Component) });
}

var getInternalInstance = function getInternalInstance(instance) {
  return instance._reactInternalFiber || // React 16
  instance._reactInternalInstance || // React 15
  null;
};

var updateInstance = function updateInstance(instance) {
  var updater = instance.updater,
      forceUpdate = instance.forceUpdate;

  if (typeof forceUpdate === 'function') {
    instance.forceUpdate();
  } else if (updater && typeof updater.enqueueForceUpdate === 'function') {
    updater.enqueueForceUpdate(instance);
  }
};

var isFragmentNode = function isFragmentNode(_ref) {
  var type = _ref.type;
  return React__default.Fragment && type === React__default.Fragment;
};

var ContextType = React__default.createContext ? React__default.createContext() : null;
var ConsumerType = ContextType && ContextType.Consumer.$$typeof;
var ProviderType = ContextType && ContextType.Provider.$$typeof;
var MemoType = React__default.memo && React__default.memo(function () {
  return null;
}).$$typeof;
var LazyType = React__default.lazy && React__default.lazy(function () {
  return null;
}).$$typeof;
var ForwardType = React__default.forwardRef && React__default.forwardRef(function () {
  return null;
}).$$typeof;

var CONTEXT_CURRENT_VALUE = '_currentValue';

var isContextConsumer = function isContextConsumer(_ref2) {
  var type = _ref2.type;
  return type && (typeof type === 'undefined' ? 'undefined' : _typeof(type)) === 'object' && '$$typeof' in type && type.$$typeof === ConsumerType && ConsumerType;
};
var isContextProvider = function isContextProvider(_ref3) {
  var type = _ref3.type;
  return type && (typeof type === 'undefined' ? 'undefined' : _typeof(type)) === 'object' && '$$typeof' in type && type.$$typeof === ProviderType && ProviderType;
};
var isMemoType = function isMemoType(_ref4) {
  var type = _ref4.type;
  return type && (typeof type === 'undefined' ? 'undefined' : _typeof(type)) === 'object' && '$$typeof' in type && type.$$typeof === MemoType && MemoType;
};
var isLazyType = function isLazyType(_ref5) {
  var type = _ref5.type;
  return type && (typeof type === 'undefined' ? 'undefined' : _typeof(type)) === 'object' && '$$typeof' in type && type.$$typeof === LazyType && LazyType;
};
var isForwardType = function isForwardType(_ref6) {
  var type = _ref6.type;
  return type && (typeof type === 'undefined' ? 'undefined' : _typeof(type)) === 'object' && '$$typeof' in type && type.$$typeof === ForwardType && ForwardType;
};
var isContextType = function isContextType(type) {
  return isContextConsumer(type) || isContextProvider(type);
};

var getElementType = function getElementType(type) {
  var element = { type: type };

  if (isContextConsumer(element)) {
    return 'Consumer';
  }
  if (isContextProvider(element)) {
    return 'Provider';
  }
  if (isLazyType(element)) {
    return 'Lazy';
  }
  if (isMemoType(element)) {
    return 'Memo';
  }
  if (isForwardType(element)) {
    return 'Forward';
  }

  if (isReactClass(type)) {
    return 'Class';
  }

  if (typeof element === 'function') {
    return 'FC';
  }

  return 'unknown';
};

var getContextProvider = function getContextProvider(type) {
  return type && type._context;
};

var configuration = {
  // Log level
  logLevel: 'error',

  // Allows using SFC without changes
  pureSFC: true,

  // keep render method unpatched, moving sideEffect to componentDidUpdate
  pureRender: true,

  // Allows SFC to be used, enables "intermediate" components used by Relay, should be disabled for Preact
  allowSFC: true,

  // Allow reload of effect hooks with non zero dependency list
  reloadHooks: true,

  // Allow reload of mount effect hooks - zero deps
  reloadLifeCycleHooks: false,

  // Enables hook reload on hook body change
  reloadHooksOnBodyChange: true,

  // Disable "hot-replacement-render"
  disableHotRenderer: false,

  // @private
  integratedComparator: false,
  // @private
  integratedResolver: false,

  // Disable "hot-replacement-render" when injection into react-dom is made
  disableHotRendererWhenInjected: true,

  // Controls `react-🔥-dom patch` notification
  showReactDomPatchNotification: true,

  // Hook on babel component register.
  onComponentRegister: false,

  // Hook on React renders for a first time component
  onComponentCreate: false,

  // flag to completely disable RHL for SFC. Probably don't use it without dom patch made.
  ignoreSFC: false,

  // ignoreSFC when injection into react-dom is made
  ignoreSFCWhenInjected: true,

  // flag to completely disable RHL for Components
  ignoreComponents: false,

  // default value for AppContainer errorOverlay
  errorReporter: undefined,

  // Global error overlay
  ErrorOverlay: undefined,

  // Actively track lazy loaded components
  trackTailUpdates: true,

  // react hot dom features enabled
  IS_REACT_MERGE_ENABLED: false
};

var internalConfiguration = {
  // control proxy creation
  disableProxyCreation: false
};

var setConfiguration = function setConfiguration(config) {
  // not using Object.assing for IE11 compliance
  for (var i in config) {
    if (config.hasOwnProperty(i)) {
      configuration[i] = config[i];
    }
  }
};

/* eslint-disable no-console */

var logger = {
  debug: function debug() {
    if (['debug'].indexOf(configuration.logLevel) !== -1) {
      var _console;

      (_console = console).debug.apply(_console, arguments);
    }
  },
  log: function log() {
    if (['debug', 'log'].indexOf(configuration.logLevel) !== -1) {
      var _console2;

      (_console2 = console).log.apply(_console2, arguments);
    }
  },
  warn: function warn() {
    if (['debug', 'log', 'warn'].indexOf(configuration.logLevel) !== -1) {
      var _console3;

      (_console3 = console).warn.apply(_console3, arguments);
    }
  },
  error: function error() {
    if (['debug', 'log', 'warn', 'error'].indexOf(configuration.logLevel) !== -1) {
      var _console4;

      (_console4 = console).error.apply(_console4, arguments);
    }
  }
};

/* eslint-disable no-eval, func-names */

function safeReactConstructor(Component, lastInstance) {
  try {
    if (lastInstance) {
      return new Component(lastInstance.props, lastInstance.context);
    }
    return new Component({}, {});
  } catch (e) {
    // some components, like Redux connect could not be created without proper context
  }
  return null;
}

function isNativeFunction(fn) {
  return typeof fn === 'function' ? fn.toString().indexOf('[native code]') > 0 : false;
}

var identity = function identity(a) {
  return a;
};
var indirectEval = eval;

var doesSupportClasses = function () {
  try {
    indirectEval('class Test {}');
    return true;
  } catch (e) {
    return false;
  }
}();

var ES6ProxyComponentFactory = function ES6ProxyComponentFactory(InitialParent, postConstructionAction) {
  return indirectEval('\n(function(InitialParent, postConstructionAction) {\n  return class ' + (InitialParent.name || 'HotComponent') + ' extends InitialParent {\n    /*\n     ! THIS IS NOT YOUR COMPONENT !\n     !  THIS IS REACT-HOT-LOADER  !\n  \n     this is a "' + InitialParent.name + '" component, patched by React-Hot-Loader\n     Sorry, but the real class code was hidden behind this facade\n     Please refer to https://github.com/gaearon/react-hot-loader for details...\n    */    \n    \n    constructor(props, context) {\n      super(props, context)\n      postConstructionAction.call(this)\n    }\n  }\n})\n')(InitialParent, postConstructionAction);
};

var ES5ProxyComponentFactory = function ES5ProxyComponentFactory(InitialParent, postConstructionAction) {
  function ProxyComponent(props, context) {
    InitialParent.call(this, props, context);
    postConstructionAction.call(this);
  }
  ProxyComponent.prototype = Object.create(InitialParent.prototype);
  Object.setPrototypeOf(ProxyComponent, InitialParent);
  return ProxyComponent;
};

var proxyClassCreator = doesSupportClasses ? ES6ProxyComponentFactory : ES5ProxyComponentFactory;

function getOwnKeys(target) {
  return [].concat(Object.getOwnPropertyNames(target), Object.getOwnPropertySymbols(target));
}

function shallowStringsEqual(a, b) {
  for (var key in a) {
    if (String(a[key]) !== String(b[key])) {
      return false;
    }
  }
  return true;
}

function deepPrototypeUpdate(dest, source) {
  var deepDest = Object.getPrototypeOf(dest);
  var deepSrc = Object.getPrototypeOf(source);
  if (deepDest && deepSrc && deepSrc !== deepDest) {
    deepPrototypeUpdate(deepDest, deepSrc);
  }
  if (source.prototype && source.prototype !== dest.prototype) {
    dest.prototype = source.prototype;
  }
}

function safeDefineProperty(target, key, props) {
  try {
    Object.defineProperty(target, key, props);
  } catch (e) {
    logger.warn('Error while wrapping', key, ' -> ', e);
  }
}

var PREFIX = '__reactstandin__';
var PROXY_KEY = PREFIX + 'key';
var GENERATION = PREFIX + 'proxyGeneration';
var REGENERATE_METHOD = PREFIX + 'regenerateByEval';
var UNWRAP_PROXY = PREFIX + 'getCurrent';
var CACHED_RESULT = PREFIX + 'cachedResult';
var PROXY_IS_MOUNTED = PREFIX + 'isMounted';

var RENDERED_GENERATION = 'REACT_HOT_LOADER_RENDERED_GENERATION';

var RESERVED_STATICS = ['length', 'displayName', 'name', 'arguments', 'caller', 'prototype', 'toString', 'valueOf', 'isStatelessFunctionalProxy', PROXY_KEY, UNWRAP_PROXY];

function transferStaticProps(ProxyComponent, savedDescriptors, PreviousComponent, NextComponent) {
  Object.getOwnPropertyNames(ProxyComponent).forEach(function (key) {
    if (RESERVED_STATICS.indexOf(key) !== -1) {
      return;
    }

    var prevDescriptor = Object.getOwnPropertyDescriptor(ProxyComponent, key);
    var savedDescriptor = savedDescriptors[key];

    if (!shallowEqual(prevDescriptor, savedDescriptor)) {
      safeDefineProperty(NextComponent, key, prevDescriptor);
    }
  });

  // Copy newly defined static methods and properties
  Object.getOwnPropertyNames(NextComponent).forEach(function (key) {
    if (RESERVED_STATICS.indexOf(key) !== -1) {
      return;
    }

    var prevDescriptor = PreviousComponent && Object.getOwnPropertyDescriptor(ProxyComponent, key);
    var savedDescriptor = savedDescriptors[key];

    // Skip redefined descriptors
    if (prevDescriptor && savedDescriptor && !shallowEqual(savedDescriptor, prevDescriptor)) {
      safeDefineProperty(NextComponent, key, prevDescriptor);
      return;
    }

    if (prevDescriptor && !savedDescriptor) {
      safeDefineProperty(ProxyComponent, key, prevDescriptor);
      return;
    }

    var nextDescriptor = _extends({}, Object.getOwnPropertyDescriptor(NextComponent, key), {
      configurable: true
    });

    savedDescriptors[key] = nextDescriptor;
    safeDefineProperty(ProxyComponent, key, nextDescriptor);
  });

  // Remove static methods and properties that are no longer defined
  Object.getOwnPropertyNames(ProxyComponent).forEach(function (key) {
    if (RESERVED_STATICS.indexOf(key) !== -1) {
      return;
    }
    // Skip statics that exist on the next class
    if (NextComponent.hasOwnProperty(key)) {
      return;
    }
    // Skip non-configurable statics
    var proxyDescriptor = Object.getOwnPropertyDescriptor(ProxyComponent, key);
    if (proxyDescriptor && !proxyDescriptor.configurable) {
      return;
    }

    var prevDescriptor = PreviousComponent && Object.getOwnPropertyDescriptor(PreviousComponent, key);
    var savedDescriptor = savedDescriptors[key];

    // Skip redefined descriptors
    if (prevDescriptor && savedDescriptor && !shallowEqual(savedDescriptor, prevDescriptor)) {
      return;
    }

    safeDefineProperty(ProxyComponent, key, {
      value: undefined
    });
  });

  return savedDescriptors;
}

function mergeComponents(ProxyComponent, NextComponent, InitialComponent, lastInstance, injectedMembers) {
  var injectedCode = {};
  try {
    var nextInstance = safeReactConstructor(NextComponent, lastInstance);

    try {
      // Bypass babel class inheritance checking
      deepPrototypeUpdate(InitialComponent, NextComponent);
    } catch (e) {
      // It was ES6 class
    }

    var proxyInstance = safeReactConstructor(ProxyComponent, lastInstance);

    if (!nextInstance || !proxyInstance) {
      return injectedCode;
    }

    var mergedAttrs = _extends({}, proxyInstance, nextInstance);
    var hasRegenerate = proxyInstance[REGENERATE_METHOD];
    var ownKeys = getOwnKeys(Object.getPrototypeOf(ProxyComponent.prototype));
    Object.keys(mergedAttrs).forEach(function (key) {
      if (key.indexOf(PREFIX) === 0) return;
      var nextAttr = nextInstance[key];
      var prevAttr = proxyInstance[key];
      if (nextAttr) {
        if (isNativeFunction(nextAttr) || isNativeFunction(prevAttr)) {
          // this is bound method
          var isSameArity = nextAttr.length === prevAttr.length;
          var existsInPrototype = ownKeys.indexOf(key) >= 0 || ProxyComponent.prototype[key];
          if ((isSameArity || !prevAttr) && existsInPrototype) {
            if (hasRegenerate) {
              injectedCode[key] = 'Object.getPrototypeOf(this)[\'' + key + '\'].bind(this)';
            } else {
              logger.warn('React Hot Loader:,', 'Non-controlled class', ProxyComponent.name, 'contains a new native or bound function ', key, nextAttr, '. Unable to reproduce');
            }
          } else {
            logger.warn('React Hot Loader:', 'Updated class ', ProxyComponent.name, 'contains native or bound function ', key, nextAttr, '. Unable to reproduce, use arrow functions instead.', '(arity: ' + nextAttr.length + '/' + prevAttr.length + ', proto: ' + (existsInPrototype ? 'yes' : 'no'));
          }
          return;
        }

        var nextString = String(nextAttr);
        var injectedBefore = injectedMembers[key];
        var isArrow = nextString.indexOf('=>') >= 0;
        var isFunction = nextString.indexOf('function') >= 0 || isArrow;
        var referToThis = nextString.indexOf('this') >= 0;
        if (nextString !== String(prevAttr) || injectedBefore && nextString !== String(injectedBefore) || isArrow && referToThis) {
          if (!hasRegenerate) {
            if (!isFunction) {
              // just copy prop over
              injectedCode[key] = nextAttr;
            } else {
              logger.warn('React Hot Loader:', ' Updated class ', ProxyComponent.name, 'had different code for', key, nextAttr, '. Unable to reproduce. Regeneration support needed.');
            }
          } else {
            injectedCode[key] = nextAttr;
          }
        }
      }
    });
  } catch (e) {
    logger.warn('React Hot Loader:', e);
  }
  return injectedCode;
}

function checkLifeCycleMethods(ProxyComponent, NextComponent) {
  try {
    var p1 = Object.getPrototypeOf(ProxyComponent.prototype);
    var p2 = NextComponent.prototype;
    reactLifeCycleMountMethods.forEach(function (key) {
      var d1 = Object.getOwnPropertyDescriptor(p1, key) || { value: p1[key] };
      var d2 = Object.getOwnPropertyDescriptor(p2, key) || { value: p2[key] };
      if (!shallowStringsEqual(d1, d2)) {
        logger.warn('React Hot Loader:', 'You did update', ProxyComponent.name, 's lifecycle method', key, '. Unable to repeat');
      }
    });
  } catch (e) {
    // Ignore errors
  }
}

function inject(target, currentGeneration, injectedMembers) {
  if (target[GENERATION] !== currentGeneration) {
    var hasRegenerate = !!target[REGENERATE_METHOD];
    Object.keys(injectedMembers).forEach(function (key) {
      try {
        if (hasRegenerate) {
          var usedThis = String(injectedMembers[key]).match(/_this([\d]+)/gi) || [];
          target[REGENERATE_METHOD](key, '(function REACT_HOT_LOADER_SANDBOX () {\n          var _this  = this; // common babel transpile\n          ' + usedThis.map(function (name) {
            return 'var ' + name + ' = this;';
          }) + '\n\n          return ' + injectedMembers[key] + ';\n          }).call(this)');
        } else {
          target[key] = injectedMembers[key];
        }
      } catch (e) {
        logger.warn('React Hot Loader: Failed to regenerate method ', key, ' of class ', target);
        logger.warn('got error', e);
      }
    });

    target[GENERATION] = currentGeneration;
  }
}

var has = Object.prototype.hasOwnProperty;

var proxies = new WeakMap();

var resetClassProxies = function resetClassProxies() {
  proxies = new WeakMap();
};

var blackListedClassMembers = ['constructor', 'render', 'componentWillMount', 'componentDidMount', 'componentDidCatch', 'componentWillReceiveProps', 'componentWillUnmount', 'hotComponentRender', 'getInitialState', 'getDefaultProps'];

var defaultRenderOptions = {
  componentWillRender: identity,
  componentDidUpdate: function componentDidUpdate(result) {
    return result;
  },
  componentDidRender: function componentDidRender(result) {
    return result;
  }
};

var filteredPrototypeMethods = function filteredPrototypeMethods(Proto) {
  return Object.getOwnPropertyNames(Proto).filter(function (prop) {
    var descriptor = Object.getOwnPropertyDescriptor(Proto, prop);
    return descriptor && prop.indexOf(PREFIX) !== 0 && blackListedClassMembers.indexOf(prop) < 0 && typeof descriptor.value === 'function';
  });
};

var defineClassMember = function defineClassMember(Class, methodName, methodBody) {
  return safeDefineProperty(Class.prototype, methodName, {
    configurable: true,
    writable: true,
    enumerable: false,
    value: methodBody
  });
};

var defineClassMembers = function defineClassMembers(Class, methods) {
  return Object.keys(methods).forEach(function (methodName) {
    return defineClassMember(Class, methodName, methods[methodName]);
  });
};

var setSFPFlag = function setSFPFlag(component, flag) {
  return safeDefineProperty(component, 'isStatelessFunctionalProxy', {
    configurable: false,
    writable: false,
    enumerable: false,
    value: flag
  });
};

var copyMethodDescriptors = function copyMethodDescriptors(target, source) {
  if (source) {
    // it is possible to use `function-double` to construct an ideal clone, but does not make a sence
    var keys = Object.getOwnPropertyNames(source);

    keys.forEach(function (key) {
      return safeDefineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });

    safeDefineProperty(target, 'toString', {
      configurable: true,
      writable: false,
      enumerable: false,
      value: function toString() {
        return String(source);
      }
    });
  }

  return target;
};

var knownClassComponents = [];

var forEachKnownClass = function forEachKnownClass(cb) {
  return knownClassComponents.forEach(cb);
};

function createClassProxy(InitialComponent, proxyKey) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var renderOptions = _extends({}, defaultRenderOptions, options);
  var proxyConfig = _extends({}, configuration, options.proxy);
  // Prevent double wrapping.
  // Given a proxy class, return the existing proxy managing it.
  var existingProxy = proxies.get(InitialComponent);

  if (existingProxy) {
    return existingProxy;
  }

  var CurrentComponent = void 0;
  var savedDescriptors = {};
  var injectedMembers = {};
  var proxyGeneration = 0;
  var classUpdatePostponed = null;
  var instancesCount = 0;
  var isFunctionalComponent = !isReactClass(InitialComponent);

  var lastInstance = null;

  function postConstructionAction() {
    this[GENERATION] = 0;

    lastInstance = this;
    // is there is an update pending
    if (classUpdatePostponed) {
      var callUpdate = classUpdatePostponed;
      classUpdatePostponed = null;
      callUpdate();
    }
    // As long we can't override constructor
    // every class shall evolve from a base class
    inject(this, proxyGeneration, injectedMembers);
  }

  function proxiedUpdate() {
    if (this) {
      inject(this, proxyGeneration, injectedMembers);
    }
  }

  function lifeCycleWrapperFactory(wrapperName) {
    var sideEffect = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : identity;

    return copyMethodDescriptors(function wrappedMethod() {
      proxiedUpdate.call(this);
      sideEffect(this);

      for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
        rest[_key] = arguments[_key];
      }

      return !isFunctionalComponent && CurrentComponent.prototype[wrapperName] && CurrentComponent.prototype[wrapperName].apply(this, rest);
    }, InitialComponent.prototype && InitialComponent.prototype[wrapperName]);
  }

  function methodWrapperFactory(wrapperName, realMethod) {
    return copyMethodDescriptors(function wrappedMethod() {
      for (var _len2 = arguments.length, rest = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        rest[_key2] = arguments[_key2];
      }

      return realMethod.apply(this, rest);
    }, realMethod);
  }

  var fakeBasePrototype = function fakeBasePrototype(Proto) {
    return filteredPrototypeMethods(Proto).reduce(function (acc, key) {
      acc[key] = methodWrapperFactory(key, Proto[key]);
      return acc;
    }, {});
  };

  var componentDidMount = lifeCycleWrapperFactory('componentDidMount', function (target) {
    target[PROXY_IS_MOUNTED] = true;
    target[RENDERED_GENERATION] = get$1();
    instancesCount++;
  });
  var componentDidUpdate = lifeCycleWrapperFactory('componentDidUpdate', renderOptions.componentDidUpdate);
  var componentWillUnmount = lifeCycleWrapperFactory('componentWillUnmount', function (target) {
    target[PROXY_IS_MOUNTED] = false;
    instancesCount--;
  });

  function hotComponentRender() {
    // repeating subrender call to keep RENDERED_GENERATION up to date
    renderOptions.componentWillRender(this);
    proxiedUpdate.call(this);
    var result = void 0;

    // We need to use hasOwnProperty here, as the cached result is a React node
    // and can be null or some other falsy value.
    if (has.call(this, CACHED_RESULT)) {
      result = this[CACHED_RESULT];
      delete this[CACHED_RESULT];
    } else if (isFunctionalComponent) {
      result = CurrentComponent(this.props, this.context);
    } else {
      var renderMethod = CurrentComponent.prototype.render || this.render;
      /* eslint-disable no-use-before-define */
      if (renderMethod === proxiedRender) {
        throw new Error('React-Hot-Loader: you are trying to render Component without .render method');
      }
      /* eslint-enable */
      result = renderMethod.apply(this,
      // eslint-disable-next-line prefer-rest-params
      arguments);
    }

    return renderOptions.componentDidRender.call(this, result);
  }

  function hotComponentUpdate() {
    renderOptions.componentWillRender(this);
    proxiedUpdate.call(this);
  }

  function proxiedRender() {
    renderOptions.componentWillRender(this);

    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return hotComponentRender.call.apply(hotComponentRender, [this].concat(args));
  }

  var defineProxyMethods = function defineProxyMethods(Proxy) {
    var Base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    defineClassMembers(Proxy, _extends({}, fakeBasePrototype(Base), proxyConfig.pureRender ? {} : { render: proxiedRender }, {
      hotComponentRender: hotComponentRender,
      hotComponentUpdate: hotComponentUpdate,
      componentDidMount: componentDidMount,
      componentDidUpdate: componentDidUpdate,
      componentWillUnmount: componentWillUnmount
    }));
  };

  var _ProxyFacade = void 0;
  var ProxyComponent = null;
  var proxy = void 0;

  if (!isFunctionalComponent) {
    // Component
    ProxyComponent = proxyClassCreator(InitialComponent, postConstructionAction);

    defineProxyMethods(ProxyComponent, InitialComponent.prototype);

    knownClassComponents.push(ProxyComponent);

    _ProxyFacade = ProxyComponent;
  } else if (!proxyConfig.allowSFC) {
    proxyConfig.pureRender = false;
    // SFC Converted to component. Does not support returning precreated instances from render.
    ProxyComponent = proxyClassCreator(React.Component, postConstructionAction);

    defineProxyMethods(ProxyComponent);
    _ProxyFacade = ProxyComponent;
  } else {
    // SFC

    // This function only gets called for the initial mount. The actual
    // rendered component instance will be the return value.

    // eslint-disable-next-line func-names
    _ProxyFacade = function ProxyFacade(props, context) {
      /*
         ! THIS IS NOT YOUR COMPONENT !
        !  THIS IS REACT-HOT-LOADER  !
         And you are probably looking for a function component of yours
        It's hidden, but there is a way to fix this - just reconfigure your application a bit
        see https://github.com/gaearon/react-hot-loader/issues/1311
        */

      var result = CurrentComponent(props, context);

      // This is a Relay-style container constructor. We can't do the prototype-
      // style wrapping for this as we do elsewhere, so just we just pass it
      // through as-is.
      if (isReactClassInstance(result)) {
        ProxyComponent = null;

        // Relay lazily sets statics like getDerivedStateFromProps on initial
        // render in lazy construction, so we need to do the same here.
        transferStaticProps(_ProxyFacade, savedDescriptors, null, CurrentComponent);

        return result;
      }

      // simple SFC, could continue to be SFC
      if (proxyConfig.pureSFC) {
        if (!CurrentComponent.contextTypes) {
          if (!_ProxyFacade.isStatelessFunctionalProxy) {
            setSFPFlag(_ProxyFacade, true);
          }

          return renderOptions.componentDidRender(result);
        }
      }
      setSFPFlag(_ProxyFacade, false);
      proxyConfig.pureRender = false;

      // Otherwise, it's a normal functional component. Build the real proxy
      // and use it going forward.
      ProxyComponent = proxyClassCreator(React.Component, postConstructionAction);

      defineProxyMethods(ProxyComponent);

      var determinateResult = new ProxyComponent(props, context);

      // Cache the initial render result so we don't call the component function
      // a second time for the initial render.
      determinateResult[CACHED_RESULT] = result;
      return determinateResult;
    };
  }

  function get$$1() {
    return _ProxyFacade;
  }

  function getCurrent() {
    return CurrentComponent;
  }

  safeDefineProperty(_ProxyFacade, UNWRAP_PROXY, {
    configurable: false,
    writable: false,
    enumerable: false,
    value: getCurrent
  });

  safeDefineProperty(_ProxyFacade, PROXY_KEY, {
    configurable: false,
    writable: false,
    enumerable: false,
    value: proxyKey
  });

  safeDefineProperty(_ProxyFacade, 'toString', {
    configurable: true,
    writable: false,
    enumerable: false,
    value: function toString() {
      return String(CurrentComponent);
    }
  });

  function update(NextComponent) {
    if (typeof NextComponent !== 'function') {
      throw new Error('Expected a constructor.');
    }

    if (NextComponent === CurrentComponent) {
      return false;
    }

    // Prevent proxy cycles
    var existingProxy = proxies.get(NextComponent);
    if (existingProxy) {
      return false;
    }

    isFunctionalComponent = !isReactClass(NextComponent);

    proxies.set(NextComponent, proxy);

    proxyGeneration++;

    // Save the next constructor so we call it
    var PreviousComponent = CurrentComponent;
    CurrentComponent = NextComponent;

    // Try to infer displayName
    var displayName = getComponentDisplayName(CurrentComponent);

    safeDefineProperty(_ProxyFacade, 'displayName', {
      configurable: true,
      writable: false,
      enumerable: true,
      value: displayName
    });

    if (ProxyComponent) {
      safeDefineProperty(ProxyComponent, 'name', {
        value: displayName
      });
    }

    savedDescriptors = transferStaticProps(_ProxyFacade, savedDescriptors, PreviousComponent, NextComponent);

    if (isFunctionalComponent || !ProxyComponent) ; else {
      var classHotReplacement = function classHotReplacement() {
        checkLifeCycleMethods(ProxyComponent, NextComponent);
        if (proxyGeneration > 1) {
          getElementCloseHook(ProxyComponent);
          filteredPrototypeMethods(ProxyComponent.prototype).forEach(function (methodName) {
            if (!has.call(NextComponent.prototype, methodName)) {
              delete ProxyComponent.prototype[methodName];
            }
          });
        }
        Object.setPrototypeOf(ProxyComponent.prototype, NextComponent.prototype);
        defineProxyMethods(ProxyComponent, NextComponent.prototype);
        if (proxyGeneration > 1) {
          injectedMembers = mergeComponents(ProxyComponent, NextComponent, InitialComponent, lastInstance, injectedMembers);
          getElementComparisonHook(ProxyComponent);
        }
      };

      // Was constructed once
      if (instancesCount > 0) {
        classHotReplacement();
      } else {
        classUpdatePostponed = classHotReplacement;
      }
    }

    return true;
  }

  update(InitialComponent);

  var dereference = function dereference() {
    proxies.delete(InitialComponent);
    proxies.delete(_ProxyFacade);
    proxies.delete(CurrentComponent);
  };

  proxy = { get: get$$1, update: update, dereference: dereference, getCurrent: function getCurrent() {
      return CurrentComponent;
    } };

  proxies.set(InitialComponent, proxy);
  proxies.set(_ProxyFacade, proxy);

  safeDefineProperty(proxy, UNWRAP_PROXY, {
    configurable: false,
    writable: false,
    enumerable: false,
    value: getCurrent
  });

  return proxy;
}

// this counter tracks `register` invocations.
// works good, but code splitting is breaking it
var generation = 1;

// these counters are aimed to mitigate the "first render"
var hotComparisonCounter = 0;
var hotComparisonRuns = 0;
var hotReplacementGeneration = 0;

var nullFunction = function nullFunction() {
  return {};
};

// these callbacks would be called on component update
var onHotComparisonOpen = nullFunction;
var onHotComparisonElement = nullFunction;
var onHotComparisonClose = nullFunction;

// inversion of control
var setComparisonHooks = function setComparisonHooks(open, element, close) {
  onHotComparisonOpen = open;
  onHotComparisonElement = element;
  onHotComparisonClose = close;
};

var getElementComparisonHook = function getElementComparisonHook(component) {
  return onHotComparisonElement(component);
};
var getElementCloseHook = function getElementCloseHook(component) {
  return onHotComparisonClose(component);
};

var hotComparisonOpen = function hotComparisonOpen() {
  return hotComparisonCounter > 0 && hotComparisonRuns > 0 && hotReplacementGeneration > 0;
};

var openGeneration = function openGeneration() {
  return forEachKnownClass(onHotComparisonElement);
};

var closeGeneration = function closeGeneration() {
  return forEachKnownClass(onHotComparisonClose);
};

var incrementHot = function incrementHot() {
  if (!hotComparisonCounter) {
    openGeneration();
    onHotComparisonOpen();
  }
  hotComparisonCounter++;
};
var decrementHot = function decrementHot() {
  hotComparisonCounter--;
  if (!hotComparisonCounter) {
    closeGeneration();
    hotComparisonRuns++;
  }
};

// TODO: shall it be called from incrementHotGeneration?
var enterHotUpdate = function enterHotUpdate() {
  Promise.resolve(incrementHot()).then(function () {
    return setTimeout(decrementHot, 0);
  });
};

// TODO: deprecate?
var increment = function increment() {
  enterHotUpdate();
  return generation++;
};
var get$1 = function get() {
  return generation;
};

// These counters tracks HMR generations, and probably should be used instead of the old one
var incrementHotGeneration = function incrementHotGeneration() {
  return hotReplacementGeneration++;
};
var getHotGeneration = function getHotGeneration() {
  return hotReplacementGeneration;
};

// some `empty` names, React can autoset display name to...
var UNDEFINED_NAMES = {
  Unknown: true,
  Component: true
};

var areNamesEqual = function areNamesEqual(a, b) {
  return a === b || UNDEFINED_NAMES[a] && UNDEFINED_NAMES[b];
};

var isFunctional = function isFunctional(fn) {
  return typeof fn === 'function';
};
var getTypeOf = function getTypeOf(type) {
  if (isReactClass(type)) return 'ReactComponent';
  if (isFunctional(type)) return 'StatelessFunctional';
  return 'Fragment'; // ?
};

function clearStringFast(str) {
  return str.length < 12 ? str : (' ' + str).slice(1);
}

var haveTextSimilarity = function haveTextSimilarity(a, b) {
  return (
    // equal or slight changed
    a === b || levenshtein.get(clearStringFast(a), clearStringFast(b)) < a.length * 0.2
  );
};

var getBaseProto = function getBaseProto(source) {
  return source.prototype.hotComponentRender ? Object.getPrototypeOf(source.prototype) : source.prototype;
};

var equalClasses = function equalClasses(a, b) {
  var prototypeA = getBaseProto(a);
  var prototypeB = getBaseProto(b);

  var hits = 0;
  var misses = 0;
  var comparisons = 0;
  Object.getOwnPropertyNames(prototypeA).forEach(function (key) {
    var descriptorA = Object.getOwnPropertyDescriptor(prototypeA, key);
    var valueA = descriptorA && (descriptorA.value || descriptorA.get || descriptorA.set);
    var descriptorB = Object.getOwnPropertyDescriptor(prototypeB, key);
    var valueB = descriptorB && (descriptorB.value || descriptorB.get || descriptorB.set);

    if (typeof valueA === 'function' && key !== 'constructor') {
      comparisons++;
      if (haveTextSimilarity(String(valueA), String(valueB))) {
        hits++;
      } else {
        misses++;
        if (key === 'render') {
          misses++;
        }
      }
    }
  });
  // allow to add or remove one function
  return hits > 0 && misses <= 1 || comparisons === 0;
};

var areSwappable = function areSwappable(a, b) {
  // both are registered components and have the same name
  if (getIdByType(b) && getIdByType(a) === getIdByType(b)) {
    return true;
  }
  if (getTypeOf(a) !== getTypeOf(b)) {
    return false;
  }
  if (isReactClass(a)) {
    return areNamesEqual(getComponentDisplayName(a), getComponentDisplayName(b)) && equalClasses(a, b);
  }

  if (isFunctional(a)) {
    var nameA = getComponentDisplayName(a);
    if (!areNamesEqual(nameA, getComponentDisplayName(b))) {
      return false;
    }
    return nameA !== 'Component' || haveTextSimilarity(String(a), String(b));
  }
  return false;
};

function merge() {
  var acc = {};

  for (var _len = arguments.length, sources = Array(_len), _key = 0; _key < _len; _key++) {
    sources[_key] = arguments[_key];
  }

  for (var _iterator = sources, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var source = _ref;

    if (source instanceof Array) {
      if (!(acc instanceof Array)) {
        acc = [];
      }
      acc = [].concat(acc, source);
    } else if (source instanceof Object) {
      for (var _iterator2 = Object.keys(source), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _babelHelpers$extends;

        var _ref2;

        if (_isArray2) {
          if (_i2 >= _iterator2.length) break;
          _ref2 = _iterator2[_i2++];
        } else {
          _i2 = _iterator2.next();
          if (_i2.done) break;
          _ref2 = _i2.value;
        }

        var key = _ref2;

        var value = source[key];
        if (value instanceof Object && key in acc) {
          value = merge(acc[key], value);
        }
        acc = _extends({}, acc, (_babelHelpers$extends = {}, _babelHelpers$extends[key] = value, _babelHelpers$extends));
      }
    }
  }
  return acc;
}

var signatures = void 0;
var proxiesByID = void 0;
var blackListedProxies = void 0;
var registeredComponents = void 0;
var idsByType = void 0;

var elementCount = 0;
var renderOptions = {};

var componentOptions = void 0;

var generateTypeId = function generateTypeId() {
  return 'auto-' + elementCount++;
};

var getIdByType = function getIdByType(type) {
  return idsByType.get(type);
};
var isProxyType = function isProxyType(type) {
  return type[PROXY_KEY];
};

var getProxyById = function getProxyById(id) {
  return proxiesByID[id];
};
var getProxyByType = function getProxyByType(type) {
  return getProxyById(getIdByType(type));
};

var registerComponent = function registerComponent(type) {
  return registeredComponents.set(type, 1);
};
var isRegisteredComponent = function isRegisteredComponent(type) {
  return registeredComponents.has(type);
};

var setStandInOptions = function setStandInOptions(options) {
  renderOptions = options;
};

var updateFunctionProxyById = function updateFunctionProxyById(id, type, updater) {
  // Remember the ID.
  idsByType.set(type, id);
  var proxy = proxiesByID[id];
  if (!proxy) {
    proxiesByID[id] = type;
  }
  updater(proxiesByID[id], type);
  // proxiesByID[id] = type; // keep the first ref

  return proxiesByID[id];
};

var updateProxyById = function updateProxyById(id, type) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (!id) {
    return null;
  }
  // Remember the ID.
  idsByType.set(type, id);

  if (!proxiesByID[id]) {
    proxiesByID[id] = createClassProxy(type, id, merge({}, renderOptions, { proxy: componentOptions.get(type) || {} }, options));
  } else if (proxiesByID[id].update(type)) {
    // proxy could be registered again only in case of HMR
    incrementHotGeneration();
  }
  return proxiesByID[id];
};

var createProxyForType = function createProxyForType(type, options) {
  return getProxyByType(type) || updateProxyById(generateTypeId(), type, options);
};

var isColdType = function isColdType(type) {
  return blackListedProxies.has(type);
};

var isTypeBlacklisted = function isTypeBlacklisted(type) {
  return isColdType(type) || isCompositeComponent(type) && (configuration.ignoreSFC && !isReactClass(type) || configuration.ignoreComponents && isReactClass(type));
};
var blacklistByType = function blacklistByType(type) {
  return blackListedProxies.set(type, true);
};

var setComponentOptions = function setComponentOptions(component, options) {
  return componentOptions.set(component, options);
};

var addSignature = function addSignature(type, signature) {
  return signatures.set(type, signature);
};
var getSignature = function getSignature(type) {
  return signatures.get(type);
};

var resetProxies = function resetProxies() {
  proxiesByID = {};
  idsByType = new WeakMap();
  blackListedProxies = new WeakMap();
  registeredComponents = new WeakMap();
  componentOptions = new WeakMap();
  signatures = new WeakMap();
  resetClassProxies();
};

resetProxies();

var tune = {
  allowSFC: false
};

var preactAdapter = function preactAdapter(instance, resolveType) {
  var oldHandler = instance.options.vnode;

  setConfiguration(tune);

  instance.options.vnode = function (vnode) {
    if (vnode.type) {
      vnode.type = resolveType(vnode.type);
    } else if (vnode.nodeName) {
      vnode.nodeName = resolveType(vnode.nodeName);
    }
    if (oldHandler) {
      oldHandler(vnode);
    }
  };
};

/* global document */

var lastError = [];

var overlayStyle = {
  position: 'fixed',
  left: 0,
  top: 0,
  right: 0,

  backgroundColor: 'rgba(255,200,200,0.9)',

  color: '#000',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  fontSize: '12px',
  margin: 0,
  padding: '16px',
  maxHeight: '50%',
  overflow: 'auto'
};

var inlineErrorStyle = {
  backgroundColor: '#FEE'
};

var liCounter = {
  position: 'absolute',
  left: '10px'
};

var listStyle = {};

var EmptyErrorPlaceholder = function EmptyErrorPlaceholder(_ref) {
  var component = _ref.component;
  return React__default.createElement(
    'span',
    { style: inlineErrorStyle, role: 'img', 'aria-label': 'Rect-Hot-Loader Error' },
    '\u269B\uFE0F\uD83D\uDD25\uD83E\uDD15 (',
    component ? getComponentDisplayName(component.constructor || component) : 'Unknown location',
    ')',
    component && component.retryHotLoaderError && React__default.createElement(
      'button',
      { onClick: function onClick() {
          return component.retryHotLoaderError();
        }, title: 'Retry' },
      '\u27F3'
    )
  );
};

var errorHeader = function errorHeader(component, componentStack) {
  if (component || componentStack) {
    return React__default.createElement(
      'span',
      null,
      '(',
      component ? getComponentDisplayName(component.constructor || component) : 'Unknown location',
      component && ', ',
      componentStack && componentStack.split('\n').filter(Boolean)[0],
      ')'
    );
  }
  return null;
};

var mapError = function mapError(_ref2) {
  var error = _ref2.error,
      errorInfo = _ref2.errorInfo,
      component = _ref2.component;

  if (!error) {
    error = { message: 'undefined error' };
  }

  return React__default.createElement(
    React__default.Fragment,
    null,
    React__default.createElement(
      'p',
      { style: { color: 'red' } },
      errorHeader(component, errorInfo && errorInfo.componentStack),
      ' ',
      error.toString ? error.toString() : error && error.message || 'undefined error'
    ),
    errorInfo && errorInfo.componentStack ? React__default.createElement(
      'div',
      null,
      React__default.createElement(
        'div',
        null,
        'Stack trace:'
      ),
      React__default.createElement(
        'ul',
        { style: { color: 'red', marginTop: '10px' } },
        error.stack.split('\n').slice(1, 2).map(function (line, i) {
          return React__default.createElement(
            'li',
            { key: String(i) },
            line
          );
        }),
        React__default.createElement('hr', null),
        errorInfo.componentStack.split('\n').filter(Boolean).map(function (line, i) {
          return React__default.createElement(
            'li',
            { key: String(i) },
            line
          );
        })
      )
    ) : error.stack && React__default.createElement(
      'div',
      null,
      React__default.createElement(
        'div',
        null,
        'Stack trace:'
      ),
      React__default.createElement(
        'ul',
        { style: { color: 'red', marginTop: '10px' } },
        error.stack.split('\n').map(function (line, i) {
          return React__default.createElement(
            'li',
            { key: String(i) },
            line
          );
        })
      )
    )
  );
};

var ErrorOverlay = function (_React$Component) {
  inherits(ErrorOverlay, _React$Component);

  function ErrorOverlay() {
    var _temp, _this, _ret;

    classCallCheck(this, ErrorOverlay);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
      visible: true
    }, _this.toggle = function () {
      return _this.setState({ visible: !_this.state.visible });
    }, _this.retry = function () {
      return _this.setState(function () {
        var errors = _this.props.errors;

        enterHotUpdate();
        clearExceptions();
        errors.map(function (_ref3) {
          var component = _ref3.component;
          return component;
        }).filter(Boolean).filter(function (_ref4) {
          var retryHotLoaderError = _ref4.retryHotLoaderError;
          return !!retryHotLoaderError;
        }).forEach(function (component) {
          return component.retryHotLoaderError();
        });

        return {};
      });
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  ErrorOverlay.prototype.render = function render() {
    var errors = this.props.errors;

    if (!errors.length) {
      return null;
    }
    var visible = this.state.visible;

    return React__default.createElement(
      'div',
      { style: overlayStyle },
      React__default.createElement(
        'h2',
        { style: { margin: 0 } },
        '\u269B\uFE0F\uD83D\uDD25\uD83D\uDE2D: hot update was not successful ',
        React__default.createElement(
          'button',
          { onClick: this.toggle },
          visible ? 'collapse' : 'expand'
        ),
        React__default.createElement(
          'button',
          { onClick: this.retry },
          'Retry'
        )
      ),
      visible && React__default.createElement(
        'ul',
        { style: listStyle },
        errors.map(function (err, i) {
          return React__default.createElement(
            'li',
            { key: i },
            React__default.createElement(
              'span',
              { style: liCounter },
              '(',
              i + 1,
              '/',
              errors.length,
              ')'
            ),
            mapError(err)
          );
        })
      )
    );
  };

  return ErrorOverlay;
}(React__default.Component);

var initErrorOverlay = function initErrorOverlay() {
  if (typeof document === 'undefined' || !document.body) {
    return;
  }
  var div = document.querySelector('.react-hot-loader-error-overlay');
  if (!div) {
    div = document.createElement('div');
    div.className = 'react-hot-loader-error-overlay';
    document.body.appendChild(div);
  }
  if (lastError.length) {
    var Overlay = configuration.ErrorOverlay || ErrorOverlay;
    ReactDOM.render(React__default.createElement(Overlay, { errors: lastError }), div);
  } else {
    div.parentNode.removeChild(div);
  }
};

function clearExceptions() {
  if (lastError.length) {
    lastError = [];
    initErrorOverlay();
  }
}

function logException(error, errorInfo, component) {
  // do not suppress error

  /* eslint-disable no-console */
  console.error(error);
  /* eslint-enable */

  lastError.push({ error: error, errorInfo: errorInfo, component: component });
  initErrorOverlay();
}

/* eslint-disable no-underscore-dangle */

var hotRenderWithHooks = ReactDOM.hotRenderWithHooks || function (fiber, render) {
  return render();
};

function pushStack(stack, node) {
  stack.type = node.type;
  stack.elementType = node.elementType || node.type;
  stack.children = [];
  stack.instance = typeof node.type === 'function' ? node.stateNode : stack;
  stack.fiber = node;

  if (!stack.instance) {
    stack.instance = {
      SFC_fake: stack.type,
      props: {},
      render: function render() {
        return hotRenderWithHooks(node, function () {
          return stack.type(stack.instance.props);
        });
      }
    };
  }
}

function hydrateFiberStack(node, stack) {
  pushStack(stack, node);
  if (node.child) {
    var child = node.child;

    do {
      var childStack = {};
      hydrateFiberStack(child, childStack);
      stack.children.push(childStack);
      child = child.sibling;
    } while (child);
  }
}

/* eslint-disable no-underscore-dangle */

function pushState(stack, type, instance) {
  stack.type = type;
  stack.elementType = type;
  stack.children = [];
  stack.instance = instance || stack;

  if (typeof type === 'function' && type.isStatelessFunctionalProxy) {
    // In React 15 SFC is wrapped by component. We have to detect our proxies and change the way it works
    stack.instance = {
      SFC_fake: type,
      props: {},
      render: function render() {
        return type(stack.instance.props);
      }
    };
  }
}

function hydrateLegacyStack(node, stack) {
  if (node._currentElement) {
    pushState(stack, node._currentElement.type, node._instance || stack);
  }

  if (node._renderedComponent) {
    var childStack = {};
    hydrateLegacyStack(node._renderedComponent, childStack);
    stack.children.push(childStack);
  } else if (node._renderedChildren) {
    Object.keys(node._renderedChildren).forEach(function (key) {
      var childStack = {};
      hydrateLegacyStack(node._renderedChildren[key], childStack);
      stack.children.push(childStack);
    });
  }
}

var shouldNotPatchComponent = function shouldNotPatchComponent(type) {
  return isTypeBlacklisted(type);
};

function resolveUtility(type) {
  // all "utility" types are resolved to their __initial__ shapes
  // that enables to never change reference to them, and gives the ability to maintain React Tree on HMR

  // all operations could be skipped with react-hot-dom enabled

  if ((typeof type === 'undefined' ? 'undefined' : _typeof(type)) === 'object') {
    if (configuration.integratedComparator) {
      return type;
    }
    var element = { type: type };
    if (isLazyType(element) || isMemoType(element) || isForwardType(element) || isContextType(element)) {
      return getProxyByType(type) || type;
    }
  }

  return undefined;
}

function resolveComponent(type) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var existingProxy = getProxyByType(type);

  // cold API
  if (shouldNotPatchComponent(type)) {
    return existingProxy ? existingProxy.getCurrent() : type;
  }

  if (!existingProxy && configuration.onComponentCreate) {
    configuration.onComponentCreate(type, getComponentDisplayName(type));
    if (shouldNotPatchComponent(type)) {
      return type;
    }
  }

  var proxy = internalConfiguration.disableProxyCreation ? existingProxy : createProxyForType(type, options);

  return proxy ? proxy.get() : undefined;
}

function resolveProxy(type) {
  if (isProxyType(type)) {
    return type;
  }

  return undefined;
}

function resolveNotComponent(type) {
  if (!isCompositeComponent(type)) {
    return type;
  }

  return undefined;
}

var getLatestTypeVersion = function getLatestTypeVersion(type) {
  var existingProxy = getProxyByType(type);
  return existingProxy && existingProxy.getCurrent && existingProxy.getCurrent();
};

var resolveSimpleType = function resolveSimpleType(type) {
  if (!type) {
    return type;
  }

  var simpleResult = resolveProxy(type) || resolveUtility(type) || resolveNotComponent(type);
  if (simpleResult) {
    return simpleResult;
  }

  var lastType = getLatestTypeVersion(type);

  // only lazy loaded components any now failing into this branch

  // if (lastType && lastType !== type) {
  //   console.warn('RHL: used type', type, 'is obsolete. Something is wrong with HMR.');
  // }

  return lastType || type;
};

var resolveType = function resolveType(type) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!type) {
    return type;
  }

  return resolveProxy(type) || resolveUtility(type) || resolveNotComponent(type) || resolveComponent(type, options) || type;
};

/* eslint-disable no-underscore-dangle */

function getReactStack(instance) {
  var rootNode = getInternalInstance(instance);
  var stack = {};
  if (rootNode) {
    // React stack
    var isFiber = typeof rootNode.tag === 'number';
    if (isFiber) {
      hydrateFiberStack(rootNode, stack);
    } else {
      hydrateLegacyStack(rootNode, stack);
    }
  }

  return stack;
}

var markUpdate = function markUpdate(_ref) {
  var fiber = _ref.fiber;

  // do not update what we should not
  if (!fiber || typeof fiber.type === 'string') {
    return;
  }

  var mostResentType = resolveType(fiber.type) || fiber.type;
  if (fiber.elementType === fiber.type) {
    fiber.elementType = mostResentType;
  }
  fiber.type = mostResentType;

  fiber.expirationTime = 1;
  if (fiber.alternate) {
    fiber.alternate.expirationTime = 1;
    fiber.alternate.type = fiber.type;
    fiber.alternate.elementType = fiber.elementType;
  }

  if (fiber.memoizedProps && _typeof(fiber.memoizedProps) === 'object') {
    fiber.memoizedProps = _extends({
      cacheBusterProp: true
    }, fiber.memoizedProps);
  }

  if (fiber.stateNode) ;
};

var cleanupReact = function cleanupReact() {
  if (ReactDOM.hotCleanup) {
    ReactDOM.hotCleanup();
  }
};

var deepMarkUpdate = function deepMarkUpdate(stack) {
  markUpdate(stack);
  if (stack.children) {
    stack.children.forEach(deepMarkUpdate);
  }
};

var renderStack = [];

var stackReport = function stackReport() {
  var rev = renderStack.slice().reverse();
  logger.warn('in', rev[0].name, rev);
};

var emptyMap = new Map();
var stackContext = function stackContext() {
  return (renderStack[renderStack.length - 1] || {}).context || emptyMap;
};

var shouldUseRenderMethod = function shouldUseRenderMethod(fn) {
  return fn && (isReactClassInstance(fn) || fn.SFC_fake);
};

var getElementType$1 = function getElementType$$1(child) {
  return child.type[UNWRAP_PROXY] ? child.type[UNWRAP_PROXY]() : child.type;
};

var filterNullArray = function filterNullArray(a) {
  if (!a) return [];
  return a.filter(function (x) {
    return !!x;
  });
};

var unflatten = function unflatten(a) {
  return a.reduce(function (acc, a) {
    if (Array.isArray(a)) {
      acc.push.apply(acc, unflatten(a));
    } else {
      acc.push(a);
    }
    return acc;
  }, []);
};

var isArray = function isArray(fn) {
  return Array.isArray(fn);
};
var asArray = function asArray(a) {
  return isArray(a) ? a : [a];
};

var render = function render(component, stack) {
  if (!component) {
    return [];
  }
  if (component.hotComponentUpdate) {
    component.hotComponentUpdate();
  }
  if (shouldUseRenderMethod(component)) {
    // not calling real render method to prevent call recursion.
    // stateless components does not have hotComponentRender
    return component.hotComponentRender ? component.hotComponentRender() : component.render();
  }
  if (isForwardType(component)) {
    // render forward type in a sandbox
    return hotRenderWithHooks(stack.fiber, function () {
      return component.type.render(component.props, null);
    });
  }
  if (isArray(component)) {
    return component.map(render);
  }
  if (component.children) {
    return component.children;
  }

  return [];
};

var NO_CHILDREN = { children: [] };
var mapChildren = function mapChildren(children, instances) {
  return {
    children: children.filter(function (c) {
      return c;
    }).map(function (child, index) {
      if ((typeof child === 'undefined' ? 'undefined' : _typeof(child)) !== 'object' || child.isMerged) {
        return child;
      }
      var instanceLine = instances[index] || {};
      var oldChildren = asArray(instanceLine.children || []);

      if (Array.isArray(child)) {
        return _extends({
          type: null
        }, mapChildren(child, oldChildren));
      }

      var newChildren = asArray(child.props && child.props.children || child.children || []);
      var nextChildren = child.type !== 'function' && oldChildren.length && mapChildren(newChildren, oldChildren);

      return _extends({
        nextProps: child.props,
        isMerged: true
      }, instanceLine, nextChildren || {}, {
        type: child.type
      });
    })
  };
};

var mergeInject = function mergeInject(a, b, instance) {
  if (a && !Array.isArray(a)) {
    return mergeInject([a], b);
  }
  if (b && !Array.isArray(b)) {
    return mergeInject(a, [b]);
  }

  if (!a || !b) {
    return NO_CHILDREN;
  }
  if (a.length === b.length) {
    return mapChildren(a, b);
  }

  // in some cases (no confidence here) B could contain A except null children
  // in some cases - could not.
  // this depends on React version and the way you build component.

  var nonNullA = filterNullArray(a);
  if (nonNullA.length === b.length) {
    return mapChildren(nonNullA, b);
  }

  var flatA = unflatten(nonNullA);
  var flatB = unflatten(b);
  if (flatA.length === flatB.length) {
    return mapChildren(flatA, flatB);
  }
  if (flatB.length === 0 && flatA.length === 1 && _typeof(flatA[0]) !== 'object') ; else if (!configuration.IS_REACT_MERGE_ENABLED) {
    logger.warn('React-hot-loader: unable to merge ', a, 'and children of ', instance);
    stackReport();
  }
  return NO_CHILDREN;
};

var transformFlowNode = function transformFlowNode(flow) {
  return flow.reduce(function (acc, node) {
    if (node && isFragmentNode(node)) {
      if (node.props && node.props.children) {
        return [].concat(acc, filterNullArray(asArray(node.props.children)));
      }
      if (node.children) {
        return [].concat(acc, filterNullArray(asArray(node.children)));
      }
    }
    return [].concat(acc, [node]);
  }, []);
};

var scheduledUpdates = [];
var scheduledUpdate = 0;

var flushScheduledUpdates = function flushScheduledUpdates() {
  var instances = scheduledUpdates;
  scheduledUpdates = [];
  scheduledUpdate = 0;
  instances.forEach(function (instance) {
    return instance[PROXY_IS_MOUNTED] && updateInstance(instance);
  });
};

var unscheduleUpdate = function unscheduleUpdate(instance) {
  scheduledUpdates = scheduledUpdates.filter(function (inst) {
    return inst !== instance;
  });
};

var scheduleInstanceUpdate = function scheduleInstanceUpdate(instance) {
  scheduledUpdates.push(instance);
  if (!scheduledUpdate) {
    scheduledUpdate = setTimeout(flushScheduledUpdates, 4);
  }
};

var hotReplacementRender = function hotReplacementRender(instance, stack) {
  if (isReactClassInstance(instance)) {
    var type = getElementType$1(stack);

    renderStack.push({
      name: getComponentDisplayName(type),
      type: type,
      props: stack.instance.props,
      context: stackContext()
    });
  }

  try {
    var flow = transformFlowNode(filterNullArray(asArray(render(instance, stack))));

    var children = stack.children;


    flow.forEach(function (child, index) {
      var childType = child.type;
      var stackChild = children[index];
      var next = function next(instance) {
        // copy over props as long new component may be hidden inside them
        // child does not have all props, as long some of them can be calculated on componentMount.
        var realProps = instance.props;
        var nextProps = _extends({}, realProps, child.nextProps || {}, child.props || {});

        if (isReactClassInstance(instance) && instance.componentWillUpdate) {
          // Force-refresh component (bypass redux renderedComponent)
          instance.componentWillUpdate(_extends({}, realProps), instance.state);
        }
        instance.props = nextProps;
        hotReplacementRender(instance, stackChild);
        instance.props = realProps;
      };

      // text node
      if ((typeof child === 'undefined' ? 'undefined' : _typeof(child)) !== 'object' || !stackChild || !stackChild.instance) {
        if (stackChild && stackChild.children && stackChild.children.length) {
          logger.error('React-hot-loader: reconciliation failed', 'could not dive into [', child, '] while some elements are still present in the tree.');
          stackReport();
        }
        return;
      }

      // comparing rendered type to fiber.ElementType
      if ((typeof childType === 'undefined' ? 'undefined' : _typeof(childType)) !== _typeof(stackChild.elementType)) {
        // Portals could generate undefined !== null
        if (childType && stackChild.type) {
          logger.warn('React-hot-loader: got ', childType, 'instead of', stackChild.type);
          stackReport();
        }
        return;
      }

      if (isMemoType(child) || isLazyType(child)) {
        // force update memo children
        if (stackChild.children && stackChild.children[0]) {
          scheduleInstanceUpdate(stackChild.children[0].instance);
        }
        childType = childType.type || childType;
      }

      if (isForwardType(child)) {
        next(stackChild.instance);
      } else if (isContextConsumer(child)) {
        try {
          var contextValue = stackContext().get(getContextProvider(childType));
          next({
            children: (child.props ? child.props.children : child.children[0])(contextValue !== undefined ? contextValue : childType[CONTEXT_CURRENT_VALUE])
          });
        } catch (e) {
          // do nothing, yet
        }
      } else if (typeof childType !== 'function') {
        // React
        var childName = childType ? getComponentDisplayName(childType) : 'empty';
        var extraContext = stackContext();

        if (isContextProvider(child)) {
          extraContext = new Map(extraContext);
          extraContext.set(getContextProvider(childType), _extends({}, child.nextProps || {}, child.props || {}).value);
          childName = 'ContextProvider';
        }

        renderStack.push({
          name: childName,
          type: childType,
          props: stack.instance.props,
          context: extraContext
        });

        next(
        // move types from render to the instances of hydrated tree
        mergeInject(transformFlowNode(asArray(child.props ? child.props.children : child.children)), stackChild.instance.children, stackChild.instance));
        renderStack.pop();
      } else {
        if (childType === stackChild.type) {
          next(stackChild.instance);
        } else {
          // unwrap proxy
          var _childType = getElementType$1(child);

          if (isMemoType(child)) {
            _childType = _childType.type || _childType;
          }

          if (!stackChild.type[PROXY_KEY]) {
            if (!configuration.IS_REACT_MERGE_ENABLED) {
              if (isTypeBlacklisted(stackChild.type)) {
                logger.warn('React-hot-loader: cold element got updated ', stackChild.type);
              }
            }
          }

          if (isRegisteredComponent(_childType) || isRegisteredComponent(stackChild.type)) {
            // one of elements are registered via babel plugin, and should not be handled by hot swap
            if (resolveType(_childType) === resolveType(stackChild.type)) {
              next(stackChild.instance);
            }
          } else if (areSwappable(_childType, stackChild.type)) {
            // they are both registered, or have equal code/displayname/signature

            // update proxy using internal PROXY_KEY
            updateProxyById(stackChild.type[PROXY_KEY] || getIdByType(stackChild.type), _childType);

            next(stackChild.instance);
          } else {
            logger.warn('React-hot-loader: a ' + getComponentDisplayName(_childType) + ' was found where a ' + getComponentDisplayName(stackChild) + ' was expected.\n          ' + _childType);
            stackReport();
          }
        }

        scheduleInstanceUpdate(stackChild.instance);
      }
    });
  } catch (e) {
    if (e.then) ; else {
      logger.warn('React-hot-loader: run time error during reconciliation', e);
    }
  }

  if (isReactClassInstance(instance)) {
    renderStack.pop();
  }
};

var hotReplacementRender$1 = (function (instance, stack) {
  if (configuration.disableHotRenderer) {
    return;
  }
  try {
    // disable reconciler to prevent upcoming components from proxying.
    internalConfiguration.disableProxyCreation = true;
    renderStack = [];
    hotReplacementRender(instance, stack);
  } catch (e) {
    logger.warn('React-hot-loader: reconcilation failed due to error', e);
  } finally {
    internalConfiguration.disableProxyCreation = false;
  }
});

var reconcileHotReplacement = function reconcileHotReplacement(ReactInstance) {
  var stack = getReactStack(ReactInstance);
  hotReplacementRender$1(ReactInstance, stack);
  cleanupReact();
  deepMarkUpdate(stack);
};

var renderReconciler = function renderReconciler(target, force) {
  // we are not inside parent reconcilation
  var currentGeneration = get$1();
  var componentGeneration = target[RENDERED_GENERATION];

  target[RENDERED_GENERATION] = currentGeneration;

  if (!internalConfiguration.disableProxyCreation) {
    if ((componentGeneration || force) && componentGeneration !== currentGeneration) {
      enterHotUpdate();
      reconcileHotReplacement(target);
      return true;
    }
  }
  return false;
};

function asyncReconciledRender(target) {
  renderReconciler(target, false);
}

function proxyWrapper(element) {
  // post wrap on post render
  if (!internalConfiguration.disableProxyCreation) {
    unscheduleUpdate(this);
  }

  if (!element) {
    return element;
  }
  if (Array.isArray(element)) {
    return element.map(proxyWrapper);
  }
  if (typeof element.type === 'function') {
    var proxy = getProxyByType(element.type);
    if (proxy) {
      return _extends({}, element, {
        type: proxy.get()
      });
    }
  }
  return element;
}

var ERROR_STATE = 'react_hot_loader_catched_error';
var ERROR_STATE_PROTO = 'react_hot_loader_catched_error-prototype';
var OLD_RENDER = 'react_hot_loader_original_render';

function componentDidCatch(error, errorInfo) {
  this[ERROR_STATE] = {
    location: 'boundary',
    error: error,
    errorInfo: errorInfo,
    generation: get$1()
  };
  Object.getPrototypeOf(this)[ERROR_STATE_PROTO] = this[ERROR_STATE];
  if (!configuration.errorReporter) {
    logException(error, errorInfo, this);
  }
  this.forceUpdate();
}

function componentRender() {
  var _ref = this[ERROR_STATE] || {},
      error = _ref.error,
      errorInfo = _ref.errorInfo,
      generation = _ref.generation;

  if (error && generation === get$1()) {
    return React__default.createElement(configuration.errorReporter || EmptyErrorPlaceholder, {
      error: error,
      errorInfo: errorInfo,
      component: this
    });
  }

  if (this.hotComponentUpdate) {
    this.hotComponentUpdate();
  }
  try {
    var _OLD_RENDER$render;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_OLD_RENDER$render = this[OLD_RENDER].render).call.apply(_OLD_RENDER$render, [this].concat(args));
  } catch (renderError) {
    this[ERROR_STATE] = {
      location: 'render',
      error: renderError,
      generation: get$1()
    };
    if (!configuration.errorReporter) {
      logException(renderError, undefined, this);
    }
    return componentRender.call(this);
  }
}

function retryHotLoaderError() {
  delete this[ERROR_STATE];
  this.forceUpdate();
}

setComparisonHooks(function () {
  return {};
}, function (component) {
  if (!hotComparisonOpen()) {
    return;
  }
  var prototype = component.prototype;

  if (!prototype[OLD_RENDER]) {
    var renderDescriptior = Object.getOwnPropertyDescriptor(prototype, 'render');
    prototype[OLD_RENDER] = {
      descriptor: renderDescriptior ? renderDescriptior.value : undefined,
      render: prototype.render
    };
    prototype.componentDidCatch = componentDidCatch;
    prototype.retryHotLoaderError = retryHotLoaderError;

    prototype.render = componentRender;
  }
  delete prototype[ERROR_STATE];
}, function (_ref2) {
  var prototype = _ref2.prototype;

  if (prototype[OLD_RENDER]) {
    var _ref3 = prototype[ERROR_STATE_PROTO] || {},
        generation = _ref3.generation;

    if (generation === get$1()) ; else {
      delete prototype.componentDidCatch;
      delete prototype.retryHotLoaderError;

      // undo only what we did
      if (prototype.render === componentRender) {
        if (!prototype[OLD_RENDER].descriptor) {
          delete prototype.render;
        } else {
          prototype.render = prototype[OLD_RENDER].descriptor;
        }
      } else {
        console.error('React-Hot-Loader: something unexpectedly mutated Component', prototype);
      }
      delete prototype[ERROR_STATE_PROTO];
      delete prototype[OLD_RENDER];
    }
  }
});

setStandInOptions({
  componentWillRender: asyncReconciledRender,
  componentDidRender: proxyWrapper,
  componentDidUpdate: function componentDidUpdate(component) {
    component[RENDERED_GENERATION] = get$1();
    flushScheduledUpdates();
  }
});

var AppContainer = function (_React$Component) {
  inherits(AppContainer, _React$Component);

  AppContainer.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.generation !== get$1()) {
      // Hot reload is happening.
      return {
        error: null,
        generation: get$1()
      };
    }
    return null;
  };

  function AppContainer(props) {
    classCallCheck(this, AppContainer);

    var _this = possibleConstructorReturn(this, _React$Component.call(this, props));

    if (configuration.showReactDomPatchNotification) {
      configuration.showReactDomPatchNotification = false;
      console.warn('React-Hot-Loader: react-🔥-dom patch is not detected. React 16.6+ features may not work.');
    }

    _this.state = {
      error: null,
      errorInfo: null,
      // eslint-disable-next-line react/no-unused-state
      generation: 0
    };
    return _this;
  }

  AppContainer.prototype.shouldComponentUpdate = function shouldComponentUpdate(prevProps, prevState) {
    // Don't update the component if the state had an error and still has one.
    // This allows to break an infinite loop of error -> render -> error -> render
    // https://github.com/gaearon/react-hot-loader/issues/696
    if (prevState.error && this.state.error) {
      return false;
    }

    return true;
  };

  AppContainer.prototype.componentDidCatch = function componentDidCatch(error, errorInfo) {
    logger.error(error);

    if (!hotComparisonOpen()) {
      // do not log error outside of HMR cycle

      // trigger update to kick error
      this.setState({});
      throw error;
    }
    var _props$errorReporter = this.props.errorReporter,
        errorReporter = _props$errorReporter === undefined ? configuration.errorReporter : _props$errorReporter;

    if (!errorReporter) {
      logException(error, errorInfo, this);
    }
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  };

  AppContainer.prototype.retryHotLoaderError = function retryHotLoaderError$$1() {
    var _this2 = this;

    this.setState({ error: null }, function () {
      retryHotLoaderError.call(_this2);
    });
  };

  AppContainer.prototype.render = function render() {
    var _state = this.state,
        error = _state.error,
        errorInfo = _state.errorInfo;
    var _props$errorReporter2 = this.props.errorReporter,
        ErrorReporter = _props$errorReporter2 === undefined ? configuration.errorReporter || EmptyErrorPlaceholder : _props$errorReporter2;


    if (error && this.props.errorBoundary) {
      return React__default.createElement(ErrorReporter, { error: error, errorInfo: errorInfo, component: this });
    }

    if (this.hotComponentUpdate) {
      this.hotComponentUpdate();
    } else {
      throw new Error('React-Hot-Loader: AppContainer should be patched');
    }

    return React__default.Children.only(this.props.children);
  };

  return AppContainer;
}(React__default.Component);

AppContainer.reactHotLoadable = false;


AppContainer.propTypes = {
  children: function children(props) {
    if (React__default.Children.count(props.children) !== 1) {
      return new Error('Invalid prop "children" supplied to AppContainer. ' + 'Expected a single React element with your app’s root component, e.g. <App />.');
    }

    return undefined;
  },

  errorReporter: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  errorBoundary: PropTypes.bool
};

AppContainer.defaultProps = {
  errorBoundary: true
};

//  trying first react-lifecycles-compat.polyfill, then trying react-lifecycles-compat, which could be .default
var realPolyfill = defaultPolyfill.polyfill || defaultPolyfill__default;
realPolyfill(AppContainer);

var lazyConstructor = '_ctor';

var patchLazyConstructor = function patchLazyConstructor(target) {
  if (!configuration.trackTailUpdates && !target[lazyConstructor].isPatchedByReactHotLoader) {
    var ctor = target[lazyConstructor];
    target[lazyConstructor] = function () {
      return ctor().then(function (m) {
        var C = resolveType(m.default);
        // chunks has been updated - new hot loader process is taking a place
        enterHotUpdate();
        if (!React__default.forwardRef) {
          return {
            default: function _default(props) {
              return React__default.createElement(
                AppContainer,
                null,
                React__default.createElement(C, props)
              );
            }
          };
        }
        return {
          default: React__default.forwardRef(function (props, ref) {
            return React__default.createElement(
              AppContainer,
              null,
              React__default.createElement(C, _extends({}, props, { ref: ref }))
            );
          })
        };
      });
    };
    target[lazyConstructor].isPatchedByReactHotLoader = true;
  }
};

var updateLazy = function updateLazy(target, type) {
  var ctor = type[lazyConstructor];
  if (target[lazyConstructor] !== type[lazyConstructor]) {
    // just execute `import` and RHL.register will do the job
    ctor();
  }
  patchLazyConstructor(target);
  patchLazyConstructor(type);
};

var updateMemo = function updateMemo(target, _ref) {
  var type = _ref.type;

  target.type = resolveType(type);
};

var updateForward = function updateForward(target, _ref2) {
  var render = _ref2.render;

  target.render = render;
};

var updateContext = function updateContext() {
  // nil
};

var getInnerComponentType = function getInnerComponentType(component) {
  var unwrapper = component[UNWRAP_PROXY];
  return unwrapper ? unwrapper() : component;
};

function haveEqualSignatures(prevType, nextType) {
  try {
    var prevSignature = getSignature(prevType);
    var nextSignature = getSignature(nextType);

    if (prevSignature === undefined && nextSignature === undefined) {
      return true;
    }
    if (prevSignature === undefined || nextSignature === undefined) {
      return false;
    }
    if (prevSignature.key !== nextSignature.key) {
      return false;
    }

    // TODO: we might need to calculate previous signature earlier in practice,
    // such as during the first time a component is resolved. We'll revisit this.
    var prevCustomHooks = prevSignature.getCustomHooks();
    var nextCustomHooks = nextSignature.getCustomHooks();
    if (prevCustomHooks.length !== nextCustomHooks.length) {
      return false;
    }

    for (var i = 0; i < nextCustomHooks.length; i++) {
      if (!haveEqualSignatures(prevCustomHooks[i], nextCustomHooks[i])) {
        return false;
      }
    }
  } catch (e) {
    logger.error('React-Hot-Loader: error occurred while comparing hook signature', e);
    return false;
  }

  return true;
}

var areSignaturesCompatible = function areSignaturesCompatible(a, b) {
  // compare signatures of two components
  // non-equal component have to remount and there is two options to do it
  // - fail the comparison, remounting all tree below
  // - fulfill it, but set `_debugNeedsRemount` on a fiber to drop only local state
  // the second way is not published yet, so going with the first one
  if (!haveEqualSignatures(a, b)) {
    logger.warn('⚛️🔥🎣 Hook order change detected: component', a, 'has been remounted');
    return false;
  }
  return true;
};

var compareRegistered = function compareRegistered(a, b) {
  return getIdByType(a) === getIdByType(b) && getProxyByType(a) === getProxyByType(b) && areSignaturesCompatible(a, b);
};

var areDeepSwappable = function areDeepSwappable(oldType, newType) {
  var type = { type: oldType };

  if (typeof oldType === 'function') {
    return areSwappable(oldType, newType);
  }

  if (isForwardType(type)) {
    return areDeepSwappable(oldType.render, newType.render);
  }

  if (isMemoType(type)) {
    return areDeepSwappable(oldType.type, newType.type);
  }

  // that's not safe
  // if (isLazyType(type)) {
  //   return areDeepSwappable(oldType._ctor, newType._ctor)
  // }

  return false;
};

var compareComponents = function compareComponents(oldType, newType, setNewType, baseType) {
  var defaultResult = oldType === newType;

  if (oldType && !newType || !oldType && newType || (typeof oldType === 'undefined' ? 'undefined' : _typeof(oldType)) !== (typeof newType === 'undefined' ? 'undefined' : _typeof(newType)) || getElementType(oldType) !== getElementType(newType) || 0) {
    return defaultResult;
  }

  if (getIdByType(newType) || getIdByType(oldType)) {
    if (!compareRegistered(oldType, newType)) {
      return false;
    }
    defaultResult = true;
  }

  if (isForwardType({ type: oldType }) && isForwardType({ type: newType })) {
    if (!compareRegistered(oldType.render, newType.render)) {
      return false;
    }
    if (oldType.render === newType.render || areDeepSwappable(oldType, newType)) {
      setNewType(newType);
      return true;
    }
    return defaultResult;
  }

  if (isMemoType({ type: oldType }) && isMemoType({ type: newType })) {
    if (!compareRegistered(oldType.type, newType.type)) {
      return false;
    }
    if (oldType.type === newType.type || areDeepSwappable(oldType, newType)) {
      if (baseType) {
        // memo form different fibers, why?
        if (baseType.$$typeof === newType.$$typeof) {
          setNewType(newType);
        } else {
          setNewType(newType.type);
        }
      } else {
        logger.warn('Please update hot-loader/react-dom');
        if (isReactClass(newType.type)) {
          setNewType(newType);
        } else {
          setNewType(newType.type);
        }
      }

      return true;
    }
    return defaultResult;
  }

  if (isLazyType({ type: oldType })) {
    updateLazy(oldType, newType);
    // no need to update
    // setNewType(newType);
    return defaultResult;
  }

  if (isContextType({ type: oldType })) {
    // update provider
    setNewType(newType);
    return defaultResult;
  }

  if (typeof newType === 'function' && (defaultResult || newType !== oldType && areSignaturesCompatible(newType, oldType) && areSwappable(newType, oldType))) {
    var unwrapFactory = newType[UNWRAP_PROXY];
    var oldProxy = unwrapFactory && getProxyByType(unwrapFactory());
    if (oldProxy) {
      oldProxy.dereference();
      updateProxyById(oldType[PROXY_KEY] || getIdByType(oldType), getInnerComponentType(newType));
    } else {
      setNewType(newType);
    }
    return true;
  }

  return defaultResult;
};

var knownPairs = new WeakMap();
var emptyMap$1 = new WeakMap();

var getKnownPair = function getKnownPair(oldType, newType) {
  var pair = knownPairs.get(oldType) || emptyMap$1;
  return pair.get(newType);
};

var hotComponentCompare = function hotComponentCompare(oldType, preNewType, setNewType, baseType) {
  var hotActive = hotComparisonOpen();
  var newType = configuration.integratedResolver ? resolveType(preNewType) : preNewType;

  // TODO: find out the root cause
  // we could not use "fast result" here - go a full part to update a fiber.
  // const knownType = getKnownPair(oldType, newType);
  // if (knownType !== undefined) {
  //   return knownType;
  // }

  var result = oldType === newType;

  if (hotActive) {
    // pre fail components which could not be merged
    if (!isReloadableComponent(oldType) || !isReloadableComponent(newType) || isColdType(oldType) || isColdType(oldType) || !oldType || !newType || 0) {
      return result;
    }

    result = compareComponents(oldType, newType, setNewType, baseType);
    var pair = knownPairs.get(oldType) || new WeakMap();
    pair.set(newType, result);
    knownPairs.set(oldType, pair);
    return result;
  }

  // result - true if components are equal, or were "equal" at any point in the past
  return result || getKnownPair(oldType, newType) || false;
};

/* eslint-disable no-use-before-define */

var forceSimpleSFC = { proxy: { pureSFC: true } };

var hookWrapper = function hookWrapper(hook) {
  var wrappedHook = function wrappedHook(cb, deps) {
    if (configuration.reloadHooks && deps) {
      var inputs = [].concat(deps);

      // reload hooks which have changed string representation
      if (configuration.reloadHooksOnBodyChange) {
        inputs.push(String(cb));
      }

      if (
      // reload hooks with dependencies
      deps.length > 0 ||
      // reload all hooks of option is set
      configuration.reloadLifeCycleHooks && deps.length === 0) {
        inputs.push(getHotGeneration());
      }

      return hook(cb, inputs);
    }
    return hook(cb, deps);
  };
  wrappedHook.isPatchedByReactHotLoader = true;
  return wrappedHook;
};

var noDeps = function noDeps() {
  return [];
};

var reactHotLoader = {
  signature: function signature(type, key) {
    var getCustomHooks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noDeps;

    addSignature(type, { key: key, getCustomHooks: getCustomHooks });
    return type;
  },
  register: function register(type, uniqueLocalName, fileName) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    var id = fileName + '#' + uniqueLocalName;

    if (isCompositeComponent(type) && typeof uniqueLocalName === 'string' && uniqueLocalName && typeof fileName === 'string' && fileName) {
      var proxy = getProxyById(id);

      if (proxy && proxy.getCurrent() !== type) {
        if (!configuration.IS_REACT_MERGE_ENABLED) {
          if (isTypeBlacklisted(type) || isTypeBlacklisted(proxy.getCurrent())) {
            logger.error('React-hot-loader: Cold component', uniqueLocalName, 'at', fileName, 'has been updated');
          }
        }
      }

      if (configuration.onComponentRegister) {
        configuration.onComponentRegister(type, uniqueLocalName, fileName);
      }
      if (configuration.onComponentCreate) {
        configuration.onComponentCreate(type, getComponentDisplayName(type));
      }

      registerComponent(updateProxyById(id, type, options).get(), 2);
      registerComponent(type);
      increment();
    }
    if (isContextType({ type: type })) {
      // possible options - Context, Consumer, Provider.
      ['Provider', 'Consumer'].forEach(function (prop) {
        var descriptor = Object.getOwnPropertyDescriptor(type, prop);
        if (descriptor && descriptor.value) {
          updateFunctionProxyById(id + ':' + prop, descriptor.value, updateContext);
        }
      });
      updateFunctionProxyById(id, type, updateContext);
      increment();
    }
    if (isLazyType({ type: type })) {
      updateFunctionProxyById(id, type, updateLazy);
      increment();
    }
    if (isForwardType({ type: type })) {
      reactHotLoader.register(type.render, uniqueLocalName + ':render', fileName, forceSimpleSFC);
      updateFunctionProxyById(id, type, updateForward);
      increment();
    }
    if (isMemoType({ type: type })) {
      reactHotLoader.register(type.type, uniqueLocalName + ':memo', fileName, forceSimpleSFC);
      updateFunctionProxyById(id, type, updateMemo);
      increment();
    }
  },
  reset: function reset() {
    resetProxies();
  },
  preact: function preact(instance) {
    preactAdapter(instance, resolveType);
  },
  resolveType: function resolveType$$1(type) {
    return resolveType(type);
  },
  patch: function patch(React$$1, ReactDOM$$1) {
    var typeResolver = resolveType;
    /* eslint-disable no-console */
    if (ReactDOM$$1 && !ReactDOM$$1.render) {
      logger.error('React-Hot-Loader: broken state detected, please import React-Hot-Loader before react-dom, see https://github.com/gaearon/react-hot-loader/issues/1315');
    }
    if (ReactDOM$$1 && ReactDOM$$1.setHotElementComparator) {
      ReactDOM$$1.setHotElementComparator(hotComponentCompare);
      configuration.disableHotRenderer = configuration.disableHotRendererWhenInjected;

      configuration.ignoreSFC = configuration.ignoreSFCWhenInjected;

      configuration.IS_REACT_MERGE_ENABLED = true;
      configuration.showReactDomPatchNotification = false;
      configuration.integratedComparator = true;

      if (ReactDOM$$1.setHotTypeResolver) {
        configuration.integratedResolver = true;
        typeResolver = resolveSimpleType;
        ReactDOM$$1.setHotTypeResolver(resolveType);
      }
    }

    // PATCH REACT METHODS

    /* eslint-enable */
    if (!React$$1.createElement.isPatchedByReactHotLoader) {
      var originalCreateElement = React$$1.createElement;
      // Trick React into rendering a proxy so that
      // its state is preserved when the class changes.
      // This will update the proxy if it's for a known type.
      React$$1.createElement = function (type) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        return originalCreateElement.apply(undefined, [typeResolver(type)].concat(args));
      };
      React$$1.createElement.isPatchedByReactHotLoader = true;
    }

    if (!React$$1.cloneElement.isPatchedByReactHotLoader) {
      var originalCloneElement = React$$1.cloneElement;

      React$$1.cloneElement = function (element) {
        for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }

        var newType = element.type && typeResolver(element.type);
        if (newType && newType !== element.type) {
          return originalCloneElement.apply(undefined, [_extends({}, element, {
            type: newType
          })].concat(args));
        }
        return originalCloneElement.apply(undefined, [element].concat(args));
      };

      React$$1.cloneElement.isPatchedByReactHotLoader = true;
    }

    if (!React$$1.createFactory.isPatchedByReactHotLoader) {
      // Patch React.createFactory to use patched createElement
      // because the original implementation uses the internal,
      // unpatched ReactElement.createElement
      React$$1.createFactory = function (type) {
        var factory = React$$1.createElement.bind(null, type);
        factory.type = type;
        return factory;
      };
      React$$1.createFactory.isPatchedByReactHotLoader = true;
    }

    if (!React$$1.Children.only.isPatchedByReactHotLoader) {
      var originalChildrenOnly = React$$1.Children.only;
      // Use the same trick as React.createElement
      React$$1.Children.only = function (children) {
        return originalChildrenOnly(_extends({}, children, {
          type: typeResolver(children.type)
        }));
      };
      React$$1.Children.only.isPatchedByReactHotLoader = true;
    }

    // PATCH REACT HOOKS

    if (React$$1.useEffect && !React$$1.useEffect.isPatchedByReactHotLoader) {
      React$$1.useEffect = hookWrapper(React$$1.useEffect);
      React$$1.useLayoutEffect = hookWrapper(React$$1.useLayoutEffect);
      React$$1.useCallback = hookWrapper(React$$1.useCallback);
      React$$1.useMemo = hookWrapper(React$$1.useMemo);

      // transform context for useContext
      var useContext = React$$1.useContext;

      React$$1.useContext = function (context) {
        for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
          args[_key3 - 1] = arguments[_key3];
        }

        return useContext.apply(undefined, [typeResolver(context)].concat(args));
      };
    }

    // reactHotLoader.reset()
  }
};

var openedModules = {};
var lastModuleOpened = '';
var getLastModuleOpened = function getLastModuleOpened() {
  return lastModuleOpened;
};

var hotModules = {};

var createHotModule = function createHotModule() {
  return { instances: [], updateTimeout: 0 };
};

var hotModule = function hotModule(moduleId) {
  if (!hotModules[moduleId]) {
    hotModules[moduleId] = createHotModule();
  }
  return hotModules[moduleId];
};

var isOpened = function isOpened(sourceModule) {
  return sourceModule && !!openedModules[sourceModule.id];
};

var enter = function enter(sourceModule) {
  if (sourceModule && sourceModule.id) {
    lastModuleOpened = sourceModule.id;
    openedModules[sourceModule.id] = true;
  } else {
    logger.warn('React-hot-loader: no `module` variable found. Did you shadow a system variable?');
  }
};

var leave = function leave(sourceModule) {
  if (sourceModule && sourceModule.id) {
    delete openedModules[sourceModule.id];
  }
};

var createQueue = function createQueue() {
  var runner = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (a) {
    return a();
  };

  var promise = void 0;
  var queue = [];

  var runAll = function runAll() {
    var oldQueue = queue;
    oldQueue.forEach(function (cb) {
      return cb();
    });
    queue = [];
  };

  var add = function add(cb) {
    if (queue.length === 0) {
      promise = Promise.resolve().then(function () {
        return runner(runAll);
      });
    }
    queue.push(cb);

    return promise;
  };

  return add;
};

/* eslint-disable camelcase, no-undef */
var requireIndirect =  true ? __webpack_require__ : undefined;
/* eslint-enable */

var chargeFailbackTimer = function chargeFailbackTimer(id) {
  return setTimeout(function () {
    var error = 'hot update failed for module "' + id + '". Last file processed: "' + getLastModuleOpened() + '".';
    logger.error(error);
    logException({
      toString: function toString() {
        return error;
      }
    });
    // 100 ms more "code" tolerant that 0, and would catch error in any case
  }, 100);
};

var clearFailbackTimer = function clearFailbackTimer(timerId) {
  return clearTimeout(timerId);
};

var createHoc = function createHoc(SourceComponent, TargetComponent) {
  hoistNonReactStatic(TargetComponent, SourceComponent);
  TargetComponent.displayName = 'HotExported' + getComponentDisplayName(SourceComponent);
  return TargetComponent;
};

var runInRequireQueue = createQueue();
var runInRenderQueue = createQueue(function (cb) {
  if (ReactDOM.unstable_batchedUpdates) {
    ReactDOM.unstable_batchedUpdates(cb);
  } else {
    cb();
  }
});

var makeHotExport = function makeHotExport(sourceModule, moduleId) {
  var updateInstances = function updateInstances(possibleError) {
    if (possibleError && possibleError instanceof Error) {
      console.error(possibleError);
      return;
    }
    var module = hotModule(moduleId);

    var deepUpdate = function deepUpdate() {
      // force flush all updates
      runInRenderQueue(function () {
        enterHotUpdate();
        var gen = getHotGeneration();
        module.instances.forEach(function (inst) {
          return inst.forceUpdate();
        });

        if (configuration.trackTailUpdates) {
          var runLimit = 0;
          var checkTailUpdates = function checkTailUpdates() {
            setTimeout(function () {
              if (getHotGeneration() !== gen) {
                // we know that some components were updated, but not tracking which ones
                // even if their updates might be incorporated automatically (like lazy)
                // we dont know which one should be tracked, and which updates are important
                console.warn('React-Hot-Loader: some components were updated out-of-bound. Updating your app to reconcile the changes.');
                deepUpdate();
              } else if (++runLimit < 5) {
                checkTailUpdates();
              }
            }, 16);
          };

          checkTailUpdates();
        }
      });
    };

    // require all modules
    runInRequireQueue(function () {
      try {
        // webpack will require everything by this time
        // but let's double check...
        requireIndirect(moduleId);
      } catch (e) {
        console.error('React-Hot-Loader: error detected while loading', moduleId);
        console.error(e);
      }
    }).then(deepUpdate);
  };

  if (sourceModule.hot) {
    // Mark as self-accepted for Webpack (callback is an Error Handler)
    // Update instances for Parcel (callback is an Accept Handler)
    sourceModule.hot.accept(updateInstances);

    // Webpack way
    if (sourceModule.hot.addStatusHandler) {
      if (sourceModule.hot.status() === 'idle') {
        sourceModule.hot.addStatusHandler(function (status) {
          if (status === 'apply') {
            clearExceptions();
            updateInstances();
          }
        });
      }
    }
  } else {
    logger.warn('React-hot-loader: Hot Module Replacement is not enabled');
  }
};

var hot = function hot(sourceModule) {
  if (!sourceModule) {
    // this is fatal
    throw new Error('React-hot-loader: `hot` was called without any argument provided');
  }
  var moduleId = sourceModule.id || sourceModule.i || sourceModule.filename;
  if (!moduleId) {
    console.error('`module` provided', sourceModule);
    throw new Error('React-hot-loader: `hot` could not find the `name` of the the `module` you have provided');
  }
  var module = hotModule(moduleId);
  makeHotExport(sourceModule, moduleId);

  clearExceptions();
  var failbackTimer = chargeFailbackTimer(moduleId);
  var firstHotRegistered = false;

  // TODO: Ensure that all exports from this file are react components.

  return function (WrappedComponent, props) {
    clearFailbackTimer(failbackTimer);
    // register proxy for wrapped component
    // only one hot per file would use this registration
    if (!firstHotRegistered) {
      firstHotRegistered = true;
      reactHotLoader.register(WrappedComponent, getComponentDisplayName(WrappedComponent), 'RHL' + moduleId);
    }

    return createHoc(WrappedComponent, function (_Component) {
      inherits(ExportedComponent, _Component);

      function ExportedComponent() {
        classCallCheck(this, ExportedComponent);
        return possibleConstructorReturn(this, _Component.apply(this, arguments));
      }

      ExportedComponent.prototype.componentDidMount = function componentDidMount() {
        module.instances.push(this);
      };

      ExportedComponent.prototype.componentWillUnmount = function componentWillUnmount() {
        var _this2 = this;

        if (isOpened(sourceModule)) {
          var componentName = getComponentDisplayName(WrappedComponent);
          logger.error('React-hot-loader: Detected AppContainer unmount on module \'' + moduleId + '\' update.\n' + ('Did you use "hot(' + componentName + ')" and "ReactDOM.render()" in the same file?\n') + ('"hot(' + componentName + ')" shall only be used as export.\n') + 'Please refer to "Getting Started" (https://github.com/gaearon/react-hot-loader/).');
        }
        module.instances = module.instances.filter(function (a) {
          return a !== _this2;
        });
      };

      ExportedComponent.prototype.render = function render() {
        return React__default.createElement(
          AppContainer,
          props,
          React__default.createElement(WrappedComponent, this.props)
        );
      };

      return ExportedComponent;
    }(React.Component));
  };
};

var getProxyOrType = function getProxyOrType(type) {
  var proxy = getProxyByType(type);
  return proxy ? proxy.get() : type;
};

var areComponentsEqual = function areComponentsEqual(a, b) {
  return getProxyOrType(a) === getProxyOrType(b);
};

var compareOrSwap = function compareOrSwap(oldType, newType) {
  return hotComponentCompare(oldType, newType);
};

var cold = function cold(type) {
  blacklistByType(type);
  return type;
};

var configureComponent = function configureComponent(component, options) {
  return setComponentOptions(component, options);
};

var setConfig = function setConfig(config) {
  return setConfiguration(config);
};

reactHotLoader.patch(React__default, ReactDOM);

exports.default = reactHotLoader;
exports.AppContainer = AppContainer;
exports.hot = hot;
exports.enterModule = enter;
exports.leaveModule = leave;
exports.areComponentsEqual = areComponentsEqual;
exports.compareOrSwap = compareOrSwap;
exports.cold = cold;
exports.configureComponent = configureComponent;
exports.setConfig = setConfig;


/***/ }),

/***/ "../node_modules/react-hot-loader/dist/react-hot-loader.production.min.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function _interopDefault(e){return e&&"object"==typeof e&&"default"in e?e.default:e}Object.defineProperty(exports,"__esModule",{value:!0});var React=_interopDefault(__webpack_require__("../node_modules/react/index.js"));function AppContainer(e){return AppContainer.warnAboutHMRDisabled&&(AppContainer.warnAboutHMRDisabled=!0,console.error("React-Hot-Loader: misconfiguration detected, using production version in non-production environment."),console.error("React-Hot-Loader: Hot Module Replacement is not enabled.")),React.Children.only(e.children)}AppContainer.warnAboutHMRDisabled=!1;var hot=function e(){return e.shouldWrapWithAppContainer?function(e){return function(n){return React.createElement(AppContainer,null,React.createElement(e,n))}}:function(e){return e}};hot.shouldWrapWithAppContainer=!1;var areComponentsEqual=function(e,n){return e===n},setConfig=function(){},cold=function(e){return e},configureComponent=function(){};exports.AppContainer=AppContainer,exports.hot=hot,exports.areComponentsEqual=areComponentsEqual,exports.setConfig=setConfig,exports.cold=cold,exports.configureComponent=configureComponent;


/***/ }),

/***/ "../node_modules/react-hot-loader/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (false) {} else if (false) {} else if (typeof global.global === 'undefined') {
  // this is just server environment
  module.exports = __webpack_require__("../node_modules/react-hot-loader/dist/react-hot-loader.production.min.js");
} else if (false) {} else {
  var evalAllowed = false;
  try {
    eval('evalAllowed = true');
  } catch (e) {
    // eval not allowed due to CSP
  }

  // RHL needs setPrototypeOf to operate Component inheritance, and eval to patch methods
  var jsFeaturesPresent = !!Object.setPrototypeOf;

  if (!jsFeaturesPresent || !evalAllowed) {
    // we are not in prod mode, but RHL could not be activated
    console.warn('React-Hot-Loader is not supported in this environment.');
    module.exports = __webpack_require__("../node_modules/react-hot-loader/dist/react-hot-loader.production.min.js");
  } else {
    module.exports = global.global.reactHotLoaderGlobal = __webpack_require__("../node_modules/react-hot-loader/dist/react-hot-loader.development.js");
  }
}


/***/ }),

/***/ "../node_modules/react-hot-loader/root.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {if (true) {
  var hot = __webpack_require__("../node_modules/react-hot-loader/index.js").hot;
  if (true) {
    var cache = __webpack_require__.c;

    if (!module.parents || module.parents.length === 0) {
      throw new Error(
        'React-Hot-Loader: `react-hot-loader/root` is not supported on your system. ' +
        'Please use `import {hot} from "react-hot-loader"` instead'
      );
    }
    // access parent
    var parent = cache[module.parents[0]];
    if (!parent) {
      throw new Error(
        'React-Hot-Loader: `react-hot-loader/root` is not supported on your system. ' +
        'Please use `import {hot} from "react-hot-loader"` instead'
      );
    }
    // remove self from a cache
    delete cache[module.i];
  }
  // setup hot for caller
  exports.hot = hot(parent);
} else {}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "../node_modules/react-is/cjs/react-is.development.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.9.0
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (true) {
  (function() {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;

var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace;
// TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
// (unstable) APIs that have been removed. Can we remove the symbols?
var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' ||
  // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE);
}

/**
 * Forked from fbjs/warning:
 * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
 *
 * Only change is we use console.warn instead of console.error,
 * and do nothing when 'console' is not supported.
 * This really simplifies the code.
 * ---
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var lowPriorityWarning = function () {};

{
  var printWarning = function (format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.warn(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  lowPriorityWarning = function (condition, format) {
    if (format === undefined) {
      throw new Error('`lowPriorityWarning(condition, format, ...args)` requires a warning ' + 'message argument');
    }
    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

var lowPriorityWarning$1 = lowPriorityWarning;

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;
    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_ASYNC_MODE_TYPE:
          case REACT_CONCURRENT_MODE_TYPE:
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
            return type;
          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;
              default:
                return $$typeof;
            }
        }
      case REACT_LAZY_TYPE:
      case REACT_MEMO_TYPE:
      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
}

// AsyncMode is deprecated along with isAsyncMode
var AsyncMode = REACT_ASYNC_MODE_TYPE;
var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Lazy = REACT_LAZY_TYPE;
var Memo = REACT_MEMO_TYPE;
var Portal = REACT_PORTAL_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;
var Suspense = REACT_SUSPENSE_TYPE;

var hasWarnedAboutDeprecatedIsAsyncMode = false;

// AsyncMode should be deprecated
function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true;
      lowPriorityWarning$1(false, 'The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
    }
  }
  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
}
function isConcurrentMode(object) {
  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isLazy(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}
function isSuspense(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
}

exports.typeOf = typeOf;
exports.AsyncMode = AsyncMode;
exports.ConcurrentMode = ConcurrentMode;
exports.ContextConsumer = ContextConsumer;
exports.ContextProvider = ContextProvider;
exports.Element = Element;
exports.ForwardRef = ForwardRef;
exports.Fragment = Fragment;
exports.Lazy = Lazy;
exports.Memo = Memo;
exports.Portal = Portal;
exports.Profiler = Profiler;
exports.StrictMode = StrictMode;
exports.Suspense = Suspense;
exports.isValidElementType = isValidElementType;
exports.isAsyncMode = isAsyncMode;
exports.isConcurrentMode = isConcurrentMode;
exports.isContextConsumer = isContextConsumer;
exports.isContextProvider = isContextProvider;
exports.isElement = isElement;
exports.isForwardRef = isForwardRef;
exports.isFragment = isFragment;
exports.isLazy = isLazy;
exports.isMemo = isMemo;
exports.isPortal = isPortal;
exports.isProfiler = isProfiler;
exports.isStrictMode = isStrictMode;
exports.isSuspense = isSuspense;
  })();
}


/***/ }),

/***/ "../node_modules/react-is/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__("../node_modules/react-is/cjs/react-is.development.js");
}


/***/ }),

/***/ "../node_modules/react-lifecycles-compat/react-lifecycles-compat.es.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "polyfill", function() { return polyfill; });
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

function componentWillMount() {
  // Call this.constructor.gDSFP to support sub-classes.
  var state = this.constructor.getDerivedStateFromProps(this.props, this.state);
  if (state !== null && state !== undefined) {
    this.setState(state);
  }
}

function componentWillReceiveProps(nextProps) {
  // Call this.constructor.gDSFP to support sub-classes.
  // Use the setState() updater to ensure state isn't stale in certain edge cases.
  function updater(prevState) {
    var state = this.constructor.getDerivedStateFromProps(nextProps, prevState);
    return state !== null && state !== undefined ? state : null;
  }
  // Binding "this" is important for shallow renderer support.
  this.setState(updater.bind(this));
}

function componentWillUpdate(nextProps, nextState) {
  try {
    var prevProps = this.props;
    var prevState = this.state;
    this.props = nextProps;
    this.state = nextState;
    this.__reactInternalSnapshotFlag = true;
    this.__reactInternalSnapshot = this.getSnapshotBeforeUpdate(
      prevProps,
      prevState
    );
  } finally {
    this.props = prevProps;
    this.state = prevState;
  }
}

// React may warn about cWM/cWRP/cWU methods being deprecated.
// Add a flag to suppress these warnings for this special case.
componentWillMount.__suppressDeprecationWarning = true;
componentWillReceiveProps.__suppressDeprecationWarning = true;
componentWillUpdate.__suppressDeprecationWarning = true;

function polyfill(Component) {
  var prototype = Component.prototype;

  if (!prototype || !prototype.isReactComponent) {
    throw new Error('Can only polyfill class components');
  }

  if (
    typeof Component.getDerivedStateFromProps !== 'function' &&
    typeof prototype.getSnapshotBeforeUpdate !== 'function'
  ) {
    return Component;
  }

  // If new component APIs are defined, "unsafe" lifecycles won't be called.
  // Error if any of these lifecycles are present,
  // Because they would work differently between older and newer (16.3+) versions of React.
  var foundWillMountName = null;
  var foundWillReceivePropsName = null;
  var foundWillUpdateName = null;
  if (typeof prototype.componentWillMount === 'function') {
    foundWillMountName = 'componentWillMount';
  } else if (typeof prototype.UNSAFE_componentWillMount === 'function') {
    foundWillMountName = 'UNSAFE_componentWillMount';
  }
  if (typeof prototype.componentWillReceiveProps === 'function') {
    foundWillReceivePropsName = 'componentWillReceiveProps';
  } else if (typeof prototype.UNSAFE_componentWillReceiveProps === 'function') {
    foundWillReceivePropsName = 'UNSAFE_componentWillReceiveProps';
  }
  if (typeof prototype.componentWillUpdate === 'function') {
    foundWillUpdateName = 'componentWillUpdate';
  } else if (typeof prototype.UNSAFE_componentWillUpdate === 'function') {
    foundWillUpdateName = 'UNSAFE_componentWillUpdate';
  }
  if (
    foundWillMountName !== null ||
    foundWillReceivePropsName !== null ||
    foundWillUpdateName !== null
  ) {
    var componentName = Component.displayName || Component.name;
    var newApiName =
      typeof Component.getDerivedStateFromProps === 'function'
        ? 'getDerivedStateFromProps()'
        : 'getSnapshotBeforeUpdate()';

    throw Error(
      'Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n' +
        componentName +
        ' uses ' +
        newApiName +
        ' but also contains the following legacy lifecycles:' +
        (foundWillMountName !== null ? '\n  ' + foundWillMountName : '') +
        (foundWillReceivePropsName !== null
          ? '\n  ' + foundWillReceivePropsName
          : '') +
        (foundWillUpdateName !== null ? '\n  ' + foundWillUpdateName : '') +
        '\n\nThe above lifecycles should be removed. Learn more about this warning here:\n' +
        'https://fb.me/react-async-component-lifecycle-hooks'
    );
  }

  // React <= 16.2 does not support static getDerivedStateFromProps.
  // As a workaround, use cWM and cWRP to invoke the new static lifecycle.
  // Newer versions of React will ignore these lifecycles if gDSFP exists.
  if (typeof Component.getDerivedStateFromProps === 'function') {
    prototype.componentWillMount = componentWillMount;
    prototype.componentWillReceiveProps = componentWillReceiveProps;
  }

  // React <= 16.2 does not support getSnapshotBeforeUpdate.
  // As a workaround, use cWU to invoke the new lifecycle.
  // Newer versions of React will ignore that lifecycle if gSBU exists.
  if (typeof prototype.getSnapshotBeforeUpdate === 'function') {
    if (typeof prototype.componentDidUpdate !== 'function') {
      throw new Error(
        'Cannot polyfill getSnapshotBeforeUpdate() for components that do not define componentDidUpdate() on the prototype'
      );
    }

    prototype.componentWillUpdate = componentWillUpdate;

    var componentDidUpdate = prototype.componentDidUpdate;

    prototype.componentDidUpdate = function componentDidUpdatePolyfill(
      prevProps,
      prevState,
      maybeSnapshot
    ) {
      // 16.3+ will not execute our will-update method;
      // It will pass a snapshot value to did-update though.
      // Older versions will require our polyfilled will-update value.
      // We need to handle both cases, but can't just check for the presence of "maybeSnapshot",
      // Because for <= 15.x versions this might be a "prevContext" object.
      // We also can't just check "__reactInternalSnapshot",
      // Because get-snapshot might return a falsy value.
      // So check for the explicit __reactInternalSnapshotFlag flag to determine behavior.
      var snapshot = this.__reactInternalSnapshotFlag
        ? this.__reactInternalSnapshot
        : maybeSnapshot;

      componentDidUpdate.call(this, prevProps, prevState, snapshot);
    };
  }

  return Component;
}




/***/ }),

/***/ "../node_modules/react-nativescript/dist/client/ComponentTree.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var randomKey = Math.random()
    .toString(36)
    .slice(2);
var internalInstanceKey = "__reactInternalInstance$" + randomKey;
var internalEventHandlersKey = "__reactEventHandlers$" + randomKey;
function precacheFiberNode(hostInst, node) {
    node.set(internalInstanceKey, hostInst);
}
exports.precacheFiberNode = precacheFiberNode;
/**
 * Given a DOM node, return the closest ReactDOMComponent or
 * ReactDOMTextComponent instance ancestor.
 */
function getClosestInstanceFromNode(node) {
    if (node.get(internalInstanceKey)) {
        return node.get(internalInstanceKey);
    }
    while (!node.get(internalInstanceKey)) {
        if (node.parent) {
            // if(!node.parent){
            //   console.warn(`node.parent was null; meanwhile, node.parentNode was:`, node.parentNode);
            // }
            node = node.parent;
        }
        else {
            // Top of the tree. This node must not be part of a React tree (or is
            // unmounted, potentially).
            return null;
        }
    }
    var inst = node.get(internalInstanceKey);
    // if (inst.tag === HostComponent || inst.tag === HostText) {
    // In Fiber, this will always be the deepest root.
    return inst;
    // }
    // return null;
}
exports.getClosestInstanceFromNode = getClosestInstanceFromNode;
/**
 * Given a DOM node, return the ReactDOMComponent or ReactDOMTextComponent
 * instance, or null if the node was not rendered by this React.
 */
function getInstanceFromNode(node) {
    var inst = node.get(internalInstanceKey);
    if (inst) {
        return inst;
        // if (inst.tag === HostComponent || inst.tag === HostText) {
        //   return inst;
        // } else {
        //   return null;
        // }
    }
    return null;
}
exports.getInstanceFromNode = getInstanceFromNode;
/**
 * Given a ReactDOMComponent or ReactDOMTextComponent, return the corresponding
 * DOM node.
 */
function getNodeFromInstance(inst) {
    // if (inst.tag === HostComponent || inst.tag === HostText) {
    //   // In Fiber this, is just the state node right now. We assume it will be
    //   // a host component or host text.
    //   return inst.stateNode;
    // }
    return inst.stateNode;
    // Without this first invariant, passing a non-DOM-component triggers the next
    // invariant for a missing parent, which is super confusing.
    // invariant(false, 'getNodeFromInstance: Invalid argument.');
    // throw new Error('getNodeFromInstance: Invalid argument.');
}
exports.getNodeFromInstance = getNodeFromInstance;
function getFiberCurrentPropsFromNode(node) {
    return node.get(internalEventHandlersKey) || null;
}
exports.getFiberCurrentPropsFromNode = getFiberCurrentPropsFromNode;
function updateFiberProps(node, props) {
    node.set(internalEventHandlersKey, props);
}
exports.updateFiberProps = updateFiberProps;
//# sourceMappingURL=ComponentTree.js.map

/***/ }),

/***/ "../node_modules/react-nativescript/dist/client/ElementRegistry.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var absolute_layout_1 = __webpack_require__("tns-core-modules/ui/layouts/absolute-layout/absolute-layout");
exports.AbsoluteLayout = absolute_layout_1.AbsoluteLayout;
var action_bar_1 = __webpack_require__("tns-core-modules/ui/action-bar/action-bar");
exports.ActionBar = action_bar_1.ActionBar;
exports.ActionItem = action_bar_1.ActionItem;
exports.NavigationButton = action_bar_1.NavigationButton;
var activity_indicator_1 = __webpack_require__("tns-core-modules/ui/activity-indicator/activity-indicator");
exports.ActivityIndicator = activity_indicator_1.ActivityIndicator;
var animation_1 = __webpack_require__("tns-core-modules/ui/animation/animation");
exports.Animation = animation_1.Animation;
var button_1 = __webpack_require__("tns-core-modules/ui/button/button");
exports.Button = button_1.Button;
var image_cache_1 = __webpack_require__("tns-core-modules/ui/image-cache/image-cache");
exports.Cache = image_cache_1.Cache;
var color_1 = __webpack_require__("tns-core-modules/color/color");
exports.Color = color_1.Color;
var view_1 = __webpack_require__("tns-core-modules/ui/core/view/view");
exports.ContainerView = view_1.ContainerView;
var content_view_1 = __webpack_require__("tns-core-modules/ui/content-view");
exports.ContentView = content_view_1.ContentView;
var date_picker_1 = __webpack_require__("tns-core-modules/ui/date-picker/date-picker");
exports.DatePicker = date_picker_1.DatePicker;
// import { Dialogs } from "tns-core-modules/ui/dialogs/dialogs";
var dock_layout_1 = __webpack_require__("tns-core-modules/ui/layouts/dock-layout/dock-layout");
exports.DockLayout = dock_layout_1.DockLayout;
var editable_text_base_1 = __webpack_require__("tns-core-modules/ui/editable-text-base/editable-text-base");
exports.EditableTextBase = editable_text_base_1.EditableTextBase;
var fade_transition_1 = __webpack_require__("tns-core-modules/ui/transition/fade-transition");
exports.FadeTransition = fade_transition_1.FadeTransition;
var flexbox_layout_1 = __webpack_require__("tns-core-modules/ui/layouts/flexbox-layout/flexbox-layout");
exports.FlexboxLayout = flexbox_layout_1.FlexboxLayout;
// import { FlipTransition } from "tns-core-modules/ui/transition/flip-transition";
var frame_1 = __webpack_require__("tns-core-modules/ui/frame/frame");
exports.Frame = frame_1.Frame;
// import { Gestures } from "tns-core-modules/ui/gestures/gestures";
var grid_layout_1 = __webpack_require__("tns-core-modules/ui/layouts/grid-layout/grid-layout");
exports.GridLayout = grid_layout_1.GridLayout;
var html_view_1 = __webpack_require__("tns-core-modules/ui/html-view/html-view");
exports.HtmlView = html_view_1.HtmlView;
var image_1 = __webpack_require__("tns-core-modules/ui/image/image");
exports.Image = image_1.Image;
var label_1 = __webpack_require__("tns-core-modules/ui/label/label");
exports.Label = label_1.Label;
var layout_base_1 = __webpack_require__("tns-core-modules/ui/layouts/layout-base");
exports.LayoutBase = layout_base_1.LayoutBase;
var list_picker_1 = __webpack_require__("tns-core-modules/ui/list-picker/list-picker");
exports.ListPicker = list_picker_1.ListPicker;
var list_view_1 = __webpack_require__("tns-core-modules/ui/list-view/list-view");
exports.ListView = list_view_1.ListView;
var observable_1 = __webpack_require__("tns-core-modules/data/observable");
exports.Observable = observable_1.Observable;
var page_1 = __webpack_require__("tns-core-modules/ui/page/page");
exports.Page = page_1.Page;
var placeholder_1 = __webpack_require__("tns-core-modules/ui/placeholder/placeholder");
exports.Placeholder = placeholder_1.Placeholder;
var progress_1 = __webpack_require__("tns-core-modules/ui/progress/progress");
exports.Progress = progress_1.Progress;
var proxy_view_container_1 = __webpack_require__("tns-core-modules/ui/proxy-view-container/proxy-view-container");
exports.ProxyViewContainer = proxy_view_container_1.ProxyViewContainer;
var repeater_1 = __webpack_require__("tns-core-modules/ui/repeater/repeater");
exports.Repeater = repeater_1.Repeater;
var scroll_view_1 = __webpack_require__("tns-core-modules/ui/scroll-view/scroll-view");
exports.ScrollView = scroll_view_1.ScrollView;
var search_bar_1 = __webpack_require__("tns-core-modules/ui/search-bar/search-bar");
exports.SearchBar = search_bar_1.SearchBar;
var segmented_bar_1 = __webpack_require__("tns-core-modules/ui/segmented-bar/segmented-bar");
exports.SegmentedBar = segmented_bar_1.SegmentedBar;
var slider_1 = __webpack_require__("tns-core-modules/ui/slider/slider");
exports.Slider = slider_1.Slider;
var slide_transition_1 = __webpack_require__("tns-core-modules/ui/transition/slide-transition");
exports.SlideTransition = slide_transition_1.SlideTransition;
var stack_layout_1 = __webpack_require__("tns-core-modules/ui/layouts/stack-layout/stack-layout");
exports.StackLayout = stack_layout_1.StackLayout;
var style_1 = __webpack_require__("tns-core-modules/ui/styling/style/style");
exports.Style = style_1.Style;
var switch_1 = __webpack_require__("tns-core-modules/ui/switch/switch");
exports.Switch = switch_1.Switch;
var tab_view_1 = __webpack_require__("tns-core-modules/ui/tab-view/tab-view");
exports.TabView = tab_view_1.TabView;
exports.TabViewItem = tab_view_1.TabViewItem;
var text_base_1 = __webpack_require__("tns-core-modules/ui/text-base/text-base");
exports.TextBase = text_base_1.TextBase;
var text_field_1 = __webpack_require__("tns-core-modules/ui/text-field/text-field");
exports.TextField = text_field_1.TextField;
var text_view_1 = __webpack_require__("tns-core-modules/ui/text-view/text-view");
exports.TextView = text_view_1.TextView;
var time_picker_1 = __webpack_require__("tns-core-modules/ui/time-picker/time-picker");
exports.TimePicker = time_picker_1.TimePicker;
var transition_1 = __webpack_require__("tns-core-modules/ui/transition/transition");
exports.Transition = transition_1.Transition;
var view_2 = __webpack_require__("tns-core-modules/ui/core/view");
exports.View = view_2.View;
var view_base_1 = __webpack_require__("tns-core-modules/ui/core/view-base/view-base");
exports.ViewBase = view_base_1.ViewBase;
var web_view_1 = __webpack_require__("tns-core-modules/ui/web-view/web-view");
exports.WebView = web_view_1.WebView;
var wrap_layout_1 = __webpack_require__("tns-core-modules/ui/layouts/wrap-layout/wrap-layout");
exports.WrapLayout = wrap_layout_1.WrapLayout;
var SegmentedBar_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/SegmentedBar.js");
var FormattedString_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/FormattedString.js");
var span_1 = __webpack_require__("tns-core-modules/text/span");
var Label_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/Label.js");
var Button_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/Button.js");
var TextView_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/TextView.js");
var TextField_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/TextField.js");
// const el: TNSElements =  "h9";
// export const elementMap: Record<string, typeof View> = {
// TODO: see Angular implementation: https://github.com/NativeScript/nativescript-angular/blob/master/nativescript-angular/element-registry.ts#L179
// FIXME: provide list of keys (TNSElements) without losing type-safety of Record<string, ConcreteViewConstructor>.
exports.elementMap = {
    // export const elementMap = {
    actionBar: function () { return new action_bar_1.ActionBar(); },
    actionItem: function () { return new action_bar_1.ActionItem(); },
    activityIndicator: function () { return new activity_indicator_1.ActivityIndicator(); },
    // "animation": () => new Animation(),
    // "border": () => new Border()
    // "builder": () => new Builder(),
    button: function () { return new Button_1.RNSFriendlyButton(); },
    contentView: function () { return new content_view_1.ContentView(); },
    datePicker: function () { return new date_picker_1.DatePicker(); },
    formattedString: function () { return new FormattedString_1.RNSFriendlyFormattedString(); },
    span: function () { return new span_1.Span(); },
    // "dialogs": () => new Dialogs(), // No components in here.
    // "editableTextBase": () => new EditableTextBase(),
    htmlView: function () { return new html_view_1.HtmlView(); },
    image: function () { return new image_1.Image(); },
    // "cache": () => new Cache(), // Observable.observable, but doesn't extend View.
    label: function () { return new Label_1.RNSFriendlyLabel(); },
    // "layoutBase": () => new LayoutBase(), // ? A concrete class, but not sure whether you can use it as a view in practice...
    absoluteLayout: function () { return new absolute_layout_1.AbsoluteLayout(); },
    dockLayout: function () { return new dock_layout_1.DockLayout(); },
    flexboxLayout: function () { return new flexbox_layout_1.FlexboxLayout(); },
    gridLayout: function () { return new grid_layout_1.GridLayout(); },
    stackLayout: function () { return new stack_layout_1.StackLayout(); },
    wrapLayout: function () { return new wrap_layout_1.WrapLayout(); },
    listPicker: function () { return new list_picker_1.ListPicker(); },
    listView: function () { return new list_view_1.ListView(); },
    navigationButton: function () { return new action_bar_1.NavigationButton(); },
    placeholder: function () { return new placeholder_1.Placeholder(); },
    progress: function () { return new progress_1.Progress(); },
    proxyViewContainer: function () { return new proxy_view_container_1.ProxyViewContainer(); },
    // "repeater": () => new Repeater(), // Doesn't translate to React properly. Just use a regular LayoutBase instead
    scrollView: function () { return new scroll_view_1.ScrollView(); },
    searchBar: function () { return new search_bar_1.SearchBar(); },
    segmentedBar: function () { return new SegmentedBar_1.RNSFriendlySegmentedBar(); },
    segmentedBarItem: function () { return new segmented_bar_1.SegmentedBarItem(); },
    slider: function () { return new slider_1.Slider(); },
    switch: function () { return new switch_1.Switch(); },
    tabView: function () { return new tab_view_1.TabView(); },
    tabViewItem: function () { return new tab_view_1.TabViewItem(); },
    textView: function () { return new TextView_1.RNSFriendlyTextView(); },
    // "textBase": () => new TextBase(), // ? A concrete class, but not sure whether you can use it as a view in practice...
    textField: function () { return new TextField_1.RNSFriendlyTextField(); },
    timePicker: function () { return new time_picker_1.TimePicker(); },
    // "transition": () => new Transition(),
    // "fadeTransition": () => new FadeTransition(),
    // "flipTransition": () => new FlipTransition(),
    // "slideTransition": () => new SlideTransition(),
    webView: function () { return new web_view_1.WebView(); },
    // There's a whole "styling" folder, but nothing is a component.
    frame: function () { return new frame_1.Frame(); },
    // "view": () => new View(),
    page: function () { return new page_1.Page(); },
};
function register(key, instanceCreator) {
    var incumbent = exports.elementMap[key];
    if (incumbent) {
        // No-op; registration may simply happen as a side-effect each time the module is imported.
        return;
    }
    else {
        exports.elementMap[key] = instanceCreator;
    }
}
exports.register = register;
//# sourceMappingURL=ElementRegistry.js.map

/***/ }),

/***/ "../node_modules/react-nativescript/dist/client/EventHandling.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var console = __webpack_require__("../node_modules/react-nativescript/dist/shared/Logger.js");
function updateListener(node, eventName, currentListener, incomingListener, eventLogName) {
    if (eventLogName === void 0) { eventLogName = eventName; }
    if (currentListener) {
        if (incomingListener) {
            if (incomingListener !== currentListener) {
                console.log("Replacing '" + eventLogName + "' currentListener " + currentListener.toString() + " with an incomingListener " + incomingListener.toString() + ".");
                node.off(eventName, currentListener);
                node.on(eventName, incomingListener);
            }
            else {
                // console.log(`No change to '${eventLogName}' incomingListener.`);
            }
        }
        else {
            console.log("Removing '" + eventLogName + "' listener as there is a currentListener without an incomingListener.");
            node.off(eventName, currentListener);
        }
    }
    else {
        if (incomingListener) {
            console.log("Adding '" + eventLogName + "' incomingListener; currentListener was falsy.");
            node.on(eventName, incomingListener);
        }
    }
}
exports.updateListener = updateListener;
//# sourceMappingURL=EventHandling.js.map

/***/ }),

/***/ "../node_modules/react-nativescript/dist/client/HostConfig.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Code in here referenced from:
 * https://github.com/facebook/react/blob/master/packages/react-dom/src/client/ReactDOMHostConfig.js
 * https://github.com/facebook/react/blob/6a1e6b2f78da3a56aa497902951c6e9ce654eafc/packages/react-native-renderer/src/ReactNativeHostConfig.js
 * ... which both carry the following copyright:
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
// import ReactReconciler = require('react-reconciler');
var ReactReconciler = __webpack_require__("../node_modules/react-reconciler/index.js");
var ElementRegistry_1 = __webpack_require__("../node_modules/react-nativescript/dist/client/ElementRegistry.js");
var ComponentTree_1 = __webpack_require__("../node_modules/react-nativescript/dist/client/ComponentTree.js");
var ReactNativeScriptComponent_1 = __webpack_require__("../node_modules/react-nativescript/dist/client/ReactNativeScriptComponent.js");
var console = __webpack_require__("../node_modules/react-nativescript/dist/shared/Logger.js");
var HostConfigTypes_1 = __webpack_require__("../node_modules/react-nativescript/dist/shared/HostConfigTypes.js");
var noTimeoutValue = undefined;
function isASingleChildContainer(view) {
    return view instanceof ElementRegistry_1.ContentView || view instanceof ElementRegistry_1.Page || view instanceof ElementRegistry_1.ScrollView;
}
// function handleChildrenProp(
//     type: Type,
//     props: Props,
//     rootContainerInstance: Container,
//     hostContext: HostContext,
//     internalInstanceHandle: ReactReconciler.OpaqueHandle,
//     view: View,
//     value: any,
// ){
//     if(value === null){
//         // No children specified.
//         return;
//     }
//     if(Array.isArray(value)){
//         console.warn(`'children' value was array; support is experimental!`);
//     }
//     const valueArray: any[] = Array.isArray(value) ? value : [value];
//     valueArray.forEach((value: any) => {
//         if(hostConfig.shouldSetTextContent(type, props)){
//             if(view instanceof TextBase){
//                 // WARNING: unsure that this is how you're supposed to use HostConfig.
//                 hostConfig.commitTextUpdate(view, "", value);
//                 console.log(`[createInstance() 1e] type: ${type}. after commitTextUpdate():`, view.text);
//             } else {
//                 const tv: TextView = hostConfig.createTextInstance(value, rootContainerInstance, hostContext, internalInstanceHandle) as TextView;
//                 console.warn(`Support for setting textContent of a non-TextBase view is experimental.`);
//                 hostConfig.appendChild(view, tv);
//             }
//         } else {
//             if(!value){
//                 console.warn(`'children' prop's value was ${value}, so skipping.`);
//                 return;
//             }
//             // console.log(`value:`, value);
//             const prospectiveChild = value as React.ReactElement<any, string>;
//             (()=>{
//                 const { children, ...rest } = prospectiveChild.props;
//                 console.warn(`Support for nesting children is experimental. child type: ${prospectiveChild.type}. props:`, { ...rest });
//             })();
//             if(!prospectiveChild.type){
//                 console.warn(`The value of 'prospectiveChild.type' was ${value}, so skipping.`);
//                 return;
//             }
//             const instanceFromChild: ViewBase|TextBase = hostConfig.createInstance(
//                 prospectiveChild.type as Type,
//                 prospectiveChild.props,
//                 rootContainerInstance,
//                 hostContext,
//                 internalInstanceHandle
//             );
//             hostConfig.appendChild(view, instanceFromChild);
//             // hostConfig.appendChild(view, value);
//         }
//     });
// }
// https://medium.com/@agent_hunt/hello-world-custom-react-renderer-9a95b7cd04bc
var hostConfig = {
    getPublicInstance: function (instance) {
        // TODO (this was a complete guess).
        return instance;
    },
    getRootHostContext: function (rootContainerInstance) {
        return {
            isInAParentText: false,
            isInADockLayout: false,
            isInAGridLayout: false,
            isInAnAbsoluteLayout: false,
            isInAFlexboxLayout: false,
        };
    },
    getChildHostContext: function (parentHostContext, type, rootContainerInstance) {
        /*
         * Given the following, wrapped in a Page:
            <RCTFlexboxLayout flexDirection={"row"}>
                <RCTLabel text={"LABEL"}/>
                <RCTButton text={"BUTTON"}/>
            </RCTFlexboxLayout>
         *
         * 'type' evidently refers to the type of the child:
         *
         * When type 'flexboxLayout' passes into here, it will have parentHostContext.isInAFlexboxLayout: false.
         * We return a HostContext with `"isInAFlexboxLayout": true`.
         *
         * When type 'label' or 'button' passes into here, they will then find that
         * parentHostContext.isInAFlexboxLayout === true.
         */
        console.log("[getChildHostContext] type: " + type + "; parentHostContext.isInAFlexboxLayout: " + parentHostContext.isInAFlexboxLayout);
        var prevIsInAParentText = parentHostContext.isInAParentText;
        var prevIsInADockLayout = parentHostContext.isInADockLayout;
        var prevIsInAnAbsoluteLayout = parentHostContext.isInAnAbsoluteLayout;
        var prevIsInAFlexboxLayout = parentHostContext.isInAFlexboxLayout;
        var isInAParentText = type === "label" || type === "textView" || type === "textField" || type === "button";
        var isInADockLayout = type === "dockLayout";
        var isInAGridLayout = type === "gridLayout";
        var isInAnAbsoluteLayout = type === "absoluteLayout";
        var isInAFlexboxLayout = type === "flexboxLayout";
        /* We do have the option here in future to force ancestry based on a previous ancestor
         * (e.g. if we want text styles to cascade to all ancestors). Layout props are only with
         * respect to the immediate parent, however, so no need to do anything special for those.
         *
         * Here we avoid recreating an object that happens to deep-equal parentHostContext.
         */
        if (prevIsInAParentText === isInAParentText &&
            prevIsInADockLayout === isInADockLayout &&
            prevIsInADockLayout === isInAGridLayout &&
            prevIsInAnAbsoluteLayout === isInAnAbsoluteLayout &&
            prevIsInAFlexboxLayout === isInAFlexboxLayout) {
            return parentHostContext;
        }
        else {
            return {
                isInAParentText: isInAParentText,
                isInADockLayout: isInADockLayout,
                isInAGridLayout: isInAGridLayout,
                isInAnAbsoluteLayout: isInAnAbsoluteLayout,
                isInAFlexboxLayout: isInAFlexboxLayout,
            };
        }
    },
    /**
     * This function is called when we have made a in-memory render tree of all the views (Remember we are yet to attach it the the actual root dom node).
     * Here we can do any preparation that needs to be done on the rootContainer before attaching the in memory render tree.
     * For example: In the case of react-dom, it keeps track of all the currently focused elements, disabled events temporarily, etc.
     * @param rootContainerInstance - root dom node you specify while calling render. This is most commonly <div id="root"></div>
     */
    prepareForCommit: function (rootContainerInstance) {
        // TODO
    },
    /**
     * This function gets executed after the inmemory tree has been attached to the root dom element. Here we can do any post attach operations that needs to be done.
     *  For example: react-dom re-enabled events which were temporarily disabled in prepareForCommit and refocuses elements, etc.
     * @param rootContainerInstance - root dom node you specify while calling render. This is most commonly <div id="root"></div>
     */
    resetAfterCommit: function (rootContainerInstance) {
        // TODO
    },
    // TODO: replace parts of this with updateDOMProperties() where applicable
    createInstance: function (type, props, rootContainerInstance, hostContext, internalInstanceHandle) {
        (function () {
            var children = props.children, rest = __rest(props, ["children"]);
            console.log("[createInstance() 1a] type: " + type + ". props:", __assign({}, rest));
        })();
        console.log("[createInstance() 1b] type: " + type + ". rootContainerInstance:", rootContainerInstance);
        var view;
        var viewConstructor = typeof type === "string" ? ElementRegistry_1.elementMap[type] : null;
        if (viewConstructor) {
            if (type === "contentView" && hostContext.isInAParentText) {
                throw new Error("Nesting of <ContentView> within a TextBase is not currently supported.");
            }
            view = viewConstructor(props, rootContainerInstance, hostContext);
            ComponentTree_1.precacheFiberNode(internalInstanceHandle, view);
            ComponentTree_1.updateFiberProps(view, props);
        }
        else {
            if (typeof type === "undefined") {
                throw new Error("HostConfig received undefined type in createInstance.");
            }
            console.log("Type not found in element registry, so must be custom instance; recursing until we get a type in the element registry.");
            var componentFunction = new type(props);
            var createdElement = componentFunction.render();
            return hostConfig.createInstance(createdElement.type, createdElement.props, rootContainerInstance, hostContext, internalInstanceHandle);
        }
        if (hostContext.isInADockLayout && !props.dock) {
            console.warn("Components in a DockLayout should bear the 'dock' property. Undefined behaviour if they don't!");
        }
        if (hostContext.isInAGridLayout && (typeof props.row === "undefined" || typeof props.col === "undefined")) {
            console.warn("Components in a GridLayout should bear both the 'row' and 'col' properties. Undefined behaviour if they don't!");
        }
        if (hostContext.isInAnAbsoluteLayout && (!props.left || !props.top)) {
            console.warn("Components in a GridLayout should bear both the 'top' and 'left' properties, passed as a property rather than a style. Undefined behaviour if they don't!");
        }
        // console.log(`[createInstance() 1c] type: ${type}. constructed:`, view);
        // Object.keys(props).forEach((prop: string) => {
        //     const value: any = props[prop];
        //     /*
        //         Note that in this situation, only <span>One</span> will be shown. Probably handled before it reaches the Host Config though:
        //           <div children={[<span>Two</span>, <span>Three</span>]}>
        //             <span>One</span>
        //         </div>
        //     */
        //     if(prop === "children"){
        //         return handleChildrenProp(
        //             type,
        //             props,
        //             rootContainerInstance,
        //             hostContext,
        //             internalInstanceHandle,
        //             view,
        //             value
        //         );
        //     } else {
        //         setValueForProperty(view, prop, value, false);
        //     }
        // });
        /* finalizeInitialChildren() > setInitialProperties() shall handle props, just as in React DOM. */
        return view;
    },
    appendInitialChild: function (parentInstance, child) {
        console.log("[appendInitialChild()]");
        hostConfig.appendChild(parentInstance, child);
    },
    /**
     * Docs from: https://blog.atulr.com/react-custom-renderer-2/
     * @param parentInstance - the DOM element after appendInitialChild()
     * @param type - the type of Fiber, e.g. "div"
     * @param props - the props to be passed to the host Element.
     * @param rootContainerInstance - root dom node you specify while calling render. This is most commonly <div id="root"></div>
     * @param hostContext - contains the context from the parent node enclosing this node. This is the return value from getChildHostContext of the parent node.
     * @returns A boolean value which decides if commitMount() for this element needs to be called.
     */
    finalizeInitialChildren: function (parentInstance, type, props, rootContainerInstance, hostContext) {
        console.log("finalizeInitialChildren() with parentInstance type: " + type, parentInstance);
        ReactNativeScriptComponent_1.setInitialProperties(parentInstance, type, props, rootContainerInstance, hostContext);
        return false;
    },
    shouldSetTextContent: function (type, props) {
        return typeof props.children === "string" || typeof props.children === "number";
    },
    /**
     * This function is used to deprioritize rendering of some subtrees. Mostly used in cases where the subtree is hidden or offscreen.
     * @param type - the DOM type of the element, e.g. "div"
     * @param props - the props to be passed to the Element.
     */
    shouldDeprioritizeSubtree: function (type, props) {
        return !!props.hidden; // Purely based on React-DOM.
    },
    createTextInstance: function (text, rootContainerInstance, hostContext, internalInstanceHandle) {
        console.log("[createTextInstance] with text: \"" + text + "\"");
        if (!hostContext.isInAParentText) {
            throw new Error("Text strings must be rendered within a component extending <TextBase>.");
        }
        // See createInstance().
        /* Is TextView the most appropriate here? RN uses RCTRawText.
         * Alternative is TextField or Label. TextBase just a base class.
         * Medium tutorial uses: document.createTextNode(text); */
        var textView = new ElementRegistry_1.TextView();
        textView.text = text;
        ComponentTree_1.precacheFiberNode(internalInstanceHandle, textView);
        // TODO: maybe inherit the style information from container..?
        // TODO: also merge in the hostContext (whatever that is).
        return textView;
    },
    scheduleDeferredCallback: function (callback, options) {
        // TODO: check whether default timeout should be 0.
        if (!options)
            options = { timeout: 0 };
        return setTimeout(callback, options.timeout);
    },
    cancelDeferredCallback: function (callbackID) {
        clearTimeout(callbackID);
    },
    setTimeout: function (handler, timeout) {
        return setTimeout(handler, timeout);
    },
    clearTimeout: function (handle) {
        clearTimeout(handle);
    },
    noTimeout: noTimeoutValue,
    now: Date.now,
    isPrimaryRenderer: true,
    supportsMutation: true,
    supportsPersistence: false,
    supportsHydration: false,
    /* Mutation (optional) */
    appendChild: function (parentInstance, child) {
        if (parentInstance === null) {
            console.warn("[appendChild()] parent is null (this is a typical occurrence when rendering a child into a detached tree); shall no-op here: " + parentInstance + " > " + child);
            return;
        }
        if (HostConfigTypes_1.implementsCustomNodeHierarchyManager(parentInstance) && parentInstance.__customHostConfigAppendChild) {
            console.log("[appendChild()] Deferring to customHostConfigAppendChild(): " + parentInstance + " > " + child);
            var handled = parentInstance.__customHostConfigAppendChild(parentInstance, child);
            if (handled) {
                return;
            }
            console.log("[appendChild()] Deferral to customHostConfigAppendChild() didn't handle, so handling with default implementation: " + parent + " > " + child);
        }
        if (child instanceof ElementRegistry_1.Page) {
            console.warn("[appendChild()] Page cannot be appended as a true child; no-op for: " + parentInstance + " > " + child);
            return;
        }
        else if (child instanceof ElementRegistry_1.ActionBar && parentInstance instanceof ElementRegistry_1.Page) {
            console.log("[appendChild()] (Page receiving ActionBar) " + parentInstance + " > " + child);
            parentInstance.actionBar = child;
            return;
        }
        else if (isASingleChildContainer(parentInstance)) {
            console.log("[appendChild()] (single-child container) " + parentInstance + " > " + child);
            /* These elements were originally designed to hold one element only:
             * https://stackoverflow.com/a/55351086/5951226 */
            parentInstance.content = child;
        }
        else if (parentInstance instanceof ElementRegistry_1.LayoutBase) {
            console.log("[appendChild()] (instance of LayoutBase) " + parentInstance + " > " + child);
            parentInstance.addChild(child);
        }
        else if (parentInstance instanceof ElementRegistry_1.ActionBar) {
            if (child instanceof ElementRegistry_1.ActionItem) {
                if (child instanceof ElementRegistry_1.NavigationButton) {
                    console.log("[appendChild()] (instance of NavigationButton) " + parentInstance + " > " + child);
                    parentInstance.navigationButton = child;
                }
                else if (child instanceof ElementRegistry_1.ActionItem) {
                    console.log("[appendChild()] (instance of ActionItem) " + parentInstance + " > " + child);
                    parentInstance.actionItems.addItem(child);
                }
            }
            else {
                // Take to be titleView
                console.log("[appendChild()] (not ActionItem; assumed to be titleView) " + parentInstance + " > " + child);
                parentInstance.titleView = child;
            }
        }
        else if (parentInstance instanceof ElementRegistry_1.ActionItem) {
            // Same for both ActionItem and NavigationButton.
            parentInstance.actionView = child;
        }
        else if (parentInstance instanceof ElementRegistry_1.TabView && child instanceof ElementRegistry_1.TabViewItem) {
            console.log("[appendChild()] Remapping TabViewItem from child to item: " + parentInstance + " > " + child + ", where the child's view was " + child.view + " and the parent's items were:", parentInstance.items);
            /* We must go through the setter rather than simply mutate the existing array. */
            var newItems = __spread((parentInstance.items || []), [child]);
            parentInstance.items = newItems;
            // console.log(`[appendChild()] parentInstance.items now updated to:`, parentInstance.items);
        }
        else if (parentInstance instanceof ElementRegistry_1.TabViewItem) {
            console.log("[appendChild()] (instance of TabViewItem) " + parentInstance + " > " + child);
            parentInstance.view = child;
        }
        else {
            console.log("[appendChild()] (default clause) " + parentInstance + " > " + child);
            parentInstance._addView(child);
        }
        // TODO: check whether a property/event change should be fired.
    },
    appendChildToContainer: function (container, child) {
        console.log("[appendChildToContainer()] deferring to appendChild(): " + container + " > " + child);
        hostConfig.appendChild(container, child);
        // TODO: check whether a property/event change should be fired.
    },
    commitTextUpdate: function (textInstance, oldText, newText) {
        console.log("[commitTextUpdate()]", textInstance);
        textInstance.text = newText;
        // e.g.: https://github.com/NativeScript/NativeScript/blob/master/tns-core-modules/data/observable/observable.ts#L53
        textInstance.notifyPropertyChange("text", newText, oldText);
    },
    /**
     * From: https://blog.atulr.com/react-custom-renderer-2/
     * This function is called for every element that has set the return value of finalizeInitialChildren() to true. This method is called after all the steps are done (ie after resetAfterCommit), meaning the entire tree has been attached to the dom.
     * This method is mainly used in react-dom for implementing autofocus. This method exists in react-dom only and not in react-native.
     * @param instance
     * @param type
     * @param newProps
     * @param internalInstanceHandle
     */
    commitMount: function (instance, type, newProps, internalInstanceHandle) {
        console.log("commitMount() with type: " + type, instance);
        instance.focus();
    },
    /**
     * From: https://blog.atulr.com/react-custom-renderer-3/
     * Expanded on in: https://hackernoon.com/learn-you-some-custom-react-renderers-aed7164a4199
     * @param instance - the current DOM instance of the Node.
     * @param type - the type of fiber, e.g. "div".
     * @param oldProps - props before this update.
     * @param newProps - incoming props.
     * @param rootContainerInstance - root dom node you specify while calling render. This is most commonly <div id="root"></div>
     * @param hostContext - contains the context from the parent node enclosing this node. This is the return value from getChildHostContext of the parent node.
     * @returns This function should return a payload object. Payload is a Javascript object that can contain information on what needs to be changed on this host element.
     */
    prepareUpdate: function (instance, type, oldProps, newProps, rootContainerInstance, hostContext) {
        console.log("prepareUpdate() with type: " + type, instance);
        // if ((global as any).__DEV__) {
        //     const hostContextDev: HostContextDev = hostContext as HostContextDev;
        //     if (
        //         typeof newProps.children !== typeof oldProps.children &&
        //         (typeof newProps.children === 'string' ||
        //             typeof newProps.children === 'number')
        //     ) {
        //         const str: string = '' + newProps.children;
        //         const ownAncestorInfo = updatedAncestorInfo(
        //             hostContextDev.ancestorInfo,
        //             type as string,
        //         );
        //         validateDOMNesting(null, str, ownAncestorInfo);
        //     }
        // }
        // (()=>{
        //     const { children, ...rest } = oldProps;
        //     console.log(`About to run diffProperties on ${instance}. oldProps:`, { ...rest });
        // })();
        // (()=>{
        //     const { children, ...rest } = newProps;
        //     console.log(`About to run diffProperties on ${instance}. newProps:`, { ...rest });
        // })();
        var diffed = ReactNativeScriptComponent_1.diffProperties(instance, type, oldProps, newProps, rootContainerInstance);
        // console.log(`[prepareUpdate] for ${instance}, diffed:`, diffed);
        return diffed === null
            ? null
            : {
                hostContext: hostContext,
                updates: diffed,
            };
        // return {}; // Simply return a non-null value to permit commitUpdate();
        // return null;
    },
    commitUpdate: function (instance, updatePayload, type, oldProps, newProps, internalInstanceHandle) {
        // console.log(`commitUpdate() with type: ${type}`, instance);
        // Update the props handle so that we know which props are the ones with
        // with current event handlers.
        ComponentTree_1.updateFiberProps(instance, newProps);
        // Apply the diff to the DOM node.
        ReactNativeScriptComponent_1.updateProperties(instance, updatePayload.updates, type, oldProps, newProps, updatePayload.hostContext);
    },
    insertBefore: function (parentInstance, child, beforeChild) {
        console.log("[HostConfig.insertBefore] " + parentInstance + " > " + child + " beforeChild " + beforeChild);
        if (HostConfigTypes_1.implementsCustomNodeHierarchyManager(parentInstance) && parentInstance.__customHostConfigInsertBefore) {
            console.log("[insertBefore()] Deferring to customHostConfigInsertBefore(): " + parentInstance + " > " + child + " beforeChild " + beforeChild);
            var handled = parentInstance.__customHostConfigInsertBefore(parentInstance, child, beforeChild);
            if (handled) {
                return;
            }
            console.log("[insertBefore()] Deferral to customHostConfigInsertBefore() didn't handle, so handling with default implementation: " + parentInstance + " > " + child + " beforeChild " + beforeChild);
        }
        if (parentInstance instanceof ElementRegistry_1.LayoutBase) {
            /* TODO: implement this for GridLayout, if feeling brave! An example use case (and test case) would help. */
            if (parentInstance instanceof ElementRegistry_1.GridLayout) {
                console.warn("HostConfig.insertBefore() LayoutBase implementation has not been tested specifically for GridLayout!");
                // addChildAtCell(view: View, row: number, column: number, rowSpan?: number, columnSpan?: number): void;
            }
            /* Implementation from:
             * https://github.com/nativescript-vue/nativescript-vue/blob/master/platform/nativescript/renderer/ViewNode.js#L164
             * https://github.com/nativescript-vue/nativescript-vue/blob/master/platform/nativescript/renderer/utils.js#L32
             */
            if (child.parent === parentInstance) {
                var index = parentInstance.getChildIndex(child);
                if (index !== -1) {
                    console.log("[HostConfig.insertBefore] Provisionally calling " + parentInstance + ".removeChild(" + child + ").");
                    parentInstance.removeChild(child);
                }
            }
            var atIndex = parentInstance.getChildIndex(beforeChild);
            if (atIndex === -1) {
                console.log("[HostConfig.insertBefore] calculated atIndex as " + atIndex + "; shall call: " + parentInstance + ".addChild(" + child + ")");
                parentInstance.addChild(child);
            }
            else {
                console.log("[HostConfig.insertBefore] calculated atIndex as " + atIndex + "; shall call: " + parentInstance + ".insertChild(" + child + ", " + atIndex + ")");
                parentInstance.insertChild(child, atIndex);
            }
        }
        else {
            console.warn("[HostConfig.insertBefore] parentInstance was not a LayoutBase, so deferring to hostConfig.appendChild() with: " + parentInstance + " > " + child + " beforeChild " + beforeChild);
            hostConfig.appendChild(parentInstance, child);
        }
        // /* TODO: implement this for GridLayout, if feeling brave! An example use case (and test case) would help. */
        // if(parentInstance instanceof GridLayout){
        //     console.warn(`HostConfig.insertBefore() not implemented for GridLayout!`);
        //     // addChildAtCell(view: View, row: number, column: number, rowSpan?: number, columnSpan?: number): void;
        // }
        // // TODO: Refer to {N}Vue's implementation: https://github.com/nativescript-vue/nativescript-vue/blob/master/platform/nativescript/renderer/ViewNode.js#L157
        // let beforeChildIndex: number = 0;
        // parentInstance.eachChild((viewBase: ViewBase) => {
        //     if(viewBase === beforeChild){
        //         return false;
        //     } else {
        //         beforeChildIndex++;
        //         return true;
        //     }
        // });
        // console.log(`[HostConfig.insertBefore] calculated beforeChildIndex as ${beforeChildIndex}; shall call: ${parentInstance}._addView(${child}, ${beforeChildIndex})`);
        // parentInstance._addView(child, beforeChildIndex);
    },
    /**
     * From: https://blog.atulr.com/react-custom-renderer-3/
     * This function is called whenever an element needs to insertedBefore the top most level component (Root component) itself.
     * @param container - the root container node to which a the child node needs to be inserted.
     * @param child - the dom node that needs to be inserted.
     * @param beforeChild - the child node before which the new child node needs to be inserted.
     */
    insertInContainerBefore: function (container, child, beforeChild) {
        console.log("[insertInContainerBefore()] deferring to insertBefore(): " + container + " > " + child);
        return hostConfig.insertInContainerBefore(container, child, beforeChild);
    },
    removeChild: function (parent, child) {
        if (parent === null) {
            // TODO: consult React expert here!
            console.warn("[removeChild()] parent is null (this is a typical occurrence when unmounting a Portal that was rendered into a null parent); shall no-op here, but totally unsure whether this leaks memory: " + parent + " x " + child);
            return;
        }
        if (HostConfigTypes_1.implementsCustomNodeHierarchyManager(parent) && parent.__customHostConfigRemoveChild) {
            console.log("[removeChild()] Deferring to customHostConfigRemoveChild(): " + parent + " x " + child);
            var handled = parent.__customHostConfigRemoveChild(parent, child);
            if (handled) {
                return;
            }
            console.log("[removeChild()] Deferral to customHostConfigRemoveChild() didn't handle, so handling with default implementation: " + parent + " x " + child);
        }
        if (child instanceof ElementRegistry_1.Page) {
            console.warn("[remove()] Page was never a real child in the first place, so no-op. " + parent + " x " + child);
            return;
        }
        else if (isASingleChildContainer(parent)) {
            console.log("[removeChild()] instance of single-child parent: " + parent + " x " + child);
            /* These elements were originally designed to hold one element only:
             * https://stackoverflow.com/a/55351086/5951226 */
            console.warn("[removeChild()] TODO: Check whether \"parent.content = null\" will indeed remove the content.");
            parent.content = null;
        }
        else if (parent instanceof ElementRegistry_1.LayoutBase) {
            /** For logging purposes only **/
            var childrenBefore_1 = [];
            parent.eachChild(function (viewBase) {
                childrenBefore_1.push(viewBase);
                return true;
            });
            console.log("[removeChild()] parent instance of LayoutBase. Current children: [" + childrenBefore_1 + "]: " + parent + " x " + child);
            /*******************************/
            parent.removeChild(child);
            /** For logging purposes only **/
            var childrenAfter_1 = [];
            parent.eachChild(function (viewBase) {
                childrenAfter_1.push(viewBase);
                return true;
            });
            console.log("[removeChild()] completed. Children now: [" + childrenAfter_1 + "]");
            /*******************************/
        }
        else if (child instanceof ElementRegistry_1.ActionBar && parent instanceof ElementRegistry_1.Page) {
            console.log("[removeChild()] Detaching ActionBar from Page forbidden in NativeScript Core, so no-op: " + parent + " x " + child);
            return;
        }
        else if (parent instanceof ElementRegistry_1.ActionBar) {
            if (child instanceof ElementRegistry_1.ActionItem) {
                if (child instanceof ElementRegistry_1.NavigationButton) {
                    console.log("[removeChild()] (instance of NavigationButton) " + parent + " x " + child);
                    parent.navigationButton = null; // Anything falsy should work.
                }
                else if (child instanceof ElementRegistry_1.ActionItem) {
                    console.log("[removeChild()] (instance of ActionItem) " + parent + " x " + child);
                    parent.actionItems.removeItem(child);
                }
            }
            else {
                // Take to be titleView
                console.log("[removeChild()] (not ActionItem; assumed to be titleView) " + parent + " x " + child);
                parent.titleView = null;
            }
        }
        else if (parent instanceof ElementRegistry_1.ActionItem) {
            // Same for both ActionItem and NavigationButton.
            parent.actionView = null;
        }
        else if (parent instanceof ElementRegistry_1.TabView && child instanceof ElementRegistry_1.TabViewItem) {
            console.log("[removeChild()] " + parent + " x " + child);
            if (!parent.items) {
                parent.items = [];
            }
            parent.items = parent.items.filter(function (i) { return i !== child; });
        }
        else if (parent instanceof ElementRegistry_1.TabViewItem) {
            console.log("[removeChild()] Detaching view from TabViewItem not supported in NativeScript Core, so no-op: " + parent + " x " + child);
            return;
        }
        else {
            console.log("[removeChild()] default clause: " + parent + " x " + child);
            parent._removeView(child);
        }
    },
    removeChildFromContainer: function (container, child) {
        console.log("[removeChildFromContainer()] deferring to removeChild(): " + container + " > " + child);
        return hostConfig.removeChild(container, child);
    },
    resetTextContent: function (instance) {
        if (instance instanceof ElementRegistry_1.TextBase) {
            var oldText = instance.text;
            instance.text = "";
            instance.notifyPropertyChange("text", "", oldText);
        }
        else {
            console.warn("resetTextContent() stub called on a non-TextBase View. Text-resetting is only implemented for instances extending TextBase.");
        }
    },
};
exports.reactReconcilerInst = ReactReconciler(hostConfig);
//# sourceMappingURL=HostConfig.js.map

/***/ }),

/***/ "../node_modules/react-nativescript/dist/client/NativeScriptPropertyOperations.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dock_layout_1 = __webpack_require__("tns-core-modules/ui/layouts/dock-layout/dock-layout");
var grid_layout_1 = __webpack_require__("tns-core-modules/ui/layouts/grid-layout/grid-layout");
var absolute_layout_1 = __webpack_require__("tns-core-modules/ui/layouts/absolute-layout/absolute-layout");
var flexbox_layout_1 = __webpack_require__("tns-core-modules/ui/layouts/flexbox-layout/flexbox-layout");
var platform_1 = __webpack_require__("tns-core-modules/platform/platform");
var console = __webpack_require__("../node_modules/react-nativescript/dist/shared/Logger.js");
/**
 * Code in here referenced from: https://github.com/facebook/react/blob/master/packages/react-dom/src/client/DOMPropertyOperations.js which carries the following copyright:
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in React-LICENSE.txt.
 */
/**
 * TODO: much more work here. Handle styles and event listeners, for example.
 * Sets the value for a property on a node.
 *
 * @param {DOMElement} node
 * @param {string} name
 * @param {*} value
 */
function setValueForProperty(instance, name, value, isCustomComponentTag, hostContext) {
    // const propertyInfo = getPropertyInfo(name);
    // if (shouldIgnoreAttribute(name, propertyInfo, isCustomComponentTag)) {
    //     return;
    // }
    // if (shouldRemoveAttribute(name, value, propertyInfo, isCustomComponentTag)) {
    //     value = null;
    // }
    // // If the prop isn't in the special list, treat it as a simple attribute.
    // if (isCustomComponentTag || propertyInfo === null) {
    //     if (isAttributeNameSafe(name)) {
    //         const attributeName = name;
    //         if (value === null) {
    //             instance.removeAttribute(attributeName);
    //         } else {
    //             instance.setAttribute(attributeName, '' + (value: any));
    //         }
    //     }
    //     return;
    // }
    // const {mustUseProperty} = propertyInfo;
    // if (mustUseProperty) {
    //     const {propertyName} = propertyInfo;
    //     if (value === null) {
    //         const {type} = propertyInfo;
    //         (instance: any)[propertyName] = type === BOOLEAN ? false : '';
    //     } else {
    //         // Contrary to `setAttribute`, object properties are properly
    //         // `toString`ed by IE8/9.
    //         (instance: any)[propertyName] = value;
    //     }
    //     return;
    // }
    // // The rest are treated as attributes with special cases.
    // const {attributeName, attributeNamespace} = propertyInfo;
    // if (value === null) {
    //     instance.removeAttribute(attributeName);
    // } else {
    //     const {type} = propertyInfo;
    //     let attributeValue;
    //     if (type === BOOLEAN || (type === OVERLOADED_BOOLEAN && value === true)) {
    //         attributeValue = '';
    //     } else {
    //         // `setAttribute` with objects becomes only `[object]` in IE8/9,
    //         // ('' + value) makes it output the correct toString()-value.
    //         attributeValue = '' + (value: any);
    //         if (propertyInfo.sanitizeURL) {
    //             sanitizeURL(attributeValue);
    //         }
    //     }
    //     if (attributeNamespace) {
    //         instance.setAttributeNS(attributeNamespace, attributeName, attributeValue);
    //     } else {
    //         instance.setAttribute(attributeName, attributeValue);
    //     }
    // }
    if (name === "class") {
        // console.warn(`Note that 'class' is remapped to 'className'.`);
        instance.set("className", value);
    }
    else if ((name === "rows" || name === "columns") && instance instanceof grid_layout_1.GridLayout) {
        if (name === "rows") {
            /* Clear any existing rows; would be more efficient to do a diff, but hard to get right. */
            if (instance.getRows().length > 0) {
                instance.removeRows();
            }
            value.forEach(function (item) {
                instance.addRow(item);
            });
        }
        else if (name === "columns") {
            /* Clear any existing columns; would be more efficient to do a diff, but hard to get right. */
            if (instance.getColumns().length > 0) {
                instance.removeColumns();
            }
            instance.removeColumns();
            value.forEach(function (item) {
                instance.addColumn(item);
            });
        }
    }
    else if ((name === "alignSelf" ||
        name === "flexGrow" ||
        name === "flexShrink" ||
        name === "flexWrapBefore" ||
        name === "order") &&
        hostContext.isInAFlexboxLayout) {
        if (name === "alignSelf") {
            flexbox_layout_1.FlexboxLayout.setAlignSelf(instance, value);
        }
        else if (name === "flexGrow") {
            flexbox_layout_1.FlexboxLayout.setFlexGrow(instance, value);
        }
        else if (name === "flexShrink") {
            flexbox_layout_1.FlexboxLayout.setFlexShrink(instance, value);
        }
        else if (name === "flexWrapBefore") {
            flexbox_layout_1.FlexboxLayout.setFlexWrapBefore(instance, value);
        }
        else if (name === "order") {
            flexbox_layout_1.FlexboxLayout.setOrder(instance, value);
        }
    }
    else if ((name === "top" || name === "left") && hostContext.isInAnAbsoluteLayout) {
        /* FIXME: Determine whether it makes sense for top/left to be applied upon the instance    * itself if component is ever removed from its AbsoluteLayout parent (and how to do so). */
        if (name === "top") {
            absolute_layout_1.AbsoluteLayout.setTop(instance, value);
        }
        else if (name === "left") {
            absolute_layout_1.AbsoluteLayout.setLeft(instance, value);
        }
    }
    else if (name === "dock" && hostContext.isInADockLayout) {
        // https://github.com/NativeScript/NativeScript/blob/05c2460fc4989dae4d7fa1ee52f6d54e0c3113f5/tns-core-modules/ui/layouts/dock-layout/dock-layout-common.ts
        /* If the component is subsequently removed from its Dock parent, I'm guessing that
         * this property probably has no effect, so no need to figure out how to unset it. */
        dock_layout_1.DockLayout.setDock(instance, value);
    }
    else if ((name === "row" || name === "column" || name === "rowSpan" || name === "columnSpan") &&
        hostContext.isInAGridLayout) {
        // https://github.com/NativeScript/nativescript-sdk-examples-js/blob/master/app/ns-ui-widgets-category/layouts/grid-layout/grid-layout-ts-page.ts
        /* If the component is subsequently removed from its Grid parent, I'm guessing that
         * this property probably has no effect, so no need to figure out how to unset it. */
        if (name === "row") {
            grid_layout_1.GridLayout.setRow(instance, value);
        }
        else if (name === "rowSpan") {
            grid_layout_1.GridLayout.setRowSpan(instance, value);
        }
        else if (name === "column") {
            grid_layout_1.GridLayout.setColumn(instance, value);
        }
        else if (name === "columnSpan") {
            grid_layout_1.GridLayout.setColumnSpan(instance, value);
        }
        // } else if(
        //     name === "color" && instance instanceof ActionBar ||
        //     name === "backgroundColor" && instance instanceof ActionBar
        // ){
        /* Looks like instance.set() suffices for this case; but will keep this
         * implementation commented out here just in case I've missed something. */
        // } else if(name === "view" && instance instanceof TabViewItem){
        //     // console.log(`[setValueForProperty] SETTING .view on ${instance}. Value:`, value);
        //     (instance as TabViewItem).view = value;
    }
    else if ((name === "ios" && platform_1.isIOS) || (name === "android" && platform_1.isAndroid)) {
        /* These props, at least in ActionItem, are read-only, so must be set recursively instead. */
        if (typeof value === "object") {
            var keys = Object.keys(value);
            if (keys.length === 0)
                return;
            console.log("[PropOp] got platform-specific prop of type object");
            keys.forEach(function (key) {
                var subValue = value[key];
                if (name === "ios") {
                    console.log("[PropOp] Setting " + instance + ".ios." + key + " = " + subValue);
                    instance.ios[key] = subValue;
                }
                else if (name === "android") {
                    console.log("[PropOp] Setting " + instance + ".android." + key + " = " + subValue);
                    instance.android[key] = subValue;
                }
            });
        }
        else {
            console.warn("[PropOp] got platform-specific non-object prop");
            /* Some poor soul has probably set an ios|android prop with boolean value or something */
            instance.set(name, value);
        }
    }
    else if (name === "__rns__nodeTreeRole") {
        console.log("[PropOp] got node-tree role");
        instance.set(name, value);
    }
    else {
        /* FIXME: ensure that we're only calling instance.set() for a valid View/Observable property;
         * many props, e.g. "frameRateMs", may purely be for the use of custom components. */
        instance.set(name, value);
        // TODO: should probably notify of property change, too..?
    }
}
exports.setValueForProperty = setValueForProperty;
//# sourceMappingURL=NativeScriptPropertyOperations.js.map

/***/ }),

/***/ "../node_modules/react-nativescript/dist/client/ReactNativeScript.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Code in here referenced from: https://github.com/gaearon/react/blob/1c7af862246e24574540f05c459f5fac0fad7086/src/renderers/dom/fiber/ReactDOMFiberEntry.js which carries the following copyright:
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * They have since moved to a MIT-style licence, which is reproduced in React-LICENSE.txt.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var HostConfig_1 = __webpack_require__("../node_modules/react-nativescript/dist/client/HostConfig.js");
var ReactPortal_1 = __webpack_require__("../node_modules/react-nativescript/dist/client/ReactPortal.js");
var application_1 = __webpack_require__("tns-core-modules/application");
var AbsoluteLayout_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/AbsoluteLayout.js");
exports.$AbsoluteLayout = AbsoluteLayout_1.AbsoluteLayout;
var ActionBar_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/ActionBar.js");
exports.$ActionBar = ActionBar_1.ActionBar;
var ActionItem_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/ActionItem.js");
exports.$ActionItem = ActionItem_1.ActionItem;
var Button_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/Button.js");
exports.$Button = Button_1.Button;
var Frame_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/Frame.js");
exports.$Frame = Frame_1.Frame;
var ActivityIndicator_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/ActivityIndicator.js");
exports.$ActivityIndicator = ActivityIndicator_1.ActivityIndicator;
var DatePicker_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/DatePicker.js");
exports.$DatePicker = DatePicker_1.DatePicker;
var ScrollView_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/ScrollView.js");
exports.$ScrollView = ScrollView_1.ScrollView;
var SearchBar_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/SearchBar.js");
exports.$SearchBar = SearchBar_1.SearchBar;
var SegmentedBar_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/SegmentedBar.js");
exports.$SegmentedBar = SegmentedBar_1.SegmentedBar;
var SegmentedBarItem_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/SegmentedBarItem.js");
exports.$SegmentedBarItem = SegmentedBarItem_1.SegmentedBarItem;
var Slider_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/Slider.js");
exports.$Slider = Slider_1.Slider;
var DockLayout_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/DockLayout.js");
exports.$DockLayout = DockLayout_1.DockLayout;
var FlexboxLayout_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/FlexboxLayout.js");
exports.$FlexboxLayout = FlexboxLayout_1.FlexboxLayout;
var FormattedString_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/FormattedString.js");
exports.$FormattedString = FormattedString_1.FormattedString;
var Span_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/Span.js");
exports.$Span = Span_1.Span;
var GridLayout_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/GridLayout.js");
exports.$GridLayout = GridLayout_1.GridLayout;
var HtmlView_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/HtmlView.js");
exports.$HtmlView = HtmlView_1.HtmlView;
var Label_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/Label.js");
exports.$Label = Label_1.Label;
var ListView_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/ListView.js");
exports.$ListView = ListView_1.ListView;
var ListPicker_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/ListPicker.js");
exports.$ListPicker = ListPicker_1.ListPicker;
// import { Portal as $Portal } from "../components/Portal";
var NavigationButton_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/NavigationButton.js");
exports.$NavigationButton = NavigationButton_1.NavigationButton;
var Placeholder_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/Placeholder.js");
exports.$Placeholder = Placeholder_1.Placeholder;
var Progress_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/Progress.js");
exports.$Progress = Progress_1.Progress;
var StackLayout_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/StackLayout.js");
exports.$StackLayout = StackLayout_1.StackLayout;
var Switch_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/Switch.js");
exports.$Switch = Switch_1.Switch;
var TextField_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/TextField.js");
exports.$TextField = TextField_1.TextField;
var TextView_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/TextView.js");
exports.$TextView = TextView_1.TextView;
var TabView_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/TabView.js");
exports.$TabView = TabView_1.TabView;
var TabViewItem_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/TabViewItem.js");
exports.$TabViewItem = TabViewItem_1.TabViewItem;
var TimePicker_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/TimePicker.js");
exports.$TimePicker = TimePicker_1.TimePicker;
var ContentView_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/ContentView.js");
exports.$ContentView = ContentView_1.ContentView;
var WebView_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/WebView.js");
exports.$WebView = WebView_1.WebView;
var WrapLayout_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/WrapLayout.js");
exports.$WrapLayout = WrapLayout_1.WrapLayout;
var Page_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/Page.js");
exports.$Page = Page_1.Page;
var Image_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/Image.js");
exports.$Image = Image_1.Image;
var console = __webpack_require__("../node_modules/react-nativescript/dist/shared/Logger.js");
// declare global {
//     var __DEV__: boolean|undefined;
// }
// declare let __DEV__: boolean|undefined;
// https://blog.atulr.com/react-custom-renderer-1/
function createPortal(children, 
// ReactFabric passes in a containerTag rather than a container; hope it can figure out how to re-use a root when the container is null :/
container, key) {
    if (key === void 0) { key = null; }
    // invariant(
    //   isValidContainer(container),
    //   'Target container is not a DOM element.',
    // );
    // TODO (from Facebook): pass ReactDOM portal implementation as third argument
    var portal = ReactPortal_1.createPortal(children, container, null, key);
    // console.log(`Created portal:`, portal);
    return portal;
}
exports.createPortal = createPortal;
var roots = new Map();
/**
 * React NativeScript can render into any container that extends View,
 * but it makes sense to use the Frame > Page model if your whole app
 * (rather than a portion of it) will be described using React NativeScript.
 *
 * @param reactElement - Your <App/> component.
 * @param domElement - Your root component; typically Page, but can be any View. Accepts null for a detached tree.
 * @param callback - A callback to run after the component (typically <App/>) is rendered.
 * @param containerTag - A unique key by which to keep track of the root (useful when the domElement is null).
 * 'roots' with reference to: https://github.com/facebook/react/blob/ef4ac42f8893afd0240d2679db7438f1b599bbd4/packages/react-native-renderer/src/ReactFabric.js#L119
 * @returns a ref to the container.
 */
function render(reactElement, domElement, callback, containerTag) {
    if (callback === void 0) { callback = function () { return undefined; }; }
    if (containerTag === void 0) { containerTag = null; }
    var key = containerTag || domElement;
    var root = roots.get(key);
    if (!root) {
        root = HostConfig_1.reactReconcilerInst.createContainer(domElement, false, false);
        roots.set(key, root);
    }
    HostConfig_1.reactReconcilerInst.updateContainer(reactElement, root, null, callback);
    return HostConfig_1.reactReconcilerInst.getPublicRootInstance(root);
}
exports.render = render;
// https://github.com/facebook/react/blob/61f62246c8cfb76a4a19d1661eeaa5822ec37b36/packages/react-native-renderer/src/ReactNativeRenderer.js#L139
/**
 * Calls removeChildFromContainer() to make the container remove its immediate child.
 * If said container is null (i.e. a detached tree), note that null.removeChild() doesn't exist, so it's a no-op.
 * Either way, it'll delete our reference to the root and thus should remove the React association from it.
 * @param containerTag - the key uniquely identifying this root (either the container itself, or a string).
 */
function unmountComponentAtNode(containerTag) {
    var root = roots.get(containerTag);
    if (!root)
        return;
    // TODO (from FB): Is it safe to reset this now or should I wait since this unmount could be deferred?
    HostConfig_1.reactReconcilerInst.updateContainer(null, root, null, function () {
        roots.delete(containerTag);
    });
}
exports.unmountComponentAtNode = unmountComponentAtNode;
/**
 * Convenience function to start your React NativeScript app.
 * This should be placed as the final line of your app.ts file, as no
 * code will run after it (at least on iOS).
 *
 * @param app - Your <App/> component.
 * @param refToApp - ref to the root element of <App/>.
 *
 * You can create a ref like so:
 *   const refToApp: React.RefObject<any> = React.createRef<any>();
 */
function start(app, refToApp) {
    var existingRootView = application_1.getRootView();
    var _hasLaunched = application_1.hasLaunched();
    console.log("[ReactNativeScript.ts] start(). hasLaunched(): " + _hasLaunched + " existing rootView was: " + existingRootView);
    if (_hasLaunched || existingRootView) {
        console.log("[ReactNativeScript.ts] start() called again - hot reload, so shall no-op");
        /* As typings say, indeed reloadPage() doesn't exist. Maybe it's just a Vue thing. */
        // if(existingRootView instanceof Frame){
        //     console.log(`[renderIntoRootView] hot reload: calling reloadPage() on root frame`);
        //     if(existingRootView.currentPage){
        //         (existingRootView as any).reloadPage();
        //     }
        // }
        return;
    }
    application_1.run({
        create: function () {
            render(app, null, function () { return console.log("Container updated!"); }, "__APP_ROOT__");
            return refToApp.current;
        },
    });
}
exports.start = start;
//# sourceMappingURL=ReactNativeScript.js.map

/***/ }),

/***/ "../node_modules/react-nativescript/dist/client/ReactNativeScriptComponent.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Code in here referenced from: https://github.com/facebook/react/blob/master/packages/react-dom/src/client/ReactDOMComponent.js which carries the following copyright:
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in React-LICENSE.txt.
 */
var assertValidProps_1 = __webpack_require__("../node_modules/react-nativescript/dist/shared/assertValidProps.js");
var text_base_1 = __webpack_require__("tns-core-modules/ui/text-base/text-base");
var CSSPropertyOperations_1 = __webpack_require__("../node_modules/react-nativescript/dist/shared/CSSPropertyOperations.js");
var NativeScriptPropertyOperations_1 = __webpack_require__("../node_modules/react-nativescript/dist/client/NativeScriptPropertyOperations.js");
var console = __webpack_require__("../node_modules/react-nativescript/dist/shared/Logger.js");
var DANGEROUSLY_SET_INNER_HTML = "dangerouslySetInnerHTML";
var SUPPRESS_CONTENT_EDITABLE_WARNING = "suppressContentEditableWarning";
var SUPPRESS_HYDRATION_WARNING = "suppressHydrationWarning";
var AUTOFOCUS = "autoFocus";
var CHILDREN = "children";
var TEXT = "text";
var STYLE = "style";
var HTML = "__html";
// const TEXT_NODE: string = '';
function setTextContent(node, text) {
    /* No concept of text nodes in NativeScript as far as I know... */
    // if (text) {
    //     let firstChild;
    //     let i: number = 0;
    //     node.eachChild((child: ViewBase) => {
    //         if(i === 0){
    //             firstChild = child;
    //         } else if(i > 0){
    //             return false;
    //         }
    //         i++;
    //         return true;
    //     });
    //     const isLastChild: boolean = firstChild && i === 1;
    //     if (
    //         firstChild &&
    //         isLastChild &&
    //         // firstChild.nodeType === TEXT_NODE
    //         typeof firstChild === "string" || typeof firstChild === "number"
    //     ) {
    //         const oldText: string = firstChild.text;
    //         firstChild.text = text;
    //         firstChild.notifyPropertyChange("text", text, oldText);
    //         return;
    //     }
    // }
    if (node instanceof text_base_1.TextBase) {
        var oldText = node.text;
        node.text = text;
        node.notifyPropertyChange("text", text, oldText);
    }
    else {
        console.warn("setTextContent() content incorrectly called on non-TextBase!");
    }
}
function setInitialProperties(domElement, tag, rawProps, rootContainerElement, hostContext) {
    // const isCustomComponentTag = isCustomComponent(tag, rawProps);
    // if ((global as any).__DEV__) {
    // 	validatePropertiesInDevelopment(tag, rawProps);
    // 	if (
    // 		isCustomComponentTag &&
    // 		!didWarnShadyDOM &&
    // 		(domElement: any).shadyRoot
    // 	) {
    // 		warning(
    // 			false,
    // 			'%s is using shady DOM. Using shady DOM with React can ' +
    // 				'cause things to break subtly.',
    // 			getCurrentFiberOwnerNameInDevOrNull() || 'A component',
    // 		);
    // 		didWarnShadyDOM = true;
    // 	}
    // }
    // TODO: Make sure that we check isMounted before firing any of these events.
    // let props: Object;
    // switch (tag) {
    // 	case 'iframe':
    // 	case 'object':
    // 		trapBubbledEvent(TOP_LOAD, domElement);
    // 		props = rawProps;
    // 		break;
    // 	case 'video':
    // 	case 'audio':
    // 		// Create listener for each media event
    // 		for (let i = 0; i < mediaEventTypes.length; i++) {
    // 			trapBubbledEvent(mediaEventTypes[i], domElement);
    // 		}
    // 		props = rawProps;
    // 		break;
    // 	case 'source':
    // 		trapBubbledEvent(TOP_ERROR, domElement);
    // 		props = rawProps;
    // 		break;
    // 	case 'img':
    // 	case 'image':
    // 	case 'link':
    // 		trapBubbledEvent(TOP_ERROR, domElement);
    // 		trapBubbledEvent(TOP_LOAD, domElement);
    // 		props = rawProps;
    // 		break;
    // 	case 'form':
    // 		trapBubbledEvent(TOP_RESET, domElement);
    // 		trapBubbledEvent(TOP_SUBMIT, domElement);
    // 		props = rawProps;
    // 		break;
    // 	case 'details':
    // 		trapBubbledEvent(TOP_TOGGLE, domElement);
    // 		props = rawProps;
    // 		break;
    // 	case 'input':
    // 		ReactDOMInputInitWrapperState(domElement, rawProps);
    // 		props = ReactDOMInputGetHostProps(domElement, rawProps);
    // 		trapBubbledEvent(TOP_INVALID, domElement);
    // 		// For controlled components we always need to ensure we're listening
    // 		// to onChange. Even if there is no listener.
    // 		ensureListeningTo(rootContainerElement, 'onChange');
    // 		break;
    // 	case 'option':
    // 		ReactDOMOptionValidateProps(domElement, rawProps);
    // 		props = ReactDOMOptionGetHostProps(domElement, rawProps);
    // 		break;
    // 	case 'select':
    // 		ReactDOMSelectInitWrapperState(domElement, rawProps);
    // 		props = ReactDOMSelectGetHostProps(domElement, rawProps);
    // 		trapBubbledEvent(TOP_INVALID, domElement);
    // 		// For controlled components we always need to ensure we're listening
    // 		// to onChange. Even if there is no listener.
    // 		ensureListeningTo(rootContainerElement, 'onChange');
    // 		break;
    // 	case 'textarea':
    // 		ReactDOMTextareaInitWrapperState(domElement, rawProps);
    // 		props = ReactDOMTextareaGetHostProps(domElement, rawProps);
    // 		trapBubbledEvent(TOP_INVALID, domElement);
    // 		// For controlled components we always need to ensure we're listening
    // 		// to onChange. Even if there is no listener.
    // 		ensureListeningTo(rootContainerElement, 'onChange');
    // 		break;
    // 	default:
    // 		props = rawProps;
    // }
    var props = rawProps;
    assertValidProps_1.default(tag, props);
    setInitialDOMProperties(tag, domElement, rootContainerElement, props, false, hostContext);
    // switch (tag) {
    // 	case 'input':
    // 		// TODO: Make sure we check if this is still unmounted or do any clean
    // 		// up necessary since we never stop tracking anymore.
    // 		track((domElement: any));
    // 		ReactDOMInputPostMountWrapper(domElement, rawProps, false);
    // 		break;
    // 	case 'textarea':
    // 		// TODO: Make sure we check if this is still unmounted or do any clean
    // 		// up necessary since we never stop tracking anymore.
    // 		track((domElement: any));
    // 		ReactDOMTextareaPostMountWrapper(domElement, rawProps);
    // 		break;
    // 	case 'option':
    // 		ReactDOMOptionPostMountWrapper(domElement, rawProps);
    // 		break;
    // 	case 'select':
    // 		ReactDOMSelectPostMountWrapper(domElement, rawProps);
    // 		break;
    // 	default:
    // 		if (typeof props.onClick === 'function') {
    // 			// TODO: This cast may not be sound for SVG, MathML or custom elements.
    // 			trapClickOnNonInteractiveElement(((domElement: any): HTMLElement));
    // 		}
    // 		break;
    // }
}
exports.setInitialProperties = setInitialProperties;
function setInitialDOMProperties(tag, domElement, rootContainerElement, nextProps, isCustomComponentTag, hostContext) {
    // console.log(`[setInitialDOMProperties] for: ${domElement}`);
    for (var propKey in nextProps) {
        if (!nextProps.hasOwnProperty(propKey)) {
            continue;
        }
        var nextProp = nextProps[propKey];
        if (propKey === STYLE) {
            if (global.__DEV__) {
                if (nextProp) {
                    // Freeze the next style object so that we can assume it won't be
                    // mutated. We have already warned for this in the past.
                    Object.freeze(nextProp);
                }
            }
            // Relies on `updateStylesByID` not mutating `styleUpdates`.
            CSSPropertyOperations_1.setValueForStyles(domElement, nextProp);
            // } else if (propKey === DANGEROUSLY_SET_INNER_HTML) {
            // 	const nextHtml = nextProp ? nextProp[HTML] : undefined;
            // 	if (nextHtml != null) {
            // 		setInnerHTML(domElement, nextHtml);
            // 	}
        }
        else if (propKey === CHILDREN) {
            if (typeof nextProp === "string") {
                // Avoid setting initial textContent when the text is empty. In IE11 setting
                // textContent on a <textarea> will cause the placeholder to not
                // show within the <textarea> until it has been focused and blurred again.
                // https://github.com/facebook/react/issues/6731#issuecomment-254874553
                var canSetTextContent = tag !== "textarea" || nextProp !== "";
                if (canSetTextContent) {
                    setTextContent(domElement, nextProp);
                }
            }
            else if (typeof nextProp === "number") {
                setTextContent(domElement, "" + nextProp);
            }
        }
        else if (propKey === SUPPRESS_CONTENT_EDITABLE_WARNING || propKey === SUPPRESS_HYDRATION_WARNING) {
            // Noop
        }
        else if (propKey === AUTOFOCUS) {
            // We polyfill it separately on the client during commit.
            // We could have excluded it in the property list instead of
            // adding a special case here, but then it wouldn't be emitted
            // on server rendering (but we *do* want to emit it in SSR).
            // } else if (registrationNameModules.hasOwnProperty(propKey)) {
            // 	if (nextProp != null) {
            // 		if (__DEV__ && typeof nextProp !== 'function') {
            // 			warnForInvalidEventListener(propKey, nextProp);
            // 		}
            // 		ensureListeningTo(rootContainerElement, propKey);
            // 	}
        }
        else if (nextProp != null) {
            NativeScriptPropertyOperations_1.setValueForProperty(domElement, propKey, nextProp, isCustomComponentTag, hostContext);
        }
    }
}
exports.setInitialDOMProperties = setInitialDOMProperties;
function updateDOMProperties(instance, updatePayload, wasCustomComponentTag, isCustomComponentTag, hostContext) {
    // console.log(`[updateDOMProperties] for: ${instance}`);
    // TODO: Handle wasCustomComponentTag
    for (var i = 0; i < updatePayload.length; i += 2) {
        var propKey = updatePayload[i];
        var propValue = updatePayload[i + 1];
        if (propKey === STYLE) {
            CSSPropertyOperations_1.setValueForStyles(instance, propValue);
            // } else if (propKey === DANGEROUSLY_SET_INNER_HTML) {
            //     setInnerHTML(instance, propValue);
        }
        else if (propKey === CHILDREN) {
            /* The fact that React DOM don't handle child nesting here suggests that
             * it has already been filtered out beforehand, and children can only be
             * text content by this point. */
            setTextContent(instance, propValue);
        }
        else if (propKey === TEXT && instance instanceof text_base_1.TextBase) {
            setTextContent(instance, propValue);
        }
        else {
            // console.log(`[updateDOMProperties] calling setValueForProperty on ${instance} for propKey: ${propKey}; value:`, propValue);
            NativeScriptPropertyOperations_1.setValueForProperty(instance, propKey, propValue, isCustomComponentTag, hostContext);
        }
    }
}
exports.updateDOMProperties = updateDOMProperties;
function diffProperties(domElement, tag, lastRawProps, nextRawProps, rootContainerElement) {
    // if(__DEV__){
    //   validatePropertiesInDevelopment(tag, nextRawProps);
    // }
    var updatePayload = null;
    var lastProps = lastRawProps;
    var nextProps = nextRawProps;
    // switch(tag){
    //   case 'input':
    //     lastProps = ReactDOMInputGetHostProps(domElement, lastRawProps);
    //     nextProps = ReactDOMInputGetHostProps(domElement, nextRawProps);
    //     updatePayload = [];
    //     break;
    //   case 'option':
    //     lastProps = ReactDOMOptionGetHostProps(domElement, lastRawProps);
    //     nextProps = ReactDOMOptionGetHostProps(domElement, nextRawProps);
    //     updatePayload = [];
    //     break;
    //   case 'select':
    //     lastProps = ReactDOMSelectGetHostProps(domElement, lastRawProps);
    //     nextProps = ReactDOMSelectGetHostProps(domElement, nextRawProps);
    //     updatePayload = [];
    //     break;
    //   case 'textarea':
    //     lastProps = ReactDOMTextareaGetHostProps(domElement, lastRawProps);
    //     nextProps = ReactDOMTextareaGetHostProps(domElement, nextRawProps);
    //     updatePayload = [];
    //     break;
    //   default:
    //     lastProps = lastRawProps;
    //     nextProps = nextRawProps;
    //     if (
    //       typeof lastProps.onClick !== 'function' &&
    //       typeof nextProps.onClick === 'function'
    //     ) {
    //       // TODO: This cast may not be sound for SVG, MathML or custom elements.
    //       trapClickOnNonInteractiveElement(((domElement: any): HTMLElement));
    //     }
    //     break;
    // }
    if (typeof tag === "string") {
        assertValidProps_1.default(tag, nextProps);
    }
    else {
        console.warn("TODO: determine whether a custom component may pass through client/ReactNativeScriptComponent.diffProperties()");
    }
    var propKey;
    var styleName;
    var styleUpdates = null;
    for (propKey in lastProps) {
        if (nextProps.hasOwnProperty(propKey) || !lastProps.hasOwnProperty(propKey) || lastProps[propKey] == null) {
            // console.log(`[diffProperties] skipping on lastProps key:`, propKey);
            continue;
        }
        if (propKey === STYLE) {
            var lastStyle = lastProps[propKey];
            for (styleName in lastStyle) {
                if (lastStyle.hasOwnProperty(styleName)) {
                    if (!styleUpdates) {
                        styleUpdates = {};
                    }
                    styleUpdates[styleName] = "";
                }
            }
        }
        else if (propKey === DANGEROUSLY_SET_INNER_HTML || propKey === CHILDREN) {
            // Noop. This is handled by the clear text mechanism.
            console.warn("[diffProperties] propKey === CHILDREN; Noop. This is handled by the clear text mechanism.");
        }
        else if (propKey === SUPPRESS_CONTENT_EDITABLE_WARNING || propKey === SUPPRESS_HYDRATION_WARNING) {
            // Noop
        }
        else if (propKey === AUTOFOCUS) {
            // Noop. It doesn't work on updates anyway.
            // } else if (registrationNameModules.hasOwnProperty(propKey)) {
            //     // This is a special case. If any listener updates we need to ensure
            //     // that the "current" fiber pointer gets updated so we need a commit
            //     // to update this element.
            //     if (!updatePayload) {
            //         updatePayload = [];
            //     }
        }
        else {
            console.log("[diffProperties] INSPECTING OLDPROPS key:", propKey);
            // For all other deleted properties we add it to the queue. We use
            // the whitelist in the commit phase instead.
            (updatePayload = updatePayload || []).push(propKey, null);
        }
    }
    // console.log(`[diffProperties] updatePayload as of lastProp`, updatePayload);
    for (propKey in nextProps) {
        var nextProp = nextProps[propKey];
        var lastProp = lastProps != null ? lastProps[propKey] : undefined;
        if (!nextProps.hasOwnProperty(propKey) || nextProp === lastProp || (nextProp == null && lastProp == null)) {
            // console.log(`[diffProperties] skipping on nextProps key:`, propKey);
            continue;
        }
        if (propKey === STYLE) {
            if (global.__DEV__) {
                if (nextProp) {
                    // Freeze the next style object so that we can assume it won't be
                    // mutated. We have already warned for this in the past.
                    Object.freeze(nextProp);
                }
            }
            if (lastProp) {
                // Unset styles on `lastProp` but not on `nextProp`.
                for (styleName in lastProp) {
                    if (lastProp.hasOwnProperty(styleName) && (!nextProp || !nextProp.hasOwnProperty(styleName))) {
                        if (!styleUpdates) {
                            styleUpdates = {};
                        }
                        styleUpdates[styleName] = "";
                    }
                }
                // Update styles that changed since `lastProp`.
                for (styleName in nextProp) {
                    if (nextProp.hasOwnProperty(styleName) && lastProp[styleName] !== nextProp[styleName]) {
                        if (!styleUpdates) {
                            styleUpdates = {};
                        }
                        styleUpdates[styleName] = nextProp[styleName];
                    }
                }
            }
            else {
                // Relies on `updateStylesByID` not mutating `styleUpdates`.
                if (!styleUpdates) {
                    if (!updatePayload) {
                        updatePayload = [];
                    }
                    updatePayload.push(propKey, styleUpdates);
                }
                styleUpdates = nextProp;
            }
            // } else if (propKey === DANGEROUSLY_SET_INNER_HTML) {
            //     const nextHtml = nextProp ? nextProp[HTML] : undefined;
            //     const lastHtml = lastProp ? lastProp[HTML] : undefined;
            //     if (nextHtml != null) {
            //         if (lastHtml !== nextHtml) {
            //             (updatePayload = updatePayload || []).push(propKey, '' + nextHtml);
            //         }
            //     } else {
            //         // TODO: It might be too late to clear this if we have children
            //         // inserted already.
            //     }
        }
        else if (propKey === CHILDREN) {
            // console.log(`[diffProperties] got propKey === CHILDREN.`);
            // console.log(`[diffProperties] lastProp`, lastProp);
            // console.log(`[diffProperties] nextProp`, nextProp);
            if (lastProp !== nextProp && (typeof nextProp === "string" || typeof nextProp === "number")) {
                (updatePayload = updatePayload || []).push(propKey, "" + nextProp);
            }
            else {
                // console.log(`[diffProperties] not pushing for propKey === CHILDREN.`);
            }
        }
        else if (propKey === SUPPRESS_CONTENT_EDITABLE_WARNING || propKey === SUPPRESS_HYDRATION_WARNING) {
            // Noop
            // } else if (registrationNameModules.hasOwnProperty(propKey)) {
            //     if (nextProp != null) {
            //         // We eagerly listen to this even though we haven't committed yet.
            //         if (__DEV__ && typeof nextProp !== 'function') {
            //             warnForInvalidEventListener(propKey, nextProp);
            //         }
            //         ensureListeningTo(rootContainerElement, propKey);
            //     }
            //     if (!updatePayload && lastProp !== nextProp) {
            //         // This is a special case. If any listener updates we need to ensure
            //         // that the "current" props pointer gets updated so we need a commit
            //         // to update this element.
            //         updatePayload = [];
            //     }
        }
        else {
            // console.log(`[diffProperties] INSPECTING NEWPROPS key and nextProp`, propKey, nextProp);
            // For any other property we always add it to the queue and then we
            // filter it out using the whitelist during the commit.
            (updatePayload = updatePayload || []).push(propKey, nextProp);
        }
    }
    if (styleUpdates) {
        // if (__DEV__) {
        //     validateShorthandPropertyCollisionInDev(styleUpdates, nextProps[STYLE]);
        // }
        (updatePayload = updatePayload || []).push(STYLE, styleUpdates);
    }
    // console.log(`[diffProperties] updatePayload as of nextProp:`, updatePayload);
    return updatePayload;
}
exports.diffProperties = diffProperties;
function updateProperties(instance, updatePayload, type, lastRawProps, nextRawProps, hostContext) {
    // Update checked *before* name.
    // In the middle of an update, it is possible to have multiple checked.
    // When a checked radio tries to change name, browser makes another radio's checked false.
    // if (
    //     tag === 'input' &&
    //     nextRawProps.type === 'radio' &&
    //     nextRawProps.name != null
    // ) {
    //     ReactDOMInputUpdateChecked(instance, nextRawProps);
    // }
    /* More relevant to HTML. */
    // const wasCustomComponentTag = isCustomComponent(tag, lastRawProps);
    // const isCustomComponentTag = isCustomComponent(tag, nextRawProps);
    // Apply the diff.
    updateDOMProperties(instance, updatePayload, false, false, hostContext);
    /* TODO: I Won't be implementing these for now. */
    // switch (tag) {
    //     case 'input':
    //         // Update the wrapper around inputs *after* updating props. This has to
    //         // happen after `updateDOMProperties`. Otherwise HTML5 input validations
    //         // raise warnings and prevent the new value from being assigned.
    //         ReactDOMInputUpdateWrapper(instance, nextRawProps);
    //         break;
    //     case 'textarea':
    //         ReactDOMTextareaUpdateWrapper(instance, nextRawProps);
    //         break;
    //     case 'select':
    //         // <select> value update needs to occur after <option> children
    //         // reconciliation
    //         ReactDOMSelectPostUpdateWrapper(instance, nextRawProps);
    //         break;
    // }
}
exports.updateProperties = updateProperties;
//# sourceMappingURL=ReactNativeScriptComponent.js.map
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../node_modules/react-nativescript/dist/client/ReactPortal.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Code in here referenced from: https://github.com/facebook/react/blob/b87aabdfe1b7461e7331abb3601d9e6bb27544bc/packages/shared/ReactPortal.js which carries the following copyright:
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in React-LICENSE.txt.
 */
var hasSymbol = typeof Symbol === "function" && Symbol.for;
function createPortal(children, containerInfo, 
// TODO: figure out the API for cross-renderer implementation.
implementation, key) {
    if (key === void 0) { key = null; }
    return {
        // This tag allow us to uniquely identify this as a React Portal
        //@ts-ignore
        // $$typeof: (global as any).REACT_PORTAL_TYPE,
        $$typeof: hasSymbol ? Symbol.for("react.portal") : 0xeaca,
        key: key == null ? null : "" + key,
        children: children,
        containerInfo: containerInfo,
        implementation: implementation,
    };
}
exports.createPortal = createPortal;
//# sourceMappingURL=ReactPortal.js.map

/***/ }),

/***/ "../node_modules/react-nativescript/dist/client/shallowEqual.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var hasOwnProperty = Object.prototype.hasOwnProperty;
/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x, y) {
    // SameValue algorithm
    if (x === y) {
        // Steps 1-5, 7-10
        // Steps 6.b-6.e: +0 != -0
        // Added the nonzero y check to make Flow happy, but it is redundant
        return x !== 0 || y !== 0 || 1 / x === 1 / y;
    }
    else {
        // Step 6.a: NaN == NaN
        return x !== x && y !== y;
    }
}
/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
function shallowEqual(objA, objB) {
    if (is(objA, objB)) {
        return true;
    }
    if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) {
        return false;
    }
    var keysA = Object.keys(objA);
    var keysB = Object.keys(objB);
    if (keysA.length !== keysB.length) {
        return false;
    }
    // Test for A's keys different from B.
    for (var i = 0; i < keysA.length; i++) {
        if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
            return false;
        }
    }
    return true;
}
exports.shallowEqual = shallowEqual;
//# sourceMappingURL=shallowEqual.js.map

/***/ }),

/***/ "../node_modules/react-nativescript/dist/components/AbsoluteLayout.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__("../node_modules/react/index.js");
var LayoutBase_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/LayoutBase.js");
/**
 * A React Absoluteper around the NativeScript AbsoluteLayout component.
 * See: ui/layouts/absolute-layout
 */
var _AbsoluteLayout = /** @class */ (function (_super) {
    __extends(_AbsoluteLayout, _super);
    function _AbsoluteLayout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    _AbsoluteLayout.prototype.render = function () {
        var _a = this.props, forwardedRef = _a.forwardedRef, onLoaded = _a.onLoaded, onUnloaded = _a.onUnloaded, onAndroidBackPressed = _a.onAndroidBackPressed, onShowingModally = _a.onShowingModally, onShownModally = _a.onShownModally, onTap = _a.onTap, onDoubleTap = _a.onDoubleTap, onPinch = _a.onPinch, onPan = _a.onPan, onSwipe = _a.onSwipe, onRotation = _a.onRotation, onLongPress = _a.onLongPress, onTouch = _a.onTouch, onPropertyChange = _a.onPropertyChange, children = _a.children, rest = __rest(_a, ["forwardedRef", "onLoaded", "onUnloaded", "onAndroidBackPressed", "onShowingModally", "onShownModally", "onTap", "onDoubleTap", "onPinch", "onPan", "onSwipe", "onRotation", "onLongPress", "onTouch", "onPropertyChange", "children"]);
        return React.createElement("absoluteLayout", __assign({}, rest, { ref: forwardedRef || this.myRef }), children);
    };
    return _AbsoluteLayout;
}(LayoutBase_1.RCTLayoutBase));
exports._AbsoluteLayout = _AbsoluteLayout;
exports.AbsoluteLayout = React.forwardRef(function (props, ref) {
    var children = props.children, rest = __rest(props, ["children"]);
    return React.createElement(_AbsoluteLayout, __assign({}, rest, { forwardedRef: ref }), children);
});
//# sourceMappingURL=AbsoluteLayout.js.map

/***/ }),

/***/ "../node_modules/react-nativescript/dist/components/ActionBar.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__("../node_modules/react/index.js");
var View_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/View.js");
/**
 * Provides an abstraction over the ActionBar (android) and NavigationBar (iOS).
 */
var _ActionBar = /** @class */ (function (_super) {
    __extends(_ActionBar, _super);
    function _ActionBar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    _ActionBar.prototype.render = function () {
        var _a = this.props, forwardedRef = _a.forwardedRef, onLoaded = _a.onLoaded, onUnloaded = _a.onUnloaded, onAndroidBackPressed = _a.onAndroidBackPressed, onShowingModally = _a.onShowingModally, onShownModally = _a.onShownModally, onTap = _a.onTap, onDoubleTap = _a.onDoubleTap, onPinch = _a.onPinch, onPan = _a.onPan, onSwipe = _a.onSwipe, onRotation = _a.onRotation, onLongPress = _a.onLongPress, onTouch = _a.onTouch, onPropertyChange = _a.onPropertyChange, children = _a.children, rest = __rest(_a, ["forwardedRef", "onLoaded", "onUnloaded", "onAndroidBackPressed", "onShowingModally", "onShownModally", "onTap", "onDoubleTap", "onPinch", "onPan", "onSwipe", "onRotation", "onLongPress", "onTouch", "onPropertyChange", "children"]);
        return React.createElement("actionBar", __assign({}, rest, { ref: forwardedRef || this.myRef }), children // Any child that's not an ActionItem or NavigationButton will be set to titleView.
        );
    };
    return _ActionBar;
}(View_1.RCTView));
exports.ActionBar = React.forwardRef(function (props, ref) {
    var children = props.children, rest = __rest(props, ["children"]);
    return React.createElement(_ActionBar, __assign({}, rest, { forwardedRef: ref }), children);
});
//# sourceMappingURL=ActionBar.js.map

/***/ }),

/***/ "../node_modules/react-nativescript/dist/components/ActionItem.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__("../node_modules/react/index.js");
var ViewBase_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/ViewBase.js");
var EventHandling_1 = __webpack_require__("../node_modules/react-nativescript/dist/client/EventHandling.js");
/**
 * A React wrapper around the NativeScript ActionItem component.
 *
 * See: ui/action-bar/action-bar
 * See: https://docs.nativescript.org/ui/action-bar#action-items
 * See: https://github.com/NativeScript/nativescript-sdk-examples-js/tree/master/app/ns-ui-widgets-category/action-bar/items-actionbar
 */
var _ActionItem = /** @class */ (function (_super) {
    __extends(_ActionItem, _super);
    function _ActionItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     *
     * @param attach true: attach; false: detach; null: update
     */
    _ActionItem.prototype.updateListeners = function (node, attach, nextProps) {
        _super.prototype.updateListeners.call(this, node, attach, nextProps);
        if (attach === null) {
            EventHandling_1.updateListener(node, "tap", this.props.onTap, nextProps.onTap);
        }
        else {
            var method = (attach ? node.on : node.off).bind(node);
            if (this.props.onTap)
                method("tap", this.props.onTap);
        }
    };
    _ActionItem.prototype.render = function () {
        var _a = this.props, forwardedRef = _a.forwardedRef, onPropertyChange = _a.onPropertyChange, children = _a.children, 
        // actionView, /* We disallow this at the typings level. */
        rest = __rest(_a, ["forwardedRef", "onPropertyChange", "children"]);
        return React.createElement("actionItem", __assign({}, rest, { ref: forwardedRef || this.myRef }), children);
    };
    return _ActionItem;
}(ViewBase_1.RCTViewBase));
exports._ActionItem = _ActionItem;
exports.ActionItem = React.forwardRef(function (props, ref) {
    var children = props.children, rest = __rest(props, ["children"]);
    return React.createElement(_ActionItem, __assign({}, rest, { forwardedRef: ref }), children);
});
//# sourceMappingURL=ActionItem.js.map

/***/ }),

/***/ "../node_modules/react-nativescript/dist/components/ActivityIndicator.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__("../node_modules/react/index.js");
var View_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/View.js");
var _ActivityIndicator = /** @class */ (function (_super) {
    __extends(_ActivityIndicator, _super);
    function _ActivityIndicator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // static defaultProps = {
    //     forwardedRef: React.createRef<NativeScriptActivityIndicator>()
    // };
    _ActivityIndicator.prototype.render = function () {
        var _a = this.props, forwardedRef = _a.forwardedRef, onLoaded = _a.onLoaded, onUnloaded = _a.onUnloaded, onAndroidBackPressed = _a.onAndroidBackPressed, onShowingModally = _a.onShowingModally, onShownModally = _a.onShownModally, onTap = _a.onTap, onDoubleTap = _a.onDoubleTap, onPinch = _a.onPinch, onPan = _a.onPan, onSwipe = _a.onSwipe, onRotation = _a.onRotation, onLongPress = _a.onLongPress, onTouch = _a.onTouch, onPropertyChange = _a.onPropertyChange, children = _a.children, rest = __rest(_a, ["forwardedRef", "onLoaded", "onUnloaded", "onAndroidBackPressed", "onShowingModally", "onShownModally", "onTap", "onDoubleTap", "onPinch", "onPan", "onSwipe", "onRotation", "onLongPress", "onTouch", "onPropertyChange", "children"]);
        return React.createElement("activityIndicator", __assign({}, rest, { ref: forwardedRef || this.myRef }), children);
    };
    return _ActivityIndicator;
}(View_1.RCTView));
exports._ActivityIndicator = _ActivityIndicator;
exports.ActivityIndicator = React.forwardRef(function (props, ref) {
    var children = props.children, rest = __rest(props, ["children"]);
    return React.createElement(_ActivityIndicator, __assign({}, rest, { forwardedRef: ref }), children);
});
//# sourceMappingURL=ActivityIndicator.js.map

/***/ }),

/***/ "../node_modules/react-nativescript/dist/components/Button.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var console = __webpack_require__("../node_modules/react-nativescript/dist/shared/Logger.js");
var React = __webpack_require__("../node_modules/react/index.js");
var button_1 = __webpack_require__("tns-core-modules/ui/button/button");
var TextBase_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/TextBase.js");
exports.RNSFriendlyButton = TextBase_1.RNSFriendly(button_1.Button);
var elementKey = "button";
/**
 * A React wrapper around the NativeScript Button component.
 * https://facebook.github.io/react-native/docs/button#color
 */
var _Button = /** @class */ (function (_super) {
    __extends(_Button, _super);
    function _Button() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    _Button.prototype.render = function () {
        var _a;
        var _b = this.props, forwardedRef = _b.forwardedRef, onLoaded = _b.onLoaded, onUnloaded = _b.onUnloaded, onAndroidBackPressed = _b.onAndroidBackPressed, onShowingModally = _b.onShowingModally, onShownModally = _b.onShownModally, onTap = _b.onTap, onDoubleTap = _b.onDoubleTap, onPinch = _b.onPinch, onPan = _b.onPan, onSwipe = _b.onSwipe, onRotation = _b.onRotation, onLongPress = _b.onLongPress, onTouch = _b.onTouch, onPropertyChange = _b.onPropertyChange, text = _b.text, formattedText = _b.formattedText, children = _b.children, rest = __rest(_b, ["forwardedRef", "onLoaded", "onUnloaded", "onAndroidBackPressed", "onShowingModally", "onShownModally", "onTap", "onDoubleTap", "onPinch", "onPan", "onSwipe", "onRotation", "onLongPress", "onTouch", "onPropertyChange", "text", "formattedText", "children"]);
        if (text && formattedText) {
            console.warn("Both text and formattedText provided; shall use formattedText.");
        }
        var textContent = (_a = {},
            _a[formattedText ? "formattedText" : "text"] = formattedText || text,
            _a);
        return React.createElement(elementKey, __assign({ className: "btn btn-primary btn-active" }, rest, textContent, { ref: forwardedRef || this.myRef }), children // Weird that a button may contain children, but what do I know.
        );
    };
    return _Button;
}(TextBase_1.RCTTextBase));
exports._Button = _Button;
exports.Button = React.forwardRef(function (props, ref) {
    var children = props.children, rest = __rest(props, ["children"]);
    return React.createElement(_Button, __assign({}, rest, { forwardedRef: ref }), children);
});
//# sourceMappingURL=Button.js.map

/***/ }),

/***/ "../node_modules/react-nativescript/dist/components/ContainerView.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var View_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/View.js");
/**
 * Base class for all UI components that are containers.
 */
var RCTContainerView = /** @class */ (function (_super) {
    __extends(RCTContainerView, _super);
    function RCTContainerView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RCTContainerView;
}(View_1.RCTView));
exports.RCTContainerView = RCTContainerView;
//# sourceMappingURL=ContainerView.js.map

/***/ }),

/***/ "../node_modules/react-nativescript/dist/components/ContentView.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__("../node_modules/react/index.js");
var View_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/View.js");
var _ContentView = /** @class */ (function (_super) {
    __extends(_ContentView, _super);
    function _ContentView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // static defaultProps = {
    //     forwardedRef: React.createRef<NativeScriptContentView>()
    // };
    _ContentView.prototype.render = function () {
        var _a = this.props, forwardedRef = _a.forwardedRef, onLoaded = _a.onLoaded, onUnloaded = _a.onUnloaded, onAndroidBackPressed = _a.onAndroidBackPressed, onShowingModally = _a.onShowingModally, onShownModally = _a.onShownModally, onTap = _a.onTap, onDoubleTap = _a.onDoubleTap, onPinch = _a.onPinch, onPan = _a.onPan, onSwipe = _a.onSwipe, onRotation = _a.onRotation, onLongPress = _a.onLongPress, onTouch = _a.onTouch, onPropertyChange = _a.onPropertyChange, children = _a.children, rest = __rest(_a, ["forwardedRef", "onLoaded", "onUnloaded", "onAndroidBackPressed", "onShowingModally", "onShownModally", "onTap", "onDoubleTap", "onPinch", "onPan", "onSwipe", "onRotation", "onLongPress", "onTouch", "onPropertyChange", "children"]);
        return React.createElement("contentView", __assign({}, rest, { ref: forwardedRef || this.myRef }), children);
    };
    return _ContentView;
}(View_1.RCTView));
exports._ContentView = _ContentView;
exports.ContentView = React.forwardRef(function (props, ref) {
    var children = props.children, rest = __rest(props, ["children"]);
    return React.createElement(_ContentView, __assign({}, rest, { forwardedRef: ref }), children);
});
//# sourceMappingURL=ContentView.js.map

/***/ }),

/***/ "../node_modules/react-nativescript/dist/components/CustomLayoutView.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ContainerView_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/ContainerView.js");
/**
 * Base class for all UI components that implement custom layouts.
 */
var RCTCustomLayoutView = /** @class */ (function (_super) {
    __extends(RCTCustomLayoutView, _super);
    function RCTCustomLayoutView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RCTCustomLayoutView;
}(ContainerView_1.RCTContainerView));
exports.RCTCustomLayoutView = RCTCustomLayoutView;
//# sourceMappingURL=CustomLayoutView.js.map

/***/ }),

/***/ "../node_modules/react-nativescript/dist/components/DatePicker.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var console = __webpack_require__("../node_modules/react-nativescript/dist/shared/Logger.js");
var React = __webpack_require__("../node_modules/react/index.js");
var View_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/View.js");
var _DatePicker = /** @class */ (function (_super) {
    __extends(_DatePicker, _super);
    function _DatePicker() {
        // static defaultProps = {
        //     forwardedRef: React.createRef<NativeScriptDatePicker>()
        // };
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onDateChange = function (args) {
            var date = args.object.date;
            _this.props.onDateChange && _this.props.onDateChange(date);
        };
        return _this;
    }
    _DatePicker.prototype.componentDidMount = function () {
        _super.prototype.componentDidMount.call(this);
        var node = this.getCurrentRef();
        if (!node) {
            console.warn("React ref to NativeScript View lost, so unable to update event listeners.");
            return;
        }
        node.on("dateChange", this.onDateChange);
    };
    _DatePicker.prototype.componentWillUnmount = function () {
        _super.prototype.componentWillUnmount.call(this);
        var node = this.getCurrentRef();
        if (!node) {
            console.warn("React ref to NativeScript View lost, so unable to update event listeners.");
            return;
        }
        node.off("dateChange", this.onDateChange);
    };
    _DatePicker.prototype.render = function () {
        var _a = this.props, forwardedRef = _a.forwardedRef, onLoaded = _a.onLoaded, onUnloaded = _a.onUnloaded, onAndroidBackPressed = _a.onAndroidBackPressed, onShowingModally = _a.onShowingModally, onShownModally = _a.onShownModally, onTap = _a.onTap, onDoubleTap = _a.onDoubleTap, onPinch = _a.onPinch, onPan = _a.onPan, onSwipe = _a.onSwipe, onRotation = _a.onRotation, onLongPress = _a.onLongPress, onTouch = _a.onTouch, onPropertyChange = _a.onPropertyChange, children = _a.children, rest = __rest(_a, ["forwardedRef", "onLoaded", "onUnloaded", "onAndroidBackPressed", "onShowingModally", "onShownModally", "onTap", "onDoubleTap", "onPinch", "onPan", "onSwipe", "onRotation", "onLongPress", "onTouch", "onPropertyChange", "children"]);
        return React.createElement("datePicker", __assign({}, rest, { ref: forwardedRef || this.myRef }), children);
    };
    return _DatePicker;
}(View_1.RCTView));
exports._DatePicker = _DatePicker;
exports.DatePicker = React.forwardRef(function (props, ref) {
    var children = props.children, rest = __rest(props, ["children"]);
    return React.createElement(_DatePicker, __assign({}, rest, { forwardedRef: ref }), children);
});
//# sourceMappingURL=DatePicker.js.map

/***/ }),

/***/ "../node_modules/react-nativescript/dist/components/DockLayout.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__("../node_modules/react/index.js");
var LayoutBase_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/LayoutBase.js");
/**
 * A React wrapper around the NativeScript DockLayout component.
 * See: ui/layouts/dock-layout
 */
var _DockLayout = /** @class */ (function (_super) {
    __extends(_DockLayout, _super);
    function _DockLayout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    _DockLayout.prototype.render = function () {
        var _a = this.props, forwardedRef = _a.forwardedRef, onLoaded = _a.onLoaded, onUnloaded = _a.onUnloaded, onAndroidBackPressed = _a.onAndroidBackPressed, onShowingModally = _a.onShowingModally, onShownModally = _a.onShownModally, onTap = _a.onTap, onDoubleTap = _a.onDoubleTap, onPinch = _a.onPinch, onPan = _a.onPan, onSwipe = _a.onSwipe, onRotation = _a.onRotation, onLongPress = _a.onLongPress, onTouch = _a.onTouch, onPropertyChange = _a.onPropertyChange, children = _a.children, rest = __rest(_a, ["forwardedRef", "onLoaded", "onUnloaded", "onAndroidBackPressed", "onShowingModally", "onShownModally", "onTap", "onDoubleTap", "onPinch", "onPan", "onSwipe", "onRotation", "onLongPress", "onTouch", "onPropertyChange", "children"]);
        return React.createElement("dockLayout", __assign({}, rest, { ref: forwardedRef || this.myRef }), children);
    };
    return _DockLayout;
}(LayoutBase_1.RCTLayoutBase));
exports._DockLayout = _DockLayout;
exports.DockLayout = React.forwardRef(function (props, ref) {
    var children = props.children, rest = __rest(props, ["children"]);
    return React.createElement(_DockLayout, __assign({}, rest, { forwardedRef: ref }), children);
});
//# sourceMappingURL=DockLayout.js.map

/***/ }),

/***/ "../node_modules/react-nativescript/dist/components/EditableTextBase.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TextBase_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/TextBase.js");
var EventHandling_1 = __webpack_require__("../node_modules/react-nativescript/dist/client/EventHandling.js");
var RCTEditableTextBase = /** @class */ (function (_super) {
    __extends(RCTEditableTextBase, _super);
    function RCTEditableTextBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     *
     * @param attach true: attach; false: detach; null: update
     */
    RCTEditableTextBase.prototype.updateListeners = function (node, attach, nextProps) {
        _super.prototype.updateListeners.call(this, node, attach, nextProps);
        if (attach === null) {
            EventHandling_1.updateListener(node, "blur", this.props.onBlur, nextProps.onBlur);
            EventHandling_1.updateListener(node, "focus", this.props.onFocus, nextProps.onFocus);
            EventHandling_1.updateListener(node, "textChange", this.props.onTextChange, nextProps.onTextChange);
        }
        else {
            var method = (attach ? node.on : node.off).bind(node);
            if (this.props.onBlur)
                method("blur", this.props.onBlur);
            if (this.props.onFocus)
                method("focus", this.props.onFocus);
            if (this.props.onTextChange)
                method("textChange", this.props.onTextChange);
        }
    };
    return RCTEditableTextBase;
}(TextBase_1.RCTTextBase));
exports.RCTEditableTextBase = RCTEditableTextBase;
//# sourceMappingURL=EditableTextBase.js.map

/***/ }),

/***/ "../node_modules/react-nativescript/dist/components/FlexboxLayout.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__("../node_modules/react/index.js");
var LayoutBase_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/LayoutBase.js");
/**
 * A React wrapper around the NativeScript FlexboxLayout component.
 * See: ui/layouts/flexbox-layout
 */
var _FlexboxLayout = /** @class */ (function (_super) {
    __extends(_FlexboxLayout, _super);
    function _FlexboxLayout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    _FlexboxLayout.prototype.render = function () {
        var _a = this.props, forwardedRef = _a.forwardedRef, onLoaded = _a.onLoaded, onUnloaded = _a.onUnloaded, onAndroidBackPressed = _a.onAndroidBackPressed, onShowingModally = _a.onShowingModally, onShownModally = _a.onShownModally, onTap = _a.onTap, onDoubleTap = _a.onDoubleTap, onPinch = _a.onPinch, onPan = _a.onPan, onSwipe = _a.onSwipe, onRotation = _a.onRotation, onLongPress = _a.onLongPress, onTouch = _a.onTouch, onPropertyChange = _a.onPropertyChange, children = _a.children, rest = __rest(_a, ["forwardedRef", "onLoaded", "onUnloaded", "onAndroidBackPressed", "onShowingModally", "onShownModally", "onTap", "onDoubleTap", "onPinch", "onPan", "onSwipe", "onRotation", "onLongPress", "onTouch", "onPropertyChange", "children"]);
        return React.createElement("flexboxLayout", __assign({}, rest, { ref: forwardedRef || this.myRef }), children);
    };
    return _FlexboxLayout;
}(LayoutBase_1.RCTLayoutBase));
exports._FlexboxLayout = _FlexboxLayout;
exports.FlexboxLayout = React.forwardRef(function (props, ref) {
    var children = props.children, rest = __rest(props, ["children"]);
    return React.createElement(_FlexboxLayout, __assign({}, rest, { forwardedRef: ref }), children);
});
//# sourceMappingURL=FlexboxLayout.js.map

/***/ }),

/***/ "../node_modules/react-nativescript/dist/components/FormattedString.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__("../node_modules/react/index.js");
var formatted_string_1 = __webpack_require__("tns-core-modules/text/formatted-string");
var ViewBase_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/ViewBase.js");
function RNSFriendly(Base) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, __spread(args)) || this;
            _this.__ImplementsCustomNodeHierarchyManager__ = true;
            return _this;
            // This constructor call is needed for some reason; they must be doing something odd with the constructor.
        }
        class_1.prototype.__customHostConfigAppendChild = function (parent, child) {
            if (child instanceof formatted_string_1.Span) {
                parent.spans.push(child);
            }
            // i.e. don't bother deferring to Host Config.
            return true;
        };
        class_1.prototype.__customHostConfigRemoveChild = function (parent, child) {
            if (child instanceof formatted_string_1.Span) {
                var index = parent.spans.indexOf(child);
                if (index === -1) {
                    return true;
                }
                parent.spans.splice(index, 1);
            }
            // i.e. don't bother deferring to Host Config.
            return true;
        };
        class_1.prototype.__customHostConfigInsertBefore = function (parent, child, beforeChild) {
            if (!(child instanceof formatted_string_1.Span) || !(beforeChild instanceof formatted_string_1.Span)) {
                // Disqualify any children that are not at least a Span.
                return true;
            }
            var index = parent.spans.indexOf(beforeChild);
            if (index === -1) {
                parent.spans.push(child);
                return true;
            }
            parent.spans.splice(index, 0, child);
            return true;
        };
        return class_1;
    }(Base));
}
exports.RNSFriendly = RNSFriendly;
exports.RNSFriendlyFormattedString = RNSFriendly(formatted_string_1.FormattedString);
var elementKey = "formattedString";
var _FormattedString = /** @class */ (function (_super) {
    __extends(_FormattedString, _super);
    function _FormattedString() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // static defaultProps = {
    //     forwardedRef: React.createRef<NativeScriptFormattedString>()
    // };
    _FormattedString.prototype.render = function () {
        var _a = this.props, forwardedRef = _a.forwardedRef, onPropertyChange = _a.onPropertyChange, children = _a.children, rest = __rest(_a, ["forwardedRef", "onPropertyChange", "children"]);
        return React.createElement(elementKey, __assign({}, rest, { ref: forwardedRef || this.myRef }), children);
    };
    return _FormattedString;
}(ViewBase_1.RCTViewBase));
exports._FormattedString = _FormattedString;
exports.FormattedString = React.forwardRef(function (props, ref) {
    var children = props.children, rest = __rest(props, ["children"]);
    return React.createElement(_FormattedString, __assign({}, rest, { forwardedRef: ref }), children);
});
//# sourceMappingURL=FormattedString.js.map

/***/ }),

/***/ "../node_modules/react-nativescript/dist/components/Frame.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__("../node_modules/react/index.js");
var View_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/View.js");
var EventHandling_1 = __webpack_require__("../node_modules/react-nativescript/dist/client/EventHandling.js");
var _Frame = /** @class */ (function (_super) {
    __extends(_Frame, _super);
    function _Frame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // static defaultProps = {
    //     forwardedRef: React.createRef<NativeScriptFrame>()
    // };
    /**
     * @param attach true: attach; false: detach; null: update
     */
    _Frame.prototype.updateListeners = function (node, attach, nextProps) {
        _super.prototype.updateListeners.call(this, node, attach, nextProps);
        if (attach === null) {
            EventHandling_1.updateListener(node, "optionSelected", this.props.onOptionSelected, nextProps.onOptionSelected);
        }
        else {
            var method = (attach ? node.on : node.off).bind(node);
            if (this.props.onOptionSelected)
                method("optionSelected", this.props.onOptionSelected);
        }
    };
    _Frame.prototype.render = function () {
        var _a = this.props, forwardedRef = _a.forwardedRef, onLoaded = _a.onLoaded, onUnloaded = _a.onUnloaded, onAndroidBackPressed = _a.onAndroidBackPressed, onShowingModally = _a.onShowingModally, onShownModally = _a.onShownModally, onTap = _a.onTap, onDoubleTap = _a.onDoubleTap, onPinch = _a.onPinch, onPan = _a.onPan, onSwipe = _a.onSwipe, onRotation = _a.onRotation, onLongPress = _a.onLongPress, onTouch = _a.onTouch, onPropertyChange = _a.onPropertyChange, children = _a.children, rest = __rest(_a, ["forwardedRef", "onLoaded", "onUnloaded", "onAndroidBackPressed", "onShowingModally", "onShownModally", "onTap", "onDoubleTap", "onPinch", "onPan", "onSwipe", "onRotation", "onLongPress", "onTouch", "onPropertyChange", "children"]);
        return React.createElement("frame", __assign({}, rest, { ref: forwardedRef || this.myRef }), children);
    };
    return _Frame;
}(View_1.RCTView));
exports._Frame = _Frame;
exports.Frame = React.forwardRef(function (props, ref) {
    var children = props.children, rest = __rest(props, ["children"]);
    return React.createElement(_Frame, __assign({}, rest, { forwardedRef: ref }), children);
});
//# sourceMappingURL=Frame.js.map

/***/ }),

/***/ "../node_modules/react-nativescript/dist/components/GridLayout.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__("../node_modules/react/index.js");
var LayoutBase_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/LayoutBase.js");
/**
 * A React wrapper around the NativeScript GridLayout component.
 * See: ui/layouts/grid-layout
 */
var _GridLayout = /** @class */ (function (_super) {
    __extends(_GridLayout, _super);
    function _GridLayout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    _GridLayout.prototype.render = function () {
        var _a = this.props, forwardedRef = _a.forwardedRef, onLoaded = _a.onLoaded, onUnloaded = _a.onUnloaded, onAndroidBackPressed = _a.onAndroidBackPressed, onShowingModally = _a.onShowingModally, onShownModally = _a.onShownModally, onTap = _a.onTap, onDoubleTap = _a.onDoubleTap, onPinch = _a.onPinch, onPan = _a.onPan, onSwipe = _a.onSwipe, onRotation = _a.onRotation, onLongPress = _a.onLongPress, onTouch = _a.onTouch, onPropertyChange = _a.onPropertyChange, children = _a.children, rest = __rest(_a, ["forwardedRef", "onLoaded", "onUnloaded", "onAndroidBackPressed", "onShowingModally", "onShownModally", "onTap", "onDoubleTap", "onPinch", "onPan", "onSwipe", "onRotation", "onLongPress", "onTouch", "onPropertyChange", "children"]);
        return React.createElement("gridLayout", __assign({}, rest, { ref: forwardedRef || this.myRef }), children);
    };
    return _GridLayout;
}(LayoutBase_1.RCTLayoutBase));
exports._GridLayout = _GridLayout;
exports.GridLayout = React.forwardRef(function (props, ref) {
    var children = props.children, rest = __rest(props, ["children"]);
    return React.createElement(_GridLayout, __assign({}, rest, { forwardedRef: ref }), children);
});
//# sourceMappingURL=GridLayout.js.map

/***/ }),

/***/ "../node_modules/react-nativescript/dist/components/HtmlView.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var console = __webpack_require__("../node_modules/react-nativescript/dist/shared/Logger.js");
var React = __webpack_require__("../node_modules/react/index.js");
var View_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/View.js");
/**
 * Represents a view with html content. Use this component instead WebView when you want to show just static HTML content.
 * [iOS support](https://developer.apple.com/documentation/foundation/nsattributedstring/1524613-initwithdata)
 * [android support](http://developer.android.com/reference/android/text/Html.html)
 */
var _HtmlView = /** @class */ (function (_super) {
    __extends(_HtmlView, _super);
    function _HtmlView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    _HtmlView.prototype.render = function () {
        var _a = this.props, forwardedRef = _a.forwardedRef, onLoaded = _a.onLoaded, onUnloaded = _a.onUnloaded, onAndroidBackPressed = _a.onAndroidBackPressed, onShowingModally = _a.onShowingModally, onShownModally = _a.onShownModally, onTap = _a.onTap, onDoubleTap = _a.onDoubleTap, onPinch = _a.onPinch, onPan = _a.onPan, onSwipe = _a.onSwipe, onRotation = _a.onRotation, onLongPress = _a.onLongPress, onTouch = _a.onTouch, onPropertyChange = _a.onPropertyChange, children = _a.children, rest = __rest(_a, ["forwardedRef", "onLoaded", "onUnloaded", "onAndroidBackPressed", "onShowingModally", "onShownModally", "onTap", "onDoubleTap", "onPinch", "onPan", "onSwipe", "onRotation", "onLongPress", "onTouch", "onPropertyChange", "children"]);
        if (children) {
            console.warn("Ignoring 'children' prop on HtmlView; not permitted");
        }
        return React.createElement("htmlView", __assign({}, rest, { ref: forwardedRef || this.myRef }), null);
    };
    return _HtmlView;
}(View_1.RCTView));
exports.HtmlView = React.forwardRef(function (props, ref) {
    var children = props.children, rest = __rest(props, ["children"]);
    return React.createElement(_HtmlView, __assign({}, rest, { forwardedRef: ref }), children);
});
//# sourceMappingURL=HtmlView.js.map

/***/ }),

/***/ "../node_modules/react-nativescript/dist/components/Image.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__("../node_modules/react/index.js");
var View_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/View.js");
var _Image = /** @class */ (function (_super) {
    __extends(_Image, _super);
    function _Image() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    _Image.prototype.render = function () {
        var _a = this.props, forwardedRef = _a.forwardedRef, onLoaded = _a.onLoaded, onUnloaded = _a.onUnloaded, onAndroidBackPressed = _a.onAndroidBackPressed, onShowingModally = _a.onShowingModally, onShownModally = _a.onShownModally, onTap = _a.onTap, onDoubleTap = _a.onDoubleTap, onPinch = _a.onPinch, onPan = _a.onPan, onSwipe = _a.onSwipe, onRotation = _a.onRotation, onLongPress = _a.onLongPress, onTouch = _a.onTouch, onPropertyChange = _a.onPropertyChange, children = _a.children, rest = __rest(_a, ["forwardedRef", "onLoaded", "onUnloaded", "onAndroidBackPressed", "onShowingModally", "onShownModally", "onTap", "onDoubleTap", "onPinch", "onPan", "onSwipe", "onRotation", "onLongPress", "onTouch", "onPropertyChange", "children"]);
        return React.createElement("image", __assign({}, rest, { ref: forwardedRef || this.myRef }), children);
    };
    return _Image;
}(View_1.RCTView));
exports._Image = _Image;
exports.Image = React.forwardRef(function (props, ref) {
    var children = props.children, rest = __rest(props, ["children"]);
    return React.createElement(_Image, __assign({}, rest, { forwardedRef: ref }), children);
});
//# sourceMappingURL=Image.js.map

/***/ }),

/***/ "../node_modules/react-nativescript/dist/components/Label.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var console = __webpack_require__("../node_modules/react-nativescript/dist/shared/Logger.js");
var React = __webpack_require__("../node_modules/react/index.js");
var label_1 = __webpack_require__("tns-core-modules/ui/label/label");
var TextBase_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/TextBase.js");
exports.RNSFriendlyLabel = TextBase_1.RNSFriendly(label_1.Label);
var elementKey = "label";
/**
 * Represents a text label.
 */
var _Label = /** @class */ (function (_super) {
    __extends(_Label, _super);
    function _Label() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    _Label.prototype.render = function () {
        var _a;
        var _b = this.props, forwardedRef = _b.forwardedRef, onLoaded = _b.onLoaded, onUnloaded = _b.onUnloaded, onAndroidBackPressed = _b.onAndroidBackPressed, onShowingModally = _b.onShowingModally, onShownModally = _b.onShownModally, onTap = _b.onTap, onDoubleTap = _b.onDoubleTap, onPinch = _b.onPinch, onPan = _b.onPan, onSwipe = _b.onSwipe, onRotation = _b.onRotation, onLongPress = _b.onLongPress, onTouch = _b.onTouch, onPropertyChange = _b.onPropertyChange, text = _b.text, formattedText = _b.formattedText, children = _b.children, rest = __rest(_b, ["forwardedRef", "onLoaded", "onUnloaded", "onAndroidBackPressed", "onShowingModally", "onShownModally", "onTap", "onDoubleTap", "onPinch", "onPan", "onSwipe", "onRotation", "onLongPress", "onTouch", "onPropertyChange", "text", "formattedText", "children"]);
        if (text && formattedText) {
            console.warn("Both text and formattedText provided; shall use formattedText.");
        }
        var textContent = (_a = {},
            _a[formattedText ? "formattedText" : "text"] = formattedText || text,
            _a);
        return React.createElement(elementKey, __assign({}, rest, textContent, { ref: forwardedRef || this.myRef }), children // Weird that a Label may contain children, but what do I know.
        );
    };
    return _Label;
}(TextBase_1.RCTTextBase));
exports._Label = _Label;
exports.Label = React.forwardRef(function (props, ref) {
    var children = props.children, rest = __rest(props, ["children"]);
    return React.createElement(_Label, __assign({}, rest, { forwardedRef: ref }), children);
});
//# sourceMappingURL=Label.js.map

/***/ }),

/***/ "../node_modules/react-nativescript/dist/components/LayoutBase.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CustomLayoutView_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/CustomLayoutView.js");
/**
 * Base class for all views that supports children positioning.
 */
var RCTLayoutBase = /** @class */ (function (_super) {
    __extends(RCTLayoutBase, _super);
    function RCTLayoutBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RCTLayoutBase;
}(CustomLayoutView_1.RCTCustomLayoutView));
exports.RCTLayoutBase = RCTLayoutBase;
//# sourceMappingURL=LayoutBase.js.map

/***/ }),

/***/ "../node_modules/react-nativescript/dist/components/ListPicker.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var console = __webpack_require__("../node_modules/react-nativescript/dist/shared/Logger.js");
var React = __webpack_require__("../node_modules/react/index.js");
var View_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/View.js");
var _ListPicker = /** @class */ (function (_super) {
    __extends(_ListPicker, _super);
    function _ListPicker() {
        // static defaultProps = {
        //     forwardedRef: React.createRef<NativeScriptListPicker>()
        // };
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onSelectedIndexChange = function (args) {
            var selectedIndex = args.object.selectedIndex;
            _this.props.onSelectedIndexChange && _this.props.onSelectedIndexChange(selectedIndex);
        };
        return _this;
    }
    _ListPicker.prototype.componentDidMount = function () {
        _super.prototype.componentDidMount.call(this);
        var node = this.getCurrentRef();
        if (!node) {
            console.warn("React ref to NativeScript View lost, so unable to update event listeners.");
            return;
        }
        node.on("selectedIndexChange", this.onSelectedIndexChange);
    };
    _ListPicker.prototype.componentWillUnmount = function () {
        _super.prototype.componentWillUnmount.call(this);
        var node = this.getCurrentRef();
        if (!node) {
            console.warn("React ref to NativeScript View lost, so unable to update event listeners.");
            return;
        }
        node.off("selectedIndexChange", this.onSelectedIndexChange);
    };
    _ListPicker.prototype.render = function () {
        var _a = this.props, forwardedRef = _a.forwardedRef, onLoaded = _a.onLoaded, onUnloaded = _a.onUnloaded, onAndroidBackPressed = _a.onAndroidBackPressed, onShowingModally = _a.onShowingModally, onShownModally = _a.onShownModally, onTap = _a.onTap, onDoubleTap = _a.onDoubleTap, onPinch = _a.onPinch, onPan = _a.onPan, onSwipe = _a.onSwipe, onRotation = _a.onRotation, onLongPress = _a.onLongPress, onTouch = _a.onTouch, onPropertyChange = _a.onPropertyChange, children = _a.children, rest = __rest(_a, ["forwardedRef", "onLoaded", "onUnloaded", "onAndroidBackPressed", "onShowingModally", "onShownModally", "onTap", "onDoubleTap", "onPinch", "onPan", "onSwipe", "onRotation", "onLongPress", "onTouch", "onPropertyChange", "children"]);
        return React.createElement("listPicker", __assign({}, rest, { ref: forwardedRef || this.myRef }), children);
    };
    return _ListPicker;
}(View_1.RCTView));
exports._ListPicker = _ListPicker;
exports.ListPicker = React.forwardRef(function (props, ref) {
    var children = props.children, rest = __rest(props, ["children"]);
    return React.createElement(_ListPicker, __assign({}, rest, { forwardedRef: ref }), children);
});
//# sourceMappingURL=ListPicker.js.map

/***/ }),

/***/ "../node_modules/react-nativescript/dist/components/ListView.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var console = __webpack_require__("../node_modules/react-nativescript/dist/shared/Logger.js");
var React = __webpack_require__("../node_modules/react/index.js");
var list_view_1 = __webpack_require__("tns-core-modules/ui/list-view/list-view");
var EventHandling_1 = __webpack_require__("../node_modules/react-nativescript/dist/client/EventHandling.js");
var View_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/View.js");
var ReactNativeScript = __webpack_require__("../node_modules/react-nativescript/dist/client/ReactNativeScript.js");
var _ListView = /** @class */ (function (_super) {
    __extends(_ListView, _super);
    function _ListView(props) {
        var _this = _super.call(this, props) || this;
        _this.argsViewToRootKeyAndRef = new Map();
        _this.roots = new Set();
        /* ListView code-behind:
         *   https://github.com/NativeScript/nativescript-sdk-examples-js/blob/master/app/ns-ui-widgets-category/list-view/code-behind/code-behind-ts-page.ts
         * ListView item templates:
         *   https://medium.com/@alexander.vakrilov/faster-nativescript-listview-with-multiple-item-templates-8f903a32e48f
         * Cell state in ListView:
         *   https://medium.com/@alexander.vakrilov/managing-component-state-in-nativescript-listview-b139e45d899b
         *   https://github.com/NativeScript/nativescript-angular/issues/1245#issuecomment-393465035
         * loadMoreItems:
         *   https://github.com/NativeScript/nativescript-sdk-examples-js/blob/master/app/ns-ui-widgets-category/list-view/events/events-ts-page.ts
         */
        _this.defaultOnItemLoading = function (args) {
            var _a = _this.props._debug, logLevel = _a.logLevel, onCellRecycle = _a.onCellRecycle, onCellFirstLoad = _a.onCellFirstLoad;
            var _b = _this.props, items = _b.items, itemTemplateSelector = _b.itemTemplateSelector;
            var item = _ListView.isItemsSource(items) ? items.getItem(args.index) : items[args.index];
            var template = itemTemplateSelector
                ? typeof itemTemplateSelector === "string"
                    ? itemTemplateSelector
                    : itemTemplateSelector(item, args.index, items)
                : null;
            var cellFactory = template === null
                ? _this.props.cellFactory
                : _this.props.cellFactories
                    ? _this.props.cellFactories.get(template).cellFactory
                    : _this.props.cellFactory;
            if (typeof cellFactory === "undefined") {
                console.warn("ListView: No cell factory found, given template " + template + "!");
                return;
            }
            var view = args.view;
            if (!view) {
                var rootKeyAndRef = _this.renderNewRoot(item, cellFactory);
                args.view = rootKeyAndRef.ref.current;
                /* Here we're re-using the ref - I assume this is best practice. If not, we can make a new one on each update instead. */
                _this.argsViewToRootKeyAndRef.set(args.view, rootKeyAndRef);
                if (onCellFirstLoad)
                    onCellFirstLoad(rootKeyAndRef.ref.current);
            }
            else {
                console.log("[ListView] existing view: ", view);
                if (onCellRecycle)
                    onCellRecycle(view);
                var _c = _this.argsViewToRootKeyAndRef.get(view), rootKey = _c.rootKey, ref = _c.ref;
                if (typeof rootKey === "undefined") {
                    console.error("Unable to find root key that args.view corresponds to!", view);
                    return;
                }
                if (typeof ref === "undefined") {
                    console.error("Unable to find ref that args.view corresponds to!", view);
                    return;
                }
                // args.view = null;
                ReactNativeScript.render(cellFactory(item, ref), null, function () {
                    // console.log(`Rendered into cell! detachedRootRef:`);
                }, rootKey);
            }
        };
        _this.renderNewRoot = function (item, cellFactory) {
            var node = _this.getCurrentRef();
            if (!node) {
                throw new Error("Unable to get ref to ListView");
            }
            console.log("[ListView] no existing view.");
            var ref = React.createRef();
            var rootKey = "ListView-" + node._domId + "-" + _this.roots.size.toString();
            ReactNativeScript.render(cellFactory(item, ref), null, function () {
                // console.log(`Rendered into cell! ref:`);
            }, rootKey);
            _this.roots.add(rootKey);
            return {
                rootKey: rootKey,
                ref: ref,
            };
        };
        _this.state = {
            nativeCells: {},
            nativeCellToItemIndex: new Map(),
            itemIndexToNativeCell: props._debug.logLevel === "debug" ? new Map() : undefined,
        }; // No idea why I need to assert as Readonly<S> when using generics with State :(
        return _this;
    }
    /**
     *
     * @param attach true: attach; false: detach; null: update
     */
    _ListView.prototype.updateListeners = function (node, attach, nextProps) {
        _super.prototype.updateListeners.call(this, node, attach, nextProps);
        if (attach === null) {
            /* We won't support non-default onItemLoading event handlers. */
            // updateListener(node, NativeScriptListView.itemLoadingEvent, this.defaultOnItemLoading, nextProps.onLoaded);
            EventHandling_1.updateListener(node, list_view_1.ListView.itemTapEvent, this.props.onItemTap, nextProps.onItemTap);
            EventHandling_1.updateListener(node, list_view_1.ListView.loadMoreItemsEvent, this.props.onLoadMoreItems, nextProps.onLoadMoreItems);
        }
        else {
            var method = (attach ? node.on : node.off).bind(node);
            /* if(this.props.onItemLoadingEvent) */ method(list_view_1.ListView.itemLoadingEvent, this.defaultOnItemLoading);
            if (this.props.onItemTap)
                method(list_view_1.ListView.itemTapEvent, this.props.onItemTap);
            if (this.props.onLoadMoreItems)
                method(list_view_1.ListView.loadMoreItemsEvent, this.props.onLoadMoreItems);
        }
    };
    _ListView.prototype.componentDidMount = function () {
        var _this = this;
        _super.prototype.componentDidMount.call(this);
        var node = this.getCurrentRef();
        if (!node) {
            console.warn("React ref to NativeScript View lost, so unable to set item templates.");
            return;
        }
        /* NOTE: does not support updating of this.props.cellFactories upon Props update. */
        if (this.props.cellFactories) {
            var itemTemplates_1 = [];
            this.props.cellFactories.forEach(function (info, key) {
                var placeholderItem = info.placeholderItem, cellFactory = info.cellFactory;
                itemTemplates_1.push({
                    key: key,
                    createView: function () {
                        console.log("[ListView] item template \"" + key + "\"");
                        var rootKeyAndRef = _this.renderNewRoot(placeholderItem, cellFactory);
                        _this.argsViewToRootKeyAndRef.set(rootKeyAndRef.ref.current, rootKeyAndRef);
                        return rootKeyAndRef.ref.current;
                    },
                });
            });
            node.itemTemplates = itemTemplates_1;
        }
    };
    _ListView.prototype.componentWillUnmount = function () {
        _super.prototype.componentWillUnmount.call(this);
        this.roots.forEach(function (root) { return ReactNativeScript.unmountComponentAtNode(root); });
    };
    _ListView.isItemsSource = function (arr) {
        // Same implementation as: https://github.com/NativeScript/NativeScript/blob/b436ecde3605b695a0ffa1757e38cc094e2fe311/tns-core-modules/ui/list-picker/list-picker-common.ts#L74
        return typeof arr.getItem === "function";
    };
    _ListView.prototype.render = function () {
        console.log("ListView's render()");
        var _a = this.props, forwardedRef = _a.forwardedRef, onLoaded = _a.onLoaded, onUnloaded = _a.onUnloaded, onAndroidBackPressed = _a.onAndroidBackPressed, onShowingModally = _a.onShowingModally, onShownModally = _a.onShownModally, onTap = _a.onTap, onDoubleTap = _a.onDoubleTap, onPinch = _a.onPinch, onPan = _a.onPan, onSwipe = _a.onSwipe, onRotation = _a.onRotation, onLongPress = _a.onLongPress, onTouch = _a.onTouch, onPropertyChange = _a.onPropertyChange, children = _a.children, _debug = _a._debug, items = _a.items, rest = __rest(_a, ["forwardedRef", "onLoaded", "onUnloaded", "onAndroidBackPressed", "onShowingModally", "onShownModally", "onTap", "onDoubleTap", "onPinch", "onPan", "onSwipe", "onRotation", "onLongPress", "onTouch", "onPropertyChange", "children", "_debug", "items"]);
        if (children) {
            console.warn("Ignoring 'children' prop on ListView; not yet supported");
        }
        return React.createElement("listView", __assign({ className: "list-group" }, rest, { items: items, ref: forwardedRef || this.myRef }), null);
    };
    _ListView.defaultProps = {
        _debug: {
            logLevel: "info",
            onCellFirstLoad: undefined,
            onCellRecycle: undefined,
        },
    };
    return _ListView;
}(View_1.RCTView));
exports._ListView = _ListView;
exports.ListView = React.forwardRef(function (props, ref) {
    var children = props.children, rest = __rest(props, ["children"]);
    return React.createElement(_ListView, __assign({}, rest, { forwardedRef: ref }), children);
});
//# sourceMappingURL=ListView.js.map

/***/ }),

/***/ "../node_modules/react-nativescript/dist/components/NavigationButton.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__("../node_modules/react/index.js");
var ActionItem_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/ActionItem.js");
/**
 * A React wrapper around the NativeScript NavigationButton component.
 *
 * See: ui/action-bar/action-bar
 * See: https://docs.nativescript.org/ui/action-bar#navigation-button
 * See: https://github.com/NativeScript/nativescript-sdk-examples-js/blob/master/app/ns-ui-widgets-category/action-bar/code-behind/code-behind-ts-page.ts
 */
var _NavigationButton = /** @class */ (function (_super) {
    __extends(_NavigationButton, _super);
    function _NavigationButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    _NavigationButton.prototype.render = function () {
        var _a = this.props, forwardedRef = _a.forwardedRef, onPropertyChange = _a.onPropertyChange, children = _a.children, 
        // actionView, /* We disallow this at the typings level. */
        rest = __rest(_a, ["forwardedRef", "onPropertyChange", "children"]);
        return React.createElement("navigationButton", __assign({}, rest, { ref: forwardedRef || this.myRef }), children);
    };
    return _NavigationButton;
}(ActionItem_1._ActionItem));
exports._NavigationButton = _NavigationButton;
exports.NavigationButton = React.forwardRef(function (props, ref) {
    var children = props.children, rest = __rest(props, ["children"]);
    return React.createElement(_NavigationButton, __assign({}, rest, { forwardedRef: ref }), children);
});
//# sourceMappingURL=NavigationButton.js.map

/***/ }),

/***/ "../node_modules/react-nativescript/dist/components/Observable.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var console = __webpack_require__("../node_modules/react-nativescript/dist/shared/Logger.js");
var React = __webpack_require__("../node_modules/react/index.js");
var EventHandling_1 = __webpack_require__("../node_modules/react-nativescript/dist/client/EventHandling.js");
var shallowEqual_1 = __webpack_require__("../node_modules/react-nativescript/dist/client/shallowEqual.js");
var RCTObservable = /** @class */ (function (_super) {
    __extends(RCTObservable, _super);
    function RCTObservable() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.myRef = React.createRef();
        return _this;
    }
    // static defaultProps = {
    //     forwardedRef: React.createRef<NativeScriptObservable>()
    // };
    RCTObservable.prototype.getCurrentRef = function () {
        return (this.props.forwardedRef || this.myRef).current;
    };
    /**
     * Helper method for updateListeners: simply gets the current ref to pass on to it.
     * @param attach true: attach; false: detach; null: update
     */
    RCTObservable.prototype.updateListenersHelper = function (attach, nextProps) {
        var node = this.getCurrentRef();
        if (node === null) {
            console.warn("React ref to NativeScript View lost, so unable to update event listeners.");
            return;
        }
        this.updateListeners(node, attach, nextProps);
    };
    /**
     *
     * @param attach true: attach; false: detach; null: update
     */
    RCTObservable.prototype.updateListeners = function (node, attach, nextProps) {
        if (attach === null) {
            EventHandling_1.updateListener(node, "propertyChange", this.props.onPropertyChange, nextProps.onPropertyChange);
        }
        else {
            var method = (attach ? node.on : node.off).bind(node);
            if (this.props.onPropertyChange)
                method("propertyChange", this.props.onPropertyChange);
        }
    };
    RCTObservable.prototype.componentDidMount = function () {
        this.updateListenersHelper(true);
    };
    /**
     * PureComponent's shouldComponentUpdate() method is ignored and replaced with a shallowEqual()
     * comparison of props and state. We'll implement our Component's shouldComponentUpdate() to
     * match the way PureComponent is handled.
     */
    RCTObservable.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        // console.log(`Observable's shouldComponentUpdate`);
        var shouldUpdate = !shallowEqual_1.shallowEqual(this.props, nextProps) || !shallowEqual_1.shallowEqual(this.state, nextState);
        // console.log(`[shouldComponentUpdate] shouldUpdate: ${shouldUpdate}.`);
        this.updateListenersHelper(null, nextProps);
        // https://lucybain.com/blog/2018/react-js-pure-component/
        return shouldUpdate;
    };
    RCTObservable.prototype.componentWillUnmount = function () {
        this.updateListenersHelper(false);
    };
    return RCTObservable;
}(React.Component));
exports.RCTObservable = RCTObservable;
//# sourceMappingURL=Observable.js.map

/***/ }),

/***/ "../node_modules/react-nativescript/dist/components/Page.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__("../node_modules/react/index.js");
var ContentView_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/ContentView.js");
var EventHandling_1 = __webpack_require__("../node_modules/react-nativescript/dist/client/EventHandling.js");
/**
 * A React wrapper around the NativeScript Page component.
 * See: ui/page/page
 */
var _Page = /** @class */ (function (_super) {
    __extends(_Page, _super);
    function _Page() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // static defaultProps = {
    //     forwardedRef: React.createRef<NativeScriptPage>()
    // };
    // private readonly myRef: React.RefObject<NativeScriptPage> = React.createRef<NativeScriptPage>();
    /**
     * @param attach true: attach; false: detach; null: update
     */
    _Page.prototype.updateListeners = function (node, attach, nextProps) {
        _super.prototype.updateListeners.call(this, node, attach, nextProps);
        if (attach === null) {
            EventHandling_1.updateListener(node, "navigatedFrom", this.props.onNavigatedFrom, nextProps.onNavigatedFrom);
            EventHandling_1.updateListener(node, "navigatedTo", this.props.onNavigatedTo, nextProps.onNavigatedTo);
            EventHandling_1.updateListener(node, "navigatingFrom", this.props.onNavigatingFrom, nextProps.onNavigatingFrom);
            EventHandling_1.updateListener(node, "navigatingTo", this.props.onNavigatingTo, nextProps.onNavigatingTo);
        }
        else {
            var method = (attach ? node.on : node.off).bind(node);
            if (this.props.onNavigatedFrom)
                method("navigatedFrom", this.props.onNavigatedFrom);
            if (this.props.onNavigatedTo)
                method("navigatedTo", this.props.onNavigatedTo);
            if (this.props.onNavigatingFrom)
                method("navigatingFrom", this.props.onNavigatingFrom);
            if (this.props.onNavigatingTo)
                method("navigatingTo", this.props.onNavigatingTo);
        }
    };
    _Page.prototype.render = function () {
        var _a = this.props, forwardedRef = _a.forwardedRef, onNavigatedFrom = _a.onNavigatedFrom, onNavigatedTo = _a.onNavigatedTo, onNavigatingFrom = _a.onNavigatingFrom, onNavigatingTo = _a.onNavigatingTo, onLoaded = _a.onLoaded, onUnloaded = _a.onUnloaded, onAndroidBackPressed = _a.onAndroidBackPressed, onShowingModally = _a.onShowingModally, onShownModally = _a.onShownModally, onTap = _a.onTap, onDoubleTap = _a.onDoubleTap, onPinch = _a.onPinch, onPan = _a.onPan, onSwipe = _a.onSwipe, onRotation = _a.onRotation, onLongPress = _a.onLongPress, onTouch = _a.onTouch, onPropertyChange = _a.onPropertyChange, children = _a.children, rest = __rest(_a, ["forwardedRef", "onNavigatedFrom", "onNavigatedTo", "onNavigatingFrom", "onNavigatingTo", "onLoaded", "onUnloaded", "onAndroidBackPressed", "onShowingModally", "onShownModally", "onTap", "onDoubleTap", "onPinch", "onPan", "onSwipe", "onRotation", "onLongPress", "onTouch", "onPropertyChange", "children"]);
        return React.createElement("page", __assign({}, rest, { ref: forwardedRef || this.myRef }), children);
    };
    return _Page;
}(ContentView_1._ContentView));
exports.Page = React.forwardRef(function (props, ref) {
    var children = props.children, rest = __rest(props, ["children"]);
    return React.createElement(_Page, __assign({}, rest, { forwardedRef: ref }), children);
});
//# sourceMappingURL=Page.js.map

/***/ }),

/***/ "../node_modules/react-nativescript/dist/components/Placeholder.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__("../node_modules/react/index.js");
var View_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/View.js");
var EventHandling_1 = __webpack_require__("../node_modules/react-nativescript/dist/client/EventHandling.js");
var _Placeholder = /** @class */ (function (_super) {
    __extends(_Placeholder, _super);
    function _Placeholder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // static defaultProps = {
    //     forwardedRef: React.createRef<NativeScriptPlaceholder>()
    // };
    /**
     *
     * @param attach true: attach; false: detach; null: update
     */
    _Placeholder.prototype.updateListeners = function (node, attach, nextProps) {
        _super.prototype.updateListeners.call(this, node, attach, nextProps);
        if (attach === null) {
            EventHandling_1.updateListener(node, "creatingView", this.props.onCreatingView, nextProps.onCreatingView);
        }
        else {
            var method = (attach ? node.on : node.off).bind(node);
            if (this.props.onCreatingView)
                method("creatingView", this.props.onCreatingView);
        }
    };
    _Placeholder.prototype.render = function () {
        var _a = this.props, forwardedRef = _a.forwardedRef, onLoaded = _a.onLoaded, onUnloaded = _a.onUnloaded, onAndroidBackPressed = _a.onAndroidBackPressed, onShowingModally = _a.onShowingModally, onShownModally = _a.onShownModally, onTap = _a.onTap, onDoubleTap = _a.onDoubleTap, onPinch = _a.onPinch, onPan = _a.onPan, onSwipe = _a.onSwipe, onRotation = _a.onRotation, onLongPress = _a.onLongPress, onTouch = _a.onTouch, onPropertyChange = _a.onPropertyChange, children = _a.children, rest = __rest(_a, ["forwardedRef", "onLoaded", "onUnloaded", "onAndroidBackPressed", "onShowingModally", "onShownModally", "onTap", "onDoubleTap", "onPinch", "onPan", "onSwipe", "onRotation", "onLongPress", "onTouch", "onPropertyChange", "children"]);
        return React.createElement("placeholder", __assign({}, rest, { ref: forwardedRef || this.myRef }), children);
    };
    return _Placeholder;
}(View_1.RCTView));
exports._Placeholder = _Placeholder;
exports.Placeholder = React.forwardRef(function (props, ref) {
    var children = props.children, rest = __rest(props, ["children"]);
    return React.createElement(_Placeholder, __assign({}, rest, { forwardedRef: ref }), children);
});
//# sourceMappingURL=Placeholder.js.map

/***/ }),

/***/ "../node_modules/react-nativescript/dist/components/Progress.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__("../node_modules/react/index.js");
var View_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/View.js");
var _Progress = /** @class */ (function (_super) {
    __extends(_Progress, _super);
    function _Progress() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // static defaultProps = {
    //     forwardedRef: React.createRef<NativeScriptProgress>()
    // };
    /* Not sure there's really a use-case for Observable here, given that we're using React.
     * Was replicating: https://docs.nativescript.org/ui/ns-ui-widgets/progress */
    // private readonly vm = new Observable();
    // componentDidMount(){
    //     super.componentDidMount();
    //     this.vm.set("prResult", this.props.value);
    //     const ref = this.props.forwardedRef || this.myRef;
    //     const node: E|null = ref.current;
    //     if(node){
    //         node.on("valueChange", (pargs: EventData) => {
    //             this.vm.set("prResult", (<NativeScriptProgress>pargs.object).value);
    //         });
    //     } else {
    //         console.warn(`React ref to NativeScript View lost, so unable to update event listeners.`);
    //     }
    // }
    _Progress.prototype.render = function () {
        var _a = this.props, forwardedRef = _a.forwardedRef, onLoaded = _a.onLoaded, onUnloaded = _a.onUnloaded, onAndroidBackPressed = _a.onAndroidBackPressed, onShowingModally = _a.onShowingModally, onShownModally = _a.onShownModally, onTap = _a.onTap, onDoubleTap = _a.onDoubleTap, onPinch = _a.onPinch, onPan = _a.onPan, onSwipe = _a.onSwipe, onRotation = _a.onRotation, onLongPress = _a.onLongPress, onTouch = _a.onTouch, onPropertyChange = _a.onPropertyChange, children = _a.children, rest = __rest(_a, ["forwardedRef", "onLoaded", "onUnloaded", "onAndroidBackPressed", "onShowingModally", "onShownModally", "onTap", "onDoubleTap", "onPinch", "onPan", "onSwipe", "onRotation", "onLongPress", "onTouch", "onPropertyChange", "children"]);
        return React.createElement("progress", __assign({}, rest, { ref: forwardedRef || this.myRef }), children);
    };
    return _Progress;
}(View_1.RCTView));
exports._Progress = _Progress;
exports.Progress = React.forwardRef(function (props, ref) {
    var children = props.children, rest = __rest(props, ["children"]);
    return React.createElement(_Progress, __assign({}, rest, { forwardedRef: ref }), children);
});
//# sourceMappingURL=Progress.js.map

/***/ }),

/***/ "../node_modules/react-nativescript/dist/components/ScrollView.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__("../node_modules/react/index.js");
var ContentView_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/ContentView.js");
var EventHandling_1 = __webpack_require__("../node_modules/react-nativescript/dist/client/EventHandling.js");
/**
 * A React wrapper around the NativeScript ScrollView component.
 * See: ui/scroll-view/scroll-view
 */
var _ScrollView = /** @class */ (function (_super) {
    __extends(_ScrollView, _super);
    function _ScrollView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // static defaultProps = {
    //     forwardedRef: React.createRef<NativeScriptScrollView>()
    // };
    // private readonly myRef: React.RefObject<NativeScriptScrollView> = React.createRef<NativeScriptScrollView>();
    /**
     * @param attach true: attach; false: detach; null: update
     */
    _ScrollView.prototype.updateListeners = function (node, attach, nextProps) {
        _super.prototype.updateListeners.call(this, node, attach, nextProps);
        if (attach === null) {
            EventHandling_1.updateListener(node, "scroll", this.props.onScroll, nextProps.onScroll);
        }
        else {
            var method = (attach ? node.on : node.off).bind(node);
            if (this.props.onScroll)
                method("scroll", this.props.onScroll);
        }
    };
    _ScrollView.prototype.render = function () {
        var _a = this.props, forwardedRef = _a.forwardedRef, onScroll = _a.onScroll, onLoaded = _a.onLoaded, onUnloaded = _a.onUnloaded, onAndroidBackPressed = _a.onAndroidBackPressed, onShowingModally = _a.onShowingModally, onShownModally = _a.onShownModally, onTap = _a.onTap, onDoubleTap = _a.onDoubleTap, onPinch = _a.onPinch, onPan = _a.onPan, onSwipe = _a.onSwipe, onRotation = _a.onRotation, onLongPress = _a.onLongPress, onTouch = _a.onTouch, onPropertyChange = _a.onPropertyChange, children = _a.children, rest = __rest(_a, ["forwardedRef", "onScroll", "onLoaded", "onUnloaded", "onAndroidBackPressed", "onShowingModally", "onShownModally", "onTap", "onDoubleTap", "onPinch", "onPan", "onSwipe", "onRotation", "onLongPress", "onTouch", "onPropertyChange", "children"]);
        return React.createElement("scrollView", __assign({}, rest, { ref: forwardedRef || this.myRef }), children);
    };
    return _ScrollView;
}(ContentView_1._ContentView));
exports.ScrollView = React.forwardRef(function (props, ref) {
    var children = props.children, rest = __rest(props, ["children"]);
    return React.createElement(_ScrollView, __assign({}, rest, { forwardedRef: ref }), children);
});
//# sourceMappingURL=ScrollView.js.map

/***/ }),

/***/ "../node_modules/react-nativescript/dist/components/SearchBar.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var console = __webpack_require__("../node_modules/react-nativescript/dist/shared/Logger.js");
var React = __webpack_require__("../node_modules/react/index.js");
var View_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/View.js");
var EventHandling_1 = __webpack_require__("../node_modules/react-nativescript/dist/client/EventHandling.js");
var _SearchBar = /** @class */ (function (_super) {
    __extends(_SearchBar, _super);
    function _SearchBar() {
        // static defaultProps = {
        //     forwardedRef: React.createRef<NativeScriptSearchBar>()
        // };
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onTextChange = function (args) {
            var text = args.object.text;
            _this.props.onTextChange && _this.props.onTextChange(text);
        };
        return _this;
    }
    _SearchBar.prototype.componentDidMount = function () {
        _super.prototype.componentDidMount.call(this);
        var node = this.getCurrentRef();
        if (!node) {
            console.warn("React ref to NativeScript View lost, so unable to update event listeners.");
            return;
        }
        node.on("textChange", this.onTextChange);
    };
    _SearchBar.prototype.componentWillUnmount = function () {
        _super.prototype.componentWillUnmount.call(this);
        var node = this.getCurrentRef();
        if (!node) {
            console.warn("React ref to NativeScript View lost, so unable to update event listeners.");
            return;
        }
        node.off("textChange", this.onTextChange);
    };
    /**
     * @param attach true: attach; false: detach; null: update
     */
    _SearchBar.prototype.updateListeners = function (node, attach, nextProps) {
        _super.prototype.updateListeners.call(this, node, attach, nextProps);
        if (attach === null) {
            EventHandling_1.updateListener(node, "submit", this.props.onSubmit, nextProps.onSubmit);
            EventHandling_1.updateListener(node, "close", this.props.onClose, nextProps.onClose);
        }
        else {
            var method = (attach ? node.on : node.off).bind(node);
            if (this.props.onSubmit)
                method("submit", this.props.onSubmit);
            if (this.props.onClose)
                method("close", this.props.onClose);
        }
    };
    _SearchBar.prototype.render = function () {
        var _a = this.props, forwardedRef = _a.forwardedRef, onSubmit = _a.onSubmit, onClose = _a.onClose, onLoaded = _a.onLoaded, onUnloaded = _a.onUnloaded, onAndroidBackPressed = _a.onAndroidBackPressed, onShowingModally = _a.onShowingModally, onShownModally = _a.onShownModally, onTap = _a.onTap, onDoubleTap = _a.onDoubleTap, onPinch = _a.onPinch, onPan = _a.onPan, onSwipe = _a.onSwipe, onRotation = _a.onRotation, onLongPress = _a.onLongPress, onTouch = _a.onTouch, onPropertyChange = _a.onPropertyChange, children = _a.children, rest = __rest(_a, ["forwardedRef", "onSubmit", "onClose", "onLoaded", "onUnloaded", "onAndroidBackPressed", "onShowingModally", "onShownModally", "onTap", "onDoubleTap", "onPinch", "onPan", "onSwipe", "onRotation", "onLongPress", "onTouch", "onPropertyChange", "children"]);
        return React.createElement("searchBar", __assign({}, rest, { ref: forwardedRef || this.myRef }), children);
    };
    return _SearchBar;
}(View_1.RCTView));
exports._SearchBar = _SearchBar;
exports.SearchBar = React.forwardRef(function (props, ref) {
    var children = props.children, rest = __rest(props, ["children"]);
    return React.createElement(_SearchBar, __assign({}, rest, { forwardedRef: ref }), children);
});
//# sourceMappingURL=SearchBar.js.map

/***/ }),

/***/ "../node_modules/react-nativescript/dist/components/SegmentedBar.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__("../node_modules/react/index.js");
var segmented_bar_1 = __webpack_require__("tns-core-modules/ui/segmented-bar/segmented-bar");
var View_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/View.js");
var EventHandling_1 = __webpack_require__("../node_modules/react-nativescript/dist/client/EventHandling.js");
function RNSFriendly(Base) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, __spread(args)) || this;
            _this.__ImplementsCustomNodeHierarchyManager__ = true;
            return _this;
            // This constructor call is needed for some reason; they must be doing something odd with the constructor.
        }
        class_1.prototype.__customHostConfigAppendChild = function (parent, child) {
            if (child instanceof segmented_bar_1.SegmentedBarItem) {
                parent.items = __spread((parent.items || []), [child]);
            }
            // i.e. don't bother deferring to Host Config.
            return true;
        };
        class_1.prototype.__customHostConfigRemoveChild = function (parent, child) {
            if (child instanceof segmented_bar_1.SegmentedBarItem) {
                parent.items = (parent.items || []).filter(function (item) { return item !== child; });
            }
            // i.e. don't bother deferring to Host Config.
            return true;
        };
        class_1.prototype.__customHostConfigInsertBefore = function (parent, child, beforeChild) {
            if (!(child instanceof segmented_bar_1.SegmentedBarItem) ||
                !(beforeChild instanceof segmented_bar_1.SegmentedBarItem)) {
                // Disqualify any children that are not at least a NativeScriptSegmentedBarItem.
                return true;
            }
            var originalItems = parent.items || [];
            var atIndex = originalItems.indexOf(beforeChild);
            if (atIndex === -1) {
                parent.items = originalItems.concat(child);
                return true;
            }
            var itemsClone = __spread(originalItems);
            parent.items = itemsClone.splice(atIndex, 0, child);
            return true;
        };
        return class_1;
    }(Base));
}
exports.RNSFriendly = RNSFriendly;
exports.RNSFriendlySegmentedBar = RNSFriendly(segmented_bar_1.SegmentedBar);
var elementKey = "segmentedBar";
var _SegmentedBar = /** @class */ (function (_super) {
    __extends(_SegmentedBar, _super);
    function _SegmentedBar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // static defaultProps = {
    //     forwardedRef: React.createRef<NativeScriptSegmentedBar>()
    // };
    /**
     * @param attach true: attach; false: detach; null: update
     */
    _SegmentedBar.prototype.updateListeners = function (node, attach, nextProps) {
        _super.prototype.updateListeners.call(this, node, attach, nextProps);
        if (attach === null) {
            EventHandling_1.updateListener(node, "selectedIndexChanged", this.props.onSelectedIndexChanged, nextProps.onSelectedIndexChanged);
        }
        else {
            var method = (attach ? node.on : node.off).bind(node);
            if (this.props.onSelectedIndexChanged)
                method("selectedIndexChanged", this.props.onSelectedIndexChanged);
        }
    };
    _SegmentedBar.prototype.render = function () {
        var _a = this.props, forwardedRef = _a.forwardedRef, onSelectedIndexChanged = _a.onSelectedIndexChanged, onLoaded = _a.onLoaded, onUnloaded = _a.onUnloaded, onAndroidBackPressed = _a.onAndroidBackPressed, onShowingModally = _a.onShowingModally, onShownModally = _a.onShownModally, onTap = _a.onTap, onDoubleTap = _a.onDoubleTap, onPinch = _a.onPinch, onPan = _a.onPan, onSwipe = _a.onSwipe, onRotation = _a.onRotation, onLongPress = _a.onLongPress, onTouch = _a.onTouch, onPropertyChange = _a.onPropertyChange, items = _a.items, // We intercept this from being passed as a prop; our Host Config will map children to items implicitly instead.
        children = _a.children, rest = __rest(_a, ["forwardedRef", "onSelectedIndexChanged", "onLoaded", "onUnloaded", "onAndroidBackPressed", "onShowingModally", "onShownModally", "onTap", "onDoubleTap", "onPinch", "onPan", "onSwipe", "onRotation", "onLongPress", "onTouch", "onPropertyChange", "items", "children"]);
        return React.createElement(elementKey, __assign({}, rest, { ref: forwardedRef || this.myRef }), 
        /* For now, any SegmentedBarItem children will be mapped to items by our React renderer. */
        children);
    };
    return _SegmentedBar;
}(View_1.RCTView));
exports._SegmentedBar = _SegmentedBar;
exports.SegmentedBar = React.forwardRef(function (props, ref) {
    var children = props.children, rest = __rest(props, ["children"]);
    return React.createElement(_SegmentedBar, __assign({}, rest, { forwardedRef: ref }), children);
});
//# sourceMappingURL=SegmentedBar.js.map

/***/ }),

/***/ "../node_modules/react-nativescript/dist/components/SegmentedBarItem.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__("../node_modules/react/index.js");
var ViewBase_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/ViewBase.js");
/**
 * A React wrapper around the NativeScript SegmentedBarItem component.
 *
 * See: ui/action-bar/action-bar
 * See: https://docs.nativescript.org/ui/action-bar#action-items
 * See: https://github.com/NativeScript/nativescript-sdk-examples-js/tree/master/app/ns-ui-widgets-category/action-bar/items-actionbar
 */
var _SegmentedBarItem = /** @class */ (function (_super) {
    __extends(_SegmentedBarItem, _super);
    function _SegmentedBarItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    _SegmentedBarItem.prototype.render = function () {
        var _a = this.props, forwardedRef = _a.forwardedRef, onPropertyChange = _a.onPropertyChange, children = _a.children, rest = __rest(_a, ["forwardedRef", "onPropertyChange", "children"]);
        return React.createElement("segmentedBarItem", __assign({}, rest, { ref: forwardedRef || this.myRef }), children);
    };
    return _SegmentedBarItem;
}(ViewBase_1.RCTViewBase));
exports._SegmentedBarItem = _SegmentedBarItem;
exports.SegmentedBarItem = React.forwardRef(function (props, ref) {
    var children = props.children, rest = __rest(props, ["children"]);
    return React.createElement(_SegmentedBarItem, __assign({}, rest, { forwardedRef: ref }), children);
});
//# sourceMappingURL=SegmentedBarItem.js.map

/***/ }),

/***/ "../node_modules/react-nativescript/dist/components/Slider.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var console = __webpack_require__("../node_modules/react-nativescript/dist/shared/Logger.js");
var React = __webpack_require__("../node_modules/react/index.js");
var View_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/View.js");
var _Slider = /** @class */ (function (_super) {
    __extends(_Slider, _super);
    function _Slider() {
        // static defaultProps = {
        //     forwardedRef: React.createRef<NativeScriptSlider>()
        // };
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onValueChange = function (slargs) {
            var sliderValue = slargs.object.value;
            _this.props.onValueChange && _this.props.onValueChange(sliderValue);
        };
        return _this;
    }
    _Slider.prototype.componentDidMount = function () {
        _super.prototype.componentDidMount.call(this);
        var node = this.getCurrentRef();
        if (!node) {
            console.warn("React ref to NativeScript View lost, so unable to update event listeners.");
            return;
        }
        node.on("valueChange", this.onValueChange);
    };
    _Slider.prototype.componentWillUnmount = function () {
        _super.prototype.componentWillUnmount.call(this);
        var node = this.getCurrentRef();
        if (!node) {
            node.off("valueChange", this.onValueChange);
            return;
        }
        console.warn("React ref to NativeScript View lost, so unable to update event listeners.");
    };
    _Slider.prototype.render = function () {
        var _a = this.props, forwardedRef = _a.forwardedRef, onValueChange = _a.onValueChange, onLoaded = _a.onLoaded, onUnloaded = _a.onUnloaded, onAndroidBackPressed = _a.onAndroidBackPressed, onShowingModally = _a.onShowingModally, onShownModally = _a.onShownModally, onTap = _a.onTap, onDoubleTap = _a.onDoubleTap, onPinch = _a.onPinch, onPan = _a.onPan, onSwipe = _a.onSwipe, onRotation = _a.onRotation, onLongPress = _a.onLongPress, onTouch = _a.onTouch, onPropertyChange = _a.onPropertyChange, children = _a.children, rest = __rest(_a, ["forwardedRef", "onValueChange", "onLoaded", "onUnloaded", "onAndroidBackPressed", "onShowingModally", "onShownModally", "onTap", "onDoubleTap", "onPinch", "onPan", "onSwipe", "onRotation", "onLongPress", "onTouch", "onPropertyChange", "children"]);
        return React.createElement("slider", __assign({}, rest, { ref: forwardedRef || this.myRef }), children);
    };
    return _Slider;
}(View_1.RCTView));
exports._Slider = _Slider;
exports.Slider = React.forwardRef(function (props, ref) {
    var children = props.children, rest = __rest(props, ["children"]);
    return React.createElement(_Slider, __assign({}, rest, { forwardedRef: ref }), children);
});
//# sourceMappingURL=Slider.js.map

/***/ }),

/***/ "../node_modules/react-nativescript/dist/components/Span.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__("../node_modules/react/index.js");
var ViewBase_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/ViewBase.js");
var _Span = /** @class */ (function (_super) {
    __extends(_Span, _super);
    function _Span() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // static defaultProps = {
    //     forwardedRef: React.createRef<NativeScriptSpan>()
    // };
    _Span.prototype.render = function () {
        var _a = this.props, forwardedRef = _a.forwardedRef, onPropertyChange = _a.onPropertyChange, children = _a.children, rest = __rest(_a, ["forwardedRef", "onPropertyChange", "children"]);
        return React.createElement("span", __assign({}, rest, { ref: forwardedRef || this.myRef }), children);
    };
    return _Span;
}(ViewBase_1.RCTViewBase));
exports._Span = _Span;
exports.Span = React.forwardRef(function (props, ref) {
    var children = props.children, rest = __rest(props, ["children"]);
    return React.createElement(_Span, __assign({}, rest, { forwardedRef: ref }), children);
});
//# sourceMappingURL=Span.js.map

/***/ }),

/***/ "../node_modules/react-nativescript/dist/components/StackLayout.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__("../node_modules/react/index.js");
var LayoutBase_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/LayoutBase.js");
/**
 * A React wrapper around the NativeScript StackLayout component.
 * See: ui/layouts/grid-layout
 */
var _StackLayout = /** @class */ (function (_super) {
    __extends(_StackLayout, _super);
    function _StackLayout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    _StackLayout.prototype.render = function () {
        var _a = this.props, forwardedRef = _a.forwardedRef, onLoaded = _a.onLoaded, onUnloaded = _a.onUnloaded, onAndroidBackPressed = _a.onAndroidBackPressed, onShowingModally = _a.onShowingModally, onShownModally = _a.onShownModally, onTap = _a.onTap, onDoubleTap = _a.onDoubleTap, onPinch = _a.onPinch, onPan = _a.onPan, onSwipe = _a.onSwipe, onRotation = _a.onRotation, onLongPress = _a.onLongPress, onTouch = _a.onTouch, onPropertyChange = _a.onPropertyChange, children = _a.children, rest = __rest(_a, ["forwardedRef", "onLoaded", "onUnloaded", "onAndroidBackPressed", "onShowingModally", "onShownModally", "onTap", "onDoubleTap", "onPinch", "onPan", "onSwipe", "onRotation", "onLongPress", "onTouch", "onPropertyChange", "children"]);
        return React.createElement("stackLayout", __assign({}, rest, { ref: forwardedRef || this.myRef }), children);
    };
    return _StackLayout;
}(LayoutBase_1.RCTLayoutBase));
exports._StackLayout = _StackLayout;
exports.StackLayout = React.forwardRef(function (props, ref) {
    var children = props.children, rest = __rest(props, ["children"]);
    return React.createElement(_StackLayout, __assign({}, rest, { forwardedRef: ref }), children);
});
//# sourceMappingURL=StackLayout.js.map

/***/ }),

/***/ "../node_modules/react-nativescript/dist/components/Switch.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var console = __webpack_require__("../node_modules/react-nativescript/dist/shared/Logger.js");
var React = __webpack_require__("../node_modules/react/index.js");
var View_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/View.js");
var _Switch = /** @class */ (function (_super) {
    __extends(_Switch, _super);
    function _Switch() {
        // static defaultProps = {
        //     forwardedRef: React.createRef<NativeScriptSwitch>()
        // };
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onToggle = function (args) {
            var checked = args.object.checked;
            _this.props.onToggle && _this.props.onToggle(checked);
        };
        return _this;
    }
    _Switch.prototype.componentDidMount = function () {
        _super.prototype.componentDidMount.call(this);
        var node = this.getCurrentRef();
        if (!node) {
            console.warn("React ref to NativeScript View lost, so unable to update event listeners.");
            return;
        }
        node.on("checkedChange", this.onToggle);
    };
    _Switch.prototype.componentWillUnmount = function () {
        _super.prototype.componentWillUnmount.call(this);
        var node = this.getCurrentRef();
        if (!node) {
            console.warn("React ref to NativeScript View lost, so unable to update event listeners.");
            return;
        }
        node.off("checkedChange", this.onToggle);
    };
    _Switch.prototype.render = function () {
        var _a = this.props, forwardedRef = _a.forwardedRef, onLoaded = _a.onLoaded, onUnloaded = _a.onUnloaded, onAndroidBackPressed = _a.onAndroidBackPressed, onShowingModally = _a.onShowingModally, onShownModally = _a.onShownModally, onTap = _a.onTap, onDoubleTap = _a.onDoubleTap, onPinch = _a.onPinch, onPan = _a.onPan, onSwipe = _a.onSwipe, onRotation = _a.onRotation, onLongPress = _a.onLongPress, onTouch = _a.onTouch, onPropertyChange = _a.onPropertyChange, children = _a.children, rest = __rest(_a, ["forwardedRef", "onLoaded", "onUnloaded", "onAndroidBackPressed", "onShowingModally", "onShownModally", "onTap", "onDoubleTap", "onPinch", "onPan", "onSwipe", "onRotation", "onLongPress", "onTouch", "onPropertyChange", "children"]);
        return React.createElement("switch", __assign({}, rest, { ref: forwardedRef || this.myRef }), children);
    };
    return _Switch;
}(View_1.RCTView));
exports._Switch = _Switch;
exports.Switch = React.forwardRef(function (props, ref) {
    var children = props.children, rest = __rest(props, ["children"]);
    return React.createElement(_Switch, __assign({}, rest, { forwardedRef: ref }), children);
});
//# sourceMappingURL=Switch.js.map

/***/ }),

/***/ "../node_modules/react-nativescript/dist/components/TabView.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__("../node_modules/react/index.js");
var View_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/View.js");
var EventHandling_1 = __webpack_require__("../node_modules/react-nativescript/dist/client/EventHandling.js");
/**
 * A React wrapper around the NativeScript TabView component.
 *
 * The Host Config implicitly maps any TabViewItem children of TabView
 * onto the tabView.items property.
 *
 * So to get access to tabView.items, we'll have to use this.myRef.
 *
 * See: ui/tab-view/tab-view
 * See: https://github.com/NativeScript/nativescript-sdk-examples-js/blob/master/app/ns-ui-widgets-category/tab-view/code-behind/code-behind-ts-page.ts
 */
var _TabView = /** @class */ (function (_super) {
    __extends(_TabView, _super);
    function _TabView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param attach true: attach; false: detach; null: update
     */
    _TabView.prototype.updateListeners = function (node, attach, nextProps) {
        _super.prototype.updateListeners.call(this, node, attach, nextProps);
        if (attach === null) {
            EventHandling_1.updateListener(node, "selectedIndexChanged", this.props.onSelectedIndexChanged, nextProps.onSelectedIndexChanged);
        }
        else {
            var method = (attach ? node.on : node.off).bind(node);
            if (this.props.onSelectedIndexChanged)
                method("selectedIndexChanged", this.props.onSelectedIndexChanged);
        }
    };
    _TabView.prototype.render = function () {
        var _a = this.props, forwardedRef = _a.forwardedRef, onLoaded = _a.onLoaded, onUnloaded = _a.onUnloaded, onAndroidBackPressed = _a.onAndroidBackPressed, onShowingModally = _a.onShowingModally, onShownModally = _a.onShownModally, onTap = _a.onTap, onDoubleTap = _a.onDoubleTap, onPinch = _a.onPinch, onPan = _a.onPan, onSwipe = _a.onSwipe, onRotation = _a.onRotation, onLongPress = _a.onLongPress, onTouch = _a.onTouch, onPropertyChange = _a.onPropertyChange, children = _a.children, items = _a.items, rest = __rest(_a, ["forwardedRef", "onLoaded", "onUnloaded", "onAndroidBackPressed", "onShowingModally", "onShownModally", "onTap", "onDoubleTap", "onPinch", "onPan", "onSwipe", "onRotation", "onLongPress", "onTouch", "onPropertyChange", "children", "items"]);
        return React.createElement.apply(React, __spread(["tabView", __assign({}, rest, { 
                // items: [],
                ref: forwardedRef || this.myRef })], children));
    };
    return _TabView;
}(View_1.RCTView));
exports._TabView = _TabView;
exports.TabView = React.forwardRef(function (props, ref) {
    var children = props.children, rest = __rest(props, ["children"]);
    return React.createElement(_TabView, __assign({}, rest, { forwardedRef: ref }), children);
});
//# sourceMappingURL=TabView.js.map

/***/ }),

/***/ "../node_modules/react-nativescript/dist/components/TabViewItem.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__("../node_modules/react/index.js");
var ViewBase_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/ViewBase.js");
/**
 * A React wrapper around the NativeScript TabViewItem component.
 *
 * See: ui/tab-view/tab-view
 * See: https://github.com/NativeScript/nativescript-sdk-examples-js/blob/master/app/ns-ui-widgets-category/tab-view/code-behind/code-behind-ts-page.ts
 */
var _TabViewItem = /** @class */ (function (_super) {
    __extends(_TabViewItem, _super);
    function _TabViewItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    _TabViewItem.prototype.render = function () {
        var _a = this.props, forwardedRef = _a.forwardedRef, onPropertyChange = _a.onPropertyChange, children = _a.children, 
        // view, /* We disallow this at the typings level. */
        rest = __rest(_a, ["forwardedRef", "onPropertyChange", "children"]);
        if (React.Children.count(children) > 1 || typeof children === "string" || typeof children === "number") {
            throw new Error("'children' property passed into TabViewItem must be a single child node, which must not be a number or string");
        }
        return React.createElement("tabViewItem", __assign({}, rest, { ref: forwardedRef || this.myRef }), children);
    };
    return _TabViewItem;
}(ViewBase_1.RCTViewBase));
exports._TabViewItem = _TabViewItem;
exports.TabViewItem = React.forwardRef(function (props, ref) {
    var children = props.children, rest = __rest(props, ["children"]);
    return React.createElement(_TabViewItem, __assign({}, rest, { forwardedRef: ref }), children);
});
//# sourceMappingURL=TabViewItem.js.map

/***/ }),

/***/ "../node_modules/react-nativescript/dist/components/TextBase.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var View_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/View.js");
var formatted_string_1 = __webpack_require__("tns-core-modules/text/formatted-string");
function RNSFriendly(Base) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, __spread(args)) || this;
            _this.__ImplementsCustomNodeHierarchyManager__ = true;
            return _this;
            // This constructor call is needed for some reason; they must be doing something odd with the constructor.
        }
        class_1.prototype.__customHostConfigAppendChild = function (parent, child) {
            if (child instanceof formatted_string_1.FormattedString) {
                parent.formattedText = child;
                return true;
            }
            // i.e. defer to Host Config.
            return false;
        };
        class_1.prototype.__customHostConfigRemoveChild = function (parent, child) {
            if (child instanceof formatted_string_1.FormattedString) {
                parent.formattedText = null;
                return true;
            }
            // i.e. defer to Host Config.
            return false;
        };
        class_1.prototype.__customHostConfigInsertBefore = function (parent, child, beforeChild) {
            if (child instanceof formatted_string_1.FormattedString) {
                parent.formattedText = child;
                return true;
            }
            // i.e. defer to Host Config.
            return false;
        };
        return class_1;
    }(Base));
}
exports.RNSFriendly = RNSFriendly;
var RCTTextBase = /** @class */ (function (_super) {
    __extends(RCTTextBase, _super);
    function RCTTextBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RCTTextBase;
}(View_1.RCTView));
exports.RCTTextBase = RCTTextBase;
//# sourceMappingURL=TextBase.js.map

/***/ }),

/***/ "../node_modules/react-nativescript/dist/components/TextField.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var console = __webpack_require__("../node_modules/react-nativescript/dist/shared/Logger.js");
var React = __webpack_require__("../node_modules/react/index.js");
var text_field_1 = __webpack_require__("tns-core-modules/ui/text-field/text-field");
var EditableTextBase_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/EditableTextBase.js");
var TextBase_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/TextBase.js");
exports.RNSFriendlyTextField = TextBase_1.RNSFriendly(text_field_1.TextField);
var elementKey = "textField";
/**
 * Represents a text TextField.
 */
var _TextField = /** @class */ (function (_super) {
    __extends(_TextField, _super);
    function _TextField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    _TextField.prototype.render = function () {
        var _a;
        var _b = this.props, forwardedRef = _b.forwardedRef, onLoaded = _b.onLoaded, onUnloaded = _b.onUnloaded, onAndroidBackPressed = _b.onAndroidBackPressed, onShowingModally = _b.onShowingModally, onShownModally = _b.onShownModally, onTap = _b.onTap, onDoubleTap = _b.onDoubleTap, onPinch = _b.onPinch, onPan = _b.onPan, onSwipe = _b.onSwipe, onRotation = _b.onRotation, onLongPress = _b.onLongPress, onTouch = _b.onTouch, onPropertyChange = _b.onPropertyChange, text = _b.text, formattedText = _b.formattedText, children = _b.children, rest = __rest(_b, ["forwardedRef", "onLoaded", "onUnloaded", "onAndroidBackPressed", "onShowingModally", "onShownModally", "onTap", "onDoubleTap", "onPinch", "onPan", "onSwipe", "onRotation", "onLongPress", "onTouch", "onPropertyChange", "text", "formattedText", "children"]);
        if (text && formattedText) {
            console.warn("Both text and formattedText provided; shall use formattedText.");
        }
        var textContent = (_a = {},
            _a[formattedText ? "formattedText" : "text"] = formattedText || text,
            _a);
        return React.createElement(elementKey, __assign({}, rest, textContent, { ref: forwardedRef || this.myRef }), children // Weird that a TextField may contain children, but what do I know.
        );
    };
    return _TextField;
}(EditableTextBase_1.RCTEditableTextBase));
exports._TextField = _TextField;
exports.TextField = React.forwardRef(function (props, ref) {
    var children = props.children, rest = __rest(props, ["children"]);
    return React.createElement(_TextField, __assign({}, rest, { forwardedRef: ref }), children);
});
//# sourceMappingURL=TextField.js.map

/***/ }),

/***/ "../node_modules/react-nativescript/dist/components/TextView.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var console = __webpack_require__("../node_modules/react-nativescript/dist/shared/Logger.js");
var React = __webpack_require__("../node_modules/react/index.js");
var text_view_1 = __webpack_require__("tns-core-modules/ui/text-view/text-view");
var TextBase_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/TextBase.js");
var EditableTextBase_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/EditableTextBase.js");
exports.RNSFriendlyTextView = TextBase_1.RNSFriendly(text_view_1.TextView);
var elementKey = "textView";
/**
 * Represents a text TextView.
 */
var _TextView = /** @class */ (function (_super) {
    __extends(_TextView, _super);
    function _TextView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    _TextView.prototype.render = function () {
        var _a;
        var _b = this.props, forwardedRef = _b.forwardedRef, onLoaded = _b.onLoaded, onUnloaded = _b.onUnloaded, onAndroidBackPressed = _b.onAndroidBackPressed, onShowingModally = _b.onShowingModally, onShownModally = _b.onShownModally, onTap = _b.onTap, onDoubleTap = _b.onDoubleTap, onPinch = _b.onPinch, onPan = _b.onPan, onSwipe = _b.onSwipe, onRotation = _b.onRotation, onLongPress = _b.onLongPress, onTouch = _b.onTouch, onPropertyChange = _b.onPropertyChange, text = _b.text, formattedText = _b.formattedText, children = _b.children, rest = __rest(_b, ["forwardedRef", "onLoaded", "onUnloaded", "onAndroidBackPressed", "onShowingModally", "onShownModally", "onTap", "onDoubleTap", "onPinch", "onPan", "onSwipe", "onRotation", "onLongPress", "onTouch", "onPropertyChange", "text", "formattedText", "children"]);
        if (text && formattedText) {
            console.warn("Both text and formattedText provided; shall use formattedText.");
        }
        var textContent = (_a = {},
            _a[formattedText ? "formattedText" : "text"] = formattedText || text,
            _a);
        return React.createElement(elementKey, __assign({}, rest, textContent, { ref: forwardedRef || this.myRef }), children // Weird that a TextView may contain children, but what do I know.
        );
    };
    return _TextView;
}(EditableTextBase_1.RCTEditableTextBase));
exports._TextView = _TextView;
exports.TextView = React.forwardRef(function (props, ref) {
    var children = props.children, rest = __rest(props, ["children"]);
    return React.createElement(_TextView, __assign({}, rest, { forwardedRef: ref }), children);
});
//# sourceMappingURL=TextView.js.map

/***/ }),

/***/ "../node_modules/react-nativescript/dist/components/TimePicker.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var console = __webpack_require__("../node_modules/react-nativescript/dist/shared/Logger.js");
var React = __webpack_require__("../node_modules/react/index.js");
var View_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/View.js");
var _TimePicker = /** @class */ (function (_super) {
    __extends(_TimePicker, _super);
    function _TimePicker() {
        // static defaultProps = {
        //     forwardedRef: React.createRef<NativeScriptTimePicker>()
        // };
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onTimeChange = function (args) {
            var time = args.object.time;
            _this.props.onTimeChange && _this.props.onTimeChange(time);
        };
        return _this;
    }
    _TimePicker.prototype.componentDidMount = function () {
        _super.prototype.componentDidMount.call(this);
        var node = this.getCurrentRef();
        if (!node) {
            console.warn("React ref to NativeScript View lost, so unable to update event listeners.");
            return;
        }
        node.on("timeChange", this.onTimeChange);
    };
    _TimePicker.prototype.componentWillUnmount = function () {
        _super.prototype.componentWillUnmount.call(this);
        var node = this.getCurrentRef();
        if (!node) {
            console.warn("React ref to NativeScript View lost, so unable to update event listeners.");
            return;
        }
        node.off("timeChange", this.onTimeChange);
    };
    _TimePicker.prototype.render = function () {
        var _a = this.props, forwardedRef = _a.forwardedRef, onLoaded = _a.onLoaded, onUnloaded = _a.onUnloaded, onAndroidBackPressed = _a.onAndroidBackPressed, onShowingModally = _a.onShowingModally, onShownModally = _a.onShownModally, onTap = _a.onTap, onDoubleTap = _a.onDoubleTap, onPinch = _a.onPinch, onPan = _a.onPan, onSwipe = _a.onSwipe, onRotation = _a.onRotation, onLongPress = _a.onLongPress, onTouch = _a.onTouch, onPropertyChange = _a.onPropertyChange, time = _a.time, children = _a.children, rest = __rest(_a, ["forwardedRef", "onLoaded", "onUnloaded", "onAndroidBackPressed", "onShowingModally", "onShownModally", "onTap", "onDoubleTap", "onPinch", "onPan", "onSwipe", "onRotation", "onLongPress", "onTouch", "onPropertyChange", "time", "children"]);
        return React.createElement("timePicker", __assign({}, rest, { time: time || new Date(), ref: forwardedRef || this.myRef }), children);
    };
    return _TimePicker;
}(View_1.RCTView));
exports._TimePicker = _TimePicker;
exports.TimePicker = React.forwardRef(function (props, ref) {
    var children = props.children, rest = __rest(props, ["children"]);
    return React.createElement(_TimePicker, __assign({}, rest, { forwardedRef: ref }), children);
});
//# sourceMappingURL=TimePicker.js.map

/***/ }),

/***/ "../node_modules/react-nativescript/dist/components/View.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var gestures_1 = __webpack_require__("tns-core-modules/ui/gestures/gestures");
var ViewBase_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/ViewBase.js");
var EventHandling_1 = __webpack_require__("../node_modules/react-nativescript/dist/client/EventHandling.js");
var RCTView = /** @class */ (function (_super) {
    __extends(RCTView, _super);
    function RCTView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // static defaultProps = {
    //     forwardedRef: React.createRef<NativeScriptView>()
    // };
    /**
     *
     * @param attach true: attach; false: detach; null: update
     */
    RCTView.prototype.updateListeners = function (node, attach, nextProps) {
        _super.prototype.updateListeners.call(this, node, attach, nextProps);
        if (attach === null) {
            EventHandling_1.updateListener(node, "loaded", this.props.onLoaded, nextProps.onLoaded);
            EventHandling_1.updateListener(node, "unloaded", this.props.onUnloaded, nextProps.onUnloaded);
            EventHandling_1.updateListener(node, "androidBackPressed", this.props.onAndroidBackPressed, nextProps.onAndroidBackPressed);
            EventHandling_1.updateListener(node, "showingModally", this.props.onShowingModally, nextProps.onShowingModally);
            EventHandling_1.updateListener(node, "shownModally", this.props.onShownModally, nextProps.onShownModally);
            EventHandling_1.updateListener(node, gestures_1.GestureTypes.tap, this.props.onTap, nextProps.onTap, "tap");
            EventHandling_1.updateListener(node, gestures_1.GestureTypes.doubleTap, this.props.onDoubleTap, nextProps.onDoubleTap, "doubleTap");
            EventHandling_1.updateListener(node, gestures_1.GestureTypes.pinch, this.props.onPinch, nextProps.onPinch, "pinch");
            EventHandling_1.updateListener(node, gestures_1.GestureTypes.pan, this.props.onPan, nextProps.onPan, "pan");
            EventHandling_1.updateListener(node, gestures_1.GestureTypes.swipe, this.props.onSwipe, nextProps.onSwipe, "swipe");
            EventHandling_1.updateListener(node, gestures_1.GestureTypes.rotation, this.props.onRotation, nextProps.onRotation, "rotation");
            EventHandling_1.updateListener(node, gestures_1.GestureTypes.longPress, this.props.onLongPress, nextProps.onLongPress, "longPress");
            EventHandling_1.updateListener(node, gestures_1.GestureTypes.touch, this.props.onTouch, nextProps.onTouch, "touch");
        }
        else {
            var method = (attach ? node.on : node.off).bind(node);
            if (this.props.onLoaded)
                method("loaded", this.props.onLoaded);
            if (this.props.onUnloaded)
                method("unloaded", this.props.onUnloaded);
            if (this.props.onAndroidBackPressed)
                method("androidBackPressed", this.props.onAndroidBackPressed);
            if (this.props.onShowingModally)
                method("showingModally", this.props.onShowingModally);
            if (this.props.onShownModally)
                method("shownModally", this.props.onShownModally);
            if (this.props.onTap)
                method(gestures_1.GestureTypes.tap, this.props.onTap);
            if (this.props.onDoubleTap)
                method(gestures_1.GestureTypes.doubleTap, this.props.onDoubleTap);
            if (this.props.onPinch)
                method(gestures_1.GestureTypes.pinch, this.props.onPinch);
            if (this.props.onPan)
                method(gestures_1.GestureTypes.pan, this.props.onPan);
            if (this.props.onSwipe)
                method(gestures_1.GestureTypes.swipe, this.props.onSwipe);
            if (this.props.onRotation)
                method(gestures_1.GestureTypes.rotation, this.props.onRotation);
            if (this.props.onLongPress)
                method(gestures_1.GestureTypes.longPress, this.props.onLongPress);
            if (this.props.onTouch)
                method(gestures_1.GestureTypes.touch, this.props.onTouch);
        }
    };
    return RCTView;
}(ViewBase_1.RCTViewBase));
exports.RCTView = RCTView;
//# sourceMappingURL=View.js.map

/***/ }),

/***/ "../node_modules/react-nativescript/dist/components/ViewBase.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/Observable.js");
var RCTViewBase = /** @class */ (function (_super) {
    __extends(RCTViewBase, _super);
    function RCTViewBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RCTViewBase;
}(Observable_1.RCTObservable));
exports.RCTViewBase = RCTViewBase;
//# sourceMappingURL=ViewBase.js.map

/***/ }),

/***/ "../node_modules/react-nativescript/dist/components/WebView.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var console = __webpack_require__("../node_modules/react-nativescript/dist/shared/Logger.js");
var React = __webpack_require__("../node_modules/react/index.js");
var View_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/View.js");
var EventHandling_1 = __webpack_require__("../node_modules/react-nativescript/dist/client/EventHandling.js");
/**
 * A React wrapper around the NativeScript WebView component.
 * See: ui/WebView/WebView
 */
var _WebView = /** @class */ (function (_super) {
    __extends(_WebView, _super);
    function _WebView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onUrlChange = function (args) {
            var url = args.object.src;
            _this.props.onUrlChange && _this.props.onUrlChange(url);
        };
        return _this;
    }
    _WebView.prototype.componentDidMount = function () {
        _super.prototype.componentDidMount.call(this);
        var node = this.getCurrentRef();
        if (!node) {
            console.warn("React ref to NativeScript View lost, so unable to update event listeners.");
            return;
        }
        node.on("urlChange", this.onUrlChange);
    };
    _WebView.prototype.componentWillUnmount = function () {
        _super.prototype.componentWillUnmount.call(this);
        var node = this.getCurrentRef();
        if (!node) {
            console.warn("React ref to NativeScript View lost, so unable to update event listeners.");
            return;
        }
        node.off("urlChange", this.onUrlChange);
    };
    /**
     *
     * @param attach true: attach; false: detach; null: update
     */
    _WebView.prototype.updateListeners = function (node, attach, nextProps) {
        _super.prototype.updateListeners.call(this, node, attach, nextProps);
        if (attach === null) {
            EventHandling_1.updateListener(node, "loadFinished", this.props.onLoadFinished, nextProps.onLoadFinished);
            EventHandling_1.updateListener(node, "loadStarted", this.props.onLoadStarted, nextProps.onLoadStarted);
        }
        else {
            var method = (attach ? node.on : node.off).bind(node);
            if (this.props.onLoadFinished)
                method("loadFinished", this.props.onLoadFinished);
            if (this.props.onLoadStarted)
                method("loadStarted", this.props.onLoadStarted);
        }
    };
    _WebView.prototype.render = function () {
        var _a = this.props, forwardedRef = _a.forwardedRef, onLoaded = _a.onLoaded, onUnloaded = _a.onUnloaded, onAndroidBackPressed = _a.onAndroidBackPressed, onShowingModally = _a.onShowingModally, onShownModally = _a.onShownModally, onTap = _a.onTap, onDoubleTap = _a.onDoubleTap, onPinch = _a.onPinch, onPan = _a.onPan, onSwipe = _a.onSwipe, onRotation = _a.onRotation, onLongPress = _a.onLongPress, onTouch = _a.onTouch, onPropertyChange = _a.onPropertyChange, children = _a.children, rest = __rest(_a, ["forwardedRef", "onLoaded", "onUnloaded", "onAndroidBackPressed", "onShowingModally", "onShownModally", "onTap", "onDoubleTap", "onPinch", "onPan", "onSwipe", "onRotation", "onLongPress", "onTouch", "onPropertyChange", "children"]);
        if (children) {
            console.warn("Ignoring 'children' prop on WebView; not permitted");
        }
        return React.createElement("webView", __assign({}, rest, { ref: forwardedRef || this.myRef }), null);
    };
    return _WebView;
}(View_1.RCTView));
exports.WebView = React.forwardRef(function (props, ref) {
    var children = props.children, rest = __rest(props, ["children"]);
    return React.createElement(_WebView, __assign({}, rest, { forwardedRef: ref }), children);
});
//# sourceMappingURL=WebView.js.map

/***/ }),

/***/ "../node_modules/react-nativescript/dist/components/WrapLayout.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__("../node_modules/react/index.js");
var LayoutBase_1 = __webpack_require__("../node_modules/react-nativescript/dist/components/LayoutBase.js");
/**
 * A React wrapper around the NativeScript WrapLayout component.
 * See: ui/layouts/wrap-layout
 */
var _WrapLayout = /** @class */ (function (_super) {
    __extends(_WrapLayout, _super);
    function _WrapLayout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    _WrapLayout.prototype.render = function () {
        var _a = this.props, forwardedRef = _a.forwardedRef, onLoaded = _a.onLoaded, onUnloaded = _a.onUnloaded, onAndroidBackPressed = _a.onAndroidBackPressed, onShowingModally = _a.onShowingModally, onShownModally = _a.onShownModally, onTap = _a.onTap, onDoubleTap = _a.onDoubleTap, onPinch = _a.onPinch, onPan = _a.onPan, onSwipe = _a.onSwipe, onRotation = _a.onRotation, onLongPress = _a.onLongPress, onTouch = _a.onTouch, onPropertyChange = _a.onPropertyChange, children = _a.children, rest = __rest(_a, ["forwardedRef", "onLoaded", "onUnloaded", "onAndroidBackPressed", "onShowingModally", "onShownModally", "onTap", "onDoubleTap", "onPinch", "onPan", "onSwipe", "onRotation", "onLongPress", "onTouch", "onPropertyChange", "children"]);
        return React.createElement("wrapLayout", __assign({}, rest, { ref: forwardedRef || this.myRef }), children);
    };
    return _WrapLayout;
}(LayoutBase_1.RCTLayoutBase));
exports._WrapLayout = _WrapLayout;
exports.WrapLayout = React.forwardRef(function (props, ref) {
    var children = props.children, rest = __rest(props, ["children"]);
    return React.createElement(_WrapLayout, __assign({}, rest, { forwardedRef: ref }), children);
});
//# sourceMappingURL=WrapLayout.js.map

/***/ }),

/***/ "../node_modules/react-nativescript/dist/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("../node_modules/react-nativescript/dist/client/ReactNativeScript.js"));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../node_modules/react-nativescript/dist/shared/CSSPropertyOperations.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Code in here referenced from: https://github.com/facebook/react/blob/master/packages/react-dom/src/shared/CSSPropertyOperations.js which carries the following copyright:
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in React-LICENSE.txt.
 */
/**
 * Sets the value for multiple styles on a node.  If a value is specified as
 * '' (empty string), the corresponding style property will be unset.
 *
 * @param {DOMElement} instance
 * @param {object} styles
 */
function setValueForStyles(instance, styles) {
    // const style = instance.style;
    // for (let styleName in styles) {
    //     if (!styles.hasOwnProperty(styleName)) {
    //         continue;
    //     }
    //     const isCustomProperty = styleName.indexOf('--') === 0;
    //     if ((global as any).__DEV__) {
    //         if (!isCustomProperty) {
    //             // TODO
    //             // warnValidStyle(styleName, styles[styleName]);
    //         }
    //     }
    //     const styleValue = dangerousStyleValue(
    //         styleName,
    //         styles[styleName],
    //         isCustomProperty,
    //     );
    //     if (styleName === 'float') {
    //         styleName = 'cssFloat';
    //     }
    //     if (isCustomProperty) {
    //         // style.setProperty(styleName, styleValue);
    //         style[styleName] = styleValue;
    //     } else {
    //         style[styleName] = styleValue;
    //     }
    // }
    Object.keys(styles).forEach(function (styleName) {
        // console.log(`Setting style:`, styleName);
        var styleValue = styles[styleName];
        instance.set(styleName, styleValue);
    });
}
exports.setValueForStyles = setValueForStyles;
//# sourceMappingURL=CSSPropertyOperations.js.map

/***/ }),

/***/ "../node_modules/react-nativescript/dist/shared/HostConfigTypes.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function implementsCustomNodeHierarchyManager(view) {
    return view.__ImplementsCustomNodeHierarchyManager__ === true;
}
exports.implementsCustomNodeHierarchyManager = implementsCustomNodeHierarchyManager;
//# sourceMappingURL=HostConfigTypes.js.map

/***/ }),

/***/ "../node_modules/react-nativescript/dist/shared/Logger.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
// declare let __DEV__: boolean|undefined;
Object.defineProperty(exports, "__esModule", { value: true });
function log(message) {
    var optionalParams = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        optionalParams[_i - 1] = arguments[_i];
    }
    if (!global.__DEV__)
        return;
    console.log(message, optionalParams);
}
exports.log = log;
function warn(message) {
    var optionalParams = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        optionalParams[_i - 1] = arguments[_i];
    }
    if (!global.__DEV__)
        return;
    console.warn(message, optionalParams);
}
exports.warn = warn;
function error(message) {
    var optionalParams = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        optionalParams[_i - 1] = arguments[_i];
    }
    // if(!(global as any).__DEV__) return;
    console.error(message, optionalParams);
}
exports.error = error;
//# sourceMappingURL=Logger.js.map
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../node_modules/react-nativescript/dist/shared/assertValidProps.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
Object.defineProperty(exports, "__esModule", { value: true });
var console = __webpack_require__("../node_modules/react-nativescript/dist/shared/Logger.js");
/**
 * Code in here referenced from: https://github.com/facebook/react/blob/master/packages/react-dom/src/shared/assertValidProps.js which carries the following copyright:
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in React-LICENSE.txt.
 */
function assertValidProps(tag, props) {
    if (!props) {
        return;
    }
    if (global.__DEV__) {
        if (!(props.suppressContentEditableWarning || !props.contentEditable || props.children == null)) {
            console.warn("A component is `contentEditable` and contains `children` managed by " +
                "React. It is now your responsibility to guarantee that none of " +
                "those nodes are unexpectedly modified or duplicated. This is " +
                "probably not intentional.");
        }
    }
    if (!(props.style == null || typeof props.style === "object")) {
        throw new Error("The `style` prop expects a mapping from style properties to values, " +
            "not a string. For example, style={{marginRight: spacing + 'em'}} when " +
            "using JSX.");
    }
}
exports.default = assertValidProps;
//# sourceMappingURL=assertValidProps.js.map
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../node_modules/react-reconciler/cjs/react-reconciler.development.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v0.20.2
 * react-reconciler.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (true) {
  module.exports = function $$$reconciler($$$hostConfig) {
'use strict';

var _assign = __webpack_require__("../node_modules/object-assign/index.js");
var React = __webpack_require__("../node_modules/react/index.js");
var checkPropTypes = __webpack_require__("../node_modules/prop-types/checkPropTypes.js");
var tracing = __webpack_require__("../node_modules/scheduler/tracing.js");
var scheduler = __webpack_require__("../node_modules/scheduler/index.js");

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function () {};

{
  validateFormat = function (format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error = void 0;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

// Relying on the `invariant()` implementation lets us
// preserve the format and params in the www builds.

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warningWithoutStack = function () {};

{
  warningWithoutStack = function (condition, format) {
    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    if (format === undefined) {
      throw new Error('`warningWithoutStack(condition, format, ...args)` requires a warning ' + 'message argument');
    }
    if (args.length > 8) {
      // Check before the condition to catch violations early.
      throw new Error('warningWithoutStack() currently supports at most 8 arguments.');
    }
    if (condition) {
      return;
    }
    if (typeof console !== 'undefined') {
      var argsWithFormat = args.map(function (item) {
        return '' + item;
      });
      argsWithFormat.unshift('Warning: ' + format);

      // We intentionally don't use spread (or .apply) directly because it
      // breaks IE9: https://github.com/facebook/react/issues/13610
      Function.prototype.apply.call(console.error, console, argsWithFormat);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });
      throw new Error(message);
    } catch (x) {}
  };
}

var warningWithoutStack$1 = warningWithoutStack;

/**
 * `ReactInstanceMap` maintains a mapping from a public facing stateful
 * instance (key) and the internal representation (value). This allows public
 * methods to accept the user facing instance as an argument and map them back
 * to internal methods.
 *
 * Note that this module is currently shared and assumed to be stateless.
 * If this becomes an actual Map, that will break.
 */

/**
 * This API should be called `delete` but we'd have to make sure to always
 * transform these to strings for IE support. When this transform is fully
 * supported we can rename it.
 */


function get(key) {
  return key._reactInternalFiber;
}



function set(key, value) {
  key._reactInternalFiber = value;
}

var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

// Prevent newer renderers from RTE when used with older react package versions.
// Current owner and dispatcher used to share the same ref,
// but PR #14548 split them out to better support the react-debug-tools package.
if (!ReactSharedInternals.hasOwnProperty('ReactCurrentDispatcher')) {
  ReactSharedInternals.ReactCurrentDispatcher = {
    current: null
  };
}

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;

var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace;

var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;

var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator';

function getIteratorFn(maybeIterable) {
  if (maybeIterable === null || typeof maybeIterable !== 'object') {
    return null;
  }
  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
  if (typeof maybeIterator === 'function') {
    return maybeIterator;
  }
  return null;
}

var Pending = 0;
var Resolved = 1;
var Rejected = 2;

function refineResolvedLazyComponent(lazyComponent) {
  return lazyComponent._status === Resolved ? lazyComponent._result : null;
}

function getWrappedName(outerType, innerType, wrapperName) {
  var functionName = innerType.displayName || innerType.name || '';
  return outerType.displayName || (functionName !== '' ? wrapperName + '(' + functionName + ')' : wrapperName);
}

function getComponentName(type) {
  if (type == null) {
    // Host root, text node or just invalid type.
    return null;
  }
  {
    if (typeof type.tag === 'number') {
      warningWithoutStack$1(false, 'Received an unexpected object in getComponentName(). ' + 'This is likely a bug in React. Please file an issue.');
    }
  }
  if (typeof type === 'function') {
    return type.displayName || type.name || null;
  }
  if (typeof type === 'string') {
    return type;
  }
  switch (type) {
    case REACT_CONCURRENT_MODE_TYPE:
      return 'ConcurrentMode';
    case REACT_FRAGMENT_TYPE:
      return 'Fragment';
    case REACT_PORTAL_TYPE:
      return 'Portal';
    case REACT_PROFILER_TYPE:
      return 'Profiler';
    case REACT_STRICT_MODE_TYPE:
      return 'StrictMode';
    case REACT_SUSPENSE_TYPE:
      return 'Suspense';
  }
  if (typeof type === 'object') {
    switch (type.$$typeof) {
      case REACT_CONTEXT_TYPE:
        return 'Context.Consumer';
      case REACT_PROVIDER_TYPE:
        return 'Context.Provider';
      case REACT_FORWARD_REF_TYPE:
        return getWrappedName(type, type.render, 'ForwardRef');
      case REACT_MEMO_TYPE:
        return getComponentName(type.type);
      case REACT_LAZY_TYPE:
        {
          var thenable = type;
          var resolvedThenable = refineResolvedLazyComponent(thenable);
          if (resolvedThenable) {
            return getComponentName(resolvedThenable);
          }
        }
    }
  }
  return null;
}

var FunctionComponent = 0;
var ClassComponent = 1;
var IndeterminateComponent = 2; // Before we know whether it is function or class
var HostRoot = 3; // Root of a host tree. Could be nested inside another node.
var HostPortal = 4; // A subtree. Could be an entry point to a different renderer.
var HostComponent = 5;
var HostText = 6;
var Fragment = 7;
var Mode = 8;
var ContextConsumer = 9;
var ContextProvider = 10;
var ForwardRef = 11;
var Profiler = 12;
var SuspenseComponent = 13;
var MemoComponent = 14;
var SimpleMemoComponent = 15;
var LazyComponent = 16;
var IncompleteClassComponent = 17;
var DehydratedSuspenseComponent = 18;

// Don't change these two values. They're used by React Dev Tools.
var NoEffect = /*              */0;
var PerformedWork = /*         */1;

// You can change the rest (and add more).
var Placement = /*             */2;
var Update = /*                */4;
var PlacementAndUpdate = /*    */6;
var Deletion = /*              */8;
var ContentReset = /*          */16;
var Callback = /*              */32;
var DidCapture = /*            */64;
var Ref = /*                   */128;
var Snapshot = /*              */256;
var Passive = /*               */512;

// Passive & Update & Callback & Ref & Snapshot
var LifecycleEffectMask = /*   */932;

// Union of all host effects
var HostEffectMask = /*        */1023;

var Incomplete = /*            */1024;
var ShouldCapture = /*         */2048;

var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;

var MOUNTING = 1;
var MOUNTED = 2;
var UNMOUNTED = 3;

function isFiberMountedImpl(fiber) {
  var node = fiber;
  if (!fiber.alternate) {
    // If there is no alternate, this might be a new tree that isn't inserted
    // yet. If it is, then it will have a pending insertion effect on it.
    if ((node.effectTag & Placement) !== NoEffect) {
      return MOUNTING;
    }
    while (node.return) {
      node = node.return;
      if ((node.effectTag & Placement) !== NoEffect) {
        return MOUNTING;
      }
    }
  } else {
    while (node.return) {
      node = node.return;
    }
  }
  if (node.tag === HostRoot) {
    // TODO: Check if this was a nested HostRoot when used with
    // renderContainerIntoSubtree.
    return MOUNTED;
  }
  // If we didn't hit the root, that means that we're in an disconnected tree
  // that has been unmounted.
  return UNMOUNTED;
}

function isFiberMounted(fiber) {
  return isFiberMountedImpl(fiber) === MOUNTED;
}

function isMounted(component) {
  {
    var owner = ReactCurrentOwner.current;
    if (owner !== null && owner.tag === ClassComponent) {
      var ownerFiber = owner;
      var instance = ownerFiber.stateNode;
      !instance._warnedAboutRefsInRender ? warningWithoutStack$1(false, '%s is accessing isMounted inside its render() function. ' + 'render() should be a pure function of props and state. It should ' + 'never access something that requires stale data from the previous ' + 'render, such as refs. Move this logic to componentDidMount and ' + 'componentDidUpdate instead.', getComponentName(ownerFiber.type) || 'A component') : void 0;
      instance._warnedAboutRefsInRender = true;
    }
  }

  var fiber = get(component);
  if (!fiber) {
    return false;
  }
  return isFiberMountedImpl(fiber) === MOUNTED;
}

function assertIsMounted(fiber) {
  !(isFiberMountedImpl(fiber) === MOUNTED) ? invariant(false, 'Unable to find node on an unmounted component.') : void 0;
}

function findCurrentFiberUsingSlowPath(fiber) {
  var alternate = fiber.alternate;
  if (!alternate) {
    // If there is no alternate, then we only need to check if it is mounted.
    var state = isFiberMountedImpl(fiber);
    !(state !== UNMOUNTED) ? invariant(false, 'Unable to find node on an unmounted component.') : void 0;
    if (state === MOUNTING) {
      return null;
    }
    return fiber;
  }
  // If we have two possible branches, we'll walk backwards up to the root
  // to see what path the root points to. On the way we may hit one of the
  // special cases and we'll deal with them.
  var a = fiber;
  var b = alternate;
  while (true) {
    var parentA = a.return;
    var parentB = parentA ? parentA.alternate : null;
    if (!parentA || !parentB) {
      // We're at the root.
      break;
    }

    // If both copies of the parent fiber point to the same child, we can
    // assume that the child is current. This happens when we bailout on low
    // priority: the bailed out fiber's child reuses the current child.
    if (parentA.child === parentB.child) {
      var child = parentA.child;
      while (child) {
        if (child === a) {
          // We've determined that A is the current branch.
          assertIsMounted(parentA);
          return fiber;
        }
        if (child === b) {
          // We've determined that B is the current branch.
          assertIsMounted(parentA);
          return alternate;
        }
        child = child.sibling;
      }
      // We should never have an alternate for any mounting node. So the only
      // way this could possibly happen is if this was unmounted, if at all.
      invariant(false, 'Unable to find node on an unmounted component.');
    }

    if (a.return !== b.return) {
      // The return pointer of A and the return pointer of B point to different
      // fibers. We assume that return pointers never criss-cross, so A must
      // belong to the child set of A.return, and B must belong to the child
      // set of B.return.
      a = parentA;
      b = parentB;
    } else {
      // The return pointers point to the same fiber. We'll have to use the
      // default, slow path: scan the child sets of each parent alternate to see
      // which child belongs to which set.
      //
      // Search parent A's child set
      var didFindChild = false;
      var _child = parentA.child;
      while (_child) {
        if (_child === a) {
          didFindChild = true;
          a = parentA;
          b = parentB;
          break;
        }
        if (_child === b) {
          didFindChild = true;
          b = parentA;
          a = parentB;
          break;
        }
        _child = _child.sibling;
      }
      if (!didFindChild) {
        // Search parent B's child set
        _child = parentB.child;
        while (_child) {
          if (_child === a) {
            didFindChild = true;
            a = parentB;
            b = parentA;
            break;
          }
          if (_child === b) {
            didFindChild = true;
            b = parentB;
            a = parentA;
            break;
          }
          _child = _child.sibling;
        }
        !didFindChild ? invariant(false, 'Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.') : void 0;
      }
    }

    !(a.alternate === b) ? invariant(false, 'Return fibers should always be each others\' alternates. This error is likely caused by a bug in React. Please file an issue.') : void 0;
  }
  // If the root is not a host container, we're in a disconnected tree. I.e.
  // unmounted.
  !(a.tag === HostRoot) ? invariant(false, 'Unable to find node on an unmounted component.') : void 0;
  if (a.stateNode.current === a) {
    // We've determined that A is the current branch.
    return fiber;
  }
  // Otherwise B has to be current branch.
  return alternate;
}

function findCurrentHostFiber(parent) {
  var currentParent = findCurrentFiberUsingSlowPath(parent);
  if (!currentParent) {
    return null;
  }

  // Next we'll drill down this component to find the first HostComponent/Text.
  var node = currentParent;
  while (true) {
    if (node.tag === HostComponent || node.tag === HostText) {
      return node;
    } else if (node.child) {
      node.child.return = node;
      node = node.child;
      continue;
    }
    if (node === currentParent) {
      return null;
    }
    while (!node.sibling) {
      if (!node.return || node.return === currentParent) {
        return null;
      }
      node = node.return;
    }
    node.sibling.return = node.return;
    node = node.sibling;
  }
  // Flow needs the return null here, but ESLint complains about it.
  // eslint-disable-next-line no-unreachable
  return null;
}

function findCurrentHostFiberWithNoPortals(parent) {
  var currentParent = findCurrentFiberUsingSlowPath(parent);
  if (!currentParent) {
    return null;
  }

  // Next we'll drill down this component to find the first HostComponent/Text.
  var node = currentParent;
  while (true) {
    if (node.tag === HostComponent || node.tag === HostText) {
      return node;
    } else if (node.child && node.tag !== HostPortal) {
      node.child.return = node;
      node = node.child;
      continue;
    }
    if (node === currentParent) {
      return null;
    }
    while (!node.sibling) {
      if (!node.return || node.return === currentParent) {
        return null;
      }
      node = node.return;
    }
    node.sibling.return = node.return;
    node = node.sibling;
  }
  // Flow needs the return null here, but ESLint complains about it.
  // eslint-disable-next-line no-unreachable
  return null;
}

// eslint-disable-line no-undef

// eslint-disable-line no-undef
// eslint-disable-line no-undef
// eslint-disable-line no-undef
// eslint-disable-line no-undef
// eslint-disable-line no-undef
// eslint-disable-line no-undef
// This is a host config that's used for the `react-reconciler` package on npm.
// It is only used by third-party renderers.
//
// Its API lets you pass the host config as an argument.
// However, inside the `react-reconciler` we treat host config as a module.
// This file is a shim between two worlds.
//
// It works because the `react-reconciler` bundle is wrapped in something like:
//
// module.exports = function ($$$config) {
//   /* reconciler code */
// }
//
// So `$$$config` looks like a global variable, but it's
// really an argument to a top-level wrapping function.

var getPublicInstance = $$$hostConfig.getPublicInstance; // eslint-disable-line no-undef
// eslint-disable-line no-undef
// eslint-disable-line no-undef
// eslint-disable-line no-undef
// eslint-disable-line no-undef
// eslint-disable-line no-undef

var getRootHostContext = $$$hostConfig.getRootHostContext;
var getChildHostContext = $$$hostConfig.getChildHostContext;
var prepareForCommit = $$$hostConfig.prepareForCommit;
var resetAfterCommit = $$$hostConfig.resetAfterCommit;
var createInstance = $$$hostConfig.createInstance;
var appendInitialChild = $$$hostConfig.appendInitialChild;
var finalizeInitialChildren = $$$hostConfig.finalizeInitialChildren;
var prepareUpdate = $$$hostConfig.prepareUpdate;
var shouldSetTextContent = $$$hostConfig.shouldSetTextContent;
var shouldDeprioritizeSubtree = $$$hostConfig.shouldDeprioritizeSubtree;
var createTextInstance = $$$hostConfig.createTextInstance;
var scheduleDeferredCallback = $$$hostConfig.scheduleDeferredCallback;
var cancelDeferredCallback = $$$hostConfig.cancelDeferredCallback;
var shouldYield = $$$hostConfig.shouldYield;
var scheduleTimeout = $$$hostConfig.setTimeout;
var cancelTimeout = $$$hostConfig.clearTimeout;
var noTimeout = $$$hostConfig.noTimeout;
var schedulePassiveEffects = $$$hostConfig.schedulePassiveEffects;
var cancelPassiveEffects = $$$hostConfig.cancelPassiveEffects;
var now = $$$hostConfig.now;
var isPrimaryRenderer = $$$hostConfig.isPrimaryRenderer;
var supportsMutation = $$$hostConfig.supportsMutation;
var supportsPersistence = $$$hostConfig.supportsPersistence;
var supportsHydration = $$$hostConfig.supportsHydration;

// -------------------
//      Mutation
//     (optional)
// -------------------
var appendChild = $$$hostConfig.appendChild;
var appendChildToContainer = $$$hostConfig.appendChildToContainer;
var commitTextUpdate = $$$hostConfig.commitTextUpdate;
var commitMount = $$$hostConfig.commitMount;
var commitUpdate = $$$hostConfig.commitUpdate;
var insertBefore = $$$hostConfig.insertBefore;
var insertInContainerBefore = $$$hostConfig.insertInContainerBefore;
var removeChild = $$$hostConfig.removeChild;
var removeChildFromContainer = $$$hostConfig.removeChildFromContainer;
var resetTextContent = $$$hostConfig.resetTextContent;
var hideInstance = $$$hostConfig.hideInstance;
var hideTextInstance = $$$hostConfig.hideTextInstance;
var unhideInstance = $$$hostConfig.unhideInstance;
var unhideTextInstance = $$$hostConfig.unhideTextInstance;

// -------------------
//     Persistence
//     (optional)
// -------------------
var cloneInstance = $$$hostConfig.cloneInstance;
var createContainerChildSet = $$$hostConfig.createContainerChildSet;
var appendChildToContainerChildSet = $$$hostConfig.appendChildToContainerChildSet;
var finalizeContainerChildren = $$$hostConfig.finalizeContainerChildren;
var replaceContainerChildren = $$$hostConfig.replaceContainerChildren;
var cloneHiddenInstance = $$$hostConfig.cloneHiddenInstance;
var cloneUnhiddenInstance = $$$hostConfig.cloneUnhiddenInstance;
var createHiddenTextInstance = $$$hostConfig.createHiddenTextInstance;

// -------------------
//     Hydration
//     (optional)
// -------------------
var canHydrateInstance = $$$hostConfig.canHydrateInstance;
var canHydrateTextInstance = $$$hostConfig.canHydrateTextInstance;
var canHydrateSuspenseInstance = $$$hostConfig.canHydrateSuspenseInstance;
var getNextHydratableSibling = $$$hostConfig.getNextHydratableSibling;
var getFirstHydratableChild = $$$hostConfig.getFirstHydratableChild;
var hydrateInstance = $$$hostConfig.hydrateInstance;
var hydrateTextInstance = $$$hostConfig.hydrateTextInstance;
var getNextHydratableInstanceAfterSuspenseInstance = $$$hostConfig.getNextHydratableInstanceAfterSuspenseInstance;
var clearSuspenseBoundary = $$$hostConfig.clearSuspenseBoundary;
var clearSuspenseBoundaryFromContainer = $$$hostConfig.clearSuspenseBoundaryFromContainer;
var didNotMatchHydratedContainerTextInstance = $$$hostConfig.didNotMatchHydratedContainerTextInstance;
var didNotMatchHydratedTextInstance = $$$hostConfig.didNotMatchHydratedTextInstance;
var didNotHydrateContainerInstance = $$$hostConfig.didNotHydrateContainerInstance;
var didNotHydrateInstance = $$$hostConfig.didNotHydrateInstance;
var didNotFindHydratableContainerInstance = $$$hostConfig.didNotFindHydratableContainerInstance;
var didNotFindHydratableContainerTextInstance = $$$hostConfig.didNotFindHydratableContainerTextInstance;
var didNotFindHydratableContainerSuspenseInstance = $$$hostConfig.didNotFindHydratableContainerSuspenseInstance;
var didNotFindHydratableInstance = $$$hostConfig.didNotFindHydratableInstance;
var didNotFindHydratableTextInstance = $$$hostConfig.didNotFindHydratableTextInstance;
var didNotFindHydratableSuspenseInstance = $$$hostConfig.didNotFindHydratableSuspenseInstance;

var BEFORE_SLASH_RE = /^(.*)[\\\/]/;

var describeComponentFrame = function (name, source, ownerName) {
  var sourceInfo = '';
  if (source) {
    var path = source.fileName;
    var fileName = path.replace(BEFORE_SLASH_RE, '');
    {
      // In DEV, include code for a common special case:
      // prefer "folder/index.js" instead of just "index.js".
      if (/^index\./.test(fileName)) {
        var match = path.match(BEFORE_SLASH_RE);
        if (match) {
          var pathBeforeSlash = match[1];
          if (pathBeforeSlash) {
            var folderName = pathBeforeSlash.replace(BEFORE_SLASH_RE, '');
            fileName = folderName + '/' + fileName;
          }
        }
      }
    }
    sourceInfo = ' (at ' + fileName + ':' + source.lineNumber + ')';
  } else if (ownerName) {
    sourceInfo = ' (created by ' + ownerName + ')';
  }
  return '\n    in ' + (name || 'Unknown') + sourceInfo;
};

var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;

function describeFiber(fiber) {
  switch (fiber.tag) {
    case HostRoot:
    case HostPortal:
    case HostText:
    case Fragment:
    case ContextProvider:
    case ContextConsumer:
      return '';
    default:
      var owner = fiber._debugOwner;
      var source = fiber._debugSource;
      var name = getComponentName(fiber.type);
      var ownerName = null;
      if (owner) {
        ownerName = getComponentName(owner.type);
      }
      return describeComponentFrame(name, source, ownerName);
  }
}

function getStackByFiberInDevAndProd(workInProgress) {
  var info = '';
  var node = workInProgress;
  do {
    info += describeFiber(node);
    node = node.return;
  } while (node);
  return info;
}

var current = null;
var phase = null;

function getCurrentFiberOwnerNameInDevOrNull() {
  {
    if (current === null) {
      return null;
    }
    var owner = current._debugOwner;
    if (owner !== null && typeof owner !== 'undefined') {
      return getComponentName(owner.type);
    }
  }
  return null;
}

function getCurrentFiberStackInDev() {
  {
    if (current === null) {
      return '';
    }
    // Safe because if current fiber exists, we are reconciling,
    // and it is guaranteed to be the work-in-progress version.
    return getStackByFiberInDevAndProd(current);
  }
  return '';
}

function resetCurrentFiber() {
  {
    ReactDebugCurrentFrame.getCurrentStack = null;
    current = null;
    phase = null;
  }
}

function setCurrentFiber(fiber) {
  {
    ReactDebugCurrentFrame.getCurrentStack = getCurrentFiberStackInDev;
    current = fiber;
    phase = null;
  }
}

function setCurrentPhase(lifeCyclePhase) {
  {
    phase = lifeCyclePhase;
  }
}

var enableUserTimingAPI = true;

// Helps identify side effects in begin-phase lifecycle hooks and setState reducers:
var debugRenderPhaseSideEffects = false;

// In some cases, StrictMode should also double-render lifecycles.
// This can be confusing for tests though,
// And it can be bad for performance in production.
// This feature flag can be used to control the behavior:
var debugRenderPhaseSideEffectsForStrictMode = true;

// To preserve the "Pause on caught exceptions" behavior of the debugger, we
// replay the begin phase of a failed component inside invokeGuardedCallback.
var replayFailedUnitOfWorkWithInvokeGuardedCallback = true;

// Warn about deprecated, async-unsafe lifecycles; relates to RFC #6:
var warnAboutDeprecatedLifecycles = false;

// Gather advanced timing metrics for Profiler subtrees.
var enableProfilerTimer = true;

// Trace which interactions trigger each commit.
var enableSchedulerTracing = true;

// Only used in www builds.
var enableSuspenseServerRenderer = false; // TODO: true? Here it might just be false.

// Only used in www builds.


// Only used in www builds.


// React Fire: prevent the value and checked attributes from syncing
// with their related DOM properties


// These APIs will no longer be "unstable" in the upcoming 16.7 release,
// Control this behavior with a flag to support 16.6 minor releases in the meanwhile.

// Prefix measurements so that it's possible to filter them.
// Longer prefixes are hard to read in DevTools.
var reactEmoji = '\u269B';
var warningEmoji = '\u26D4';
var supportsUserTiming = typeof performance !== 'undefined' && typeof performance.mark === 'function' && typeof performance.clearMarks === 'function' && typeof performance.measure === 'function' && typeof performance.clearMeasures === 'function';

// Keep track of current fiber so that we know the path to unwind on pause.
// TODO: this looks the same as nextUnitOfWork in scheduler. Can we unify them?
var currentFiber = null;
// If we're in the middle of user code, which fiber and method is it?
// Reusing `currentFiber` would be confusing for this because user code fiber
// can change during commit phase too, but we don't need to unwind it (since
// lifecycles in the commit phase don't resemble a tree).
var currentPhase = null;
var currentPhaseFiber = null;
// Did lifecycle hook schedule an update? This is often a performance problem,
// so we will keep track of it, and include it in the report.
// Track commits caused by cascading updates.
var isCommitting = false;
var hasScheduledUpdateInCurrentCommit = false;
var hasScheduledUpdateInCurrentPhase = false;
var commitCountInCurrentWorkLoop = 0;
var effectCountInCurrentCommit = 0;
var isWaitingForCallback = false;
// During commits, we only show a measurement once per method name
// to avoid stretch the commit phase with measurement overhead.
var labelsInCurrentCommit = new Set();

var formatMarkName = function (markName) {
  return reactEmoji + ' ' + markName;
};

var formatLabel = function (label, warning) {
  var prefix = warning ? warningEmoji + ' ' : reactEmoji + ' ';
  var suffix = warning ? ' Warning: ' + warning : '';
  return '' + prefix + label + suffix;
};

var beginMark = function (markName) {
  performance.mark(formatMarkName(markName));
};

var clearMark = function (markName) {
  performance.clearMarks(formatMarkName(markName));
};

var endMark = function (label, markName, warning) {
  var formattedMarkName = formatMarkName(markName);
  var formattedLabel = formatLabel(label, warning);
  try {
    performance.measure(formattedLabel, formattedMarkName);
  } catch (err) {}
  // If previous mark was missing for some reason, this will throw.
  // This could only happen if React crashed in an unexpected place earlier.
  // Don't pile on with more errors.

  // Clear marks immediately to avoid growing buffer.
  performance.clearMarks(formattedMarkName);
  performance.clearMeasures(formattedLabel);
};

var getFiberMarkName = function (label, debugID) {
  return label + ' (#' + debugID + ')';
};

var getFiberLabel = function (componentName, isMounted, phase) {
  if (phase === null) {
    // These are composite component total time measurements.
    return componentName + ' [' + (isMounted ? 'update' : 'mount') + ']';
  } else {
    // Composite component methods.
    return componentName + '.' + phase;
  }
};

var beginFiberMark = function (fiber, phase) {
  var componentName = getComponentName(fiber.type) || 'Unknown';
  var debugID = fiber._debugID;
  var isMounted = fiber.alternate !== null;
  var label = getFiberLabel(componentName, isMounted, phase);

  if (isCommitting && labelsInCurrentCommit.has(label)) {
    // During the commit phase, we don't show duplicate labels because
    // there is a fixed overhead for every measurement, and we don't
    // want to stretch the commit phase beyond necessary.
    return false;
  }
  labelsInCurrentCommit.add(label);

  var markName = getFiberMarkName(label, debugID);
  beginMark(markName);
  return true;
};

var clearFiberMark = function (fiber, phase) {
  var componentName = getComponentName(fiber.type) || 'Unknown';
  var debugID = fiber._debugID;
  var isMounted = fiber.alternate !== null;
  var label = getFiberLabel(componentName, isMounted, phase);
  var markName = getFiberMarkName(label, debugID);
  clearMark(markName);
};

var endFiberMark = function (fiber, phase, warning) {
  var componentName = getComponentName(fiber.type) || 'Unknown';
  var debugID = fiber._debugID;
  var isMounted = fiber.alternate !== null;
  var label = getFiberLabel(componentName, isMounted, phase);
  var markName = getFiberMarkName(label, debugID);
  endMark(label, markName, warning);
};

var shouldIgnoreFiber = function (fiber) {
  // Host components should be skipped in the timeline.
  // We could check typeof fiber.type, but does this work with RN?
  switch (fiber.tag) {
    case HostRoot:
    case HostComponent:
    case HostText:
    case HostPortal:
    case Fragment:
    case ContextProvider:
    case ContextConsumer:
    case Mode:
      return true;
    default:
      return false;
  }
};

var clearPendingPhaseMeasurement = function () {
  if (currentPhase !== null && currentPhaseFiber !== null) {
    clearFiberMark(currentPhaseFiber, currentPhase);
  }
  currentPhaseFiber = null;
  currentPhase = null;
  hasScheduledUpdateInCurrentPhase = false;
};

var pauseTimers = function () {
  // Stops all currently active measurements so that they can be resumed
  // if we continue in a later deferred loop from the same unit of work.
  var fiber = currentFiber;
  while (fiber) {
    if (fiber._debugIsCurrentlyTiming) {
      endFiberMark(fiber, null, null);
    }
    fiber = fiber.return;
  }
};

var resumeTimersRecursively = function (fiber) {
  if (fiber.return !== null) {
    resumeTimersRecursively(fiber.return);
  }
  if (fiber._debugIsCurrentlyTiming) {
    beginFiberMark(fiber, null);
  }
};

var resumeTimers = function () {
  // Resumes all measurements that were active during the last deferred loop.
  if (currentFiber !== null) {
    resumeTimersRecursively(currentFiber);
  }
};

function recordEffect() {
  if (enableUserTimingAPI) {
    effectCountInCurrentCommit++;
  }
}

function recordScheduleUpdate() {
  if (enableUserTimingAPI) {
    if (isCommitting) {
      hasScheduledUpdateInCurrentCommit = true;
    }
    if (currentPhase !== null && currentPhase !== 'componentWillMount' && currentPhase !== 'componentWillReceiveProps') {
      hasScheduledUpdateInCurrentPhase = true;
    }
  }
}

function startRequestCallbackTimer() {
  if (enableUserTimingAPI) {
    if (supportsUserTiming && !isWaitingForCallback) {
      isWaitingForCallback = true;
      beginMark('(Waiting for async callback...)');
    }
  }
}

function stopRequestCallbackTimer(didExpire, expirationTime) {
  if (enableUserTimingAPI) {
    if (supportsUserTiming) {
      isWaitingForCallback = false;
      var warning = didExpire ? 'React was blocked by main thread' : null;
      endMark('(Waiting for async callback... will force flush in ' + expirationTime + ' ms)', '(Waiting for async callback...)', warning);
    }
  }
}

function startWorkTimer(fiber) {
  if (enableUserTimingAPI) {
    if (!supportsUserTiming || shouldIgnoreFiber(fiber)) {
      return;
    }
    // If we pause, this is the fiber to unwind from.
    currentFiber = fiber;
    if (!beginFiberMark(fiber, null)) {
      return;
    }
    fiber._debugIsCurrentlyTiming = true;
  }
}

function cancelWorkTimer(fiber) {
  if (enableUserTimingAPI) {
    if (!supportsUserTiming || shouldIgnoreFiber(fiber)) {
      return;
    }
    // Remember we shouldn't complete measurement for this fiber.
    // Otherwise flamechart will be deep even for small updates.
    fiber._debugIsCurrentlyTiming = false;
    clearFiberMark(fiber, null);
  }
}

function stopWorkTimer(fiber) {
  if (enableUserTimingAPI) {
    if (!supportsUserTiming || shouldIgnoreFiber(fiber)) {
      return;
    }
    // If we pause, its parent is the fiber to unwind from.
    currentFiber = fiber.return;
    if (!fiber._debugIsCurrentlyTiming) {
      return;
    }
    fiber._debugIsCurrentlyTiming = false;
    endFiberMark(fiber, null, null);
  }
}

function stopFailedWorkTimer(fiber) {
  if (enableUserTimingAPI) {
    if (!supportsUserTiming || shouldIgnoreFiber(fiber)) {
      return;
    }
    // If we pause, its parent is the fiber to unwind from.
    currentFiber = fiber.return;
    if (!fiber._debugIsCurrentlyTiming) {
      return;
    }
    fiber._debugIsCurrentlyTiming = false;
    var warning = fiber.tag === SuspenseComponent || fiber.tag === DehydratedSuspenseComponent ? 'Rendering was suspended' : 'An error was thrown inside this error boundary';
    endFiberMark(fiber, null, warning);
  }
}

function startPhaseTimer(fiber, phase) {
  if (enableUserTimingAPI) {
    if (!supportsUserTiming) {
      return;
    }
    clearPendingPhaseMeasurement();
    if (!beginFiberMark(fiber, phase)) {
      return;
    }
    currentPhaseFiber = fiber;
    currentPhase = phase;
  }
}

function stopPhaseTimer() {
  if (enableUserTimingAPI) {
    if (!supportsUserTiming) {
      return;
    }
    if (currentPhase !== null && currentPhaseFiber !== null) {
      var warning = hasScheduledUpdateInCurrentPhase ? 'Scheduled a cascading update' : null;
      endFiberMark(currentPhaseFiber, currentPhase, warning);
    }
    currentPhase = null;
    currentPhaseFiber = null;
  }
}

function startWorkLoopTimer(nextUnitOfWork) {
  if (enableUserTimingAPI) {
    currentFiber = nextUnitOfWork;
    if (!supportsUserTiming) {
      return;
    }
    commitCountInCurrentWorkLoop = 0;
    // This is top level call.
    // Any other measurements are performed within.
    beginMark('(React Tree Reconciliation)');
    // Resume any measurements that were in progress during the last loop.
    resumeTimers();
  }
}

function stopWorkLoopTimer(interruptedBy, didCompleteRoot) {
  if (enableUserTimingAPI) {
    if (!supportsUserTiming) {
      return;
    }
    var warning = null;
    if (interruptedBy !== null) {
      if (interruptedBy.tag === HostRoot) {
        warning = 'A top-level update interrupted the previous render';
      } else {
        var componentName = getComponentName(interruptedBy.type) || 'Unknown';
        warning = 'An update to ' + componentName + ' interrupted the previous render';
      }
    } else if (commitCountInCurrentWorkLoop > 1) {
      warning = 'There were cascading updates';
    }
    commitCountInCurrentWorkLoop = 0;
    var label = didCompleteRoot ? '(React Tree Reconciliation: Completed Root)' : '(React Tree Reconciliation: Yielded)';
    // Pause any measurements until the next loop.
    pauseTimers();
    endMark(label, '(React Tree Reconciliation)', warning);
  }
}

function startCommitTimer() {
  if (enableUserTimingAPI) {
    if (!supportsUserTiming) {
      return;
    }
    isCommitting = true;
    hasScheduledUpdateInCurrentCommit = false;
    labelsInCurrentCommit.clear();
    beginMark('(Committing Changes)');
  }
}

function stopCommitTimer() {
  if (enableUserTimingAPI) {
    if (!supportsUserTiming) {
      return;
    }

    var warning = null;
    if (hasScheduledUpdateInCurrentCommit) {
      warning = 'Lifecycle hook scheduled a cascading update';
    } else if (commitCountInCurrentWorkLoop > 0) {
      warning = 'Caused by a cascading update in earlier commit';
    }
    hasScheduledUpdateInCurrentCommit = false;
    commitCountInCurrentWorkLoop++;
    isCommitting = false;
    labelsInCurrentCommit.clear();

    endMark('(Committing Changes)', '(Committing Changes)', warning);
  }
}

function startCommitSnapshotEffectsTimer() {
  if (enableUserTimingAPI) {
    if (!supportsUserTiming) {
      return;
    }
    effectCountInCurrentCommit = 0;
    beginMark('(Committing Snapshot Effects)');
  }
}

function stopCommitSnapshotEffectsTimer() {
  if (enableUserTimingAPI) {
    if (!supportsUserTiming) {
      return;
    }
    var count = effectCountInCurrentCommit;
    effectCountInCurrentCommit = 0;
    endMark('(Committing Snapshot Effects: ' + count + ' Total)', '(Committing Snapshot Effects)', null);
  }
}

function startCommitHostEffectsTimer() {
  if (enableUserTimingAPI) {
    if (!supportsUserTiming) {
      return;
    }
    effectCountInCurrentCommit = 0;
    beginMark('(Committing Host Effects)');
  }
}

function stopCommitHostEffectsTimer() {
  if (enableUserTimingAPI) {
    if (!supportsUserTiming) {
      return;
    }
    var count = effectCountInCurrentCommit;
    effectCountInCurrentCommit = 0;
    endMark('(Committing Host Effects: ' + count + ' Total)', '(Committing Host Effects)', null);
  }
}

function startCommitLifeCyclesTimer() {
  if (enableUserTimingAPI) {
    if (!supportsUserTiming) {
      return;
    }
    effectCountInCurrentCommit = 0;
    beginMark('(Calling Lifecycle Methods)');
  }
}

function stopCommitLifeCyclesTimer() {
  if (enableUserTimingAPI) {
    if (!supportsUserTiming) {
      return;
    }
    var count = effectCountInCurrentCommit;
    effectCountInCurrentCommit = 0;
    endMark('(Calling Lifecycle Methods: ' + count + ' Total)', '(Calling Lifecycle Methods)', null);
  }
}

var valueStack = [];

var fiberStack = void 0;

{
  fiberStack = [];
}

var index = -1;

function createCursor(defaultValue) {
  return {
    current: defaultValue
  };
}

function pop(cursor, fiber) {
  if (index < 0) {
    {
      warningWithoutStack$1(false, 'Unexpected pop.');
    }
    return;
  }

  {
    if (fiber !== fiberStack[index]) {
      warningWithoutStack$1(false, 'Unexpected Fiber popped.');
    }
  }

  cursor.current = valueStack[index];

  valueStack[index] = null;

  {
    fiberStack[index] = null;
  }

  index--;
}

function push(cursor, value, fiber) {
  index++;

  valueStack[index] = cursor.current;

  {
    fiberStack[index] = fiber;
  }

  cursor.current = value;
}

function checkThatStackIsEmpty() {
  {
    if (index !== -1) {
      warningWithoutStack$1(false, 'Expected an empty stack. Something was not reset properly.');
    }
  }
}

function resetStackAfterFatalErrorInDev() {
  {
    index = -1;
    valueStack.length = 0;
    fiberStack.length = 0;
  }
}

var warnedAboutMissingGetChildContext = void 0;

{
  warnedAboutMissingGetChildContext = {};
}

var emptyContextObject = {};
{
  Object.freeze(emptyContextObject);
}

// A cursor to the current merged context object on the stack.
var contextStackCursor = createCursor(emptyContextObject);
// A cursor to a boolean indicating whether the context has changed.
var didPerformWorkStackCursor = createCursor(false);
// Keep track of the previous context object that was on the stack.
// We use this to get access to the parent context after we have already
// pushed the next context provider, and now need to merge their contexts.
var previousContext = emptyContextObject;

function getUnmaskedContext(workInProgress, Component, didPushOwnContextIfProvider) {
  if (didPushOwnContextIfProvider && isContextProvider(Component)) {
    // If the fiber is a context provider itself, when we read its context
    // we may have already pushed its own child context on the stack. A context
    // provider should not "see" its own child context. Therefore we read the
    // previous (parent) context instead for a context provider.
    return previousContext;
  }
  return contextStackCursor.current;
}

function cacheContext(workInProgress, unmaskedContext, maskedContext) {
  var instance = workInProgress.stateNode;
  instance.__reactInternalMemoizedUnmaskedChildContext = unmaskedContext;
  instance.__reactInternalMemoizedMaskedChildContext = maskedContext;
}

function getMaskedContext(workInProgress, unmaskedContext) {
  var type = workInProgress.type;
  var contextTypes = type.contextTypes;
  if (!contextTypes) {
    return emptyContextObject;
  }

  // Avoid recreating masked context unless unmasked context has changed.
  // Failing to do this will result in unnecessary calls to componentWillReceiveProps.
  // This may trigger infinite loops if componentWillReceiveProps calls setState.
  var instance = workInProgress.stateNode;
  if (instance && instance.__reactInternalMemoizedUnmaskedChildContext === unmaskedContext) {
    return instance.__reactInternalMemoizedMaskedChildContext;
  }

  var context = {};
  for (var key in contextTypes) {
    context[key] = unmaskedContext[key];
  }

  {
    var name = getComponentName(type) || 'Unknown';
    checkPropTypes(contextTypes, context, 'context', name, getCurrentFiberStackInDev);
  }

  // Cache unmasked context so we can avoid recreating masked context unless necessary.
  // Context is created before the class component is instantiated so check for instance.
  if (instance) {
    cacheContext(workInProgress, unmaskedContext, context);
  }

  return context;
}

function hasContextChanged() {
  return didPerformWorkStackCursor.current;
}

function isContextProvider(type) {
  var childContextTypes = type.childContextTypes;
  return childContextTypes !== null && childContextTypes !== undefined;
}

function popContext(fiber) {
  pop(didPerformWorkStackCursor, fiber);
  pop(contextStackCursor, fiber);
}

function popTopLevelContextObject(fiber) {
  pop(didPerformWorkStackCursor, fiber);
  pop(contextStackCursor, fiber);
}

function pushTopLevelContextObject(fiber, context, didChange) {
  !(contextStackCursor.current === emptyContextObject) ? invariant(false, 'Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.') : void 0;

  push(contextStackCursor, context, fiber);
  push(didPerformWorkStackCursor, didChange, fiber);
}

function processChildContext(fiber, type, parentContext) {
  var instance = fiber.stateNode;
  var childContextTypes = type.childContextTypes;

  // TODO (bvaughn) Replace this behavior with an invariant() in the future.
  // It has only been added in Fiber to match the (unintentional) behavior in Stack.
  if (typeof instance.getChildContext !== 'function') {
    {
      var componentName = getComponentName(type) || 'Unknown';

      if (!warnedAboutMissingGetChildContext[componentName]) {
        warnedAboutMissingGetChildContext[componentName] = true;
        warningWithoutStack$1(false, '%s.childContextTypes is specified but there is no getChildContext() method ' + 'on the instance. You can either define getChildContext() on %s or remove ' + 'childContextTypes from it.', componentName, componentName);
      }
    }
    return parentContext;
  }

  var childContext = void 0;
  {
    setCurrentPhase('getChildContext');
  }
  startPhaseTimer(fiber, 'getChildContext');
  childContext = instance.getChildContext();
  stopPhaseTimer();
  {
    setCurrentPhase(null);
  }
  for (var contextKey in childContext) {
    !(contextKey in childContextTypes) ? invariant(false, '%s.getChildContext(): key "%s" is not defined in childContextTypes.', getComponentName(type) || 'Unknown', contextKey) : void 0;
  }
  {
    var name = getComponentName(type) || 'Unknown';
    checkPropTypes(childContextTypes, childContext, 'child context', name,
    // In practice, there is one case in which we won't get a stack. It's when
    // somebody calls unstable_renderSubtreeIntoContainer() and we process
    // context from the parent component instance. The stack will be missing
    // because it's outside of the reconciliation, and so the pointer has not
    // been set. This is rare and doesn't matter. We'll also remove that API.
    getCurrentFiberStackInDev);
  }

  return _assign({}, parentContext, childContext);
}

function pushContextProvider(workInProgress) {
  var instance = workInProgress.stateNode;
  // We push the context as early as possible to ensure stack integrity.
  // If the instance does not exist yet, we will push null at first,
  // and replace it on the stack later when invalidating the context.
  var memoizedMergedChildContext = instance && instance.__reactInternalMemoizedMergedChildContext || emptyContextObject;

  // Remember the parent context so we can merge with it later.
  // Inherit the parent's did-perform-work value to avoid inadvertently blocking updates.
  previousContext = contextStackCursor.current;
  push(contextStackCursor, memoizedMergedChildContext, workInProgress);
  push(didPerformWorkStackCursor, didPerformWorkStackCursor.current, workInProgress);

  return true;
}

function invalidateContextProvider(workInProgress, type, didChange) {
  var instance = workInProgress.stateNode;
  !instance ? invariant(false, 'Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.') : void 0;

  if (didChange) {
    // Merge parent and own context.
    // Skip this if we're not updating due to sCU.
    // This avoids unnecessarily recomputing memoized values.
    var mergedContext = processChildContext(workInProgress, type, previousContext);
    instance.__reactInternalMemoizedMergedChildContext = mergedContext;

    // Replace the old (or empty) context with the new one.
    // It is important to unwind the context in the reverse order.
    pop(didPerformWorkStackCursor, workInProgress);
    pop(contextStackCursor, workInProgress);
    // Now push the new context and mark that it has changed.
    push(contextStackCursor, mergedContext, workInProgress);
    push(didPerformWorkStackCursor, didChange, workInProgress);
  } else {
    pop(didPerformWorkStackCursor, workInProgress);
    push(didPerformWorkStackCursor, didChange, workInProgress);
  }
}

function findCurrentUnmaskedContext(fiber) {
  // Currently this is only used with renderSubtreeIntoContainer; not sure if it
  // makes sense elsewhere
  !(isFiberMounted(fiber) && fiber.tag === ClassComponent) ? invariant(false, 'Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.') : void 0;

  var node = fiber;
  do {
    switch (node.tag) {
      case HostRoot:
        return node.stateNode.context;
      case ClassComponent:
        {
          var Component = node.type;
          if (isContextProvider(Component)) {
            return node.stateNode.__reactInternalMemoizedMergedChildContext;
          }
          break;
        }
    }
    node = node.return;
  } while (node !== null);
  invariant(false, 'Found unexpected detached subtree parent. This error is likely caused by a bug in React. Please file an issue.');
}

var onCommitFiberRoot = null;
var onCommitFiberUnmount = null;
var hasLoggedError = false;

function catchErrors(fn) {
  return function (arg) {
    try {
      return fn(arg);
    } catch (err) {
      if ( true && !hasLoggedError) {
        hasLoggedError = true;
        warningWithoutStack$1(false, 'React DevTools encountered an error: %s', err);
      }
    }
  };
}

var isDevToolsPresent = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined';

function injectInternals(internals) {
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined') {
    // No DevTools
    return false;
  }
  var hook = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (hook.isDisabled) {
    // This isn't a real property on the hook, but it can be set to opt out
    // of DevTools integration and associated warnings and logs.
    // https://github.com/facebook/react/issues/3877
    return true;
  }
  if (!hook.supportsFiber) {
    {
      warningWithoutStack$1(false, 'The installed version of React DevTools is too old and will not work ' + 'with the current version of React. Please update React DevTools. ' + 'https://fb.me/react-devtools');
    }
    // DevTools exists, even though it doesn't support Fiber.
    return true;
  }
  try {
    var rendererID = hook.inject(internals);
    // We have successfully injected, so now it is safe to set up hooks.
    onCommitFiberRoot = catchErrors(function (root) {
      return hook.onCommitFiberRoot(rendererID, root);
    });
    onCommitFiberUnmount = catchErrors(function (fiber) {
      return hook.onCommitFiberUnmount(rendererID, fiber);
    });
  } catch (err) {
    // Catch all errors because it is unsafe to throw during initialization.
    {
      warningWithoutStack$1(false, 'React DevTools encountered an error: %s.', err);
    }
  }
  // DevTools exists
  return true;
}

function onCommitRoot(root) {
  if (typeof onCommitFiberRoot === 'function') {
    onCommitFiberRoot(root);
  }
}

function onCommitUnmount(fiber) {
  if (typeof onCommitFiberUnmount === 'function') {
    onCommitFiberUnmount(fiber);
  }
}

// Max 31 bit integer. The max integer size in V8 for 32-bit systems.
// Math.pow(2, 30) - 1
// 0b111111111111111111111111111111
var maxSigned31BitInt = 1073741823;

var NoWork = 0;
var Never = 1;
var Sync = maxSigned31BitInt;

var UNIT_SIZE = 10;
var MAGIC_NUMBER_OFFSET = maxSigned31BitInt - 1;

// 1 unit of expiration time represents 10ms.
function msToExpirationTime(ms) {
  // Always add an offset so that we don't clash with the magic number for NoWork.
  return MAGIC_NUMBER_OFFSET - (ms / UNIT_SIZE | 0);
}

function expirationTimeToMs(expirationTime) {
  return (MAGIC_NUMBER_OFFSET - expirationTime) * UNIT_SIZE;
}

function ceiling(num, precision) {
  return ((num / precision | 0) + 1) * precision;
}

function computeExpirationBucket(currentTime, expirationInMs, bucketSizeMs) {
  return MAGIC_NUMBER_OFFSET - ceiling(MAGIC_NUMBER_OFFSET - currentTime + expirationInMs / UNIT_SIZE, bucketSizeMs / UNIT_SIZE);
}

var LOW_PRIORITY_EXPIRATION = 5000;
var LOW_PRIORITY_BATCH_SIZE = 250;

function computeAsyncExpiration(currentTime) {
  return computeExpirationBucket(currentTime, LOW_PRIORITY_EXPIRATION, LOW_PRIORITY_BATCH_SIZE);
}

// We intentionally set a higher expiration time for interactive updates in
// dev than in production.
//
// If the main thread is being blocked so long that you hit the expiration,
// it's a problem that could be solved with better scheduling.
//
// People will be more likely to notice this and fix it with the long
// expiration time in development.
//
// In production we opt for better UX at the risk of masking scheduling
// problems, by expiring fast.
var HIGH_PRIORITY_EXPIRATION = 500;
var HIGH_PRIORITY_BATCH_SIZE = 100;

function computeInteractiveExpiration(currentTime) {
  return computeExpirationBucket(currentTime, HIGH_PRIORITY_EXPIRATION, HIGH_PRIORITY_BATCH_SIZE);
}

var NoContext = 0;
var ConcurrentMode = 1;
var StrictMode = 2;
var ProfileMode = 4;

var hasBadMapPolyfill = void 0;

{
  hasBadMapPolyfill = false;
  try {
    var nonExtensibleObject = Object.preventExtensions({});
    var testMap = new Map([[nonExtensibleObject, null]]);
    var testSet = new Set([nonExtensibleObject]);
    // This is necessary for Rollup to not consider these unused.
    // https://github.com/rollup/rollup/issues/1771
    // TODO: we can remove these if Rollup fixes the bug.
    testMap.set(0, 0);
    testSet.add(0);
  } catch (e) {
    // TODO: Consider warning about bad polyfills
    hasBadMapPolyfill = true;
  }
}

// A Fiber is work on a Component that needs to be done or was done. There can
// be more than one per component.


var debugCounter = void 0;

{
  debugCounter = 1;
}

function FiberNode(tag, pendingProps, key, mode) {
  // Instance
  this.tag = tag;
  this.key = key;
  this.elementType = null;
  this.type = null;
  this.stateNode = null;

  // Fiber
  this.return = null;
  this.child = null;
  this.sibling = null;
  this.index = 0;

  this.ref = null;

  this.pendingProps = pendingProps;
  this.memoizedProps = null;
  this.updateQueue = null;
  this.memoizedState = null;
  this.contextDependencies = null;

  this.mode = mode;

  // Effects
  this.effectTag = NoEffect;
  this.nextEffect = null;

  this.firstEffect = null;
  this.lastEffect = null;

  this.expirationTime = NoWork;
  this.childExpirationTime = NoWork;

  this.alternate = null;

  if (enableProfilerTimer) {
    // Note: The following is done to avoid a v8 performance cliff.
    //
    // Initializing the fields below to smis and later updating them with
    // double values will cause Fibers to end up having separate shapes.
    // This behavior/bug has something to do with Object.preventExtension().
    // Fortunately this only impacts DEV builds.
    // Unfortunately it makes React unusably slow for some applications.
    // To work around this, initialize the fields below with doubles.
    //
    // Learn more about this here:
    // https://github.com/facebook/react/issues/14365
    // https://bugs.chromium.org/p/v8/issues/detail?id=8538
    this.actualDuration = Number.NaN;
    this.actualStartTime = Number.NaN;
    this.selfBaseDuration = Number.NaN;
    this.treeBaseDuration = Number.NaN;

    // It's okay to replace the initial doubles with smis after initialization.
    // This won't trigger the performance cliff mentioned above,
    // and it simplifies other profiler code (including DevTools).
    this.actualDuration = 0;
    this.actualStartTime = -1;
    this.selfBaseDuration = 0;
    this.treeBaseDuration = 0;
  }

  {
    this._debugID = debugCounter++;
    this._debugSource = null;
    this._debugOwner = null;
    this._debugIsCurrentlyTiming = false;
    this._debugHookTypes = null;
    if (!hasBadMapPolyfill && typeof Object.preventExtensions === 'function') {
      Object.preventExtensions(this);
    }
  }
}

// This is a constructor function, rather than a POJO constructor, still
// please ensure we do the following:
// 1) Nobody should add any instance methods on this. Instance methods can be
//    more difficult to predict when they get optimized and they are almost
//    never inlined properly in static compilers.
// 2) Nobody should rely on `instanceof Fiber` for type testing. We should
//    always know when it is a fiber.
// 3) We might want to experiment with using numeric keys since they are easier
//    to optimize in a non-JIT environment.
// 4) We can easily go from a constructor to a createFiber object literal if that
//    is faster.
// 5) It should be easy to port this to a C struct and keep a C implementation
//    compatible.
var createFiber = function (tag, pendingProps, key, mode) {
  // $FlowFixMe: the shapes are exact here but Flow doesn't like constructors
  return new FiberNode(tag, pendingProps, key, mode);
};

function shouldConstruct(Component) {
  var prototype = Component.prototype;
  return !!(prototype && prototype.isReactComponent);
}

function isSimpleFunctionComponent(type) {
  return typeof type === 'function' && !shouldConstruct(type) && type.defaultProps === undefined;
}

function resolveLazyComponentTag(Component) {
  if (typeof Component === 'function') {
    return shouldConstruct(Component) ? ClassComponent : FunctionComponent;
  } else if (Component !== undefined && Component !== null) {
    var $$typeof = Component.$$typeof;
    if ($$typeof === REACT_FORWARD_REF_TYPE) {
      return ForwardRef;
    }
    if ($$typeof === REACT_MEMO_TYPE) {
      return MemoComponent;
    }
  }
  return IndeterminateComponent;
}

// This is used to create an alternate fiber to do work on.
function createWorkInProgress(current, pendingProps, expirationTime) {
  var workInProgress = current.alternate;
  if (workInProgress === null) {
    // We use a double buffering pooling technique because we know that we'll
    // only ever need at most two versions of a tree. We pool the "other" unused
    // node that we're free to reuse. This is lazily created to avoid allocating
    // extra objects for things that are never updated. It also allow us to
    // reclaim the extra memory if needed.
    workInProgress = createFiber(current.tag, pendingProps, current.key, current.mode);
    workInProgress.elementType = current.elementType;
    workInProgress.type = current.type;
    workInProgress.stateNode = current.stateNode;

    {
      // DEV-only fields
      workInProgress._debugID = current._debugID;
      workInProgress._debugSource = current._debugSource;
      workInProgress._debugOwner = current._debugOwner;
      workInProgress._debugHookTypes = current._debugHookTypes;
    }

    workInProgress.alternate = current;
    current.alternate = workInProgress;
  } else {
    workInProgress.pendingProps = pendingProps;

    // We already have an alternate.
    // Reset the effect tag.
    workInProgress.effectTag = NoEffect;

    // The effect list is no longer valid.
    workInProgress.nextEffect = null;
    workInProgress.firstEffect = null;
    workInProgress.lastEffect = null;

    if (enableProfilerTimer) {
      // We intentionally reset, rather than copy, actualDuration & actualStartTime.
      // This prevents time from endlessly accumulating in new commits.
      // This has the downside of resetting values for different priority renders,
      // But works for yielding (the common case) and should support resuming.
      workInProgress.actualDuration = 0;
      workInProgress.actualStartTime = -1;
    }
  }

  workInProgress.childExpirationTime = current.childExpirationTime;
  workInProgress.expirationTime = current.expirationTime;

  workInProgress.child = current.child;
  workInProgress.memoizedProps = current.memoizedProps;
  workInProgress.memoizedState = current.memoizedState;
  workInProgress.updateQueue = current.updateQueue;
  workInProgress.contextDependencies = current.contextDependencies;

  // These will be overridden during the parent's reconciliation
  workInProgress.sibling = current.sibling;
  workInProgress.index = current.index;
  workInProgress.ref = current.ref;

  if (enableProfilerTimer) {
    workInProgress.selfBaseDuration = current.selfBaseDuration;
    workInProgress.treeBaseDuration = current.treeBaseDuration;
  }

  return workInProgress;
}

function createHostRootFiber(isConcurrent) {
  var mode = isConcurrent ? ConcurrentMode | StrictMode : NoContext;

  if (enableProfilerTimer && isDevToolsPresent) {
    // Always collect profile timings when DevTools are present.
    // This enables DevTools to start capturing timing at any point–
    // Without some nodes in the tree having empty base times.
    mode |= ProfileMode;
  }

  return createFiber(HostRoot, null, null, mode);
}

function createFiberFromTypeAndProps(type, // React$ElementType
key, pendingProps, owner, mode, expirationTime) {
  var fiber = void 0;

  var fiberTag = IndeterminateComponent;
  // The resolved type is set if we know what the final type will be. I.e. it's not lazy.
  var resolvedType = type;
  if (typeof type === 'function') {
    if (shouldConstruct(type)) {
      fiberTag = ClassComponent;
    }
  } else if (typeof type === 'string') {
    fiberTag = HostComponent;
  } else {
    getTag: switch (type) {
      case REACT_FRAGMENT_TYPE:
        return createFiberFromFragment(pendingProps.children, mode, expirationTime, key);
      case REACT_CONCURRENT_MODE_TYPE:
        return createFiberFromMode(pendingProps, mode | ConcurrentMode | StrictMode, expirationTime, key);
      case REACT_STRICT_MODE_TYPE:
        return createFiberFromMode(pendingProps, mode | StrictMode, expirationTime, key);
      case REACT_PROFILER_TYPE:
        return createFiberFromProfiler(pendingProps, mode, expirationTime, key);
      case REACT_SUSPENSE_TYPE:
        return createFiberFromSuspense(pendingProps, mode, expirationTime, key);
      default:
        {
          if (typeof type === 'object' && type !== null) {
            switch (type.$$typeof) {
              case REACT_PROVIDER_TYPE:
                fiberTag = ContextProvider;
                break getTag;
              case REACT_CONTEXT_TYPE:
                // This is a consumer
                fiberTag = ContextConsumer;
                break getTag;
              case REACT_FORWARD_REF_TYPE:
                fiberTag = ForwardRef;
                break getTag;
              case REACT_MEMO_TYPE:
                fiberTag = MemoComponent;
                break getTag;
              case REACT_LAZY_TYPE:
                fiberTag = LazyComponent;
                resolvedType = null;
                break getTag;
            }
          }
          var info = '';
          {
            if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
              info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and " + 'named imports.';
            }
            var ownerName = owner ? getComponentName(owner.type) : null;
            if (ownerName) {
              info += '\n\nCheck the render method of `' + ownerName + '`.';
            }
          }
          invariant(false, 'Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s', type == null ? type : typeof type, info);
        }
    }
  }

  fiber = createFiber(fiberTag, pendingProps, key, mode);
  fiber.elementType = type;
  fiber.type = resolvedType;
  fiber.expirationTime = expirationTime;

  return fiber;
}

function createFiberFromElement(element, mode, expirationTime) {
  var owner = null;
  {
    owner = element._owner;
  }
  var type = element.type;
  var key = element.key;
  var pendingProps = element.props;
  var fiber = createFiberFromTypeAndProps(type, key, pendingProps, owner, mode, expirationTime);
  {
    fiber._debugSource = element._source;
    fiber._debugOwner = element._owner;
  }
  return fiber;
}

function createFiberFromFragment(elements, mode, expirationTime, key) {
  var fiber = createFiber(Fragment, elements, key, mode);
  fiber.expirationTime = expirationTime;
  return fiber;
}

function createFiberFromProfiler(pendingProps, mode, expirationTime, key) {
  {
    if (typeof pendingProps.id !== 'string' || typeof pendingProps.onRender !== 'function') {
      warningWithoutStack$1(false, 'Profiler must specify an "id" string and "onRender" function as props');
    }
  }

  var fiber = createFiber(Profiler, pendingProps, key, mode | ProfileMode);
  // TODO: The Profiler fiber shouldn't have a type. It has a tag.
  fiber.elementType = REACT_PROFILER_TYPE;
  fiber.type = REACT_PROFILER_TYPE;
  fiber.expirationTime = expirationTime;

  return fiber;
}

function createFiberFromMode(pendingProps, mode, expirationTime, key) {
  var fiber = createFiber(Mode, pendingProps, key, mode);

  // TODO: The Mode fiber shouldn't have a type. It has a tag.
  var type = (mode & ConcurrentMode) === NoContext ? REACT_STRICT_MODE_TYPE : REACT_CONCURRENT_MODE_TYPE;
  fiber.elementType = type;
  fiber.type = type;

  fiber.expirationTime = expirationTime;
  return fiber;
}

function createFiberFromSuspense(pendingProps, mode, expirationTime, key) {
  var fiber = createFiber(SuspenseComponent, pendingProps, key, mode);

  // TODO: The SuspenseComponent fiber shouldn't have a type. It has a tag.
  var type = REACT_SUSPENSE_TYPE;
  fiber.elementType = type;
  fiber.type = type;

  fiber.expirationTime = expirationTime;
  return fiber;
}

function createFiberFromText(content, mode, expirationTime) {
  var fiber = createFiber(HostText, content, null, mode);
  fiber.expirationTime = expirationTime;
  return fiber;
}

function createFiberFromHostInstanceForDeletion() {
  var fiber = createFiber(HostComponent, null, null, NoContext);
  // TODO: These should not need a type.
  fiber.elementType = 'DELETED';
  fiber.type = 'DELETED';
  return fiber;
}

function createFiberFromPortal(portal, mode, expirationTime) {
  var pendingProps = portal.children !== null ? portal.children : [];
  var fiber = createFiber(HostPortal, pendingProps, portal.key, mode);
  fiber.expirationTime = expirationTime;
  fiber.stateNode = {
    containerInfo: portal.containerInfo,
    pendingChildren: null, // Used by persistent updates
    implementation: portal.implementation
  };
  return fiber;
}

// Used for stashing WIP properties to replay failed work in DEV.
function assignFiberPropertiesInDEV(target, source) {
  if (target === null) {
    // This Fiber's initial properties will always be overwritten.
    // We only use a Fiber to ensure the same hidden class so DEV isn't slow.
    target = createFiber(IndeterminateComponent, null, null, NoContext);
  }

  // This is intentionally written as a list of all properties.
  // We tried to use Object.assign() instead but this is called in
  // the hottest path, and Object.assign() was too slow:
  // https://github.com/facebook/react/issues/12502
  // This code is DEV-only so size is not a concern.

  target.tag = source.tag;
  target.key = source.key;
  target.elementType = source.elementType;
  target.type = source.type;
  target.stateNode = source.stateNode;
  target.return = source.return;
  target.child = source.child;
  target.sibling = source.sibling;
  target.index = source.index;
  target.ref = source.ref;
  target.pendingProps = source.pendingProps;
  target.memoizedProps = source.memoizedProps;
  target.updateQueue = source.updateQueue;
  target.memoizedState = source.memoizedState;
  target.contextDependencies = source.contextDependencies;
  target.mode = source.mode;
  target.effectTag = source.effectTag;
  target.nextEffect = source.nextEffect;
  target.firstEffect = source.firstEffect;
  target.lastEffect = source.lastEffect;
  target.expirationTime = source.expirationTime;
  target.childExpirationTime = source.childExpirationTime;
  target.alternate = source.alternate;
  if (enableProfilerTimer) {
    target.actualDuration = source.actualDuration;
    target.actualStartTime = source.actualStartTime;
    target.selfBaseDuration = source.selfBaseDuration;
    target.treeBaseDuration = source.treeBaseDuration;
  }
  target._debugID = source._debugID;
  target._debugSource = source._debugSource;
  target._debugOwner = source._debugOwner;
  target._debugIsCurrentlyTiming = source._debugIsCurrentlyTiming;
  target._debugHookTypes = source._debugHookTypes;
  return target;
}

// TODO: This should be lifted into the renderer.


// The following attributes are only used by interaction tracing builds.
// They enable interactions to be associated with their async work,
// And expose interaction metadata to the React DevTools Profiler plugin.
// Note that these attributes are only defined when the enableSchedulerTracing flag is enabled.


// Exported FiberRoot type includes all properties,
// To avoid requiring potentially error-prone :any casts throughout the project.
// Profiling properties are only safe to access in profiling builds (when enableSchedulerTracing is true).
// The types are defined separately within this file to ensure they stay in sync.
// (We don't have to use an inline :any cast when enableSchedulerTracing is disabled.)


function createFiberRoot(containerInfo, isConcurrent, hydrate) {
  // Cyclic construction. This cheats the type system right now because
  // stateNode is any.
  var uninitializedFiber = createHostRootFiber(isConcurrent);

  var root = void 0;
  if (enableSchedulerTracing) {
    root = {
      current: uninitializedFiber,
      containerInfo: containerInfo,
      pendingChildren: null,

      earliestPendingTime: NoWork,
      latestPendingTime: NoWork,
      earliestSuspendedTime: NoWork,
      latestSuspendedTime: NoWork,
      latestPingedTime: NoWork,

      pingCache: null,

      didError: false,

      pendingCommitExpirationTime: NoWork,
      finishedWork: null,
      timeoutHandle: noTimeout,
      context: null,
      pendingContext: null,
      hydrate: hydrate,
      nextExpirationTimeToWorkOn: NoWork,
      expirationTime: NoWork,
      firstBatch: null,
      nextScheduledRoot: null,

      interactionThreadID: tracing.unstable_getThreadID(),
      memoizedInteractions: new Set(),
      pendingInteractionMap: new Map()
    };
  } else {
    root = {
      current: uninitializedFiber,
      containerInfo: containerInfo,
      pendingChildren: null,

      pingCache: null,

      earliestPendingTime: NoWork,
      latestPendingTime: NoWork,
      earliestSuspendedTime: NoWork,
      latestSuspendedTime: NoWork,
      latestPingedTime: NoWork,

      didError: false,

      pendingCommitExpirationTime: NoWork,
      finishedWork: null,
      timeoutHandle: noTimeout,
      context: null,
      pendingContext: null,
      hydrate: hydrate,
      nextExpirationTimeToWorkOn: NoWork,
      expirationTime: NoWork,
      firstBatch: null,
      nextScheduledRoot: null
    };
  }

  uninitializedFiber.stateNode = root;

  // The reason for the way the Flow types are structured in this file,
  // Is to avoid needing :any casts everywhere interaction tracing fields are used.
  // Unfortunately that requires an :any cast for non-interaction tracing capable builds.
  // $FlowFixMe Remove this :any cast and replace it with something better.
  return root;
}

var invokeGuardedCallbackImpl = function (name, func, context, a, b, c, d, e, f) {
  var funcArgs = Array.prototype.slice.call(arguments, 3);
  try {
    func.apply(context, funcArgs);
  } catch (error) {
    this.onError(error);
  }
};

{
  // In DEV mode, we swap out invokeGuardedCallback for a special version
  // that plays more nicely with the browser's DevTools. The idea is to preserve
  // "Pause on exceptions" behavior. Because React wraps all user-provided
  // functions in invokeGuardedCallback, and the production version of
  // invokeGuardedCallback uses a try-catch, all user exceptions are treated
  // like caught exceptions, and the DevTools won't pause unless the developer
  // takes the extra step of enabling pause on caught exceptions. This is
  // unintuitive, though, because even though React has caught the error, from
  // the developer's perspective, the error is uncaught.
  //
  // To preserve the expected "Pause on exceptions" behavior, we don't use a
  // try-catch in DEV. Instead, we synchronously dispatch a fake event to a fake
  // DOM node, and call the user-provided callback from inside an event handler
  // for that fake event. If the callback throws, the error is "captured" using
  // a global event handler. But because the error happens in a different
  // event loop context, it does not interrupt the normal program flow.
  // Effectively, this gives us try-catch behavior without actually using
  // try-catch. Neat!

  // Check that the browser supports the APIs we need to implement our special
  // DEV version of invokeGuardedCallback
  if (typeof global.global !== 'undefined' && typeof global.global.dispatchEvent === 'function' && typeof document !== 'undefined' && typeof document.createEvent === 'function') {
    var fakeNode = document.createElement('react');

    var invokeGuardedCallbackDev = function (name, func, context, a, b, c, d, e, f) {
      // If document doesn't exist we know for sure we will crash in this method
      // when we call document.createEvent(). However this can cause confusing
      // errors: https://github.com/facebookincubator/create-react-app/issues/3482
      // So we preemptively throw with a better message instead.
      !(typeof document !== 'undefined') ? invariant(false, 'The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.') : void 0;
      var evt = document.createEvent('Event');

      // Keeps track of whether the user-provided callback threw an error. We
      // set this to true at the beginning, then set it to false right after
      // calling the function. If the function errors, `didError` will never be
      // set to false. This strategy works even if the browser is flaky and
      // fails to call our global error handler, because it doesn't rely on
      // the error event at all.
      var didError = true;

      // Keeps track of the value of window.event so that we can reset it
      // during the callback to let user code access window.event in the
      // browsers that support it.
      var windowEvent = global.global.event;

      // Keeps track of the descriptor of window.event to restore it after event
      // dispatching: https://github.com/facebook/react/issues/13688
      var windowEventDescriptor = Object.getOwnPropertyDescriptor(global.global, 'event');

      // Create an event handler for our fake event. We will synchronously
      // dispatch our fake event using `dispatchEvent`. Inside the handler, we
      // call the user-provided callback.
      var funcArgs = Array.prototype.slice.call(arguments, 3);
      function callCallback() {
        // We immediately remove the callback from event listeners so that
        // nested `invokeGuardedCallback` calls do not clash. Otherwise, a
        // nested call would trigger the fake event handlers of any call higher
        // in the stack.
        fakeNode.removeEventListener(evtType, callCallback, false);

        // We check for window.hasOwnProperty('event') to prevent the
        // window.event assignment in both IE <= 10 as they throw an error
        // "Member not found" in strict mode, and in Firefox which does not
        // support window.event.
        if (typeof global.global.event !== 'undefined' && global.global.hasOwnProperty('event')) {
          global.global.event = windowEvent;
        }

        func.apply(context, funcArgs);
        didError = false;
      }

      // Create a global error event handler. We use this to capture the value
      // that was thrown. It's possible that this error handler will fire more
      // than once; for example, if non-React code also calls `dispatchEvent`
      // and a handler for that event throws. We should be resilient to most of
      // those cases. Even if our error event handler fires more than once, the
      // last error event is always used. If the callback actually does error,
      // we know that the last error event is the correct one, because it's not
      // possible for anything else to have happened in between our callback
      // erroring and the code that follows the `dispatchEvent` call below. If
      // the callback doesn't error, but the error event was fired, we know to
      // ignore it because `didError` will be false, as described above.
      var error = void 0;
      // Use this to track whether the error event is ever called.
      var didSetError = false;
      var isCrossOriginError = false;

      function handleWindowError(event) {
        error = event.error;
        didSetError = true;
        if (error === null && event.colno === 0 && event.lineno === 0) {
          isCrossOriginError = true;
        }
        if (event.defaultPrevented) {
          // Some other error handler has prevented default.
          // Browsers silence the error report if this happens.
          // We'll remember this to later decide whether to log it or not.
          if (error != null && typeof error === 'object') {
            try {
              error._suppressLogging = true;
            } catch (inner) {
              // Ignore.
            }
          }
        }
      }

      // Create a fake event type.
      var evtType = 'react-' + (name ? name : 'invokeguardedcallback');

      // Attach our event handlers
      global.global.addEventListener('error', handleWindowError);
      fakeNode.addEventListener(evtType, callCallback, false);

      // Synchronously dispatch our fake event. If the user-provided function
      // errors, it will trigger our global error handler.
      evt.initEvent(evtType, false, false);
      fakeNode.dispatchEvent(evt);

      if (windowEventDescriptor) {
        Object.defineProperty(global.global, 'event', windowEventDescriptor);
      }

      if (didError) {
        if (!didSetError) {
          // The callback errored, but the error event never fired.
          error = new Error('An error was thrown inside one of your components, but React ' + "doesn't know what it was. This is likely due to browser " + 'flakiness. React does its best to preserve the "Pause on ' + 'exceptions" behavior of the DevTools, which requires some ' + "DEV-mode only tricks. It's possible that these don't work in " + 'your browser. Try triggering the error in production mode, ' + 'or switching to a modern browser. If you suspect that this is ' + 'actually an issue with React, please file an issue.');
        } else if (isCrossOriginError) {
          error = new Error("A cross-origin error was thrown. React doesn't have access to " + 'the actual error object in development. ' + 'See https://fb.me/react-crossorigin-error for more information.');
        }
        this.onError(error);
      }

      // Remove our event listeners
      global.global.removeEventListener('error', handleWindowError);
    };

    invokeGuardedCallbackImpl = invokeGuardedCallbackDev;
  }
}

var invokeGuardedCallbackImpl$1 = invokeGuardedCallbackImpl;

// Used by Fiber to simulate a try-catch.
var hasError = false;
var caughtError = null;

var reporter = {
  onError: function (error) {
    hasError = true;
    caughtError = error;
  }
};

/**
 * Call a function while guarding against errors that happens within it.
 * Returns an error if it throws, otherwise null.
 *
 * In production, this is implemented using a try-catch. The reason we don't
 * use a try-catch directly is so that we can swap out a different
 * implementation in DEV mode.
 *
 * @param {String} name of the guard to use for logging or debugging
 * @param {Function} func The function to invoke
 * @param {*} context The context to use when calling the function
 * @param {...*} args Arguments for function
 */
function invokeGuardedCallback(name, func, context, a, b, c, d, e, f) {
  hasError = false;
  caughtError = null;
  invokeGuardedCallbackImpl$1.apply(reporter, arguments);
}

/**
 * Same as invokeGuardedCallback, but instead of returning an error, it stores
 * it in a global so it can be rethrown by `rethrowCaughtError` later.
 * TODO: See if caughtError and rethrowError can be unified.
 *
 * @param {String} name of the guard to use for logging or debugging
 * @param {Function} func The function to invoke
 * @param {*} context The context to use when calling the function
 * @param {...*} args Arguments for function
 */


/**
 * During execution of guarded functions we will capture the first error which
 * we will rethrow to be handled by the top level error handler.
 */


function hasCaughtError() {
  return hasError;
}

function clearCaughtError() {
  if (hasError) {
    var error = caughtError;
    hasError = false;
    caughtError = null;
    return error;
  } else {
    invariant(false, 'clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.');
  }
}

/**
 * Forked from fbjs/warning:
 * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
 *
 * Only change is we use console.warn instead of console.error,
 * and do nothing when 'console' is not supported.
 * This really simplifies the code.
 * ---
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var lowPriorityWarning = function () {};

{
  var printWarning = function (format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.warn(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  lowPriorityWarning = function (condition, format) {
    if (format === undefined) {
      throw new Error('`lowPriorityWarning(condition, format, ...args)` requires a warning ' + 'message argument');
    }
    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

var lowPriorityWarning$1 = lowPriorityWarning;

var ReactStrictModeWarnings = {
  discardPendingWarnings: function () {},
  flushPendingDeprecationWarnings: function () {},
  flushPendingUnsafeLifecycleWarnings: function () {},
  recordDeprecationWarnings: function (fiber, instance) {},
  recordUnsafeLifecycleWarnings: function (fiber, instance) {},
  recordLegacyContextWarning: function (fiber, instance) {},
  flushLegacyContextWarning: function () {}
};

{
  var LIFECYCLE_SUGGESTIONS = {
    UNSAFE_componentWillMount: 'componentDidMount',
    UNSAFE_componentWillReceiveProps: 'static getDerivedStateFromProps',
    UNSAFE_componentWillUpdate: 'componentDidUpdate'
  };

  var pendingComponentWillMountWarnings = [];
  var pendingComponentWillReceivePropsWarnings = [];
  var pendingComponentWillUpdateWarnings = [];
  var pendingUnsafeLifecycleWarnings = new Map();
  var pendingLegacyContextWarning = new Map();

  // Tracks components we have already warned about.
  var didWarnAboutDeprecatedLifecycles = new Set();
  var didWarnAboutUnsafeLifecycles = new Set();
  var didWarnAboutLegacyContext = new Set();

  var setToSortedString = function (set) {
    var array = [];
    set.forEach(function (value) {
      array.push(value);
    });
    return array.sort().join(', ');
  };

  ReactStrictModeWarnings.discardPendingWarnings = function () {
    pendingComponentWillMountWarnings = [];
    pendingComponentWillReceivePropsWarnings = [];
    pendingComponentWillUpdateWarnings = [];
    pendingUnsafeLifecycleWarnings = new Map();
    pendingLegacyContextWarning = new Map();
  };

  ReactStrictModeWarnings.flushPendingUnsafeLifecycleWarnings = function () {
    pendingUnsafeLifecycleWarnings.forEach(function (lifecycleWarningsMap, strictRoot) {
      var lifecyclesWarningMessages = [];

      Object.keys(lifecycleWarningsMap).forEach(function (lifecycle) {
        var lifecycleWarnings = lifecycleWarningsMap[lifecycle];
        if (lifecycleWarnings.length > 0) {
          var componentNames = new Set();
          lifecycleWarnings.forEach(function (fiber) {
            componentNames.add(getComponentName(fiber.type) || 'Component');
            didWarnAboutUnsafeLifecycles.add(fiber.type);
          });

          var formatted = lifecycle.replace('UNSAFE_', '');
          var suggestion = LIFECYCLE_SUGGESTIONS[lifecycle];
          var sortedComponentNames = setToSortedString(componentNames);

          lifecyclesWarningMessages.push(formatted + ': Please update the following components to use ' + (suggestion + ' instead: ' + sortedComponentNames));
        }
      });

      if (lifecyclesWarningMessages.length > 0) {
        var strictRootComponentStack = getStackByFiberInDevAndProd(strictRoot);

        warningWithoutStack$1(false, 'Unsafe lifecycle methods were found within a strict-mode tree:%s' + '\n\n%s' + '\n\nLearn more about this warning here:' + '\nhttps://fb.me/react-strict-mode-warnings', strictRootComponentStack, lifecyclesWarningMessages.join('\n\n'));
      }
    });

    pendingUnsafeLifecycleWarnings = new Map();
  };

  var findStrictRoot = function (fiber) {
    var maybeStrictRoot = null;

    var node = fiber;
    while (node !== null) {
      if (node.mode & StrictMode) {
        maybeStrictRoot = node;
      }
      node = node.return;
    }

    return maybeStrictRoot;
  };

  ReactStrictModeWarnings.flushPendingDeprecationWarnings = function () {
    if (pendingComponentWillMountWarnings.length > 0) {
      var uniqueNames = new Set();
      pendingComponentWillMountWarnings.forEach(function (fiber) {
        uniqueNames.add(getComponentName(fiber.type) || 'Component');
        didWarnAboutDeprecatedLifecycles.add(fiber.type);
      });

      var sortedNames = setToSortedString(uniqueNames);

      lowPriorityWarning$1(false, 'componentWillMount is deprecated and will be removed in the next major version. ' + 'Use componentDidMount instead. As a temporary workaround, ' + 'you can rename to UNSAFE_componentWillMount.' + '\n\nPlease update the following components: %s' + '\n\nLearn more about this warning here:' + '\nhttps://fb.me/react-async-component-lifecycle-hooks', sortedNames);

      pendingComponentWillMountWarnings = [];
    }

    if (pendingComponentWillReceivePropsWarnings.length > 0) {
      var _uniqueNames = new Set();
      pendingComponentWillReceivePropsWarnings.forEach(function (fiber) {
        _uniqueNames.add(getComponentName(fiber.type) || 'Component');
        didWarnAboutDeprecatedLifecycles.add(fiber.type);
      });

      var _sortedNames = setToSortedString(_uniqueNames);

      lowPriorityWarning$1(false, 'componentWillReceiveProps is deprecated and will be removed in the next major version. ' + 'Use static getDerivedStateFromProps instead.' + '\n\nPlease update the following components: %s' + '\n\nLearn more about this warning here:' + '\nhttps://fb.me/react-async-component-lifecycle-hooks', _sortedNames);

      pendingComponentWillReceivePropsWarnings = [];
    }

    if (pendingComponentWillUpdateWarnings.length > 0) {
      var _uniqueNames2 = new Set();
      pendingComponentWillUpdateWarnings.forEach(function (fiber) {
        _uniqueNames2.add(getComponentName(fiber.type) || 'Component');
        didWarnAboutDeprecatedLifecycles.add(fiber.type);
      });

      var _sortedNames2 = setToSortedString(_uniqueNames2);

      lowPriorityWarning$1(false, 'componentWillUpdate is deprecated and will be removed in the next major version. ' + 'Use componentDidUpdate instead. As a temporary workaround, ' + 'you can rename to UNSAFE_componentWillUpdate.' + '\n\nPlease update the following components: %s' + '\n\nLearn more about this warning here:' + '\nhttps://fb.me/react-async-component-lifecycle-hooks', _sortedNames2);

      pendingComponentWillUpdateWarnings = [];
    }
  };

  ReactStrictModeWarnings.recordDeprecationWarnings = function (fiber, instance) {
    // Dedup strategy: Warn once per component.
    if (didWarnAboutDeprecatedLifecycles.has(fiber.type)) {
      return;
    }

    // Don't warn about react-lifecycles-compat polyfilled components.
    if (typeof instance.componentWillMount === 'function' && instance.componentWillMount.__suppressDeprecationWarning !== true) {
      pendingComponentWillMountWarnings.push(fiber);
    }
    if (typeof instance.componentWillReceiveProps === 'function' && instance.componentWillReceiveProps.__suppressDeprecationWarning !== true) {
      pendingComponentWillReceivePropsWarnings.push(fiber);
    }
    if (typeof instance.componentWillUpdate === 'function' && instance.componentWillUpdate.__suppressDeprecationWarning !== true) {
      pendingComponentWillUpdateWarnings.push(fiber);
    }
  };

  ReactStrictModeWarnings.recordUnsafeLifecycleWarnings = function (fiber, instance) {
    var strictRoot = findStrictRoot(fiber);
    if (strictRoot === null) {
      warningWithoutStack$1(false, 'Expected to find a StrictMode component in a strict mode tree. ' + 'This error is likely caused by a bug in React. Please file an issue.');
      return;
    }

    // Dedup strategy: Warn once per component.
    // This is difficult to track any other way since component names
    // are often vague and are likely to collide between 3rd party libraries.
    // An expand property is probably okay to use here since it's DEV-only,
    // and will only be set in the event of serious warnings.
    if (didWarnAboutUnsafeLifecycles.has(fiber.type)) {
      return;
    }

    var warningsForRoot = void 0;
    if (!pendingUnsafeLifecycleWarnings.has(strictRoot)) {
      warningsForRoot = {
        UNSAFE_componentWillMount: [],
        UNSAFE_componentWillReceiveProps: [],
        UNSAFE_componentWillUpdate: []
      };

      pendingUnsafeLifecycleWarnings.set(strictRoot, warningsForRoot);
    } else {
      warningsForRoot = pendingUnsafeLifecycleWarnings.get(strictRoot);
    }

    var unsafeLifecycles = [];
    if (typeof instance.componentWillMount === 'function' && instance.componentWillMount.__suppressDeprecationWarning !== true || typeof instance.UNSAFE_componentWillMount === 'function') {
      unsafeLifecycles.push('UNSAFE_componentWillMount');
    }
    if (typeof instance.componentWillReceiveProps === 'function' && instance.componentWillReceiveProps.__suppressDeprecationWarning !== true || typeof instance.UNSAFE_componentWillReceiveProps === 'function') {
      unsafeLifecycles.push('UNSAFE_componentWillReceiveProps');
    }
    if (typeof instance.componentWillUpdate === 'function' && instance.componentWillUpdate.__suppressDeprecationWarning !== true || typeof instance.UNSAFE_componentWillUpdate === 'function') {
      unsafeLifecycles.push('UNSAFE_componentWillUpdate');
    }

    if (unsafeLifecycles.length > 0) {
      unsafeLifecycles.forEach(function (lifecycle) {
        warningsForRoot[lifecycle].push(fiber);
      });
    }
  };

  ReactStrictModeWarnings.recordLegacyContextWarning = function (fiber, instance) {
    var strictRoot = findStrictRoot(fiber);
    if (strictRoot === null) {
      warningWithoutStack$1(false, 'Expected to find a StrictMode component in a strict mode tree. ' + 'This error is likely caused by a bug in React. Please file an issue.');
      return;
    }

    // Dedup strategy: Warn once per component.
    if (didWarnAboutLegacyContext.has(fiber.type)) {
      return;
    }

    var warningsForRoot = pendingLegacyContextWarning.get(strictRoot);

    if (fiber.type.contextTypes != null || fiber.type.childContextTypes != null || instance !== null && typeof instance.getChildContext === 'function') {
      if (warningsForRoot === undefined) {
        warningsForRoot = [];
        pendingLegacyContextWarning.set(strictRoot, warningsForRoot);
      }
      warningsForRoot.push(fiber);
    }
  };

  ReactStrictModeWarnings.flushLegacyContextWarning = function () {
    pendingLegacyContextWarning.forEach(function (fiberArray, strictRoot) {
      var uniqueNames = new Set();
      fiberArray.forEach(function (fiber) {
        uniqueNames.add(getComponentName(fiber.type) || 'Component');
        didWarnAboutLegacyContext.add(fiber.type);
      });

      var sortedNames = setToSortedString(uniqueNames);
      var strictRootComponentStack = getStackByFiberInDevAndProd(strictRoot);

      warningWithoutStack$1(false, 'Legacy context API has been detected within a strict-mode tree: %s' + '\n\nPlease update the following components: %s' + '\n\nLearn more about this warning here:' + '\nhttps://fb.me/react-strict-mode-warnings', strictRootComponentStack, sortedNames);
    });
  };
}

// This lets us hook into Fiber to debug what it's doing.
// See https://github.com/facebook/react/pull/8033.
// This is not part of the public API, not even for React DevTools.
// You may only inject a debugTool if you work on React Fiber itself.
var ReactFiberInstrumentation = {
  debugTool: null
};

var ReactFiberInstrumentation_1 = ReactFiberInstrumentation;

// TODO: Offscreen updates should never suspend. However, a promise that
// suspended inside an offscreen subtree should be able to ping at the priority
// of the outer render.

function markPendingPriorityLevel(root, expirationTime) {
  // If there's a gap between completing a failed root and retrying it,
  // additional updates may be scheduled. Clear `didError`, in case the update
  // is sufficient to fix the error.
  root.didError = false;

  // Update the latest and earliest pending times
  var earliestPendingTime = root.earliestPendingTime;
  if (earliestPendingTime === NoWork) {
    // No other pending updates.
    root.earliestPendingTime = root.latestPendingTime = expirationTime;
  } else {
    if (earliestPendingTime < expirationTime) {
      // This is the earliest pending update.
      root.earliestPendingTime = expirationTime;
    } else {
      var latestPendingTime = root.latestPendingTime;
      if (latestPendingTime > expirationTime) {
        // This is the latest pending update
        root.latestPendingTime = expirationTime;
      }
    }
  }
  findNextExpirationTimeToWorkOn(expirationTime, root);
}

function markCommittedPriorityLevels(root, earliestRemainingTime) {
  root.didError = false;

  if (earliestRemainingTime === NoWork) {
    // Fast path. There's no remaining work. Clear everything.
    root.earliestPendingTime = NoWork;
    root.latestPendingTime = NoWork;
    root.earliestSuspendedTime = NoWork;
    root.latestSuspendedTime = NoWork;
    root.latestPingedTime = NoWork;
    findNextExpirationTimeToWorkOn(NoWork, root);
    return;
  }

  if (earliestRemainingTime < root.latestPingedTime) {
    root.latestPingedTime = NoWork;
  }

  // Let's see if the previous latest known pending level was just flushed.
  var latestPendingTime = root.latestPendingTime;
  if (latestPendingTime !== NoWork) {
    if (latestPendingTime > earliestRemainingTime) {
      // We've flushed all the known pending levels.
      root.earliestPendingTime = root.latestPendingTime = NoWork;
    } else {
      var earliestPendingTime = root.earliestPendingTime;
      if (earliestPendingTime > earliestRemainingTime) {
        // We've flushed the earliest known pending level. Set this to the
        // latest pending time.
        root.earliestPendingTime = root.latestPendingTime;
      }
    }
  }

  // Now let's handle the earliest remaining level in the whole tree. We need to
  // decide whether to treat it as a pending level or as suspended. Check
  // it falls within the range of known suspended levels.

  var earliestSuspendedTime = root.earliestSuspendedTime;
  if (earliestSuspendedTime === NoWork) {
    // There's no suspended work. Treat the earliest remaining level as a
    // pending level.
    markPendingPriorityLevel(root, earliestRemainingTime);
    findNextExpirationTimeToWorkOn(NoWork, root);
    return;
  }

  var latestSuspendedTime = root.latestSuspendedTime;
  if (earliestRemainingTime < latestSuspendedTime) {
    // The earliest remaining level is later than all the suspended work. That
    // means we've flushed all the suspended work.
    root.earliestSuspendedTime = NoWork;
    root.latestSuspendedTime = NoWork;
    root.latestPingedTime = NoWork;

    // There's no suspended work. Treat the earliest remaining level as a
    // pending level.
    markPendingPriorityLevel(root, earliestRemainingTime);
    findNextExpirationTimeToWorkOn(NoWork, root);
    return;
  }

  if (earliestRemainingTime > earliestSuspendedTime) {
    // The earliest remaining time is earlier than all the suspended work.
    // Treat it as a pending update.
    markPendingPriorityLevel(root, earliestRemainingTime);
    findNextExpirationTimeToWorkOn(NoWork, root);
    return;
  }

  // The earliest remaining time falls within the range of known suspended
  // levels. We should treat this as suspended work.
  findNextExpirationTimeToWorkOn(NoWork, root);
}

function hasLowerPriorityWork(root, erroredExpirationTime) {
  var latestPendingTime = root.latestPendingTime;
  var latestSuspendedTime = root.latestSuspendedTime;
  var latestPingedTime = root.latestPingedTime;
  return latestPendingTime !== NoWork && latestPendingTime < erroredExpirationTime || latestSuspendedTime !== NoWork && latestSuspendedTime < erroredExpirationTime || latestPingedTime !== NoWork && latestPingedTime < erroredExpirationTime;
}

function isPriorityLevelSuspended(root, expirationTime) {
  var earliestSuspendedTime = root.earliestSuspendedTime;
  var latestSuspendedTime = root.latestSuspendedTime;
  return earliestSuspendedTime !== NoWork && expirationTime <= earliestSuspendedTime && expirationTime >= latestSuspendedTime;
}

function markSuspendedPriorityLevel(root, suspendedTime) {
  root.didError = false;
  clearPing(root, suspendedTime);

  // First, check the known pending levels and update them if needed.
  var earliestPendingTime = root.earliestPendingTime;
  var latestPendingTime = root.latestPendingTime;
  if (earliestPendingTime === suspendedTime) {
    if (latestPendingTime === suspendedTime) {
      // Both known pending levels were suspended. Clear them.
      root.earliestPendingTime = root.latestPendingTime = NoWork;
    } else {
      // The earliest pending level was suspended. Clear by setting it to the
      // latest pending level.
      root.earliestPendingTime = latestPendingTime;
    }
  } else if (latestPendingTime === suspendedTime) {
    // The latest pending level was suspended. Clear by setting it to the
    // latest pending level.
    root.latestPendingTime = earliestPendingTime;
  }

  // Finally, update the known suspended levels.
  var earliestSuspendedTime = root.earliestSuspendedTime;
  var latestSuspendedTime = root.latestSuspendedTime;
  if (earliestSuspendedTime === NoWork) {
    // No other suspended levels.
    root.earliestSuspendedTime = root.latestSuspendedTime = suspendedTime;
  } else {
    if (earliestSuspendedTime < suspendedTime) {
      // This is the earliest suspended level.
      root.earliestSuspendedTime = suspendedTime;
    } else if (latestSuspendedTime > suspendedTime) {
      // This is the latest suspended level
      root.latestSuspendedTime = suspendedTime;
    }
  }

  findNextExpirationTimeToWorkOn(suspendedTime, root);
}

function markPingedPriorityLevel(root, pingedTime) {
  root.didError = false;

  // TODO: When we add back resuming, we need to ensure the progressed work
  // is thrown out and not reused during the restarted render. One way to
  // invalidate the progressed work is to restart at expirationTime + 1.
  var latestPingedTime = root.latestPingedTime;
  if (latestPingedTime === NoWork || latestPingedTime > pingedTime) {
    root.latestPingedTime = pingedTime;
  }
  findNextExpirationTimeToWorkOn(pingedTime, root);
}

function clearPing(root, completedTime) {
  var latestPingedTime = root.latestPingedTime;
  if (latestPingedTime >= completedTime) {
    root.latestPingedTime = NoWork;
  }
}

function findEarliestOutstandingPriorityLevel(root, renderExpirationTime) {
  var earliestExpirationTime = renderExpirationTime;

  var earliestPendingTime = root.earliestPendingTime;
  var earliestSuspendedTime = root.earliestSuspendedTime;
  if (earliestPendingTime > earliestExpirationTime) {
    earliestExpirationTime = earliestPendingTime;
  }
  if (earliestSuspendedTime > earliestExpirationTime) {
    earliestExpirationTime = earliestSuspendedTime;
  }
  return earliestExpirationTime;
}

function didExpireAtExpirationTime(root, currentTime) {
  var expirationTime = root.expirationTime;
  if (expirationTime !== NoWork && currentTime <= expirationTime) {
    // The root has expired. Flush all work up to the current time.
    root.nextExpirationTimeToWorkOn = currentTime;
  }
}

function findNextExpirationTimeToWorkOn(completedExpirationTime, root) {
  var earliestSuspendedTime = root.earliestSuspendedTime;
  var latestSuspendedTime = root.latestSuspendedTime;
  var earliestPendingTime = root.earliestPendingTime;
  var latestPingedTime = root.latestPingedTime;

  // Work on the earliest pending time. Failing that, work on the latest
  // pinged time.
  var nextExpirationTimeToWorkOn = earliestPendingTime !== NoWork ? earliestPendingTime : latestPingedTime;

  // If there is no pending or pinged work, check if there's suspended work
  // that's lower priority than what we just completed.
  if (nextExpirationTimeToWorkOn === NoWork && (completedExpirationTime === NoWork || latestSuspendedTime < completedExpirationTime)) {
    // The lowest priority suspended work is the work most likely to be
    // committed next. Let's start rendering it again, so that if it times out,
    // it's ready to commit.
    nextExpirationTimeToWorkOn = latestSuspendedTime;
  }

  var expirationTime = nextExpirationTimeToWorkOn;
  if (expirationTime !== NoWork && earliestSuspendedTime > expirationTime) {
    // Expire using the earliest known expiration time.
    expirationTime = earliestSuspendedTime;
  }

  root.nextExpirationTimeToWorkOn = nextExpirationTimeToWorkOn;
  root.expirationTime = expirationTime;
}

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = warningWithoutStack$1;

{
  warning = function (condition, format) {
    if (condition) {
      return;
    }
    var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
    var stack = ReactDebugCurrentFrame.getStackAddendum();
    // eslint-disable-next-line react-internal/warning-and-invariant-args

    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    warningWithoutStack$1.apply(undefined, [false, format + '%s'].concat(args, [stack]));
  };
}

var warning$1 = warning;

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x, y) {
  return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y // eslint-disable-line no-self-compare
  ;
}

var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
function shallowEqual(objA, objB) {
  if (is(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

function resolveDefaultProps(Component, baseProps) {
  if (Component && Component.defaultProps) {
    // Resolve default props. Taken from ReactElement
    var props = _assign({}, baseProps);
    var defaultProps = Component.defaultProps;
    for (var propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
    return props;
  }
  return baseProps;
}

function readLazyComponentType(lazyComponent) {
  var status = lazyComponent._status;
  var result = lazyComponent._result;
  switch (status) {
    case Resolved:
      {
        var Component = result;
        return Component;
      }
    case Rejected:
      {
        var error = result;
        throw error;
      }
    case Pending:
      {
        var thenable = result;
        throw thenable;
      }
    default:
      {
        lazyComponent._status = Pending;
        var ctor = lazyComponent._ctor;
        var _thenable = ctor();
        _thenable.then(function (moduleObject) {
          if (lazyComponent._status === Pending) {
            var defaultExport = moduleObject.default;
            {
              if (defaultExport === undefined) {
                warning$1(false, 'lazy: Expected the result of a dynamic import() call. ' + 'Instead received: %s\n\nYour code should look like: \n  ' + "const MyComponent = lazy(() => import('./MyComponent'))", moduleObject);
              }
            }
            lazyComponent._status = Resolved;
            lazyComponent._result = defaultExport;
          }
        }, function (error) {
          if (lazyComponent._status === Pending) {
            lazyComponent._status = Rejected;
            lazyComponent._result = error;
          }
        });
        // Handle synchronous thenables.
        switch (lazyComponent._status) {
          case Resolved:
            return lazyComponent._result;
          case Rejected:
            throw lazyComponent._result;
        }
        lazyComponent._result = _thenable;
        throw _thenable;
      }
  }
}

var fakeInternalInstance = {};
var isArray$1 = Array.isArray;

// React.Component uses a shared frozen object by default.
// We'll use it to determine whether we need to initialize legacy refs.
var emptyRefsObject = new React.Component().refs;

var didWarnAboutStateAssignmentForComponent = void 0;
var didWarnAboutUninitializedState = void 0;
var didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate = void 0;
var didWarnAboutLegacyLifecyclesAndDerivedState = void 0;
var didWarnAboutUndefinedDerivedState = void 0;
var warnOnUndefinedDerivedState = void 0;
var warnOnInvalidCallback = void 0;
var didWarnAboutDirectlyAssigningPropsToState = void 0;
var didWarnAboutContextTypeAndContextTypes = void 0;
var didWarnAboutInvalidateContextType = void 0;

{
  didWarnAboutStateAssignmentForComponent = new Set();
  didWarnAboutUninitializedState = new Set();
  didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate = new Set();
  didWarnAboutLegacyLifecyclesAndDerivedState = new Set();
  didWarnAboutDirectlyAssigningPropsToState = new Set();
  didWarnAboutUndefinedDerivedState = new Set();
  didWarnAboutContextTypeAndContextTypes = new Set();
  didWarnAboutInvalidateContextType = new Set();

  var didWarnOnInvalidCallback = new Set();

  warnOnInvalidCallback = function (callback, callerName) {
    if (callback === null || typeof callback === 'function') {
      return;
    }
    var key = callerName + '_' + callback;
    if (!didWarnOnInvalidCallback.has(key)) {
      didWarnOnInvalidCallback.add(key);
      warningWithoutStack$1(false, '%s(...): Expected the last optional `callback` argument to be a ' + 'function. Instead received: %s.', callerName, callback);
    }
  };

  warnOnUndefinedDerivedState = function (type, partialState) {
    if (partialState === undefined) {
      var componentName = getComponentName(type) || 'Component';
      if (!didWarnAboutUndefinedDerivedState.has(componentName)) {
        didWarnAboutUndefinedDerivedState.add(componentName);
        warningWithoutStack$1(false, '%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. ' + 'You have returned undefined.', componentName);
      }
    }
  };

  // This is so gross but it's at least non-critical and can be removed if
  // it causes problems. This is meant to give a nicer error message for
  // ReactDOM15.unstable_renderSubtreeIntoContainer(reactDOM16Component,
  // ...)) which otherwise throws a "_processChildContext is not a function"
  // exception.
  Object.defineProperty(fakeInternalInstance, '_processChildContext', {
    enumerable: false,
    value: function () {
      invariant(false, '_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn\'t supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).');
    }
  });
  Object.freeze(fakeInternalInstance);
}

function applyDerivedStateFromProps(workInProgress, ctor, getDerivedStateFromProps, nextProps) {
  var prevState = workInProgress.memoizedState;

  {
    if (debugRenderPhaseSideEffects || debugRenderPhaseSideEffectsForStrictMode && workInProgress.mode & StrictMode) {
      // Invoke the function an extra time to help detect side-effects.
      getDerivedStateFromProps(nextProps, prevState);
    }
  }

  var partialState = getDerivedStateFromProps(nextProps, prevState);

  {
    warnOnUndefinedDerivedState(ctor, partialState);
  }
  // Merge the partial state and the previous state.
  var memoizedState = partialState === null || partialState === undefined ? prevState : _assign({}, prevState, partialState);
  workInProgress.memoizedState = memoizedState;

  // Once the update queue is empty, persist the derived state onto the
  // base state.
  var updateQueue = workInProgress.updateQueue;
  if (updateQueue !== null && workInProgress.expirationTime === NoWork) {
    updateQueue.baseState = memoizedState;
  }
}

var classComponentUpdater = {
  isMounted: isMounted,
  enqueueSetState: function (inst, payload, callback) {
    var fiber = get(inst);
    var currentTime = requestCurrentTime();
    var expirationTime = computeExpirationForFiber(currentTime, fiber);

    var update = createUpdate(expirationTime);
    update.payload = payload;
    if (callback !== undefined && callback !== null) {
      {
        warnOnInvalidCallback(callback, 'setState');
      }
      update.callback = callback;
    }

    flushPassiveEffects();
    enqueueUpdate(fiber, update);
    scheduleWork(fiber, expirationTime);
  },
  enqueueReplaceState: function (inst, payload, callback) {
    var fiber = get(inst);
    var currentTime = requestCurrentTime();
    var expirationTime = computeExpirationForFiber(currentTime, fiber);

    var update = createUpdate(expirationTime);
    update.tag = ReplaceState;
    update.payload = payload;

    if (callback !== undefined && callback !== null) {
      {
        warnOnInvalidCallback(callback, 'replaceState');
      }
      update.callback = callback;
    }

    flushPassiveEffects();
    enqueueUpdate(fiber, update);
    scheduleWork(fiber, expirationTime);
  },
  enqueueForceUpdate: function (inst, callback) {
    var fiber = get(inst);
    var currentTime = requestCurrentTime();
    var expirationTime = computeExpirationForFiber(currentTime, fiber);

    var update = createUpdate(expirationTime);
    update.tag = ForceUpdate;

    if (callback !== undefined && callback !== null) {
      {
        warnOnInvalidCallback(callback, 'forceUpdate');
      }
      update.callback = callback;
    }

    flushPassiveEffects();
    enqueueUpdate(fiber, update);
    scheduleWork(fiber, expirationTime);
  }
};

function checkShouldComponentUpdate(workInProgress, ctor, oldProps, newProps, oldState, newState, nextContext) {
  var instance = workInProgress.stateNode;
  if (typeof instance.shouldComponentUpdate === 'function') {
    startPhaseTimer(workInProgress, 'shouldComponentUpdate');
    var shouldUpdate = instance.shouldComponentUpdate(newProps, newState, nextContext);
    stopPhaseTimer();

    {
      !(shouldUpdate !== undefined) ? warningWithoutStack$1(false, '%s.shouldComponentUpdate(): Returned undefined instead of a ' + 'boolean value. Make sure to return true or false.', getComponentName(ctor) || 'Component') : void 0;
    }

    return shouldUpdate;
  }

  if (ctor.prototype && ctor.prototype.isPureReactComponent) {
    return !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState);
  }

  return true;
}

function checkClassInstance(workInProgress, ctor, newProps) {
  var instance = workInProgress.stateNode;
  {
    var name = getComponentName(ctor) || 'Component';
    var renderPresent = instance.render;

    if (!renderPresent) {
      if (ctor.prototype && typeof ctor.prototype.render === 'function') {
        warningWithoutStack$1(false, '%s(...): No `render` method found on the returned component ' + 'instance: did you accidentally return an object from the constructor?', name);
      } else {
        warningWithoutStack$1(false, '%s(...): No `render` method found on the returned component ' + 'instance: you may have forgotten to define `render`.', name);
      }
    }

    var noGetInitialStateOnES6 = !instance.getInitialState || instance.getInitialState.isReactClassApproved || instance.state;
    !noGetInitialStateOnES6 ? warningWithoutStack$1(false, 'getInitialState was defined on %s, a plain JavaScript class. ' + 'This is only supported for classes created using React.createClass. ' + 'Did you mean to define a state property instead?', name) : void 0;
    var noGetDefaultPropsOnES6 = !instance.getDefaultProps || instance.getDefaultProps.isReactClassApproved;
    !noGetDefaultPropsOnES6 ? warningWithoutStack$1(false, 'getDefaultProps was defined on %s, a plain JavaScript class. ' + 'This is only supported for classes created using React.createClass. ' + 'Use a static property to define defaultProps instead.', name) : void 0;
    var noInstancePropTypes = !instance.propTypes;
    !noInstancePropTypes ? warningWithoutStack$1(false, 'propTypes was defined as an instance property on %s. Use a static ' + 'property to define propTypes instead.', name) : void 0;
    var noInstanceContextType = !instance.contextType;
    !noInstanceContextType ? warningWithoutStack$1(false, 'contextType was defined as an instance property on %s. Use a static ' + 'property to define contextType instead.', name) : void 0;
    var noInstanceContextTypes = !instance.contextTypes;
    !noInstanceContextTypes ? warningWithoutStack$1(false, 'contextTypes was defined as an instance property on %s. Use a static ' + 'property to define contextTypes instead.', name) : void 0;

    if (ctor.contextType && ctor.contextTypes && !didWarnAboutContextTypeAndContextTypes.has(ctor)) {
      didWarnAboutContextTypeAndContextTypes.add(ctor);
      warningWithoutStack$1(false, '%s declares both contextTypes and contextType static properties. ' + 'The legacy contextTypes property will be ignored.', name);
    }

    var noComponentShouldUpdate = typeof instance.componentShouldUpdate !== 'function';
    !noComponentShouldUpdate ? warningWithoutStack$1(false, '%s has a method called ' + 'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' + 'The name is phrased as a question because the function is ' + 'expected to return a value.', name) : void 0;
    if (ctor.prototype && ctor.prototype.isPureReactComponent && typeof instance.shouldComponentUpdate !== 'undefined') {
      warningWithoutStack$1(false, '%s has a method called shouldComponentUpdate(). ' + 'shouldComponentUpdate should not be used when extending React.PureComponent. ' + 'Please extend React.Component if shouldComponentUpdate is used.', getComponentName(ctor) || 'A pure component');
    }
    var noComponentDidUnmount = typeof instance.componentDidUnmount !== 'function';
    !noComponentDidUnmount ? warningWithoutStack$1(false, '%s has a method called ' + 'componentDidUnmount(). But there is no such lifecycle method. ' + 'Did you mean componentWillUnmount()?', name) : void 0;
    var noComponentDidReceiveProps = typeof instance.componentDidReceiveProps !== 'function';
    !noComponentDidReceiveProps ? warningWithoutStack$1(false, '%s has a method called ' + 'componentDidReceiveProps(). But there is no such lifecycle method. ' + 'If you meant to update the state in response to changing props, ' + 'use componentWillReceiveProps(). If you meant to fetch data or ' + 'run side-effects or mutations after React has updated the UI, use componentDidUpdate().', name) : void 0;
    var noComponentWillRecieveProps = typeof instance.componentWillRecieveProps !== 'function';
    !noComponentWillRecieveProps ? warningWithoutStack$1(false, '%s has a method called ' + 'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?', name) : void 0;
    var noUnsafeComponentWillRecieveProps = typeof instance.UNSAFE_componentWillRecieveProps !== 'function';
    !noUnsafeComponentWillRecieveProps ? warningWithoutStack$1(false, '%s has a method called ' + 'UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?', name) : void 0;
    var hasMutatedProps = instance.props !== newProps;
    !(instance.props === undefined || !hasMutatedProps) ? warningWithoutStack$1(false, '%s(...): When calling super() in `%s`, make sure to pass ' + "up the same props that your component's constructor was passed.", name, name) : void 0;
    var noInstanceDefaultProps = !instance.defaultProps;
    !noInstanceDefaultProps ? warningWithoutStack$1(false, 'Setting defaultProps as an instance property on %s is not supported and will be ignored.' + ' Instead, define defaultProps as a static property on %s.', name, name) : void 0;

    if (typeof instance.getSnapshotBeforeUpdate === 'function' && typeof instance.componentDidUpdate !== 'function' && !didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate.has(ctor)) {
      didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate.add(ctor);
      warningWithoutStack$1(false, '%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). ' + 'This component defines getSnapshotBeforeUpdate() only.', getComponentName(ctor));
    }

    var noInstanceGetDerivedStateFromProps = typeof instance.getDerivedStateFromProps !== 'function';
    !noInstanceGetDerivedStateFromProps ? warningWithoutStack$1(false, '%s: getDerivedStateFromProps() is defined as an instance method ' + 'and will be ignored. Instead, declare it as a static method.', name) : void 0;
    var noInstanceGetDerivedStateFromCatch = typeof instance.getDerivedStateFromError !== 'function';
    !noInstanceGetDerivedStateFromCatch ? warningWithoutStack$1(false, '%s: getDerivedStateFromError() is defined as an instance method ' + 'and will be ignored. Instead, declare it as a static method.', name) : void 0;
    var noStaticGetSnapshotBeforeUpdate = typeof ctor.getSnapshotBeforeUpdate !== 'function';
    !noStaticGetSnapshotBeforeUpdate ? warningWithoutStack$1(false, '%s: getSnapshotBeforeUpdate() is defined as a static method ' + 'and will be ignored. Instead, declare it as an instance method.', name) : void 0;
    var _state = instance.state;
    if (_state && (typeof _state !== 'object' || isArray$1(_state))) {
      warningWithoutStack$1(false, '%s.state: must be set to an object or null', name);
    }
    if (typeof instance.getChildContext === 'function') {
      !(typeof ctor.childContextTypes === 'object') ? warningWithoutStack$1(false, '%s.getChildContext(): childContextTypes must be defined in order to ' + 'use getChildContext().', name) : void 0;
    }
  }
}

function adoptClassInstance(workInProgress, instance) {
  instance.updater = classComponentUpdater;
  workInProgress.stateNode = instance;
  // The instance needs access to the fiber so that it can schedule updates
  set(instance, workInProgress);
  {
    instance._reactInternalInstance = fakeInternalInstance;
  }
}

function constructClassInstance(workInProgress, ctor, props, renderExpirationTime) {
  var isLegacyContextConsumer = false;
  var unmaskedContext = emptyContextObject;
  var context = null;
  var contextType = ctor.contextType;
  if (typeof contextType === 'object' && contextType !== null) {
    {
      if (contextType.$$typeof !== REACT_CONTEXT_TYPE && !didWarnAboutInvalidateContextType.has(ctor)) {
        didWarnAboutInvalidateContextType.add(ctor);
        warningWithoutStack$1(false, '%s defines an invalid contextType. ' + 'contextType should point to the Context object returned by React.createContext(). ' + 'Did you accidentally pass the Context.Provider instead?', getComponentName(ctor) || 'Component');
      }
    }

    context = readContext(contextType);
  } else {
    unmaskedContext = getUnmaskedContext(workInProgress, ctor, true);
    var contextTypes = ctor.contextTypes;
    isLegacyContextConsumer = contextTypes !== null && contextTypes !== undefined;
    context = isLegacyContextConsumer ? getMaskedContext(workInProgress, unmaskedContext) : emptyContextObject;
  }

  // Instantiate twice to help detect side-effects.
  {
    if (debugRenderPhaseSideEffects || debugRenderPhaseSideEffectsForStrictMode && workInProgress.mode & StrictMode) {
      new ctor(props, context); // eslint-disable-line no-new
    }
  }

  var instance = new ctor(props, context);
  var state = workInProgress.memoizedState = instance.state !== null && instance.state !== undefined ? instance.state : null;
  adoptClassInstance(workInProgress, instance);

  {
    if (typeof ctor.getDerivedStateFromProps === 'function' && state === null) {
      var componentName = getComponentName(ctor) || 'Component';
      if (!didWarnAboutUninitializedState.has(componentName)) {
        didWarnAboutUninitializedState.add(componentName);
        warningWithoutStack$1(false, '`%s` uses `getDerivedStateFromProps` but its initial state is ' + '%s. This is not recommended. Instead, define the initial state by ' + 'assigning an object to `this.state` in the constructor of `%s`. ' + 'This ensures that `getDerivedStateFromProps` arguments have a consistent shape.', componentName, instance.state === null ? 'null' : 'undefined', componentName);
      }
    }

    // If new component APIs are defined, "unsafe" lifecycles won't be called.
    // Warn about these lifecycles if they are present.
    // Don't warn about react-lifecycles-compat polyfilled methods though.
    if (typeof ctor.getDerivedStateFromProps === 'function' || typeof instance.getSnapshotBeforeUpdate === 'function') {
      var foundWillMountName = null;
      var foundWillReceivePropsName = null;
      var foundWillUpdateName = null;
      if (typeof instance.componentWillMount === 'function' && instance.componentWillMount.__suppressDeprecationWarning !== true) {
        foundWillMountName = 'componentWillMount';
      } else if (typeof instance.UNSAFE_componentWillMount === 'function') {
        foundWillMountName = 'UNSAFE_componentWillMount';
      }
      if (typeof instance.componentWillReceiveProps === 'function' && instance.componentWillReceiveProps.__suppressDeprecationWarning !== true) {
        foundWillReceivePropsName = 'componentWillReceiveProps';
      } else if (typeof instance.UNSAFE_componentWillReceiveProps === 'function') {
        foundWillReceivePropsName = 'UNSAFE_componentWillReceiveProps';
      }
      if (typeof instance.componentWillUpdate === 'function' && instance.componentWillUpdate.__suppressDeprecationWarning !== true) {
        foundWillUpdateName = 'componentWillUpdate';
      } else if (typeof instance.UNSAFE_componentWillUpdate === 'function') {
        foundWillUpdateName = 'UNSAFE_componentWillUpdate';
      }
      if (foundWillMountName !== null || foundWillReceivePropsName !== null || foundWillUpdateName !== null) {
        var _componentName = getComponentName(ctor) || 'Component';
        var newApiName = typeof ctor.getDerivedStateFromProps === 'function' ? 'getDerivedStateFromProps()' : 'getSnapshotBeforeUpdate()';
        if (!didWarnAboutLegacyLifecyclesAndDerivedState.has(_componentName)) {
          didWarnAboutLegacyLifecyclesAndDerivedState.add(_componentName);
          warningWithoutStack$1(false, 'Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n' + '%s uses %s but also contains the following legacy lifecycles:%s%s%s\n\n' + 'The above lifecycles should be removed. Learn more about this warning here:\n' + 'https://fb.me/react-async-component-lifecycle-hooks', _componentName, newApiName, foundWillMountName !== null ? '\n  ' + foundWillMountName : '', foundWillReceivePropsName !== null ? '\n  ' + foundWillReceivePropsName : '', foundWillUpdateName !== null ? '\n  ' + foundWillUpdateName : '');
        }
      }
    }
  }

  // Cache unmasked context so we can avoid recreating masked context unless necessary.
  // ReactFiberContext usually updates this cache but can't for newly-created instances.
  if (isLegacyContextConsumer) {
    cacheContext(workInProgress, unmaskedContext, context);
  }

  return instance;
}

function callComponentWillMount(workInProgress, instance) {
  startPhaseTimer(workInProgress, 'componentWillMount');
  var oldState = instance.state;

  if (typeof instance.componentWillMount === 'function') {
    instance.componentWillMount();
  }
  if (typeof instance.UNSAFE_componentWillMount === 'function') {
    instance.UNSAFE_componentWillMount();
  }

  stopPhaseTimer();

  if (oldState !== instance.state) {
    {
      warningWithoutStack$1(false, '%s.componentWillMount(): Assigning directly to this.state is ' + "deprecated (except inside a component's " + 'constructor). Use setState instead.', getComponentName(workInProgress.type) || 'Component');
    }
    classComponentUpdater.enqueueReplaceState(instance, instance.state, null);
  }
}

function callComponentWillReceiveProps(workInProgress, instance, newProps, nextContext) {
  var oldState = instance.state;
  startPhaseTimer(workInProgress, 'componentWillReceiveProps');
  if (typeof instance.componentWillReceiveProps === 'function') {
    instance.componentWillReceiveProps(newProps, nextContext);
  }
  if (typeof instance.UNSAFE_componentWillReceiveProps === 'function') {
    instance.UNSAFE_componentWillReceiveProps(newProps, nextContext);
  }
  stopPhaseTimer();

  if (instance.state !== oldState) {
    {
      var componentName = getComponentName(workInProgress.type) || 'Component';
      if (!didWarnAboutStateAssignmentForComponent.has(componentName)) {
        didWarnAboutStateAssignmentForComponent.add(componentName);
        warningWithoutStack$1(false, '%s.componentWillReceiveProps(): Assigning directly to ' + "this.state is deprecated (except inside a component's " + 'constructor). Use setState instead.', componentName);
      }
    }
    classComponentUpdater.enqueueReplaceState(instance, instance.state, null);
  }
}

// Invokes the mount life-cycles on a previously never rendered instance.
function mountClassInstance(workInProgress, ctor, newProps, renderExpirationTime) {
  {
    checkClassInstance(workInProgress, ctor, newProps);
  }

  var instance = workInProgress.stateNode;
  instance.props = newProps;
  instance.state = workInProgress.memoizedState;
  instance.refs = emptyRefsObject;

  var contextType = ctor.contextType;
  if (typeof contextType === 'object' && contextType !== null) {
    instance.context = readContext(contextType);
  } else {
    var unmaskedContext = getUnmaskedContext(workInProgress, ctor, true);
    instance.context = getMaskedContext(workInProgress, unmaskedContext);
  }

  {
    if (instance.state === newProps) {
      var componentName = getComponentName(ctor) || 'Component';
      if (!didWarnAboutDirectlyAssigningPropsToState.has(componentName)) {
        didWarnAboutDirectlyAssigningPropsToState.add(componentName);
        warningWithoutStack$1(false, '%s: It is not recommended to assign props directly to state ' + "because updates to props won't be reflected in state. " + 'In most cases, it is better to use props directly.', componentName);
      }
    }

    if (workInProgress.mode & StrictMode) {
      ReactStrictModeWarnings.recordUnsafeLifecycleWarnings(workInProgress, instance);

      ReactStrictModeWarnings.recordLegacyContextWarning(workInProgress, instance);
    }

    if (warnAboutDeprecatedLifecycles) {
      ReactStrictModeWarnings.recordDeprecationWarnings(workInProgress, instance);
    }
  }

  var updateQueue = workInProgress.updateQueue;
  if (updateQueue !== null) {
    processUpdateQueue(workInProgress, updateQueue, newProps, instance, renderExpirationTime);
    instance.state = workInProgress.memoizedState;
  }

  var getDerivedStateFromProps = ctor.getDerivedStateFromProps;
  if (typeof getDerivedStateFromProps === 'function') {
    applyDerivedStateFromProps(workInProgress, ctor, getDerivedStateFromProps, newProps);
    instance.state = workInProgress.memoizedState;
  }

  // In order to support react-lifecycles-compat polyfilled components,
  // Unsafe lifecycles should not be invoked for components using the new APIs.
  if (typeof ctor.getDerivedStateFromProps !== 'function' && typeof instance.getSnapshotBeforeUpdate !== 'function' && (typeof instance.UNSAFE_componentWillMount === 'function' || typeof instance.componentWillMount === 'function')) {
    callComponentWillMount(workInProgress, instance);
    // If we had additional state updates during this life-cycle, let's
    // process them now.
    updateQueue = workInProgress.updateQueue;
    if (updateQueue !== null) {
      processUpdateQueue(workInProgress, updateQueue, newProps, instance, renderExpirationTime);
      instance.state = workInProgress.memoizedState;
    }
  }

  if (typeof instance.componentDidMount === 'function') {
    workInProgress.effectTag |= Update;
  }
}

function resumeMountClassInstance(workInProgress, ctor, newProps, renderExpirationTime) {
  var instance = workInProgress.stateNode;

  var oldProps = workInProgress.memoizedProps;
  instance.props = oldProps;

  var oldContext = instance.context;
  var contextType = ctor.contextType;
  var nextContext = void 0;
  if (typeof contextType === 'object' && contextType !== null) {
    nextContext = readContext(contextType);
  } else {
    var nextLegacyUnmaskedContext = getUnmaskedContext(workInProgress, ctor, true);
    nextContext = getMaskedContext(workInProgress, nextLegacyUnmaskedContext);
  }

  var getDerivedStateFromProps = ctor.getDerivedStateFromProps;
  var hasNewLifecycles = typeof getDerivedStateFromProps === 'function' || typeof instance.getSnapshotBeforeUpdate === 'function';

  // Note: During these life-cycles, instance.props/instance.state are what
  // ever the previously attempted to render - not the "current". However,
  // during componentDidUpdate we pass the "current" props.

  // In order to support react-lifecycles-compat polyfilled components,
  // Unsafe lifecycles should not be invoked for components using the new APIs.
  if (!hasNewLifecycles && (typeof instance.UNSAFE_componentWillReceiveProps === 'function' || typeof instance.componentWillReceiveProps === 'function')) {
    if (oldProps !== newProps || oldContext !== nextContext) {
      callComponentWillReceiveProps(workInProgress, instance, newProps, nextContext);
    }
  }

  resetHasForceUpdateBeforeProcessing();

  var oldState = workInProgress.memoizedState;
  var newState = instance.state = oldState;
  var updateQueue = workInProgress.updateQueue;
  if (updateQueue !== null) {
    processUpdateQueue(workInProgress, updateQueue, newProps, instance, renderExpirationTime);
    newState = workInProgress.memoizedState;
  }
  if (oldProps === newProps && oldState === newState && !hasContextChanged() && !checkHasForceUpdateAfterProcessing()) {
    // If an update was already in progress, we should schedule an Update
    // effect even though we're bailing out, so that cWU/cDU are called.
    if (typeof instance.componentDidMount === 'function') {
      workInProgress.effectTag |= Update;
    }
    return false;
  }

  if (typeof getDerivedStateFromProps === 'function') {
    applyDerivedStateFromProps(workInProgress, ctor, getDerivedStateFromProps, newProps);
    newState = workInProgress.memoizedState;
  }

  var shouldUpdate = checkHasForceUpdateAfterProcessing() || checkShouldComponentUpdate(workInProgress, ctor, oldProps, newProps, oldState, newState, nextContext);

  if (shouldUpdate) {
    // In order to support react-lifecycles-compat polyfilled components,
    // Unsafe lifecycles should not be invoked for components using the new APIs.
    if (!hasNewLifecycles && (typeof instance.UNSAFE_componentWillMount === 'function' || typeof instance.componentWillMount === 'function')) {
      startPhaseTimer(workInProgress, 'componentWillMount');
      if (typeof instance.componentWillMount === 'function') {
        instance.componentWillMount();
      }
      if (typeof instance.UNSAFE_componentWillMount === 'function') {
        instance.UNSAFE_componentWillMount();
      }
      stopPhaseTimer();
    }
    if (typeof instance.componentDidMount === 'function') {
      workInProgress.effectTag |= Update;
    }
  } else {
    // If an update was already in progress, we should schedule an Update
    // effect even though we're bailing out, so that cWU/cDU are called.
    if (typeof instance.componentDidMount === 'function') {
      workInProgress.effectTag |= Update;
    }

    // If shouldComponentUpdate returned false, we should still update the
    // memoized state to indicate that this work can be reused.
    workInProgress.memoizedProps = newProps;
    workInProgress.memoizedState = newState;
  }

  // Update the existing instance's state, props, and context pointers even
  // if shouldComponentUpdate returns false.
  instance.props = newProps;
  instance.state = newState;
  instance.context = nextContext;

  return shouldUpdate;
}

// Invokes the update life-cycles and returns false if it shouldn't rerender.
function updateClassInstance(current, workInProgress, ctor, newProps, renderExpirationTime) {
  var instance = workInProgress.stateNode;

  var oldProps = workInProgress.memoizedProps;
  instance.props = workInProgress.type === workInProgress.elementType ? oldProps : resolveDefaultProps(workInProgress.type, oldProps);

  var oldContext = instance.context;
  var contextType = ctor.contextType;
  var nextContext = void 0;
  if (typeof contextType === 'object' && contextType !== null) {
    nextContext = readContext(contextType);
  } else {
    var nextUnmaskedContext = getUnmaskedContext(workInProgress, ctor, true);
    nextContext = getMaskedContext(workInProgress, nextUnmaskedContext);
  }

  var getDerivedStateFromProps = ctor.getDerivedStateFromProps;
  var hasNewLifecycles = typeof getDerivedStateFromProps === 'function' || typeof instance.getSnapshotBeforeUpdate === 'function';

  // Note: During these life-cycles, instance.props/instance.state are what
  // ever the previously attempted to render - not the "current". However,
  // during componentDidUpdate we pass the "current" props.

  // In order to support react-lifecycles-compat polyfilled components,
  // Unsafe lifecycles should not be invoked for components using the new APIs.
  if (!hasNewLifecycles && (typeof instance.UNSAFE_componentWillReceiveProps === 'function' || typeof instance.componentWillReceiveProps === 'function')) {
    if (oldProps !== newProps || oldContext !== nextContext) {
      callComponentWillReceiveProps(workInProgress, instance, newProps, nextContext);
    }
  }

  resetHasForceUpdateBeforeProcessing();

  var oldState = workInProgress.memoizedState;
  var newState = instance.state = oldState;
  var updateQueue = workInProgress.updateQueue;
  if (updateQueue !== null) {
    processUpdateQueue(workInProgress, updateQueue, newProps, instance, renderExpirationTime);
    newState = workInProgress.memoizedState;
  }

  if (oldProps === newProps && oldState === newState && !hasContextChanged() && !checkHasForceUpdateAfterProcessing()) {
    // If an update was already in progress, we should schedule an Update
    // effect even though we're bailing out, so that cWU/cDU are called.
    if (typeof instance.componentDidUpdate === 'function') {
      if (oldProps !== current.memoizedProps || oldState !== current.memoizedState) {
        workInProgress.effectTag |= Update;
      }
    }
    if (typeof instance.getSnapshotBeforeUpdate === 'function') {
      if (oldProps !== current.memoizedProps || oldState !== current.memoizedState) {
        workInProgress.effectTag |= Snapshot;
      }
    }
    return false;
  }

  if (typeof getDerivedStateFromProps === 'function') {
    applyDerivedStateFromProps(workInProgress, ctor, getDerivedStateFromProps, newProps);
    newState = workInProgress.memoizedState;
  }

  var shouldUpdate = checkHasForceUpdateAfterProcessing() || checkShouldComponentUpdate(workInProgress, ctor, oldProps, newProps, oldState, newState, nextContext);

  if (shouldUpdate) {
    // In order to support react-lifecycles-compat polyfilled components,
    // Unsafe lifecycles should not be invoked for components using the new APIs.
    if (!hasNewLifecycles && (typeof instance.UNSAFE_componentWillUpdate === 'function' || typeof instance.componentWillUpdate === 'function')) {
      startPhaseTimer(workInProgress, 'componentWillUpdate');
      if (typeof instance.componentWillUpdate === 'function') {
        instance.componentWillUpdate(newProps, newState, nextContext);
      }
      if (typeof instance.UNSAFE_componentWillUpdate === 'function') {
        instance.UNSAFE_componentWillUpdate(newProps, newState, nextContext);
      }
      stopPhaseTimer();
    }
    if (typeof instance.componentDidUpdate === 'function') {
      workInProgress.effectTag |= Update;
    }
    if (typeof instance.getSnapshotBeforeUpdate === 'function') {
      workInProgress.effectTag |= Snapshot;
    }
  } else {
    // If an update was already in progress, we should schedule an Update
    // effect even though we're bailing out, so that cWU/cDU are called.
    if (typeof instance.componentDidUpdate === 'function') {
      if (oldProps !== current.memoizedProps || oldState !== current.memoizedState) {
        workInProgress.effectTag |= Update;
      }
    }
    if (typeof instance.getSnapshotBeforeUpdate === 'function') {
      if (oldProps !== current.memoizedProps || oldState !== current.memoizedState) {
        workInProgress.effectTag |= Snapshot;
      }
    }

    // If shouldComponentUpdate returned false, we should still update the
    // memoized props/state to indicate that this work can be reused.
    workInProgress.memoizedProps = newProps;
    workInProgress.memoizedState = newState;
  }

  // Update the existing instance's state, props, and context pointers even
  // if shouldComponentUpdate returns false.
  instance.props = newProps;
  instance.state = newState;
  instance.context = nextContext;

  return shouldUpdate;
}

var didWarnAboutMaps = void 0;
var didWarnAboutGenerators = void 0;
var didWarnAboutStringRefInStrictMode = void 0;
var ownerHasKeyUseWarning = void 0;
var ownerHasFunctionTypeWarning = void 0;
var warnForMissingKey = function (child) {};

{
  didWarnAboutMaps = false;
  didWarnAboutGenerators = false;
  didWarnAboutStringRefInStrictMode = {};

  /**
   * Warn if there's no key explicitly set on dynamic arrays of children or
   * object keys are not valid. This allows us to keep track of children between
   * updates.
   */
  ownerHasKeyUseWarning = {};
  ownerHasFunctionTypeWarning = {};

  warnForMissingKey = function (child) {
    if (child === null || typeof child !== 'object') {
      return;
    }
    if (!child._store || child._store.validated || child.key != null) {
      return;
    }
    !(typeof child._store === 'object') ? invariant(false, 'React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.') : void 0;
    child._store.validated = true;

    var currentComponentErrorInfo = 'Each child in a list should have a unique ' + '"key" prop. See https://fb.me/react-warning-keys for ' + 'more information.' + getCurrentFiberStackInDev();
    if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
      return;
    }
    ownerHasKeyUseWarning[currentComponentErrorInfo] = true;

    warning$1(false, 'Each child in a list should have a unique ' + '"key" prop. See https://fb.me/react-warning-keys for ' + 'more information.');
  };
}

var isArray = Array.isArray;

function coerceRef(returnFiber, current$$1, element) {
  var mixedRef = element.ref;
  if (mixedRef !== null && typeof mixedRef !== 'function' && typeof mixedRef !== 'object') {
    {
      if (returnFiber.mode & StrictMode) {
        var componentName = getComponentName(returnFiber.type) || 'Component';
        if (!didWarnAboutStringRefInStrictMode[componentName]) {
          warningWithoutStack$1(false, 'A string ref, "%s", has been found within a strict mode tree. ' + 'String refs are a source of potential bugs and should be avoided. ' + 'We recommend using createRef() instead.' + '\n%s' + '\n\nLearn more about using refs safely here:' + '\nhttps://fb.me/react-strict-mode-string-ref', mixedRef, getStackByFiberInDevAndProd(returnFiber));
          didWarnAboutStringRefInStrictMode[componentName] = true;
        }
      }
    }

    if (element._owner) {
      var owner = element._owner;
      var inst = void 0;
      if (owner) {
        var ownerFiber = owner;
        !(ownerFiber.tag === ClassComponent) ? invariant(false, 'Function components cannot have refs. Did you mean to use React.forwardRef()?') : void 0;
        inst = ownerFiber.stateNode;
      }
      !inst ? invariant(false, 'Missing owner for string ref %s. This error is likely caused by a bug in React. Please file an issue.', mixedRef) : void 0;
      var stringRef = '' + mixedRef;
      // Check if previous string ref matches new string ref
      if (current$$1 !== null && current$$1.ref !== null && typeof current$$1.ref === 'function' && current$$1.ref._stringRef === stringRef) {
        return current$$1.ref;
      }
      var ref = function (value) {
        var refs = inst.refs;
        if (refs === emptyRefsObject) {
          // This is a lazy pooled frozen object, so we need to initialize.
          refs = inst.refs = {};
        }
        if (value === null) {
          delete refs[stringRef];
        } else {
          refs[stringRef] = value;
        }
      };
      ref._stringRef = stringRef;
      return ref;
    } else {
      !(typeof mixedRef === 'string') ? invariant(false, 'Expected ref to be a function, a string, an object returned by React.createRef(), or null.') : void 0;
      !element._owner ? invariant(false, 'Element ref was specified as a string (%s) but no owner was set. This could happen for one of the following reasons:\n1. You may be adding a ref to a function component\n2. You may be adding a ref to a component that was not created inside a component\'s render method\n3. You have multiple copies of React loaded\nSee https://fb.me/react-refs-must-have-owner for more information.', mixedRef) : void 0;
    }
  }
  return mixedRef;
}

function throwOnInvalidObjectType(returnFiber, newChild) {
  if (returnFiber.type !== 'textarea') {
    var addendum = '';
    {
      addendum = ' If you meant to render a collection of children, use an array ' + 'instead.' + getCurrentFiberStackInDev();
    }
    invariant(false, 'Objects are not valid as a React child (found: %s).%s', Object.prototype.toString.call(newChild) === '[object Object]' ? 'object with keys {' + Object.keys(newChild).join(', ') + '}' : newChild, addendum);
  }
}

function warnOnFunctionType() {
  var currentComponentErrorInfo = 'Functions are not valid as a React child. This may happen if ' + 'you return a Component instead of <Component /> from render. ' + 'Or maybe you meant to call this function rather than return it.' + getCurrentFiberStackInDev();

  if (ownerHasFunctionTypeWarning[currentComponentErrorInfo]) {
    return;
  }
  ownerHasFunctionTypeWarning[currentComponentErrorInfo] = true;

  warning$1(false, 'Functions are not valid as a React child. This may happen if ' + 'you return a Component instead of <Component /> from render. ' + 'Or maybe you meant to call this function rather than return it.');
}

// This wrapper function exists because I expect to clone the code in each path
// to be able to optimize each path individually by branching early. This needs
// a compiler or we can do it manually. Helpers that don't need this branching
// live outside of this function.
function ChildReconciler(shouldTrackSideEffects) {
  function deleteChild(returnFiber, childToDelete) {
    if (!shouldTrackSideEffects) {
      // Noop.
      return;
    }
    // Deletions are added in reversed order so we add it to the front.
    // At this point, the return fiber's effect list is empty except for
    // deletions, so we can just append the deletion to the list. The remaining
    // effects aren't added until the complete phase. Once we implement
    // resuming, this may not be true.
    var last = returnFiber.lastEffect;
    if (last !== null) {
      last.nextEffect = childToDelete;
      returnFiber.lastEffect = childToDelete;
    } else {
      returnFiber.firstEffect = returnFiber.lastEffect = childToDelete;
    }
    childToDelete.nextEffect = null;
    childToDelete.effectTag = Deletion;
  }

  function deleteRemainingChildren(returnFiber, currentFirstChild) {
    if (!shouldTrackSideEffects) {
      // Noop.
      return null;
    }

    // TODO: For the shouldClone case, this could be micro-optimized a bit by
    // assuming that after the first child we've already added everything.
    var childToDelete = currentFirstChild;
    while (childToDelete !== null) {
      deleteChild(returnFiber, childToDelete);
      childToDelete = childToDelete.sibling;
    }
    return null;
  }

  function mapRemainingChildren(returnFiber, currentFirstChild) {
    // Add the remaining children to a temporary map so that we can find them by
    // keys quickly. Implicit (null) keys get added to this set with their index
    var existingChildren = new Map();

    var existingChild = currentFirstChild;
    while (existingChild !== null) {
      if (existingChild.key !== null) {
        existingChildren.set(existingChild.key, existingChild);
      } else {
        existingChildren.set(existingChild.index, existingChild);
      }
      existingChild = existingChild.sibling;
    }
    return existingChildren;
  }

  function useFiber(fiber, pendingProps, expirationTime) {
    // We currently set sibling to null and index to 0 here because it is easy
    // to forget to do before returning it. E.g. for the single child case.
    var clone = createWorkInProgress(fiber, pendingProps, expirationTime);
    clone.index = 0;
    clone.sibling = null;
    return clone;
  }

  function placeChild(newFiber, lastPlacedIndex, newIndex) {
    newFiber.index = newIndex;
    if (!shouldTrackSideEffects) {
      // Noop.
      return lastPlacedIndex;
    }
    var current$$1 = newFiber.alternate;
    if (current$$1 !== null) {
      var oldIndex = current$$1.index;
      if (oldIndex < lastPlacedIndex) {
        // This is a move.
        newFiber.effectTag = Placement;
        return lastPlacedIndex;
      } else {
        // This item can stay in place.
        return oldIndex;
      }
    } else {
      // This is an insertion.
      newFiber.effectTag = Placement;
      return lastPlacedIndex;
    }
  }

  function placeSingleChild(newFiber) {
    // This is simpler for the single child case. We only need to do a
    // placement for inserting new children.
    if (shouldTrackSideEffects && newFiber.alternate === null) {
      newFiber.effectTag = Placement;
    }
    return newFiber;
  }

  function updateTextNode(returnFiber, current$$1, textContent, expirationTime) {
    if (current$$1 === null || current$$1.tag !== HostText) {
      // Insert
      var created = createFiberFromText(textContent, returnFiber.mode, expirationTime);
      created.return = returnFiber;
      return created;
    } else {
      // Update
      var existing = useFiber(current$$1, textContent, expirationTime);
      existing.return = returnFiber;
      return existing;
    }
  }

  function updateElement(returnFiber, current$$1, element, expirationTime) {
    if (current$$1 !== null && current$$1.elementType === element.type) {
      // Move based on index
      var existing = useFiber(current$$1, element.props, expirationTime);
      existing.ref = coerceRef(returnFiber, current$$1, element);
      existing.return = returnFiber;
      {
        existing._debugSource = element._source;
        existing._debugOwner = element._owner;
      }
      return existing;
    } else {
      // Insert
      var created = createFiberFromElement(element, returnFiber.mode, expirationTime);
      created.ref = coerceRef(returnFiber, current$$1, element);
      created.return = returnFiber;
      return created;
    }
  }

  function updatePortal(returnFiber, current$$1, portal, expirationTime) {
    if (current$$1 === null || current$$1.tag !== HostPortal || current$$1.stateNode.containerInfo !== portal.containerInfo || current$$1.stateNode.implementation !== portal.implementation) {
      // Insert
      var created = createFiberFromPortal(portal, returnFiber.mode, expirationTime);
      created.return = returnFiber;
      return created;
    } else {
      // Update
      var existing = useFiber(current$$1, portal.children || [], expirationTime);
      existing.return = returnFiber;
      return existing;
    }
  }

  function updateFragment(returnFiber, current$$1, fragment, expirationTime, key) {
    if (current$$1 === null || current$$1.tag !== Fragment) {
      // Insert
      var created = createFiberFromFragment(fragment, returnFiber.mode, expirationTime, key);
      created.return = returnFiber;
      return created;
    } else {
      // Update
      var existing = useFiber(current$$1, fragment, expirationTime);
      existing.return = returnFiber;
      return existing;
    }
  }

  function createChild(returnFiber, newChild, expirationTime) {
    if (typeof newChild === 'string' || typeof newChild === 'number') {
      // Text nodes don't have keys. If the previous node is implicitly keyed
      // we can continue to replace it without aborting even if it is not a text
      // node.
      var created = createFiberFromText('' + newChild, returnFiber.mode, expirationTime);
      created.return = returnFiber;
      return created;
    }

    if (typeof newChild === 'object' && newChild !== null) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          {
            var _created = createFiberFromElement(newChild, returnFiber.mode, expirationTime);
            _created.ref = coerceRef(returnFiber, null, newChild);
            _created.return = returnFiber;
            return _created;
          }
        case REACT_PORTAL_TYPE:
          {
            var _created2 = createFiberFromPortal(newChild, returnFiber.mode, expirationTime);
            _created2.return = returnFiber;
            return _created2;
          }
      }

      if (isArray(newChild) || getIteratorFn(newChild)) {
        var _created3 = createFiberFromFragment(newChild, returnFiber.mode, expirationTime, null);
        _created3.return = returnFiber;
        return _created3;
      }

      throwOnInvalidObjectType(returnFiber, newChild);
    }

    {
      if (typeof newChild === 'function') {
        warnOnFunctionType();
      }
    }

    return null;
  }

  function updateSlot(returnFiber, oldFiber, newChild, expirationTime) {
    // Update the fiber if the keys match, otherwise return null.

    var key = oldFiber !== null ? oldFiber.key : null;

    if (typeof newChild === 'string' || typeof newChild === 'number') {
      // Text nodes don't have keys. If the previous node is implicitly keyed
      // we can continue to replace it without aborting even if it is not a text
      // node.
      if (key !== null) {
        return null;
      }
      return updateTextNode(returnFiber, oldFiber, '' + newChild, expirationTime);
    }

    if (typeof newChild === 'object' && newChild !== null) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          {
            if (newChild.key === key) {
              if (newChild.type === REACT_FRAGMENT_TYPE) {
                return updateFragment(returnFiber, oldFiber, newChild.props.children, expirationTime, key);
              }
              return updateElement(returnFiber, oldFiber, newChild, expirationTime);
            } else {
              return null;
            }
          }
        case REACT_PORTAL_TYPE:
          {
            if (newChild.key === key) {
              return updatePortal(returnFiber, oldFiber, newChild, expirationTime);
            } else {
              return null;
            }
          }
      }

      if (isArray(newChild) || getIteratorFn(newChild)) {
        if (key !== null) {
          return null;
        }

        return updateFragment(returnFiber, oldFiber, newChild, expirationTime, null);
      }

      throwOnInvalidObjectType(returnFiber, newChild);
    }

    {
      if (typeof newChild === 'function') {
        warnOnFunctionType();
      }
    }

    return null;
  }

  function updateFromMap(existingChildren, returnFiber, newIdx, newChild, expirationTime) {
    if (typeof newChild === 'string' || typeof newChild === 'number') {
      // Text nodes don't have keys, so we neither have to check the old nor
      // new node for the key. If both are text nodes, they match.
      var matchedFiber = existingChildren.get(newIdx) || null;
      return updateTextNode(returnFiber, matchedFiber, '' + newChild, expirationTime);
    }

    if (typeof newChild === 'object' && newChild !== null) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          {
            var _matchedFiber = existingChildren.get(newChild.key === null ? newIdx : newChild.key) || null;
            if (newChild.type === REACT_FRAGMENT_TYPE) {
              return updateFragment(returnFiber, _matchedFiber, newChild.props.children, expirationTime, newChild.key);
            }
            return updateElement(returnFiber, _matchedFiber, newChild, expirationTime);
          }
        case REACT_PORTAL_TYPE:
          {
            var _matchedFiber2 = existingChildren.get(newChild.key === null ? newIdx : newChild.key) || null;
            return updatePortal(returnFiber, _matchedFiber2, newChild, expirationTime);
          }
      }

      if (isArray(newChild) || getIteratorFn(newChild)) {
        var _matchedFiber3 = existingChildren.get(newIdx) || null;
        return updateFragment(returnFiber, _matchedFiber3, newChild, expirationTime, null);
      }

      throwOnInvalidObjectType(returnFiber, newChild);
    }

    {
      if (typeof newChild === 'function') {
        warnOnFunctionType();
      }
    }

    return null;
  }

  /**
   * Warns if there is a duplicate or missing key
   */
  function warnOnInvalidKey(child, knownKeys) {
    {
      if (typeof child !== 'object' || child === null) {
        return knownKeys;
      }
      switch (child.$$typeof) {
        case REACT_ELEMENT_TYPE:
        case REACT_PORTAL_TYPE:
          warnForMissingKey(child);
          var key = child.key;
          if (typeof key !== 'string') {
            break;
          }
          if (knownKeys === null) {
            knownKeys = new Set();
            knownKeys.add(key);
            break;
          }
          if (!knownKeys.has(key)) {
            knownKeys.add(key);
            break;
          }
          warning$1(false, 'Encountered two children with the same key, `%s`. ' + 'Keys should be unique so that components maintain their identity ' + 'across updates. Non-unique keys may cause children to be ' + 'duplicated and/or omitted — the behavior is unsupported and ' + 'could change in a future version.', key);
          break;
        default:
          break;
      }
    }
    return knownKeys;
  }

  function reconcileChildrenArray(returnFiber, currentFirstChild, newChildren, expirationTime) {
    // This algorithm can't optimize by searching from both ends since we
    // don't have backpointers on fibers. I'm trying to see how far we can get
    // with that model. If it ends up not being worth the tradeoffs, we can
    // add it later.

    // Even with a two ended optimization, we'd want to optimize for the case
    // where there are few changes and brute force the comparison instead of
    // going for the Map. It'd like to explore hitting that path first in
    // forward-only mode and only go for the Map once we notice that we need
    // lots of look ahead. This doesn't handle reversal as well as two ended
    // search but that's unusual. Besides, for the two ended optimization to
    // work on Iterables, we'd need to copy the whole set.

    // In this first iteration, we'll just live with hitting the bad case
    // (adding everything to a Map) in for every insert/move.

    // If you change this code, also update reconcileChildrenIterator() which
    // uses the same algorithm.

    {
      // First, validate keys.
      var knownKeys = null;
      for (var i = 0; i < newChildren.length; i++) {
        var child = newChildren[i];
        knownKeys = warnOnInvalidKey(child, knownKeys);
      }
    }

    var resultingFirstChild = null;
    var previousNewFiber = null;

    var oldFiber = currentFirstChild;
    var lastPlacedIndex = 0;
    var newIdx = 0;
    var nextOldFiber = null;
    for (; oldFiber !== null && newIdx < newChildren.length; newIdx++) {
      if (oldFiber.index > newIdx) {
        nextOldFiber = oldFiber;
        oldFiber = null;
      } else {
        nextOldFiber = oldFiber.sibling;
      }
      var newFiber = updateSlot(returnFiber, oldFiber, newChildren[newIdx], expirationTime);
      if (newFiber === null) {
        // TODO: This breaks on empty slots like null children. That's
        // unfortunate because it triggers the slow path all the time. We need
        // a better way to communicate whether this was a miss or null,
        // boolean, undefined, etc.
        if (oldFiber === null) {
          oldFiber = nextOldFiber;
        }
        break;
      }
      if (shouldTrackSideEffects) {
        if (oldFiber && newFiber.alternate === null) {
          // We matched the slot, but we didn't reuse the existing fiber, so we
          // need to delete the existing child.
          deleteChild(returnFiber, oldFiber);
        }
      }
      lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx);
      if (previousNewFiber === null) {
        // TODO: Move out of the loop. This only happens for the first run.
        resultingFirstChild = newFiber;
      } else {
        // TODO: Defer siblings if we're not at the right index for this slot.
        // I.e. if we had null values before, then we want to defer this
        // for each null value. However, we also don't want to call updateSlot
        // with the previous one.
        previousNewFiber.sibling = newFiber;
      }
      previousNewFiber = newFiber;
      oldFiber = nextOldFiber;
    }

    if (newIdx === newChildren.length) {
      // We've reached the end of the new children. We can delete the rest.
      deleteRemainingChildren(returnFiber, oldFiber);
      return resultingFirstChild;
    }

    if (oldFiber === null) {
      // If we don't have any more existing children we can choose a fast path
      // since the rest will all be insertions.
      for (; newIdx < newChildren.length; newIdx++) {
        var _newFiber = createChild(returnFiber, newChildren[newIdx], expirationTime);
        if (!_newFiber) {
          continue;
        }
        lastPlacedIndex = placeChild(_newFiber, lastPlacedIndex, newIdx);
        if (previousNewFiber === null) {
          // TODO: Move out of the loop. This only happens for the first run.
          resultingFirstChild = _newFiber;
        } else {
          previousNewFiber.sibling = _newFiber;
        }
        previousNewFiber = _newFiber;
      }
      return resultingFirstChild;
    }

    // Add all children to a key map for quick lookups.
    var existingChildren = mapRemainingChildren(returnFiber, oldFiber);

    // Keep scanning and use the map to restore deleted items as moves.
    for (; newIdx < newChildren.length; newIdx++) {
      var _newFiber2 = updateFromMap(existingChildren, returnFiber, newIdx, newChildren[newIdx], expirationTime);
      if (_newFiber2) {
        if (shouldTrackSideEffects) {
          if (_newFiber2.alternate !== null) {
            // The new fiber is a work in progress, but if there exists a
            // current, that means that we reused the fiber. We need to delete
            // it from the child list so that we don't add it to the deletion
            // list.
            existingChildren.delete(_newFiber2.key === null ? newIdx : _newFiber2.key);
          }
        }
        lastPlacedIndex = placeChild(_newFiber2, lastPlacedIndex, newIdx);
        if (previousNewFiber === null) {
          resultingFirstChild = _newFiber2;
        } else {
          previousNewFiber.sibling = _newFiber2;
        }
        previousNewFiber = _newFiber2;
      }
    }

    if (shouldTrackSideEffects) {
      // Any existing children that weren't consumed above were deleted. We need
      // to add them to the deletion list.
      existingChildren.forEach(function (child) {
        return deleteChild(returnFiber, child);
      });
    }

    return resultingFirstChild;
  }

  function reconcileChildrenIterator(returnFiber, currentFirstChild, newChildrenIterable, expirationTime) {
    // This is the same implementation as reconcileChildrenArray(),
    // but using the iterator instead.

    var iteratorFn = getIteratorFn(newChildrenIterable);
    !(typeof iteratorFn === 'function') ? invariant(false, 'An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.') : void 0;

    {
      // We don't support rendering Generators because it's a mutation.
      // See https://github.com/facebook/react/issues/12995
      if (typeof Symbol === 'function' &&
      // $FlowFixMe Flow doesn't know about toStringTag
      newChildrenIterable[Symbol.toStringTag] === 'Generator') {
        !didWarnAboutGenerators ? warning$1(false, 'Using Generators as children is unsupported and will likely yield ' + 'unexpected results because enumerating a generator mutates it. ' + 'You may convert it to an array with `Array.from()` or the ' + '`[...spread]` operator before rendering. Keep in mind ' + 'you might need to polyfill these features for older browsers.') : void 0;
        didWarnAboutGenerators = true;
      }

      // Warn about using Maps as children
      if (newChildrenIterable.entries === iteratorFn) {
        !didWarnAboutMaps ? warning$1(false, 'Using Maps as children is unsupported and will likely yield ' + 'unexpected results. Convert it to a sequence/iterable of keyed ' + 'ReactElements instead.') : void 0;
        didWarnAboutMaps = true;
      }

      // First, validate keys.
      // We'll get a different iterator later for the main pass.
      var _newChildren = iteratorFn.call(newChildrenIterable);
      if (_newChildren) {
        var knownKeys = null;
        var _step = _newChildren.next();
        for (; !_step.done; _step = _newChildren.next()) {
          var child = _step.value;
          knownKeys = warnOnInvalidKey(child, knownKeys);
        }
      }
    }

    var newChildren = iteratorFn.call(newChildrenIterable);
    !(newChildren != null) ? invariant(false, 'An iterable object provided no iterator.') : void 0;

    var resultingFirstChild = null;
    var previousNewFiber = null;

    var oldFiber = currentFirstChild;
    var lastPlacedIndex = 0;
    var newIdx = 0;
    var nextOldFiber = null;

    var step = newChildren.next();
    for (; oldFiber !== null && !step.done; newIdx++, step = newChildren.next()) {
      if (oldFiber.index > newIdx) {
        nextOldFiber = oldFiber;
        oldFiber = null;
      } else {
        nextOldFiber = oldFiber.sibling;
      }
      var newFiber = updateSlot(returnFiber, oldFiber, step.value, expirationTime);
      if (newFiber === null) {
        // TODO: This breaks on empty slots like null children. That's
        // unfortunate because it triggers the slow path all the time. We need
        // a better way to communicate whether this was a miss or null,
        // boolean, undefined, etc.
        if (!oldFiber) {
          oldFiber = nextOldFiber;
        }
        break;
      }
      if (shouldTrackSideEffects) {
        if (oldFiber && newFiber.alternate === null) {
          // We matched the slot, but we didn't reuse the existing fiber, so we
          // need to delete the existing child.
          deleteChild(returnFiber, oldFiber);
        }
      }
      lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx);
      if (previousNewFiber === null) {
        // TODO: Move out of the loop. This only happens for the first run.
        resultingFirstChild = newFiber;
      } else {
        // TODO: Defer siblings if we're not at the right index for this slot.
        // I.e. if we had null values before, then we want to defer this
        // for each null value. However, we also don't want to call updateSlot
        // with the previous one.
        previousNewFiber.sibling = newFiber;
      }
      previousNewFiber = newFiber;
      oldFiber = nextOldFiber;
    }

    if (step.done) {
      // We've reached the end of the new children. We can delete the rest.
      deleteRemainingChildren(returnFiber, oldFiber);
      return resultingFirstChild;
    }

    if (oldFiber === null) {
      // If we don't have any more existing children we can choose a fast path
      // since the rest will all be insertions.
      for (; !step.done; newIdx++, step = newChildren.next()) {
        var _newFiber3 = createChild(returnFiber, step.value, expirationTime);
        if (_newFiber3 === null) {
          continue;
        }
        lastPlacedIndex = placeChild(_newFiber3, lastPlacedIndex, newIdx);
        if (previousNewFiber === null) {
          // TODO: Move out of the loop. This only happens for the first run.
          resultingFirstChild = _newFiber3;
        } else {
          previousNewFiber.sibling = _newFiber3;
        }
        previousNewFiber = _newFiber3;
      }
      return resultingFirstChild;
    }

    // Add all children to a key map for quick lookups.
    var existingChildren = mapRemainingChildren(returnFiber, oldFiber);

    // Keep scanning and use the map to restore deleted items as moves.
    for (; !step.done; newIdx++, step = newChildren.next()) {
      var _newFiber4 = updateFromMap(existingChildren, returnFiber, newIdx, step.value, expirationTime);
      if (_newFiber4 !== null) {
        if (shouldTrackSideEffects) {
          if (_newFiber4.alternate !== null) {
            // The new fiber is a work in progress, but if there exists a
            // current, that means that we reused the fiber. We need to delete
            // it from the child list so that we don't add it to the deletion
            // list.
            existingChildren.delete(_newFiber4.key === null ? newIdx : _newFiber4.key);
          }
        }
        lastPlacedIndex = placeChild(_newFiber4, lastPlacedIndex, newIdx);
        if (previousNewFiber === null) {
          resultingFirstChild = _newFiber4;
        } else {
          previousNewFiber.sibling = _newFiber4;
        }
        previousNewFiber = _newFiber4;
      }
    }

    if (shouldTrackSideEffects) {
      // Any existing children that weren't consumed above were deleted. We need
      // to add them to the deletion list.
      existingChildren.forEach(function (child) {
        return deleteChild(returnFiber, child);
      });
    }

    return resultingFirstChild;
  }

  function reconcileSingleTextNode(returnFiber, currentFirstChild, textContent, expirationTime) {
    // There's no need to check for keys on text nodes since we don't have a
    // way to define them.
    if (currentFirstChild !== null && currentFirstChild.tag === HostText) {
      // We already have an existing node so let's just update it and delete
      // the rest.
      deleteRemainingChildren(returnFiber, currentFirstChild.sibling);
      var existing = useFiber(currentFirstChild, textContent, expirationTime);
      existing.return = returnFiber;
      return existing;
    }
    // The existing first child is not a text node so we need to create one
    // and delete the existing ones.
    deleteRemainingChildren(returnFiber, currentFirstChild);
    var created = createFiberFromText(textContent, returnFiber.mode, expirationTime);
    created.return = returnFiber;
    return created;
  }

  function reconcileSingleElement(returnFiber, currentFirstChild, element, expirationTime) {
    var key = element.key;
    var child = currentFirstChild;
    while (child !== null) {
      // TODO: If key === null and child.key === null, then this only applies to
      // the first item in the list.
      if (child.key === key) {
        if (child.tag === Fragment ? element.type === REACT_FRAGMENT_TYPE : child.elementType === element.type) {
          deleteRemainingChildren(returnFiber, child.sibling);
          var existing = useFiber(child, element.type === REACT_FRAGMENT_TYPE ? element.props.children : element.props, expirationTime);
          existing.ref = coerceRef(returnFiber, child, element);
          existing.return = returnFiber;
          {
            existing._debugSource = element._source;
            existing._debugOwner = element._owner;
          }
          return existing;
        } else {
          deleteRemainingChildren(returnFiber, child);
          break;
        }
      } else {
        deleteChild(returnFiber, child);
      }
      child = child.sibling;
    }

    if (element.type === REACT_FRAGMENT_TYPE) {
      var created = createFiberFromFragment(element.props.children, returnFiber.mode, expirationTime, element.key);
      created.return = returnFiber;
      return created;
    } else {
      var _created4 = createFiberFromElement(element, returnFiber.mode, expirationTime);
      _created4.ref = coerceRef(returnFiber, currentFirstChild, element);
      _created4.return = returnFiber;
      return _created4;
    }
  }

  function reconcileSinglePortal(returnFiber, currentFirstChild, portal, expirationTime) {
    var key = portal.key;
    var child = currentFirstChild;
    while (child !== null) {
      // TODO: If key === null and child.key === null, then this only applies to
      // the first item in the list.
      if (child.key === key) {
        if (child.tag === HostPortal && child.stateNode.containerInfo === portal.containerInfo && child.stateNode.implementation === portal.implementation) {
          deleteRemainingChildren(returnFiber, child.sibling);
          var existing = useFiber(child, portal.children || [], expirationTime);
          existing.return = returnFiber;
          return existing;
        } else {
          deleteRemainingChildren(returnFiber, child);
          break;
        }
      } else {
        deleteChild(returnFiber, child);
      }
      child = child.sibling;
    }

    var created = createFiberFromPortal(portal, returnFiber.mode, expirationTime);
    created.return = returnFiber;
    return created;
  }

  // This API will tag the children with the side-effect of the reconciliation
  // itself. They will be added to the side-effect list as we pass through the
  // children and the parent.
  function reconcileChildFibers(returnFiber, currentFirstChild, newChild, expirationTime) {
    // This function is not recursive.
    // If the top level item is an array, we treat it as a set of children,
    // not as a fragment. Nested arrays on the other hand will be treated as
    // fragment nodes. Recursion happens at the normal flow.

    // Handle top level unkeyed fragments as if they were arrays.
    // This leads to an ambiguity between <>{[...]}</> and <>...</>.
    // We treat the ambiguous cases above the same.
    var isUnkeyedTopLevelFragment = typeof newChild === 'object' && newChild !== null && newChild.type === REACT_FRAGMENT_TYPE && newChild.key === null;
    if (isUnkeyedTopLevelFragment) {
      newChild = newChild.props.children;
    }

    // Handle object types
    var isObject = typeof newChild === 'object' && newChild !== null;

    if (isObject) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          return placeSingleChild(reconcileSingleElement(returnFiber, currentFirstChild, newChild, expirationTime));
        case REACT_PORTAL_TYPE:
          return placeSingleChild(reconcileSinglePortal(returnFiber, currentFirstChild, newChild, expirationTime));
      }
    }

    if (typeof newChild === 'string' || typeof newChild === 'number') {
      return placeSingleChild(reconcileSingleTextNode(returnFiber, currentFirstChild, '' + newChild, expirationTime));
    }

    if (isArray(newChild)) {
      return reconcileChildrenArray(returnFiber, currentFirstChild, newChild, expirationTime);
    }

    if (getIteratorFn(newChild)) {
      return reconcileChildrenIterator(returnFiber, currentFirstChild, newChild, expirationTime);
    }

    if (isObject) {
      throwOnInvalidObjectType(returnFiber, newChild);
    }

    {
      if (typeof newChild === 'function') {
        warnOnFunctionType();
      }
    }
    if (typeof newChild === 'undefined' && !isUnkeyedTopLevelFragment) {
      // If the new child is undefined, and the return fiber is a composite
      // component, throw an error. If Fiber return types are disabled,
      // we already threw above.
      switch (returnFiber.tag) {
        case ClassComponent:
          {
            {
              var instance = returnFiber.stateNode;
              if (instance.render._isMockFunction) {
                // We allow auto-mocks to proceed as if they're returning null.
                break;
              }
            }
          }
        // Intentionally fall through to the next case, which handles both
        // functions and classes
        // eslint-disable-next-lined no-fallthrough
        case FunctionComponent:
          {
            var Component = returnFiber.type;
            invariant(false, '%s(...): Nothing was returned from render. This usually means a return statement is missing. Or, to render nothing, return null.', Component.displayName || Component.name || 'Component');
          }
      }
    }

    // Remaining cases are all treated as empty.
    return deleteRemainingChildren(returnFiber, currentFirstChild);
  }

  return reconcileChildFibers;
}

var reconcileChildFibers = ChildReconciler(true);
var mountChildFibers = ChildReconciler(false);

function cloneChildFibers(current$$1, workInProgress) {
  !(current$$1 === null || workInProgress.child === current$$1.child) ? invariant(false, 'Resuming work not yet implemented.') : void 0;

  if (workInProgress.child === null) {
    return;
  }

  var currentChild = workInProgress.child;
  var newChild = createWorkInProgress(currentChild, currentChild.pendingProps, currentChild.expirationTime);
  workInProgress.child = newChild;

  newChild.return = workInProgress;
  while (currentChild.sibling !== null) {
    currentChild = currentChild.sibling;
    newChild = newChild.sibling = createWorkInProgress(currentChild, currentChild.pendingProps, currentChild.expirationTime);
    newChild.return = workInProgress;
  }
  newChild.sibling = null;
}

var NO_CONTEXT = {};

var contextStackCursor$1 = createCursor(NO_CONTEXT);
var contextFiberStackCursor = createCursor(NO_CONTEXT);
var rootInstanceStackCursor = createCursor(NO_CONTEXT);

function requiredContext(c) {
  !(c !== NO_CONTEXT) ? invariant(false, 'Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.') : void 0;
  return c;
}

function getRootHostContainer() {
  var rootInstance = requiredContext(rootInstanceStackCursor.current);
  return rootInstance;
}

function pushHostContainer(fiber, nextRootInstance) {
  // Push current root instance onto the stack;
  // This allows us to reset root when portals are popped.
  push(rootInstanceStackCursor, nextRootInstance, fiber);
  // Track the context and the Fiber that provided it.
  // This enables us to pop only Fibers that provide unique contexts.
  push(contextFiberStackCursor, fiber, fiber);

  // Finally, we need to push the host context to the stack.
  // However, we can't just call getRootHostContext() and push it because
  // we'd have a different number of entries on the stack depending on
  // whether getRootHostContext() throws somewhere in renderer code or not.
  // So we push an empty value first. This lets us safely unwind on errors.
  push(contextStackCursor$1, NO_CONTEXT, fiber);
  var nextRootContext = getRootHostContext(nextRootInstance);
  // Now that we know this function doesn't throw, replace it.
  pop(contextStackCursor$1, fiber);
  push(contextStackCursor$1, nextRootContext, fiber);
}

function popHostContainer(fiber) {
  pop(contextStackCursor$1, fiber);
  pop(contextFiberStackCursor, fiber);
  pop(rootInstanceStackCursor, fiber);
}

function getHostContext() {
  var context = requiredContext(contextStackCursor$1.current);
  return context;
}

function pushHostContext(fiber) {
  var rootInstance = requiredContext(rootInstanceStackCursor.current);
  var context = requiredContext(contextStackCursor$1.current);
  var nextContext = getChildHostContext(context, fiber.type, rootInstance);

  // Don't push this Fiber's context unless it's unique.
  if (context === nextContext) {
    return;
  }

  // Track the context and the Fiber that provided it.
  // This enables us to pop only Fibers that provide unique contexts.
  push(contextFiberStackCursor, fiber, fiber);
  push(contextStackCursor$1, nextContext, fiber);
}

function popHostContext(fiber) {
  // Do not pop unless this Fiber provided the current context.
  // pushHostContext() only pushes Fibers that provide unique contexts.
  if (contextFiberStackCursor.current !== fiber) {
    return;
  }

  pop(contextStackCursor$1, fiber);
  pop(contextFiberStackCursor, fiber);
}

var NoEffect$1 = /*             */0;
var UnmountSnapshot = /*      */2;
var UnmountMutation = /*      */4;
var MountMutation = /*        */8;
var UnmountLayout = /*        */16;
var MountLayout = /*          */32;
var MountPassive = /*         */64;
var UnmountPassive = /*       */128;

var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher;


var didWarnAboutMismatchedHooksForComponent = void 0;
{
  didWarnAboutMismatchedHooksForComponent = new Set();
}

// These are set right before calling the component.
var renderExpirationTime = NoWork;
// The work-in-progress fiber. I've named it differently to distinguish it from
// the work-in-progress hook.
var currentlyRenderingFiber$1 = null;

// Hooks are stored as a linked list on the fiber's memoizedState field. The
// current hook list is the list that belongs to the current fiber. The
// work-in-progress hook list is a new list that will be added to the
// work-in-progress fiber.
var currentHook = null;
var nextCurrentHook = null;
var firstWorkInProgressHook = null;
var workInProgressHook = null;
var nextWorkInProgressHook = null;

var remainingExpirationTime = NoWork;
var componentUpdateQueue = null;
var sideEffectTag = 0;

// Updates scheduled during render will trigger an immediate re-render at the
// end of the current pass. We can't store these updates on the normal queue,
// because if the work is aborted, they should be discarded. Because this is
// a relatively rare case, we also don't want to add an additional field to
// either the hook or queue object types. So we store them in a lazily create
// map of queue -> render-phase updates, which are discarded once the component
// completes without re-rendering.

// Whether an update was scheduled during the currently executing render pass.
var didScheduleRenderPhaseUpdate = false;
// Lazily created map of render-phase updates
var renderPhaseUpdates = null;
// Counter to prevent infinite loops.
var numberOfReRenders = 0;
var RE_RENDER_LIMIT = 25;

// In DEV, this is the name of the currently executing primitive hook
var currentHookNameInDev = null;

// In DEV, this list ensures that hooks are called in the same order between renders.
// The list stores the order of hooks used during the initial render (mount).
// Subsequent renders (updates) reference this list.
var hookTypesDev = null;
var hookTypesUpdateIndexDev = -1;

function mountHookTypesDev() {
  {
    var hookName = currentHookNameInDev;

    if (hookTypesDev === null) {
      hookTypesDev = [hookName];
    } else {
      hookTypesDev.push(hookName);
    }
  }
}

function updateHookTypesDev() {
  {
    var hookName = currentHookNameInDev;

    if (hookTypesDev !== null) {
      hookTypesUpdateIndexDev++;
      if (hookTypesDev[hookTypesUpdateIndexDev] !== hookName) {
        warnOnHookMismatchInDev(hookName);
      }
    }
  }
}

function warnOnHookMismatchInDev(currentHookName) {
  {
    var componentName = getComponentName(currentlyRenderingFiber$1.type);
    if (!didWarnAboutMismatchedHooksForComponent.has(componentName)) {
      didWarnAboutMismatchedHooksForComponent.add(componentName);

      if (hookTypesDev !== null) {
        var table = '';

        var secondColumnStart = 30;

        for (var i = 0; i <= hookTypesUpdateIndexDev; i++) {
          var oldHookName = hookTypesDev[i];
          var newHookName = i === hookTypesUpdateIndexDev ? currentHookName : oldHookName;

          var row = i + 1 + '. ' + oldHookName;

          // Extra space so second column lines up
          // lol @ IE not supporting String#repeat
          while (row.length < secondColumnStart) {
            row += ' ';
          }

          row += newHookName + '\n';

          table += row;
        }

        warning$1(false, 'React has detected a change in the order of Hooks called by %s. ' + 'This will lead to bugs and errors if not fixed. ' + 'For more information, read the Rules of Hooks: https://fb.me/rules-of-hooks\n\n' + '   Previous render            Next render\n' + '   ------------------------------------------------------\n' + '%s' + '   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n', componentName, table);
      }
    }
  }
}

function throwInvalidHookError() {
  invariant(false, 'Hooks can only be called inside the body of a function component. (https://fb.me/react-invalid-hook-call)');
}

function areHookInputsEqual(nextDeps, prevDeps) {
  if (prevDeps === null) {
    {
      warning$1(false, '%s received a final argument during this render, but not during ' + 'the previous render. Even though the final argument is optional, ' + 'its type cannot change between renders.', currentHookNameInDev);
    }
    return false;
  }

  {
    // Don't bother comparing lengths in prod because these arrays should be
    // passed inline.
    if (nextDeps.length !== prevDeps.length) {
      warning$1(false, 'The final argument passed to %s changed size between renders. The ' + 'order and size of this array must remain constant.\n\n' + 'Previous: %s\n' + 'Incoming: %s', currentHookNameInDev, '[' + nextDeps.join(', ') + ']', '[' + prevDeps.join(', ') + ']');
    }
  }
  for (var i = 0; i < prevDeps.length && i < nextDeps.length; i++) {
    if (is(nextDeps[i], prevDeps[i])) {
      continue;
    }
    return false;
  }
  return true;
}

function renderWithHooks(current, workInProgress, Component, props, refOrContext, nextRenderExpirationTime) {
  renderExpirationTime = nextRenderExpirationTime;
  currentlyRenderingFiber$1 = workInProgress;
  nextCurrentHook = current !== null ? current.memoizedState : null;

  {
    hookTypesDev = current !== null ? current._debugHookTypes : null;
    hookTypesUpdateIndexDev = -1;
  }

  // The following should have already been reset
  // currentHook = null;
  // workInProgressHook = null;

  // remainingExpirationTime = NoWork;
  // componentUpdateQueue = null;

  // didScheduleRenderPhaseUpdate = false;
  // renderPhaseUpdates = null;
  // numberOfReRenders = 0;
  // sideEffectTag = 0;

  // TODO Warn if no hooks are used at all during mount, then some are used during update.
  // Currently we will identify the update render as a mount because nextCurrentHook === null.
  // This is tricky because it's valid for certain types of components (e.g. React.lazy)

  // Using nextCurrentHook to differentiate between mount/update only works if at least one stateful hook is used.
  // Non-stateful hooks (e.g. context) don't get added to memoizedState,
  // so nextCurrentHook would be null during updates and mounts.
  {
    if (nextCurrentHook !== null) {
      ReactCurrentDispatcher$1.current = HooksDispatcherOnUpdateInDEV;
    } else if (hookTypesDev !== null) {
      // This dispatcher handles an edge case where a component is updating,
      // but no stateful hooks have been used.
      // We want to match the production code behavior (which will use HooksDispatcherOnMount),
      // but with the extra DEV validation to ensure hooks ordering hasn't changed.
      // This dispatcher does that.
      ReactCurrentDispatcher$1.current = HooksDispatcherOnMountWithHookTypesInDEV;
    } else {
      ReactCurrentDispatcher$1.current = HooksDispatcherOnMountInDEV;
    }
  }

  var children = Component(props, refOrContext);

  if (didScheduleRenderPhaseUpdate) {
    do {
      didScheduleRenderPhaseUpdate = false;
      numberOfReRenders += 1;

      // Start over from the beginning of the list
      nextCurrentHook = current !== null ? current.memoizedState : null;
      nextWorkInProgressHook = firstWorkInProgressHook;

      currentHook = null;
      workInProgressHook = null;
      componentUpdateQueue = null;

      {
        // Also validate hook order for cascading updates.
        hookTypesUpdateIndexDev = -1;
      }

      ReactCurrentDispatcher$1.current = HooksDispatcherOnUpdateInDEV;

      children = Component(props, refOrContext);
    } while (didScheduleRenderPhaseUpdate);

    renderPhaseUpdates = null;
    numberOfReRenders = 0;
  }

  // We can assume the previous dispatcher is always this one, since we set it
  // at the beginning of the render phase and there's no re-entrancy.
  ReactCurrentDispatcher$1.current = ContextOnlyDispatcher;

  var renderedWork = currentlyRenderingFiber$1;

  renderedWork.memoizedState = firstWorkInProgressHook;
  renderedWork.expirationTime = remainingExpirationTime;
  renderedWork.updateQueue = componentUpdateQueue;
  renderedWork.effectTag |= sideEffectTag;

  {
    renderedWork._debugHookTypes = hookTypesDev;
  }

  // This check uses currentHook so that it works the same in DEV and prod bundles.
  // hookTypesDev could catch more cases (e.g. context) but only in DEV bundles.
  var didRenderTooFewHooks = currentHook !== null && currentHook.next !== null;

  renderExpirationTime = NoWork;
  currentlyRenderingFiber$1 = null;

  currentHook = null;
  nextCurrentHook = null;
  firstWorkInProgressHook = null;
  workInProgressHook = null;
  nextWorkInProgressHook = null;

  {
    currentHookNameInDev = null;
    hookTypesDev = null;
    hookTypesUpdateIndexDev = -1;
  }

  remainingExpirationTime = NoWork;
  componentUpdateQueue = null;
  sideEffectTag = 0;

  // These were reset above
  // didScheduleRenderPhaseUpdate = false;
  // renderPhaseUpdates = null;
  // numberOfReRenders = 0;

  !!didRenderTooFewHooks ? invariant(false, 'Rendered fewer hooks than expected. This may be caused by an accidental early return statement.') : void 0;

  return children;
}

function bailoutHooks(current, workInProgress, expirationTime) {
  workInProgress.updateQueue = current.updateQueue;
  workInProgress.effectTag &= ~(Passive | Update);
  if (current.expirationTime <= expirationTime) {
    current.expirationTime = NoWork;
  }
}

function resetHooks() {
  // We can assume the previous dispatcher is always this one, since we set it
  // at the beginning of the render phase and there's no re-entrancy.
  ReactCurrentDispatcher$1.current = ContextOnlyDispatcher;

  // This is used to reset the state of this module when a component throws.
  // It's also called inside mountIndeterminateComponent if we determine the
  // component is a module-style component.
  renderExpirationTime = NoWork;
  currentlyRenderingFiber$1 = null;

  currentHook = null;
  nextCurrentHook = null;
  firstWorkInProgressHook = null;
  workInProgressHook = null;
  nextWorkInProgressHook = null;

  {
    hookTypesDev = null;
    hookTypesUpdateIndexDev = -1;

    currentHookNameInDev = null;
  }

  remainingExpirationTime = NoWork;
  componentUpdateQueue = null;
  sideEffectTag = 0;

  didScheduleRenderPhaseUpdate = false;
  renderPhaseUpdates = null;
  numberOfReRenders = 0;
}

function mountWorkInProgressHook() {
  var hook = {
    memoizedState: null,

    baseState: null,
    queue: null,
    baseUpdate: null,

    next: null
  };

  if (workInProgressHook === null) {
    // This is the first hook in the list
    firstWorkInProgressHook = workInProgressHook = hook;
  } else {
    // Append to the end of the list
    workInProgressHook = workInProgressHook.next = hook;
  }
  return workInProgressHook;
}

function updateWorkInProgressHook() {
  // This function is used both for updates and for re-renders triggered by a
  // render phase update. It assumes there is either a current hook we can
  // clone, or a work-in-progress hook from a previous render pass that we can
  // use as a base. When we reach the end of the base list, we must switch to
  // the dispatcher used for mounts.
  if (nextWorkInProgressHook !== null) {
    // There's already a work-in-progress. Reuse it.
    workInProgressHook = nextWorkInProgressHook;
    nextWorkInProgressHook = workInProgressHook.next;

    currentHook = nextCurrentHook;
    nextCurrentHook = currentHook !== null ? currentHook.next : null;
  } else {
    // Clone from the current hook.
    !(nextCurrentHook !== null) ? invariant(false, 'Rendered more hooks than during the previous render.') : void 0;
    currentHook = nextCurrentHook;

    var newHook = {
      memoizedState: currentHook.memoizedState,

      baseState: currentHook.baseState,
      queue: currentHook.queue,
      baseUpdate: currentHook.baseUpdate,

      next: null
    };

    if (workInProgressHook === null) {
      // This is the first hook in the list.
      workInProgressHook = firstWorkInProgressHook = newHook;
    } else {
      // Append to the end of the list.
      workInProgressHook = workInProgressHook.next = newHook;
    }
    nextCurrentHook = currentHook.next;
  }
  return workInProgressHook;
}

function createFunctionComponentUpdateQueue() {
  return {
    lastEffect: null
  };
}

function basicStateReducer(state, action) {
  return typeof action === 'function' ? action(state) : action;
}

function mountReducer(reducer, initialArg, init) {
  var hook = mountWorkInProgressHook();
  var initialState = void 0;
  if (init !== undefined) {
    initialState = init(initialArg);
  } else {
    initialState = initialArg;
  }
  hook.memoizedState = hook.baseState = initialState;
  var queue = hook.queue = {
    last: null,
    dispatch: null,
    eagerReducer: reducer,
    eagerState: initialState
  };
  var dispatch = queue.dispatch = dispatchAction.bind(null,
  // Flow doesn't know this is non-null, but we do.
  currentlyRenderingFiber$1, queue);
  return [hook.memoizedState, dispatch];
}

function updateReducer(reducer, initialArg, init) {
  var hook = updateWorkInProgressHook();
  var queue = hook.queue;
  !(queue !== null) ? invariant(false, 'Should have a queue. This is likely a bug in React. Please file an issue.') : void 0;

  if (numberOfReRenders > 0) {
    // This is a re-render. Apply the new render phase updates to the previous
    var _dispatch = queue.dispatch;
    if (renderPhaseUpdates !== null) {
      // Render phase updates are stored in a map of queue -> linked list
      var firstRenderPhaseUpdate = renderPhaseUpdates.get(queue);
      if (firstRenderPhaseUpdate !== undefined) {
        renderPhaseUpdates.delete(queue);
        var newState = hook.memoizedState;
        var update = firstRenderPhaseUpdate;
        do {
          // Process this render phase update. We don't have to check the
          // priority because it will always be the same as the current
          // render's.
          var _action = update.action;
          newState = reducer(newState, _action);
          update = update.next;
        } while (update !== null);

        // Mark that the fiber performed work, but only if the new state is
        // different from the current state.
        if (!is(newState, hook.memoizedState)) {
          markWorkInProgressReceivedUpdate();
        }

        hook.memoizedState = newState;
        // Don't persist the state accumlated from the render phase updates to
        // the base state unless the queue is empty.
        // TODO: Not sure if this is the desired semantics, but it's what we
        // do for gDSFP. I can't remember why.
        if (hook.baseUpdate === queue.last) {
          hook.baseState = newState;
        }

        queue.eagerReducer = reducer;
        queue.eagerState = newState;

        return [newState, _dispatch];
      }
    }
    return [hook.memoizedState, _dispatch];
  }

  // The last update in the entire queue
  var last = queue.last;
  // The last update that is part of the base state.
  var baseUpdate = hook.baseUpdate;
  var baseState = hook.baseState;

  // Find the first unprocessed update.
  var first = void 0;
  if (baseUpdate !== null) {
    if (last !== null) {
      // For the first update, the queue is a circular linked list where
      // `queue.last.next = queue.first`. Once the first update commits, and
      // the `baseUpdate` is no longer empty, we can unravel the list.
      last.next = null;
    }
    first = baseUpdate.next;
  } else {
    first = last !== null ? last.next : null;
  }
  if (first !== null) {
    var _newState = baseState;
    var newBaseState = null;
    var newBaseUpdate = null;
    var prevUpdate = baseUpdate;
    var _update = first;
    var didSkip = false;
    do {
      var updateExpirationTime = _update.expirationTime;
      if (updateExpirationTime < renderExpirationTime) {
        // Priority is insufficient. Skip this update. If this is the first
        // skipped update, the previous update/state is the new base
        // update/state.
        if (!didSkip) {
          didSkip = true;
          newBaseUpdate = prevUpdate;
          newBaseState = _newState;
        }
        // Update the remaining priority in the queue.
        if (updateExpirationTime > remainingExpirationTime) {
          remainingExpirationTime = updateExpirationTime;
        }
      } else {
        // Process this update.
        if (_update.eagerReducer === reducer) {
          // If this update was processed eagerly, and its reducer matches the
          // current reducer, we can use the eagerly computed state.
          _newState = _update.eagerState;
        } else {
          var _action2 = _update.action;
          _newState = reducer(_newState, _action2);
        }
      }
      prevUpdate = _update;
      _update = _update.next;
    } while (_update !== null && _update !== first);

    if (!didSkip) {
      newBaseUpdate = prevUpdate;
      newBaseState = _newState;
    }

    // Mark that the fiber performed work, but only if the new state is
    // different from the current state.
    if (!is(_newState, hook.memoizedState)) {
      markWorkInProgressReceivedUpdate();
    }

    hook.memoizedState = _newState;
    hook.baseUpdate = newBaseUpdate;
    hook.baseState = newBaseState;

    queue.eagerReducer = reducer;
    queue.eagerState = _newState;
  }

  var dispatch = queue.dispatch;
  return [hook.memoizedState, dispatch];
}

function mountState(initialState) {
  var hook = mountWorkInProgressHook();
  if (typeof initialState === 'function') {
    initialState = initialState();
  }
  hook.memoizedState = hook.baseState = initialState;
  var queue = hook.queue = {
    last: null,
    dispatch: null,
    eagerReducer: basicStateReducer,
    eagerState: initialState
  };
  var dispatch = queue.dispatch = dispatchAction.bind(null,
  // Flow doesn't know this is non-null, but we do.
  currentlyRenderingFiber$1, queue);
  return [hook.memoizedState, dispatch];
}

function updateState(initialState) {
  return updateReducer(basicStateReducer, initialState);
}

function pushEffect(tag, create, destroy, deps) {
  var effect = {
    tag: tag,
    create: create,
    destroy: destroy,
    deps: deps,
    // Circular
    next: null
  };
  if (componentUpdateQueue === null) {
    componentUpdateQueue = createFunctionComponentUpdateQueue();
    componentUpdateQueue.lastEffect = effect.next = effect;
  } else {
    var _lastEffect = componentUpdateQueue.lastEffect;
    if (_lastEffect === null) {
      componentUpdateQueue.lastEffect = effect.next = effect;
    } else {
      var firstEffect = _lastEffect.next;
      _lastEffect.next = effect;
      effect.next = firstEffect;
      componentUpdateQueue.lastEffect = effect;
    }
  }
  return effect;
}

function mountRef(initialValue) {
  var hook = mountWorkInProgressHook();
  var ref = { current: initialValue };
  {
    Object.seal(ref);
  }
  hook.memoizedState = ref;
  return ref;
}

function updateRef(initialValue) {
  var hook = updateWorkInProgressHook();
  return hook.memoizedState;
}

function mountEffectImpl(fiberEffectTag, hookEffectTag, create, deps) {
  var hook = mountWorkInProgressHook();
  var nextDeps = deps === undefined ? null : deps;
  sideEffectTag |= fiberEffectTag;
  hook.memoizedState = pushEffect(hookEffectTag, create, undefined, nextDeps);
}

function updateEffectImpl(fiberEffectTag, hookEffectTag, create, deps) {
  var hook = updateWorkInProgressHook();
  var nextDeps = deps === undefined ? null : deps;
  var destroy = undefined;

  if (currentHook !== null) {
    var prevEffect = currentHook.memoizedState;
    destroy = prevEffect.destroy;
    if (nextDeps !== null) {
      var prevDeps = prevEffect.deps;
      if (areHookInputsEqual(nextDeps, prevDeps)) {
        pushEffect(NoEffect$1, create, destroy, nextDeps);
        return;
      }
    }
  }

  sideEffectTag |= fiberEffectTag;
  hook.memoizedState = pushEffect(hookEffectTag, create, destroy, nextDeps);
}

function mountEffect(create, deps) {
  return mountEffectImpl(Update | Passive, UnmountPassive | MountPassive, create, deps);
}

function updateEffect(create, deps) {
  return updateEffectImpl(Update | Passive, UnmountPassive | MountPassive, create, deps);
}

function mountLayoutEffect(create, deps) {
  return mountEffectImpl(Update, UnmountMutation | MountLayout, create, deps);
}

function updateLayoutEffect(create, deps) {
  return updateEffectImpl(Update, UnmountMutation | MountLayout, create, deps);
}

function imperativeHandleEffect(create, ref) {
  if (typeof ref === 'function') {
    var refCallback = ref;
    var _inst = create();
    refCallback(_inst);
    return function () {
      refCallback(null);
    };
  } else if (ref !== null && ref !== undefined) {
    var refObject = ref;
    {
      !refObject.hasOwnProperty('current') ? warning$1(false, 'Expected useImperativeHandle() first argument to either be a ' + 'ref callback or React.createRef() object. Instead received: %s.', 'an object with keys {' + Object.keys(refObject).join(', ') + '}') : void 0;
    }
    var _inst2 = create();
    refObject.current = _inst2;
    return function () {
      refObject.current = null;
    };
  }
}

function mountImperativeHandle(ref, create, deps) {
  {
    !(typeof create === 'function') ? warning$1(false, 'Expected useImperativeHandle() second argument to be a function ' + 'that creates a handle. Instead received: %s.', create !== null ? typeof create : 'null') : void 0;
  }

  // TODO: If deps are provided, should we skip comparing the ref itself?
  var effectDeps = deps !== null && deps !== undefined ? deps.concat([ref]) : null;

  return mountEffectImpl(Update, UnmountMutation | MountLayout, imperativeHandleEffect.bind(null, create, ref), effectDeps);
}

function updateImperativeHandle(ref, create, deps) {
  {
    !(typeof create === 'function') ? warning$1(false, 'Expected useImperativeHandle() second argument to be a function ' + 'that creates a handle. Instead received: %s.', create !== null ? typeof create : 'null') : void 0;
  }

  // TODO: If deps are provided, should we skip comparing the ref itself?
  var effectDeps = deps !== null && deps !== undefined ? deps.concat([ref]) : null;

  return updateEffectImpl(Update, UnmountMutation | MountLayout, imperativeHandleEffect.bind(null, create, ref), effectDeps);
}

function mountDebugValue(value, formatterFn) {
  // This hook is normally a no-op.
  // The react-debug-hooks package injects its own implementation
  // so that e.g. DevTools can display custom hook values.
}

var updateDebugValue = mountDebugValue;

function mountCallback(callback, deps) {
  var hook = mountWorkInProgressHook();
  var nextDeps = deps === undefined ? null : deps;
  hook.memoizedState = [callback, nextDeps];
  return callback;
}

function updateCallback(callback, deps) {
  var hook = updateWorkInProgressHook();
  var nextDeps = deps === undefined ? null : deps;
  var prevState = hook.memoizedState;
  if (prevState !== null) {
    if (nextDeps !== null) {
      var prevDeps = prevState[1];
      if (areHookInputsEqual(nextDeps, prevDeps)) {
        return prevState[0];
      }
    }
  }
  hook.memoizedState = [callback, nextDeps];
  return callback;
}

function mountMemo(nextCreate, deps) {
  var hook = mountWorkInProgressHook();
  var nextDeps = deps === undefined ? null : deps;
  var nextValue = nextCreate();
  hook.memoizedState = [nextValue, nextDeps];
  return nextValue;
}

function updateMemo(nextCreate, deps) {
  var hook = updateWorkInProgressHook();
  var nextDeps = deps === undefined ? null : deps;
  var prevState = hook.memoizedState;
  if (prevState !== null) {
    // Assume these are defined. If they're not, areHookInputsEqual will warn.
    if (nextDeps !== null) {
      var prevDeps = prevState[1];
      if (areHookInputsEqual(nextDeps, prevDeps)) {
        return prevState[0];
      }
    }
  }
  var nextValue = nextCreate();
  hook.memoizedState = [nextValue, nextDeps];
  return nextValue;
}

// in a test-like environment, we want to warn if dispatchAction()
// is called outside of a batchedUpdates/TestUtils.act(...) call.
var shouldWarnForUnbatchedSetState = false;

{
  // jest isn't a 'global', it's just exposed to tests via a wrapped function
  // further, this isn't a test file, so flow doesn't recognize the symbol. So...
  // $FlowExpectedError - because requirements don't give a damn about your type sigs.
  if ('undefined' !== typeof jest) {
    shouldWarnForUnbatchedSetState = true;
  }
}

function dispatchAction(fiber, queue, action) {
  !(numberOfReRenders < RE_RENDER_LIMIT) ? invariant(false, 'Too many re-renders. React limits the number of renders to prevent an infinite loop.') : void 0;

  {
    !(arguments.length <= 3) ? warning$1(false, "State updates from the useState() and useReducer() Hooks don't support the " + 'second callback argument. To execute a side effect after ' + 'rendering, declare it in the component body with useEffect().') : void 0;
  }

  var alternate = fiber.alternate;
  if (fiber === currentlyRenderingFiber$1 || alternate !== null && alternate === currentlyRenderingFiber$1) {
    // This is a render phase update. Stash it in a lazily-created map of
    // queue -> linked list of updates. After this render pass, we'll restart
    // and apply the stashed updates on top of the work-in-progress hook.
    didScheduleRenderPhaseUpdate = true;
    var update = {
      expirationTime: renderExpirationTime,
      action: action,
      eagerReducer: null,
      eagerState: null,
      next: null
    };
    if (renderPhaseUpdates === null) {
      renderPhaseUpdates = new Map();
    }
    var firstRenderPhaseUpdate = renderPhaseUpdates.get(queue);
    if (firstRenderPhaseUpdate === undefined) {
      renderPhaseUpdates.set(queue, update);
    } else {
      // Append the update to the end of the list.
      var lastRenderPhaseUpdate = firstRenderPhaseUpdate;
      while (lastRenderPhaseUpdate.next !== null) {
        lastRenderPhaseUpdate = lastRenderPhaseUpdate.next;
      }
      lastRenderPhaseUpdate.next = update;
    }
  } else {
    flushPassiveEffects();

    var currentTime = requestCurrentTime();
    var _expirationTime = computeExpirationForFiber(currentTime, fiber);

    var _update2 = {
      expirationTime: _expirationTime,
      action: action,
      eagerReducer: null,
      eagerState: null,
      next: null
    };

    // Append the update to the end of the list.
    var _last = queue.last;
    if (_last === null) {
      // This is the first update. Create a circular list.
      _update2.next = _update2;
    } else {
      var first = _last.next;
      if (first !== null) {
        // Still circular.
        _update2.next = first;
      }
      _last.next = _update2;
    }
    queue.last = _update2;

    if (fiber.expirationTime === NoWork && (alternate === null || alternate.expirationTime === NoWork)) {
      // The queue is currently empty, which means we can eagerly compute the
      // next state before entering the render phase. If the new state is the
      // same as the current state, we may be able to bail out entirely.
      var _eagerReducer = queue.eagerReducer;
      if (_eagerReducer !== null) {
        var prevDispatcher = void 0;
        {
          prevDispatcher = ReactCurrentDispatcher$1.current;
          ReactCurrentDispatcher$1.current = InvalidNestedHooksDispatcherOnUpdateInDEV;
        }
        try {
          var currentState = queue.eagerState;
          var _eagerState = _eagerReducer(currentState, action);
          // Stash the eagerly computed state, and the reducer used to compute
          // it, on the update object. If the reducer hasn't changed by the
          // time we enter the render phase, then the eager state can be used
          // without calling the reducer again.
          _update2.eagerReducer = _eagerReducer;
          _update2.eagerState = _eagerState;
          if (is(_eagerState, currentState)) {
            // Fast path. We can bail out without scheduling React to re-render.
            // It's still possible that we'll need to rebase this update later,
            // if the component re-renders for a different reason and by that
            // time the reducer has changed.
            return;
          }
        } catch (error) {
          // Suppress the error. It will throw again in the render phase.
        } finally {
          {
            ReactCurrentDispatcher$1.current = prevDispatcher;
          }
        }
      }
    }
    {
      if (shouldWarnForUnbatchedSetState === true) {
        warnIfNotCurrentlyBatchingInDev(fiber);
      }
    }
    scheduleWork(fiber, _expirationTime);
  }
}

var ContextOnlyDispatcher = {
  readContext: readContext,

  useCallback: throwInvalidHookError,
  useContext: throwInvalidHookError,
  useEffect: throwInvalidHookError,
  useImperativeHandle: throwInvalidHookError,
  useLayoutEffect: throwInvalidHookError,
  useMemo: throwInvalidHookError,
  useReducer: throwInvalidHookError,
  useRef: throwInvalidHookError,
  useState: throwInvalidHookError,
  useDebugValue: throwInvalidHookError
};

var HooksDispatcherOnMountInDEV = null;
var HooksDispatcherOnMountWithHookTypesInDEV = null;
var HooksDispatcherOnUpdateInDEV = null;
var InvalidNestedHooksDispatcherOnMountInDEV = null;
var InvalidNestedHooksDispatcherOnUpdateInDEV = null;

{
  var warnInvalidContextAccess = function () {
    warning$1(false, 'Context can only be read while React is rendering. ' + 'In classes, you can read it in the render method or getDerivedStateFromProps. ' + 'In function components, you can read it directly in the function body, but not ' + 'inside Hooks like useReducer() or useMemo().');
  };

  var warnInvalidHookAccess = function () {
    warning$1(false, 'Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. ' + 'You can only call Hooks at the top level of your React function. ' + 'For more information, see ' + 'https://fb.me/rules-of-hooks');
  };

  HooksDispatcherOnMountInDEV = {
    readContext: function (context, observedBits) {
      return readContext(context, observedBits);
    },
    useCallback: function (callback, deps) {
      currentHookNameInDev = 'useCallback';
      mountHookTypesDev();
      return mountCallback(callback, deps);
    },
    useContext: function (context, observedBits) {
      currentHookNameInDev = 'useContext';
      mountHookTypesDev();
      return readContext(context, observedBits);
    },
    useEffect: function (create, deps) {
      currentHookNameInDev = 'useEffect';
      mountHookTypesDev();
      return mountEffect(create, deps);
    },
    useImperativeHandle: function (ref, create, deps) {
      currentHookNameInDev = 'useImperativeHandle';
      mountHookTypesDev();
      return mountImperativeHandle(ref, create, deps);
    },
    useLayoutEffect: function (create, deps) {
      currentHookNameInDev = 'useLayoutEffect';
      mountHookTypesDev();
      return mountLayoutEffect(create, deps);
    },
    useMemo: function (create, deps) {
      currentHookNameInDev = 'useMemo';
      mountHookTypesDev();
      var prevDispatcher = ReactCurrentDispatcher$1.current;
      ReactCurrentDispatcher$1.current = InvalidNestedHooksDispatcherOnMountInDEV;
      try {
        return mountMemo(create, deps);
      } finally {
        ReactCurrentDispatcher$1.current = prevDispatcher;
      }
    },
    useReducer: function (reducer, initialArg, init) {
      currentHookNameInDev = 'useReducer';
      mountHookTypesDev();
      var prevDispatcher = ReactCurrentDispatcher$1.current;
      ReactCurrentDispatcher$1.current = InvalidNestedHooksDispatcherOnMountInDEV;
      try {
        return mountReducer(reducer, initialArg, init);
      } finally {
        ReactCurrentDispatcher$1.current = prevDispatcher;
      }
    },
    useRef: function (initialValue) {
      currentHookNameInDev = 'useRef';
      mountHookTypesDev();
      return mountRef(initialValue);
    },
    useState: function (initialState) {
      currentHookNameInDev = 'useState';
      mountHookTypesDev();
      var prevDispatcher = ReactCurrentDispatcher$1.current;
      ReactCurrentDispatcher$1.current = InvalidNestedHooksDispatcherOnMountInDEV;
      try {
        return mountState(initialState);
      } finally {
        ReactCurrentDispatcher$1.current = prevDispatcher;
      }
    },
    useDebugValue: function (value, formatterFn) {
      currentHookNameInDev = 'useDebugValue';
      mountHookTypesDev();
      return mountDebugValue(value, formatterFn);
    }
  };

  HooksDispatcherOnMountWithHookTypesInDEV = {
    readContext: function (context, observedBits) {
      return readContext(context, observedBits);
    },
    useCallback: function (callback, deps) {
      currentHookNameInDev = 'useCallback';
      updateHookTypesDev();
      return mountCallback(callback, deps);
    },
    useContext: function (context, observedBits) {
      currentHookNameInDev = 'useContext';
      updateHookTypesDev();
      return readContext(context, observedBits);
    },
    useEffect: function (create, deps) {
      currentHookNameInDev = 'useEffect';
      updateHookTypesDev();
      return mountEffect(create, deps);
    },
    useImperativeHandle: function (ref, create, deps) {
      currentHookNameInDev = 'useImperativeHandle';
      updateHookTypesDev();
      return mountImperativeHandle(ref, create, deps);
    },
    useLayoutEffect: function (create, deps) {
      currentHookNameInDev = 'useLayoutEffect';
      updateHookTypesDev();
      return mountLayoutEffect(create, deps);
    },
    useMemo: function (create, deps) {
      currentHookNameInDev = 'useMemo';
      updateHookTypesDev();
      var prevDispatcher = ReactCurrentDispatcher$1.current;
      ReactCurrentDispatcher$1.current = InvalidNestedHooksDispatcherOnMountInDEV;
      try {
        return mountMemo(create, deps);
      } finally {
        ReactCurrentDispatcher$1.current = prevDispatcher;
      }
    },
    useReducer: function (reducer, initialArg, init) {
      currentHookNameInDev = 'useReducer';
      updateHookTypesDev();
      var prevDispatcher = ReactCurrentDispatcher$1.current;
      ReactCurrentDispatcher$1.current = InvalidNestedHooksDispatcherOnMountInDEV;
      try {
        return mountReducer(reducer, initialArg, init);
      } finally {
        ReactCurrentDispatcher$1.current = prevDispatcher;
      }
    },
    useRef: function (initialValue) {
      currentHookNameInDev = 'useRef';
      updateHookTypesDev();
      return mountRef(initialValue);
    },
    useState: function (initialState) {
      currentHookNameInDev = 'useState';
      updateHookTypesDev();
      var prevDispatcher = ReactCurrentDispatcher$1.current;
      ReactCurrentDispatcher$1.current = InvalidNestedHooksDispatcherOnMountInDEV;
      try {
        return mountState(initialState);
      } finally {
        ReactCurrentDispatcher$1.current = prevDispatcher;
      }
    },
    useDebugValue: function (value, formatterFn) {
      currentHookNameInDev = 'useDebugValue';
      updateHookTypesDev();
      return mountDebugValue(value, formatterFn);
    }
  };

  HooksDispatcherOnUpdateInDEV = {
    readContext: function (context, observedBits) {
      return readContext(context, observedBits);
    },
    useCallback: function (callback, deps) {
      currentHookNameInDev = 'useCallback';
      updateHookTypesDev();
      return updateCallback(callback, deps);
    },
    useContext: function (context, observedBits) {
      currentHookNameInDev = 'useContext';
      updateHookTypesDev();
      return readContext(context, observedBits);
    },
    useEffect: function (create, deps) {
      currentHookNameInDev = 'useEffect';
      updateHookTypesDev();
      return updateEffect(create, deps);
    },
    useImperativeHandle: function (ref, create, deps) {
      currentHookNameInDev = 'useImperativeHandle';
      updateHookTypesDev();
      return updateImperativeHandle(ref, create, deps);
    },
    useLayoutEffect: function (create, deps) {
      currentHookNameInDev = 'useLayoutEffect';
      updateHookTypesDev();
      return updateLayoutEffect(create, deps);
    },
    useMemo: function (create, deps) {
      currentHookNameInDev = 'useMemo';
      updateHookTypesDev();
      var prevDispatcher = ReactCurrentDispatcher$1.current;
      ReactCurrentDispatcher$1.current = InvalidNestedHooksDispatcherOnUpdateInDEV;
      try {
        return updateMemo(create, deps);
      } finally {
        ReactCurrentDispatcher$1.current = prevDispatcher;
      }
    },
    useReducer: function (reducer, initialArg, init) {
      currentHookNameInDev = 'useReducer';
      updateHookTypesDev();
      var prevDispatcher = ReactCurrentDispatcher$1.current;
      ReactCurrentDispatcher$1.current = InvalidNestedHooksDispatcherOnUpdateInDEV;
      try {
        return updateReducer(reducer, initialArg, init);
      } finally {
        ReactCurrentDispatcher$1.current = prevDispatcher;
      }
    },
    useRef: function (initialValue) {
      currentHookNameInDev = 'useRef';
      updateHookTypesDev();
      return updateRef(initialValue);
    },
    useState: function (initialState) {
      currentHookNameInDev = 'useState';
      updateHookTypesDev();
      var prevDispatcher = ReactCurrentDispatcher$1.current;
      ReactCurrentDispatcher$1.current = InvalidNestedHooksDispatcherOnUpdateInDEV;
      try {
        return updateState(initialState);
      } finally {
        ReactCurrentDispatcher$1.current = prevDispatcher;
      }
    },
    useDebugValue: function (value, formatterFn) {
      currentHookNameInDev = 'useDebugValue';
      updateHookTypesDev();
      return updateDebugValue(value, formatterFn);
    }
  };

  InvalidNestedHooksDispatcherOnMountInDEV = {
    readContext: function (context, observedBits) {
      warnInvalidContextAccess();
      return readContext(context, observedBits);
    },
    useCallback: function (callback, deps) {
      currentHookNameInDev = 'useCallback';
      warnInvalidHookAccess();
      mountHookTypesDev();
      return mountCallback(callback, deps);
    },
    useContext: function (context, observedBits) {
      currentHookNameInDev = 'useContext';
      warnInvalidHookAccess();
      mountHookTypesDev();
      return readContext(context, observedBits);
    },
    useEffect: function (create, deps) {
      currentHookNameInDev = 'useEffect';
      warnInvalidHookAccess();
      mountHookTypesDev();
      return mountEffect(create, deps);
    },
    useImperativeHandle: function (ref, create, deps) {
      currentHookNameInDev = 'useImperativeHandle';
      warnInvalidHookAccess();
      mountHookTypesDev();
      return mountImperativeHandle(ref, create, deps);
    },
    useLayoutEffect: function (create, deps) {
      currentHookNameInDev = 'useLayoutEffect';
      warnInvalidHookAccess();
      mountHookTypesDev();
      return mountLayoutEffect(create, deps);
    },
    useMemo: function (create, deps) {
      currentHookNameInDev = 'useMemo';
      warnInvalidHookAccess();
      mountHookTypesDev();
      var prevDispatcher = ReactCurrentDispatcher$1.current;
      ReactCurrentDispatcher$1.current = InvalidNestedHooksDispatcherOnMountInDEV;
      try {
        return mountMemo(create, deps);
      } finally {
        ReactCurrentDispatcher$1.current = prevDispatcher;
      }
    },
    useReducer: function (reducer, initialArg, init) {
      currentHookNameInDev = 'useReducer';
      warnInvalidHookAccess();
      mountHookTypesDev();
      var prevDispatcher = ReactCurrentDispatcher$1.current;
      ReactCurrentDispatcher$1.current = InvalidNestedHooksDispatcherOnMountInDEV;
      try {
        return mountReducer(reducer, initialArg, init);
      } finally {
        ReactCurrentDispatcher$1.current = prevDispatcher;
      }
    },
    useRef: function (initialValue) {
      currentHookNameInDev = 'useRef';
      warnInvalidHookAccess();
      mountHookTypesDev();
      return mountRef(initialValue);
    },
    useState: function (initialState) {
      currentHookNameInDev = 'useState';
      warnInvalidHookAccess();
      mountHookTypesDev();
      var prevDispatcher = ReactCurrentDispatcher$1.current;
      ReactCurrentDispatcher$1.current = InvalidNestedHooksDispatcherOnMountInDEV;
      try {
        return mountState(initialState);
      } finally {
        ReactCurrentDispatcher$1.current = prevDispatcher;
      }
    },
    useDebugValue: function (value, formatterFn) {
      currentHookNameInDev = 'useDebugValue';
      warnInvalidHookAccess();
      mountHookTypesDev();
      return mountDebugValue(value, formatterFn);
    }
  };

  InvalidNestedHooksDispatcherOnUpdateInDEV = {
    readContext: function (context, observedBits) {
      warnInvalidContextAccess();
      return readContext(context, observedBits);
    },
    useCallback: function (callback, deps) {
      currentHookNameInDev = 'useCallback';
      warnInvalidHookAccess();
      updateHookTypesDev();
      return updateCallback(callback, deps);
    },
    useContext: function (context, observedBits) {
      currentHookNameInDev = 'useContext';
      warnInvalidHookAccess();
      updateHookTypesDev();
      return readContext(context, observedBits);
    },
    useEffect: function (create, deps) {
      currentHookNameInDev = 'useEffect';
      warnInvalidHookAccess();
      updateHookTypesDev();
      return updateEffect(create, deps);
    },
    useImperativeHandle: function (ref, create, deps) {
      currentHookNameInDev = 'useImperativeHandle';
      warnInvalidHookAccess();
      updateHookTypesDev();
      return updateImperativeHandle(ref, create, deps);
    },
    useLayoutEffect: function (create, deps) {
      currentHookNameInDev = 'useLayoutEffect';
      warnInvalidHookAccess();
      updateHookTypesDev();
      return updateLayoutEffect(create, deps);
    },
    useMemo: function (create, deps) {
      currentHookNameInDev = 'useMemo';
      warnInvalidHookAccess();
      updateHookTypesDev();
      var prevDispatcher = ReactCurrentDispatcher$1.current;
      ReactCurrentDispatcher$1.current = InvalidNestedHooksDispatcherOnUpdateInDEV;
      try {
        return updateMemo(create, deps);
      } finally {
        ReactCurrentDispatcher$1.current = prevDispatcher;
      }
    },
    useReducer: function (reducer, initialArg, init) {
      currentHookNameInDev = 'useReducer';
      warnInvalidHookAccess();
      updateHookTypesDev();
      var prevDispatcher = ReactCurrentDispatcher$1.current;
      ReactCurrentDispatcher$1.current = InvalidNestedHooksDispatcherOnUpdateInDEV;
      try {
        return updateReducer(reducer, initialArg, init);
      } finally {
        ReactCurrentDispatcher$1.current = prevDispatcher;
      }
    },
    useRef: function (initialValue) {
      currentHookNameInDev = 'useRef';
      warnInvalidHookAccess();
      updateHookTypesDev();
      return updateRef(initialValue);
    },
    useState: function (initialState) {
      currentHookNameInDev = 'useState';
      warnInvalidHookAccess();
      updateHookTypesDev();
      var prevDispatcher = ReactCurrentDispatcher$1.current;
      ReactCurrentDispatcher$1.current = InvalidNestedHooksDispatcherOnUpdateInDEV;
      try {
        return updateState(initialState);
      } finally {
        ReactCurrentDispatcher$1.current = prevDispatcher;
      }
    },
    useDebugValue: function (value, formatterFn) {
      currentHookNameInDev = 'useDebugValue';
      warnInvalidHookAccess();
      updateHookTypesDev();
      return updateDebugValue(value, formatterFn);
    }
  };
}

var commitTime = 0;
var profilerStartTime = -1;

function getCommitTime() {
  return commitTime;
}

function recordCommitTime() {
  if (!enableProfilerTimer) {
    return;
  }
  commitTime = now();
}

function startProfilerTimer(fiber) {
  if (!enableProfilerTimer) {
    return;
  }

  profilerStartTime = now();

  if (fiber.actualStartTime < 0) {
    fiber.actualStartTime = now();
  }
}

function stopProfilerTimerIfRunning(fiber) {
  if (!enableProfilerTimer) {
    return;
  }
  profilerStartTime = -1;
}

function stopProfilerTimerIfRunningAndRecordDelta(fiber, overrideBaseTime) {
  if (!enableProfilerTimer) {
    return;
  }

  if (profilerStartTime >= 0) {
    var elapsedTime = now() - profilerStartTime;
    fiber.actualDuration += elapsedTime;
    if (overrideBaseTime) {
      fiber.selfBaseDuration = elapsedTime;
    }
    profilerStartTime = -1;
  }
}

// The deepest Fiber on the stack involved in a hydration context.
// This may have been an insertion or a hydration.
var hydrationParentFiber = null;
var nextHydratableInstance = null;
var isHydrating = false;

function enterHydrationState(fiber) {
  if (!supportsHydration) {
    return false;
  }

  var parentInstance = fiber.stateNode.containerInfo;
  nextHydratableInstance = getFirstHydratableChild(parentInstance);
  hydrationParentFiber = fiber;
  isHydrating = true;
  return true;
}

function reenterHydrationStateFromDehydratedSuspenseInstance(fiber) {
  if (!supportsHydration) {
    return false;
  }

  var suspenseInstance = fiber.stateNode;
  nextHydratableInstance = getNextHydratableSibling(suspenseInstance);
  popToNextHostParent(fiber);
  isHydrating = true;
  return true;
}

function deleteHydratableInstance(returnFiber, instance) {
  {
    switch (returnFiber.tag) {
      case HostRoot:
        didNotHydrateContainerInstance(returnFiber.stateNode.containerInfo, instance);
        break;
      case HostComponent:
        didNotHydrateInstance(returnFiber.type, returnFiber.memoizedProps, returnFiber.stateNode, instance);
        break;
    }
  }

  var childToDelete = createFiberFromHostInstanceForDeletion();
  childToDelete.stateNode = instance;
  childToDelete.return = returnFiber;
  childToDelete.effectTag = Deletion;

  // This might seem like it belongs on progressedFirstDeletion. However,
  // these children are not part of the reconciliation list of children.
  // Even if we abort and rereconcile the children, that will try to hydrate
  // again and the nodes are still in the host tree so these will be
  // recreated.
  if (returnFiber.lastEffect !== null) {
    returnFiber.lastEffect.nextEffect = childToDelete;
    returnFiber.lastEffect = childToDelete;
  } else {
    returnFiber.firstEffect = returnFiber.lastEffect = childToDelete;
  }
}

function insertNonHydratedInstance(returnFiber, fiber) {
  fiber.effectTag |= Placement;
  {
    switch (returnFiber.tag) {
      case HostRoot:
        {
          var parentContainer = returnFiber.stateNode.containerInfo;
          switch (fiber.tag) {
            case HostComponent:
              var type = fiber.type;
              var props = fiber.pendingProps;
              didNotFindHydratableContainerInstance(parentContainer, type, props);
              break;
            case HostText:
              var text = fiber.pendingProps;
              didNotFindHydratableContainerTextInstance(parentContainer, text);
              break;
            case SuspenseComponent:
              didNotFindHydratableContainerSuspenseInstance(parentContainer);
              break;
          }
          break;
        }
      case HostComponent:
        {
          var parentType = returnFiber.type;
          var parentProps = returnFiber.memoizedProps;
          var parentInstance = returnFiber.stateNode;
          switch (fiber.tag) {
            case HostComponent:
              var _type = fiber.type;
              var _props = fiber.pendingProps;
              didNotFindHydratableInstance(parentType, parentProps, parentInstance, _type, _props);
              break;
            case HostText:
              var _text = fiber.pendingProps;
              didNotFindHydratableTextInstance(parentType, parentProps, parentInstance, _text);
              break;
            case SuspenseComponent:
              didNotFindHydratableSuspenseInstance(parentType, parentProps, parentInstance);
              break;
          }
          break;
        }
      default:
        return;
    }
  }
}

function tryHydrate(fiber, nextInstance) {
  switch (fiber.tag) {
    case HostComponent:
      {
        var type = fiber.type;
        var props = fiber.pendingProps;
        var instance = canHydrateInstance(nextInstance, type, props);
        if (instance !== null) {
          fiber.stateNode = instance;
          return true;
        }
        return false;
      }
    case HostText:
      {
        var text = fiber.pendingProps;
        var textInstance = canHydrateTextInstance(nextInstance, text);
        if (textInstance !== null) {
          fiber.stateNode = textInstance;
          return true;
        }
        return false;
      }
    case SuspenseComponent:
      {
        if (enableSuspenseServerRenderer) {
          var suspenseInstance = canHydrateSuspenseInstance(nextInstance);
          if (suspenseInstance !== null) {
            // Downgrade the tag to a dehydrated component until we've hydrated it.
            fiber.tag = DehydratedSuspenseComponent;
            fiber.stateNode = suspenseInstance;
            return true;
          }
        }
        return false;
      }
    default:
      return false;
  }
}

function tryToClaimNextHydratableInstance(fiber) {
  if (!isHydrating) {
    return;
  }
  var nextInstance = nextHydratableInstance;
  if (!nextInstance) {
    // Nothing to hydrate. Make it an insertion.
    insertNonHydratedInstance(hydrationParentFiber, fiber);
    isHydrating = false;
    hydrationParentFiber = fiber;
    return;
  }
  var firstAttemptedInstance = nextInstance;
  if (!tryHydrate(fiber, nextInstance)) {
    // If we can't hydrate this instance let's try the next one.
    // We use this as a heuristic. It's based on intuition and not data so it
    // might be flawed or unnecessary.
    nextInstance = getNextHydratableSibling(firstAttemptedInstance);
    if (!nextInstance || !tryHydrate(fiber, nextInstance)) {
      // Nothing to hydrate. Make it an insertion.
      insertNonHydratedInstance(hydrationParentFiber, fiber);
      isHydrating = false;
      hydrationParentFiber = fiber;
      return;
    }
    // We matched the next one, we'll now assume that the first one was
    // superfluous and we'll delete it. Since we can't eagerly delete it
    // we'll have to schedule a deletion. To do that, this node needs a dummy
    // fiber associated with it.
    deleteHydratableInstance(hydrationParentFiber, firstAttemptedInstance);
  }
  hydrationParentFiber = fiber;
  nextHydratableInstance = getFirstHydratableChild(nextInstance);
}

function prepareToHydrateHostInstance(fiber, rootContainerInstance, hostContext) {
  if (!supportsHydration) {
    invariant(false, 'Expected prepareToHydrateHostInstance() to never be called. This error is likely caused by a bug in React. Please file an issue.');
  }

  var instance = fiber.stateNode;
  var updatePayload = hydrateInstance(instance, fiber.type, fiber.memoizedProps, rootContainerInstance, hostContext, fiber);
  // TODO: Type this specific to this type of component.
  fiber.updateQueue = updatePayload;
  // If the update payload indicates that there is a change or if there
  // is a new ref we mark this as an update.
  if (updatePayload !== null) {
    return true;
  }
  return false;
}

function prepareToHydrateHostTextInstance(fiber) {
  if (!supportsHydration) {
    invariant(false, 'Expected prepareToHydrateHostTextInstance() to never be called. This error is likely caused by a bug in React. Please file an issue.');
  }

  var textInstance = fiber.stateNode;
  var textContent = fiber.memoizedProps;
  var shouldUpdate = hydrateTextInstance(textInstance, textContent, fiber);
  {
    if (shouldUpdate) {
      // We assume that prepareToHydrateHostTextInstance is called in a context where the
      // hydration parent is the parent host component of this host text.
      var returnFiber = hydrationParentFiber;
      if (returnFiber !== null) {
        switch (returnFiber.tag) {
          case HostRoot:
            {
              var parentContainer = returnFiber.stateNode.containerInfo;
              didNotMatchHydratedContainerTextInstance(parentContainer, textInstance, textContent);
              break;
            }
          case HostComponent:
            {
              var parentType = returnFiber.type;
              var parentProps = returnFiber.memoizedProps;
              var parentInstance = returnFiber.stateNode;
              didNotMatchHydratedTextInstance(parentType, parentProps, parentInstance, textInstance, textContent);
              break;
            }
        }
      }
    }
  }
  return shouldUpdate;
}

function skipPastDehydratedSuspenseInstance(fiber) {
  if (!supportsHydration) {
    invariant(false, 'Expected skipPastDehydratedSuspenseInstance() to never be called. This error is likely caused by a bug in React. Please file an issue.');
  }
  var suspenseInstance = fiber.stateNode;
  !suspenseInstance ? invariant(false, 'Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.') : void 0;
  nextHydratableInstance = getNextHydratableInstanceAfterSuspenseInstance(suspenseInstance);
}

function popToNextHostParent(fiber) {
  var parent = fiber.return;
  while (parent !== null && parent.tag !== HostComponent && parent.tag !== HostRoot && parent.tag !== DehydratedSuspenseComponent) {
    parent = parent.return;
  }
  hydrationParentFiber = parent;
}

function popHydrationState(fiber) {
  if (!supportsHydration) {
    return false;
  }
  if (fiber !== hydrationParentFiber) {
    // We're deeper than the current hydration context, inside an inserted
    // tree.
    return false;
  }
  if (!isHydrating) {
    // If we're not currently hydrating but we're in a hydration context, then
    // we were an insertion and now need to pop up reenter hydration of our
    // siblings.
    popToNextHostParent(fiber);
    isHydrating = true;
    return false;
  }

  var type = fiber.type;

  // If we have any remaining hydratable nodes, we need to delete them now.
  // We only do this deeper than head and body since they tend to have random
  // other nodes in them. We also ignore components with pure text content in
  // side of them.
  // TODO: Better heuristic.
  if (fiber.tag !== HostComponent || type !== 'head' && type !== 'body' && !shouldSetTextContent(type, fiber.memoizedProps)) {
    var nextInstance = nextHydratableInstance;
    while (nextInstance) {
      deleteHydratableInstance(fiber, nextInstance);
      nextInstance = getNextHydratableSibling(nextInstance);
    }
  }

  popToNextHostParent(fiber);
  nextHydratableInstance = hydrationParentFiber ? getNextHydratableSibling(fiber.stateNode) : null;
  return true;
}

function resetHydrationState() {
  if (!supportsHydration) {
    return;
  }

  hydrationParentFiber = null;
  nextHydratableInstance = null;
  isHydrating = false;
}

var ReactCurrentOwner$2 = ReactSharedInternals.ReactCurrentOwner;

var didReceiveUpdate = false;

var didWarnAboutBadClass = void 0;
var didWarnAboutContextTypeOnFunctionComponent = void 0;
var didWarnAboutGetDerivedStateOnFunctionComponent = void 0;
var didWarnAboutFunctionRefs = void 0;
var didWarnAboutReassigningProps = void 0;

{
  didWarnAboutBadClass = {};
  didWarnAboutContextTypeOnFunctionComponent = {};
  didWarnAboutGetDerivedStateOnFunctionComponent = {};
  didWarnAboutFunctionRefs = {};
  didWarnAboutReassigningProps = false;
}

function reconcileChildren(current$$1, workInProgress, nextChildren, renderExpirationTime) {
  if (current$$1 === null) {
    // If this is a fresh new component that hasn't been rendered yet, we
    // won't update its child set by applying minimal side-effects. Instead,
    // we will add them all to the child before it gets rendered. That means
    // we can optimize this reconciliation pass by not tracking side-effects.
    workInProgress.child = mountChildFibers(workInProgress, null, nextChildren, renderExpirationTime);
  } else {
    // If the current child is the same as the work in progress, it means that
    // we haven't yet started any work on these children. Therefore, we use
    // the clone algorithm to create a copy of all the current children.

    // If we had any progressed work already, that is invalid at this point so
    // let's throw it out.
    workInProgress.child = reconcileChildFibers(workInProgress, current$$1.child, nextChildren, renderExpirationTime);
  }
}

function forceUnmountCurrentAndReconcile(current$$1, workInProgress, nextChildren, renderExpirationTime) {
  // This function is fork of reconcileChildren. It's used in cases where we
  // want to reconcile without matching against the existing set. This has the
  // effect of all current children being unmounted; even if the type and key
  // are the same, the old child is unmounted and a new child is created.
  //
  // To do this, we're going to go through the reconcile algorithm twice. In
  // the first pass, we schedule a deletion for all the current children by
  // passing null.
  workInProgress.child = reconcileChildFibers(workInProgress, current$$1.child, null, renderExpirationTime);
  // In the second pass, we mount the new children. The trick here is that we
  // pass null in place of where we usually pass the current child set. This has
  // the effect of remounting all children regardless of whether their their
  // identity matches.
  workInProgress.child = reconcileChildFibers(workInProgress, null, nextChildren, renderExpirationTime);
}

function updateForwardRef(current$$1, workInProgress, Component, nextProps, renderExpirationTime) {
  // TODO: current can be non-null here even if the component
  // hasn't yet mounted. This happens after the first render suspends.
  // We'll need to figure out if this is fine or can cause issues.

  {
    if (workInProgress.type !== workInProgress.elementType) {
      // Lazy component props can't be validated in createElement
      // because they're only guaranteed to be resolved here.
      var innerPropTypes = Component.propTypes;
      if (innerPropTypes) {
        checkPropTypes(innerPropTypes, nextProps, // Resolved props
        'prop', getComponentName(Component), getCurrentFiberStackInDev);
      }
    }
  }

  var render = Component.render;
  var ref = workInProgress.ref;

  // The rest is a fork of updateFunctionComponent
  var nextChildren = void 0;
  prepareToReadContext(workInProgress, renderExpirationTime);
  {
    ReactCurrentOwner$2.current = workInProgress;
    setCurrentPhase('render');
    nextChildren = renderWithHooks(current$$1, workInProgress, render, nextProps, ref, renderExpirationTime);
    if (debugRenderPhaseSideEffects || debugRenderPhaseSideEffectsForStrictMode && workInProgress.mode & StrictMode) {
      // Only double-render components with Hooks
      if (workInProgress.memoizedState !== null) {
        nextChildren = renderWithHooks(current$$1, workInProgress, render, nextProps, ref, renderExpirationTime);
      }
    }
    setCurrentPhase(null);
  }

  if (current$$1 !== null && !didReceiveUpdate) {
    bailoutHooks(current$$1, workInProgress, renderExpirationTime);
    return bailoutOnAlreadyFinishedWork(current$$1, workInProgress, renderExpirationTime);
  }

  // React DevTools reads this flag.
  workInProgress.effectTag |= PerformedWork;
  reconcileChildren(current$$1, workInProgress, nextChildren, renderExpirationTime);
  return workInProgress.child;
}

function updateMemoComponent(current$$1, workInProgress, Component, nextProps, updateExpirationTime, renderExpirationTime) {
  if (current$$1 === null) {
    var type = Component.type;
    if (isSimpleFunctionComponent(type) && Component.compare === null &&
    // SimpleMemoComponent codepath doesn't resolve outer props either.
    Component.defaultProps === undefined) {
      // If this is a plain function component without default props,
      // and with only the default shallow comparison, we upgrade it
      // to a SimpleMemoComponent to allow fast path updates.
      workInProgress.tag = SimpleMemoComponent;
      workInProgress.type = type;
      {
        validateFunctionComponentInDev(workInProgress, type);
      }
      return updateSimpleMemoComponent(current$$1, workInProgress, type, nextProps, updateExpirationTime, renderExpirationTime);
    }
    {
      var innerPropTypes = type.propTypes;
      if (innerPropTypes) {
        // Inner memo component props aren't currently validated in createElement.
        // We could move it there, but we'd still need this for lazy code path.
        checkPropTypes(innerPropTypes, nextProps, // Resolved props
        'prop', getComponentName(type), getCurrentFiberStackInDev);
      }
    }
    var child = createFiberFromTypeAndProps(Component.type, null, nextProps, null, workInProgress.mode, renderExpirationTime);
    child.ref = workInProgress.ref;
    child.return = workInProgress;
    workInProgress.child = child;
    return child;
  }
  {
    var _type = Component.type;
    var _innerPropTypes = _type.propTypes;
    if (_innerPropTypes) {
      // Inner memo component props aren't currently validated in createElement.
      // We could move it there, but we'd still need this for lazy code path.
      checkPropTypes(_innerPropTypes, nextProps, // Resolved props
      'prop', getComponentName(_type), getCurrentFiberStackInDev);
    }
  }
  var currentChild = current$$1.child; // This is always exactly one child
  if (updateExpirationTime < renderExpirationTime) {
    // This will be the props with resolved defaultProps,
    // unlike current.memoizedProps which will be the unresolved ones.
    var prevProps = currentChild.memoizedProps;
    // Default to shallow comparison
    var compare = Component.compare;
    compare = compare !== null ? compare : shallowEqual;
    if (compare(prevProps, nextProps) && current$$1.ref === workInProgress.ref) {
      return bailoutOnAlreadyFinishedWork(current$$1, workInProgress, renderExpirationTime);
    }
  }
  // React DevTools reads this flag.
  workInProgress.effectTag |= PerformedWork;
  var newChild = createWorkInProgress(currentChild, nextProps, renderExpirationTime);
  newChild.ref = workInProgress.ref;
  newChild.return = workInProgress;
  workInProgress.child = newChild;
  return newChild;
}

function updateSimpleMemoComponent(current$$1, workInProgress, Component, nextProps, updateExpirationTime, renderExpirationTime) {
  // TODO: current can be non-null here even if the component
  // hasn't yet mounted. This happens when the inner render suspends.
  // We'll need to figure out if this is fine or can cause issues.

  {
    if (workInProgress.type !== workInProgress.elementType) {
      // Lazy component props can't be validated in createElement
      // because they're only guaranteed to be resolved here.
      var outerMemoType = workInProgress.elementType;
      if (outerMemoType.$$typeof === REACT_LAZY_TYPE) {
        // We warn when you define propTypes on lazy()
        // so let's just skip over it to find memo() outer wrapper.
        // Inner props for memo are validated later.
        outerMemoType = refineResolvedLazyComponent(outerMemoType);
      }
      var outerPropTypes = outerMemoType && outerMemoType.propTypes;
      if (outerPropTypes) {
        checkPropTypes(outerPropTypes, nextProps, // Resolved (SimpleMemoComponent has no defaultProps)
        'prop', getComponentName(outerMemoType), getCurrentFiberStackInDev);
      }
      // Inner propTypes will be validated in the function component path.
    }
  }
  if (current$$1 !== null) {
    var prevProps = current$$1.memoizedProps;
    if (shallowEqual(prevProps, nextProps) && current$$1.ref === workInProgress.ref) {
      didReceiveUpdate = false;
      if (updateExpirationTime < renderExpirationTime) {
        return bailoutOnAlreadyFinishedWork(current$$1, workInProgress, renderExpirationTime);
      }
    }
  }
  return updateFunctionComponent(current$$1, workInProgress, Component, nextProps, renderExpirationTime);
}

function updateFragment(current$$1, workInProgress, renderExpirationTime) {
  var nextChildren = workInProgress.pendingProps;
  reconcileChildren(current$$1, workInProgress, nextChildren, renderExpirationTime);
  return workInProgress.child;
}

function updateMode(current$$1, workInProgress, renderExpirationTime) {
  var nextChildren = workInProgress.pendingProps.children;
  reconcileChildren(current$$1, workInProgress, nextChildren, renderExpirationTime);
  return workInProgress.child;
}

function updateProfiler(current$$1, workInProgress, renderExpirationTime) {
  if (enableProfilerTimer) {
    workInProgress.effectTag |= Update;
  }
  var nextProps = workInProgress.pendingProps;
  var nextChildren = nextProps.children;
  reconcileChildren(current$$1, workInProgress, nextChildren, renderExpirationTime);
  return workInProgress.child;
}

function markRef(current$$1, workInProgress) {
  var ref = workInProgress.ref;
  if (current$$1 === null && ref !== null || current$$1 !== null && current$$1.ref !== ref) {
    // Schedule a Ref effect
    workInProgress.effectTag |= Ref;
  }
}

function updateFunctionComponent(current$$1, workInProgress, Component, nextProps, renderExpirationTime) {
  {
    if (workInProgress.type !== workInProgress.elementType) {
      // Lazy component props can't be validated in createElement
      // because they're only guaranteed to be resolved here.
      var innerPropTypes = Component.propTypes;
      if (innerPropTypes) {
        checkPropTypes(innerPropTypes, nextProps, // Resolved props
        'prop', getComponentName(Component), getCurrentFiberStackInDev);
      }
    }
  }

  var unmaskedContext = getUnmaskedContext(workInProgress, Component, true);
  var context = getMaskedContext(workInProgress, unmaskedContext);

  var nextChildren = void 0;
  prepareToReadContext(workInProgress, renderExpirationTime);
  {
    ReactCurrentOwner$2.current = workInProgress;
    setCurrentPhase('render');
    nextChildren = renderWithHooks(current$$1, workInProgress, Component, nextProps, context, renderExpirationTime);
    if (debugRenderPhaseSideEffects || debugRenderPhaseSideEffectsForStrictMode && workInProgress.mode & StrictMode) {
      // Only double-render components with Hooks
      if (workInProgress.memoizedState !== null) {
        nextChildren = renderWithHooks(current$$1, workInProgress, Component, nextProps, context, renderExpirationTime);
      }
    }
    setCurrentPhase(null);
  }

  if (current$$1 !== null && !didReceiveUpdate) {
    bailoutHooks(current$$1, workInProgress, renderExpirationTime);
    return bailoutOnAlreadyFinishedWork(current$$1, workInProgress, renderExpirationTime);
  }

  // React DevTools reads this flag.
  workInProgress.effectTag |= PerformedWork;
  reconcileChildren(current$$1, workInProgress, nextChildren, renderExpirationTime);
  return workInProgress.child;
}

function updateClassComponent(current$$1, workInProgress, Component, nextProps, renderExpirationTime) {
  {
    if (workInProgress.type !== workInProgress.elementType) {
      // Lazy component props can't be validated in createElement
      // because they're only guaranteed to be resolved here.
      var innerPropTypes = Component.propTypes;
      if (innerPropTypes) {
        checkPropTypes(innerPropTypes, nextProps, // Resolved props
        'prop', getComponentName(Component), getCurrentFiberStackInDev);
      }
    }
  }

  // Push context providers early to prevent context stack mismatches.
  // During mounting we don't know the child context yet as the instance doesn't exist.
  // We will invalidate the child context in finishClassComponent() right after rendering.
  var hasContext = void 0;
  if (isContextProvider(Component)) {
    hasContext = true;
    pushContextProvider(workInProgress);
  } else {
    hasContext = false;
  }
  prepareToReadContext(workInProgress, renderExpirationTime);

  var instance = workInProgress.stateNode;
  var shouldUpdate = void 0;
  if (instance === null) {
    if (current$$1 !== null) {
      // An class component without an instance only mounts if it suspended
      // inside a non- concurrent tree, in an inconsistent state. We want to
      // tree it like a new mount, even though an empty version of it already
      // committed. Disconnect the alternate pointers.
      current$$1.alternate = null;
      workInProgress.alternate = null;
      // Since this is conceptually a new fiber, schedule a Placement effect
      workInProgress.effectTag |= Placement;
    }
    // In the initial pass we might need to construct the instance.
    constructClassInstance(workInProgress, Component, nextProps, renderExpirationTime);
    mountClassInstance(workInProgress, Component, nextProps, renderExpirationTime);
    shouldUpdate = true;
  } else if (current$$1 === null) {
    // In a resume, we'll already have an instance we can reuse.
    shouldUpdate = resumeMountClassInstance(workInProgress, Component, nextProps, renderExpirationTime);
  } else {
    shouldUpdate = updateClassInstance(current$$1, workInProgress, Component, nextProps, renderExpirationTime);
  }
  var nextUnitOfWork = finishClassComponent(current$$1, workInProgress, Component, shouldUpdate, hasContext, renderExpirationTime);
  {
    var inst = workInProgress.stateNode;
    if (inst.props !== nextProps) {
      !didWarnAboutReassigningProps ? warning$1(false, 'It looks like %s is reassigning its own `this.props` while rendering. ' + 'This is not supported and can lead to confusing bugs.', getComponentName(workInProgress.type) || 'a component') : void 0;
      didWarnAboutReassigningProps = true;
    }
  }
  return nextUnitOfWork;
}

function finishClassComponent(current$$1, workInProgress, Component, shouldUpdate, hasContext, renderExpirationTime) {
  // Refs should update even if shouldComponentUpdate returns false
  markRef(current$$1, workInProgress);

  var didCaptureError = (workInProgress.effectTag & DidCapture) !== NoEffect;

  if (!shouldUpdate && !didCaptureError) {
    // Context providers should defer to sCU for rendering
    if (hasContext) {
      invalidateContextProvider(workInProgress, Component, false);
    }

    return bailoutOnAlreadyFinishedWork(current$$1, workInProgress, renderExpirationTime);
  }

  var instance = workInProgress.stateNode;

  // Rerender
  ReactCurrentOwner$2.current = workInProgress;
  var nextChildren = void 0;
  if (didCaptureError && typeof Component.getDerivedStateFromError !== 'function') {
    // If we captured an error, but getDerivedStateFrom catch is not defined,
    // unmount all the children. componentDidCatch will schedule an update to
    // re-render a fallback. This is temporary until we migrate everyone to
    // the new API.
    // TODO: Warn in a future release.
    nextChildren = null;

    if (enableProfilerTimer) {
      stopProfilerTimerIfRunning(workInProgress);
    }
  } else {
    {
      setCurrentPhase('render');
      nextChildren = instance.render();
      if (debugRenderPhaseSideEffects || debugRenderPhaseSideEffectsForStrictMode && workInProgress.mode & StrictMode) {
        instance.render();
      }
      setCurrentPhase(null);
    }
  }

  // React DevTools reads this flag.
  workInProgress.effectTag |= PerformedWork;
  if (current$$1 !== null && didCaptureError) {
    // If we're recovering from an error, reconcile without reusing any of
    // the existing children. Conceptually, the normal children and the children
    // that are shown on error are two different sets, so we shouldn't reuse
    // normal children even if their identities match.
    forceUnmountCurrentAndReconcile(current$$1, workInProgress, nextChildren, renderExpirationTime);
  } else {
    reconcileChildren(current$$1, workInProgress, nextChildren, renderExpirationTime);
  }

  // Memoize state using the values we just used to render.
  // TODO: Restructure so we never read values from the instance.
  workInProgress.memoizedState = instance.state;

  // The context might have changed so we need to recalculate it.
  if (hasContext) {
    invalidateContextProvider(workInProgress, Component, true);
  }

  return workInProgress.child;
}

function pushHostRootContext(workInProgress) {
  var root = workInProgress.stateNode;
  if (root.pendingContext) {
    pushTopLevelContextObject(workInProgress, root.pendingContext, root.pendingContext !== root.context);
  } else if (root.context) {
    // Should always be set
    pushTopLevelContextObject(workInProgress, root.context, false);
  }
  pushHostContainer(workInProgress, root.containerInfo);
}

function updateHostRoot(current$$1, workInProgress, renderExpirationTime) {
  pushHostRootContext(workInProgress);
  var updateQueue = workInProgress.updateQueue;
  !(updateQueue !== null) ? invariant(false, 'If the root does not have an updateQueue, we should have already bailed out. This error is likely caused by a bug in React. Please file an issue.') : void 0;
  var nextProps = workInProgress.pendingProps;
  var prevState = workInProgress.memoizedState;
  var prevChildren = prevState !== null ? prevState.element : null;
  processUpdateQueue(workInProgress, updateQueue, nextProps, null, renderExpirationTime);
  var nextState = workInProgress.memoizedState;
  // Caution: React DevTools currently depends on this property
  // being called "element".
  var nextChildren = nextState.element;
  if (nextChildren === prevChildren) {
    // If the state is the same as before, that's a bailout because we had
    // no work that expires at this time.
    resetHydrationState();
    return bailoutOnAlreadyFinishedWork(current$$1, workInProgress, renderExpirationTime);
  }
  var root = workInProgress.stateNode;
  if ((current$$1 === null || current$$1.child === null) && root.hydrate && enterHydrationState(workInProgress)) {
    // If we don't have any current children this might be the first pass.
    // We always try to hydrate. If this isn't a hydration pass there won't
    // be any children to hydrate which is effectively the same thing as
    // not hydrating.

    // This is a bit of a hack. We track the host root as a placement to
    // know that we're currently in a mounting state. That way isMounted
    // works as expected. We must reset this before committing.
    // TODO: Delete this when we delete isMounted and findDOMNode.
    workInProgress.effectTag |= Placement;

    // Ensure that children mount into this root without tracking
    // side-effects. This ensures that we don't store Placement effects on
    // nodes that will be hydrated.
    workInProgress.child = mountChildFibers(workInProgress, null, nextChildren, renderExpirationTime);
  } else {
    // Otherwise reset hydration state in case we aborted and resumed another
    // root.
    reconcileChildren(current$$1, workInProgress, nextChildren, renderExpirationTime);
    resetHydrationState();
  }
  return workInProgress.child;
}

function updateHostComponent(current$$1, workInProgress, renderExpirationTime) {
  pushHostContext(workInProgress);

  if (current$$1 === null) {
    tryToClaimNextHydratableInstance(workInProgress);
  }

  var type = workInProgress.type;
  var nextProps = workInProgress.pendingProps;
  var prevProps = current$$1 !== null ? current$$1.memoizedProps : null;

  var nextChildren = nextProps.children;
  var isDirectTextChild = shouldSetTextContent(type, nextProps);

  if (isDirectTextChild) {
    // We special case a direct text child of a host node. This is a common
    // case. We won't handle it as a reified child. We will instead handle
    // this in the host environment that also have access to this prop. That
    // avoids allocating another HostText fiber and traversing it.
    nextChildren = null;
  } else if (prevProps !== null && shouldSetTextContent(type, prevProps)) {
    // If we're switching from a direct text child to a normal child, or to
    // empty, we need to schedule the text content to be reset.
    workInProgress.effectTag |= ContentReset;
  }

  markRef(current$$1, workInProgress);

  // Check the host config to see if the children are offscreen/hidden.
  if (renderExpirationTime !== Never && workInProgress.mode & ConcurrentMode && shouldDeprioritizeSubtree(type, nextProps)) {
    // Schedule this fiber to re-render at offscreen priority. Then bailout.
    workInProgress.expirationTime = workInProgress.childExpirationTime = Never;
    return null;
  }

  reconcileChildren(current$$1, workInProgress, nextChildren, renderExpirationTime);
  return workInProgress.child;
}

function updateHostText(current$$1, workInProgress) {
  if (current$$1 === null) {
    tryToClaimNextHydratableInstance(workInProgress);
  }
  // Nothing to do here. This is terminal. We'll do the completion step
  // immediately after.
  return null;
}

function mountLazyComponent(_current, workInProgress, elementType, updateExpirationTime, renderExpirationTime) {
  if (_current !== null) {
    // An lazy component only mounts if it suspended inside a non-
    // concurrent tree, in an inconsistent state. We want to treat it like
    // a new mount, even though an empty version of it already committed.
    // Disconnect the alternate pointers.
    _current.alternate = null;
    workInProgress.alternate = null;
    // Since this is conceptually a new fiber, schedule a Placement effect
    workInProgress.effectTag |= Placement;
  }

  var props = workInProgress.pendingProps;
  // We can't start a User Timing measurement with correct label yet.
  // Cancel and resume right after we know the tag.
  cancelWorkTimer(workInProgress);
  var Component = readLazyComponentType(elementType);
  // Store the unwrapped component in the type.
  workInProgress.type = Component;
  var resolvedTag = workInProgress.tag = resolveLazyComponentTag(Component);
  startWorkTimer(workInProgress);
  var resolvedProps = resolveDefaultProps(Component, props);
  var child = void 0;
  switch (resolvedTag) {
    case FunctionComponent:
      {
        {
          validateFunctionComponentInDev(workInProgress, Component);
        }
        child = updateFunctionComponent(null, workInProgress, Component, resolvedProps, renderExpirationTime);
        break;
      }
    case ClassComponent:
      {
        child = updateClassComponent(null, workInProgress, Component, resolvedProps, renderExpirationTime);
        break;
      }
    case ForwardRef:
      {
        child = updateForwardRef(null, workInProgress, Component, resolvedProps, renderExpirationTime);
        break;
      }
    case MemoComponent:
      {
        {
          if (workInProgress.type !== workInProgress.elementType) {
            var outerPropTypes = Component.propTypes;
            if (outerPropTypes) {
              checkPropTypes(outerPropTypes, resolvedProps, // Resolved for outer only
              'prop', getComponentName(Component), getCurrentFiberStackInDev);
            }
          }
        }
        child = updateMemoComponent(null, workInProgress, Component, resolveDefaultProps(Component.type, resolvedProps), // The inner type can have defaults too
        updateExpirationTime, renderExpirationTime);
        break;
      }
    default:
      {
        var hint = '';
        {
          if (Component !== null && typeof Component === 'object' && Component.$$typeof === REACT_LAZY_TYPE) {
            hint = ' Did you wrap a component in React.lazy() more than once?';
          }
        }
        // This message intentionally doesn't mention ForwardRef or MemoComponent
        // because the fact that it's a separate type of work is an
        // implementation detail.
        invariant(false, 'Element type is invalid. Received a promise that resolves to: %s. Lazy element type must resolve to a class or function.%s', Component, hint);
      }
  }
  return child;
}

function mountIncompleteClassComponent(_current, workInProgress, Component, nextProps, renderExpirationTime) {
  if (_current !== null) {
    // An incomplete component only mounts if it suspended inside a non-
    // concurrent tree, in an inconsistent state. We want to treat it like
    // a new mount, even though an empty version of it already committed.
    // Disconnect the alternate pointers.
    _current.alternate = null;
    workInProgress.alternate = null;
    // Since this is conceptually a new fiber, schedule a Placement effect
    workInProgress.effectTag |= Placement;
  }

  // Promote the fiber to a class and try rendering again.
  workInProgress.tag = ClassComponent;

  // The rest of this function is a fork of `updateClassComponent`

  // Push context providers early to prevent context stack mismatches.
  // During mounting we don't know the child context yet as the instance doesn't exist.
  // We will invalidate the child context in finishClassComponent() right after rendering.
  var hasContext = void 0;
  if (isContextProvider(Component)) {
    hasContext = true;
    pushContextProvider(workInProgress);
  } else {
    hasContext = false;
  }
  prepareToReadContext(workInProgress, renderExpirationTime);

  constructClassInstance(workInProgress, Component, nextProps, renderExpirationTime);
  mountClassInstance(workInProgress, Component, nextProps, renderExpirationTime);

  return finishClassComponent(null, workInProgress, Component, true, hasContext, renderExpirationTime);
}

function mountIndeterminateComponent(_current, workInProgress, Component, renderExpirationTime) {
  if (_current !== null) {
    // An indeterminate component only mounts if it suspended inside a non-
    // concurrent tree, in an inconsistent state. We want to treat it like
    // a new mount, even though an empty version of it already committed.
    // Disconnect the alternate pointers.
    _current.alternate = null;
    workInProgress.alternate = null;
    // Since this is conceptually a new fiber, schedule a Placement effect
    workInProgress.effectTag |= Placement;
  }

  var props = workInProgress.pendingProps;
  var unmaskedContext = getUnmaskedContext(workInProgress, Component, false);
  var context = getMaskedContext(workInProgress, unmaskedContext);

  prepareToReadContext(workInProgress, renderExpirationTime);

  var value = void 0;

  {
    if (Component.prototype && typeof Component.prototype.render === 'function') {
      var componentName = getComponentName(Component) || 'Unknown';

      if (!didWarnAboutBadClass[componentName]) {
        warningWithoutStack$1(false, "The <%s /> component appears to have a render method, but doesn't extend React.Component. " + 'This is likely to cause errors. Change %s to extend React.Component instead.', componentName, componentName);
        didWarnAboutBadClass[componentName] = true;
      }
    }

    if (workInProgress.mode & StrictMode) {
      ReactStrictModeWarnings.recordLegacyContextWarning(workInProgress, null);
    }

    ReactCurrentOwner$2.current = workInProgress;
    value = renderWithHooks(null, workInProgress, Component, props, context, renderExpirationTime);
  }
  // React DevTools reads this flag.
  workInProgress.effectTag |= PerformedWork;

  if (typeof value === 'object' && value !== null && typeof value.render === 'function' && value.$$typeof === undefined) {
    // Proceed under the assumption that this is a class instance
    workInProgress.tag = ClassComponent;

    // Throw out any hooks that were used.
    resetHooks();

    // Push context providers early to prevent context stack mismatches.
    // During mounting we don't know the child context yet as the instance doesn't exist.
    // We will invalidate the child context in finishClassComponent() right after rendering.
    var hasContext = false;
    if (isContextProvider(Component)) {
      hasContext = true;
      pushContextProvider(workInProgress);
    } else {
      hasContext = false;
    }

    workInProgress.memoizedState = value.state !== null && value.state !== undefined ? value.state : null;

    var getDerivedStateFromProps = Component.getDerivedStateFromProps;
    if (typeof getDerivedStateFromProps === 'function') {
      applyDerivedStateFromProps(workInProgress, Component, getDerivedStateFromProps, props);
    }

    adoptClassInstance(workInProgress, value);
    mountClassInstance(workInProgress, Component, props, renderExpirationTime);
    return finishClassComponent(null, workInProgress, Component, true, hasContext, renderExpirationTime);
  } else {
    // Proceed under the assumption that this is a function component
    workInProgress.tag = FunctionComponent;
    {
      if (debugRenderPhaseSideEffects || debugRenderPhaseSideEffectsForStrictMode && workInProgress.mode & StrictMode) {
        // Only double-render components with Hooks
        if (workInProgress.memoizedState !== null) {
          value = renderWithHooks(null, workInProgress, Component, props, context, renderExpirationTime);
        }
      }
    }
    reconcileChildren(null, workInProgress, value, renderExpirationTime);
    {
      validateFunctionComponentInDev(workInProgress, Component);
    }
    return workInProgress.child;
  }
}

function validateFunctionComponentInDev(workInProgress, Component) {
  if (Component) {
    !!Component.childContextTypes ? warningWithoutStack$1(false, '%s(...): childContextTypes cannot be defined on a function component.', Component.displayName || Component.name || 'Component') : void 0;
  }
  if (workInProgress.ref !== null) {
    var info = '';
    var ownerName = getCurrentFiberOwnerNameInDevOrNull();
    if (ownerName) {
      info += '\n\nCheck the render method of `' + ownerName + '`.';
    }

    var warningKey = ownerName || workInProgress._debugID || '';
    var debugSource = workInProgress._debugSource;
    if (debugSource) {
      warningKey = debugSource.fileName + ':' + debugSource.lineNumber;
    }
    if (!didWarnAboutFunctionRefs[warningKey]) {
      didWarnAboutFunctionRefs[warningKey] = true;
      warning$1(false, 'Function components cannot be given refs. ' + 'Attempts to access this ref will fail. ' + 'Did you mean to use React.forwardRef()?%s', info);
    }
  }

  if (typeof Component.getDerivedStateFromProps === 'function') {
    var componentName = getComponentName(Component) || 'Unknown';

    if (!didWarnAboutGetDerivedStateOnFunctionComponent[componentName]) {
      warningWithoutStack$1(false, '%s: Function components do not support getDerivedStateFromProps.', componentName);
      didWarnAboutGetDerivedStateOnFunctionComponent[componentName] = true;
    }
  }

  if (typeof Component.contextType === 'object' && Component.contextType !== null) {
    var _componentName = getComponentName(Component) || 'Unknown';

    if (!didWarnAboutContextTypeOnFunctionComponent[_componentName]) {
      warningWithoutStack$1(false, '%s: Function components do not support contextType.', _componentName);
      didWarnAboutContextTypeOnFunctionComponent[_componentName] = true;
    }
  }
}

function updateSuspenseComponent(current$$1, workInProgress, renderExpirationTime) {
  var mode = workInProgress.mode;
  var nextProps = workInProgress.pendingProps;

  // We should attempt to render the primary children unless this boundary
  // already suspended during this render (`alreadyCaptured` is true).
  var nextState = workInProgress.memoizedState;

  var nextDidTimeout = void 0;
  if ((workInProgress.effectTag & DidCapture) === NoEffect) {
    // This is the first attempt.
    nextState = null;
    nextDidTimeout = false;
  } else {
    // Something in this boundary's subtree already suspended. Switch to
    // rendering the fallback children.
    nextState = {
      timedOutAt: nextState !== null ? nextState.timedOutAt : NoWork
    };
    nextDidTimeout = true;
    workInProgress.effectTag &= ~DidCapture;
  }

  // This next part is a bit confusing. If the children timeout, we switch to
  // showing the fallback children in place of the "primary" children.
  // However, we don't want to delete the primary children because then their
  // state will be lost (both the React state and the host state, e.g.
  // uncontrolled form inputs). Instead we keep them mounted and hide them.
  // Both the fallback children AND the primary children are rendered at the
  // same time. Once the primary children are un-suspended, we can delete
  // the fallback children — don't need to preserve their state.
  //
  // The two sets of children are siblings in the host environment, but
  // semantically, for purposes of reconciliation, they are two separate sets.
  // So we store them using two fragment fibers.
  //
  // However, we want to avoid allocating extra fibers for every placeholder.
  // They're only necessary when the children time out, because that's the
  // only time when both sets are mounted.
  //
  // So, the extra fragment fibers are only used if the children time out.
  // Otherwise, we render the primary children directly. This requires some
  // custom reconciliation logic to preserve the state of the primary
  // children. It's essentially a very basic form of re-parenting.

  // `child` points to the child fiber. In the normal case, this is the first
  // fiber of the primary children set. In the timed-out case, it's a
  // a fragment fiber containing the primary children.
  var child = void 0;
  // `next` points to the next fiber React should render. In the normal case,
  // it's the same as `child`: the first fiber of the primary children set.
  // In the timed-out case, it's a fragment fiber containing the *fallback*
  // children -- we skip over the primary children entirely.
  var next = void 0;
  if (current$$1 === null) {
    if (enableSuspenseServerRenderer) {
      // If we're currently hydrating, try to hydrate this boundary.
      // But only if this has a fallback.
      if (nextProps.fallback !== undefined) {
        tryToClaimNextHydratableInstance(workInProgress);
        // This could've changed the tag if this was a dehydrated suspense component.
        if (workInProgress.tag === DehydratedSuspenseComponent) {
          return updateDehydratedSuspenseComponent(null, workInProgress, renderExpirationTime);
        }
      }
    }

    // This is the initial mount. This branch is pretty simple because there's
    // no previous state that needs to be preserved.
    if (nextDidTimeout) {
      // Mount separate fragments for primary and fallback children.
      var nextFallbackChildren = nextProps.fallback;
      var primaryChildFragment = createFiberFromFragment(null, mode, NoWork, null);

      if ((workInProgress.mode & ConcurrentMode) === NoContext) {
        // Outside of concurrent mode, we commit the effects from the
        var progressedState = workInProgress.memoizedState;
        var progressedPrimaryChild = progressedState !== null ? workInProgress.child.child : workInProgress.child;
        primaryChildFragment.child = progressedPrimaryChild;
      }

      var fallbackChildFragment = createFiberFromFragment(nextFallbackChildren, mode, renderExpirationTime, null);
      primaryChildFragment.sibling = fallbackChildFragment;
      child = primaryChildFragment;
      // Skip the primary children, and continue working on the
      // fallback children.
      next = fallbackChildFragment;
      child.return = next.return = workInProgress;
    } else {
      // Mount the primary children without an intermediate fragment fiber.
      var nextPrimaryChildren = nextProps.children;
      child = next = mountChildFibers(workInProgress, null, nextPrimaryChildren, renderExpirationTime);
    }
  } else {
    // This is an update. This branch is more complicated because we need to
    // ensure the state of the primary children is preserved.
    var prevState = current$$1.memoizedState;
    var prevDidTimeout = prevState !== null;
    if (prevDidTimeout) {
      // The current tree already timed out. That means each child set is
      var currentPrimaryChildFragment = current$$1.child;
      var currentFallbackChildFragment = currentPrimaryChildFragment.sibling;
      if (nextDidTimeout) {
        // Still timed out. Reuse the current primary children by cloning
        // its fragment. We're going to skip over these entirely.
        var _nextFallbackChildren = nextProps.fallback;
        var _primaryChildFragment = createWorkInProgress(currentPrimaryChildFragment, currentPrimaryChildFragment.pendingProps, NoWork);

        if ((workInProgress.mode & ConcurrentMode) === NoContext) {
          // Outside of concurrent mode, we commit the effects from the
          var _progressedState = workInProgress.memoizedState;
          var _progressedPrimaryChild = _progressedState !== null ? workInProgress.child.child : workInProgress.child;
          if (_progressedPrimaryChild !== currentPrimaryChildFragment.child) {
            _primaryChildFragment.child = _progressedPrimaryChild;
          }
        }

        // Because primaryChildFragment is a new fiber that we're inserting as the
        // parent of a new tree, we need to set its treeBaseDuration.
        if (enableProfilerTimer && workInProgress.mode & ProfileMode) {
          // treeBaseDuration is the sum of all the child tree base durations.
          var treeBaseDuration = 0;
          var hiddenChild = _primaryChildFragment.child;
          while (hiddenChild !== null) {
            treeBaseDuration += hiddenChild.treeBaseDuration;
            hiddenChild = hiddenChild.sibling;
          }
          _primaryChildFragment.treeBaseDuration = treeBaseDuration;
        }

        // Clone the fallback child fragment, too. These we'll continue
        // working on.
        var _fallbackChildFragment = _primaryChildFragment.sibling = createWorkInProgress(currentFallbackChildFragment, _nextFallbackChildren, currentFallbackChildFragment.expirationTime);
        child = _primaryChildFragment;
        _primaryChildFragment.childExpirationTime = NoWork;
        // Skip the primary children, and continue working on the
        // fallback children.
        next = _fallbackChildFragment;
        child.return = next.return = workInProgress;
      } else {
        // No longer suspended. Switch back to showing the primary children,
        // and remove the intermediate fragment fiber.
        var _nextPrimaryChildren = nextProps.children;
        var currentPrimaryChild = currentPrimaryChildFragment.child;
        var primaryChild = reconcileChildFibers(workInProgress, currentPrimaryChild, _nextPrimaryChildren, renderExpirationTime);

        // If this render doesn't suspend, we need to delete the fallback
        // children. Wait until the complete phase, after we've confirmed the
        // fallback is no longer needed.
        // TODO: Would it be better to store the fallback fragment on
        // the stateNode?

        // Continue rendering the children, like we normally do.
        child = next = primaryChild;
      }
    } else {
      // The current tree has not already timed out. That means the primary
      // children are not wrapped in a fragment fiber.
      var _currentPrimaryChild = current$$1.child;
      if (nextDidTimeout) {
        // Timed out. Wrap the children in a fragment fiber to keep them
        // separate from the fallback children.
        var _nextFallbackChildren2 = nextProps.fallback;
        var _primaryChildFragment2 = createFiberFromFragment(
        // It shouldn't matter what the pending props are because we aren't
        // going to render this fragment.
        null, mode, NoWork, null);
        _primaryChildFragment2.child = _currentPrimaryChild;

        // Even though we're creating a new fiber, there are no new children,
        // because we're reusing an already mounted tree. So we don't need to
        // schedule a placement.
        // primaryChildFragment.effectTag |= Placement;

        if ((workInProgress.mode & ConcurrentMode) === NoContext) {
          // Outside of concurrent mode, we commit the effects from the
          var _progressedState2 = workInProgress.memoizedState;
          var _progressedPrimaryChild2 = _progressedState2 !== null ? workInProgress.child.child : workInProgress.child;
          _primaryChildFragment2.child = _progressedPrimaryChild2;
        }

        // Because primaryChildFragment is a new fiber that we're inserting as the
        // parent of a new tree, we need to set its treeBaseDuration.
        if (enableProfilerTimer && workInProgress.mode & ProfileMode) {
          // treeBaseDuration is the sum of all the child tree base durations.
          var _treeBaseDuration = 0;
          var _hiddenChild = _primaryChildFragment2.child;
          while (_hiddenChild !== null) {
            _treeBaseDuration += _hiddenChild.treeBaseDuration;
            _hiddenChild = _hiddenChild.sibling;
          }
          _primaryChildFragment2.treeBaseDuration = _treeBaseDuration;
        }

        // Create a fragment from the fallback children, too.
        var _fallbackChildFragment2 = _primaryChildFragment2.sibling = createFiberFromFragment(_nextFallbackChildren2, mode, renderExpirationTime, null);
        _fallbackChildFragment2.effectTag |= Placement;
        child = _primaryChildFragment2;
        _primaryChildFragment2.childExpirationTime = NoWork;
        // Skip the primary children, and continue working on the
        // fallback children.
        next = _fallbackChildFragment2;
        child.return = next.return = workInProgress;
      } else {
        // Still haven't timed out.  Continue rendering the children, like we
        // normally do.
        var _nextPrimaryChildren2 = nextProps.children;
        next = child = reconcileChildFibers(workInProgress, _currentPrimaryChild, _nextPrimaryChildren2, renderExpirationTime);
      }
    }
    workInProgress.stateNode = current$$1.stateNode;
  }

  workInProgress.memoizedState = nextState;
  workInProgress.child = child;
  return next;
}

function updateDehydratedSuspenseComponent(current$$1, workInProgress, renderExpirationTime) {
  if (current$$1 === null) {
    // During the first pass, we'll bail out and not drill into the children.
    // Instead, we'll leave the content in place and try to hydrate it later.
    workInProgress.expirationTime = Never;
    return null;
  }
  // We use childExpirationTime to indicate that a child might depend on context, so if
  // any context has changed, we need to treat is as if the input might have changed.
  var hasContextChanged$$1 = current$$1.childExpirationTime >= renderExpirationTime;
  if (didReceiveUpdate || hasContextChanged$$1) {
    // This boundary has changed since the first render. This means that we are now unable to
    // hydrate it. We might still be able to hydrate it using an earlier expiration time but
    // during this render we can't. Instead, we're going to delete the whole subtree and
    // instead inject a new real Suspense boundary to take its place, which may render content
    // or fallback. The real Suspense boundary will suspend for a while so we have some time
    // to ensure it can produce real content, but all state and pending events will be lost.

    // Detach from the current dehydrated boundary.
    current$$1.alternate = null;
    workInProgress.alternate = null;

    // Insert a deletion in the effect list.
    var returnFiber = workInProgress.return;
    !(returnFiber !== null) ? invariant(false, 'Suspense boundaries are never on the root. This is probably a bug in React.') : void 0;
    var last = returnFiber.lastEffect;
    if (last !== null) {
      last.nextEffect = current$$1;
      returnFiber.lastEffect = current$$1;
    } else {
      returnFiber.firstEffect = returnFiber.lastEffect = current$$1;
    }
    current$$1.nextEffect = null;
    current$$1.effectTag = Deletion;

    // Upgrade this work in progress to a real Suspense component.
    workInProgress.tag = SuspenseComponent;
    workInProgress.stateNode = null;
    workInProgress.memoizedState = null;
    // This is now an insertion.
    workInProgress.effectTag |= Placement;
    // Retry as a real Suspense component.
    return updateSuspenseComponent(null, workInProgress, renderExpirationTime);
  }
  if ((workInProgress.effectTag & DidCapture) === NoEffect) {
    // This is the first attempt.
    reenterHydrationStateFromDehydratedSuspenseInstance(workInProgress);
    var nextProps = workInProgress.pendingProps;
    var nextChildren = nextProps.children;
    workInProgress.child = mountChildFibers(workInProgress, null, nextChildren, renderExpirationTime);
    return workInProgress.child;
  } else {
    // Something suspended. Leave the existing children in place.
    // TODO: In non-concurrent mode, should we commit the nodes we have hydrated so far?
    workInProgress.child = null;
    return null;
  }
}

function updatePortalComponent(current$$1, workInProgress, renderExpirationTime) {
  pushHostContainer(workInProgress, workInProgress.stateNode.containerInfo);
  var nextChildren = workInProgress.pendingProps;
  if (current$$1 === null) {
    // Portals are special because we don't append the children during mount
    // but at commit. Therefore we need to track insertions which the normal
    // flow doesn't do during mount. This doesn't happen at the root because
    // the root always starts with a "current" with a null child.
    // TODO: Consider unifying this with how the root works.
    workInProgress.child = reconcileChildFibers(workInProgress, null, nextChildren, renderExpirationTime);
  } else {
    reconcileChildren(current$$1, workInProgress, nextChildren, renderExpirationTime);
  }
  return workInProgress.child;
}

function updateContextProvider(current$$1, workInProgress, renderExpirationTime) {
  var providerType = workInProgress.type;
  var context = providerType._context;

  var newProps = workInProgress.pendingProps;
  var oldProps = workInProgress.memoizedProps;

  var newValue = newProps.value;

  {
    var providerPropTypes = workInProgress.type.propTypes;

    if (providerPropTypes) {
      checkPropTypes(providerPropTypes, newProps, 'prop', 'Context.Provider', getCurrentFiberStackInDev);
    }
  }

  pushProvider(workInProgress, newValue);

  if (oldProps !== null) {
    var oldValue = oldProps.value;
    var changedBits = calculateChangedBits(context, newValue, oldValue);
    if (changedBits === 0) {
      // No change. Bailout early if children are the same.
      if (oldProps.children === newProps.children && !hasContextChanged()) {
        return bailoutOnAlreadyFinishedWork(current$$1, workInProgress, renderExpirationTime);
      }
    } else {
      // The context value changed. Search for matching consumers and schedule
      // them to update.
      propagateContextChange(workInProgress, context, changedBits, renderExpirationTime);
    }
  }

  var newChildren = newProps.children;
  reconcileChildren(current$$1, workInProgress, newChildren, renderExpirationTime);
  return workInProgress.child;
}

var hasWarnedAboutUsingContextAsConsumer = false;

function updateContextConsumer(current$$1, workInProgress, renderExpirationTime) {
  var context = workInProgress.type;
  // The logic below for Context differs depending on PROD or DEV mode. In
  // DEV mode, we create a separate object for Context.Consumer that acts
  // like a proxy to Context. This proxy object adds unnecessary code in PROD
  // so we use the old behaviour (Context.Consumer references Context) to
  // reduce size and overhead. The separate object references context via
  // a property called "_context", which also gives us the ability to check
  // in DEV mode if this property exists or not and warn if it does not.
  {
    if (context._context === undefined) {
      // This may be because it's a Context (rather than a Consumer).
      // Or it may be because it's older React where they're the same thing.
      // We only want to warn if we're sure it's a new React.
      if (context !== context.Consumer) {
        if (!hasWarnedAboutUsingContextAsConsumer) {
          hasWarnedAboutUsingContextAsConsumer = true;
          warning$1(false, 'Rendering <Context> directly is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Consumer> instead?');
        }
      }
    } else {
      context = context._context;
    }
  }
  var newProps = workInProgress.pendingProps;
  var render = newProps.children;

  {
    !(typeof render === 'function') ? warningWithoutStack$1(false, 'A context consumer was rendered with multiple children, or a child ' + "that isn't a function. A context consumer expects a single child " + 'that is a function. If you did pass a function, make sure there ' + 'is no trailing or leading whitespace around it.') : void 0;
  }

  prepareToReadContext(workInProgress, renderExpirationTime);
  var newValue = readContext(context, newProps.unstable_observedBits);
  var newChildren = void 0;
  {
    ReactCurrentOwner$2.current = workInProgress;
    setCurrentPhase('render');
    newChildren = render(newValue);
    setCurrentPhase(null);
  }

  // React DevTools reads this flag.
  workInProgress.effectTag |= PerformedWork;
  reconcileChildren(current$$1, workInProgress, newChildren, renderExpirationTime);
  return workInProgress.child;
}

function markWorkInProgressReceivedUpdate() {
  didReceiveUpdate = true;
}

function bailoutOnAlreadyFinishedWork(current$$1, workInProgress, renderExpirationTime) {
  cancelWorkTimer(workInProgress);

  if (current$$1 !== null) {
    // Reuse previous context list
    workInProgress.contextDependencies = current$$1.contextDependencies;
  }

  if (enableProfilerTimer) {
    // Don't update "base" render times for bailouts.
    stopProfilerTimerIfRunning(workInProgress);
  }

  // Check if the children have any pending work.
  var childExpirationTime = workInProgress.childExpirationTime;
  if (childExpirationTime < renderExpirationTime) {
    // The children don't have any work either. We can skip them.
    // TODO: Once we add back resuming, we should check if the children are
    // a work-in-progress set. If so, we need to transfer their effects.
    return null;
  } else {
    // This fiber doesn't have work, but its subtree does. Clone the child
    // fibers and continue.
    cloneChildFibers(current$$1, workInProgress);
    return workInProgress.child;
  }
}

function beginWork(current$$1, workInProgress, renderExpirationTime) {
  var updateExpirationTime = workInProgress.expirationTime;

  if (current$$1 !== null) {
    var oldProps = current$$1.memoizedProps;
    var newProps = workInProgress.pendingProps;

    if (oldProps !== newProps || hasContextChanged()) {
      // If props or context changed, mark the fiber as having performed work.
      // This may be unset if the props are determined to be equal later (memo).
      didReceiveUpdate = true;
    } else if (updateExpirationTime < renderExpirationTime) {
      didReceiveUpdate = false;
      // This fiber does not have any pending work. Bailout without entering
      // the begin phase. There's still some bookkeeping we that needs to be done
      // in this optimized path, mostly pushing stuff onto the stack.
      switch (workInProgress.tag) {
        case HostRoot:
          pushHostRootContext(workInProgress);
          resetHydrationState();
          break;
        case HostComponent:
          pushHostContext(workInProgress);
          break;
        case ClassComponent:
          {
            var Component = workInProgress.type;
            if (isContextProvider(Component)) {
              pushContextProvider(workInProgress);
            }
            break;
          }
        case HostPortal:
          pushHostContainer(workInProgress, workInProgress.stateNode.containerInfo);
          break;
        case ContextProvider:
          {
            var newValue = workInProgress.memoizedProps.value;
            pushProvider(workInProgress, newValue);
            break;
          }
        case Profiler:
          if (enableProfilerTimer) {
            workInProgress.effectTag |= Update;
          }
          break;
        case SuspenseComponent:
          {
            var state = workInProgress.memoizedState;
            var didTimeout = state !== null;
            if (didTimeout) {
              // If this boundary is currently timed out, we need to decide
              // whether to retry the primary children, or to skip over it and
              // go straight to the fallback. Check the priority of the primary
              var primaryChildFragment = workInProgress.child;
              var primaryChildExpirationTime = primaryChildFragment.childExpirationTime;
              if (primaryChildExpirationTime !== NoWork && primaryChildExpirationTime >= renderExpirationTime) {
                // The primary children have pending work. Use the normal path
                // to attempt to render the primary children again.
                return updateSuspenseComponent(current$$1, workInProgress, renderExpirationTime);
              } else {
                // The primary children do not have pending work with sufficient
                // priority. Bailout.
                var child = bailoutOnAlreadyFinishedWork(current$$1, workInProgress, renderExpirationTime);
                if (child !== null) {
                  // The fallback children have pending work. Skip over the
                  // primary children and work on the fallback.
                  return child.sibling;
                } else {
                  return null;
                }
              }
            }
            break;
          }
        case DehydratedSuspenseComponent:
          {
            if (enableSuspenseServerRenderer) {
              // We know that this component will suspend again because if it has
              // been unsuspended it has committed as a regular Suspense component.
              // If it needs to be retried, it should have work scheduled on it.
              workInProgress.effectTag |= DidCapture;
              break;
            }
          }
      }
      return bailoutOnAlreadyFinishedWork(current$$1, workInProgress, renderExpirationTime);
    }
  } else {
    didReceiveUpdate = false;
  }

  // Before entering the begin phase, clear the expiration time.
  workInProgress.expirationTime = NoWork;

  switch (workInProgress.tag) {
    case IndeterminateComponent:
      {
        var elementType = workInProgress.elementType;
        return mountIndeterminateComponent(current$$1, workInProgress, elementType, renderExpirationTime);
      }
    case LazyComponent:
      {
        var _elementType = workInProgress.elementType;
        return mountLazyComponent(current$$1, workInProgress, _elementType, updateExpirationTime, renderExpirationTime);
      }
    case FunctionComponent:
      {
        var _Component = workInProgress.type;
        var unresolvedProps = workInProgress.pendingProps;
        var resolvedProps = workInProgress.elementType === _Component ? unresolvedProps : resolveDefaultProps(_Component, unresolvedProps);
        return updateFunctionComponent(current$$1, workInProgress, _Component, resolvedProps, renderExpirationTime);
      }
    case ClassComponent:
      {
        var _Component2 = workInProgress.type;
        var _unresolvedProps = workInProgress.pendingProps;
        var _resolvedProps = workInProgress.elementType === _Component2 ? _unresolvedProps : resolveDefaultProps(_Component2, _unresolvedProps);
        return updateClassComponent(current$$1, workInProgress, _Component2, _resolvedProps, renderExpirationTime);
      }
    case HostRoot:
      return updateHostRoot(current$$1, workInProgress, renderExpirationTime);
    case HostComponent:
      return updateHostComponent(current$$1, workInProgress, renderExpirationTime);
    case HostText:
      return updateHostText(current$$1, workInProgress);
    case SuspenseComponent:
      return updateSuspenseComponent(current$$1, workInProgress, renderExpirationTime);
    case HostPortal:
      return updatePortalComponent(current$$1, workInProgress, renderExpirationTime);
    case ForwardRef:
      {
        var type = workInProgress.type;
        var _unresolvedProps2 = workInProgress.pendingProps;
        var _resolvedProps2 = workInProgress.elementType === type ? _unresolvedProps2 : resolveDefaultProps(type, _unresolvedProps2);
        return updateForwardRef(current$$1, workInProgress, type, _resolvedProps2, renderExpirationTime);
      }
    case Fragment:
      return updateFragment(current$$1, workInProgress, renderExpirationTime);
    case Mode:
      return updateMode(current$$1, workInProgress, renderExpirationTime);
    case Profiler:
      return updateProfiler(current$$1, workInProgress, renderExpirationTime);
    case ContextProvider:
      return updateContextProvider(current$$1, workInProgress, renderExpirationTime);
    case ContextConsumer:
      return updateContextConsumer(current$$1, workInProgress, renderExpirationTime);
    case MemoComponent:
      {
        var _type2 = workInProgress.type;
        var _unresolvedProps3 = workInProgress.pendingProps;
        // Resolve outer props first, then resolve inner props.
        var _resolvedProps3 = resolveDefaultProps(_type2, _unresolvedProps3);
        {
          if (workInProgress.type !== workInProgress.elementType) {
            var outerPropTypes = _type2.propTypes;
            if (outerPropTypes) {
              checkPropTypes(outerPropTypes, _resolvedProps3, // Resolved for outer only
              'prop', getComponentName(_type2), getCurrentFiberStackInDev);
            }
          }
        }
        _resolvedProps3 = resolveDefaultProps(_type2.type, _resolvedProps3);
        return updateMemoComponent(current$$1, workInProgress, _type2, _resolvedProps3, updateExpirationTime, renderExpirationTime);
      }
    case SimpleMemoComponent:
      {
        return updateSimpleMemoComponent(current$$1, workInProgress, workInProgress.type, workInProgress.pendingProps, updateExpirationTime, renderExpirationTime);
      }
    case IncompleteClassComponent:
      {
        var _Component3 = workInProgress.type;
        var _unresolvedProps4 = workInProgress.pendingProps;
        var _resolvedProps4 = workInProgress.elementType === _Component3 ? _unresolvedProps4 : resolveDefaultProps(_Component3, _unresolvedProps4);
        return mountIncompleteClassComponent(current$$1, workInProgress, _Component3, _resolvedProps4, renderExpirationTime);
      }
    case DehydratedSuspenseComponent:
      {
        if (enableSuspenseServerRenderer) {
          return updateDehydratedSuspenseComponent(current$$1, workInProgress, renderExpirationTime);
        }
        break;
      }
  }
  invariant(false, 'Unknown unit of work tag. This error is likely caused by a bug in React. Please file an issue.');
}

var valueCursor = createCursor(null);

var rendererSigil = void 0;
{
  // Use this to detect multiple renderers using the same context
  rendererSigil = {};
}

var currentlyRenderingFiber = null;
var lastContextDependency = null;
var lastContextWithAllBitsObserved = null;

var isDisallowedContextReadInDEV = false;

function resetContextDependences() {
  // This is called right before React yields execution, to ensure `readContext`
  // cannot be called outside the render phase.
  currentlyRenderingFiber = null;
  lastContextDependency = null;
  lastContextWithAllBitsObserved = null;
  {
    isDisallowedContextReadInDEV = false;
  }
}

function enterDisallowedContextReadInDEV() {
  {
    isDisallowedContextReadInDEV = true;
  }
}

function exitDisallowedContextReadInDEV() {
  {
    isDisallowedContextReadInDEV = false;
  }
}

function pushProvider(providerFiber, nextValue) {
  var context = providerFiber.type._context;

  if (isPrimaryRenderer) {
    push(valueCursor, context._currentValue, providerFiber);

    context._currentValue = nextValue;
    {
      !(context._currentRenderer === undefined || context._currentRenderer === null || context._currentRenderer === rendererSigil) ? warningWithoutStack$1(false, 'Detected multiple renderers concurrently rendering the ' + 'same context provider. This is currently unsupported.') : void 0;
      context._currentRenderer = rendererSigil;
    }
  } else {
    push(valueCursor, context._currentValue2, providerFiber);

    context._currentValue2 = nextValue;
    {
      !(context._currentRenderer2 === undefined || context._currentRenderer2 === null || context._currentRenderer2 === rendererSigil) ? warningWithoutStack$1(false, 'Detected multiple renderers concurrently rendering the ' + 'same context provider. This is currently unsupported.') : void 0;
      context._currentRenderer2 = rendererSigil;
    }
  }
}

function popProvider(providerFiber) {
  var currentValue = valueCursor.current;

  pop(valueCursor, providerFiber);

  var context = providerFiber.type._context;
  if (isPrimaryRenderer) {
    context._currentValue = currentValue;
  } else {
    context._currentValue2 = currentValue;
  }
}

function calculateChangedBits(context, newValue, oldValue) {
  if (is(oldValue, newValue)) {
    // No change
    return 0;
  } else {
    var changedBits = typeof context._calculateChangedBits === 'function' ? context._calculateChangedBits(oldValue, newValue) : maxSigned31BitInt;

    {
      !((changedBits & maxSigned31BitInt) === changedBits) ? warning$1(false, 'calculateChangedBits: Expected the return value to be a ' + '31-bit integer. Instead received: %s', changedBits) : void 0;
    }
    return changedBits | 0;
  }
}

function scheduleWorkOnParentPath(parent, renderExpirationTime) {
  // Update the child expiration time of all the ancestors, including
  // the alternates.
  var node = parent;
  while (node !== null) {
    var alternate = node.alternate;
    if (node.childExpirationTime < renderExpirationTime) {
      node.childExpirationTime = renderExpirationTime;
      if (alternate !== null && alternate.childExpirationTime < renderExpirationTime) {
        alternate.childExpirationTime = renderExpirationTime;
      }
    } else if (alternate !== null && alternate.childExpirationTime < renderExpirationTime) {
      alternate.childExpirationTime = renderExpirationTime;
    } else {
      // Neither alternate was updated, which means the rest of the
      // ancestor path already has sufficient priority.
      break;
    }
    node = node.return;
  }
}

function propagateContextChange(workInProgress, context, changedBits, renderExpirationTime) {
  var fiber = workInProgress.child;
  if (fiber !== null) {
    // Set the return pointer of the child to the work-in-progress fiber.
    fiber.return = workInProgress;
  }
  while (fiber !== null) {
    var nextFiber = void 0;

    // Visit this fiber.
    var list = fiber.contextDependencies;
    if (list !== null) {
      nextFiber = fiber.child;

      var dependency = list.first;
      while (dependency !== null) {
        // Check if the context matches.
        if (dependency.context === context && (dependency.observedBits & changedBits) !== 0) {
          // Match! Schedule an update on this fiber.

          if (fiber.tag === ClassComponent) {
            // Schedule a force update on the work-in-progress.
            var update = createUpdate(renderExpirationTime);
            update.tag = ForceUpdate;
            // TODO: Because we don't have a work-in-progress, this will add the
            // update to the current fiber, too, which means it will persist even if
            // this render is thrown away. Since it's a race condition, not sure it's
            // worth fixing.
            enqueueUpdate(fiber, update);
          }

          if (fiber.expirationTime < renderExpirationTime) {
            fiber.expirationTime = renderExpirationTime;
          }
          var alternate = fiber.alternate;
          if (alternate !== null && alternate.expirationTime < renderExpirationTime) {
            alternate.expirationTime = renderExpirationTime;
          }

          scheduleWorkOnParentPath(fiber.return, renderExpirationTime);

          // Mark the expiration time on the list, too.
          if (list.expirationTime < renderExpirationTime) {
            list.expirationTime = renderExpirationTime;
          }

          // Since we already found a match, we can stop traversing the
          // dependency list.
          break;
        }
        dependency = dependency.next;
      }
    } else if (fiber.tag === ContextProvider) {
      // Don't scan deeper if this is a matching provider
      nextFiber = fiber.type === workInProgress.type ? null : fiber.child;
    } else if (enableSuspenseServerRenderer && fiber.tag === DehydratedSuspenseComponent) {
      // If a dehydrated suspense component is in this subtree, we don't know
      // if it will have any context consumers in it. The best we can do is
      // mark it as having updates on its children.
      if (fiber.expirationTime < renderExpirationTime) {
        fiber.expirationTime = renderExpirationTime;
      }
      var _alternate = fiber.alternate;
      if (_alternate !== null && _alternate.expirationTime < renderExpirationTime) {
        _alternate.expirationTime = renderExpirationTime;
      }
      // This is intentionally passing this fiber as the parent
      // because we want to schedule this fiber as having work
      // on its children. We'll use the childExpirationTime on
      // this fiber to indicate that a context has changed.
      scheduleWorkOnParentPath(fiber, renderExpirationTime);
      nextFiber = fiber.sibling;
    } else {
      // Traverse down.
      nextFiber = fiber.child;
    }

    if (nextFiber !== null) {
      // Set the return pointer of the child to the work-in-progress fiber.
      nextFiber.return = fiber;
    } else {
      // No child. Traverse to next sibling.
      nextFiber = fiber;
      while (nextFiber !== null) {
        if (nextFiber === workInProgress) {
          // We're back to the root of this subtree. Exit.
          nextFiber = null;
          break;
        }
        var sibling = nextFiber.sibling;
        if (sibling !== null) {
          // Set the return pointer of the sibling to the work-in-progress fiber.
          sibling.return = nextFiber.return;
          nextFiber = sibling;
          break;
        }
        // No more siblings. Traverse up.
        nextFiber = nextFiber.return;
      }
    }
    fiber = nextFiber;
  }
}

function prepareToReadContext(workInProgress, renderExpirationTime) {
  currentlyRenderingFiber = workInProgress;
  lastContextDependency = null;
  lastContextWithAllBitsObserved = null;

  var currentDependencies = workInProgress.contextDependencies;
  if (currentDependencies !== null && currentDependencies.expirationTime >= renderExpirationTime) {
    // Context list has a pending update. Mark that this fiber performed work.
    markWorkInProgressReceivedUpdate();
  }

  // Reset the work-in-progress list
  workInProgress.contextDependencies = null;
}

function readContext(context, observedBits) {
  {
    // This warning would fire if you read context inside a Hook like useMemo.
    // Unlike the class check below, it's not enforced in production for perf.
    !!isDisallowedContextReadInDEV ? warning$1(false, 'Context can only be read while React is rendering. ' + 'In classes, you can read it in the render method or getDerivedStateFromProps. ' + 'In function components, you can read it directly in the function body, but not ' + 'inside Hooks like useReducer() or useMemo().') : void 0;
  }

  if (lastContextWithAllBitsObserved === context) {
    // Nothing to do. We already observe everything in this context.
  } else if (observedBits === false || observedBits === 0) {
    // Do not observe any updates.
  } else {
    var resolvedObservedBits = void 0; // Avoid deopting on observable arguments or heterogeneous types.
    if (typeof observedBits !== 'number' || observedBits === maxSigned31BitInt) {
      // Observe all updates.
      lastContextWithAllBitsObserved = context;
      resolvedObservedBits = maxSigned31BitInt;
    } else {
      resolvedObservedBits = observedBits;
    }

    var contextItem = {
      context: context,
      observedBits: resolvedObservedBits,
      next: null
    };

    if (lastContextDependency === null) {
      !(currentlyRenderingFiber !== null) ? invariant(false, 'Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().') : void 0;

      // This is the first dependency for this component. Create a new list.
      lastContextDependency = contextItem;
      currentlyRenderingFiber.contextDependencies = {
        first: contextItem,
        expirationTime: NoWork
      };
    } else {
      // Append a new context item.
      lastContextDependency = lastContextDependency.next = contextItem;
    }
  }
  return isPrimaryRenderer ? context._currentValue : context._currentValue2;
}

// UpdateQueue is a linked list of prioritized updates.
//
// Like fibers, update queues come in pairs: a current queue, which represents
// the visible state of the screen, and a work-in-progress queue, which can be
// mutated and processed asynchronously before it is committed — a form of
// double buffering. If a work-in-progress render is discarded before finishing,
// we create a new work-in-progress by cloning the current queue.
//
// Both queues share a persistent, singly-linked list structure. To schedule an
// update, we append it to the end of both queues. Each queue maintains a
// pointer to first update in the persistent list that hasn't been processed.
// The work-in-progress pointer always has a position equal to or greater than
// the current queue, since we always work on that one. The current queue's
// pointer is only updated during the commit phase, when we swap in the
// work-in-progress.
//
// For example:
//
//   Current pointer:           A - B - C - D - E - F
//   Work-in-progress pointer:              D - E - F
//                                          ^
//                                          The work-in-progress queue has
//                                          processed more updates than current.
//
// The reason we append to both queues is because otherwise we might drop
// updates without ever processing them. For example, if we only add updates to
// the work-in-progress queue, some updates could be lost whenever a work-in
// -progress render restarts by cloning from current. Similarly, if we only add
// updates to the current queue, the updates will be lost whenever an already
// in-progress queue commits and swaps with the current queue. However, by
// adding to both queues, we guarantee that the update will be part of the next
// work-in-progress. (And because the work-in-progress queue becomes the
// current queue once it commits, there's no danger of applying the same
// update twice.)
//
// Prioritization
// --------------
//
// Updates are not sorted by priority, but by insertion; new updates are always
// appended to the end of the list.
//
// The priority is still important, though. When processing the update queue
// during the render phase, only the updates with sufficient priority are
// included in the result. If we skip an update because it has insufficient
// priority, it remains in the queue to be processed later, during a lower
// priority render. Crucially, all updates subsequent to a skipped update also
// remain in the queue *regardless of their priority*. That means high priority
// updates are sometimes processed twice, at two separate priorities. We also
// keep track of a base state, that represents the state before the first
// update in the queue is applied.
//
// For example:
//
//   Given a base state of '', and the following queue of updates
//
//     A1 - B2 - C1 - D2
//
//   where the number indicates the priority, and the update is applied to the
//   previous state by appending a letter, React will process these updates as
//   two separate renders, one per distinct priority level:
//
//   First render, at priority 1:
//     Base state: ''
//     Updates: [A1, C1]
//     Result state: 'AC'
//
//   Second render, at priority 2:
//     Base state: 'A'            <-  The base state does not include C1,
//                                    because B2 was skipped.
//     Updates: [B2, C1, D2]      <-  C1 was rebased on top of B2
//     Result state: 'ABCD'
//
// Because we process updates in insertion order, and rebase high priority
// updates when preceding updates are skipped, the final result is deterministic
// regardless of priority. Intermediate state may vary according to system
// resources, but the final state is always the same.

var UpdateState = 0;
var ReplaceState = 1;
var ForceUpdate = 2;
var CaptureUpdate = 3;

// Global state that is reset at the beginning of calling `processUpdateQueue`.
// It should only be read right after calling `processUpdateQueue`, via
// `checkHasForceUpdateAfterProcessing`.
var hasForceUpdate = false;

var didWarnUpdateInsideUpdate = void 0;
var currentlyProcessingQueue = void 0;
var resetCurrentlyProcessingQueue = void 0;
{
  didWarnUpdateInsideUpdate = false;
  currentlyProcessingQueue = null;
  resetCurrentlyProcessingQueue = function () {
    currentlyProcessingQueue = null;
  };
}

function createUpdateQueue(baseState) {
  var queue = {
    baseState: baseState,
    firstUpdate: null,
    lastUpdate: null,
    firstCapturedUpdate: null,
    lastCapturedUpdate: null,
    firstEffect: null,
    lastEffect: null,
    firstCapturedEffect: null,
    lastCapturedEffect: null
  };
  return queue;
}

function cloneUpdateQueue(currentQueue) {
  var queue = {
    baseState: currentQueue.baseState,
    firstUpdate: currentQueue.firstUpdate,
    lastUpdate: currentQueue.lastUpdate,

    // TODO: With resuming, if we bail out and resuse the child tree, we should
    // keep these effects.
    firstCapturedUpdate: null,
    lastCapturedUpdate: null,

    firstEffect: null,
    lastEffect: null,

    firstCapturedEffect: null,
    lastCapturedEffect: null
  };
  return queue;
}

function createUpdate(expirationTime) {
  return {
    expirationTime: expirationTime,

    tag: UpdateState,
    payload: null,
    callback: null,

    next: null,
    nextEffect: null
  };
}

function appendUpdateToQueue(queue, update) {
  // Append the update to the end of the list.
  if (queue.lastUpdate === null) {
    // Queue is empty
    queue.firstUpdate = queue.lastUpdate = update;
  } else {
    queue.lastUpdate.next = update;
    queue.lastUpdate = update;
  }
}

function enqueueUpdate(fiber, update) {
  // Update queues are created lazily.
  var alternate = fiber.alternate;
  var queue1 = void 0;
  var queue2 = void 0;
  if (alternate === null) {
    // There's only one fiber.
    queue1 = fiber.updateQueue;
    queue2 = null;
    if (queue1 === null) {
      queue1 = fiber.updateQueue = createUpdateQueue(fiber.memoizedState);
    }
  } else {
    // There are two owners.
    queue1 = fiber.updateQueue;
    queue2 = alternate.updateQueue;
    if (queue1 === null) {
      if (queue2 === null) {
        // Neither fiber has an update queue. Create new ones.
        queue1 = fiber.updateQueue = createUpdateQueue(fiber.memoizedState);
        queue2 = alternate.updateQueue = createUpdateQueue(alternate.memoizedState);
      } else {
        // Only one fiber has an update queue. Clone to create a new one.
        queue1 = fiber.updateQueue = cloneUpdateQueue(queue2);
      }
    } else {
      if (queue2 === null) {
        // Only one fiber has an update queue. Clone to create a new one.
        queue2 = alternate.updateQueue = cloneUpdateQueue(queue1);
      } else {
        // Both owners have an update queue.
      }
    }
  }
  if (queue2 === null || queue1 === queue2) {
    // There's only a single queue.
    appendUpdateToQueue(queue1, update);
  } else {
    // There are two queues. We need to append the update to both queues,
    // while accounting for the persistent structure of the list — we don't
    // want the same update to be added multiple times.
    if (queue1.lastUpdate === null || queue2.lastUpdate === null) {
      // One of the queues is not empty. We must add the update to both queues.
      appendUpdateToQueue(queue1, update);
      appendUpdateToQueue(queue2, update);
    } else {
      // Both queues are non-empty. The last update is the same in both lists,
      // because of structural sharing. So, only append to one of the lists.
      appendUpdateToQueue(queue1, update);
      // But we still need to update the `lastUpdate` pointer of queue2.
      queue2.lastUpdate = update;
    }
  }

  {
    if (fiber.tag === ClassComponent && (currentlyProcessingQueue === queue1 || queue2 !== null && currentlyProcessingQueue === queue2) && !didWarnUpdateInsideUpdate) {
      warningWithoutStack$1(false, 'An update (setState, replaceState, or forceUpdate) was scheduled ' + 'from inside an update function. Update functions should be pure, ' + 'with zero side-effects. Consider using componentDidUpdate or a ' + 'callback.');
      didWarnUpdateInsideUpdate = true;
    }
  }
}

function enqueueCapturedUpdate(workInProgress, update) {
  // Captured updates go into a separate list, and only on the work-in-
  // progress queue.
  var workInProgressQueue = workInProgress.updateQueue;
  if (workInProgressQueue === null) {
    workInProgressQueue = workInProgress.updateQueue = createUpdateQueue(workInProgress.memoizedState);
  } else {
    // TODO: I put this here rather than createWorkInProgress so that we don't
    // clone the queue unnecessarily. There's probably a better way to
    // structure this.
    workInProgressQueue = ensureWorkInProgressQueueIsAClone(workInProgress, workInProgressQueue);
  }

  // Append the update to the end of the list.
  if (workInProgressQueue.lastCapturedUpdate === null) {
    // This is the first render phase update
    workInProgressQueue.firstCapturedUpdate = workInProgressQueue.lastCapturedUpdate = update;
  } else {
    workInProgressQueue.lastCapturedUpdate.next = update;
    workInProgressQueue.lastCapturedUpdate = update;
  }
}

function ensureWorkInProgressQueueIsAClone(workInProgress, queue) {
  var current = workInProgress.alternate;
  if (current !== null) {
    // If the work-in-progress queue is equal to the current queue,
    // we need to clone it first.
    if (queue === current.updateQueue) {
      queue = workInProgress.updateQueue = cloneUpdateQueue(queue);
    }
  }
  return queue;
}

function getStateFromUpdate(workInProgress, queue, update, prevState, nextProps, instance) {
  switch (update.tag) {
    case ReplaceState:
      {
        var _payload = update.payload;
        if (typeof _payload === 'function') {
          // Updater function
          {
            enterDisallowedContextReadInDEV();
            if (debugRenderPhaseSideEffects || debugRenderPhaseSideEffectsForStrictMode && workInProgress.mode & StrictMode) {
              _payload.call(instance, prevState, nextProps);
            }
          }
          var nextState = _payload.call(instance, prevState, nextProps);
          {
            exitDisallowedContextReadInDEV();
          }
          return nextState;
        }
        // State object
        return _payload;
      }
    case CaptureUpdate:
      {
        workInProgress.effectTag = workInProgress.effectTag & ~ShouldCapture | DidCapture;
      }
    // Intentional fallthrough
    case UpdateState:
      {
        var _payload2 = update.payload;
        var partialState = void 0;
        if (typeof _payload2 === 'function') {
          // Updater function
          {
            enterDisallowedContextReadInDEV();
            if (debugRenderPhaseSideEffects || debugRenderPhaseSideEffectsForStrictMode && workInProgress.mode & StrictMode) {
              _payload2.call(instance, prevState, nextProps);
            }
          }
          partialState = _payload2.call(instance, prevState, nextProps);
          {
            exitDisallowedContextReadInDEV();
          }
        } else {
          // Partial state object
          partialState = _payload2;
        }
        if (partialState === null || partialState === undefined) {
          // Null and undefined are treated as no-ops.
          return prevState;
        }
        // Merge the partial state and the previous state.
        return _assign({}, prevState, partialState);
      }
    case ForceUpdate:
      {
        hasForceUpdate = true;
        return prevState;
      }
  }
  return prevState;
}

function processUpdateQueue(workInProgress, queue, props, instance, renderExpirationTime) {
  hasForceUpdate = false;

  queue = ensureWorkInProgressQueueIsAClone(workInProgress, queue);

  {
    currentlyProcessingQueue = queue;
  }

  // These values may change as we process the queue.
  var newBaseState = queue.baseState;
  var newFirstUpdate = null;
  var newExpirationTime = NoWork;

  // Iterate through the list of updates to compute the result.
  var update = queue.firstUpdate;
  var resultState = newBaseState;
  while (update !== null) {
    var updateExpirationTime = update.expirationTime;
    if (updateExpirationTime < renderExpirationTime) {
      // This update does not have sufficient priority. Skip it.
      if (newFirstUpdate === null) {
        // This is the first skipped update. It will be the first update in
        // the new list.
        newFirstUpdate = update;
        // Since this is the first update that was skipped, the current result
        // is the new base state.
        newBaseState = resultState;
      }
      // Since this update will remain in the list, update the remaining
      // expiration time.
      if (newExpirationTime < updateExpirationTime) {
        newExpirationTime = updateExpirationTime;
      }
    } else {
      // This update does have sufficient priority. Process it and compute
      // a new result.
      resultState = getStateFromUpdate(workInProgress, queue, update, resultState, props, instance);
      var _callback = update.callback;
      if (_callback !== null) {
        workInProgress.effectTag |= Callback;
        // Set this to null, in case it was mutated during an aborted render.
        update.nextEffect = null;
        if (queue.lastEffect === null) {
          queue.firstEffect = queue.lastEffect = update;
        } else {
          queue.lastEffect.nextEffect = update;
          queue.lastEffect = update;
        }
      }
    }
    // Continue to the next update.
    update = update.next;
  }

  // Separately, iterate though the list of captured updates.
  var newFirstCapturedUpdate = null;
  update = queue.firstCapturedUpdate;
  while (update !== null) {
    var _updateExpirationTime = update.expirationTime;
    if (_updateExpirationTime < renderExpirationTime) {
      // This update does not have sufficient priority. Skip it.
      if (newFirstCapturedUpdate === null) {
        // This is the first skipped captured update. It will be the first
        // update in the new list.
        newFirstCapturedUpdate = update;
        // If this is the first update that was skipped, the current result is
        // the new base state.
        if (newFirstUpdate === null) {
          newBaseState = resultState;
        }
      }
      // Since this update will remain in the list, update the remaining
      // expiration time.
      if (newExpirationTime < _updateExpirationTime) {
        newExpirationTime = _updateExpirationTime;
      }
    } else {
      // This update does have sufficient priority. Process it and compute
      // a new result.
      resultState = getStateFromUpdate(workInProgress, queue, update, resultState, props, instance);
      var _callback2 = update.callback;
      if (_callback2 !== null) {
        workInProgress.effectTag |= Callback;
        // Set this to null, in case it was mutated during an aborted render.
        update.nextEffect = null;
        if (queue.lastCapturedEffect === null) {
          queue.firstCapturedEffect = queue.lastCapturedEffect = update;
        } else {
          queue.lastCapturedEffect.nextEffect = update;
          queue.lastCapturedEffect = update;
        }
      }
    }
    update = update.next;
  }

  if (newFirstUpdate === null) {
    queue.lastUpdate = null;
  }
  if (newFirstCapturedUpdate === null) {
    queue.lastCapturedUpdate = null;
  } else {
    workInProgress.effectTag |= Callback;
  }
  if (newFirstUpdate === null && newFirstCapturedUpdate === null) {
    // We processed every update, without skipping. That means the new base
    // state is the same as the result state.
    newBaseState = resultState;
  }

  queue.baseState = newBaseState;
  queue.firstUpdate = newFirstUpdate;
  queue.firstCapturedUpdate = newFirstCapturedUpdate;

  // Set the remaining expiration time to be whatever is remaining in the queue.
  // This should be fine because the only two other things that contribute to
  // expiration time are props and context. We're already in the middle of the
  // begin phase by the time we start processing the queue, so we've already
  // dealt with the props. Context in components that specify
  // shouldComponentUpdate is tricky; but we'll have to account for
  // that regardless.
  workInProgress.expirationTime = newExpirationTime;
  workInProgress.memoizedState = resultState;

  {
    currentlyProcessingQueue = null;
  }
}

function callCallback(callback, context) {
  !(typeof callback === 'function') ? invariant(false, 'Invalid argument passed as callback. Expected a function. Instead received: %s', callback) : void 0;
  callback.call(context);
}

function resetHasForceUpdateBeforeProcessing() {
  hasForceUpdate = false;
}

function checkHasForceUpdateAfterProcessing() {
  return hasForceUpdate;
}

function commitUpdateQueue(finishedWork, finishedQueue, instance, renderExpirationTime) {
  // If the finished render included captured updates, and there are still
  // lower priority updates left over, we need to keep the captured updates
  // in the queue so that they are rebased and not dropped once we process the
  // queue again at the lower priority.
  if (finishedQueue.firstCapturedUpdate !== null) {
    // Join the captured update list to the end of the normal list.
    if (finishedQueue.lastUpdate !== null) {
      finishedQueue.lastUpdate.next = finishedQueue.firstCapturedUpdate;
      finishedQueue.lastUpdate = finishedQueue.lastCapturedUpdate;
    }
    // Clear the list of captured updates.
    finishedQueue.firstCapturedUpdate = finishedQueue.lastCapturedUpdate = null;
  }

  // Commit the effects
  commitUpdateEffects(finishedQueue.firstEffect, instance);
  finishedQueue.firstEffect = finishedQueue.lastEffect = null;

  commitUpdateEffects(finishedQueue.firstCapturedEffect, instance);
  finishedQueue.firstCapturedEffect = finishedQueue.lastCapturedEffect = null;
}

function commitUpdateEffects(effect, instance) {
  while (effect !== null) {
    var _callback3 = effect.callback;
    if (_callback3 !== null) {
      effect.callback = null;
      callCallback(_callback3, instance);
    }
    effect = effect.nextEffect;
  }
}

function createCapturedValue(value, source) {
  // If the value is an error, call this function immediately after it is thrown
  // so the stack is accurate.
  return {
    value: value,
    source: source,
    stack: getStackByFiberInDevAndProd(source)
  };
}

function markUpdate(workInProgress) {
  // Tag the fiber with an update effect. This turns a Placement into
  // a PlacementAndUpdate.
  workInProgress.effectTag |= Update;
}

function markRef$1(workInProgress) {
  workInProgress.effectTag |= Ref;
}

var appendAllChildren = void 0;
var updateHostContainer = void 0;
var updateHostComponent$1 = void 0;
var updateHostText$1 = void 0;
if (supportsMutation) {
  // Mutation mode

  appendAllChildren = function (parent, workInProgress, needsVisibilityToggle, isHidden) {
    // We only have the top Fiber that was created but we need recurse down its
    // children to find all the terminal nodes.
    var node = workInProgress.child;
    while (node !== null) {
      if (node.tag === HostComponent || node.tag === HostText) {
        appendInitialChild(parent, node.stateNode);
      } else if (node.tag === HostPortal) {
        // If we have a portal child, then we don't want to traverse
        // down its children. Instead, we'll get insertions from each child in
        // the portal directly.
      } else if (node.child !== null) {
        node.child.return = node;
        node = node.child;
        continue;
      }
      if (node === workInProgress) {
        return;
      }
      while (node.sibling === null) {
        if (node.return === null || node.return === workInProgress) {
          return;
        }
        node = node.return;
      }
      node.sibling.return = node.return;
      node = node.sibling;
    }
  };

  updateHostContainer = function (workInProgress) {
    // Noop
  };
  updateHostComponent$1 = function (current, workInProgress, type, newProps, rootContainerInstance) {
    // If we have an alternate, that means this is an update and we need to
    // schedule a side-effect to do the updates.
    var oldProps = current.memoizedProps;
    if (oldProps === newProps) {
      // In mutation mode, this is sufficient for a bailout because
      // we won't touch this node even if children changed.
      return;
    }

    // If we get updated because one of our children updated, we don't
    // have newProps so we'll have to reuse them.
    // TODO: Split the update API as separate for the props vs. children.
    // Even better would be if children weren't special cased at all tho.
    var instance = workInProgress.stateNode;
    var currentHostContext = getHostContext();
    // TODO: Experiencing an error where oldProps is null. Suggests a host
    // component is hitting the resume path. Figure out why. Possibly
    // related to `hidden`.
    var updatePayload = prepareUpdate(instance, type, oldProps, newProps, rootContainerInstance, currentHostContext);
    // TODO: Type this specific to this type of component.
    workInProgress.updateQueue = updatePayload;
    // If the update payload indicates that there is a change or if there
    // is a new ref we mark this as an update. All the work is done in commitWork.
    if (updatePayload) {
      markUpdate(workInProgress);
    }
  };
  updateHostText$1 = function (current, workInProgress, oldText, newText) {
    // If the text differs, mark it as an update. All the work in done in commitWork.
    if (oldText !== newText) {
      markUpdate(workInProgress);
    }
  };
} else if (supportsPersistence) {
  // Persistent host tree mode

  appendAllChildren = function (parent, workInProgress, needsVisibilityToggle, isHidden) {
    // We only have the top Fiber that was created but we need recurse down its
    // children to find all the terminal nodes.
    var node = workInProgress.child;
    while (node !== null) {
      // eslint-disable-next-line no-labels
      branches: if (node.tag === HostComponent) {
        var instance = node.stateNode;
        if (needsVisibilityToggle) {
          var props = node.memoizedProps;
          var type = node.type;
          if (isHidden) {
            // This child is inside a timed out tree. Hide it.
            instance = cloneHiddenInstance(instance, type, props, node);
          } else {
            // This child was previously inside a timed out tree. If it was not
            // updated during this render, it may need to be unhidden. Clone
            // again to be sure.
            instance = cloneUnhiddenInstance(instance, type, props, node);
          }
          node.stateNode = instance;
        }
        appendInitialChild(parent, instance);
      } else if (node.tag === HostText) {
        var _instance = node.stateNode;
        if (needsVisibilityToggle) {
          var text = node.memoizedProps;
          var rootContainerInstance = getRootHostContainer();
          var currentHostContext = getHostContext();
          if (isHidden) {
            _instance = createHiddenTextInstance(text, rootContainerInstance, currentHostContext, workInProgress);
          } else {
            _instance = createTextInstance(text, rootContainerInstance, currentHostContext, workInProgress);
          }
          node.stateNode = _instance;
        }
        appendInitialChild(parent, _instance);
      } else if (node.tag === HostPortal) {
        // If we have a portal child, then we don't want to traverse
        // down its children. Instead, we'll get insertions from each child in
        // the portal directly.
      } else if (node.tag === SuspenseComponent) {
        var current = node.alternate;
        if (current !== null) {
          var oldState = current.memoizedState;
          var newState = node.memoizedState;
          var oldIsHidden = oldState !== null;
          var newIsHidden = newState !== null;
          if (oldIsHidden !== newIsHidden) {
            // The placeholder either just timed out or switched back to the normal
            // children after having previously timed out. Toggle the visibility of
            // the direct host children.
            var primaryChildParent = newIsHidden ? node.child : node;
            if (primaryChildParent !== null) {
              appendAllChildren(parent, primaryChildParent, true, newIsHidden);
            }
            // eslint-disable-next-line no-labels
            break branches;
          }
        }
        if (node.child !== null) {
          // Continue traversing like normal
          node.child.return = node;
          node = node.child;
          continue;
        }
      } else if (node.child !== null) {
        node.child.return = node;
        node = node.child;
        continue;
      }
      // $FlowFixMe This is correct but Flow is confused by the labeled break.
      node = node;
      if (node === workInProgress) {
        return;
      }
      while (node.sibling === null) {
        if (node.return === null || node.return === workInProgress) {
          return;
        }
        node = node.return;
      }
      node.sibling.return = node.return;
      node = node.sibling;
    }
  };

  // An unfortunate fork of appendAllChildren because we have two different parent types.
  var appendAllChildrenToContainer = function (containerChildSet, workInProgress, needsVisibilityToggle, isHidden) {
    // We only have the top Fiber that was created but we need recurse down its
    // children to find all the terminal nodes.
    var node = workInProgress.child;
    while (node !== null) {
      // eslint-disable-next-line no-labels
      branches: if (node.tag === HostComponent) {
        var instance = node.stateNode;
        if (needsVisibilityToggle) {
          var props = node.memoizedProps;
          var type = node.type;
          if (isHidden) {
            // This child is inside a timed out tree. Hide it.
            instance = cloneHiddenInstance(instance, type, props, node);
          } else {
            // This child was previously inside a timed out tree. If it was not
            // updated during this render, it may need to be unhidden. Clone
            // again to be sure.
            instance = cloneUnhiddenInstance(instance, type, props, node);
          }
          node.stateNode = instance;
        }
        appendChildToContainerChildSet(containerChildSet, instance);
      } else if (node.tag === HostText) {
        var _instance2 = node.stateNode;
        if (needsVisibilityToggle) {
          var text = node.memoizedProps;
          var rootContainerInstance = getRootHostContainer();
          var currentHostContext = getHostContext();
          if (isHidden) {
            _instance2 = createHiddenTextInstance(text, rootContainerInstance, currentHostContext, workInProgress);
          } else {
            _instance2 = createTextInstance(text, rootContainerInstance, currentHostContext, workInProgress);
          }
          node.stateNode = _instance2;
        }
        appendChildToContainerChildSet(containerChildSet, _instance2);
      } else if (node.tag === HostPortal) {
        // If we have a portal child, then we don't want to traverse
        // down its children. Instead, we'll get insertions from each child in
        // the portal directly.
      } else if (node.tag === SuspenseComponent) {
        var current = node.alternate;
        if (current !== null) {
          var oldState = current.memoizedState;
          var newState = node.memoizedState;
          var oldIsHidden = oldState !== null;
          var newIsHidden = newState !== null;
          if (oldIsHidden !== newIsHidden) {
            // The placeholder either just timed out or switched back to the normal
            // children after having previously timed out. Toggle the visibility of
            // the direct host children.
            var primaryChildParent = newIsHidden ? node.child : node;
            if (primaryChildParent !== null) {
              appendAllChildrenToContainer(containerChildSet, primaryChildParent, true, newIsHidden);
            }
            // eslint-disable-next-line no-labels
            break branches;
          }
        }
        if (node.child !== null) {
          // Continue traversing like normal
          node.child.return = node;
          node = node.child;
          continue;
        }
      } else if (node.child !== null) {
        node.child.return = node;
        node = node.child;
        continue;
      }
      // $FlowFixMe This is correct but Flow is confused by the labeled break.
      node = node;
      if (node === workInProgress) {
        return;
      }
      while (node.sibling === null) {
        if (node.return === null || node.return === workInProgress) {
          return;
        }
        node = node.return;
      }
      node.sibling.return = node.return;
      node = node.sibling;
    }
  };
  updateHostContainer = function (workInProgress) {
    var portalOrRoot = workInProgress.stateNode;
    var childrenUnchanged = workInProgress.firstEffect === null;
    if (childrenUnchanged) {
      // No changes, just reuse the existing instance.
    } else {
      var container = portalOrRoot.containerInfo;
      var newChildSet = createContainerChildSet(container);
      // If children might have changed, we have to add them all to the set.
      appendAllChildrenToContainer(newChildSet, workInProgress, false, false);
      portalOrRoot.pendingChildren = newChildSet;
      // Schedule an update on the container to swap out the container.
      markUpdate(workInProgress);
      finalizeContainerChildren(container, newChildSet);
    }
  };
  updateHostComponent$1 = function (current, workInProgress, type, newProps, rootContainerInstance) {
    var currentInstance = current.stateNode;
    var oldProps = current.memoizedProps;
    // If there are no effects associated with this node, then none of our children had any updates.
    // This guarantees that we can reuse all of them.
    var childrenUnchanged = workInProgress.firstEffect === null;
    if (childrenUnchanged && oldProps === newProps) {
      // No changes, just reuse the existing instance.
      // Note that this might release a previous clone.
      workInProgress.stateNode = currentInstance;
      return;
    }
    var recyclableInstance = workInProgress.stateNode;
    var currentHostContext = getHostContext();
    var updatePayload = null;
    if (oldProps !== newProps) {
      updatePayload = prepareUpdate(recyclableInstance, type, oldProps, newProps, rootContainerInstance, currentHostContext);
    }
    if (childrenUnchanged && updatePayload === null) {
      // No changes, just reuse the existing instance.
      // Note that this might release a previous clone.
      workInProgress.stateNode = currentInstance;
      return;
    }
    var newInstance = cloneInstance(currentInstance, updatePayload, type, oldProps, newProps, workInProgress, childrenUnchanged, recyclableInstance);
    if (finalizeInitialChildren(newInstance, type, newProps, rootContainerInstance, currentHostContext)) {
      markUpdate(workInProgress);
    }
    workInProgress.stateNode = newInstance;
    if (childrenUnchanged) {
      // If there are no other effects in this tree, we need to flag this node as having one.
      // Even though we're not going to use it for anything.
      // Otherwise parents won't know that there are new children to propagate upwards.
      markUpdate(workInProgress);
    } else {
      // If children might have changed, we have to add them all to the set.
      appendAllChildren(newInstance, workInProgress, false, false);
    }
  };
  updateHostText$1 = function (current, workInProgress, oldText, newText) {
    if (oldText !== newText) {
      // If the text content differs, we'll create a new text instance for it.
      var rootContainerInstance = getRootHostContainer();
      var currentHostContext = getHostContext();
      workInProgress.stateNode = createTextInstance(newText, rootContainerInstance, currentHostContext, workInProgress);
      // We'll have to mark it as having an effect, even though we won't use the effect for anything.
      // This lets the parents know that at least one of their children has changed.
      markUpdate(workInProgress);
    }
  };
} else {
  // No host operations
  updateHostContainer = function (workInProgress) {
    // Noop
  };
  updateHostComponent$1 = function (current, workInProgress, type, newProps, rootContainerInstance) {
    // Noop
  };
  updateHostText$1 = function (current, workInProgress, oldText, newText) {
    // Noop
  };
}

function completeWork(current, workInProgress, renderExpirationTime) {
  var newProps = workInProgress.pendingProps;

  switch (workInProgress.tag) {
    case IndeterminateComponent:
      break;
    case LazyComponent:
      break;
    case SimpleMemoComponent:
    case FunctionComponent:
      break;
    case ClassComponent:
      {
        var Component = workInProgress.type;
        if (isContextProvider(Component)) {
          popContext(workInProgress);
        }
        break;
      }
    case HostRoot:
      {
        popHostContainer(workInProgress);
        popTopLevelContextObject(workInProgress);
        var fiberRoot = workInProgress.stateNode;
        if (fiberRoot.pendingContext) {
          fiberRoot.context = fiberRoot.pendingContext;
          fiberRoot.pendingContext = null;
        }
        if (current === null || current.child === null) {
          // If we hydrated, pop so that we can delete any remaining children
          // that weren't hydrated.
          popHydrationState(workInProgress);
          // This resets the hacky state to fix isMounted before committing.
          // TODO: Delete this when we delete isMounted and findDOMNode.
          workInProgress.effectTag &= ~Placement;
        }
        updateHostContainer(workInProgress);
        break;
      }
    case HostComponent:
      {
        popHostContext(workInProgress);
        var rootContainerInstance = getRootHostContainer();
        var type = workInProgress.type;
        if (current !== null && workInProgress.stateNode != null) {
          updateHostComponent$1(current, workInProgress, type, newProps, rootContainerInstance);

          if (current.ref !== workInProgress.ref) {
            markRef$1(workInProgress);
          }
        } else {
          if (!newProps) {
            !(workInProgress.stateNode !== null) ? invariant(false, 'We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.') : void 0;
            // This can happen when we abort work.
            break;
          }

          var currentHostContext = getHostContext();
          // TODO: Move createInstance to beginWork and keep it on a context
          // "stack" as the parent. Then append children as we go in beginWork
          // or completeWork depending on we want to add then top->down or
          // bottom->up. Top->down is faster in IE11.
          var wasHydrated = popHydrationState(workInProgress);
          if (wasHydrated) {
            // TODO: Move this and createInstance step into the beginPhase
            // to consolidate.
            if (prepareToHydrateHostInstance(workInProgress, rootContainerInstance, currentHostContext)) {
              // If changes to the hydrated node needs to be applied at the
              // commit-phase we mark this as such.
              markUpdate(workInProgress);
            }
          } else {
            var instance = createInstance(type, newProps, rootContainerInstance, currentHostContext, workInProgress);

            appendAllChildren(instance, workInProgress, false, false);

            // Certain renderers require commit-time effects for initial mount.
            // (eg DOM renderer supports auto-focus for certain elements).
            // Make sure such renderers get scheduled for later work.
            if (finalizeInitialChildren(instance, type, newProps, rootContainerInstance, currentHostContext)) {
              markUpdate(workInProgress);
            }
            workInProgress.stateNode = instance;
          }

          if (workInProgress.ref !== null) {
            // If there is a ref on a host node we need to schedule a callback
            markRef$1(workInProgress);
          }
        }
        break;
      }
    case HostText:
      {
        var newText = newProps;
        if (current && workInProgress.stateNode != null) {
          var oldText = current.memoizedProps;
          // If we have an alternate, that means this is an update and we need
          // to schedule a side-effect to do the updates.
          updateHostText$1(current, workInProgress, oldText, newText);
        } else {
          if (typeof newText !== 'string') {
            !(workInProgress.stateNode !== null) ? invariant(false, 'We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.') : void 0;
            // This can happen when we abort work.
          }
          var _rootContainerInstance = getRootHostContainer();
          var _currentHostContext = getHostContext();
          var _wasHydrated = popHydrationState(workInProgress);
          if (_wasHydrated) {
            if (prepareToHydrateHostTextInstance(workInProgress)) {
              markUpdate(workInProgress);
            }
          } else {
            workInProgress.stateNode = createTextInstance(newText, _rootContainerInstance, _currentHostContext, workInProgress);
          }
        }
        break;
      }
    case ForwardRef:
      break;
    case SuspenseComponent:
      {
        var nextState = workInProgress.memoizedState;
        if ((workInProgress.effectTag & DidCapture) !== NoEffect) {
          // Something suspended. Re-render with the fallback children.
          workInProgress.expirationTime = renderExpirationTime;
          // Do not reset the effect list.
          return workInProgress;
        }

        var nextDidTimeout = nextState !== null;
        var prevDidTimeout = current !== null && current.memoizedState !== null;

        if (current !== null && !nextDidTimeout && prevDidTimeout) {
          // We just switched from the fallback to the normal children. Delete
          // the fallback.
          // TODO: Would it be better to store the fallback fragment on
          var currentFallbackChild = current.child.sibling;
          if (currentFallbackChild !== null) {
            // Deletions go at the beginning of the return fiber's effect list
            var first = workInProgress.firstEffect;
            if (first !== null) {
              workInProgress.firstEffect = currentFallbackChild;
              currentFallbackChild.nextEffect = first;
            } else {
              workInProgress.firstEffect = workInProgress.lastEffect = currentFallbackChild;
              currentFallbackChild.nextEffect = null;
            }
            currentFallbackChild.effectTag = Deletion;
          }
        }

        if (nextDidTimeout || prevDidTimeout) {
          // If the children are hidden, or if they were previous hidden, schedule
          // an effect to toggle their visibility. This is also used to attach a
          // retry listener to the promise.
          workInProgress.effectTag |= Update;
        }
        break;
      }
    case Fragment:
      break;
    case Mode:
      break;
    case Profiler:
      break;
    case HostPortal:
      popHostContainer(workInProgress);
      updateHostContainer(workInProgress);
      break;
    case ContextProvider:
      // Pop provider fiber
      popProvider(workInProgress);
      break;
    case ContextConsumer:
      break;
    case MemoComponent:
      break;
    case IncompleteClassComponent:
      {
        // Same as class component case. I put it down here so that the tags are
        // sequential to ensure this switch is compiled to a jump table.
        var _Component = workInProgress.type;
        if (isContextProvider(_Component)) {
          popContext(workInProgress);
        }
        break;
      }
    case DehydratedSuspenseComponent:
      {
        if (enableSuspenseServerRenderer) {
          if (current === null) {
            var _wasHydrated2 = popHydrationState(workInProgress);
            !_wasHydrated2 ? invariant(false, 'A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.') : void 0;
            skipPastDehydratedSuspenseInstance(workInProgress);
          } else if ((workInProgress.effectTag & DidCapture) === NoEffect) {
            // This boundary did not suspend so it's now hydrated.
            // To handle any future suspense cases, we're going to now upgrade it
            // to a Suspense component. We detach it from the existing current fiber.
            current.alternate = null;
            workInProgress.alternate = null;
            workInProgress.tag = SuspenseComponent;
            workInProgress.memoizedState = null;
            workInProgress.stateNode = null;
          }
        }
        break;
      }
    default:
      invariant(false, 'Unknown unit of work tag. This error is likely caused by a bug in React. Please file an issue.');
  }

  return null;
}

function shouldCaptureSuspense(workInProgress) {
  // In order to capture, the Suspense component must have a fallback prop.
  if (workInProgress.memoizedProps.fallback === undefined) {
    return false;
  }
  // If it was the primary children that just suspended, capture and render the
  // fallback. Otherwise, don't capture and bubble to the next boundary.
  var nextState = workInProgress.memoizedState;
  return nextState === null;
}

// This module is forked in different environments.
// By default, return `true` to log errors to the console.
// Forks can return `false` if this isn't desirable.
function showErrorDialog(capturedError) {
  return true;
}

function logCapturedError(capturedError) {
  var logError = showErrorDialog(capturedError);

  // Allow injected showErrorDialog() to prevent default console.error logging.
  // This enables renderers like ReactNative to better manage redbox behavior.
  if (logError === false) {
    return;
  }

  var error = capturedError.error;
  {
    var componentName = capturedError.componentName,
        componentStack = capturedError.componentStack,
        errorBoundaryName = capturedError.errorBoundaryName,
        errorBoundaryFound = capturedError.errorBoundaryFound,
        willRetry = capturedError.willRetry;

    // Browsers support silencing uncaught errors by calling
    // `preventDefault()` in window `error` handler.
    // We record this information as an expando on the error.

    if (error != null && error._suppressLogging) {
      if (errorBoundaryFound && willRetry) {
        // The error is recoverable and was silenced.
        // Ignore it and don't print the stack addendum.
        // This is handy for testing error boundaries without noise.
        return;
      }
      // The error is fatal. Since the silencing might have
      // been accidental, we'll surface it anyway.
      // However, the browser would have silenced the original error
      // so we'll print it first, and then print the stack addendum.
      console.error(error);
      // For a more detailed description of this block, see:
      // https://github.com/facebook/react/pull/13384
    }

    var componentNameMessage = componentName ? 'The above error occurred in the <' + componentName + '> component:' : 'The above error occurred in one of your React components:';

    var errorBoundaryMessage = void 0;
    // errorBoundaryFound check is sufficient; errorBoundaryName check is to satisfy Flow.
    if (errorBoundaryFound && errorBoundaryName) {
      if (willRetry) {
        errorBoundaryMessage = 'React will try to recreate this component tree from scratch ' + ('using the error boundary you provided, ' + errorBoundaryName + '.');
      } else {
        errorBoundaryMessage = 'This error was initially handled by the error boundary ' + errorBoundaryName + '.\n' + 'Recreating the tree from scratch failed so React will unmount the tree.';
      }
    } else {
      errorBoundaryMessage = 'Consider adding an error boundary to your tree to customize error handling behavior.\n' + 'Visit https://fb.me/react-error-boundaries to learn more about error boundaries.';
    }
    var combinedMessage = '' + componentNameMessage + componentStack + '\n\n' + ('' + errorBoundaryMessage);

    // In development, we provide our own message with just the component stack.
    // We don't include the original error message and JS stack because the browser
    // has already printed it. Even if the application swallows the error, it is still
    // displayed by the browser thanks to the DEV-only fake event trick in ReactErrorUtils.
    console.error(combinedMessage);
  }
}

var didWarnAboutUndefinedSnapshotBeforeUpdate = null;
{
  didWarnAboutUndefinedSnapshotBeforeUpdate = new Set();
}

var PossiblyWeakSet$1 = typeof WeakSet === 'function' ? WeakSet : Set;

function logError(boundary, errorInfo) {
  var source = errorInfo.source;
  var stack = errorInfo.stack;
  if (stack === null && source !== null) {
    stack = getStackByFiberInDevAndProd(source);
  }

  var capturedError = {
    componentName: source !== null ? getComponentName(source.type) : null,
    componentStack: stack !== null ? stack : '',
    error: errorInfo.value,
    errorBoundary: null,
    errorBoundaryName: null,
    errorBoundaryFound: false,
    willRetry: false
  };

  if (boundary !== null && boundary.tag === ClassComponent) {
    capturedError.errorBoundary = boundary.stateNode;
    capturedError.errorBoundaryName = getComponentName(boundary.type);
    capturedError.errorBoundaryFound = true;
    capturedError.willRetry = true;
  }

  try {
    logCapturedError(capturedError);
  } catch (e) {
    // This method must not throw, or React internal state will get messed up.
    // If console.error is overridden, or logCapturedError() shows a dialog that throws,
    // we want to report this error outside of the normal stack as a last resort.
    // https://github.com/facebook/react/issues/13188
    setTimeout(function () {
      throw e;
    });
  }
}

var callComponentWillUnmountWithTimer = function (current$$1, instance) {
  startPhaseTimer(current$$1, 'componentWillUnmount');
  instance.props = current$$1.memoizedProps;
  instance.state = current$$1.memoizedState;
  instance.componentWillUnmount();
  stopPhaseTimer();
};

// Capture errors so they don't interrupt unmounting.
function safelyCallComponentWillUnmount(current$$1, instance) {
  {
    invokeGuardedCallback(null, callComponentWillUnmountWithTimer, null, current$$1, instance);
    if (hasCaughtError()) {
      var unmountError = clearCaughtError();
      captureCommitPhaseError(current$$1, unmountError);
    }
  }
}

function safelyDetachRef(current$$1) {
  var ref = current$$1.ref;
  if (ref !== null) {
    if (typeof ref === 'function') {
      {
        invokeGuardedCallback(null, ref, null, null);
        if (hasCaughtError()) {
          var refError = clearCaughtError();
          captureCommitPhaseError(current$$1, refError);
        }
      }
    } else {
      ref.current = null;
    }
  }
}

function safelyCallDestroy(current$$1, destroy) {
  {
    invokeGuardedCallback(null, destroy, null);
    if (hasCaughtError()) {
      var error = clearCaughtError();
      captureCommitPhaseError(current$$1, error);
    }
  }
}

function commitBeforeMutationLifeCycles(current$$1, finishedWork) {
  switch (finishedWork.tag) {
    case FunctionComponent:
    case ForwardRef:
    case SimpleMemoComponent:
      {
        commitHookEffectList(UnmountSnapshot, NoEffect$1, finishedWork);
        return;
      }
    case ClassComponent:
      {
        if (finishedWork.effectTag & Snapshot) {
          if (current$$1 !== null) {
            var prevProps = current$$1.memoizedProps;
            var prevState = current$$1.memoizedState;
            startPhaseTimer(finishedWork, 'getSnapshotBeforeUpdate');
            var instance = finishedWork.stateNode;
            // We could update instance props and state here,
            // but instead we rely on them being set during last render.
            // TODO: revisit this when we implement resuming.
            {
              if (finishedWork.type === finishedWork.elementType && !didWarnAboutReassigningProps) {
                !(instance.props === finishedWork.memoizedProps) ? warning$1(false, 'Expected %s props to match memoized props before ' + 'getSnapshotBeforeUpdate. ' + 'This might either be because of a bug in React, or because ' + 'a component reassigns its own `this.props`. ' + 'Please file an issue.', getComponentName(finishedWork.type) || 'instance') : void 0;
                !(instance.state === finishedWork.memoizedState) ? warning$1(false, 'Expected %s state to match memoized state before ' + 'getSnapshotBeforeUpdate. ' + 'This might either be because of a bug in React, or because ' + 'a component reassigns its own `this.props`. ' + 'Please file an issue.', getComponentName(finishedWork.type) || 'instance') : void 0;
              }
            }
            var snapshot = instance.getSnapshotBeforeUpdate(finishedWork.elementType === finishedWork.type ? prevProps : resolveDefaultProps(finishedWork.type, prevProps), prevState);
            {
              var didWarnSet = didWarnAboutUndefinedSnapshotBeforeUpdate;
              if (snapshot === undefined && !didWarnSet.has(finishedWork.type)) {
                didWarnSet.add(finishedWork.type);
                warningWithoutStack$1(false, '%s.getSnapshotBeforeUpdate(): A snapshot value (or null) ' + 'must be returned. You have returned undefined.', getComponentName(finishedWork.type));
              }
            }
            instance.__reactInternalSnapshotBeforeUpdate = snapshot;
            stopPhaseTimer();
          }
        }
        return;
      }
    case HostRoot:
    case HostComponent:
    case HostText:
    case HostPortal:
    case IncompleteClassComponent:
      // Nothing to do for these component types
      return;
    default:
      {
        invariant(false, 'This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.');
      }
  }
}

function commitHookEffectList(unmountTag, mountTag, finishedWork) {
  var updateQueue = finishedWork.updateQueue;
  var lastEffect = updateQueue !== null ? updateQueue.lastEffect : null;
  if (lastEffect !== null) {
    var firstEffect = lastEffect.next;
    var effect = firstEffect;
    do {
      if ((effect.tag & unmountTag) !== NoEffect$1) {
        // Unmount
        var destroy = effect.destroy;
        effect.destroy = undefined;
        if (destroy !== undefined) {
          destroy();
        }
      }
      if ((effect.tag & mountTag) !== NoEffect$1) {
        // Mount
        var create = effect.create;
        effect.destroy = create();

        {
          var _destroy = effect.destroy;
          if (_destroy !== undefined && typeof _destroy !== 'function') {
            var addendum = void 0;
            if (_destroy === null) {
              addendum = ' You returned null. If your effect does not require clean ' + 'up, return undefined (or nothing).';
            } else if (typeof _destroy.then === 'function') {
              addendum = '\n\nIt looks like you wrote useEffect(async () => ...) or returned a Promise. ' + 'Instead, you may write an async function separately ' + 'and then call it from inside the effect:\n\n' + 'async function fetchComment(commentId) {\n' + '  // You can await here\n' + '}\n\n' + 'useEffect(() => {\n' + '  fetchComment(commentId);\n' + '}, [commentId]);\n\n' + 'In the future, React will provide a more idiomatic solution for data fetching ' + "that doesn't involve writing effects manually.";
            } else {
              addendum = ' You returned: ' + _destroy;
            }
            warningWithoutStack$1(false, 'An Effect function must not return anything besides a function, ' + 'which is used for clean-up.%s%s', addendum, getStackByFiberInDevAndProd(finishedWork));
          }
        }
      }
      effect = effect.next;
    } while (effect !== firstEffect);
  }
}

function commitPassiveHookEffects(finishedWork) {
  commitHookEffectList(UnmountPassive, NoEffect$1, finishedWork);
  commitHookEffectList(NoEffect$1, MountPassive, finishedWork);
}

function commitLifeCycles(finishedRoot, current$$1, finishedWork, committedExpirationTime) {
  switch (finishedWork.tag) {
    case FunctionComponent:
    case ForwardRef:
    case SimpleMemoComponent:
      {
        commitHookEffectList(UnmountLayout, MountLayout, finishedWork);
        break;
      }
    case ClassComponent:
      {
        var instance = finishedWork.stateNode;
        if (finishedWork.effectTag & Update) {
          if (current$$1 === null) {
            startPhaseTimer(finishedWork, 'componentDidMount');
            // We could update instance props and state here,
            // but instead we rely on them being set during last render.
            // TODO: revisit this when we implement resuming.
            {
              if (finishedWork.type === finishedWork.elementType && !didWarnAboutReassigningProps) {
                !(instance.props === finishedWork.memoizedProps) ? warning$1(false, 'Expected %s props to match memoized props before ' + 'componentDidMount. ' + 'This might either be because of a bug in React, or because ' + 'a component reassigns its own `this.props`. ' + 'Please file an issue.', getComponentName(finishedWork.type) || 'instance') : void 0;
                !(instance.state === finishedWork.memoizedState) ? warning$1(false, 'Expected %s state to match memoized state before ' + 'componentDidMount. ' + 'This might either be because of a bug in React, or because ' + 'a component reassigns its own `this.props`. ' + 'Please file an issue.', getComponentName(finishedWork.type) || 'instance') : void 0;
              }
            }
            instance.componentDidMount();
            stopPhaseTimer();
          } else {
            var prevProps = finishedWork.elementType === finishedWork.type ? current$$1.memoizedProps : resolveDefaultProps(finishedWork.type, current$$1.memoizedProps);
            var prevState = current$$1.memoizedState;
            startPhaseTimer(finishedWork, 'componentDidUpdate');
            // We could update instance props and state here,
            // but instead we rely on them being set during last render.
            // TODO: revisit this when we implement resuming.
            {
              if (finishedWork.type === finishedWork.elementType && !didWarnAboutReassigningProps) {
                !(instance.props === finishedWork.memoizedProps) ? warning$1(false, 'Expected %s props to match memoized props before ' + 'componentDidUpdate. ' + 'This might either be because of a bug in React, or because ' + 'a component reassigns its own `this.props`. ' + 'Please file an issue.', getComponentName(finishedWork.type) || 'instance') : void 0;
                !(instance.state === finishedWork.memoizedState) ? warning$1(false, 'Expected %s state to match memoized state before ' + 'componentDidUpdate. ' + 'This might either be because of a bug in React, or because ' + 'a component reassigns its own `this.props`. ' + 'Please file an issue.', getComponentName(finishedWork.type) || 'instance') : void 0;
              }
            }
            instance.componentDidUpdate(prevProps, prevState, instance.__reactInternalSnapshotBeforeUpdate);
            stopPhaseTimer();
          }
        }
        var updateQueue = finishedWork.updateQueue;
        if (updateQueue !== null) {
          {
            if (finishedWork.type === finishedWork.elementType && !didWarnAboutReassigningProps) {
              !(instance.props === finishedWork.memoizedProps) ? warning$1(false, 'Expected %s props to match memoized props before ' + 'processing the update queue. ' + 'This might either be because of a bug in React, or because ' + 'a component reassigns its own `this.props`. ' + 'Please file an issue.', getComponentName(finishedWork.type) || 'instance') : void 0;
              !(instance.state === finishedWork.memoizedState) ? warning$1(false, 'Expected %s state to match memoized state before ' + 'processing the update queue. ' + 'This might either be because of a bug in React, or because ' + 'a component reassigns its own `this.props`. ' + 'Please file an issue.', getComponentName(finishedWork.type) || 'instance') : void 0;
            }
          }
          // We could update instance props and state here,
          // but instead we rely on them being set during last render.
          // TODO: revisit this when we implement resuming.
          commitUpdateQueue(finishedWork, updateQueue, instance, committedExpirationTime);
        }
        return;
      }
    case HostRoot:
      {
        var _updateQueue = finishedWork.updateQueue;
        if (_updateQueue !== null) {
          var _instance = null;
          if (finishedWork.child !== null) {
            switch (finishedWork.child.tag) {
              case HostComponent:
                _instance = getPublicInstance(finishedWork.child.stateNode);
                break;
              case ClassComponent:
                _instance = finishedWork.child.stateNode;
                break;
            }
          }
          commitUpdateQueue(finishedWork, _updateQueue, _instance, committedExpirationTime);
        }
        return;
      }
    case HostComponent:
      {
        var _instance2 = finishedWork.stateNode;

        // Renderers may schedule work to be done after host components are mounted
        // (eg DOM renderer may schedule auto-focus for inputs and form controls).
        // These effects should only be committed when components are first mounted,
        // aka when there is no current/alternate.
        if (current$$1 === null && finishedWork.effectTag & Update) {
          var type = finishedWork.type;
          var props = finishedWork.memoizedProps;
          commitMount(_instance2, type, props, finishedWork);
        }

        return;
      }
    case HostText:
      {
        // We have no life-cycles associated with text.
        return;
      }
    case HostPortal:
      {
        // We have no life-cycles associated with portals.
        return;
      }
    case Profiler:
      {
        if (enableProfilerTimer) {
          var onRender = finishedWork.memoizedProps.onRender;

          if (enableSchedulerTracing) {
            onRender(finishedWork.memoizedProps.id, current$$1 === null ? 'mount' : 'update', finishedWork.actualDuration, finishedWork.treeBaseDuration, finishedWork.actualStartTime, getCommitTime(), finishedRoot.memoizedInteractions);
          } else {
            onRender(finishedWork.memoizedProps.id, current$$1 === null ? 'mount' : 'update', finishedWork.actualDuration, finishedWork.treeBaseDuration, finishedWork.actualStartTime, getCommitTime());
          }
        }
        return;
      }
    case SuspenseComponent:
      break;
    case IncompleteClassComponent:
      break;
    default:
      {
        invariant(false, 'This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.');
      }
  }
}

function hideOrUnhideAllChildren(finishedWork, isHidden) {
  if (supportsMutation) {
    // We only have the top Fiber that was inserted but we need to recurse down its
    var node = finishedWork;
    while (true) {
      if (node.tag === HostComponent) {
        var instance = node.stateNode;
        if (isHidden) {
          hideInstance(instance);
        } else {
          unhideInstance(node.stateNode, node.memoizedProps);
        }
      } else if (node.tag === HostText) {
        var _instance3 = node.stateNode;
        if (isHidden) {
          hideTextInstance(_instance3);
        } else {
          unhideTextInstance(_instance3, node.memoizedProps);
        }
      } else if (node.tag === SuspenseComponent && node.memoizedState !== null) {
        // Found a nested Suspense component that timed out. Skip over the
        var fallbackChildFragment = node.child.sibling;
        fallbackChildFragment.return = node;
        node = fallbackChildFragment;
        continue;
      } else if (node.child !== null) {
        node.child.return = node;
        node = node.child;
        continue;
      }
      if (node === finishedWork) {
        return;
      }
      while (node.sibling === null) {
        if (node.return === null || node.return === finishedWork) {
          return;
        }
        node = node.return;
      }
      node.sibling.return = node.return;
      node = node.sibling;
    }
  }
}

function commitAttachRef(finishedWork) {
  var ref = finishedWork.ref;
  if (ref !== null) {
    var instance = finishedWork.stateNode;
    var instanceToUse = void 0;
    switch (finishedWork.tag) {
      case HostComponent:
        instanceToUse = getPublicInstance(instance);
        break;
      default:
        instanceToUse = instance;
    }
    if (typeof ref === 'function') {
      ref(instanceToUse);
    } else {
      {
        if (!ref.hasOwnProperty('current')) {
          warningWithoutStack$1(false, 'Unexpected ref object provided for %s. ' + 'Use either a ref-setter function or React.createRef().%s', getComponentName(finishedWork.type), getStackByFiberInDevAndProd(finishedWork));
        }
      }

      ref.current = instanceToUse;
    }
  }
}

function commitDetachRef(current$$1) {
  var currentRef = current$$1.ref;
  if (currentRef !== null) {
    if (typeof currentRef === 'function') {
      currentRef(null);
    } else {
      currentRef.current = null;
    }
  }
}

// User-originating errors (lifecycles and refs) should not interrupt
// deletion, so don't let them throw. Host-originating errors should
// interrupt deletion, so it's okay
function commitUnmount(current$$1) {
  onCommitUnmount(current$$1);

  switch (current$$1.tag) {
    case FunctionComponent:
    case ForwardRef:
    case MemoComponent:
    case SimpleMemoComponent:
      {
        var updateQueue = current$$1.updateQueue;
        if (updateQueue !== null) {
          var lastEffect = updateQueue.lastEffect;
          if (lastEffect !== null) {
            var firstEffect = lastEffect.next;
            var effect = firstEffect;
            do {
              var destroy = effect.destroy;
              if (destroy !== undefined) {
                safelyCallDestroy(current$$1, destroy);
              }
              effect = effect.next;
            } while (effect !== firstEffect);
          }
        }
        break;
      }
    case ClassComponent:
      {
        safelyDetachRef(current$$1);
        var instance = current$$1.stateNode;
        if (typeof instance.componentWillUnmount === 'function') {
          safelyCallComponentWillUnmount(current$$1, instance);
        }
        return;
      }
    case HostComponent:
      {
        safelyDetachRef(current$$1);
        return;
      }
    case HostPortal:
      {
        // TODO: this is recursive.
        // We are also not using this parent because
        // the portal will get pushed immediately.
        if (supportsMutation) {
          unmountHostComponents(current$$1);
        } else if (supportsPersistence) {
          emptyPortalContainer(current$$1);
        }
        return;
      }
  }
}

function commitNestedUnmounts(root) {
  // While we're inside a removed host node we don't want to call
  // removeChild on the inner nodes because they're removed by the top
  // call anyway. We also want to call componentWillUnmount on all
  // composites before this host node is removed from the tree. Therefore
  var node = root;
  while (true) {
    commitUnmount(node);
    // Visit children because they may contain more composite or host nodes.
    // Skip portals because commitUnmount() currently visits them recursively.
    if (node.child !== null && (
    // If we use mutation we drill down into portals using commitUnmount above.
    // If we don't use mutation we drill down into portals here instead.
    !supportsMutation || node.tag !== HostPortal)) {
      node.child.return = node;
      node = node.child;
      continue;
    }
    if (node === root) {
      return;
    }
    while (node.sibling === null) {
      if (node.return === null || node.return === root) {
        return;
      }
      node = node.return;
    }
    node.sibling.return = node.return;
    node = node.sibling;
  }
}

function detachFiber(current$$1) {
  // Cut off the return pointers to disconnect it from the tree. Ideally, we
  // should clear the child pointer of the parent alternate to let this
  // get GC:ed but we don't know which for sure which parent is the current
  // one so we'll settle for GC:ing the subtree of this child. This child
  // itself will be GC:ed when the parent updates the next time.
  current$$1.return = null;
  current$$1.child = null;
  current$$1.memoizedState = null;
  current$$1.updateQueue = null;
  var alternate = current$$1.alternate;
  if (alternate !== null) {
    alternate.return = null;
    alternate.child = null;
    alternate.memoizedState = null;
    alternate.updateQueue = null;
  }
}

function emptyPortalContainer(current$$1) {
  if (!supportsPersistence) {
    return;
  }

  var portal = current$$1.stateNode;
  var containerInfo = portal.containerInfo;

  var emptyChildSet = createContainerChildSet(containerInfo);
  replaceContainerChildren(containerInfo, emptyChildSet);
}

function commitContainer(finishedWork) {
  if (!supportsPersistence) {
    return;
  }

  switch (finishedWork.tag) {
    case ClassComponent:
      {
        return;
      }
    case HostComponent:
      {
        return;
      }
    case HostText:
      {
        return;
      }
    case HostRoot:
    case HostPortal:
      {
        var portalOrRoot = finishedWork.stateNode;
        var containerInfo = portalOrRoot.containerInfo,
            _pendingChildren = portalOrRoot.pendingChildren;

        replaceContainerChildren(containerInfo, _pendingChildren);
        return;
      }
    default:
      {
        invariant(false, 'This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.');
      }
  }
}

function getHostParentFiber(fiber) {
  var parent = fiber.return;
  while (parent !== null) {
    if (isHostParent(parent)) {
      return parent;
    }
    parent = parent.return;
  }
  invariant(false, 'Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.');
}

function isHostParent(fiber) {
  return fiber.tag === HostComponent || fiber.tag === HostRoot || fiber.tag === HostPortal;
}

function getHostSibling(fiber) {
  // We're going to search forward into the tree until we find a sibling host
  // node. Unfortunately, if multiple insertions are done in a row we have to
  // search past them. This leads to exponential search for the next sibling.
  var node = fiber;
  siblings: while (true) {
    // If we didn't find anything, let's try the next sibling.
    while (node.sibling === null) {
      if (node.return === null || isHostParent(node.return)) {
        // If we pop out of the root or hit the parent the fiber we are the
        // last sibling.
        return null;
      }
      node = node.return;
    }
    node.sibling.return = node.return;
    node = node.sibling;
    while (node.tag !== HostComponent && node.tag !== HostText && node.tag !== DehydratedSuspenseComponent) {
      // If it is not host node and, we might have a host node inside it.
      // Try to search down until we find one.
      if (node.effectTag & Placement) {
        // If we don't have a child, try the siblings instead.
        continue siblings;
      }
      // If we don't have a child, try the siblings instead.
      // We also skip portals because they are not part of this host tree.
      if (node.child === null || node.tag === HostPortal) {
        continue siblings;
      } else {
        node.child.return = node;
        node = node.child;
      }
    }
    // Check if this host node is stable or about to be placed.
    if (!(node.effectTag & Placement)) {
      // Found it!
      return node.stateNode;
    }
  }
}

function commitPlacement(finishedWork) {
  if (!supportsMutation) {
    return;
  }

  // Recursively insert all host nodes into the parent.
  var parentFiber = getHostParentFiber(finishedWork);

  // Note: these two variables *must* always be updated together.
  var parent = void 0;
  var isContainer = void 0;

  switch (parentFiber.tag) {
    case HostComponent:
      parent = parentFiber.stateNode;
      isContainer = false;
      break;
    case HostRoot:
      parent = parentFiber.stateNode.containerInfo;
      isContainer = true;
      break;
    case HostPortal:
      parent = parentFiber.stateNode.containerInfo;
      isContainer = true;
      break;
    default:
      invariant(false, 'Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.');
  }
  if (parentFiber.effectTag & ContentReset) {
    // Reset the text content of the parent before doing any insertions
    resetTextContent(parent);
    // Clear ContentReset from the effect tag
    parentFiber.effectTag &= ~ContentReset;
  }

  var before = getHostSibling(finishedWork);
  // We only have the top Fiber that was inserted but we need to recurse down its
  // children to find all the terminal nodes.
  var node = finishedWork;
  while (true) {
    if (node.tag === HostComponent || node.tag === HostText) {
      if (before) {
        if (isContainer) {
          insertInContainerBefore(parent, node.stateNode, before);
        } else {
          insertBefore(parent, node.stateNode, before);
        }
      } else {
        if (isContainer) {
          appendChildToContainer(parent, node.stateNode);
        } else {
          appendChild(parent, node.stateNode);
        }
      }
    } else if (node.tag === HostPortal) {
      // If the insertion itself is a portal, then we don't want to traverse
      // down its children. Instead, we'll get insertions from each child in
      // the portal directly.
    } else if (node.child !== null) {
      node.child.return = node;
      node = node.child;
      continue;
    }
    if (node === finishedWork) {
      return;
    }
    while (node.sibling === null) {
      if (node.return === null || node.return === finishedWork) {
        return;
      }
      node = node.return;
    }
    node.sibling.return = node.return;
    node = node.sibling;
  }
}

function unmountHostComponents(current$$1) {
  // We only have the top Fiber that was deleted but we need to recurse down its
  var node = current$$1;

  // Each iteration, currentParent is populated with node's host parent if not
  // currentParentIsValid.
  var currentParentIsValid = false;

  // Note: these two variables *must* always be updated together.
  var currentParent = void 0;
  var currentParentIsContainer = void 0;

  while (true) {
    if (!currentParentIsValid) {
      var parent = node.return;
      findParent: while (true) {
        !(parent !== null) ? invariant(false, 'Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.') : void 0;
        switch (parent.tag) {
          case HostComponent:
            currentParent = parent.stateNode;
            currentParentIsContainer = false;
            break findParent;
          case HostRoot:
            currentParent = parent.stateNode.containerInfo;
            currentParentIsContainer = true;
            break findParent;
          case HostPortal:
            currentParent = parent.stateNode.containerInfo;
            currentParentIsContainer = true;
            break findParent;
        }
        parent = parent.return;
      }
      currentParentIsValid = true;
    }

    if (node.tag === HostComponent || node.tag === HostText) {
      commitNestedUnmounts(node);
      // After all the children have unmounted, it is now safe to remove the
      // node from the tree.
      if (currentParentIsContainer) {
        removeChildFromContainer(currentParent, node.stateNode);
      } else {
        removeChild(currentParent, node.stateNode);
      }
      // Don't visit children because we already visited them.
    } else if (enableSuspenseServerRenderer && node.tag === DehydratedSuspenseComponent) {
      // Delete the dehydrated suspense boundary and all of its content.
      if (currentParentIsContainer) {
        clearSuspenseBoundaryFromContainer(currentParent, node.stateNode);
      } else {
        clearSuspenseBoundary(currentParent, node.stateNode);
      }
    } else if (node.tag === HostPortal) {
      if (node.child !== null) {
        // When we go into a portal, it becomes the parent to remove from.
        // We will reassign it back when we pop the portal on the way up.
        currentParent = node.stateNode.containerInfo;
        currentParentIsContainer = true;
        // Visit children because portals might contain host components.
        node.child.return = node;
        node = node.child;
        continue;
      }
    } else {
      commitUnmount(node);
      // Visit children because we may find more host components below.
      if (node.child !== null) {
        node.child.return = node;
        node = node.child;
        continue;
      }
    }
    if (node === current$$1) {
      return;
    }
    while (node.sibling === null) {
      if (node.return === null || node.return === current$$1) {
        return;
      }
      node = node.return;
      if (node.tag === HostPortal) {
        // When we go out of the portal, we need to restore the parent.
        // Since we don't keep a stack of them, we will search for it.
        currentParentIsValid = false;
      }
    }
    node.sibling.return = node.return;
    node = node.sibling;
  }
}

function commitDeletion(current$$1) {
  if (supportsMutation) {
    // Recursively delete all host nodes from the parent.
    // Detach refs and call componentWillUnmount() on the whole subtree.
    unmountHostComponents(current$$1);
  } else {
    // Detach refs and call componentWillUnmount() on the whole subtree.
    commitNestedUnmounts(current$$1);
  }
  detachFiber(current$$1);
}

function commitWork(current$$1, finishedWork) {
  if (!supportsMutation) {
    switch (finishedWork.tag) {
      case FunctionComponent:
      case ForwardRef:
      case MemoComponent:
      case SimpleMemoComponent:
        {
          // Note: We currently never use MountMutation, but useLayout uses
          // UnmountMutation.
          commitHookEffectList(UnmountMutation, MountMutation, finishedWork);
          return;
        }
    }

    commitContainer(finishedWork);
    return;
  }

  switch (finishedWork.tag) {
    case FunctionComponent:
    case ForwardRef:
    case MemoComponent:
    case SimpleMemoComponent:
      {
        // Note: We currently never use MountMutation, but useLayout uses
        // UnmountMutation.
        commitHookEffectList(UnmountMutation, MountMutation, finishedWork);
        return;
      }
    case ClassComponent:
      {
        return;
      }
    case HostComponent:
      {
        var instance = finishedWork.stateNode;
        if (instance != null) {
          // Commit the work prepared earlier.
          var newProps = finishedWork.memoizedProps;
          // For hydration we reuse the update path but we treat the oldProps
          // as the newProps. The updatePayload will contain the real change in
          // this case.
          var oldProps = current$$1 !== null ? current$$1.memoizedProps : newProps;
          var type = finishedWork.type;
          // TODO: Type the updateQueue to be specific to host components.
          var updatePayload = finishedWork.updateQueue;
          finishedWork.updateQueue = null;
          if (updatePayload !== null) {
            commitUpdate(instance, updatePayload, type, oldProps, newProps, finishedWork);
          }
        }
        return;
      }
    case HostText:
      {
        !(finishedWork.stateNode !== null) ? invariant(false, 'This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.') : void 0;
        var textInstance = finishedWork.stateNode;
        var newText = finishedWork.memoizedProps;
        // For hydration we reuse the update path but we treat the oldProps
        // as the newProps. The updatePayload will contain the real change in
        // this case.
        var oldText = current$$1 !== null ? current$$1.memoizedProps : newText;
        commitTextUpdate(textInstance, oldText, newText);
        return;
      }
    case HostRoot:
      {
        return;
      }
    case Profiler:
      {
        return;
      }
    case SuspenseComponent:
      {
        var newState = finishedWork.memoizedState;

        var newDidTimeout = void 0;
        var primaryChildParent = finishedWork;
        if (newState === null) {
          newDidTimeout = false;
        } else {
          newDidTimeout = true;
          primaryChildParent = finishedWork.child;
          if (newState.timedOutAt === NoWork) {
            // If the children had not already timed out, record the time.
            // This is used to compute the elapsed time during subsequent
            // attempts to render the children.
            newState.timedOutAt = requestCurrentTime();
          }
        }

        if (primaryChildParent !== null) {
          hideOrUnhideAllChildren(primaryChildParent, newDidTimeout);
        }

        // If this boundary just timed out, then it will have a set of thenables.
        // For each thenable, attach a listener so that when it resolves, React
        // attempts to re-render the boundary in the primary (pre-timeout) state.
        var thenables = finishedWork.updateQueue;
        if (thenables !== null) {
          finishedWork.updateQueue = null;
          var retryCache = finishedWork.stateNode;
          if (retryCache === null) {
            retryCache = finishedWork.stateNode = new PossiblyWeakSet$1();
          }
          thenables.forEach(function (thenable) {
            // Memoize using the boundary fiber to prevent redundant listeners.
            var retry = retryTimedOutBoundary.bind(null, finishedWork, thenable);
            if (enableSchedulerTracing) {
              retry = tracing.unstable_wrap(retry);
            }
            if (!retryCache.has(thenable)) {
              retryCache.add(thenable);
              thenable.then(retry, retry);
            }
          });
        }

        return;
      }
    case IncompleteClassComponent:
      {
        return;
      }
    default:
      {
        invariant(false, 'This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.');
      }
  }
}

function commitResetTextContent(current$$1) {
  if (!supportsMutation) {
    return;
  }
  resetTextContent(current$$1.stateNode);
}

var PossiblyWeakSet = typeof WeakSet === 'function' ? WeakSet : Set;
var PossiblyWeakMap = typeof WeakMap === 'function' ? WeakMap : Map;

function createRootErrorUpdate(fiber, errorInfo, expirationTime) {
  var update = createUpdate(expirationTime);
  // Unmount the root by rendering null.
  update.tag = CaptureUpdate;
  // Caution: React DevTools currently depends on this property
  // being called "element".
  update.payload = { element: null };
  var error = errorInfo.value;
  update.callback = function () {
    onUncaughtError(error);
    logError(fiber, errorInfo);
  };
  return update;
}

function createClassErrorUpdate(fiber, errorInfo, expirationTime) {
  var update = createUpdate(expirationTime);
  update.tag = CaptureUpdate;
  var getDerivedStateFromError = fiber.type.getDerivedStateFromError;
  if (typeof getDerivedStateFromError === 'function') {
    var error = errorInfo.value;
    update.payload = function () {
      return getDerivedStateFromError(error);
    };
  }

  var inst = fiber.stateNode;
  if (inst !== null && typeof inst.componentDidCatch === 'function') {
    update.callback = function callback() {
      if (typeof getDerivedStateFromError !== 'function') {
        // To preserve the preexisting retry behavior of error boundaries,
        // we keep track of which ones already failed during this batch.
        // This gets reset before we yield back to the browser.
        // TODO: Warn in strict mode if getDerivedStateFromError is
        // not defined.
        markLegacyErrorBoundaryAsFailed(this);
      }
      var error = errorInfo.value;
      var stack = errorInfo.stack;
      logError(fiber, errorInfo);
      this.componentDidCatch(error, {
        componentStack: stack !== null ? stack : ''
      });
      {
        if (typeof getDerivedStateFromError !== 'function') {
          // If componentDidCatch is the only error boundary method defined,
          // then it needs to call setState to recover from errors.
          // If no state update is scheduled then the boundary will swallow the error.
          !(fiber.expirationTime === Sync) ? warningWithoutStack$1(false, '%s: Error boundaries should implement getDerivedStateFromError(). ' + 'In that method, return a state update to display an error message or fallback UI.', getComponentName(fiber.type) || 'Unknown') : void 0;
        }
      }
    };
  }
  return update;
}

function attachPingListener(root, renderExpirationTime, thenable) {
  // Attach a listener to the promise to "ping" the root and retry. But
  // only if one does not already exist for the current render expiration
  // time (which acts like a "thread ID" here).
  var pingCache = root.pingCache;
  var threadIDs = void 0;
  if (pingCache === null) {
    pingCache = root.pingCache = new PossiblyWeakMap();
    threadIDs = new Set();
    pingCache.set(thenable, threadIDs);
  } else {
    threadIDs = pingCache.get(thenable);
    if (threadIDs === undefined) {
      threadIDs = new Set();
      pingCache.set(thenable, threadIDs);
    }
  }
  if (!threadIDs.has(renderExpirationTime)) {
    // Memoize using the thread ID to prevent redundant listeners.
    threadIDs.add(renderExpirationTime);
    var ping = pingSuspendedRoot.bind(null, root, thenable, renderExpirationTime);
    if (enableSchedulerTracing) {
      ping = tracing.unstable_wrap(ping);
    }
    thenable.then(ping, ping);
  }
}

function throwException(root, returnFiber, sourceFiber, value, renderExpirationTime) {
  // The source fiber did not complete.
  sourceFiber.effectTag |= Incomplete;
  // Its effect list is no longer valid.
  sourceFiber.firstEffect = sourceFiber.lastEffect = null;

  if (value !== null && typeof value === 'object' && typeof value.then === 'function') {
    // This is a thenable.
    var thenable = value;

    // Find the earliest timeout threshold of all the placeholders in the
    // ancestor path. We could avoid this traversal by storing the thresholds on
    // the stack, but we choose not to because we only hit this path if we're
    // IO-bound (i.e. if something suspends). Whereas the stack is used even in
    // the non-IO- bound case.
    var _workInProgress = returnFiber;
    var earliestTimeoutMs = -1;
    var startTimeMs = -1;
    do {
      if (_workInProgress.tag === SuspenseComponent) {
        var current$$1 = _workInProgress.alternate;
        if (current$$1 !== null) {
          var currentState = current$$1.memoizedState;
          if (currentState !== null) {
            // Reached a boundary that already timed out. Do not search
            // any further.
            var timedOutAt = currentState.timedOutAt;
            startTimeMs = expirationTimeToMs(timedOutAt);
            // Do not search any further.
            break;
          }
        }
        var timeoutPropMs = _workInProgress.pendingProps.maxDuration;
        if (typeof timeoutPropMs === 'number') {
          if (timeoutPropMs <= 0) {
            earliestTimeoutMs = 0;
          } else if (earliestTimeoutMs === -1 || timeoutPropMs < earliestTimeoutMs) {
            earliestTimeoutMs = timeoutPropMs;
          }
        }
      }
      // If there is a DehydratedSuspenseComponent we don't have to do anything because
      // if something suspends inside it, we will simply leave that as dehydrated. It
      // will never timeout.
      _workInProgress = _workInProgress.return;
    } while (_workInProgress !== null);

    // Schedule the nearest Suspense to re-render the timed out view.
    _workInProgress = returnFiber;
    do {
      if (_workInProgress.tag === SuspenseComponent && shouldCaptureSuspense(_workInProgress)) {
        // Found the nearest boundary.

        // Stash the promise on the boundary fiber. If the boundary times out, we'll
        var thenables = _workInProgress.updateQueue;
        if (thenables === null) {
          var updateQueue = new Set();
          updateQueue.add(thenable);
          _workInProgress.updateQueue = updateQueue;
        } else {
          thenables.add(thenable);
        }

        // If the boundary is outside of concurrent mode, we should *not*
        // suspend the commit. Pretend as if the suspended component rendered
        // null and keep rendering. In the commit phase, we'll schedule a
        // subsequent synchronous update to re-render the Suspense.
        //
        // Note: It doesn't matter whether the component that suspended was
        // inside a concurrent mode tree. If the Suspense is outside of it, we
        // should *not* suspend the commit.
        if ((_workInProgress.mode & ConcurrentMode) === NoEffect) {
          _workInProgress.effectTag |= DidCapture;

          // We're going to commit this fiber even though it didn't complete.
          // But we shouldn't call any lifecycle methods or callbacks. Remove
          // all lifecycle effect tags.
          sourceFiber.effectTag &= ~(LifecycleEffectMask | Incomplete);

          if (sourceFiber.tag === ClassComponent) {
            var currentSourceFiber = sourceFiber.alternate;
            if (currentSourceFiber === null) {
              // This is a new mount. Change the tag so it's not mistaken for a
              // completed class component. For example, we should not call
              // componentWillUnmount if it is deleted.
              sourceFiber.tag = IncompleteClassComponent;
            } else {
              // When we try rendering again, we should not reuse the current fiber,
              // since it's known to be in an inconsistent state. Use a force updte to
              // prevent a bail out.
              var update = createUpdate(Sync);
              update.tag = ForceUpdate;
              enqueueUpdate(sourceFiber, update);
            }
          }

          // The source fiber did not complete. Mark it with Sync priority to
          // indicate that it still has pending work.
          sourceFiber.expirationTime = Sync;

          // Exit without suspending.
          return;
        }

        // Confirmed that the boundary is in a concurrent mode tree. Continue
        // with the normal suspend path.

        attachPingListener(root, renderExpirationTime, thenable);

        var absoluteTimeoutMs = void 0;
        if (earliestTimeoutMs === -1) {
          // If no explicit threshold is given, default to an arbitrarily large
          // value. The actual size doesn't matter because the threshold for the
          // whole tree will be clamped to the expiration time.
          absoluteTimeoutMs = maxSigned31BitInt;
        } else {
          if (startTimeMs === -1) {
            // This suspend happened outside of any already timed-out
            // placeholders. We don't know exactly when the update was
            // scheduled, but we can infer an approximate start time from the
            // expiration time. First, find the earliest uncommitted expiration
            // time in the tree, including work that is suspended. Then subtract
            // the offset used to compute an async update's expiration time.
            // This will cause high priority (interactive) work to expire
            // earlier than necessary, but we can account for this by adjusting
            // for the Just Noticeable Difference.
            var earliestExpirationTime = findEarliestOutstandingPriorityLevel(root, renderExpirationTime);
            var earliestExpirationTimeMs = expirationTimeToMs(earliestExpirationTime);
            startTimeMs = earliestExpirationTimeMs - LOW_PRIORITY_EXPIRATION;
          }
          absoluteTimeoutMs = startTimeMs + earliestTimeoutMs;
        }

        // Mark the earliest timeout in the suspended fiber's ancestor path.
        // After completing the root, we'll take the largest of all the
        // suspended fiber's timeouts and use it to compute a timeout for the
        // whole tree.
        renderDidSuspend(root, absoluteTimeoutMs, renderExpirationTime);

        _workInProgress.effectTag |= ShouldCapture;
        _workInProgress.expirationTime = renderExpirationTime;
        return;
      } else if (enableSuspenseServerRenderer && _workInProgress.tag === DehydratedSuspenseComponent) {
        attachPingListener(root, renderExpirationTime, thenable);

        // Since we already have a current fiber, we can eagerly add a retry listener.
        var retryCache = _workInProgress.memoizedState;
        if (retryCache === null) {
          retryCache = _workInProgress.memoizedState = new PossiblyWeakSet();
          var _current = _workInProgress.alternate;
          !_current ? invariant(false, 'A dehydrated suspense boundary must commit before trying to render. This is probably a bug in React.') : void 0;
          _current.memoizedState = retryCache;
        }
        // Memoize using the boundary fiber to prevent redundant listeners.
        if (!retryCache.has(thenable)) {
          retryCache.add(thenable);
          var retry = retryTimedOutBoundary.bind(null, _workInProgress, thenable);
          if (enableSchedulerTracing) {
            retry = tracing.unstable_wrap(retry);
          }
          thenable.then(retry, retry);
        }
        _workInProgress.effectTag |= ShouldCapture;
        _workInProgress.expirationTime = renderExpirationTime;
        return;
      }
      // This boundary already captured during this render. Continue to the next
      // boundary.
      _workInProgress = _workInProgress.return;
    } while (_workInProgress !== null);
    // No boundary was found. Fallthrough to error mode.
    // TODO: Use invariant so the message is stripped in prod?
    value = new Error((getComponentName(sourceFiber.type) || 'A React component') + ' suspended while rendering, but no fallback UI was specified.\n' + '\n' + 'Add a <Suspense fallback=...> component higher in the tree to ' + 'provide a loading indicator or placeholder to display.' + getStackByFiberInDevAndProd(sourceFiber));
  }

  // We didn't find a boundary that could handle this type of exception. Start
  // over and traverse parent path again, this time treating the exception
  // as an error.
  renderDidError();
  value = createCapturedValue(value, sourceFiber);
  var workInProgress = returnFiber;
  do {
    switch (workInProgress.tag) {
      case HostRoot:
        {
          var _errorInfo = value;
          workInProgress.effectTag |= ShouldCapture;
          workInProgress.expirationTime = renderExpirationTime;
          var _update = createRootErrorUpdate(workInProgress, _errorInfo, renderExpirationTime);
          enqueueCapturedUpdate(workInProgress, _update);
          return;
        }
      case ClassComponent:
        // Capture and retry
        var errorInfo = value;
        var ctor = workInProgress.type;
        var instance = workInProgress.stateNode;
        if ((workInProgress.effectTag & DidCapture) === NoEffect && (typeof ctor.getDerivedStateFromError === 'function' || instance !== null && typeof instance.componentDidCatch === 'function' && !isAlreadyFailedLegacyErrorBoundary(instance))) {
          workInProgress.effectTag |= ShouldCapture;
          workInProgress.expirationTime = renderExpirationTime;
          // Schedule the error boundary to re-render using updated state
          var _update2 = createClassErrorUpdate(workInProgress, errorInfo, renderExpirationTime);
          enqueueCapturedUpdate(workInProgress, _update2);
          return;
        }
        break;
      default:
        break;
    }
    workInProgress = workInProgress.return;
  } while (workInProgress !== null);
}

function unwindWork(workInProgress, renderExpirationTime) {
  switch (workInProgress.tag) {
    case ClassComponent:
      {
        var Component = workInProgress.type;
        if (isContextProvider(Component)) {
          popContext(workInProgress);
        }
        var effectTag = workInProgress.effectTag;
        if (effectTag & ShouldCapture) {
          workInProgress.effectTag = effectTag & ~ShouldCapture | DidCapture;
          return workInProgress;
        }
        return null;
      }
    case HostRoot:
      {
        popHostContainer(workInProgress);
        popTopLevelContextObject(workInProgress);
        var _effectTag = workInProgress.effectTag;
        !((_effectTag & DidCapture) === NoEffect) ? invariant(false, 'The root failed to unmount after an error. This is likely a bug in React. Please file an issue.') : void 0;
        workInProgress.effectTag = _effectTag & ~ShouldCapture | DidCapture;
        return workInProgress;
      }
    case HostComponent:
      {
        // TODO: popHydrationState
        popHostContext(workInProgress);
        return null;
      }
    case SuspenseComponent:
      {
        var _effectTag2 = workInProgress.effectTag;
        if (_effectTag2 & ShouldCapture) {
          workInProgress.effectTag = _effectTag2 & ~ShouldCapture | DidCapture;
          // Captured a suspense effect. Re-render the boundary.
          return workInProgress;
        }
        return null;
      }
    case DehydratedSuspenseComponent:
      {
        if (enableSuspenseServerRenderer) {
          // TODO: popHydrationState
          var _effectTag3 = workInProgress.effectTag;
          if (_effectTag3 & ShouldCapture) {
            workInProgress.effectTag = _effectTag3 & ~ShouldCapture | DidCapture;
            // Captured a suspense effect. Re-render the boundary.
            return workInProgress;
          }
        }
        return null;
      }
    case HostPortal:
      popHostContainer(workInProgress);
      return null;
    case ContextProvider:
      popProvider(workInProgress);
      return null;
    default:
      return null;
  }
}

function unwindInterruptedWork(interruptedWork) {
  switch (interruptedWork.tag) {
    case ClassComponent:
      {
        var childContextTypes = interruptedWork.type.childContextTypes;
        if (childContextTypes !== null && childContextTypes !== undefined) {
          popContext(interruptedWork);
        }
        break;
      }
    case HostRoot:
      {
        popHostContainer(interruptedWork);
        popTopLevelContextObject(interruptedWork);
        break;
      }
    case HostComponent:
      {
        popHostContext(interruptedWork);
        break;
      }
    case HostPortal:
      popHostContainer(interruptedWork);
      break;
    case ContextProvider:
      popProvider(interruptedWork);
      break;
    default:
      break;
  }
}

var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;


var didWarnAboutStateTransition = void 0;
var didWarnSetStateChildContext = void 0;
var warnAboutUpdateOnUnmounted = void 0;
var warnAboutInvalidUpdates = void 0;

if (enableSchedulerTracing) {
  // Provide explicit error message when production+profiling bundle of e.g. react-dom
  // is used with production (non-profiling) bundle of scheduler/tracing
  !(tracing.__interactionsRef != null && tracing.__interactionsRef.current != null) ? invariant(false, 'It is not supported to run the profiling version of a renderer (for example, `react-dom/profiling`) without also replacing the `scheduler/tracing` module with `scheduler/tracing-profiling`. Your bundler might have a setting for aliasing both modules. Learn more at http://fb.me/react-profiling') : void 0;
}

{
  didWarnAboutStateTransition = false;
  didWarnSetStateChildContext = false;
  var didWarnStateUpdateForUnmountedComponent = {};

  warnAboutUpdateOnUnmounted = function (fiber, isClass) {
    // We show the whole stack but dedupe on the top component's name because
    // the problematic code almost always lies inside that component.
    var componentName = getComponentName(fiber.type) || 'ReactComponent';
    if (didWarnStateUpdateForUnmountedComponent[componentName]) {
      return;
    }
    warningWithoutStack$1(false, "Can't perform a React state update on an unmounted component. This " + 'is a no-op, but it indicates a memory leak in your application. To ' + 'fix, cancel all subscriptions and asynchronous tasks in %s.%s', isClass ? 'the componentWillUnmount method' : 'a useEffect cleanup function', getStackByFiberInDevAndProd(fiber));
    didWarnStateUpdateForUnmountedComponent[componentName] = true;
  };

  warnAboutInvalidUpdates = function (instance) {
    switch (phase) {
      case 'getChildContext':
        if (didWarnSetStateChildContext) {
          return;
        }
        warningWithoutStack$1(false, 'setState(...): Cannot call setState() inside getChildContext()');
        didWarnSetStateChildContext = true;
        break;
      case 'render':
        if (didWarnAboutStateTransition) {
          return;
        }
        warningWithoutStack$1(false, 'Cannot update during an existing state transition (such as within ' + '`render`). Render methods should be a pure function of props and state.');
        didWarnAboutStateTransition = true;
        break;
    }
  };
}

// Used to ensure computeUniqueAsyncExpiration is monotonically decreasing.
var lastUniqueAsyncExpiration = Sync - 1;

var isWorking = false;

// The next work in progress fiber that we're currently working on.
var nextUnitOfWork = null;
var nextRoot = null;
// The time at which we're currently rendering work.
var nextRenderExpirationTime = NoWork;
var nextLatestAbsoluteTimeoutMs = -1;
var nextRenderDidError = false;

// The next fiber with an effect that we're currently committing.
var nextEffect = null;

var isCommitting$1 = false;
var rootWithPendingPassiveEffects = null;
var passiveEffectCallbackHandle = null;
var passiveEffectCallback = null;

var legacyErrorBoundariesThatAlreadyFailed = null;

// Used for performance tracking.
var interruptedBy = null;

var stashedWorkInProgressProperties = void 0;
var replayUnitOfWork = void 0;
var mayReplayFailedUnitOfWork = void 0;
var isReplayingFailedUnitOfWork = void 0;
var originalReplayError = void 0;
var rethrowOriginalError = void 0;
if ( true && replayFailedUnitOfWorkWithInvokeGuardedCallback) {
  stashedWorkInProgressProperties = null;
  mayReplayFailedUnitOfWork = true;
  isReplayingFailedUnitOfWork = false;
  originalReplayError = null;
  replayUnitOfWork = function (failedUnitOfWork, thrownValue, isYieldy) {
    if (thrownValue !== null && typeof thrownValue === 'object' && typeof thrownValue.then === 'function') {
      // Don't replay promises. Treat everything else like an error.
      // TODO: Need to figure out a different strategy if/when we add
      // support for catching other types.
      return;
    }

    // Restore the original state of the work-in-progress
    if (stashedWorkInProgressProperties === null) {
      // This should never happen. Don't throw because this code is DEV-only.
      warningWithoutStack$1(false, 'Could not replay rendering after an error. This is likely a bug in React. ' + 'Please file an issue.');
      return;
    }
    assignFiberPropertiesInDEV(failedUnitOfWork, stashedWorkInProgressProperties);

    switch (failedUnitOfWork.tag) {
      case HostRoot:
        popHostContainer(failedUnitOfWork);
        popTopLevelContextObject(failedUnitOfWork);
        break;
      case HostComponent:
        popHostContext(failedUnitOfWork);
        break;
      case ClassComponent:
        {
          var Component = failedUnitOfWork.type;
          if (isContextProvider(Component)) {
            popContext(failedUnitOfWork);
          }
          break;
        }
      case HostPortal:
        popHostContainer(failedUnitOfWork);
        break;
      case ContextProvider:
        popProvider(failedUnitOfWork);
        break;
    }
    // Replay the begin phase.
    isReplayingFailedUnitOfWork = true;
    originalReplayError = thrownValue;
    invokeGuardedCallback(null, workLoop, null, isYieldy);
    isReplayingFailedUnitOfWork = false;
    originalReplayError = null;
    if (hasCaughtError()) {
      var replayError = clearCaughtError();
      if (replayError != null && thrownValue != null) {
        try {
          // Reading the expando property is intentionally
          // inside `try` because it might be a getter or Proxy.
          if (replayError._suppressLogging) {
            // Also suppress logging for the original error.
            thrownValue._suppressLogging = true;
          }
        } catch (inner) {
          // Ignore.
        }
      }
    } else {
      // If the begin phase did not fail the second time, set this pointer
      // back to the original value.
      nextUnitOfWork = failedUnitOfWork;
    }
  };
  rethrowOriginalError = function () {
    throw originalReplayError;
  };
}

function resetStack() {
  if (nextUnitOfWork !== null) {
    var interruptedWork = nextUnitOfWork.return;
    while (interruptedWork !== null) {
      unwindInterruptedWork(interruptedWork);
      interruptedWork = interruptedWork.return;
    }
  }

  {
    ReactStrictModeWarnings.discardPendingWarnings();
    checkThatStackIsEmpty();
  }

  nextRoot = null;
  nextRenderExpirationTime = NoWork;
  nextLatestAbsoluteTimeoutMs = -1;
  nextRenderDidError = false;
  nextUnitOfWork = null;
}

function commitAllHostEffects() {
  while (nextEffect !== null) {
    {
      setCurrentFiber(nextEffect);
    }
    recordEffect();

    var effectTag = nextEffect.effectTag;

    if (effectTag & ContentReset) {
      commitResetTextContent(nextEffect);
    }

    if (effectTag & Ref) {
      var current$$1 = nextEffect.alternate;
      if (current$$1 !== null) {
        commitDetachRef(current$$1);
      }
    }

    // The following switch statement is only concerned about placement,
    // updates, and deletions. To avoid needing to add a case for every
    // possible bitmap value, we remove the secondary effects from the
    // effect tag and switch on that value.
    var primaryEffectTag = effectTag & (Placement | Update | Deletion);
    switch (primaryEffectTag) {
      case Placement:
        {
          commitPlacement(nextEffect);
          // Clear the "placement" from effect tag so that we know that this is inserted, before
          // any life-cycles like componentDidMount gets called.
          // TODO: findDOMNode doesn't rely on this any more but isMounted
          // does and isMounted is deprecated anyway so we should be able
          // to kill this.
          nextEffect.effectTag &= ~Placement;
          break;
        }
      case PlacementAndUpdate:
        {
          // Placement
          commitPlacement(nextEffect);
          // Clear the "placement" from effect tag so that we know that this is inserted, before
          // any life-cycles like componentDidMount gets called.
          nextEffect.effectTag &= ~Placement;

          // Update
          var _current = nextEffect.alternate;
          commitWork(_current, nextEffect);
          break;
        }
      case Update:
        {
          var _current2 = nextEffect.alternate;
          commitWork(_current2, nextEffect);
          break;
        }
      case Deletion:
        {
          commitDeletion(nextEffect);
          break;
        }
    }
    nextEffect = nextEffect.nextEffect;
  }

  {
    resetCurrentFiber();
  }
}

function commitBeforeMutationLifecycles() {
  while (nextEffect !== null) {
    {
      setCurrentFiber(nextEffect);
    }

    var effectTag = nextEffect.effectTag;
    if (effectTag & Snapshot) {
      recordEffect();
      var current$$1 = nextEffect.alternate;
      commitBeforeMutationLifeCycles(current$$1, nextEffect);
    }

    nextEffect = nextEffect.nextEffect;
  }

  {
    resetCurrentFiber();
  }
}

function commitAllLifeCycles(finishedRoot, committedExpirationTime) {
  {
    ReactStrictModeWarnings.flushPendingUnsafeLifecycleWarnings();
    ReactStrictModeWarnings.flushLegacyContextWarning();

    if (warnAboutDeprecatedLifecycles) {
      ReactStrictModeWarnings.flushPendingDeprecationWarnings();
    }
  }
  while (nextEffect !== null) {
    {
      setCurrentFiber(nextEffect);
    }
    var effectTag = nextEffect.effectTag;

    if (effectTag & (Update | Callback)) {
      recordEffect();
      var current$$1 = nextEffect.alternate;
      commitLifeCycles(finishedRoot, current$$1, nextEffect, committedExpirationTime);
    }

    if (effectTag & Ref) {
      recordEffect();
      commitAttachRef(nextEffect);
    }

    if (effectTag & Passive) {
      rootWithPendingPassiveEffects = finishedRoot;
    }

    nextEffect = nextEffect.nextEffect;
  }
  {
    resetCurrentFiber();
  }
}

function commitPassiveEffects(root, firstEffect) {
  rootWithPendingPassiveEffects = null;
  passiveEffectCallbackHandle = null;
  passiveEffectCallback = null;

  // Set this to true to prevent re-entrancy
  var previousIsRendering = isRendering;
  isRendering = true;

  var effect = firstEffect;
  do {
    {
      setCurrentFiber(effect);
    }

    if (effect.effectTag & Passive) {
      var didError = false;
      var error = void 0;
      {
        invokeGuardedCallback(null, commitPassiveHookEffects, null, effect);
        if (hasCaughtError()) {
          didError = true;
          error = clearCaughtError();
        }
      }
      if (didError) {
        captureCommitPhaseError(effect, error);
      }
    }
    effect = effect.nextEffect;
  } while (effect !== null);
  {
    resetCurrentFiber();
  }

  isRendering = previousIsRendering;

  // Check if work was scheduled by one of the effects
  var rootExpirationTime = root.expirationTime;
  if (rootExpirationTime !== NoWork) {
    requestWork(root, rootExpirationTime);
  }
  // Flush any sync work that was scheduled by effects
  if (!isBatchingUpdates && !isRendering) {
    performSyncWork();
  }
}

function isAlreadyFailedLegacyErrorBoundary(instance) {
  return legacyErrorBoundariesThatAlreadyFailed !== null && legacyErrorBoundariesThatAlreadyFailed.has(instance);
}

function markLegacyErrorBoundaryAsFailed(instance) {
  if (legacyErrorBoundariesThatAlreadyFailed === null) {
    legacyErrorBoundariesThatAlreadyFailed = new Set([instance]);
  } else {
    legacyErrorBoundariesThatAlreadyFailed.add(instance);
  }
}

function flushPassiveEffects() {
  if (passiveEffectCallbackHandle !== null) {
    cancelPassiveEffects(passiveEffectCallbackHandle);
  }
  if (passiveEffectCallback !== null) {
    // We call the scheduled callback instead of commitPassiveEffects directly
    // to ensure tracing works correctly.
    passiveEffectCallback();
  }
}

function commitRoot(root, finishedWork) {
  isWorking = true;
  isCommitting$1 = true;
  startCommitTimer();

  !(root.current !== finishedWork) ? invariant(false, 'Cannot commit the same tree as before. This is probably a bug related to the return field. This error is likely caused by a bug in React. Please file an issue.') : void 0;
  var committedExpirationTime = root.pendingCommitExpirationTime;
  !(committedExpirationTime !== NoWork) ? invariant(false, 'Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.') : void 0;
  root.pendingCommitExpirationTime = NoWork;

  // Update the pending priority levels to account for the work that we are
  // about to commit. This needs to happen before calling the lifecycles, since
  // they may schedule additional updates.
  var updateExpirationTimeBeforeCommit = finishedWork.expirationTime;
  var childExpirationTimeBeforeCommit = finishedWork.childExpirationTime;
  var earliestRemainingTimeBeforeCommit = childExpirationTimeBeforeCommit > updateExpirationTimeBeforeCommit ? childExpirationTimeBeforeCommit : updateExpirationTimeBeforeCommit;
  markCommittedPriorityLevels(root, earliestRemainingTimeBeforeCommit);

  var prevInteractions = null;
  if (enableSchedulerTracing) {
    // Restore any pending interactions at this point,
    // So that cascading work triggered during the render phase will be accounted for.
    prevInteractions = tracing.__interactionsRef.current;
    tracing.__interactionsRef.current = root.memoizedInteractions;
  }

  // Reset this to null before calling lifecycles
  ReactCurrentOwner$1.current = null;

  var firstEffect = void 0;
  if (finishedWork.effectTag > PerformedWork) {
    // A fiber's effect list consists only of its children, not itself. So if
    // the root has an effect, we need to add it to the end of the list. The
    // resulting list is the set that would belong to the root's parent, if
    // it had one; that is, all the effects in the tree including the root.
    if (finishedWork.lastEffect !== null) {
      finishedWork.lastEffect.nextEffect = finishedWork;
      firstEffect = finishedWork.firstEffect;
    } else {
      firstEffect = finishedWork;
    }
  } else {
    // There is no effect on the root.
    firstEffect = finishedWork.firstEffect;
  }

  prepareForCommit(root.containerInfo);

  // Invoke instances of getSnapshotBeforeUpdate before mutation.
  nextEffect = firstEffect;
  startCommitSnapshotEffectsTimer();
  while (nextEffect !== null) {
    var didError = false;
    var error = void 0;
    {
      invokeGuardedCallback(null, commitBeforeMutationLifecycles, null);
      if (hasCaughtError()) {
        didError = true;
        error = clearCaughtError();
      }
    }
    if (didError) {
      !(nextEffect !== null) ? invariant(false, 'Should have next effect. This error is likely caused by a bug in React. Please file an issue.') : void 0;
      captureCommitPhaseError(nextEffect, error);
      // Clean-up
      if (nextEffect !== null) {
        nextEffect = nextEffect.nextEffect;
      }
    }
  }
  stopCommitSnapshotEffectsTimer();

  if (enableProfilerTimer) {
    // Mark the current commit time to be shared by all Profilers in this batch.
    // This enables them to be grouped later.
    recordCommitTime();
  }

  // Commit all the side-effects within a tree. We'll do this in two passes.
  // The first pass performs all the host insertions, updates, deletions and
  // ref unmounts.
  nextEffect = firstEffect;
  startCommitHostEffectsTimer();
  while (nextEffect !== null) {
    var _didError = false;
    var _error = void 0;
    {
      invokeGuardedCallback(null, commitAllHostEffects, null);
      if (hasCaughtError()) {
        _didError = true;
        _error = clearCaughtError();
      }
    }
    if (_didError) {
      !(nextEffect !== null) ? invariant(false, 'Should have next effect. This error is likely caused by a bug in React. Please file an issue.') : void 0;
      captureCommitPhaseError(nextEffect, _error);
      // Clean-up
      if (nextEffect !== null) {
        nextEffect = nextEffect.nextEffect;
      }
    }
  }
  stopCommitHostEffectsTimer();

  resetAfterCommit(root.containerInfo);

  // The work-in-progress tree is now the current tree. This must come after
  // the first pass of the commit phase, so that the previous tree is still
  // current during componentWillUnmount, but before the second pass, so that
  // the finished work is current during componentDidMount/Update.
  root.current = finishedWork;

  // In the second pass we'll perform all life-cycles and ref callbacks.
  // Life-cycles happen as a separate pass so that all placements, updates,
  // and deletions in the entire tree have already been invoked.
  // This pass also triggers any renderer-specific initial effects.
  nextEffect = firstEffect;
  startCommitLifeCyclesTimer();
  while (nextEffect !== null) {
    var _didError2 = false;
    var _error2 = void 0;
    {
      invokeGuardedCallback(null, commitAllLifeCycles, null, root, committedExpirationTime);
      if (hasCaughtError()) {
        _didError2 = true;
        _error2 = clearCaughtError();
      }
    }
    if (_didError2) {
      !(nextEffect !== null) ? invariant(false, 'Should have next effect. This error is likely caused by a bug in React. Please file an issue.') : void 0;
      captureCommitPhaseError(nextEffect, _error2);
      if (nextEffect !== null) {
        nextEffect = nextEffect.nextEffect;
      }
    }
  }

  if (firstEffect !== null && rootWithPendingPassiveEffects !== null) {
    // This commit included a passive effect. These do not need to fire until
    // after the next paint. Schedule an callback to fire them in an async
    // event. To ensure serial execution, the callback will be flushed early if
    // we enter rootWithPendingPassiveEffects commit phase before then.
    var callback = commitPassiveEffects.bind(null, root, firstEffect);
    if (enableSchedulerTracing) {
      // TODO: Avoid this extra callback by mutating the tracing ref directly,
      // like we do at the beginning of commitRoot. I've opted not to do that
      // here because that code is still in flux.
      callback = tracing.unstable_wrap(callback);
    }
    passiveEffectCallbackHandle = scheduler.unstable_runWithPriority(scheduler.unstable_NormalPriority, function () {
      return schedulePassiveEffects(callback);
    });
    passiveEffectCallback = callback;
  }

  isCommitting$1 = false;
  isWorking = false;
  stopCommitLifeCyclesTimer();
  stopCommitTimer();
  onCommitRoot(finishedWork.stateNode);
  if ( true && ReactFiberInstrumentation_1.debugTool) {
    ReactFiberInstrumentation_1.debugTool.onCommitWork(finishedWork);
  }

  var updateExpirationTimeAfterCommit = finishedWork.expirationTime;
  var childExpirationTimeAfterCommit = finishedWork.childExpirationTime;
  var earliestRemainingTimeAfterCommit = childExpirationTimeAfterCommit > updateExpirationTimeAfterCommit ? childExpirationTimeAfterCommit : updateExpirationTimeAfterCommit;
  if (earliestRemainingTimeAfterCommit === NoWork) {
    // If there's no remaining work, we can clear the set of already failed
    // error boundaries.
    legacyErrorBoundariesThatAlreadyFailed = null;
  }
  onCommit(root, earliestRemainingTimeAfterCommit);

  if (enableSchedulerTracing) {
    tracing.__interactionsRef.current = prevInteractions;

    var subscriber = void 0;

    try {
      subscriber = tracing.__subscriberRef.current;
      if (subscriber !== null && root.memoizedInteractions.size > 0) {
        var threadID = computeThreadID(committedExpirationTime, root.interactionThreadID);
        subscriber.onWorkStopped(root.memoizedInteractions, threadID);
      }
    } catch (error) {
      // It's not safe for commitRoot() to throw.
      // Store the error for now and we'll re-throw in finishRendering().
      if (!hasUnhandledError) {
        hasUnhandledError = true;
        unhandledError = error;
      }
    } finally {
      // Clear completed interactions from the pending Map.
      // Unless the render was suspended or cascading work was scheduled,
      // In which case– leave pending interactions until the subsequent render.
      var pendingInteractionMap = root.pendingInteractionMap;
      pendingInteractionMap.forEach(function (scheduledInteractions, scheduledExpirationTime) {
        // Only decrement the pending interaction count if we're done.
        // If there's still work at the current priority,
        // That indicates that we are waiting for suspense data.
        if (scheduledExpirationTime > earliestRemainingTimeAfterCommit) {
          pendingInteractionMap.delete(scheduledExpirationTime);

          scheduledInteractions.forEach(function (interaction) {
            interaction.__count--;

            if (subscriber !== null && interaction.__count === 0) {
              try {
                subscriber.onInteractionScheduledWorkCompleted(interaction);
              } catch (error) {
                // It's not safe for commitRoot() to throw.
                // Store the error for now and we'll re-throw in finishRendering().
                if (!hasUnhandledError) {
                  hasUnhandledError = true;
                  unhandledError = error;
                }
              }
            }
          });
        }
      });
    }
  }
}

function resetChildExpirationTime(workInProgress, renderTime) {
  if (renderTime !== Never && workInProgress.childExpirationTime === Never) {
    // The children of this component are hidden. Don't bubble their
    // expiration times.
    return;
  }

  var newChildExpirationTime = NoWork;

  // Bubble up the earliest expiration time.
  if (enableProfilerTimer && workInProgress.mode & ProfileMode) {
    // We're in profiling mode.
    // Let's use this same traversal to update the render durations.
    var actualDuration = workInProgress.actualDuration;
    var treeBaseDuration = workInProgress.selfBaseDuration;

    // When a fiber is cloned, its actualDuration is reset to 0.
    // This value will only be updated if work is done on the fiber (i.e. it doesn't bailout).
    // When work is done, it should bubble to the parent's actualDuration.
    // If the fiber has not been cloned though, (meaning no work was done),
    // Then this value will reflect the amount of time spent working on a previous render.
    // In that case it should not bubble.
    // We determine whether it was cloned by comparing the child pointer.
    var shouldBubbleActualDurations = workInProgress.alternate === null || workInProgress.child !== workInProgress.alternate.child;

    var child = workInProgress.child;
    while (child !== null) {
      var childUpdateExpirationTime = child.expirationTime;
      var childChildExpirationTime = child.childExpirationTime;
      if (childUpdateExpirationTime > newChildExpirationTime) {
        newChildExpirationTime = childUpdateExpirationTime;
      }
      if (childChildExpirationTime > newChildExpirationTime) {
        newChildExpirationTime = childChildExpirationTime;
      }
      if (shouldBubbleActualDurations) {
        actualDuration += child.actualDuration;
      }
      treeBaseDuration += child.treeBaseDuration;
      child = child.sibling;
    }
    workInProgress.actualDuration = actualDuration;
    workInProgress.treeBaseDuration = treeBaseDuration;
  } else {
    var _child = workInProgress.child;
    while (_child !== null) {
      var _childUpdateExpirationTime = _child.expirationTime;
      var _childChildExpirationTime = _child.childExpirationTime;
      if (_childUpdateExpirationTime > newChildExpirationTime) {
        newChildExpirationTime = _childUpdateExpirationTime;
      }
      if (_childChildExpirationTime > newChildExpirationTime) {
        newChildExpirationTime = _childChildExpirationTime;
      }
      _child = _child.sibling;
    }
  }

  workInProgress.childExpirationTime = newChildExpirationTime;
}

function completeUnitOfWork(workInProgress) {
  // Attempt to complete the current unit of work, then move to the
  // next sibling. If there are no more siblings, return to the
  // parent fiber.
  while (true) {
    // The current, flushed, state of this fiber is the alternate.
    // Ideally nothing should rely on this, but relying on it here
    // means that we don't need an additional field on the work in
    // progress.
    var current$$1 = workInProgress.alternate;
    {
      setCurrentFiber(workInProgress);
    }

    var returnFiber = workInProgress.return;
    var siblingFiber = workInProgress.sibling;

    if ((workInProgress.effectTag & Incomplete) === NoEffect) {
      if ( true && replayFailedUnitOfWorkWithInvokeGuardedCallback) {
        // Don't replay if it fails during completion phase.
        mayReplayFailedUnitOfWork = false;
      }
      // This fiber completed.
      // Remember we're completing this unit so we can find a boundary if it fails.
      nextUnitOfWork = workInProgress;
      if (enableProfilerTimer) {
        if (workInProgress.mode & ProfileMode) {
          startProfilerTimer(workInProgress);
        }
        nextUnitOfWork = completeWork(current$$1, workInProgress, nextRenderExpirationTime);
        if (workInProgress.mode & ProfileMode) {
          // Update render duration assuming we didn't error.
          stopProfilerTimerIfRunningAndRecordDelta(workInProgress, false);
        }
      } else {
        nextUnitOfWork = completeWork(current$$1, workInProgress, nextRenderExpirationTime);
      }
      if ( true && replayFailedUnitOfWorkWithInvokeGuardedCallback) {
        // We're out of completion phase so replaying is fine now.
        mayReplayFailedUnitOfWork = true;
      }
      stopWorkTimer(workInProgress);
      resetChildExpirationTime(workInProgress, nextRenderExpirationTime);
      {
        resetCurrentFiber();
      }

      if (nextUnitOfWork !== null) {
        // Completing this fiber spawned new work. Work on that next.
        return nextUnitOfWork;
      }

      if (returnFiber !== null &&
      // Do not append effects to parents if a sibling failed to complete
      (returnFiber.effectTag & Incomplete) === NoEffect) {
        // Append all the effects of the subtree and this fiber onto the effect
        // list of the parent. The completion order of the children affects the
        // side-effect order.
        if (returnFiber.firstEffect === null) {
          returnFiber.firstEffect = workInProgress.firstEffect;
        }
        if (workInProgress.lastEffect !== null) {
          if (returnFiber.lastEffect !== null) {
            returnFiber.lastEffect.nextEffect = workInProgress.firstEffect;
          }
          returnFiber.lastEffect = workInProgress.lastEffect;
        }

        // If this fiber had side-effects, we append it AFTER the children's
        // side-effects. We can perform certain side-effects earlier if
        // needed, by doing multiple passes over the effect list. We don't want
        // to schedule our own side-effect on our own list because if end up
        // reusing children we'll schedule this effect onto itself since we're
        // at the end.
        var effectTag = workInProgress.effectTag;
        // Skip both NoWork and PerformedWork tags when creating the effect list.
        // PerformedWork effect is read by React DevTools but shouldn't be committed.
        if (effectTag > PerformedWork) {
          if (returnFiber.lastEffect !== null) {
            returnFiber.lastEffect.nextEffect = workInProgress;
          } else {
            returnFiber.firstEffect = workInProgress;
          }
          returnFiber.lastEffect = workInProgress;
        }
      }

      if ( true && ReactFiberInstrumentation_1.debugTool) {
        ReactFiberInstrumentation_1.debugTool.onCompleteWork(workInProgress);
      }

      if (siblingFiber !== null) {
        // If there is more work to do in this returnFiber, do that next.
        return siblingFiber;
      } else if (returnFiber !== null) {
        // If there's no more work in this returnFiber. Complete the returnFiber.
        workInProgress = returnFiber;
        continue;
      } else {
        // We've reached the root.
        return null;
      }
    } else {
      if (enableProfilerTimer && workInProgress.mode & ProfileMode) {
        // Record the render duration for the fiber that errored.
        stopProfilerTimerIfRunningAndRecordDelta(workInProgress, false);

        // Include the time spent working on failed children before continuing.
        var actualDuration = workInProgress.actualDuration;
        var child = workInProgress.child;
        while (child !== null) {
          actualDuration += child.actualDuration;
          child = child.sibling;
        }
        workInProgress.actualDuration = actualDuration;
      }

      // This fiber did not complete because something threw. Pop values off
      // the stack without entering the complete phase. If this is a boundary,
      // capture values if possible.
      var next = unwindWork(workInProgress, nextRenderExpirationTime);
      // Because this fiber did not complete, don't reset its expiration time.
      if (workInProgress.effectTag & DidCapture) {
        // Restarting an error boundary
        stopFailedWorkTimer(workInProgress);
      } else {
        stopWorkTimer(workInProgress);
      }

      {
        resetCurrentFiber();
      }

      if (next !== null) {
        stopWorkTimer(workInProgress);
        if ( true && ReactFiberInstrumentation_1.debugTool) {
          ReactFiberInstrumentation_1.debugTool.onCompleteWork(workInProgress);
        }

        // If completing this work spawned new work, do that next. We'll come
        // back here again.
        // Since we're restarting, remove anything that is not a host effect
        // from the effect tag.
        next.effectTag &= HostEffectMask;
        return next;
      }

      if (returnFiber !== null) {
        // Mark the parent fiber as incomplete and clear its effect list.
        returnFiber.firstEffect = returnFiber.lastEffect = null;
        returnFiber.effectTag |= Incomplete;
      }

      if ( true && ReactFiberInstrumentation_1.debugTool) {
        ReactFiberInstrumentation_1.debugTool.onCompleteWork(workInProgress);
      }

      if (siblingFiber !== null) {
        // If there is more work to do in this returnFiber, do that next.
        return siblingFiber;
      } else if (returnFiber !== null) {
        // If there's no more work in this returnFiber. Complete the returnFiber.
        workInProgress = returnFiber;
        continue;
      } else {
        return null;
      }
    }
  }

  // Without this explicit null return Flow complains of invalid return type
  // TODO Remove the above while(true) loop
  // eslint-disable-next-line no-unreachable
  return null;
}

function performUnitOfWork(workInProgress) {
  // The current, flushed, state of this fiber is the alternate.
  // Ideally nothing should rely on this, but relying on it here
  // means that we don't need an additional field on the work in
  // progress.
  var current$$1 = workInProgress.alternate;

  // See if beginning this work spawns more work.
  startWorkTimer(workInProgress);
  {
    setCurrentFiber(workInProgress);
  }

  if ( true && replayFailedUnitOfWorkWithInvokeGuardedCallback) {
    stashedWorkInProgressProperties = assignFiberPropertiesInDEV(stashedWorkInProgressProperties, workInProgress);
  }

  var next = void 0;
  if (enableProfilerTimer) {
    if (workInProgress.mode & ProfileMode) {
      startProfilerTimer(workInProgress);
    }

    next = beginWork(current$$1, workInProgress, nextRenderExpirationTime);
    workInProgress.memoizedProps = workInProgress.pendingProps;

    if (workInProgress.mode & ProfileMode) {
      // Record the render duration assuming we didn't bailout (or error).
      stopProfilerTimerIfRunningAndRecordDelta(workInProgress, true);
    }
  } else {
    next = beginWork(current$$1, workInProgress, nextRenderExpirationTime);
    workInProgress.memoizedProps = workInProgress.pendingProps;
  }

  {
    resetCurrentFiber();
    if (isReplayingFailedUnitOfWork) {
      // Currently replaying a failed unit of work. This should be unreachable,
      // because the render phase is meant to be idempotent, and it should
      // have thrown again. Since it didn't, rethrow the original error, so
      // React's internal stack is not misaligned.
      rethrowOriginalError();
    }
  }
  if ( true && ReactFiberInstrumentation_1.debugTool) {
    ReactFiberInstrumentation_1.debugTool.onBeginWork(workInProgress);
  }

  if (next === null) {
    // If this doesn't spawn new work, complete the current work.
    next = completeUnitOfWork(workInProgress);
  }

  ReactCurrentOwner$1.current = null;

  return next;
}

function workLoop(isYieldy) {
  if (!isYieldy) {
    // Flush work without yielding
    while (nextUnitOfWork !== null) {
      nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    }
  } else {
    // Flush asynchronous work until there's a higher priority event
    while (nextUnitOfWork !== null && !shouldYieldToRenderer()) {
      nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    }
  }
}

function renderRoot(root, isYieldy) {
  !!isWorking ? invariant(false, 'renderRoot was called recursively. This error is likely caused by a bug in React. Please file an issue.') : void 0;

  flushPassiveEffects();

  isWorking = true;
  var previousDispatcher = ReactCurrentDispatcher.current;
  ReactCurrentDispatcher.current = ContextOnlyDispatcher;

  var expirationTime = root.nextExpirationTimeToWorkOn;

  // Check if we're starting from a fresh stack, or if we're resuming from
  // previously yielded work.
  if (expirationTime !== nextRenderExpirationTime || root !== nextRoot || nextUnitOfWork === null) {
    // Reset the stack and start working from the root.
    resetStack();
    nextRoot = root;
    nextRenderExpirationTime = expirationTime;
    nextUnitOfWork = createWorkInProgress(nextRoot.current, null, nextRenderExpirationTime);
    root.pendingCommitExpirationTime = NoWork;

    if (enableSchedulerTracing) {
      // Determine which interactions this batch of work currently includes,
      // So that we can accurately attribute time spent working on it,
      var interactions = new Set();
      root.pendingInteractionMap.forEach(function (scheduledInteractions, scheduledExpirationTime) {
        if (scheduledExpirationTime >= expirationTime) {
          scheduledInteractions.forEach(function (interaction) {
            return interactions.add(interaction);
          });
        }
      });

      // Store the current set of interactions on the FiberRoot for a few reasons:
      // We can re-use it in hot functions like renderRoot() without having to recalculate it.
      // We will also use it in commitWork() to pass to any Profiler onRender() hooks.
      // This also provides DevTools with a way to access it when the onCommitRoot() hook is called.
      root.memoizedInteractions = interactions;

      if (interactions.size > 0) {
        var subscriber = tracing.__subscriberRef.current;
        if (subscriber !== null) {
          var threadID = computeThreadID(expirationTime, root.interactionThreadID);
          try {
            subscriber.onWorkStarted(interactions, threadID);
          } catch (error) {
            // Work thrown by an interaction tracing subscriber should be rethrown,
            // But only once it's safe (to avoid leaving the scheduler in an invalid state).
            // Store the error for now and we'll re-throw in finishRendering().
            if (!hasUnhandledError) {
              hasUnhandledError = true;
              unhandledError = error;
            }
          }
        }
      }
    }
  }

  var prevInteractions = null;
  if (enableSchedulerTracing) {
    // We're about to start new traced work.
    // Restore pending interactions so cascading work triggered during the render phase will be accounted for.
    prevInteractions = tracing.__interactionsRef.current;
    tracing.__interactionsRef.current = root.memoizedInteractions;
  }

  var didFatal = false;

  startWorkLoopTimer(nextUnitOfWork);

  do {
    try {
      workLoop(isYieldy);
    } catch (thrownValue) {
      resetContextDependences();
      resetHooks();

      // Reset in case completion throws.
      // This is only used in DEV and when replaying is on.
      var mayReplay = void 0;
      if ( true && replayFailedUnitOfWorkWithInvokeGuardedCallback) {
        mayReplay = mayReplayFailedUnitOfWork;
        mayReplayFailedUnitOfWork = true;
      }

      if (nextUnitOfWork === null) {
        // This is a fatal error.
        didFatal = true;
        onUncaughtError(thrownValue);
      } else {
        if (enableProfilerTimer && nextUnitOfWork.mode & ProfileMode) {
          // Record the time spent rendering before an error was thrown.
          // This avoids inaccurate Profiler durations in the case of a suspended render.
          stopProfilerTimerIfRunningAndRecordDelta(nextUnitOfWork, true);
        }

        {
          // Reset global debug state
          // We assume this is defined in DEV
          resetCurrentlyProcessingQueue();
        }

        if ( true && replayFailedUnitOfWorkWithInvokeGuardedCallback) {
          if (mayReplay) {
            var failedUnitOfWork = nextUnitOfWork;
            replayUnitOfWork(failedUnitOfWork, thrownValue, isYieldy);
          }
        }

        // TODO: we already know this isn't true in some cases.
        // At least this shows a nicer error message until we figure out the cause.
        // https://github.com/facebook/react/issues/12449#issuecomment-386727431
        !(nextUnitOfWork !== null) ? invariant(false, 'Failed to replay rendering after an error. This is likely caused by a bug in React. Please file an issue with a reproducing case to help us find it.') : void 0;

        var sourceFiber = nextUnitOfWork;
        var returnFiber = sourceFiber.return;
        if (returnFiber === null) {
          // This is the root. The root could capture its own errors. However,
          // we don't know if it errors before or after we pushed the host
          // context. This information is needed to avoid a stack mismatch.
          // Because we're not sure, treat this as a fatal error. We could track
          // which phase it fails in, but doesn't seem worth it. At least
          // for now.
          didFatal = true;
          onUncaughtError(thrownValue);
        } else {
          throwException(root, returnFiber, sourceFiber, thrownValue, nextRenderExpirationTime);
          nextUnitOfWork = completeUnitOfWork(sourceFiber);
          continue;
        }
      }
    }
    break;
  } while (true);

  if (enableSchedulerTracing) {
    // Traced work is done for now; restore the previous interactions.
    tracing.__interactionsRef.current = prevInteractions;
  }

  // We're done performing work. Time to clean up.
  isWorking = false;
  ReactCurrentDispatcher.current = previousDispatcher;
  resetContextDependences();
  resetHooks();

  // Yield back to main thread.
  if (didFatal) {
    var _didCompleteRoot = false;
    stopWorkLoopTimer(interruptedBy, _didCompleteRoot);
    interruptedBy = null;
    // There was a fatal error.
    {
      resetStackAfterFatalErrorInDev();
    }
    // `nextRoot` points to the in-progress root. A non-null value indicates
    // that we're in the middle of an async render. Set it to null to indicate
    // there's no more work to be done in the current batch.
    nextRoot = null;
    onFatal(root);
    return;
  }

  if (nextUnitOfWork !== null) {
    // There's still remaining async work in this tree, but we ran out of time
    // in the current frame. Yield back to the renderer. Unless we're
    // interrupted by a higher priority update, we'll continue later from where
    // we left off.
    var _didCompleteRoot2 = false;
    stopWorkLoopTimer(interruptedBy, _didCompleteRoot2);
    interruptedBy = null;
    onYield(root);
    return;
  }

  // We completed the whole tree.
  var didCompleteRoot = true;
  stopWorkLoopTimer(interruptedBy, didCompleteRoot);
  var rootWorkInProgress = root.current.alternate;
  !(rootWorkInProgress !== null) ? invariant(false, 'Finished root should have a work-in-progress. This error is likely caused by a bug in React. Please file an issue.') : void 0;

  // `nextRoot` points to the in-progress root. A non-null value indicates
  // that we're in the middle of an async render. Set it to null to indicate
  // there's no more work to be done in the current batch.
  nextRoot = null;
  interruptedBy = null;

  if (nextRenderDidError) {
    // There was an error
    if (hasLowerPriorityWork(root, expirationTime)) {
      // There's lower priority work. If so, it may have the effect of fixing
      // the exception that was just thrown. Exit without committing. This is
      // similar to a suspend, but without a timeout because we're not waiting
      // for a promise to resolve. React will restart at the lower
      // priority level.
      markSuspendedPriorityLevel(root, expirationTime);
      var suspendedExpirationTime = expirationTime;
      var rootExpirationTime = root.expirationTime;
      onSuspend(root, rootWorkInProgress, suspendedExpirationTime, rootExpirationTime, -1 // Indicates no timeout
      );
      return;
    } else if (
    // There's no lower priority work, but we're rendering asynchronously.
    // Synchronously attempt to render the same level one more time. This is
    // similar to a suspend, but without a timeout because we're not waiting
    // for a promise to resolve.
    !root.didError && isYieldy) {
      root.didError = true;
      var _suspendedExpirationTime = root.nextExpirationTimeToWorkOn = expirationTime;
      var _rootExpirationTime = root.expirationTime = Sync;
      onSuspend(root, rootWorkInProgress, _suspendedExpirationTime, _rootExpirationTime, -1 // Indicates no timeout
      );
      return;
    }
  }

  if (isYieldy && nextLatestAbsoluteTimeoutMs !== -1) {
    // The tree was suspended.
    var _suspendedExpirationTime2 = expirationTime;
    markSuspendedPriorityLevel(root, _suspendedExpirationTime2);

    // Find the earliest uncommitted expiration time in the tree, including
    // work that is suspended. The timeout threshold cannot be longer than
    // the overall expiration.
    var earliestExpirationTime = findEarliestOutstandingPriorityLevel(root, expirationTime);
    var earliestExpirationTimeMs = expirationTimeToMs(earliestExpirationTime);
    if (earliestExpirationTimeMs < nextLatestAbsoluteTimeoutMs) {
      nextLatestAbsoluteTimeoutMs = earliestExpirationTimeMs;
    }

    // Subtract the current time from the absolute timeout to get the number
    // of milliseconds until the timeout. In other words, convert an absolute
    // timestamp to a relative time. This is the value that is passed
    // to `setTimeout`.
    var currentTimeMs = expirationTimeToMs(requestCurrentTime());
    var msUntilTimeout = nextLatestAbsoluteTimeoutMs - currentTimeMs;
    msUntilTimeout = msUntilTimeout < 0 ? 0 : msUntilTimeout;

    // TODO: Account for the Just Noticeable Difference

    var _rootExpirationTime2 = root.expirationTime;
    onSuspend(root, rootWorkInProgress, _suspendedExpirationTime2, _rootExpirationTime2, msUntilTimeout);
    return;
  }

  // Ready to commit.
  onComplete(root, rootWorkInProgress, expirationTime);
}

function captureCommitPhaseError(sourceFiber, value) {
  var expirationTime = Sync;
  var fiber = sourceFiber.return;
  while (fiber !== null) {
    switch (fiber.tag) {
      case ClassComponent:
        var ctor = fiber.type;
        var instance = fiber.stateNode;
        if (typeof ctor.getDerivedStateFromError === 'function' || typeof instance.componentDidCatch === 'function' && !isAlreadyFailedLegacyErrorBoundary(instance)) {
          var errorInfo = createCapturedValue(value, sourceFiber);
          var update = createClassErrorUpdate(fiber, errorInfo, expirationTime);
          enqueueUpdate(fiber, update);
          scheduleWork(fiber, expirationTime);
          return;
        }
        break;
      case HostRoot:
        {
          var _errorInfo = createCapturedValue(value, sourceFiber);
          var _update = createRootErrorUpdate(fiber, _errorInfo, expirationTime);
          enqueueUpdate(fiber, _update);
          scheduleWork(fiber, expirationTime);
          return;
        }
    }
    fiber = fiber.return;
  }

  if (sourceFiber.tag === HostRoot) {
    // Error was thrown at the root. There is no parent, so the root
    // itself should capture it.
    var rootFiber = sourceFiber;
    var _errorInfo2 = createCapturedValue(value, rootFiber);
    var _update2 = createRootErrorUpdate(rootFiber, _errorInfo2, expirationTime);
    enqueueUpdate(rootFiber, _update2);
    scheduleWork(rootFiber, expirationTime);
  }
}

function computeThreadID(expirationTime, interactionThreadID) {
  // Interaction threads are unique per root and expiration time.
  return expirationTime * 1000 + interactionThreadID;
}

// Creates a unique async expiration time.
function computeUniqueAsyncExpiration() {
  var currentTime = requestCurrentTime();
  var result = computeAsyncExpiration(currentTime);
  if (result >= lastUniqueAsyncExpiration) {
    // Since we assume the current time monotonically increases, we only hit
    // this branch when computeUniqueAsyncExpiration is fired multiple times
    // within a 200ms window (or whatever the async bucket size is).
    result = lastUniqueAsyncExpiration - 1;
  }
  lastUniqueAsyncExpiration = result;
  return lastUniqueAsyncExpiration;
}

function computeExpirationForFiber(currentTime, fiber) {
  var priorityLevel = scheduler.unstable_getCurrentPriorityLevel();

  var expirationTime = void 0;
  if ((fiber.mode & ConcurrentMode) === NoContext) {
    // Outside of concurrent mode, updates are always synchronous.
    expirationTime = Sync;
  } else if (isWorking && !isCommitting$1) {
    // During render phase, updates expire during as the current render.
    expirationTime = nextRenderExpirationTime;
  } else {
    switch (priorityLevel) {
      case scheduler.unstable_ImmediatePriority:
        expirationTime = Sync;
        break;
      case scheduler.unstable_UserBlockingPriority:
        expirationTime = computeInteractiveExpiration(currentTime);
        break;
      case scheduler.unstable_NormalPriority:
        // This is a normal, concurrent update
        expirationTime = computeAsyncExpiration(currentTime);
        break;
      case scheduler.unstable_LowPriority:
      case scheduler.unstable_IdlePriority:
        expirationTime = Never;
        break;
      default:
        invariant(false, 'Unknown priority level. This error is likely caused by a bug in React. Please file an issue.');
    }

    // If we're in the middle of rendering a tree, do not update at the same
    // expiration time that is already rendering.
    if (nextRoot !== null && expirationTime === nextRenderExpirationTime) {
      expirationTime -= 1;
    }
  }

  // Keep track of the lowest pending interactive expiration time. This
  // allows us to synchronously flush all interactive updates
  // when needed.
  // TODO: Move this to renderer?
  if (priorityLevel === scheduler.unstable_UserBlockingPriority && (lowestPriorityPendingInteractiveExpirationTime === NoWork || expirationTime < lowestPriorityPendingInteractiveExpirationTime)) {
    lowestPriorityPendingInteractiveExpirationTime = expirationTime;
  }

  return expirationTime;
}

function renderDidSuspend(root, absoluteTimeoutMs, suspendedTime) {
  // Schedule the timeout.
  if (absoluteTimeoutMs >= 0 && nextLatestAbsoluteTimeoutMs < absoluteTimeoutMs) {
    nextLatestAbsoluteTimeoutMs = absoluteTimeoutMs;
  }
}

function renderDidError() {
  nextRenderDidError = true;
}

function pingSuspendedRoot(root, thenable, pingTime) {
  // A promise that previously suspended React from committing has resolved.
  // If React is still suspended, try again at the previous level (pingTime).

  var pingCache = root.pingCache;
  if (pingCache !== null) {
    // The thenable resolved, so we no longer need to memoize, because it will
    // never be thrown again.
    pingCache.delete(thenable);
  }

  if (nextRoot !== null && nextRenderExpirationTime === pingTime) {
    // Received a ping at the same priority level at which we're currently
    // rendering. Restart from the root.
    nextRoot = null;
  } else {
    // Confirm that the root is still suspended at this level. Otherwise exit.
    if (isPriorityLevelSuspended(root, pingTime)) {
      // Ping at the original level
      markPingedPriorityLevel(root, pingTime);
      var rootExpirationTime = root.expirationTime;
      if (rootExpirationTime !== NoWork) {
        requestWork(root, rootExpirationTime);
      }
    }
  }
}

function retryTimedOutBoundary(boundaryFiber, thenable) {
  // The boundary fiber (a Suspense component) previously timed out and was
  // rendered in its fallback state. One of the promises that suspended it has
  // resolved, which means at least part of the tree was likely unblocked. Try
  var retryCache = void 0;
  if (enableSuspenseServerRenderer) {
    switch (boundaryFiber.tag) {
      case SuspenseComponent:
        retryCache = boundaryFiber.stateNode;
        break;
      case DehydratedSuspenseComponent:
        retryCache = boundaryFiber.memoizedState;
        break;
      default:
        invariant(false, 'Pinged unknown suspense boundary type. This is probably a bug in React.');
    }
  } else {
    retryCache = boundaryFiber.stateNode;
  }
  if (retryCache !== null) {
    // The thenable resolved, so we no longer need to memoize, because it will
    // never be thrown again.
    retryCache.delete(thenable);
  }

  var currentTime = requestCurrentTime();
  var retryTime = computeExpirationForFiber(currentTime, boundaryFiber);
  var root = scheduleWorkToRoot(boundaryFiber, retryTime);
  if (root !== null) {
    markPendingPriorityLevel(root, retryTime);
    var rootExpirationTime = root.expirationTime;
    if (rootExpirationTime !== NoWork) {
      requestWork(root, rootExpirationTime);
    }
  }
}

function scheduleWorkToRoot(fiber, expirationTime) {
  recordScheduleUpdate();

  {
    if (fiber.tag === ClassComponent) {
      var instance = fiber.stateNode;
      warnAboutInvalidUpdates(instance);
    }
  }

  // Update the source fiber's expiration time
  if (fiber.expirationTime < expirationTime) {
    fiber.expirationTime = expirationTime;
  }
  var alternate = fiber.alternate;
  if (alternate !== null && alternate.expirationTime < expirationTime) {
    alternate.expirationTime = expirationTime;
  }
  // Walk the parent path to the root and update the child expiration time.
  var node = fiber.return;
  var root = null;
  if (node === null && fiber.tag === HostRoot) {
    root = fiber.stateNode;
  } else {
    while (node !== null) {
      alternate = node.alternate;
      if (node.childExpirationTime < expirationTime) {
        node.childExpirationTime = expirationTime;
        if (alternate !== null && alternate.childExpirationTime < expirationTime) {
          alternate.childExpirationTime = expirationTime;
        }
      } else if (alternate !== null && alternate.childExpirationTime < expirationTime) {
        alternate.childExpirationTime = expirationTime;
      }
      if (node.return === null && node.tag === HostRoot) {
        root = node.stateNode;
        break;
      }
      node = node.return;
    }
  }

  if (enableSchedulerTracing) {
    if (root !== null) {
      var interactions = tracing.__interactionsRef.current;
      if (interactions.size > 0) {
        var pendingInteractionMap = root.pendingInteractionMap;
        var pendingInteractions = pendingInteractionMap.get(expirationTime);
        if (pendingInteractions != null) {
          interactions.forEach(function (interaction) {
            if (!pendingInteractions.has(interaction)) {
              // Update the pending async work count for previously unscheduled interaction.
              interaction.__count++;
            }

            pendingInteractions.add(interaction);
          });
        } else {
          pendingInteractionMap.set(expirationTime, new Set(interactions));

          // Update the pending async work count for the current interactions.
          interactions.forEach(function (interaction) {
            interaction.__count++;
          });
        }

        var subscriber = tracing.__subscriberRef.current;
        if (subscriber !== null) {
          var threadID = computeThreadID(expirationTime, root.interactionThreadID);
          subscriber.onWorkScheduled(interactions, threadID);
        }
      }
    }
  }
  return root;
}

function warnIfNotCurrentlyBatchingInDev(fiber) {
  {
    if (isRendering === false && isBatchingUpdates === false) {
      warningWithoutStack$1(false, 'An update to %s inside a test was not wrapped in act(...).\n\n' + 'When testing, code that causes React state updates should be wrapped into act(...):\n\n' + 'act(() => {\n' + '  /* fire events that update state */\n' + '});\n' + '/* assert on the output */\n\n' + "This ensures that you're testing the behavior the user would see in the browser." + ' Learn more at https://fb.me/react-wrap-tests-with-act' + '%s', getComponentName(fiber.type), getStackByFiberInDevAndProd(fiber));
    }
  }
}

function scheduleWork(fiber, expirationTime) {
  var root = scheduleWorkToRoot(fiber, expirationTime);
  if (root === null) {
    {
      switch (fiber.tag) {
        case ClassComponent:
          warnAboutUpdateOnUnmounted(fiber, true);
          break;
        case FunctionComponent:
        case ForwardRef:
        case MemoComponent:
        case SimpleMemoComponent:
          warnAboutUpdateOnUnmounted(fiber, false);
          break;
      }
    }
    return;
  }

  if (!isWorking && nextRenderExpirationTime !== NoWork && expirationTime > nextRenderExpirationTime) {
    // This is an interruption. (Used for performance tracking.)
    interruptedBy = fiber;
    resetStack();
  }
  markPendingPriorityLevel(root, expirationTime);
  if (
  // If we're in the render phase, we don't need to schedule this root
  // for an update, because we'll do it before we exit...
  !isWorking || isCommitting$1 ||
  // ...unless this is a different root than the one we're rendering.
  nextRoot !== root) {
    var rootExpirationTime = root.expirationTime;
    requestWork(root, rootExpirationTime);
  }
  if (nestedUpdateCount > NESTED_UPDATE_LIMIT) {
    // Reset this back to zero so subsequent updates don't throw.
    nestedUpdateCount = 0;
    invariant(false, 'Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.');
  }
}

function syncUpdates(fn, a, b, c, d) {
  return scheduler.unstable_runWithPriority(scheduler.unstable_ImmediatePriority, function () {
    return fn(a, b, c, d);
  });
}

// TODO: Everything below this is written as if it has been lifted to the
// renderers. I'll do this in a follow-up.

// Linked-list of roots
var firstScheduledRoot = null;
var lastScheduledRoot = null;

var callbackExpirationTime = NoWork;
var callbackID = void 0;
var isRendering = false;
var nextFlushedRoot = null;
var nextFlushedExpirationTime = NoWork;
var lowestPriorityPendingInteractiveExpirationTime = NoWork;
var hasUnhandledError = false;
var unhandledError = null;

var isBatchingUpdates = false;
var isUnbatchingUpdates = false;

var completedBatches = null;

var originalStartTimeMs = now();
var currentRendererTime = msToExpirationTime(originalStartTimeMs);
var currentSchedulerTime = currentRendererTime;

// Use these to prevent an infinite loop of nested updates
var NESTED_UPDATE_LIMIT = 50;
var nestedUpdateCount = 0;
var lastCommittedRootDuringThisBatch = null;

function recomputeCurrentRendererTime() {
  var currentTimeMs = now() - originalStartTimeMs;
  currentRendererTime = msToExpirationTime(currentTimeMs);
}

function scheduleCallbackWithExpirationTime(root, expirationTime) {
  if (callbackExpirationTime !== NoWork) {
    // A callback is already scheduled. Check its expiration time (timeout).
    if (expirationTime < callbackExpirationTime) {
      // Existing callback has sufficient timeout. Exit.
      return;
    } else {
      if (callbackID !== null) {
        // Existing callback has insufficient timeout. Cancel and schedule a
        // new one.
        cancelDeferredCallback(callbackID);
      }
    }
    // The request callback timer is already running. Don't start a new one.
  } else {
    startRequestCallbackTimer();
  }

  callbackExpirationTime = expirationTime;
  var currentMs = now() - originalStartTimeMs;
  var expirationTimeMs = expirationTimeToMs(expirationTime);
  var timeout = expirationTimeMs - currentMs;
  callbackID = scheduleDeferredCallback(performAsyncWork, { timeout: timeout });
}

// For every call to renderRoot, one of onFatal, onComplete, onSuspend, and
// onYield is called upon exiting. We use these in lieu of returning a tuple.
// I've also chosen not to inline them into renderRoot because these will
// eventually be lifted into the renderer.
function onFatal(root) {
  root.finishedWork = null;
}

function onComplete(root, finishedWork, expirationTime) {
  root.pendingCommitExpirationTime = expirationTime;
  root.finishedWork = finishedWork;
}

function onSuspend(root, finishedWork, suspendedExpirationTime, rootExpirationTime, msUntilTimeout) {
  root.expirationTime = rootExpirationTime;
  if (msUntilTimeout === 0 && !shouldYieldToRenderer()) {
    // Don't wait an additional tick. Commit the tree immediately.
    root.pendingCommitExpirationTime = suspendedExpirationTime;
    root.finishedWork = finishedWork;
  } else if (msUntilTimeout > 0) {
    // Wait `msUntilTimeout` milliseconds before committing.
    root.timeoutHandle = scheduleTimeout(onTimeout.bind(null, root, finishedWork, suspendedExpirationTime), msUntilTimeout);
  }
}

function onYield(root) {
  root.finishedWork = null;
}

function onTimeout(root, finishedWork, suspendedExpirationTime) {
  // The root timed out. Commit it.
  root.pendingCommitExpirationTime = suspendedExpirationTime;
  root.finishedWork = finishedWork;
  // Read the current time before entering the commit phase. We can be
  // certain this won't cause tearing related to batching of event updates
  // because we're at the top of a timer event.
  recomputeCurrentRendererTime();
  currentSchedulerTime = currentRendererTime;
  flushRoot(root, suspendedExpirationTime);
}

function onCommit(root, expirationTime) {
  root.expirationTime = expirationTime;
  root.finishedWork = null;
}

function requestCurrentTime() {
  // requestCurrentTime is called by the scheduler to compute an expiration
  // time.
  //
  // Expiration times are computed by adding to the current time (the start
  // time). However, if two updates are scheduled within the same event, we
  // should treat their start times as simultaneous, even if the actual clock
  // time has advanced between the first and second call.

  // In other words, because expiration times determine how updates are batched,
  // we want all updates of like priority that occur within the same event to
  // receive the same expiration time. Otherwise we get tearing.
  //
  // We keep track of two separate times: the current "renderer" time and the
  // current "scheduler" time. The renderer time can be updated whenever; it
  // only exists to minimize the calls performance.now.
  //
  // But the scheduler time can only be updated if there's no pending work, or
  // if we know for certain that we're not in the middle of an event.

  if (isRendering) {
    // We're already rendering. Return the most recently read time.
    return currentSchedulerTime;
  }
  // Check if there's pending work.
  findHighestPriorityRoot();
  if (nextFlushedExpirationTime === NoWork || nextFlushedExpirationTime === Never) {
    // If there's no pending work, or if the pending work is offscreen, we can
    // read the current time without risk of tearing.
    recomputeCurrentRendererTime();
    currentSchedulerTime = currentRendererTime;
    return currentSchedulerTime;
  }
  // There's already pending work. We might be in the middle of a browser
  // event. If we were to read the current time, it could cause multiple updates
  // within the same event to receive different expiration times, leading to
  // tearing. Return the last read time. During the next idle callback, the
  // time will be updated.
  return currentSchedulerTime;
}

// requestWork is called by the scheduler whenever a root receives an update.
// It's up to the renderer to call renderRoot at some point in the future.
function requestWork(root, expirationTime) {
  addRootToSchedule(root, expirationTime);
  if (isRendering) {
    // Prevent reentrancy. Remaining work will be scheduled at the end of
    // the currently rendering batch.
    return;
  }

  if (isBatchingUpdates) {
    // Flush work at the end of the batch.
    if (isUnbatchingUpdates) {
      // ...unless we're inside unbatchedUpdates, in which case we should
      // flush it now.
      nextFlushedRoot = root;
      nextFlushedExpirationTime = Sync;
      performWorkOnRoot(root, Sync, false);
    }
    return;
  }

  // TODO: Get rid of Sync and use current time?
  if (expirationTime === Sync) {
    performSyncWork();
  } else {
    scheduleCallbackWithExpirationTime(root, expirationTime);
  }
}

function addRootToSchedule(root, expirationTime) {
  // Add the root to the schedule.
  // Check if this root is already part of the schedule.
  if (root.nextScheduledRoot === null) {
    // This root is not already scheduled. Add it.
    root.expirationTime = expirationTime;
    if (lastScheduledRoot === null) {
      firstScheduledRoot = lastScheduledRoot = root;
      root.nextScheduledRoot = root;
    } else {
      lastScheduledRoot.nextScheduledRoot = root;
      lastScheduledRoot = root;
      lastScheduledRoot.nextScheduledRoot = firstScheduledRoot;
    }
  } else {
    // This root is already scheduled, but its priority may have increased.
    var remainingExpirationTime = root.expirationTime;
    if (expirationTime > remainingExpirationTime) {
      // Update the priority.
      root.expirationTime = expirationTime;
    }
  }
}

function findHighestPriorityRoot() {
  var highestPriorityWork = NoWork;
  var highestPriorityRoot = null;
  if (lastScheduledRoot !== null) {
    var previousScheduledRoot = lastScheduledRoot;
    var root = firstScheduledRoot;
    while (root !== null) {
      var remainingExpirationTime = root.expirationTime;
      if (remainingExpirationTime === NoWork) {
        // This root no longer has work. Remove it from the scheduler.

        // TODO: This check is redudant, but Flow is confused by the branch
        // below where we set lastScheduledRoot to null, even though we break
        // from the loop right after.
        !(previousScheduledRoot !== null && lastScheduledRoot !== null) ? invariant(false, 'Should have a previous and last root. This error is likely caused by a bug in React. Please file an issue.') : void 0;
        if (root === root.nextScheduledRoot) {
          // This is the only root in the list.
          root.nextScheduledRoot = null;
          firstScheduledRoot = lastScheduledRoot = null;
          break;
        } else if (root === firstScheduledRoot) {
          // This is the first root in the list.
          var next = root.nextScheduledRoot;
          firstScheduledRoot = next;
          lastScheduledRoot.nextScheduledRoot = next;
          root.nextScheduledRoot = null;
        } else if (root === lastScheduledRoot) {
          // This is the last root in the list.
          lastScheduledRoot = previousScheduledRoot;
          lastScheduledRoot.nextScheduledRoot = firstScheduledRoot;
          root.nextScheduledRoot = null;
          break;
        } else {
          previousScheduledRoot.nextScheduledRoot = root.nextScheduledRoot;
          root.nextScheduledRoot = null;
        }
        root = previousScheduledRoot.nextScheduledRoot;
      } else {
        if (remainingExpirationTime > highestPriorityWork) {
          // Update the priority, if it's higher
          highestPriorityWork = remainingExpirationTime;
          highestPriorityRoot = root;
        }
        if (root === lastScheduledRoot) {
          break;
        }
        if (highestPriorityWork === Sync) {
          // Sync is highest priority by definition so
          // we can stop searching.
          break;
        }
        previousScheduledRoot = root;
        root = root.nextScheduledRoot;
      }
    }
  }

  nextFlushedRoot = highestPriorityRoot;
  nextFlushedExpirationTime = highestPriorityWork;
}

// TODO: This wrapper exists because many of the older tests (the ones that use
// flushDeferredPri) rely on the number of times `shouldYield` is called. We
// should get rid of it.
var didYield = false;
function shouldYieldToRenderer() {
  if (didYield) {
    return true;
  }
  if (shouldYield()) {
    didYield = true;
    return true;
  }
  return false;
}

function performAsyncWork() {
  try {
    if (!shouldYieldToRenderer()) {
      // The callback timed out. That means at least one update has expired.
      // Iterate through the root schedule. If they contain expired work, set
      // the next render expiration time to the current time. This has the effect
      // of flushing all expired work in a single batch, instead of flushing each
      // level one at a time.
      if (firstScheduledRoot !== null) {
        recomputeCurrentRendererTime();
        var root = firstScheduledRoot;
        do {
          didExpireAtExpirationTime(root, currentRendererTime);
          // The root schedule is circular, so this is never null.
          root = root.nextScheduledRoot;
        } while (root !== firstScheduledRoot);
      }
    }
    performWork(NoWork, true);
  } finally {
    didYield = false;
  }
}

function performSyncWork() {
  performWork(Sync, false);
}

function performWork(minExpirationTime, isYieldy) {
  // Keep working on roots until there's no more work, or until there's a higher
  // priority event.
  findHighestPriorityRoot();

  if (isYieldy) {
    recomputeCurrentRendererTime();
    currentSchedulerTime = currentRendererTime;

    if (enableUserTimingAPI) {
      var didExpire = nextFlushedExpirationTime > currentRendererTime;
      var timeout = expirationTimeToMs(nextFlushedExpirationTime);
      stopRequestCallbackTimer(didExpire, timeout);
    }

    while (nextFlushedRoot !== null && nextFlushedExpirationTime !== NoWork && minExpirationTime <= nextFlushedExpirationTime && !(didYield && currentRendererTime > nextFlushedExpirationTime)) {
      performWorkOnRoot(nextFlushedRoot, nextFlushedExpirationTime, currentRendererTime > nextFlushedExpirationTime);
      findHighestPriorityRoot();
      recomputeCurrentRendererTime();
      currentSchedulerTime = currentRendererTime;
    }
  } else {
    while (nextFlushedRoot !== null && nextFlushedExpirationTime !== NoWork && minExpirationTime <= nextFlushedExpirationTime) {
      performWorkOnRoot(nextFlushedRoot, nextFlushedExpirationTime, false);
      findHighestPriorityRoot();
    }
  }

  // We're done flushing work. Either we ran out of time in this callback,
  // or there's no more work left with sufficient priority.

  // If we're inside a callback, set this to false since we just completed it.
  if (isYieldy) {
    callbackExpirationTime = NoWork;
    callbackID = null;
  }
  // If there's work left over, schedule a new callback.
  if (nextFlushedExpirationTime !== NoWork) {
    scheduleCallbackWithExpirationTime(nextFlushedRoot, nextFlushedExpirationTime);
  }

  // Clean-up.
  finishRendering();
}

function flushRoot(root, expirationTime) {
  !!isRendering ? invariant(false, 'work.commit(): Cannot commit while already rendering. This likely means you attempted to commit from inside a lifecycle method.') : void 0;
  // Perform work on root as if the given expiration time is the current time.
  // This has the effect of synchronously flushing all work up to and
  // including the given time.
  nextFlushedRoot = root;
  nextFlushedExpirationTime = expirationTime;
  performWorkOnRoot(root, expirationTime, false);
  // Flush any sync work that was scheduled by lifecycles
  performSyncWork();
}

function finishRendering() {
  nestedUpdateCount = 0;
  lastCommittedRootDuringThisBatch = null;

  if (completedBatches !== null) {
    var batches = completedBatches;
    completedBatches = null;
    for (var i = 0; i < batches.length; i++) {
      var batch = batches[i];
      try {
        batch._onComplete();
      } catch (error) {
        if (!hasUnhandledError) {
          hasUnhandledError = true;
          unhandledError = error;
        }
      }
    }
  }

  if (hasUnhandledError) {
    var error = unhandledError;
    unhandledError = null;
    hasUnhandledError = false;
    throw error;
  }
}

function performWorkOnRoot(root, expirationTime, isYieldy) {
  !!isRendering ? invariant(false, 'performWorkOnRoot was called recursively. This error is likely caused by a bug in React. Please file an issue.') : void 0;

  isRendering = true;

  // Check if this is async work or sync/expired work.
  if (!isYieldy) {
    // Flush work without yielding.
    // TODO: Non-yieldy work does not necessarily imply expired work. A renderer
    // may want to perform some work without yielding, but also without
    // requiring the root to complete (by triggering placeholders).

    var finishedWork = root.finishedWork;
    if (finishedWork !== null) {
      // This root is already complete. We can commit it.
      completeRoot(root, finishedWork, expirationTime);
    } else {
      root.finishedWork = null;
      // If this root previously suspended, clear its existing timeout, since
      // we're about to try rendering again.
      var timeoutHandle = root.timeoutHandle;
      if (timeoutHandle !== noTimeout) {
        root.timeoutHandle = noTimeout;
        // $FlowFixMe Complains noTimeout is not a TimeoutID, despite the check above
        cancelTimeout(timeoutHandle);
      }
      renderRoot(root, isYieldy);
      finishedWork = root.finishedWork;
      if (finishedWork !== null) {
        // We've completed the root. Commit it.
        completeRoot(root, finishedWork, expirationTime);
      }
    }
  } else {
    // Flush async work.
    var _finishedWork = root.finishedWork;
    if (_finishedWork !== null) {
      // This root is already complete. We can commit it.
      completeRoot(root, _finishedWork, expirationTime);
    } else {
      root.finishedWork = null;
      // If this root previously suspended, clear its existing timeout, since
      // we're about to try rendering again.
      var _timeoutHandle = root.timeoutHandle;
      if (_timeoutHandle !== noTimeout) {
        root.timeoutHandle = noTimeout;
        // $FlowFixMe Complains noTimeout is not a TimeoutID, despite the check above
        cancelTimeout(_timeoutHandle);
      }
      renderRoot(root, isYieldy);
      _finishedWork = root.finishedWork;
      if (_finishedWork !== null) {
        // We've completed the root. Check the if we should yield one more time
        // before committing.
        if (!shouldYieldToRenderer()) {
          // Still time left. Commit the root.
          completeRoot(root, _finishedWork, expirationTime);
        } else {
          // There's no time left. Mark this root as complete. We'll come
          // back and commit it later.
          root.finishedWork = _finishedWork;
        }
      }
    }
  }

  isRendering = false;
}

function completeRoot(root, finishedWork, expirationTime) {
  // Check if there's a batch that matches this expiration time.
  var firstBatch = root.firstBatch;
  if (firstBatch !== null && firstBatch._expirationTime >= expirationTime) {
    if (completedBatches === null) {
      completedBatches = [firstBatch];
    } else {
      completedBatches.push(firstBatch);
    }
    if (firstBatch._defer) {
      // This root is blocked from committing by a batch. Unschedule it until
      // we receive another update.
      root.finishedWork = finishedWork;
      root.expirationTime = NoWork;
      return;
    }
  }

  // Commit the root.
  root.finishedWork = null;

  // Check if this is a nested update (a sync update scheduled during the
  // commit phase).
  if (root === lastCommittedRootDuringThisBatch) {
    // If the next root is the same as the previous root, this is a nested
    // update. To prevent an infinite loop, increment the nested update count.
    nestedUpdateCount++;
  } else {
    // Reset whenever we switch roots.
    lastCommittedRootDuringThisBatch = root;
    nestedUpdateCount = 0;
  }
  scheduler.unstable_runWithPriority(scheduler.unstable_ImmediatePriority, function () {
    commitRoot(root, finishedWork);
  });
}

function onUncaughtError(error) {
  !(nextFlushedRoot !== null) ? invariant(false, 'Should be working on a root. This error is likely caused by a bug in React. Please file an issue.') : void 0;
  // Unschedule this root so we don't work on it again until there's
  // another update.
  nextFlushedRoot.expirationTime = NoWork;
  if (!hasUnhandledError) {
    hasUnhandledError = true;
    unhandledError = error;
  }
}

// TODO: Batching should be implemented at the renderer level, not inside
// the reconciler.
function batchedUpdates(fn, a) {
  var previousIsBatchingUpdates = isBatchingUpdates;
  isBatchingUpdates = true;
  try {
    return fn(a);
  } finally {
    isBatchingUpdates = previousIsBatchingUpdates;
    if (!isBatchingUpdates && !isRendering) {
      performSyncWork();
    }
  }
}

// TODO: Batching should be implemented at the renderer level, not inside
// the reconciler.
function unbatchedUpdates(fn, a) {
  if (isBatchingUpdates && !isUnbatchingUpdates) {
    isUnbatchingUpdates = true;
    try {
      return fn(a);
    } finally {
      isUnbatchingUpdates = false;
    }
  }
  return fn(a);
}

// TODO: Batching should be implemented at the renderer level, not within
// the reconciler.
function flushSync(fn, a) {
  !!isRendering ? invariant(false, 'flushSync was called from inside a lifecycle method. It cannot be called when React is already rendering.') : void 0;
  var previousIsBatchingUpdates = isBatchingUpdates;
  isBatchingUpdates = true;
  try {
    return syncUpdates(fn, a);
  } finally {
    isBatchingUpdates = previousIsBatchingUpdates;
    performSyncWork();
  }
}

function interactiveUpdates(fn, a, b) {
  // If there are any pending interactive updates, synchronously flush them.
  // This needs to happen before we read any handlers, because the effect of
  // the previous event may influence which handlers are called during
  // this event.
  if (!isBatchingUpdates && !isRendering && lowestPriorityPendingInteractiveExpirationTime !== NoWork) {
    // Synchronously flush pending interactive updates.
    performWork(lowestPriorityPendingInteractiveExpirationTime, false);
    lowestPriorityPendingInteractiveExpirationTime = NoWork;
  }
  var previousIsBatchingUpdates = isBatchingUpdates;
  isBatchingUpdates = true;
  try {
    return scheduler.unstable_runWithPriority(scheduler.unstable_UserBlockingPriority, function () {
      return fn(a, b);
    });
  } finally {
    isBatchingUpdates = previousIsBatchingUpdates;
    if (!isBatchingUpdates && !isRendering) {
      performSyncWork();
    }
  }
}

function flushInteractiveUpdates() {
  if (!isRendering && lowestPriorityPendingInteractiveExpirationTime !== NoWork) {
    // Synchronously flush pending interactive updates.
    performWork(lowestPriorityPendingInteractiveExpirationTime, false);
    lowestPriorityPendingInteractiveExpirationTime = NoWork;
  }
}

function flushControlled(fn) {
  var previousIsBatchingUpdates = isBatchingUpdates;
  isBatchingUpdates = true;
  try {
    syncUpdates(fn);
  } finally {
    isBatchingUpdates = previousIsBatchingUpdates;
    if (!isBatchingUpdates && !isRendering) {
      performSyncWork();
    }
  }
}

// 0 is PROD, 1 is DEV.
// Might add PROFILE later.


var didWarnAboutNestedUpdates = void 0;
var didWarnAboutFindNodeInStrictMode = void 0;

{
  didWarnAboutNestedUpdates = false;
  didWarnAboutFindNodeInStrictMode = {};
}

function getContextForSubtree(parentComponent) {
  if (!parentComponent) {
    return emptyContextObject;
  }

  var fiber = get(parentComponent);
  var parentContext = findCurrentUnmaskedContext(fiber);

  if (fiber.tag === ClassComponent) {
    var Component = fiber.type;
    if (isContextProvider(Component)) {
      return processChildContext(fiber, Component, parentContext);
    }
  }

  return parentContext;
}

function scheduleRootUpdate(current$$1, element, expirationTime, callback) {
  {
    if (phase === 'render' && current !== null && !didWarnAboutNestedUpdates) {
      didWarnAboutNestedUpdates = true;
      warningWithoutStack$1(false, 'Render methods should be a pure function of props and state; ' + 'triggering nested component updates from render is not allowed. ' + 'If necessary, trigger nested updates in componentDidUpdate.\n\n' + 'Check the render method of %s.', getComponentName(current.type) || 'Unknown');
    }
  }

  var update = createUpdate(expirationTime);
  // Caution: React DevTools currently depends on this property
  // being called "element".
  update.payload = { element: element };

  callback = callback === undefined ? null : callback;
  if (callback !== null) {
    !(typeof callback === 'function') ? warningWithoutStack$1(false, 'render(...): Expected the last optional `callback` argument to be a ' + 'function. Instead received: %s.', callback) : void 0;
    update.callback = callback;
  }

  flushPassiveEffects();
  enqueueUpdate(current$$1, update);
  scheduleWork(current$$1, expirationTime);

  return expirationTime;
}

function updateContainerAtExpirationTime(element, container, parentComponent, expirationTime, callback) {
  // TODO: If this is a nested container, this won't be the root.
  var current$$1 = container.current;

  {
    if (ReactFiberInstrumentation_1.debugTool) {
      if (current$$1.alternate === null) {
        ReactFiberInstrumentation_1.debugTool.onMountContainer(container);
      } else if (element === null) {
        ReactFiberInstrumentation_1.debugTool.onUnmountContainer(container);
      } else {
        ReactFiberInstrumentation_1.debugTool.onUpdateContainer(container);
      }
    }
  }

  var context = getContextForSubtree(parentComponent);
  if (container.context === null) {
    container.context = context;
  } else {
    container.pendingContext = context;
  }

  return scheduleRootUpdate(current$$1, element, expirationTime, callback);
}

function findHostInstance(component) {
  var fiber = get(component);
  if (fiber === undefined) {
    if (typeof component.render === 'function') {
      invariant(false, 'Unable to find node on an unmounted component.');
    } else {
      invariant(false, 'Argument appears to not be a ReactComponent. Keys: %s', Object.keys(component));
    }
  }
  var hostFiber = findCurrentHostFiber(fiber);
  if (hostFiber === null) {
    return null;
  }
  return hostFiber.stateNode;
}

function findHostInstanceWithWarning(component, methodName) {
  {
    var fiber = get(component);
    if (fiber === undefined) {
      if (typeof component.render === 'function') {
        invariant(false, 'Unable to find node on an unmounted component.');
      } else {
        invariant(false, 'Argument appears to not be a ReactComponent. Keys: %s', Object.keys(component));
      }
    }
    var hostFiber = findCurrentHostFiber(fiber);
    if (hostFiber === null) {
      return null;
    }
    if (hostFiber.mode & StrictMode) {
      var componentName = getComponentName(fiber.type) || 'Component';
      if (!didWarnAboutFindNodeInStrictMode[componentName]) {
        didWarnAboutFindNodeInStrictMode[componentName] = true;
        if (fiber.mode & StrictMode) {
          warningWithoutStack$1(false, '%s is deprecated in StrictMode. ' + '%s was passed an instance of %s which is inside StrictMode. ' + 'Instead, add a ref directly to the element you want to reference.' + '\n%s' + '\n\nLearn more about using refs safely here:' + '\nhttps://fb.me/react-strict-mode-find-node', methodName, methodName, componentName, getStackByFiberInDevAndProd(hostFiber));
        } else {
          warningWithoutStack$1(false, '%s is deprecated in StrictMode. ' + '%s was passed an instance of %s which renders StrictMode children. ' + 'Instead, add a ref directly to the element you want to reference.' + '\n%s' + '\n\nLearn more about using refs safely here:' + '\nhttps://fb.me/react-strict-mode-find-node', methodName, methodName, componentName, getStackByFiberInDevAndProd(hostFiber));
        }
      }
    }
    return hostFiber.stateNode;
  }
  return findHostInstance(component);
}

function createContainer(containerInfo, isConcurrent, hydrate) {
  return createFiberRoot(containerInfo, isConcurrent, hydrate);
}

function updateContainer(element, container, parentComponent, callback) {
  var current$$1 = container.current;
  var currentTime = requestCurrentTime();
  var expirationTime = computeExpirationForFiber(currentTime, current$$1);
  return updateContainerAtExpirationTime(element, container, parentComponent, expirationTime, callback);
}

function getPublicRootInstance(container) {
  var containerFiber = container.current;
  if (!containerFiber.child) {
    return null;
  }
  switch (containerFiber.child.tag) {
    case HostComponent:
      return getPublicInstance(containerFiber.child.stateNode);
    default:
      return containerFiber.child.stateNode;
  }
}

function findHostInstanceWithNoPortals(fiber) {
  var hostFiber = findCurrentHostFiberWithNoPortals(fiber);
  if (hostFiber === null) {
    return null;
  }
  return hostFiber.stateNode;
}

var overrideProps = null;

{
  var copyWithSetImpl = function (obj, path, idx, value) {
    if (idx >= path.length) {
      return value;
    }
    var key = path[idx];
    var updated = Array.isArray(obj) ? obj.slice() : _assign({}, obj);
    // $FlowFixMe number or string is fine here
    updated[key] = copyWithSetImpl(obj[key], path, idx + 1, value);
    return updated;
  };

  var copyWithSet = function (obj, path, value) {
    return copyWithSetImpl(obj, path, 0, value);
  };

  // Support DevTools props for function components, forwardRef, memo, host components, etc.
  overrideProps = function (fiber, path, value) {
    flushPassiveEffects();
    fiber.pendingProps = copyWithSet(fiber.memoizedProps, path, value);
    if (fiber.alternate) {
      fiber.alternate.pendingProps = fiber.pendingProps;
    }
    scheduleWork(fiber, Sync);
  };
}

function injectIntoDevTools(devToolsConfig) {
  var findFiberByHostInstance = devToolsConfig.findFiberByHostInstance;
  var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;


  return injectInternals(_assign({}, devToolsConfig, {
    overrideProps: overrideProps,
    currentDispatcherRef: ReactCurrentDispatcher,
    findHostInstanceByFiber: function (fiber) {
      var hostFiber = findCurrentHostFiber(fiber);
      if (hostFiber === null) {
        return null;
      }
      return hostFiber.stateNode;
    },
    findFiberByHostInstance: function (instance) {
      if (!findFiberByHostInstance) {
        // Might not be implemented by the renderer.
        return null;
      }
      return findFiberByHostInstance(instance);
    }
  }));
}

var ReactFiberReconciler = Object.freeze({
	updateContainerAtExpirationTime: updateContainerAtExpirationTime,
	createContainer: createContainer,
	updateContainer: updateContainer,
	flushRoot: flushRoot,
	requestWork: requestWork,
	computeUniqueAsyncExpiration: computeUniqueAsyncExpiration,
	batchedUpdates: batchedUpdates,
	unbatchedUpdates: unbatchedUpdates,
	deferredUpdates: scheduler.unstable_next,
	syncUpdates: syncUpdates,
	interactiveUpdates: interactiveUpdates,
	flushInteractiveUpdates: flushInteractiveUpdates,
	flushControlled: flushControlled,
	flushSync: flushSync,
	getPublicRootInstance: getPublicRootInstance,
	findHostInstance: findHostInstance,
	findHostInstanceWithWarning: findHostInstanceWithWarning,
	findHostInstanceWithNoPortals: findHostInstanceWithNoPortals,
	injectIntoDevTools: injectIntoDevTools
});

// This entry point is intentionally not typed. It exists only for third-party
// renderers. The renderers we ship (such as React DOM) instead import a named
// "inline" entry point (for example, `react-reconciler/inline.dom`). It uses
// the same code, but the Flow configuration redirects the host config to its
// real implementation so we can check it against exact intended host types.
//
// Only one renderer (the one you passed to `yarn flow <renderer>`) is fully
// type-checked at any given time. The Flow config maps the
// `react-reconciler/inline.<renderer>` import (which is *not* Flow typed) to
// `react-reconciler/inline-typed` (which *is*) for the current renderer.
// On CI, we run Flow checks for each renderer separately.





// TODO: decide on the top-level export form.
// This is hacky but makes it work with both Rollup and Jest.
var reactReconciler = ReactFiberReconciler.default || ReactFiberReconciler;

module.exports = reactReconciler;
    var $$$renderer = module.exports;
    module.exports = $$$reconciler;
    return $$$renderer;
  };
}


/***/ }),

/***/ "../node_modules/react-reconciler/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__("../node_modules/react-reconciler/cjs/react-reconciler.development.js");
}


/***/ }),

/***/ "../node_modules/react/cjs/react.development.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.9.0
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (true) {
  (function() {
'use strict';

var _assign = __webpack_require__("../node_modules/object-assign/index.js");
var checkPropTypes = __webpack_require__("../node_modules/prop-types/checkPropTypes.js");

// TODO: this is special because it gets imported during build.

var ReactVersion = '16.9.0';

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;

var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace;
// TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
// (unstable) APIs that have been removed. Can we remove the symbols?

var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;

var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator';

function getIteratorFn(maybeIterable) {
  if (maybeIterable === null || typeof maybeIterable !== 'object') {
    return null;
  }
  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
  if (typeof maybeIterator === 'function') {
    return maybeIterator;
  }
  return null;
}

// Do not require this module directly! Use normal `invariant` calls with
// template literal strings. The messages will be converted to ReactError during
// build, and in production they will be minified.

// Do not require this module directly! Use normal `invariant` calls with
// template literal strings. The messages will be converted to ReactError during
// build, and in production they will be minified.

function ReactError(error) {
  error.name = 'Invariant Violation';
  return error;
}

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

/**
 * Forked from fbjs/warning:
 * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
 *
 * Only change is we use console.warn instead of console.error,
 * and do nothing when 'console' is not supported.
 * This really simplifies the code.
 * ---
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var lowPriorityWarning = function () {};

{
  var printWarning = function (format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.warn(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  lowPriorityWarning = function (condition, format) {
    if (format === undefined) {
      throw new Error('`lowPriorityWarning(condition, format, ...args)` requires a warning ' + 'message argument');
    }
    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

var lowPriorityWarning$1 = lowPriorityWarning;

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warningWithoutStack = function () {};

{
  warningWithoutStack = function (condition, format) {
    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    if (format === undefined) {
      throw new Error('`warningWithoutStack(condition, format, ...args)` requires a warning ' + 'message argument');
    }
    if (args.length > 8) {
      // Check before the condition to catch violations early.
      throw new Error('warningWithoutStack() currently supports at most 8 arguments.');
    }
    if (condition) {
      return;
    }
    if (typeof console !== 'undefined') {
      var argsWithFormat = args.map(function (item) {
        return '' + item;
      });
      argsWithFormat.unshift('Warning: ' + format);

      // We intentionally don't use spread (or .apply) directly because it
      // breaks IE9: https://github.com/facebook/react/issues/13610
      Function.prototype.apply.call(console.error, console, argsWithFormat);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });
      throw new Error(message);
    } catch (x) {}
  };
}

var warningWithoutStack$1 = warningWithoutStack;

var didWarnStateUpdateForUnmountedComponent = {};

function warnNoop(publicInstance, callerName) {
  {
    var _constructor = publicInstance.constructor;
    var componentName = _constructor && (_constructor.displayName || _constructor.name) || 'ReactClass';
    var warningKey = componentName + '.' + callerName;
    if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
      return;
    }
    warningWithoutStack$1(false, "Can't call %s on a component that is not yet mounted. " + 'This is a no-op, but it might indicate a bug in your application. ' + 'Instead, assign to `this.state` directly or define a `state = {};` ' + 'class property with the desired state in the %s component.', callerName, componentName);
    didWarnStateUpdateForUnmountedComponent[warningKey] = true;
  }
}

/**
 * This is the abstract API for an update queue.
 */
var ReactNoopUpdateQueue = {
  /**
   * Checks whether or not this composite component is mounted.
   * @param {ReactClass} publicInstance The instance we want to test.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */
  isMounted: function (publicInstance) {
    return false;
  },

  /**
   * Forces an update. This should only be invoked when it is known with
   * certainty that we are **not** in a DOM transaction.
   *
   * You may want to call this when you know that some deeper aspect of the
   * component's state has changed but `setState` was not called.
   *
   * This will not invoke `shouldComponentUpdate`, but it will invoke
   * `componentWillUpdate` and `componentDidUpdate`.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {?function} callback Called after component is updated.
   * @param {?string} callerName name of the calling function in the public API.
   * @internal
   */
  enqueueForceUpdate: function (publicInstance, callback, callerName) {
    warnNoop(publicInstance, 'forceUpdate');
  },

  /**
   * Replaces all of the state. Always use this or `setState` to mutate state.
   * You should treat `this.state` as immutable.
   *
   * There is no guarantee that `this.state` will be immediately updated, so
   * accessing `this.state` after calling this method may return the old value.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} completeState Next state.
   * @param {?function} callback Called after component is updated.
   * @param {?string} callerName name of the calling function in the public API.
   * @internal
   */
  enqueueReplaceState: function (publicInstance, completeState, callback, callerName) {
    warnNoop(publicInstance, 'replaceState');
  },

  /**
   * Sets a subset of the state. This only exists because _pendingState is
   * internal. This provides a merging strategy that is not available to deep
   * properties which is confusing. TODO: Expose pendingState or don't use it
   * during the merge.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} partialState Next partial state to be merged with state.
   * @param {?function} callback Called after component is updated.
   * @param {?string} Name of the calling function in the public API.
   * @internal
   */
  enqueueSetState: function (publicInstance, partialState, callback, callerName) {
    warnNoop(publicInstance, 'setState');
  }
};

var emptyObject = {};
{
  Object.freeze(emptyObject);
}

/**
 * Base class helpers for the updating state of a component.
 */
function Component(props, context, updater) {
  this.props = props;
  this.context = context;
  // If a component has string refs, we will assign a different object later.
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

Component.prototype.isReactComponent = {};

/**
 * Sets a subset of the state. Always use this to mutate
 * state. You should treat `this.state` as immutable.
 *
 * There is no guarantee that `this.state` will be immediately updated, so
 * accessing `this.state` after calling this method may return the old value.
 *
 * There is no guarantee that calls to `setState` will run synchronously,
 * as they may eventually be batched together.  You can provide an optional
 * callback that will be executed when the call to setState is actually
 * completed.
 *
 * When a function is provided to setState, it will be called at some point in
 * the future (not synchronously). It will be called with the up to date
 * component arguments (state, props, context). These values can be different
 * from this.* because your function may be called after receiveProps but before
 * shouldComponentUpdate, and this new state, props, and context will not yet be
 * assigned to this.
 *
 * @param {object|function} partialState Next partial state or function to
 *        produce next partial state to be merged with current state.
 * @param {?function} callback Called after state is updated.
 * @final
 * @protected
 */
Component.prototype.setState = function (partialState, callback) {
  (function () {
    if (!(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null)) {
      {
        throw ReactError(Error('setState(...): takes an object of state variables to update or a function which returns an object of state variables.'));
      }
    }
  })();
  this.updater.enqueueSetState(this, partialState, callback, 'setState');
};

/**
 * Forces an update. This should only be invoked when it is known with
 * certainty that we are **not** in a DOM transaction.
 *
 * You may want to call this when you know that some deeper aspect of the
 * component's state has changed but `setState` was not called.
 *
 * This will not invoke `shouldComponentUpdate`, but it will invoke
 * `componentWillUpdate` and `componentDidUpdate`.
 *
 * @param {?function} callback Called after update is complete.
 * @final
 * @protected
 */
Component.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
};

/**
 * Deprecated APIs. These APIs used to exist on classic React classes but since
 * we would like to deprecate them, we're not going to move them over to this
 * modern base class. Instead, we define a getter that warns if it's accessed.
 */
{
  var deprecatedAPIs = {
    isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
    replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
  };
  var defineDeprecationWarning = function (methodName, info) {
    Object.defineProperty(Component.prototype, methodName, {
      get: function () {
        lowPriorityWarning$1(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);
        return undefined;
      }
    });
  };
  for (var fnName in deprecatedAPIs) {
    if (deprecatedAPIs.hasOwnProperty(fnName)) {
      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
    }
  }
}

function ComponentDummy() {}
ComponentDummy.prototype = Component.prototype;

/**
 * Convenience component with default shallow equality check for sCU.
 */
function PureComponent(props, context, updater) {
  this.props = props;
  this.context = context;
  // If a component has string refs, we will assign a different object later.
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}

var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
pureComponentPrototype.constructor = PureComponent;
// Avoid an extra prototype jump for these methods.
_assign(pureComponentPrototype, Component.prototype);
pureComponentPrototype.isPureReactComponent = true;

// an immutable object with a single mutable value
function createRef() {
  var refObject = {
    current: null
  };
  {
    Object.seal(refObject);
  }
  return refObject;
}

/**
 * Keeps track of the current dispatcher.
 */
var ReactCurrentDispatcher = {
  /**
   * @internal
   * @type {ReactComponent}
   */
  current: null
};

/**
 * Keeps track of the current batch's configuration such as how long an update
 * should suspend for if it needs to.
 */
var ReactCurrentBatchConfig = {
  suspense: null
};

/**
 * Keeps track of the current owner.
 *
 * The current owner is the component who should own any components that are
 * currently being constructed.
 */
var ReactCurrentOwner = {
  /**
   * @internal
   * @type {ReactComponent}
   */
  current: null
};

var BEFORE_SLASH_RE = /^(.*)[\\\/]/;

var describeComponentFrame = function (name, source, ownerName) {
  var sourceInfo = '';
  if (source) {
    var path = source.fileName;
    var fileName = path.replace(BEFORE_SLASH_RE, '');
    {
      // In DEV, include code for a common special case:
      // prefer "folder/index.js" instead of just "index.js".
      if (/^index\./.test(fileName)) {
        var match = path.match(BEFORE_SLASH_RE);
        if (match) {
          var pathBeforeSlash = match[1];
          if (pathBeforeSlash) {
            var folderName = pathBeforeSlash.replace(BEFORE_SLASH_RE, '');
            fileName = folderName + '/' + fileName;
          }
        }
      }
    }
    sourceInfo = ' (at ' + fileName + ':' + source.lineNumber + ')';
  } else if (ownerName) {
    sourceInfo = ' (created by ' + ownerName + ')';
  }
  return '\n    in ' + (name || 'Unknown') + sourceInfo;
};

var Resolved = 1;


function refineResolvedLazyComponent(lazyComponent) {
  return lazyComponent._status === Resolved ? lazyComponent._result : null;
}

function getWrappedName(outerType, innerType, wrapperName) {
  var functionName = innerType.displayName || innerType.name || '';
  return outerType.displayName || (functionName !== '' ? wrapperName + '(' + functionName + ')' : wrapperName);
}

function getComponentName(type) {
  if (type == null) {
    // Host root, text node or just invalid type.
    return null;
  }
  {
    if (typeof type.tag === 'number') {
      warningWithoutStack$1(false, 'Received an unexpected object in getComponentName(). ' + 'This is likely a bug in React. Please file an issue.');
    }
  }
  if (typeof type === 'function') {
    return type.displayName || type.name || null;
  }
  if (typeof type === 'string') {
    return type;
  }
  switch (type) {
    case REACT_FRAGMENT_TYPE:
      return 'Fragment';
    case REACT_PORTAL_TYPE:
      return 'Portal';
    case REACT_PROFILER_TYPE:
      return 'Profiler';
    case REACT_STRICT_MODE_TYPE:
      return 'StrictMode';
    case REACT_SUSPENSE_TYPE:
      return 'Suspense';
    case REACT_SUSPENSE_LIST_TYPE:
      return 'SuspenseList';
  }
  if (typeof type === 'object') {
    switch (type.$$typeof) {
      case REACT_CONTEXT_TYPE:
        return 'Context.Consumer';
      case REACT_PROVIDER_TYPE:
        return 'Context.Provider';
      case REACT_FORWARD_REF_TYPE:
        return getWrappedName(type, type.render, 'ForwardRef');
      case REACT_MEMO_TYPE:
        return getComponentName(type.type);
      case REACT_LAZY_TYPE:
        {
          var thenable = type;
          var resolvedThenable = refineResolvedLazyComponent(thenable);
          if (resolvedThenable) {
            return getComponentName(resolvedThenable);
          }
          break;
        }
    }
  }
  return null;
}

var ReactDebugCurrentFrame = {};

var currentlyValidatingElement = null;

function setCurrentlyValidatingElement(element) {
  {
    currentlyValidatingElement = element;
  }
}

{
  // Stack implementation injected by the current renderer.
  ReactDebugCurrentFrame.getCurrentStack = null;

  ReactDebugCurrentFrame.getStackAddendum = function () {
    var stack = '';

    // Add an extra top frame while an element is being validated
    if (currentlyValidatingElement) {
      var name = getComponentName(currentlyValidatingElement.type);
      var owner = currentlyValidatingElement._owner;
      stack += describeComponentFrame(name, currentlyValidatingElement._source, owner && getComponentName(owner.type));
    }

    // Delegate to the injected renderer-specific implementation
    var impl = ReactDebugCurrentFrame.getCurrentStack;
    if (impl) {
      stack += impl() || '';
    }

    return stack;
  };
}

/**
 * Used by act() to track whether you're inside an act() scope.
 */

var IsSomeRendererActing = {
  current: false
};

var ReactSharedInternals = {
  ReactCurrentDispatcher: ReactCurrentDispatcher,
  ReactCurrentBatchConfig: ReactCurrentBatchConfig,
  ReactCurrentOwner: ReactCurrentOwner,
  IsSomeRendererActing: IsSomeRendererActing,
  // Used by renderers to avoid bundling object-assign twice in UMD bundles:
  assign: _assign
};

{
  _assign(ReactSharedInternals, {
    // These should not be included in production.
    ReactDebugCurrentFrame: ReactDebugCurrentFrame,
    // Shim for React DOM 16.0.0 which still destructured (but not used) this.
    // TODO: remove in React 17.0.
    ReactComponentTreeHook: {}
  });
}

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = warningWithoutStack$1;

{
  warning = function (condition, format) {
    if (condition) {
      return;
    }
    var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
    var stack = ReactDebugCurrentFrame.getStackAddendum();
    // eslint-disable-next-line react-internal/warning-and-invariant-args

    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    warningWithoutStack$1.apply(undefined, [false, format + '%s'].concat(args, [stack]));
  };
}

var warning$1 = warning;

var hasOwnProperty = Object.prototype.hasOwnProperty;

var RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};

var specialPropKeyWarningShown = void 0;
var specialPropRefWarningShown = void 0;

function hasValidRef(config) {
  {
    if (hasOwnProperty.call(config, 'ref')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.ref !== undefined;
}

function hasValidKey(config) {
  {
    if (hasOwnProperty.call(config, 'key')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.key !== undefined;
}

function defineKeyPropWarningGetter(props, displayName) {
  var warnAboutAccessingKey = function () {
    if (!specialPropKeyWarningShown) {
      specialPropKeyWarningShown = true;
      warningWithoutStack$1(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
    }
  };
  warnAboutAccessingKey.isReactWarning = true;
  Object.defineProperty(props, 'key', {
    get: warnAboutAccessingKey,
    configurable: true
  });
}

function defineRefPropWarningGetter(props, displayName) {
  var warnAboutAccessingRef = function () {
    if (!specialPropRefWarningShown) {
      specialPropRefWarningShown = true;
      warningWithoutStack$1(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
    }
  };
  warnAboutAccessingRef.isReactWarning = true;
  Object.defineProperty(props, 'ref', {
    get: warnAboutAccessingRef,
    configurable: true
  });
}

/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, no instanceof check
 * will work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} props
 * @param {*} key
 * @param {string|object} ref
 * @param {*} owner
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @internal
 */
var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    // This tag allows us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,

    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,

    // Record the component responsible for creating this element.
    _owner: owner
  };

  {
    // The validation flag is currently mutative. We put it on
    // an external backing store so that we can freeze the whole object.
    // This can be replaced with a WeakMap once they are implemented in
    // commonly used development environments.
    element._store = {};

    // To make comparing ReactElements easier for testing purposes, we make
    // the validation flag non-enumerable (where possible, which should
    // include every environment we run tests in), so the test framework
    // ignores it.
    Object.defineProperty(element._store, 'validated', {
      configurable: false,
      enumerable: false,
      writable: true,
      value: false
    });
    // self and source are DEV only properties.
    Object.defineProperty(element, '_self', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: self
    });
    // Two elements created in two different places should be considered
    // equal for testing purposes and therefore we hide it from enumeration.
    Object.defineProperty(element, '_source', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: source
    });
    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
  }

  return element;
};

/**
 * https://github.com/reactjs/rfcs/pull/107
 * @param {*} type
 * @param {object} props
 * @param {string} key
 */


/**
 * https://github.com/reactjs/rfcs/pull/107
 * @param {*} type
 * @param {object} props
 * @param {string} key
 */
function jsxDEV(type, config, maybeKey, source, self) {
  var propName = void 0;

  // Reserved names are extracted
  var props = {};

  var key = null;
  var ref = null;

  if (hasValidRef(config)) {
    ref = config.ref;
  }

  if (hasValidKey(config)) {
    key = '' + config.key;
  }

  // Remaining properties are added to a new props object
  for (propName in config) {
    if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
      props[propName] = config[propName];
    }
  }

  // intentionally not checking if key was set above
  // this key is higher priority as it's static
  if (maybeKey !== undefined) {
    key = '' + maybeKey;
  }

  // Resolve default props
  if (type && type.defaultProps) {
    var defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }

  if (key || ref) {
    var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
    if (key) {
      defineKeyPropWarningGetter(props, displayName);
    }
    if (ref) {
      defineRefPropWarningGetter(props, displayName);
    }
  }

  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
}

/**
 * Create and return a new ReactElement of the given type.
 * See https://reactjs.org/docs/react-api.html#createelement
 */
function createElement(type, config, children) {
  var propName = void 0;

  // Reserved names are extracted
  var props = {};

  var key = null;
  var ref = null;
  var self = null;
  var source = null;

  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    // Remaining properties are added to a new props object
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    {
      if (Object.freeze) {
        Object.freeze(childArray);
      }
    }
    props.children = childArray;
  }

  // Resolve default props
  if (type && type.defaultProps) {
    var defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }
  {
    if (key || ref) {
      var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
      if (key) {
        defineKeyPropWarningGetter(props, displayName);
      }
      if (ref) {
        defineRefPropWarningGetter(props, displayName);
      }
    }
  }
  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
}

/**
 * Return a function that produces ReactElements of a given type.
 * See https://reactjs.org/docs/react-api.html#createfactory
 */


function cloneAndReplaceKey(oldElement, newKey) {
  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);

  return newElement;
}

/**
 * Clone and return a new ReactElement using element as the starting point.
 * See https://reactjs.org/docs/react-api.html#cloneelement
 */
function cloneElement(element, config, children) {
  (function () {
    if (!!(element === null || element === undefined)) {
      {
        throw ReactError(Error('React.cloneElement(...): The argument must be a React element, but you passed ' + element + '.'));
      }
    }
  })();

  var propName = void 0;

  // Original props are copied
  var props = _assign({}, element.props);

  // Reserved names are extracted
  var key = element.key;
  var ref = element.ref;
  // Self is preserved since the owner is preserved.
  var self = element._self;
  // Source is preserved since cloneElement is unlikely to be targeted by a
  // transpiler, and the original source is probably a better indicator of the
  // true owner.
  var source = element._source;

  // Owner will be preserved, unless ref is overridden
  var owner = element._owner;

  if (config != null) {
    if (hasValidRef(config)) {
      // Silently steal the ref from the parent.
      ref = config.ref;
      owner = ReactCurrentOwner.current;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    // Remaining properties override existing props
    var defaultProps = void 0;
    if (element.type && element.type.defaultProps) {
      defaultProps = element.type.defaultProps;
    }
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        if (config[propName] === undefined && defaultProps !== undefined) {
          // Resolve default props
          props[propName] = defaultProps[propName];
        } else {
          props[propName] = config[propName];
        }
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  return ReactElement(element.type, key, ref, self, source, owner, props);
}

/**
 * Verifies the object is a ReactElement.
 * See https://reactjs.org/docs/react-api.html#isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a ReactElement.
 * @final
 */
function isValidElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}

var SEPARATOR = '.';
var SUBSEPARATOR = ':';

/**
 * Escape and wrap key so it is safe to use as a reactid
 *
 * @param {string} key to be escaped.
 * @return {string} the escaped key.
 */
function escape(key) {
  var escapeRegex = /[=:]/g;
  var escaperLookup = {
    '=': '=0',
    ':': '=2'
  };
  var escapedString = ('' + key).replace(escapeRegex, function (match) {
    return escaperLookup[match];
  });

  return '$' + escapedString;
}

/**
 * TODO: Test that a single child and an array with one item have the same key
 * pattern.
 */

var didWarnAboutMaps = false;

var userProvidedKeyEscapeRegex = /\/+/g;
function escapeUserProvidedKey(text) {
  return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
}

var POOL_SIZE = 10;
var traverseContextPool = [];
function getPooledTraverseContext(mapResult, keyPrefix, mapFunction, mapContext) {
  if (traverseContextPool.length) {
    var traverseContext = traverseContextPool.pop();
    traverseContext.result = mapResult;
    traverseContext.keyPrefix = keyPrefix;
    traverseContext.func = mapFunction;
    traverseContext.context = mapContext;
    traverseContext.count = 0;
    return traverseContext;
  } else {
    return {
      result: mapResult,
      keyPrefix: keyPrefix,
      func: mapFunction,
      context: mapContext,
      count: 0
    };
  }
}

function releaseTraverseContext(traverseContext) {
  traverseContext.result = null;
  traverseContext.keyPrefix = null;
  traverseContext.func = null;
  traverseContext.context = null;
  traverseContext.count = 0;
  if (traverseContextPool.length < POOL_SIZE) {
    traverseContextPool.push(traverseContext);
  }
}

/**
 * @param {?*} children Children tree container.
 * @param {!string} nameSoFar Name of the key path so far.
 * @param {!function} callback Callback to invoke with each child found.
 * @param {?*} traverseContext Used to pass information throughout the traversal
 * process.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
  var type = typeof children;

  if (type === 'undefined' || type === 'boolean') {
    // All of the above are perceived as null.
    children = null;
  }

  var invokeCallback = false;

  if (children === null) {
    invokeCallback = true;
  } else {
    switch (type) {
      case 'string':
      case 'number':
        invokeCallback = true;
        break;
      case 'object':
        switch (children.$$typeof) {
          case REACT_ELEMENT_TYPE:
          case REACT_PORTAL_TYPE:
            invokeCallback = true;
        }
    }
  }

  if (invokeCallback) {
    callback(traverseContext, children,
    // If it's the only child, treat the name as if it was wrapped in an array
    // so that it's consistent if the number of children grows.
    nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
    return 1;
  }

  var child = void 0;
  var nextName = void 0;
  var subtreeCount = 0; // Count of children found in the current subtree.
  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      nextName = nextNamePrefix + getComponentKey(child, i);
      subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
    }
  } else {
    var iteratorFn = getIteratorFn(children);
    if (typeof iteratorFn === 'function') {
      {
        // Warn about using Maps as children
        if (iteratorFn === children.entries) {
          !didWarnAboutMaps ? warning$1(false, 'Using Maps as children is unsupported and will likely yield ' + 'unexpected results. Convert it to a sequence/iterable of keyed ' + 'ReactElements instead.') : void 0;
          didWarnAboutMaps = true;
        }
      }

      var iterator = iteratorFn.call(children);
      var step = void 0;
      var ii = 0;
      while (!(step = iterator.next()).done) {
        child = step.value;
        nextName = nextNamePrefix + getComponentKey(child, ii++);
        subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
      }
    } else if (type === 'object') {
      var addendum = '';
      {
        addendum = ' If you meant to render a collection of children, use an array ' + 'instead.' + ReactDebugCurrentFrame.getStackAddendum();
      }
      var childrenString = '' + children;
      (function () {
        {
          {
            throw ReactError(Error('Objects are not valid as a React child (found: ' + (childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString) + ').' + addendum));
          }
        }
      })();
    }
  }

  return subtreeCount;
}

/**
 * Traverses children that are typically specified as `props.children`, but
 * might also be specified through attributes:
 *
 * - `traverseAllChildren(this.props.children, ...)`
 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
 *
 * The `traverseContext` is an optional argument that is passed through the
 * entire traversal. It can be used to store accumulations or anything else that
 * the callback might find relevant.
 *
 * @param {?*} children Children tree object.
 * @param {!function} callback To invoke upon traversing each child.
 * @param {?*} traverseContext Context for traversal.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildren(children, callback, traverseContext) {
  if (children == null) {
    return 0;
  }

  return traverseAllChildrenImpl(children, '', callback, traverseContext);
}

/**
 * Generate a key string that identifies a component within a set.
 *
 * @param {*} component A component that could contain a manual key.
 * @param {number} index Index that is used if a manual key is not provided.
 * @return {string}
 */
function getComponentKey(component, index) {
  // Do some typechecking here since we call this blindly. We want to ensure
  // that we don't block potential future ES APIs.
  if (typeof component === 'object' && component !== null && component.key != null) {
    // Explicit key
    return escape(component.key);
  }
  // Implicit key determined by the index in the set
  return index.toString(36);
}

function forEachSingleChild(bookKeeping, child, name) {
  var func = bookKeeping.func,
      context = bookKeeping.context;

  func.call(context, child, bookKeeping.count++);
}

/**
 * Iterates through children that are typically specified as `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrenforeach
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} forEachFunc
 * @param {*} forEachContext Context for forEachContext.
 */
function forEachChildren(children, forEachFunc, forEachContext) {
  if (children == null) {
    return children;
  }
  var traverseContext = getPooledTraverseContext(null, null, forEachFunc, forEachContext);
  traverseAllChildren(children, forEachSingleChild, traverseContext);
  releaseTraverseContext(traverseContext);
}

function mapSingleChildIntoContext(bookKeeping, child, childKey) {
  var result = bookKeeping.result,
      keyPrefix = bookKeeping.keyPrefix,
      func = bookKeeping.func,
      context = bookKeeping.context;


  var mappedChild = func.call(context, child, bookKeeping.count++);
  if (Array.isArray(mappedChild)) {
    mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, function (c) {
      return c;
    });
  } else if (mappedChild != null) {
    if (isValidElement(mappedChild)) {
      mappedChild = cloneAndReplaceKey(mappedChild,
      // Keep both the (mapped) and old keys if they differ, just as
      // traverseAllChildren used to do for objects as children
      keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
    }
    result.push(mappedChild);
  }
}

function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
  var escapedPrefix = '';
  if (prefix != null) {
    escapedPrefix = escapeUserProvidedKey(prefix) + '/';
  }
  var traverseContext = getPooledTraverseContext(array, escapedPrefix, func, context);
  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
  releaseTraverseContext(traverseContext);
}

/**
 * Maps children that are typically specified as `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrenmap
 *
 * The provided mapFunction(child, key, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} func The map function.
 * @param {*} context Context for mapFunction.
 * @return {object} Object containing the ordered map of results.
 */
function mapChildren(children, func, context) {
  if (children == null) {
    return children;
  }
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, func, context);
  return result;
}

/**
 * Count the number of children that are typically specified as
 * `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrencount
 *
 * @param {?*} children Children tree container.
 * @return {number} The number of children.
 */
function countChildren(children) {
  return traverseAllChildren(children, function () {
    return null;
  }, null);
}

/**
 * Flatten a children object (typically specified as `props.children`) and
 * return an array with appropriately re-keyed children.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrentoarray
 */
function toArray(children) {
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, function (child) {
    return child;
  });
  return result;
}

/**
 * Returns the first child in a collection of children and verifies that there
 * is only one child in the collection.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrenonly
 *
 * The current implementation of this function assumes that a single child gets
 * passed without a wrapper, but the purpose of this helper function is to
 * abstract away the particular structure of children.
 *
 * @param {?object} children Child collection structure.
 * @return {ReactElement} The first and only `ReactElement` contained in the
 * structure.
 */
function onlyChild(children) {
  (function () {
    if (!isValidElement(children)) {
      {
        throw ReactError(Error('React.Children.only expected to receive a single React element child.'));
      }
    }
  })();
  return children;
}

function createContext(defaultValue, calculateChangedBits) {
  if (calculateChangedBits === undefined) {
    calculateChangedBits = null;
  } else {
    {
      !(calculateChangedBits === null || typeof calculateChangedBits === 'function') ? warningWithoutStack$1(false, 'createContext: Expected the optional second argument to be a ' + 'function. Instead received: %s', calculateChangedBits) : void 0;
    }
  }

  var context = {
    $$typeof: REACT_CONTEXT_TYPE,
    _calculateChangedBits: calculateChangedBits,
    // As a workaround to support multiple concurrent renderers, we categorize
    // some renderers as primary and others as secondary. We only expect
    // there to be two concurrent renderers at most: React Native (primary) and
    // Fabric (secondary); React DOM (primary) and React ART (secondary).
    // Secondary renderers store their context values on separate fields.
    _currentValue: defaultValue,
    _currentValue2: defaultValue,
    // Used to track how many concurrent renderers this context currently
    // supports within in a single renderer. Such as parallel server rendering.
    _threadCount: 0,
    // These are circular
    Provider: null,
    Consumer: null
  };

  context.Provider = {
    $$typeof: REACT_PROVIDER_TYPE,
    _context: context
  };

  var hasWarnedAboutUsingNestedContextConsumers = false;
  var hasWarnedAboutUsingConsumerProvider = false;

  {
    // A separate object, but proxies back to the original context object for
    // backwards compatibility. It has a different $$typeof, so we can properly
    // warn for the incorrect usage of Context as a Consumer.
    var Consumer = {
      $$typeof: REACT_CONTEXT_TYPE,
      _context: context,
      _calculateChangedBits: context._calculateChangedBits
    };
    // $FlowFixMe: Flow complains about not setting a value, which is intentional here
    Object.defineProperties(Consumer, {
      Provider: {
        get: function () {
          if (!hasWarnedAboutUsingConsumerProvider) {
            hasWarnedAboutUsingConsumerProvider = true;
            warning$1(false, 'Rendering <Context.Consumer.Provider> is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Provider> instead?');
          }
          return context.Provider;
        },
        set: function (_Provider) {
          context.Provider = _Provider;
        }
      },
      _currentValue: {
        get: function () {
          return context._currentValue;
        },
        set: function (_currentValue) {
          context._currentValue = _currentValue;
        }
      },
      _currentValue2: {
        get: function () {
          return context._currentValue2;
        },
        set: function (_currentValue2) {
          context._currentValue2 = _currentValue2;
        }
      },
      _threadCount: {
        get: function () {
          return context._threadCount;
        },
        set: function (_threadCount) {
          context._threadCount = _threadCount;
        }
      },
      Consumer: {
        get: function () {
          if (!hasWarnedAboutUsingNestedContextConsumers) {
            hasWarnedAboutUsingNestedContextConsumers = true;
            warning$1(false, 'Rendering <Context.Consumer.Consumer> is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Consumer> instead?');
          }
          return context.Consumer;
        }
      }
    });
    // $FlowFixMe: Flow complains about missing properties because it doesn't understand defineProperty
    context.Consumer = Consumer;
  }

  {
    context._currentRenderer = null;
    context._currentRenderer2 = null;
  }

  return context;
}

function lazy(ctor) {
  var lazyType = {
    $$typeof: REACT_LAZY_TYPE,
    _ctor: ctor,
    // React uses these fields to store the result.
    _status: -1,
    _result: null
  };

  {
    // In production, this would just set it on the object.
    var defaultProps = void 0;
    var propTypes = void 0;
    Object.defineProperties(lazyType, {
      defaultProps: {
        configurable: true,
        get: function () {
          return defaultProps;
        },
        set: function (newDefaultProps) {
          warning$1(false, 'React.lazy(...): It is not supported to assign `defaultProps` to ' + 'a lazy component import. Either specify them where the component ' + 'is defined, or create a wrapping component around it.');
          defaultProps = newDefaultProps;
          // Match production behavior more closely:
          Object.defineProperty(lazyType, 'defaultProps', {
            enumerable: true
          });
        }
      },
      propTypes: {
        configurable: true,
        get: function () {
          return propTypes;
        },
        set: function (newPropTypes) {
          warning$1(false, 'React.lazy(...): It is not supported to assign `propTypes` to ' + 'a lazy component import. Either specify them where the component ' + 'is defined, or create a wrapping component around it.');
          propTypes = newPropTypes;
          // Match production behavior more closely:
          Object.defineProperty(lazyType, 'propTypes', {
            enumerable: true
          });
        }
      }
    });
  }

  return lazyType;
}

function forwardRef(render) {
  {
    if (render != null && render.$$typeof === REACT_MEMO_TYPE) {
      warningWithoutStack$1(false, 'forwardRef requires a render function but received a `memo` ' + 'component. Instead of forwardRef(memo(...)), use ' + 'memo(forwardRef(...)).');
    } else if (typeof render !== 'function') {
      warningWithoutStack$1(false, 'forwardRef requires a render function but was given %s.', render === null ? 'null' : typeof render);
    } else {
      !(
      // Do not warn for 0 arguments because it could be due to usage of the 'arguments' object
      render.length === 0 || render.length === 2) ? warningWithoutStack$1(false, 'forwardRef render functions accept exactly two parameters: props and ref. %s', render.length === 1 ? 'Did you forget to use the ref parameter?' : 'Any additional parameter will be undefined.') : void 0;
    }

    if (render != null) {
      !(render.defaultProps == null && render.propTypes == null) ? warningWithoutStack$1(false, 'forwardRef render functions do not support propTypes or defaultProps. ' + 'Did you accidentally pass a React component?') : void 0;
    }
  }

  return {
    $$typeof: REACT_FORWARD_REF_TYPE,
    render: render
  };
}

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' ||
  // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE);
}

function memo(type, compare) {
  {
    if (!isValidElementType(type)) {
      warningWithoutStack$1(false, 'memo: The first argument must be a component. Instead ' + 'received: %s', type === null ? 'null' : typeof type);
    }
  }
  return {
    $$typeof: REACT_MEMO_TYPE,
    type: type,
    compare: compare === undefined ? null : compare
  };
}

function resolveDispatcher() {
  var dispatcher = ReactCurrentDispatcher.current;
  (function () {
    if (!(dispatcher !== null)) {
      {
        throw ReactError(Error('Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://fb.me/react-invalid-hook-call for tips about how to debug and fix this problem.'));
      }
    }
  })();
  return dispatcher;
}

function useContext(Context, unstable_observedBits) {
  var dispatcher = resolveDispatcher();
  {
    !(unstable_observedBits === undefined) ? warning$1(false, 'useContext() second argument is reserved for future ' + 'use in React. Passing it is not supported. ' + 'You passed: %s.%s', unstable_observedBits, typeof unstable_observedBits === 'number' && Array.isArray(arguments[2]) ? '\n\nDid you call array.map(useContext)? ' + 'Calling Hooks inside a loop is not supported. ' + 'Learn more at https://fb.me/rules-of-hooks' : '') : void 0;

    // TODO: add a more generic warning for invalid values.
    if (Context._context !== undefined) {
      var realContext = Context._context;
      // Don't deduplicate because this legitimately causes bugs
      // and nobody should be using this in existing code.
      if (realContext.Consumer === Context) {
        warning$1(false, 'Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be ' + 'removed in a future major release. Did you mean to call useContext(Context) instead?');
      } else if (realContext.Provider === Context) {
        warning$1(false, 'Calling useContext(Context.Provider) is not supported. ' + 'Did you mean to call useContext(Context) instead?');
      }
    }
  }
  return dispatcher.useContext(Context, unstable_observedBits);
}

function useState(initialState) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useState(initialState);
}

function useReducer(reducer, initialArg, init) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useReducer(reducer, initialArg, init);
}

function useRef(initialValue) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useRef(initialValue);
}

function useEffect(create, inputs) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useEffect(create, inputs);
}

function useLayoutEffect(create, inputs) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useLayoutEffect(create, inputs);
}

function useCallback(callback, inputs) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useCallback(callback, inputs);
}

function useMemo(create, inputs) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useMemo(create, inputs);
}

function useImperativeHandle(ref, create, inputs) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useImperativeHandle(ref, create, inputs);
}

function useDebugValue(value, formatterFn) {
  {
    var dispatcher = resolveDispatcher();
    return dispatcher.useDebugValue(value, formatterFn);
  }
}

var emptyObject$1 = {};

function useResponder(responder, listenerProps) {
  var dispatcher = resolveDispatcher();
  {
    if (responder == null || responder.$$typeof !== REACT_RESPONDER_TYPE) {
      warning$1(false, 'useResponder: invalid first argument. Expected an event responder, but instead got %s', responder);
      return;
    }
  }
  return dispatcher.useResponder(responder, listenerProps || emptyObject$1);
}

// Within the scope of the callback, mark all updates as being allowed to suspend.
function withSuspenseConfig(scope, config) {
  var previousConfig = ReactCurrentBatchConfig.suspense;
  ReactCurrentBatchConfig.suspense = config === undefined ? null : config;
  try {
    scope();
  } finally {
    ReactCurrentBatchConfig.suspense = previousConfig;
  }
}

/**
 * ReactElementValidator provides a wrapper around a element factory
 * which validates the props passed to the element. This is intended to be
 * used only in DEV and could be replaced by a static type checker for languages
 * that support it.
 */

var propTypesMisspellWarningShown = void 0;

{
  propTypesMisspellWarningShown = false;
}

function getDeclarationErrorAddendum() {
  if (ReactCurrentOwner.current) {
    var name = getComponentName(ReactCurrentOwner.current.type);
    if (name) {
      return '\n\nCheck the render method of `' + name + '`.';
    }
  }
  return '';
}

function getSourceInfoErrorAddendum(source) {
  if (source !== undefined) {
    var fileName = source.fileName.replace(/^.*[\\\/]/, '');
    var lineNumber = source.lineNumber;
    return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
  }
  return '';
}

function getSourceInfoErrorAddendumForProps(elementProps) {
  if (elementProps !== null && elementProps !== undefined) {
    return getSourceInfoErrorAddendum(elementProps.__source);
  }
  return '';
}

/**
 * Warn if there's no key explicitly set on dynamic arrays of children or
 * object keys are not valid. This allows us to keep track of children between
 * updates.
 */
var ownerHasKeyUseWarning = {};

function getCurrentComponentErrorInfo(parentType) {
  var info = getDeclarationErrorAddendum();

  if (!info) {
    var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
    if (parentName) {
      info = '\n\nCheck the top-level render call using <' + parentName + '>.';
    }
  }
  return info;
}

/**
 * Warn if the element doesn't have an explicit key assigned to it.
 * This element is in an array. The array could grow and shrink or be
 * reordered. All children that haven't already been validated are required to
 * have a "key" property assigned to it. Error statuses are cached so a warning
 * will only be shown once.
 *
 * @internal
 * @param {ReactElement} element Element that requires a key.
 * @param {*} parentType element's parent's type.
 */
function validateExplicitKey(element, parentType) {
  if (!element._store || element._store.validated || element.key != null) {
    return;
  }
  element._store.validated = true;

  var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
  if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
    return;
  }
  ownerHasKeyUseWarning[currentComponentErrorInfo] = true;

  // Usually the current owner is the offender, but if it accepts children as a
  // property, it may be the creator of the child that's responsible for
  // assigning it a key.
  var childOwner = '';
  if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
    // Give the component that originally created this child.
    childOwner = ' It was passed a child from ' + getComponentName(element._owner.type) + '.';
  }

  setCurrentlyValidatingElement(element);
  {
    warning$1(false, 'Each child in a list should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.', currentComponentErrorInfo, childOwner);
  }
  setCurrentlyValidatingElement(null);
}

/**
 * Ensure that every element either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {ReactNode} node Statically passed child of any type.
 * @param {*} parentType node's parent's type.
 */
function validateChildKeys(node, parentType) {
  if (typeof node !== 'object') {
    return;
  }
  if (Array.isArray(node)) {
    for (var i = 0; i < node.length; i++) {
      var child = node[i];
      if (isValidElement(child)) {
        validateExplicitKey(child, parentType);
      }
    }
  } else if (isValidElement(node)) {
    // This element was passed in a valid location.
    if (node._store) {
      node._store.validated = true;
    }
  } else if (node) {
    var iteratorFn = getIteratorFn(node);
    if (typeof iteratorFn === 'function') {
      // Entry iterators used to provide implicit keys,
      // but now we print a separate warning for them later.
      if (iteratorFn !== node.entries) {
        var iterator = iteratorFn.call(node);
        var step = void 0;
        while (!(step = iterator.next()).done) {
          if (isValidElement(step.value)) {
            validateExplicitKey(step.value, parentType);
          }
        }
      }
    }
  }
}

/**
 * Given an element, validate that its props follow the propTypes definition,
 * provided by the type.
 *
 * @param {ReactElement} element
 */
function validatePropTypes(element) {
  var type = element.type;
  if (type === null || type === undefined || typeof type === 'string') {
    return;
  }
  var name = getComponentName(type);
  var propTypes = void 0;
  if (typeof type === 'function') {
    propTypes = type.propTypes;
  } else if (typeof type === 'object' && (type.$$typeof === REACT_FORWARD_REF_TYPE ||
  // Note: Memo only checks outer props here.
  // Inner props are checked in the reconciler.
  type.$$typeof === REACT_MEMO_TYPE)) {
    propTypes = type.propTypes;
  } else {
    return;
  }
  if (propTypes) {
    setCurrentlyValidatingElement(element);
    checkPropTypes(propTypes, element.props, 'prop', name, ReactDebugCurrentFrame.getStackAddendum);
    setCurrentlyValidatingElement(null);
  } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
    propTypesMisspellWarningShown = true;
    warningWithoutStack$1(false, 'Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', name || 'Unknown');
  }
  if (typeof type.getDefaultProps === 'function') {
    !type.getDefaultProps.isReactClassApproved ? warningWithoutStack$1(false, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.') : void 0;
  }
}

/**
 * Given a fragment, validate that it can only be provided with fragment props
 * @param {ReactElement} fragment
 */
function validateFragmentProps(fragment) {
  setCurrentlyValidatingElement(fragment);

  var keys = Object.keys(fragment.props);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (key !== 'children' && key !== 'key') {
      warning$1(false, 'Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);
      break;
    }
  }

  if (fragment.ref !== null) {
    warning$1(false, 'Invalid attribute `ref` supplied to `React.Fragment`.');
  }

  setCurrentlyValidatingElement(null);
}

function jsxWithValidation(type, props, key, isStaticChildren, source, self) {
  var validType = isValidElementType(type);

  // We warn in this case but don't throw. We expect the element creation to
  // succeed and there will likely be errors in render.
  if (!validType) {
    var info = '';
    if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
      info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
    }

    var sourceInfo = getSourceInfoErrorAddendum(source);
    if (sourceInfo) {
      info += sourceInfo;
    } else {
      info += getDeclarationErrorAddendum();
    }

    var typeString = void 0;
    if (type === null) {
      typeString = 'null';
    } else if (Array.isArray(type)) {
      typeString = 'array';
    } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
      typeString = '<' + (getComponentName(type.type) || 'Unknown') + ' />';
      info = ' Did you accidentally export a JSX literal instead of a component?';
    } else {
      typeString = typeof type;
    }

    warning$1(false, 'React.jsx: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
  }

  var element = jsxDEV(type, props, key, source, self);

  // The result can be nullish if a mock or a custom function is used.
  // TODO: Drop this when these are no longer allowed as the type argument.
  if (element == null) {
    return element;
  }

  // Skip key warning if the type isn't valid since our key validation logic
  // doesn't expect a non-string/function type and can throw confusing errors.
  // We don't want exception behavior to differ between dev and prod.
  // (Rendering will throw with a helpful message and as soon as the type is
  // fixed, the key warnings will appear.)
  if (validType) {
    var children = props.children;
    if (children !== undefined) {
      if (isStaticChildren) {
        for (var i = 0; i < children.length; i++) {
          validateChildKeys(children[i], type);
        }
      } else {
        validateChildKeys(children, type);
      }
    }
  }

  if (props.key !== undefined) {
    warning$1(false, 'React.jsx: Spreading a key to JSX is a deprecated pattern. ' + 'Explicitly pass a key after spreading props in your JSX call. ' + 'E.g. <ComponentName {...props} key={key} />');
  }

  if (type === REACT_FRAGMENT_TYPE) {
    validateFragmentProps(element);
  } else {
    validatePropTypes(element);
  }

  return element;
}

// These two functions exist to still get child warnings in dev
// even with the prod transform. This means that jsxDEV is purely
// opt-in behavior for better messages but that we won't stop
// giving you warnings if you use production apis.
function jsxWithValidationStatic(type, props, key) {
  return jsxWithValidation(type, props, key, true);
}

function jsxWithValidationDynamic(type, props, key) {
  return jsxWithValidation(type, props, key, false);
}

function createElementWithValidation(type, props, children) {
  var validType = isValidElementType(type);

  // We warn in this case but don't throw. We expect the element creation to
  // succeed and there will likely be errors in render.
  if (!validType) {
    var info = '';
    if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
      info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
    }

    var sourceInfo = getSourceInfoErrorAddendumForProps(props);
    if (sourceInfo) {
      info += sourceInfo;
    } else {
      info += getDeclarationErrorAddendum();
    }

    var typeString = void 0;
    if (type === null) {
      typeString = 'null';
    } else if (Array.isArray(type)) {
      typeString = 'array';
    } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
      typeString = '<' + (getComponentName(type.type) || 'Unknown') + ' />';
      info = ' Did you accidentally export a JSX literal instead of a component?';
    } else {
      typeString = typeof type;
    }

    warning$1(false, 'React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
  }

  var element = createElement.apply(this, arguments);

  // The result can be nullish if a mock or a custom function is used.
  // TODO: Drop this when these are no longer allowed as the type argument.
  if (element == null) {
    return element;
  }

  // Skip key warning if the type isn't valid since our key validation logic
  // doesn't expect a non-string/function type and can throw confusing errors.
  // We don't want exception behavior to differ between dev and prod.
  // (Rendering will throw with a helpful message and as soon as the type is
  // fixed, the key warnings will appear.)
  if (validType) {
    for (var i = 2; i < arguments.length; i++) {
      validateChildKeys(arguments[i], type);
    }
  }

  if (type === REACT_FRAGMENT_TYPE) {
    validateFragmentProps(element);
  } else {
    validatePropTypes(element);
  }

  return element;
}

function createFactoryWithValidation(type) {
  var validatedFactory = createElementWithValidation.bind(null, type);
  validatedFactory.type = type;
  // Legacy hook: remove it
  {
    Object.defineProperty(validatedFactory, 'type', {
      enumerable: false,
      get: function () {
        lowPriorityWarning$1(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');
        Object.defineProperty(this, 'type', {
          value: type
        });
        return type;
      }
    });
  }

  return validatedFactory;
}

function cloneElementWithValidation(element, props, children) {
  var newElement = cloneElement.apply(this, arguments);
  for (var i = 2; i < arguments.length; i++) {
    validateChildKeys(arguments[i], newElement.type);
  }
  validatePropTypes(newElement);
  return newElement;
}

var hasBadMapPolyfill = void 0;

{
  hasBadMapPolyfill = false;
  try {
    var frozenObject = Object.freeze({});
    var testMap = new Map([[frozenObject, null]]);
    var testSet = new Set([frozenObject]);
    // This is necessary for Rollup to not consider these unused.
    // https://github.com/rollup/rollup/issues/1771
    // TODO: we can remove these if Rollup fixes the bug.
    testMap.set(0, 0);
    testSet.add(0);
  } catch (e) {
    // TODO: Consider warning about bad polyfills
    hasBadMapPolyfill = true;
  }
}

function createFundamentalComponent(impl) {
  // We use responder as a Map key later on. When we have a bad
  // polyfill, then we can't use it as a key as the polyfill tries
  // to add a property to the object.
  if ( true && !hasBadMapPolyfill) {
    Object.freeze(impl);
  }
  var fundamantalComponent = {
    $$typeof: REACT_FUNDAMENTAL_TYPE,
    impl: impl
  };
  {
    Object.freeze(fundamantalComponent);
  }
  return fundamantalComponent;
}

function createEventResponder(displayName, responderConfig) {
  var getInitialState = responderConfig.getInitialState,
      onEvent = responderConfig.onEvent,
      onMount = responderConfig.onMount,
      onUnmount = responderConfig.onUnmount,
      onOwnershipChange = responderConfig.onOwnershipChange,
      onRootEvent = responderConfig.onRootEvent,
      rootEventTypes = responderConfig.rootEventTypes,
      targetEventTypes = responderConfig.targetEventTypes;

  var eventResponder = {
    $$typeof: REACT_RESPONDER_TYPE,
    displayName: displayName,
    getInitialState: getInitialState || null,
    onEvent: onEvent || null,
    onMount: onMount || null,
    onOwnershipChange: onOwnershipChange || null,
    onRootEvent: onRootEvent || null,
    onUnmount: onUnmount || null,
    rootEventTypes: rootEventTypes || null,
    targetEventTypes: targetEventTypes || null
  };
  // We use responder as a Map key later on. When we have a bad
  // polyfill, then we can't use it as a key as the polyfill tries
  // to add a property to the object.
  if ( true && !hasBadMapPolyfill) {
    Object.freeze(eventResponder);
  }
  return eventResponder;
}

// Helps identify side effects in begin-phase lifecycle hooks and setState reducers:


// In some cases, StrictMode should also double-render lifecycles.
// This can be confusing for tests though,
// And it can be bad for performance in production.
// This feature flag can be used to control the behavior:


// To preserve the "Pause on caught exceptions" behavior of the debugger, we
// replay the begin phase of a failed component inside invokeGuardedCallback.


// Warn about deprecated, async-unsafe lifecycles; relates to RFC #6:


// Gather advanced timing metrics for Profiler subtrees.


// Trace which interactions trigger each commit.


// Only used in www builds.
 // TODO: true? Here it might just be false.

// Only used in www builds.


// Only used in www builds.


// Disable javascript: URL strings in href for XSS protection.


// React Fire: prevent the value and checked attributes from syncing
// with their related DOM properties


// These APIs will no longer be "unstable" in the upcoming 16.7 release,
// Control this behavior with a flag to support 16.6 minor releases in the meanwhile.




// See https://github.com/react-native-community/discussions-and-proposals/issues/72 for more information
// This is a flag so we can fix warnings in RN core before turning it on


// Experimental React Flare event system and event components support.
var enableFlareAPI = false;

// Experimental Host Component support.
var enableFundamentalAPI = false;

// New API for JSX transforms to target - https://github.com/reactjs/rfcs/pull/107
var enableJSXTransformAPI = false;

// We will enforce mocking scheduler with scheduler/unstable_mock at some point. (v17?)
// Till then, we warn about the missing mock, but still fallback to a sync mode compatible version

// Temporary flag to revert the fix in #15650


// For tests, we flush suspense fallbacks in an act scope;
// *except* in some of our own tests, where we test incremental loading states.


// Changes priority of some events like mousemove to user-blocking priority,
// but without making them discrete. The flag exists in case it causes
// starvation problems.


// Add a callback property to suspense to notify which promises are currently
// in the update queue. This allows reporting and tracing of what is causing
// the user to see a loading state.


// Part of the simplification of React.createElement so we can eventually move
// from React.createElement to React.jsx
// https://github.com/reactjs/rfcs/blob/createlement-rfc/text/0000-create-element-changes.md

var React = {
  Children: {
    map: mapChildren,
    forEach: forEachChildren,
    count: countChildren,
    toArray: toArray,
    only: onlyChild
  },

  createRef: createRef,
  Component: Component,
  PureComponent: PureComponent,

  createContext: createContext,
  forwardRef: forwardRef,
  lazy: lazy,
  memo: memo,

  useCallback: useCallback,
  useContext: useContext,
  useEffect: useEffect,
  useImperativeHandle: useImperativeHandle,
  useDebugValue: useDebugValue,
  useLayoutEffect: useLayoutEffect,
  useMemo: useMemo,
  useReducer: useReducer,
  useRef: useRef,
  useState: useState,

  Fragment: REACT_FRAGMENT_TYPE,
  Profiler: REACT_PROFILER_TYPE,
  StrictMode: REACT_STRICT_MODE_TYPE,
  Suspense: REACT_SUSPENSE_TYPE,
  unstable_SuspenseList: REACT_SUSPENSE_LIST_TYPE,

  createElement: createElementWithValidation,
  cloneElement: cloneElementWithValidation,
  createFactory: createFactoryWithValidation,
  isValidElement: isValidElement,

  version: ReactVersion,

  unstable_withSuspenseConfig: withSuspenseConfig,

  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: ReactSharedInternals
};

if (enableFlareAPI) {
  React.unstable_useResponder = useResponder;
  React.unstable_createResponder = createEventResponder;
}

if (enableFundamentalAPI) {
  React.unstable_createFundamental = createFundamentalComponent;
}

// Note: some APIs are added with feature flags.
// Make sure that stable builds for open source
// don't modify the React object to avoid deopts.
// Also let's not expose their names in stable builds.

if (enableJSXTransformAPI) {
  {
    React.jsxDEV = jsxWithValidation;
    React.jsx = jsxWithValidationDynamic;
    React.jsxs = jsxWithValidationStatic;
  }
}



var React$2 = Object.freeze({
	default: React
});

var React$3 = ( React$2 && React ) || React$2;

// TODO: decide on the top-level export form.
// This is hacky but makes it work with both Rollup and Jest.
var react = React$3.default || React$3;

module.exports = react;
  })();
}


/***/ }),

/***/ "../node_modules/react/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__("../node_modules/react/cjs/react.development.js");
}


/***/ }),

/***/ "../node_modules/scheduler/cjs/scheduler-tracing.development.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v0.13.6
 * scheduler-tracing.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (true) {
  (function() {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// Helps identify side effects in begin-phase lifecycle hooks and setState reducers:


// In some cases, StrictMode should also double-render lifecycles.
// This can be confusing for tests though,
// And it can be bad for performance in production.
// This feature flag can be used to control the behavior:


// To preserve the "Pause on caught exceptions" behavior of the debugger, we
// replay the begin phase of a failed component inside invokeGuardedCallback.


// Warn about deprecated, async-unsafe lifecycles; relates to RFC #6:


// Gather advanced timing metrics for Profiler subtrees.


// Trace which interactions trigger each commit.
var enableSchedulerTracing = true;

// Only used in www builds.
 // TODO: true? Here it might just be false.

// Only used in www builds.


// Only used in www builds.


// React Fire: prevent the value and checked attributes from syncing
// with their related DOM properties


// These APIs will no longer be "unstable" in the upcoming 16.7 release,
// Control this behavior with a flag to support 16.6 minor releases in the meanwhile.

var DEFAULT_THREAD_ID = 0;

// Counters used to generate unique IDs.
var interactionIDCounter = 0;
var threadIDCounter = 0;

// Set of currently traced interactions.
// Interactions "stack"–
// Meaning that newly traced interactions are appended to the previously active set.
// When an interaction goes out of scope, the previous set (if any) is restored.
exports.__interactionsRef = null;

// Listener(s) to notify when interactions begin and end.
exports.__subscriberRef = null;

if (enableSchedulerTracing) {
  exports.__interactionsRef = {
    current: new Set()
  };
  exports.__subscriberRef = {
    current: null
  };
}

function unstable_clear(callback) {
  if (!enableSchedulerTracing) {
    return callback();
  }

  var prevInteractions = exports.__interactionsRef.current;
  exports.__interactionsRef.current = new Set();

  try {
    return callback();
  } finally {
    exports.__interactionsRef.current = prevInteractions;
  }
}

function unstable_getCurrent() {
  if (!enableSchedulerTracing) {
    return null;
  } else {
    return exports.__interactionsRef.current;
  }
}

function unstable_getThreadID() {
  return ++threadIDCounter;
}

function unstable_trace(name, timestamp, callback) {
  var threadID = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : DEFAULT_THREAD_ID;

  if (!enableSchedulerTracing) {
    return callback();
  }

  var interaction = {
    __count: 1,
    id: interactionIDCounter++,
    name: name,
    timestamp: timestamp
  };

  var prevInteractions = exports.__interactionsRef.current;

  // Traced interactions should stack/accumulate.
  // To do that, clone the current interactions.
  // The previous set will be restored upon completion.
  var interactions = new Set(prevInteractions);
  interactions.add(interaction);
  exports.__interactionsRef.current = interactions;

  var subscriber = exports.__subscriberRef.current;
  var returnValue = void 0;

  try {
    if (subscriber !== null) {
      subscriber.onInteractionTraced(interaction);
    }
  } finally {
    try {
      if (subscriber !== null) {
        subscriber.onWorkStarted(interactions, threadID);
      }
    } finally {
      try {
        returnValue = callback();
      } finally {
        exports.__interactionsRef.current = prevInteractions;

        try {
          if (subscriber !== null) {
            subscriber.onWorkStopped(interactions, threadID);
          }
        } finally {
          interaction.__count--;

          // If no async work was scheduled for this interaction,
          // Notify subscribers that it's completed.
          if (subscriber !== null && interaction.__count === 0) {
            subscriber.onInteractionScheduledWorkCompleted(interaction);
          }
        }
      }
    }
  }

  return returnValue;
}

function unstable_wrap(callback) {
  var threadID = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_THREAD_ID;

  if (!enableSchedulerTracing) {
    return callback;
  }

  var wrappedInteractions = exports.__interactionsRef.current;

  var subscriber = exports.__subscriberRef.current;
  if (subscriber !== null) {
    subscriber.onWorkScheduled(wrappedInteractions, threadID);
  }

  // Update the pending async work count for the current interactions.
  // Update after calling subscribers in case of error.
  wrappedInteractions.forEach(function (interaction) {
    interaction.__count++;
  });

  var hasRun = false;

  function wrapped() {
    var prevInteractions = exports.__interactionsRef.current;
    exports.__interactionsRef.current = wrappedInteractions;

    subscriber = exports.__subscriberRef.current;

    try {
      var returnValue = void 0;

      try {
        if (subscriber !== null) {
          subscriber.onWorkStarted(wrappedInteractions, threadID);
        }
      } finally {
        try {
          returnValue = callback.apply(undefined, arguments);
        } finally {
          exports.__interactionsRef.current = prevInteractions;

          if (subscriber !== null) {
            subscriber.onWorkStopped(wrappedInteractions, threadID);
          }
        }
      }

      return returnValue;
    } finally {
      if (!hasRun) {
        // We only expect a wrapped function to be executed once,
        // But in the event that it's executed more than once–
        // Only decrement the outstanding interaction counts once.
        hasRun = true;

        // Update pending async counts for all wrapped interactions.
        // If this was the last scheduled async work for any of them,
        // Mark them as completed.
        wrappedInteractions.forEach(function (interaction) {
          interaction.__count--;

          if (subscriber !== null && interaction.__count === 0) {
            subscriber.onInteractionScheduledWorkCompleted(interaction);
          }
        });
      }
    }
  }

  wrapped.cancel = function cancel() {
    subscriber = exports.__subscriberRef.current;

    try {
      if (subscriber !== null) {
        subscriber.onWorkCanceled(wrappedInteractions, threadID);
      }
    } finally {
      // Update pending async counts for all wrapped interactions.
      // If this was the last scheduled async work for any of them,
      // Mark them as completed.
      wrappedInteractions.forEach(function (interaction) {
        interaction.__count--;

        if (subscriber && interaction.__count === 0) {
          subscriber.onInteractionScheduledWorkCompleted(interaction);
        }
      });
    }
  };

  return wrapped;
}

var subscribers = null;
if (enableSchedulerTracing) {
  subscribers = new Set();
}

function unstable_subscribe(subscriber) {
  if (enableSchedulerTracing) {
    subscribers.add(subscriber);

    if (subscribers.size === 1) {
      exports.__subscriberRef.current = {
        onInteractionScheduledWorkCompleted: onInteractionScheduledWorkCompleted,
        onInteractionTraced: onInteractionTraced,
        onWorkCanceled: onWorkCanceled,
        onWorkScheduled: onWorkScheduled,
        onWorkStarted: onWorkStarted,
        onWorkStopped: onWorkStopped
      };
    }
  }
}

function unstable_unsubscribe(subscriber) {
  if (enableSchedulerTracing) {
    subscribers.delete(subscriber);

    if (subscribers.size === 0) {
      exports.__subscriberRef.current = null;
    }
  }
}

function onInteractionTraced(interaction) {
  var didCatchError = false;
  var caughtError = null;

  subscribers.forEach(function (subscriber) {
    try {
      subscriber.onInteractionTraced(interaction);
    } catch (error) {
      if (!didCatchError) {
        didCatchError = true;
        caughtError = error;
      }
    }
  });

  if (didCatchError) {
    throw caughtError;
  }
}

function onInteractionScheduledWorkCompleted(interaction) {
  var didCatchError = false;
  var caughtError = null;

  subscribers.forEach(function (subscriber) {
    try {
      subscriber.onInteractionScheduledWorkCompleted(interaction);
    } catch (error) {
      if (!didCatchError) {
        didCatchError = true;
        caughtError = error;
      }
    }
  });

  if (didCatchError) {
    throw caughtError;
  }
}

function onWorkScheduled(interactions, threadID) {
  var didCatchError = false;
  var caughtError = null;

  subscribers.forEach(function (subscriber) {
    try {
      subscriber.onWorkScheduled(interactions, threadID);
    } catch (error) {
      if (!didCatchError) {
        didCatchError = true;
        caughtError = error;
      }
    }
  });

  if (didCatchError) {
    throw caughtError;
  }
}

function onWorkStarted(interactions, threadID) {
  var didCatchError = false;
  var caughtError = null;

  subscribers.forEach(function (subscriber) {
    try {
      subscriber.onWorkStarted(interactions, threadID);
    } catch (error) {
      if (!didCatchError) {
        didCatchError = true;
        caughtError = error;
      }
    }
  });

  if (didCatchError) {
    throw caughtError;
  }
}

function onWorkStopped(interactions, threadID) {
  var didCatchError = false;
  var caughtError = null;

  subscribers.forEach(function (subscriber) {
    try {
      subscriber.onWorkStopped(interactions, threadID);
    } catch (error) {
      if (!didCatchError) {
        didCatchError = true;
        caughtError = error;
      }
    }
  });

  if (didCatchError) {
    throw caughtError;
  }
}

function onWorkCanceled(interactions, threadID) {
  var didCatchError = false;
  var caughtError = null;

  subscribers.forEach(function (subscriber) {
    try {
      subscriber.onWorkCanceled(interactions, threadID);
    } catch (error) {
      if (!didCatchError) {
        didCatchError = true;
        caughtError = error;
      }
    }
  });

  if (didCatchError) {
    throw caughtError;
  }
}

exports.unstable_clear = unstable_clear;
exports.unstable_getCurrent = unstable_getCurrent;
exports.unstable_getThreadID = unstable_getThreadID;
exports.unstable_trace = unstable_trace;
exports.unstable_wrap = unstable_wrap;
exports.unstable_subscribe = unstable_subscribe;
exports.unstable_unsubscribe = unstable_unsubscribe;
  })();
}


/***/ }),

/***/ "../node_modules/scheduler/cjs/scheduler.development.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/** @license React v0.13.6
 * scheduler.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (true) {
  (function() {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var enableSchedulerDebugging = false;

/* eslint-disable no-var */

// TODO: Use symbols?
var ImmediatePriority = 1;
var UserBlockingPriority = 2;
var NormalPriority = 3;
var LowPriority = 4;
var IdlePriority = 5;

// Max 31 bit integer. The max integer size in V8 for 32-bit systems.
// Math.pow(2, 30) - 1
// 0b111111111111111111111111111111
var maxSigned31BitInt = 1073741823;

// Times out immediately
var IMMEDIATE_PRIORITY_TIMEOUT = -1;
// Eventually times out
var USER_BLOCKING_PRIORITY = 250;
var NORMAL_PRIORITY_TIMEOUT = 5000;
var LOW_PRIORITY_TIMEOUT = 10000;
// Never times out
var IDLE_PRIORITY = maxSigned31BitInt;

// Callbacks are stored as a circular, doubly linked list.
var firstCallbackNode = null;

var currentDidTimeout = false;
// Pausing the scheduler is useful for debugging.
var isSchedulerPaused = false;

var currentPriorityLevel = NormalPriority;
var currentEventStartTime = -1;
var currentExpirationTime = -1;

// This is set when a callback is being executed, to prevent re-entrancy.
var isExecutingCallback = false;

var isHostCallbackScheduled = false;

var hasNativePerformanceNow = typeof performance === 'object' && typeof performance.now === 'function';

function ensureHostCallbackIsScheduled() {
  if (isExecutingCallback) {
    // Don't schedule work yet; wait until the next time we yield.
    return;
  }
  // Schedule the host callback using the earliest expiration in the list.
  var expirationTime = firstCallbackNode.expirationTime;
  if (!isHostCallbackScheduled) {
    isHostCallbackScheduled = true;
  } else {
    // Cancel the existing host callback.
    cancelHostCallback();
  }
  requestHostCallback(flushWork, expirationTime);
}

function flushFirstCallback() {
  var flushedNode = firstCallbackNode;

  // Remove the node from the list before calling the callback. That way the
  // list is in a consistent state even if the callback throws.
  var next = firstCallbackNode.next;
  if (firstCallbackNode === next) {
    // This is the last callback in the list.
    firstCallbackNode = null;
    next = null;
  } else {
    var lastCallbackNode = firstCallbackNode.previous;
    firstCallbackNode = lastCallbackNode.next = next;
    next.previous = lastCallbackNode;
  }

  flushedNode.next = flushedNode.previous = null;

  // Now it's safe to call the callback.
  var callback = flushedNode.callback;
  var expirationTime = flushedNode.expirationTime;
  var priorityLevel = flushedNode.priorityLevel;
  var previousPriorityLevel = currentPriorityLevel;
  var previousExpirationTime = currentExpirationTime;
  currentPriorityLevel = priorityLevel;
  currentExpirationTime = expirationTime;
  var continuationCallback;
  try {
    continuationCallback = callback();
  } finally {
    currentPriorityLevel = previousPriorityLevel;
    currentExpirationTime = previousExpirationTime;
  }

  // A callback may return a continuation. The continuation should be scheduled
  // with the same priority and expiration as the just-finished callback.
  if (typeof continuationCallback === 'function') {
    var continuationNode = {
      callback: continuationCallback,
      priorityLevel: priorityLevel,
      expirationTime: expirationTime,
      next: null,
      previous: null
    };

    // Insert the new callback into the list, sorted by its expiration. This is
    // almost the same as the code in `scheduleCallback`, except the callback
    // is inserted into the list *before* callbacks of equal expiration instead
    // of after.
    if (firstCallbackNode === null) {
      // This is the first callback in the list.
      firstCallbackNode = continuationNode.next = continuationNode.previous = continuationNode;
    } else {
      var nextAfterContinuation = null;
      var node = firstCallbackNode;
      do {
        if (node.expirationTime >= expirationTime) {
          // This callback expires at or after the continuation. We will insert
          // the continuation *before* this callback.
          nextAfterContinuation = node;
          break;
        }
        node = node.next;
      } while (node !== firstCallbackNode);

      if (nextAfterContinuation === null) {
        // No equal or lower priority callback was found, which means the new
        // callback is the lowest priority callback in the list.
        nextAfterContinuation = firstCallbackNode;
      } else if (nextAfterContinuation === firstCallbackNode) {
        // The new callback is the highest priority callback in the list.
        firstCallbackNode = continuationNode;
        ensureHostCallbackIsScheduled();
      }

      var previous = nextAfterContinuation.previous;
      previous.next = nextAfterContinuation.previous = continuationNode;
      continuationNode.next = nextAfterContinuation;
      continuationNode.previous = previous;
    }
  }
}

function flushImmediateWork() {
  if (
  // Confirm we've exited the outer most event handler
  currentEventStartTime === -1 && firstCallbackNode !== null && firstCallbackNode.priorityLevel === ImmediatePriority) {
    isExecutingCallback = true;
    try {
      do {
        flushFirstCallback();
      } while (
      // Keep flushing until there are no more immediate callbacks
      firstCallbackNode !== null && firstCallbackNode.priorityLevel === ImmediatePriority);
    } finally {
      isExecutingCallback = false;
      if (firstCallbackNode !== null) {
        // There's still work remaining. Request another callback.
        ensureHostCallbackIsScheduled();
      } else {
        isHostCallbackScheduled = false;
      }
    }
  }
}

function flushWork(didTimeout) {
  // Exit right away if we're currently paused

  if (enableSchedulerDebugging && isSchedulerPaused) {
    return;
  }

  isExecutingCallback = true;
  var previousDidTimeout = currentDidTimeout;
  currentDidTimeout = didTimeout;
  try {
    if (didTimeout) {
      // Flush all the expired callbacks without yielding.
      while (firstCallbackNode !== null && !(enableSchedulerDebugging && isSchedulerPaused)) {
        // TODO Wrap in feature flag
        // Read the current time. Flush all the callbacks that expire at or
        // earlier than that time. Then read the current time again and repeat.
        // This optimizes for as few performance.now calls as possible.
        var currentTime = exports.unstable_now();
        if (firstCallbackNode.expirationTime <= currentTime) {
          do {
            flushFirstCallback();
          } while (firstCallbackNode !== null && firstCallbackNode.expirationTime <= currentTime && !(enableSchedulerDebugging && isSchedulerPaused));
          continue;
        }
        break;
      }
    } else {
      // Keep flushing callbacks until we run out of time in the frame.
      if (firstCallbackNode !== null) {
        do {
          if (enableSchedulerDebugging && isSchedulerPaused) {
            break;
          }
          flushFirstCallback();
        } while (firstCallbackNode !== null && !shouldYieldToHost());
      }
    }
  } finally {
    isExecutingCallback = false;
    currentDidTimeout = previousDidTimeout;
    if (firstCallbackNode !== null) {
      // There's still work remaining. Request another callback.
      ensureHostCallbackIsScheduled();
    } else {
      isHostCallbackScheduled = false;
    }
    // Before exiting, flush all the immediate work that was scheduled.
    flushImmediateWork();
  }
}

function unstable_runWithPriority(priorityLevel, eventHandler) {
  switch (priorityLevel) {
    case ImmediatePriority:
    case UserBlockingPriority:
    case NormalPriority:
    case LowPriority:
    case IdlePriority:
      break;
    default:
      priorityLevel = NormalPriority;
  }

  var previousPriorityLevel = currentPriorityLevel;
  var previousEventStartTime = currentEventStartTime;
  currentPriorityLevel = priorityLevel;
  currentEventStartTime = exports.unstable_now();

  try {
    return eventHandler();
  } finally {
    currentPriorityLevel = previousPriorityLevel;
    currentEventStartTime = previousEventStartTime;

    // Before exiting, flush all the immediate work that was scheduled.
    flushImmediateWork();
  }
}

function unstable_next(eventHandler) {
  var priorityLevel = void 0;
  switch (currentPriorityLevel) {
    case ImmediatePriority:
    case UserBlockingPriority:
    case NormalPriority:
      // Shift down to normal priority
      priorityLevel = NormalPriority;
      break;
    default:
      // Anything lower than normal priority should remain at the current level.
      priorityLevel = currentPriorityLevel;
      break;
  }

  var previousPriorityLevel = currentPriorityLevel;
  var previousEventStartTime = currentEventStartTime;
  currentPriorityLevel = priorityLevel;
  currentEventStartTime = exports.unstable_now();

  try {
    return eventHandler();
  } finally {
    currentPriorityLevel = previousPriorityLevel;
    currentEventStartTime = previousEventStartTime;

    // Before exiting, flush all the immediate work that was scheduled.
    flushImmediateWork();
  }
}

function unstable_wrapCallback(callback) {
  var parentPriorityLevel = currentPriorityLevel;
  return function () {
    // This is a fork of runWithPriority, inlined for performance.
    var previousPriorityLevel = currentPriorityLevel;
    var previousEventStartTime = currentEventStartTime;
    currentPriorityLevel = parentPriorityLevel;
    currentEventStartTime = exports.unstable_now();

    try {
      return callback.apply(this, arguments);
    } finally {
      currentPriorityLevel = previousPriorityLevel;
      currentEventStartTime = previousEventStartTime;
      flushImmediateWork();
    }
  };
}

function unstable_scheduleCallback(callback, deprecated_options) {
  var startTime = currentEventStartTime !== -1 ? currentEventStartTime : exports.unstable_now();

  var expirationTime;
  if (typeof deprecated_options === 'object' && deprecated_options !== null && typeof deprecated_options.timeout === 'number') {
    // FIXME: Remove this branch once we lift expiration times out of React.
    expirationTime = startTime + deprecated_options.timeout;
  } else {
    switch (currentPriorityLevel) {
      case ImmediatePriority:
        expirationTime = startTime + IMMEDIATE_PRIORITY_TIMEOUT;
        break;
      case UserBlockingPriority:
        expirationTime = startTime + USER_BLOCKING_PRIORITY;
        break;
      case IdlePriority:
        expirationTime = startTime + IDLE_PRIORITY;
        break;
      case LowPriority:
        expirationTime = startTime + LOW_PRIORITY_TIMEOUT;
        break;
      case NormalPriority:
      default:
        expirationTime = startTime + NORMAL_PRIORITY_TIMEOUT;
    }
  }

  var newNode = {
    callback: callback,
    priorityLevel: currentPriorityLevel,
    expirationTime: expirationTime,
    next: null,
    previous: null
  };

  // Insert the new callback into the list, ordered first by expiration, then
  // by insertion. So the new callback is inserted any other callback with
  // equal expiration.
  if (firstCallbackNode === null) {
    // This is the first callback in the list.
    firstCallbackNode = newNode.next = newNode.previous = newNode;
    ensureHostCallbackIsScheduled();
  } else {
    var next = null;
    var node = firstCallbackNode;
    do {
      if (node.expirationTime > expirationTime) {
        // The new callback expires before this one.
        next = node;
        break;
      }
      node = node.next;
    } while (node !== firstCallbackNode);

    if (next === null) {
      // No callback with a later expiration was found, which means the new
      // callback has the latest expiration in the list.
      next = firstCallbackNode;
    } else if (next === firstCallbackNode) {
      // The new callback has the earliest expiration in the entire list.
      firstCallbackNode = newNode;
      ensureHostCallbackIsScheduled();
    }

    var previous = next.previous;
    previous.next = next.previous = newNode;
    newNode.next = next;
    newNode.previous = previous;
  }

  return newNode;
}

function unstable_pauseExecution() {
  isSchedulerPaused = true;
}

function unstable_continueExecution() {
  isSchedulerPaused = false;
  if (firstCallbackNode !== null) {
    ensureHostCallbackIsScheduled();
  }
}

function unstable_getFirstCallbackNode() {
  return firstCallbackNode;
}

function unstable_cancelCallback(callbackNode) {
  var next = callbackNode.next;
  if (next === null) {
    // Already cancelled.
    return;
  }

  if (next === callbackNode) {
    // This is the only scheduled callback. Clear the list.
    firstCallbackNode = null;
  } else {
    // Remove the callback from its position in the list.
    if (callbackNode === firstCallbackNode) {
      firstCallbackNode = next;
    }
    var previous = callbackNode.previous;
    previous.next = next;
    next.previous = previous;
  }

  callbackNode.next = callbackNode.previous = null;
}

function unstable_getCurrentPriorityLevel() {
  return currentPriorityLevel;
}

function unstable_shouldYield() {
  return !currentDidTimeout && (firstCallbackNode !== null && firstCallbackNode.expirationTime < currentExpirationTime || shouldYieldToHost());
}

// The remaining code is essentially a polyfill for requestIdleCallback. It
// works by scheduling a requestAnimationFrame, storing the time for the start
// of the frame, then scheduling a postMessage which gets scheduled after paint.
// Within the postMessage handler do as much work as possible until time + frame
// rate. By separating the idle call into a separate event tick we ensure that
// layout, paint and other browser work is counted against the available time.
// The frame rate is dynamically adjusted.

// We capture a local reference to any global, in case it gets polyfilled after
// this module is initially evaluated. We want to be using a
// consistent implementation.
var localDate = Date;

// This initialization code may run even on server environments if a component
// just imports ReactDOM (e.g. for findDOMNode). Some environments might not
// have setTimeout or clearTimeout. However, we always expect them to be defined
// on the client. https://github.com/facebook/react/pull/13088
var localSetTimeout = typeof setTimeout === 'function' ? setTimeout : undefined;
var localClearTimeout = typeof clearTimeout === 'function' ? clearTimeout : undefined;

// We don't expect either of these to necessarily be defined, but we will error
// later if they are missing on the client.
var localRequestAnimationFrame = typeof requestAnimationFrame === 'function' ? requestAnimationFrame : undefined;
var localCancelAnimationFrame = typeof cancelAnimationFrame === 'function' ? cancelAnimationFrame : undefined;

// requestAnimationFrame does not run when the tab is in the background. If
// we're backgrounded we prefer for that work to happen so that the page
// continues to load in the background. So we also schedule a 'setTimeout' as
// a fallback.
// TODO: Need a better heuristic for backgrounded work.
var ANIMATION_FRAME_TIMEOUT = 100;
var rAFID;
var rAFTimeoutID;
var requestAnimationFrameWithTimeout = function (callback) {
  // schedule rAF and also a setTimeout
  rAFID = localRequestAnimationFrame(function (timestamp) {
    // cancel the setTimeout
    localClearTimeout(rAFTimeoutID);
    callback(timestamp);
  });
  rAFTimeoutID = localSetTimeout(function () {
    // cancel the requestAnimationFrame
    localCancelAnimationFrame(rAFID);
    callback(exports.unstable_now());
  }, ANIMATION_FRAME_TIMEOUT);
};

if (hasNativePerformanceNow) {
  var Performance = performance;
  exports.unstable_now = function () {
    return Performance.now();
  };
} else {
  exports.unstable_now = function () {
    return localDate.now();
  };
}

var requestHostCallback;
var cancelHostCallback;
var shouldYieldToHost;

var globalValue = null;
if (typeof global.global !== 'undefined') {
  globalValue = global.global;
} else if (typeof global !== 'undefined') {
  globalValue = global;
}

if (globalValue && globalValue._schedMock) {
  // Dynamic injection, only for testing purposes.
  var globalImpl = globalValue._schedMock;
  requestHostCallback = globalImpl[0];
  cancelHostCallback = globalImpl[1];
  shouldYieldToHost = globalImpl[2];
  exports.unstable_now = globalImpl[3];
} else if (
// If Scheduler runs in a non-DOM environment, it falls back to a naive
// implementation using setTimeout.
typeof global.global === 'undefined' ||
// Check if MessageChannel is supported, too.
typeof MessageChannel !== 'function') {
  // If this accidentally gets imported in a non-browser environment, e.g. JavaScriptCore,
  // fallback to a naive implementation.
  var _callback = null;
  var _flushCallback = function (didTimeout) {
    if (_callback !== null) {
      try {
        _callback(didTimeout);
      } finally {
        _callback = null;
      }
    }
  };
  requestHostCallback = function (cb, ms) {
    if (_callback !== null) {
      // Protect against re-entrancy.
      setTimeout(requestHostCallback, 0, cb);
    } else {
      _callback = cb;
      setTimeout(_flushCallback, 0, false);
    }
  };
  cancelHostCallback = function () {
    _callback = null;
  };
  shouldYieldToHost = function () {
    return false;
  };
} else {
  if (typeof console !== 'undefined') {
    // TODO: Remove fb.me link
    if (typeof localRequestAnimationFrame !== 'function') {
      console.error("This browser doesn't support requestAnimationFrame. " + 'Make sure that you load a ' + 'polyfill in older browsers. https://fb.me/react-polyfills');
    }
    if (typeof localCancelAnimationFrame !== 'function') {
      console.error("This browser doesn't support cancelAnimationFrame. " + 'Make sure that you load a ' + 'polyfill in older browsers. https://fb.me/react-polyfills');
    }
  }

  var scheduledHostCallback = null;
  var isMessageEventScheduled = false;
  var timeoutTime = -1;

  var isAnimationFrameScheduled = false;

  var isFlushingHostCallback = false;

  var frameDeadline = 0;
  // We start out assuming that we run at 30fps but then the heuristic tracking
  // will adjust this value to a faster fps if we get more frequent animation
  // frames.
  var previousFrameTime = 33;
  var activeFrameTime = 33;

  shouldYieldToHost = function () {
    return frameDeadline <= exports.unstable_now();
  };

  // We use the postMessage trick to defer idle work until after the repaint.
  var channel = new MessageChannel();
  var port = channel.port2;
  channel.port1.onmessage = function (event) {
    isMessageEventScheduled = false;

    var prevScheduledCallback = scheduledHostCallback;
    var prevTimeoutTime = timeoutTime;
    scheduledHostCallback = null;
    timeoutTime = -1;

    var currentTime = exports.unstable_now();

    var didTimeout = false;
    if (frameDeadline - currentTime <= 0) {
      // There's no time left in this idle period. Check if the callback has
      // a timeout and whether it's been exceeded.
      if (prevTimeoutTime !== -1 && prevTimeoutTime <= currentTime) {
        // Exceeded the timeout. Invoke the callback even though there's no
        // time left.
        didTimeout = true;
      } else {
        // No timeout.
        if (!isAnimationFrameScheduled) {
          // Schedule another animation callback so we retry later.
          isAnimationFrameScheduled = true;
          requestAnimationFrameWithTimeout(animationTick);
        }
        // Exit without invoking the callback.
        scheduledHostCallback = prevScheduledCallback;
        timeoutTime = prevTimeoutTime;
        return;
      }
    }

    if (prevScheduledCallback !== null) {
      isFlushingHostCallback = true;
      try {
        prevScheduledCallback(didTimeout);
      } finally {
        isFlushingHostCallback = false;
      }
    }
  };

  var animationTick = function (rafTime) {
    if (scheduledHostCallback !== null) {
      // Eagerly schedule the next animation callback at the beginning of the
      // frame. If the scheduler queue is not empty at the end of the frame, it
      // will continue flushing inside that callback. If the queue *is* empty,
      // then it will exit immediately. Posting the callback at the start of the
      // frame ensures it's fired within the earliest possible frame. If we
      // waited until the end of the frame to post the callback, we risk the
      // browser skipping a frame and not firing the callback until the frame
      // after that.
      requestAnimationFrameWithTimeout(animationTick);
    } else {
      // No pending work. Exit.
      isAnimationFrameScheduled = false;
      return;
    }

    var nextFrameTime = rafTime - frameDeadline + activeFrameTime;
    if (nextFrameTime < activeFrameTime && previousFrameTime < activeFrameTime) {
      if (nextFrameTime < 8) {
        // Defensive coding. We don't support higher frame rates than 120hz.
        // If the calculated frame time gets lower than 8, it is probably a bug.
        nextFrameTime = 8;
      }
      // If one frame goes long, then the next one can be short to catch up.
      // If two frames are short in a row, then that's an indication that we
      // actually have a higher frame rate than what we're currently optimizing.
      // We adjust our heuristic dynamically accordingly. For example, if we're
      // running on 120hz display or 90hz VR display.
      // Take the max of the two in case one of them was an anomaly due to
      // missed frame deadlines.
      activeFrameTime = nextFrameTime < previousFrameTime ? previousFrameTime : nextFrameTime;
    } else {
      previousFrameTime = nextFrameTime;
    }
    frameDeadline = rafTime + activeFrameTime;
    if (!isMessageEventScheduled) {
      isMessageEventScheduled = true;
      port.postMessage(undefined);
    }
  };

  requestHostCallback = function (callback, absoluteTimeout) {
    scheduledHostCallback = callback;
    timeoutTime = absoluteTimeout;
    if (isFlushingHostCallback || absoluteTimeout < 0) {
      // Don't wait for the next frame. Continue working ASAP, in a new event.
      port.postMessage(undefined);
    } else if (!isAnimationFrameScheduled) {
      // If rAF didn't already schedule one, we need to schedule a frame.
      // TODO: If this rAF doesn't materialize because the browser throttles, we
      // might want to still have setTimeout trigger rIC as a backup to ensure
      // that we keep performing work.
      isAnimationFrameScheduled = true;
      requestAnimationFrameWithTimeout(animationTick);
    }
  };

  cancelHostCallback = function () {
    scheduledHostCallback = null;
    isMessageEventScheduled = false;
    timeoutTime = -1;
  };
}

exports.unstable_ImmediatePriority = ImmediatePriority;
exports.unstable_UserBlockingPriority = UserBlockingPriority;
exports.unstable_NormalPriority = NormalPriority;
exports.unstable_IdlePriority = IdlePriority;
exports.unstable_LowPriority = LowPriority;
exports.unstable_runWithPriority = unstable_runWithPriority;
exports.unstable_next = unstable_next;
exports.unstable_scheduleCallback = unstable_scheduleCallback;
exports.unstable_cancelCallback = unstable_cancelCallback;
exports.unstable_wrapCallback = unstable_wrapCallback;
exports.unstable_getCurrentPriorityLevel = unstable_getCurrentPriorityLevel;
exports.unstable_shouldYield = unstable_shouldYield;
exports.unstable_continueExecution = unstable_continueExecution;
exports.unstable_pauseExecution = unstable_pauseExecution;
exports.unstable_getFirstCallbackNode = unstable_getFirstCallbackNode;
  })();
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../node_modules/scheduler/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__("../node_modules/scheduler/cjs/scheduler.development.js");
}


/***/ }),

/***/ "../node_modules/scheduler/tracing.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__("../node_modules/scheduler/cjs/scheduler-tracing.development.js");
}


/***/ }),

/***/ "../node_modules/shallowequal/index.js":
/***/ (function(module, exports) {

//

module.exports = function shallowEqual(objA, objB, compare, compareContext) {
  var ret = compare ? compare.call(compareContext, objA, objB) : void 0;

  if (ret !== void 0) {
    return !!ret;
  }

  if (objA === objB) {
    return true;
  }

  if (typeof objA !== "object" || !objA || typeof objB !== "object" || !objB) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);

  // Test for A's keys different from B.
  for (var idx = 0; idx < keysA.length; idx++) {
    var key = keysA[idx];

    if (!bHasOwnProperty(key)) {
      return false;
    }

    var valueA = objA[key];
    var valueB = objB[key];

    ret = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;

    if (ret === false || (ret === void 0 && valueA !== valueB)) {
      return false;
    }
  }

  return true;
};


/***/ }),

/***/ "../node_modules/webpack/buildin/amd-define.js":
/***/ (function(module, exports) {

module.exports = function() {
	throw new Error("define cannot be used indirect");
};


/***/ }),

/***/ "../node_modules/webpack/buildin/amd-options.js":
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(this, {}))

/***/ }),

/***/ "../node_modules/webpack/buildin/global.js":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof global.global === "object") g = global.global;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "../node_modules/webpack/buildin/harmony-module.js":
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if (!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "../node_modules/webpack/buildin/module.js":
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ })

}]);