import App from './info'
import Vue from 'vue'

const app = new Vue(App)

app.$mount()

export default {
  config: {
    navigationBarBackgroundColor: '#fffefb',
    navigationBarTextStyle: 'black',
    navigationBarTitleText: '消防检测',
    backgroundColor: '#FFFEFB',
    disableScroll: true,
    navigationStyle: 'custom'
  }
}