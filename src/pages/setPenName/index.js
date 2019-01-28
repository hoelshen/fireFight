import App from './setPenName'
import Vue from 'vue'

const app = new Vue(App)

app.$mount()

export default {
  config: {
    navigationBarBackgroundColor: '#81CBE2',
    navigationBarTextStyle: 'white',
    navigationBarTitleText: '设置笔名和头像',
    backgroundColor: '#81CBE2'
  }
}
