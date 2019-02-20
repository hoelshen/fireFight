import App from "./share";
import Vue from "vue";

const app = new Vue(App);

app.$mount();

export default {
  config: {
    navigationBarBackgroundColor: "#4D495B",
    navigationBarTextStyle: "white",
    navigationBarTitleText: "安利给好友",
    backgroundColor: "#4D495B",
    disableScroll: true
  }
};
