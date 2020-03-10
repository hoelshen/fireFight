import App from './info'
import Vue from 'vue'

const app = new Vue(App)

app.$mount()

export default {
  config: {
    navigationBarBackgroundColor: '#2E60FE',
    navigationBarTextStyle: 'black',
    navigationBarTitleText: '个人信息',
    backgroundColor: '#FFFEFB'
  }
}