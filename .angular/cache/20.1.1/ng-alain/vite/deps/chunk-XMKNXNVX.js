import {
  Injectable,
  setClassMetadata
} from "./chunk-NQBXVTYU.js";
import {
  DOCUMENT,
  inject,
  ɵɵdefineInjectable
} from "./chunk-QZDSTGXI.js";
import {
  isObservable
} from "./chunk-KMLKBNXJ.js";
import {
  BehaviorSubject,
  filter,
  share
} from "./chunk-EBAU53KC.js";
import {
  __commonJS,
  __spreadProps,
  __spreadValues,
  __toESM
} from "./chunk-7CE4I3X6.js";

// node_modules/extend/index.js
var require_extend = __commonJS({
  "node_modules/extend/index.js"(exports, module) {
    "use strict";
    var hasOwn = Object.prototype.hasOwnProperty;
    var toStr = Object.prototype.toString;
    var defineProperty = Object.defineProperty;
    var gOPD = Object.getOwnPropertyDescriptor;
    var isArray = function isArray2(arr) {
      if (typeof Array.isArray === "function") {
        return Array.isArray(arr);
      }
      return toStr.call(arr) === "[object Array]";
    };
    var isPlainObject = function isPlainObject2(obj) {
      if (!obj || toStr.call(obj) !== "[object Object]") {
        return false;
      }
      var hasOwnConstructor = hasOwn.call(obj, "constructor");
      var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, "isPrototypeOf");
      if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
        return false;
      }
      var key;
      for (key in obj) {
      }
      return typeof key === "undefined" || hasOwn.call(obj, key);
    };
    var setProperty = function setProperty2(target, options) {
      if (defineProperty && options.name === "__proto__") {
        defineProperty(target, options.name, {
          enumerable: true,
          configurable: true,
          value: options.newValue,
          writable: true
        });
      } else {
        target[options.name] = options.newValue;
      }
    };
    var getProperty = function getProperty2(obj, name) {
      if (name === "__proto__") {
        if (!hasOwn.call(obj, name)) {
          return void 0;
        } else if (gOPD) {
          return gOPD(obj, name).value;
        }
      }
      return obj[name];
    };
    module.exports = function extend2() {
      var options, name, src, copy, copyIsArray, clone;
      var target = arguments[0];
      var i = 1;
      var length = arguments.length;
      var deep = false;
      if (typeof target === "boolean") {
        deep = target;
        target = arguments[1] || {};
        i = 2;
      }
      if (target == null || typeof target !== "object" && typeof target !== "function") {
        target = {};
      }
      for (; i < length; ++i) {
        options = arguments[i];
        if (options != null) {
          for (name in options) {
            src = getProperty(target, name);
            copy = getProperty(options, name);
            if (target !== copy) {
              if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
                if (copyIsArray) {
                  copyIsArray = false;
                  clone = src && isArray(src) ? src : [];
                } else {
                  clone = src && isPlainObject(src) ? src : {};
                }
                setProperty(target, { name, newValue: extend2(deep, clone, copy) });
              } else if (typeof copy !== "undefined") {
                setProperty(target, { name, newValue: copy });
              }
            }
          }
        }
      }
      return target;
    };
  }
});

// node_modules/@delon/util/fesm2022/other.mjs
var import_extend = __toESM(require_extend(), 1);
function deepGet(obj, path, defaultValue) {
  if (!obj || path == null || path.length === 0) return defaultValue;
  if (!Array.isArray(path)) {
    path = ~path.indexOf(".") ? path.split(".") : [path];
  }
  if (path.length === 1) {
    const checkObj = obj[path[0]];
    return typeof checkObj === "undefined" ? defaultValue : checkObj;
  }
  const res = path.reduce((o, k) => (o || {})[k], obj);
  return typeof res === "undefined" ? defaultValue : res;
}
function deepCopy(obj) {
  const result = (0, import_extend.default)(true, {}, {
    _: obj
  });
  return result._;
}
function deepMergeKey(original, arrayProcessMethod, ...objects) {
  if (Array.isArray(original) || typeof original !== "object") return original;
  const isObject = (v) => typeof v === "object";
  const merge = (target, obj) => {
    Object.keys(obj).filter((key) => key !== "__proto__" && Object.prototype.hasOwnProperty.call(obj, key)).forEach((key) => {
      const fromValue = obj[key];
      const toValue = target[key];
      if (Array.isArray(toValue)) {
        target[key] = arrayProcessMethod ? fromValue : [...toValue, ...fromValue];
      } else if (typeof fromValue === "function") {
        target[key] = fromValue;
      } else if (fromValue != null && isObject(fromValue) && toValue != null && isObject(toValue)) {
        target[key] = merge(toValue, fromValue);
      } else {
        target[key] = deepCopy(fromValue);
      }
    });
    return target;
  };
  objects.filter((v) => v != null && isObject(v)).forEach((v) => merge(original, v));
  return original;
}
function deepMerge(original, ...objects) {
  return deepMergeKey(original, false, ...objects);
}
var record = {};
var PREFIX = "[@DELON]:";
function notRecorded(...args) {
  const asRecord = args.reduce((acc, c) => acc + c.toString(), "");
  if (record[asRecord]) {
    return false;
  } else {
    record[asRecord] = true;
    return true;
  }
}
function consoleCommonBehavior(consoleFunc, ...args) {
  if ((typeof ngDevMode === "undefined" || ngDevMode) && notRecorded(...args)) {
    consoleFunc(...args);
  }
}
var warn = (...args) => consoleCommonBehavior((...arg) => console.warn(PREFIX, ...arg), ...args);
var warnDeprecation = (...args) => {
  if (typeof ngDevMode === "undefined" || ngDevMode) {
    return () => {
    };
  }
  const stack = new Error().stack;
  return consoleCommonBehavior((...arg) => console.warn(PREFIX, "deprecated:", ...arg, stack), ...args);
};
var log = (...args) => {
  if (typeof ngDevMode === "undefined" || ngDevMode) {
    console.log(PREFIX, ...args);
  }
};
var LazyService = class _LazyService {
  doc = inject(DOCUMENT);
  list = {};
  cached = {};
  _notify = new BehaviorSubject([]);
  get change() {
    return this._notify.asObservable().pipe(share(), filter((ls) => ls.length !== 0));
  }
  clear() {
    this.list = {};
    this.cached = {};
  }
  attachAttributes(el, attributes) {
    if (attributes == null) return;
    Object.entries(attributes).forEach(([key, value]) => {
      el.setAttribute(key, value);
    });
  }
  /**
   * Load script or style files
   */
  load(paths) {
    if (!Array.isArray(paths)) {
      paths = [paths];
    }
    const promises = [];
    paths.map((v) => typeof v !== "object" ? {
      path: v
    } : v).forEach((item) => {
      if (item.path.endsWith(".js")) {
        promises.push(this.loadScript(item.path, item.options));
      } else {
        promises.push(this.loadStyle(item.path, item.options));
      }
    });
    return Promise.all(promises).then((res) => {
      this._notify.next(res);
      return Promise.resolve(res);
    });
  }
  loadScript(path, innerContent, attributes) {
    const options = typeof innerContent === "object" ? innerContent : {
      innerContent,
      attributes
    };
    return new Promise((resolve) => {
      if (this.list[path] === true) {
        resolve(__spreadProps(__spreadValues({}, this.cached[path]), {
          status: "loading"
        }));
        return;
      }
      this.list[path] = true;
      const onSuccess = (item) => {
        this.cached[path] = item;
        resolve(item);
        this._notify.next([item]);
      };
      const node = this.doc.createElement("script");
      node.type = "text/javascript";
      node.src = path;
      this.attachAttributes(node, options.attributes);
      if (options.innerContent) {
        node.innerHTML = options.innerContent;
      }
      node.onload = () => onSuccess({
        path,
        status: "ok"
      });
      node.onerror = (error) => onSuccess({
        path,
        status: "error",
        error
      });
      this.doc.getElementsByTagName("head")[0].appendChild(node);
    });
  }
  loadStyle(path, rel, innerContent, attributes) {
    const options = typeof rel === "object" ? rel : {
      rel,
      innerContent,
      attributes
    };
    return new Promise((resolve) => {
      if (this.list[path] === true) {
        resolve(this.cached[path]);
        return;
      }
      this.list[path] = true;
      const node = this.doc.createElement("link");
      node.rel = options.rel ?? "stylesheet";
      node.type = "text/css";
      node.href = path;
      this.attachAttributes(node, options.attributes);
      if (options.innerContent) {
        node.innerHTML = options.innerContent;
      }
      this.doc.getElementsByTagName("head")[0].appendChild(node);
      const item = {
        path,
        status: "ok"
      };
      this.cached[path] = item;
      resolve(item);
    });
  }
  static ɵfac = function LazyService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LazyService)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _LazyService,
    factory: _LazyService.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LazyService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
function throwError(msg, actual, expected, comparison) {
  if (typeof ngDevMode === "undefined" || ngDevMode) {
    throw new Error(`ASSERTION ERROR: ${msg}${comparison == null ? "" : ` [Expected=> ${expected} ${comparison} ${actual} <=Actual]`}`);
  }
}
function assert(expression, msg) {
  if (!expression) {
    throwError(msg);
  }
}
function assertEmpty(actual, msg) {
  if (actual == null) {
    throwError(msg, typeof actual, "NULL", "==");
  }
}
function assertNumber(actual, msg) {
  if (!(typeof actual === "number")) {
    throwError(msg, typeof actual, "number", "===");
  }
}
function assertString(actual, msg) {
  if (!(typeof actual === "string")) {
    throwError(msg, actual === null ? "null" : typeof actual, "string", "===");
  }
}
function assertArray(actual, msg) {
  if (!Array.isArray(actual)) {
    throwError(msg, actual === null ? "null" : typeof actual, "array", "===");
  }
}
function assertObservable(obj, msg) {
  if (!isObservable(obj)) {
    throwError(msg, obj === null ? "null" : typeof obj, "Observable", "===");
  }
}

export {
  deepGet,
  deepCopy,
  deepMergeKey,
  deepMerge,
  PREFIX,
  warn,
  warnDeprecation,
  log,
  LazyService,
  assert,
  assertEmpty,
  assertNumber,
  assertString,
  assertArray,
  assertObservable
};
//# sourceMappingURL=chunk-XMKNXNVX.js.map
