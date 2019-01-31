import App from './moments'
import Vue from 'vue'

const app = new Vue(App)

app.$mount()
export default {
  config: {
    navigationBarBackgroundColor: '#fffefb',
    navigationBarTextStyle: 'black',
    navigationBarTitleText: '动态',
    backgroundColor: '#FFFEFB'
  }
}