const DEFAULT_SEPARATOR = '_';
const DEFAULT_PREFIX = '';
const DEFAULT_SUFFIX = '';

module.exports = function (obj, options = {}) {
  // Allow backwards compatibility with 1.0.0
  if (isString(options)) {
    options = { separator: options };
  }

  return walk(obj, {
    separator: DEFAULT_SEPARATOR,
    prefix: DEFAULT_PREFIX,
    suffix: DEFAULT_SUFFIX,
    transform: key => key,
    ...options
  });
};

function walk(obj, options, path = []) {
  if (!isObject(obj)) {
    throw new Error('pathMirror(...): Argument must be an object.');
  }

  const { prefix, suffix, transform, separator } = options;

  const ret = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      const currentPath = path.concat(key);
      const exec = createExec(currentPath);
      if (isObject(value)) {
        ret[key] = walk(value, options, currentPath);
      } else {
        ret[key] = exec(prefix) + currentPath.map(transform).join(exec(separator)) + exec(suffix);
      }
    }
  }
  return ret;
}

function isObject(obj) {
  return obj instanceof Object && !Array.isArray(obj);
}

function isFunction(fn) {
  return typeof fn === 'function';
}

function isString(str) {
  return typeof str === 'string';
}

function createExec(...args) {
  return fn => isFunction(fn) ? fn(...args) : fn;
}
