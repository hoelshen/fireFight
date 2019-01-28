export function promisify(fn, self = null) {
  return function (opts = {}) {
    return new Promise((res, rej) => {
      opts.success = (...args) => res(...args);
      opts.fail = (...args) => rej(...args);
      fn.call(self, opts);
    });
  };
}

export function checkAuth(user) {
  if (!user.authAt) { //有授权
    this.$router.push({
      path: "/pages/setPenName/index"
    });
    return false;
  }
  return true;
}


export default {
  promisify,
  checkAuth
}