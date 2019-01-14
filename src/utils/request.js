import flyio from 'flyio/dist/npm/wx';
import {
  promisify
} from "@/utils/index";


const environment = 'test'; // 配置环境

const fly = new flyio();
let cookies = [],
  token = '';
  const tryCount = 0;
  const isLog = false;


fly.config.baseURL = getBaseURL(environment);
fly.config.headers['Accept'] = 'application/json';
fly.config.headers['Content-Type'] = 'application/json; charset=utf-8';

function getBaseURL(env) {
  switch (env) {
    case 'local':
      return 'http://192.168.118.149:10701';
    case 'mock':
      return 'http://www.amusingcode.com:8001/mock/24/tell_v2/';
    case 'test':
      return  'https://www.amusingcode.com/teller-v2';
    default:
      return 'https://api.tellers.cn/flag';
  }
}

function showError(msg) {
  wx.showToast({
    title: msg,
    icon: 'none',
    duration: 2000
  });
}

function normalizeUserCookie(cookiesArray) {
  let _cookies = [];
  cookiesArray = cookiesArray + '';
  (cookiesArray.match(/([\w\-.]*)=([^\s=]+);/g) || []).forEach((str) => {
    _cookies.push(str);
  });
  return _cookies.join(' ');
};

function getToken(cookiesArray) {
  if (cookiesArray.indexOf('csrfToken') >= 0) {
    let cookies = cookiesArray.split(';');
    return cookies[0].replace('csrfToken=', '');
  }
  return ''
}

async function login(refer) { 
  let wxRes = await promisify(wx.login, wx)();
  let logRes = await fly.get(`/login?code=${wxRes.code}`);
  fly.unlock();
  return  getApp().globalData.user = logRes.data;
}


async function checkParams(loginQuery) {
  // let shareTicket = getApp().globalData.shareTicket;
  // let options = getApp().globalData.options;
  // if (options.query.refer) 
  //   loginQuery.refer = options.query.refer;
  // }
  // if (options.query.scene) {
  //   loginQuery.scene = options.query.scene;
  // }
  // if (options.query.extendChannel){
  //   loginQuery.extendChannel = options.query.extendChannel;
  // }
  // if (shareTicket) {
  //   let shareRes = await promisify(wx.getShareInfo, wx)({
  //     shareTicket: shareTicket
  //   });
  //   loginQuery.encryptedData = shareRes.encryptedData;
  //   loginQuery.iv = shareRes.iv;
  // }
}

async function saveFormid(id) {
  // await fly.post('/user/form', {
  //   id: id
  // });
}




async function logLogin(loginRes) {
  // if (isLog){
  //   return true;
  // }
  // let options = getApp().globalData.options;
  // let query = options.query;
  // console.log("query", query)
  // let systemInfo = wx.getSystemInfoSync();
  // let openid = loginRes.openid;
  // console.log("openid", openid)
  // let userId = loginRes.user ? loginRes.user._id : null;
  // fly.post('/logger', {
  //   type: "LOGIN",
  //   lauchOpts: options,
  //   systemInfo,
  //   openid,
  //   userId: userId,
  //   query
  // });
  // isLog = true;
}


async function logClickAd(user, adId, result) {
  // let openid = user.openid;
  // let userId = user._id;
  // fly.post('/log/ad', {
  //   adId: adId,
  //   openid: openid,
  //   userId: userId,
  //   result: result
  // });
}


fly
  .interceptors
  .request
  .use(async function (request) {
    let url = request.url;
    if (url.includes('/login')) {
      fly.lock();
      return request;
    }
    request.headers["Cookie"] = cookies;
    request.headers["x-csrf-token"] = token;
    return request;
  });

fly
  .interceptors
  .response
  .use((response) => {
    if (response && response.headers && response.headers['set-cookie']) {
      cookies = normalizeUserCookie(response.headers['set-cookie']);
      token = getToken(response.headers['set-cookie'][0]);
    }
    return response.data;
  }, (err) => {
    if (err.status == 502 || err.status == 404) {
      // 生产环境：服务器正在重启
      fly.unlock();
      return showError('服务器抽风啦，请重试');
    }
    if (!err.response) {
      // 本地环境：服务器正在重启
      fly.unlock();
      return showError('服务器抽风啦，请重试');
    }
    showError(err.response.data.message);
  });

fly.login = login;
fly.logClickAd = logClickAd;
fly.saveFormid = saveFormid;
export default fly;