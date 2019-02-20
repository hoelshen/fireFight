import App from "./receive";
import Vue from "vue";

const app = new Vue(App);

app.$mount();

export default {
  config: {
    navigationBarBackgroundColor: "#4D495B",
    navigationBarTextStyle: "white",
    navigationBarTitleText: "送你一张解忧券",
    backgroundColor: "#4D495B",
    disableScroll: true
  }
};
