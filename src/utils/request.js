import flyio from "flyio/dist/npm/wx";

import {
  promisify
} from "@/utils/index";

const environment = "test"; // 配置环境

const fly = new flyio();
const loginFly = new flyio();

let tokenCode = "",
  tokenInfo = "";

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
      return "https://mt.xmpush.com/mobile/";
    default:
      return "https://api.tellers.cn/teller-v2";
  }
}




function getUser() {
  return new Promise(function (resolve, reject) {
    fly.post("user/info.html").then(res => {
      resolve(res.result);
    }).catch(err => {
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

async function getOpenid() {
  const wxRes = await promisify(wx.login, wx)();
  return fly.post("/user/openid.html", {
      code: wxRes.code
    })
    .then(res => {
      return res;
    })
    .catch(err => {
      wx.hideLoading();
    });
}

async function login(data) {
  getApp().globalData.user = data.userInfo;
  let openid = "";
  let portrait = "";
  let nickname = "";
  let lat = "";
  let lng = "";
  const res = await promisify(wx.getLocation, wx)({
    type: 'wgs84',
  });
  lat = (res.latitude).toFixed(2).toString() // 纬度
  lng = (res.longitude).toFixed(2).toString() // 经度

  openid = getApp().globalData.openid;
  portrait = data.userInfo.avatarUrl
  nickname = data.userInfo.nickName
  fly.post("/user/login.html", {
      openid,
      portrait,
      nickname,
      lat,
      lng
    })
    .then(res => {
      fly.config.headers["tokenCode"] = tokenCode = res.result.tokenCode;
      fly.config.headers["tokenInfo"] = tokenInfo = res.result.tokenInfo;

      wx.setStorage({
        key: 'tokenCode',
        data: tokenCode
      })
      wx.setStorage({
        key: 'tokenInfo',
        data: tokenInfo
      })

      fly.post('/indexitems.html').then(res2=>{
        console.log('res2: ', res2);
        if(res2 && res2.result){
          getApp().globalData.cars = res2.result.items;
          console.log('wx.event', wx.event.emit());
          wx.event.emit('testFunc',res2.result.items)
        }
      });

      return getApp().globalData.user = res.result;
    })
    .catch(err => {
      wx.hideLoading();
    });
}



fly.interceptors.request.use(async function (request) {
  request.headers["tokenCode"] = tokenCode = wx.getStorageSync('tokenCode') //永久保存用户账号

  request.headers["tokenInfo"] = tokenInfo = wx.getStorageSync('tokenInfo') //永久保存用户账号

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