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
  if (!user.authAt) { //无授权
    this.$router.push({
      path: "/pages/login/index"
    });
    return false;
  }
  return true;
}


export default {
  promisify,
  checkAuth
}