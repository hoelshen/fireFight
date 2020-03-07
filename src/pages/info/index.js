import App from './info'
import Vue from 'vue'

const app = new Vue(App)

app.$mount()

export default {
  config: {
    navigationBarBackgroundColor: '#fffefb',
    navigationBarTextStyle: 'black',
    navigationBarTitleText: '个人信息',
    backgroundColor: '#FFFEFB',
    disableScroll: true,
    navigationStyle: 'custom'
  }
}