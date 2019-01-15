import App from "./App";
import Vue from "vue";
import VHtmlPlugin from "@megalo/vhtml-plugin";
import filters from "./utils/filters";
import megaloRouter from "megalo-router";
import request from "./utils/request";
import day from './utils/day'

Vue.use(VHtmlPlugin);

Object.keys(filters).forEach(key => Vue.filter(key, filters[key]));

Vue.use(megaloRouter, {
  mode: "strict", // strict or loose 可配置项，不配置的话默认为strict
  tabBars: [
    // 必须配置项
    "pages/mailbox/index",
    "/pages/home/index",
    "/pages/myInfo/index"
  ]
});

Vue.prototype.$request = request;
Vue.prototype.$day = day;


const app = new Vue(App);
app.$mount();

export default {
  config: {
    // pages 的首个页面会被编译成首页
    pages: [
      "pages/home/index", //首页
      "pages/mailbox/index", //信箱
      "pages/myInfo/index", //个人中心
      "pages/consultingBox/index", //咨询箱
      "pages/badge/index", //徽章
      "pages/solutionRoom/index", //解忧室
      "pages/myStory/index", //我的故事
      "pages/auth/index",  //授权
      "pages/detail/index", //详细说明
      "pages/moments/index",  //动态
      "pages/ticket/index", //票券
      "pages/welfare/index", //福利社
      "pages/memory/index", //记忆
      "pages/login/index", //登录
      "pages/nofound/index", //404
      "pages/questionsFeedback/index" //问题与反馈
    ],
    tabBar: {
      color: "#333",
      selectedColor: "#007d37",
      list: [
        {
          pagePath: "pages/mailbox/index",
          text: "邮件",
          iconPath: "static/imgs/mine.png",
          selectedIconPath: "static/imgs/mine_on.png"
        },
        {
          pagePath: "pages/home/index",
          text: "home",
          iconPath: "static/imgs/home.png",
          selectedIconPath: "static/imgs/home_on.png"
        },
        {
          pagePath: "pages/myInfo/index",
          text: "我的",
          iconPath: "static/imgs/mine.png",
          selectedIconPath: "static/imgs/mine_on.png"
        }
      ]
    },
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#fff",
      navigationBarTitleText: "tell2.0_megalo",
      navigationBarTextStyle: "black"
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
