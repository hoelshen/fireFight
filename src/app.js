import App from "./App";
import Vue from "vue";
import VHtmlPlugin from "@megalo/vhtml-plugin";
import filters from "./utils/filters";
import megaloRouter from "megalo-router";
import request from "./utils/request";
import day from "./utils/day";

Vue.use(VHtmlPlugin);
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]));

Vue.use(megaloRouter, {
  mode: "strict" // strict or loose 可配置项，不配置的话默认为strict
});

Vue.prototype.$request = request;
Vue.prototype.$day = day;

const app = new Vue(App);
app.$mount();

export default {
  config: {
    cloud: true,
    pages: [
      "pages/login/index", //登陆,
      "pages/alarmpage/index",  //设备告警
      "pages/dataDetail/index",  //数据详情
      "pages/equipmentlist/index",  //设备列表
      "pages/monitorpage/index", //查看监控
      "pages/information/index", //确定信息
      "pages/detection/index", //数据检测
      "pages/home/index", // 首页
      "pages/info/index", //  个人信息  
      "pages/position/index", // 定位选择
      "pages/position/sendPosition", // 发送位置
      "pages/examine/index", //消防检测
      "pages/errors/index", //错误页面,
    ],
    "permission": {
      "scope.userLocation": {
        "desc": "你的位置信息将用于小程序的位置展示"
      }
    },
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#fffefb",
      navigationBarTitleText: "消防检测",
      navigationBarTextStyle: "black",
      backgroundColor: "#fffefb"
    },
    navigateToMiniProgramAppIdList: [
      "wx70677f7a3878565b",  //签约小程序
      "wx70677f7a3878565b"   //微信代付 用户还款小程序 商户号
    ]
  }
};