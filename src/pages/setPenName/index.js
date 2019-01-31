import App from './setPenName'
import Vue from 'vue'

const app = new Vue(App)

app.$mount()

export default {
  config: {
    navigationBarBackgroundColor: '#fffefb',
    navigationBarTextStyle: 'black',
    navigationBarTitleText: '设置笔名和头像',
    backgroundColor: '#FFFEFB'
  }
}