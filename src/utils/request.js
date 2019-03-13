import flyio from "flyio/dist/npm/wx";
import { promisify } from "@/utils/index";

const environment = "test"; // 配置环境

const fly = new flyio();
const loginFly = new flyio();

let token = ""

fly.config.baseURL = getBaseURL(environment);
fly.config.headers["Accept"] = "application/json";
fly.config.headers["Content-Type"] = "application/json; charset=utf-8";

Fly.config.baseURL = getBaseURL(environment);
Fly.config.headers["Accept"] = "application/json";
Fly.config.headers["Content-Type"] = "application/json; charset=utf-8";

function getBaseURL(env) {
  switch (env) {
    case "local":
      return "http://192.168.118.149:10701";
    case "mock":
      return "http://www.amusingcode.com:8001/mock/24/tell_v2";
    case "test":
      return "https://www.amusingcode.com/teller-v2";
    default:
      return "https://api.tellers.cn/teller-v2";
  }
}

function showError(message, status, request) {
  wx.showToast({
    title: message,
    icon: "none",
    duration: 2000
  });
  sendBackErrorToCloud(message, status, request);
}

function sendBackErrorToCloud(message, status, request) {
  if (!request) {
    return false;
  }
  if (!wx.cloud) {
    return false;
  }
  wx.cloud.init();
  const systemInfo = wx.getSystemInfoSync();
  const lauchOpts = getApp().globalData.options;
  const userId = getApp().globalData.user._id;
  const db = wx.cloud.database({
    env: environment == "prod" ? "tell-prod" : "tell-dev-2019"
  });
  const data = {
    systemInfo: systemInfo,
    lauchOpts: lauchOpts,
    requestName: request.url,
    method: request.method,
    params: request.params,
    body: request.body,
    status,
    userId,
    message,
    createdAt: Date()
  };
  db.collection("back-errors").add({ data });
}

function sendFrontErrorToCloud(error) {
  if (!wx.cloud) {
    return false;
  }
  const systemInfo = wx.getSystemInfoSync();
  const userId = getApp().globalData.user._id;
  const db = wx.cloud.database({
    env: environment == "prod" ? "tell-prod" : "tell-dev-2019"
  });
  const data = {
    systemInfo: systemInfo,
    userId,
    error,
    createdAt: Date()
  };
  db.collection("front-errors").add({ data });
}

async function logLogin() {
  setTimeout(function(){
    const lauchOpts = getApp().globalData.options;
    const systemInfo = wx.getSystemInfoSync();
    fly.put("/record/login", {
      lauchOpts,
      systemInfo
    });
  },500)
}

//getUser
function getUser() {
  return new Promise(function(resolve, reject) {
    fly.get("/user").then(res => {
      const user = res.data;
      getApp().globalData.user = user;
      resolve(user);
    });
  });
}

// upload
function uploadFile(path) {
  return new Promise(function(resolve, reject) {
    wx.uploadFile({
      url: getBaseURL(environment) + "/file",
      filePath: path,
      name: "img",
      header: {
        "x-csrf-token": token
      },
      success: function(res) {
        typeof resolve == "function" && resolve(res);
      },
      fail: function(err) {
        showError("上传头像失败", 500, {});
        typeof reject == "function" && reject(err);
      }
    });
  });
}

async function saveFormid(formId) {
  fly.put("/record/form", {
    formId
  });
}

//login
async function login(userId) {
  if (userId) {
    token = userId;
    logLogin(); // 上报登陆信息
    return fly.config.headers["x-csrf-token"] = userId;
  }
  let wxRes = await promisify(wx.login, wx)();
  let loginUrl = `/login?code=${wxRes.code}`;
  let query = getApp().globalData.options.query;
  if (query.scene) {
    loginUrl += `&scene=${query.scene}`;
  } else if (query.refer) {
    loginUrl += `&refer=${query.refer}`;
  }
  let logRes = await loginFly.get(loginUrl);
  logLogin(); // 上报登陆信息

  token = logRes.data.data._id;
  fly.config.headers["x-csrf-token"] = token;
  wx.setStorage({
    key: 'token',
    data: token
  })
  return (getApp().globalData.user = logRes.data);
}

fly.interceptors.request.use(async function(request) {
  if(!token){
    console.log('token: ', token);
      fly.lock();
      await login();
      fly.unlock(); 
      request.headers["x-csrf-token"] = token;
      return request;
  }
  request.headers["x-csrf-token"] = token;
  return request;
});

fly.interceptors.response.use(
  response => {
    return response.data;
  },
  async err => {
    if (err.status == 502 || err.status == 404) {
      showError("服务器抽风啦，请稍后重试", err.status, err.request); // 生产环境：服务器正在重启
      wx.reLaunch({
        url: "/pages/noFound/index"
      });
    } else if (!err.response) {
      showError("服务器抽风啦，请稍后重试", err.status, err.request); // 本地环境：服务器正在重启
      wx.reLaunch({
        url: "/pages/noFound/index"
      });
    } else {
      showError(err.response.data.message, err.status);
    }
    return {};
  }
);

fly.login = login;
fly.saveFormid = saveFormid;
fly.uploadFile = uploadFile;
fly.getUser = getUser;
fly.sendFrontErrorToCloud = sendFrontErrorToCloud;
export default fly;
