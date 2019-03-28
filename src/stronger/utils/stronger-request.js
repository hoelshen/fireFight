

import flyio from "flyio/dist/npm/wx";
import { promisify } from "@/utils/index";

const environment = "test"; // 配置环境

var fly = new flyio();
var cookies = [],
  token = "";

//var isLog = false;
fly.config.baseURL = getBaseURL(environment);
fly.config.headers["Accept"] = "application/json";
fly.config.headers["Content-Type"] = "application/json; charset=utf-8";

function getBaseURL(env) {
  switch (env) {
    case "local":
      return "http://localhost:7023";
    case "test":
      return "https://api.tellers.cn/stronger_test2";
    default:
      return "https://api.tellers.cn/stronger";
  }
}

function showError(msg) {
  wx.showToast({
    title: msg,
    icon: "none",
    duration: 2000
  });
}

function normalizeUserCookie(cookiesArray) {
  let _cookies = [];
  cookiesArray = cookiesArray + "";
  (cookiesArray.match(/([\w\-.]*)=([^\s=]+);/g) || []).forEach(str => {
    _cookies.push(str);
  });
  return _cookies.join(" ");
}

function getToken(cookiesArray) {
  if (cookiesArray[0].indexOf("csrfToken") >= 0) {
    let cookies = cookiesArray[0].split(";");
    return cookies[0].replace("csrfToken=", "");
  }
  return "";
}

async function login(refer) {
  let scene = getApp().globalData.options.query.scene; // 渠道号
  let openid = getApp().globalData.mys.openid; // 渠道号
  let params = {
    refer: refer,
    scene: scene,
    openid: openid
  };
  let wxRes = await promisify(wx.login, wx)();
  params.code = wxRes.code; // 重新登陆
  let loginRes = await fly.get("/login", params);
  getApp().globalData.mys = loginRes.data.user;
  fly.unlock();
  return loginRes.data;
}

async function logLogin(loginRes, query) {
  let lauchOpts = getApp().globalData.options;
  let systemInfo = wx.getSystemInfoSync();
  let openid = loginRes.openid;
  let userId = loginRes.user ? loginRes.user._id : null;
  fly.post("/log", {
    lauchOpts,
    systemInfo,
    openid,
    userId: userId,
    query
  });
  isLog = true;
}

fly.interceptors.request.use(function(request) {
  request.headers["Cookie"] = cookies;
  request.headers["x-csrf-token"] = token;
  return request;
});

fly.interceptors.response.use(
  response => {
    if (response && response.headers && response.headers["set-cookie"]) {
      cookies = normalizeUserCookie(response.headers["set-cookie"]);
      token = getToken(response.headers["set-cookie"]);
    }
    return response.data;
  },
  err => {
    if (err.status == 502) {
      // 生产环境：服务器正在重启
      fly.unlock();
      return wx.reLaunch({
        url: "/pages/noFound/index"
      });
    }
    if (!err.response) {
      // 本地环境：服务器正在重启
      fly.unlock();
      return wx.reLaunch({
        url: "/pages/noFound/index"
      });
    }
    showError(err.response.data.message);
  }
);

fly.login = login;
fly.logLogin = logLogin;
export default fly;
