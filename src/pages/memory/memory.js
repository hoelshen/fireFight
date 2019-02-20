import App from './memory'
import Vue from 'vue'

const app = new Vue(App)

app.$mount()

export default {
  config: {
    navigationBarBackgroundColor: '#fffefb',
    navigationBarTextStyle: 'black',
    navigationBarTitleText: '记忆',
    backgroundColor: '#FFFEFB',
    disableScroll: true
  }
};