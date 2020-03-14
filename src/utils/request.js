import flyio from "flyio/dist/npm/wx";
import Qs from 'qs'
import myEvent from './event';
import {
  promisify,
  objKeySort,
  ObjectToString
} from "@/utils/index";
import mdUtils from "@/utils/md5";

const environment = "prod"; // 配置环境
wx.myEvent = myEvent;
const fly = new flyio();

fly.config.baseURL = getBaseURL(environment);
fly.config.headers["Accept"] = "application/json";
fly.config.headers["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8"; 
// fly.config.headers["Content-Type"] = "application/json; charset=UTF-8";


function getBaseURL(env) {
  switch (env) {
    case "prod":
      return "http://121.36.15.94:8282/IntelligentFire";
      default :
        return "http://192.168.118.149:10701";
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
      url: getBaseURL(environment) + "/video/upload.do",
      header:{
        'content-type':'multipart/form-data',
        'accept': 'application/json'
      },
      filePath: path,
      name: "file",
      formData: {
        'file': path
      },
      success: function (res) {
        console.log(res)
        typeof resolve == "function" && resolve(res);
      },
      fail: function (err) {
        typeof reject == "function" && reject(err);
      }
    });
  });
}

fly.interceptors.request.use(async function (request) {
  // qs参数
  if (request.body) {
    if(request.body.isJson) {
      request.headers["Content-Type"] = "application/json; charset=UTF-8";
      delete request.body.isJson
    } else {
      request.body['timestamp'] = new Date().getTime()
      request.body['sign'] = mdUtils.MD5(`${ObjectToString(objKeySort(request.body))}&key=3ux94uu9y5SoihjK1BLxZbTOn5dpTAEc`)
      request.body = Qs.stringify(request.body);
    }
    
  }

  return request;
});

fly.interceptors.response.use(
  
  response => {
    return response.data;
  },
  async err => {
    if (err.status == 502 || err.status == 404) {
      // 生产环境：服务器正在重启
    }
    return Promise.reject(err);;
  }
);

fly.uploadFile = uploadFile;
fly.getUser = getUser;
export default fly