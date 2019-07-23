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
      "pages/home/index", //首页
      "pages/penName/index", //设置笔名
      "pages/welfare/index", //福利社
      "pages/addCar/index", //店铺清扫
      "pages/carManage/index", //carManage,
      "pages/webview/index", //内嵌网页
  
      "pages/errors/index" //错误页面
    ],
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#fffefb",
      navigationBarTitleText: "美停",
      navigationBarTextStyle: "black",
      backgroundColor: "#fffefb"
    },
    navigateToMiniProgramAppIdList: [
      "wxa7053e55658fc6f3", // 晓析心理评测
      "wx52504c3e7b919aee", // 芝麻说说
      "wx42d12a5790960727", // 十一光年
      "wxfe8c23f10384aed8", // 全民派乐
      "wx1a345f06686eb283", // 财智阅读
      "wxef889a07b9e2ed4a", // 天天遛猫
      "wx202b5ab43b47f616", // 校品会
      "wx7ae14e1cef6c33d4", // 好物省钱
      "wxb4529fa3b645fa62" // 打脸星人
    ]
  }
};