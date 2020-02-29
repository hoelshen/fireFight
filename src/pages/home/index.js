import App from './home'
import Vue from 'vue'

const app = new Vue(App)

app.$mount()

export default {
  config: {
    navigationBarBackgroundColor: '#fffefb',
    navigationBarTextStyle: 'black',
    navigationBarTitleText: '数据检测小程序',
    backgroundColor: '#FFFEFB',
    disableScroll: true,
  }
}