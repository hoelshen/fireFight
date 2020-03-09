import App from './home'
import Vue from 'vue'

const app = new Vue(App)

app.$mount()

export default {
  config: {
    navigationBarBackgroundColor: '#2E60FE',
    navigationBarTextStyle: 'white',
    navigationBarTitleText: '数据检测小程序',
    backgroundColor: '#FFFEFB',
  }
}