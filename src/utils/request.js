import flyio from "flyio/dist/npm/wx";
import {
  promisify
} from "@/utils/index";

const environment = "test"; // 配置环境

const fly = new flyio();
let cookies = [],
  token = "";
const tryCount = 0;
const isLog = false;

fly.config.baseURL = getBaseURL(environment);
fly.config.headers["Accept"] = "application/json";
fly.config.headers["Content-Type"] = "application/json; charset=utf-8";

function getBaseURL(env) {
  switch (env) {
    case "local":
      return "http://192.168.118.149:10701";
    case "mock":
      return "http://www.amusingcode.com:8001/mock/24/tell_v2";
    case "test":
      return "https://www.amusingcode.com/teller-v2";
    default:
      return "https://api.tellers.cn/flag";
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
  if (cookiesArray.indexOf("csrfToken") >= 0) {
    let cookies = cookiesArray.split(";");
    return cookies[0].replace("csrfToken=", "");
  }
  return "";
}

async function login() {
  let wxRes = await promisify(wx.login, wx)();
  fly.get(`/login?code=${wxRes.code}`).then(logRes => {
    fly.unlock();
    return (getApp().globalData.user = logRes.data);
  });
  fly.lock();
}

function uploadFile(path) {
  return new Promise(function (resolve, reject) {
    wx.uploadFile({
      url: getBaseURL(environment) + "/file",
      filePath: path,
      name: "img",
      header: {
        Cookie: cookies,
        "x-csrf-token": token
      },
      success: function (res) {
        typeof resolve == "function" && resolve(res);
      },
      fail: function (err) {
        typeof reject == "function" && reject(err);
      }
    });
  });
}

async function checkParams(loginQuery) {}

async function saveFormid(id) {}

async function logLogin(loginRes) {}

fly.interceptors.request.use(async function (request) {
  request.headers["Cookie"] = cookies;
  request.headers["x-csrf-token"] = token;
  return request;
});

fly.interceptors.response.use(
  response => {
    if (response && response.headers && response.headers["set-cookie"]) {
      cookies = normalizeUserCookie(response.headers["set-cookie"]);
      token = getToken(response.headers["set-cookie"][0]);
    }
    return response.data;
  },
  err => {
    if (err.status == 502 || err.status == 404) {
      // 生产环境：服务器正在重启
      return showError("服务器抽风啦，请重试");
    }
    if (!err.response) {
      // 本地环境：服务器正在重启
      return showError("服务器抽风啦，请重试");
    }
    showError(err.response.data.message);
  }
);

fly.login = login;
fly.saveFormid = saveFormid;
fly.uploadFile = uploadFile;
export default fly;