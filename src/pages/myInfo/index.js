import App from './myInfo'
import Vue from 'vue'

const app = new Vue(App)

app.$mount()

export default {
  config: {
    navigationBarBackgroundColor: '#fffefb',
    navigationBarTextStyle: 'black',
    navigationBarTitleText: '我的',
    backgroundColor: '#F6F6F8',
    disableScroll: true,
  }
};