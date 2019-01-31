import App from './noFound'
import Vue from 'vue'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    navigationBarBackgroundColor: '#FFFEFB',
    navigationBarTextStyle: 'white',
    navigationBarTitleText: '邮差迷路了',
    backgroundColor: '#FFFEFB'
  }
};