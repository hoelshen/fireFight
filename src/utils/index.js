export function promisify(fn, self = null) {
  return function (opts = {}) {
    return new Promise((res, rej) => {
      opts.success = (...args) => res(...args);
      opts.fail = (...args) => rej(...args);
      fn.call(self, opts);
    });
  };
}

export default {
  promisify,
}
