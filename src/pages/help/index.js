import Vue from 'vue'
import App from './help'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    navigationBarBackgroundColor: '#fffefb',
    navigationBarTextStyle: 'black',
    navigationBarTitleText: '愿阳光温暖你',
    backgroundColor: '#FFF7EE',
    disableScroll: true
  }
};