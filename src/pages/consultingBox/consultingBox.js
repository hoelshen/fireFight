import App from './consultingBox'
import Vue from 'vue'

const app = new Vue(App)

app.$mount()

export default {
  config: {
    navigationBarBackgroundColor: '#fffefb',
    navigationBarTextStyle: 'black',
    navigationBarTitleText: '咨询箱',
    backgroundColor: '#FFFEFB'
  }
}