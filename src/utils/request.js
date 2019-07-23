import flyio from "flyio/dist/npm/wx";
import {
  promisify
} from "@/utils/index";

const environment = "test"; // 配置环境

const fly = new flyio();
const loginFly = new flyio();

let token = "";

fly.config.baseURL = getBaseURL(environment);
fly.config.headers["Accept"] = "application/json";
fly.config.headers["Content-Type"] = "application/json; charset=utf-8";

loginFly.config.baseURL = getBaseURL(environment);
loginFly.config.headers["Accept"] = "application/json";
loginFly.config.headers["Content-Type"] = "application/json; charset=utf-8";

function getBaseURL(env) {
  switch (env) {
    case "local":
      return "http://192.168.118.149:10701";
    case "mock":
      return "http://www.amusingcode.com:8001/mock/24/tell_v2";
    case "test":
      return "http://serpro/mobile";
    default:
      return "https://api.tellers.cn/teller-v2";
  }
}




function getUser() {
  return new Promise(function(resolve, reject) {
    fly.post("user/info").then(res => {
      // const user = res.data;
      // getApp().globalData.user = user;
      // resolve(user);
      resolve();
    }).catch(err=>{
      reject(err);
    });
  });
}

function uploadFile(path) {
  return new Promise(function (resolve, reject) {
    wx.uploadFile({
      url: getBaseURL(environment) + "/file",
      filePath: path,
      name: "img",
      header: {
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


async function login(userId) {
  // if (userId) {
  //   return (fly.config.headers["x-csrf-token"] = token = userId);
  // }
  const wxRes = await promisify(wx.login, wx)();

  // return (getApp().globalData.user = user);
}

async function getOpenid() {

  const wxRes = await promisify(wx.login, wx)();
  console.log('wxRes: ', wxRes);

  fly.post("/user/openid.html", { code: wxRes.code })
    .then(res=>{
      console.log('res',res);
      resolve(res);
    })
    .catch(err => {
      wx.hideLoading();
    });
}


fly.interceptors.request.use(async function (request) {
  // if (!token) {
  //   return fly.lock(); //登录登录完成
  // } else {
  //   fly.unlock();
  // }
  // request.headers["x-csrf-token"] = token;
  return request;
});

fly.interceptors.response.use(
  response => {
    return response.data;
  },
  async err => {
    if (err.status == 502 || err.status == 404) {
      // 生产环境：服务器正在重启
   
    } else if (!err.response) {
  
    }
    return Promise.reject(err);;
  }
);

fly.login = login;
fly.uploadFile = uploadFile;
fly.getUser = getUser;
fly.getOpenid = getOpenid;
export default fly