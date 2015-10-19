const DEFAULT_SEPARATOR = '_';

export default function (obj, separator) {
  return walk(obj, separator);
}

function walk(obj, separator = DEFAULT_SEPARATOR, path = []) {
  if (!isObject(obj)) {
    throw new Error('pathMirror(...): Argument must be an object.');
  }

  const ret = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (isObject(value)) {
        ret[key] = walk(value, separator, path.concat(key));
      } else {
        ret[key] = path.concat(key).join(separator);
      }
    }
  }
  return ret;
}

function isObject(obj) {
  return obj instanceof Object && !Array.isArray(obj);
}
