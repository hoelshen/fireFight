import App from "./App";
import Vue from "vue";
import VHtmlPlugin from "@megalo/vhtml-plugin";
import filters from "./utils/filters";
import megaloRouter from "megalo-router";
import request from "./utils/request";
import day from './utils/day'
import {
  checkAuth
} from './utils/index'
Vue.use(VHtmlPlugin);

Object.keys(filters).forEach(key => Vue.filter(key, filters[key]));

Vue.use(megaloRouter, {
  mode: "strict", // strict or loose 可配置项，不配置的话默认为strict
});

Vue.prototype.$request = request;
Vue.prototype.$day = day;
Vue.prototype.$checkAuth = checkAuth;

const app = new Vue(App);
app.$mount();

export default {
  config: {
    // pages 的首个页面会被编译成首页
    pages: [
      "pages/home/index", //首页
      "pages/myInfo/index", //个人中心
      "pages/mailbox/mailbox", //信箱
      "pages/mailbox/mailDay", //信箱
      "pages/consultingBox/index", //咨询箱
      "pages/badge/index", //徽章
      "pages/solutionRoom/solutionDetail", //成为解答者
      "pages/solutionRoom/solutionRoom", //解答室
      "pages/solutionRoom/solutionReply", //信件
      "pages/myStory/index", //我的故事
      "pages/setPenName/index", //设置笔名
      "pages/detail/index", //详细说明
      "pages/moments/index", //动态
      "pages/ticket/ticketDetail", //票券明细
      "pages/ticket/ticketList", //票券
      "pages/welfare/index", //福利社
      "pages/memory/index", //记忆
      "pages/login/index", //授权
      "pages/help/index", //情感援助
      "pages/stronger-home/index", // MYS首页
      "pages/stronger-mail/index", //MYS故事
      "pages/stronger-write/index", //MYS写故事
      "pages/noFound/index", //404
    ],
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#ffffff",
      navigationBarTitleText: "tell2.0_megalo",
      navigationBarTextStyle: "black",
      backgroundColor: '#ffffff'
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