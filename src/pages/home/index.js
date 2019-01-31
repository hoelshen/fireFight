import App from './home'
import Vue from 'vue'

const app = new Vue(App)

app.$mount()

export default {
  config: {
    navigationBarBackgroundColor: '#fffefb',
    navigationBarTextStyle: 'black',
    navigationBarTitleText: 'Tell',
    backgroundColor: '#FFFEFB',
    disableScroll: true
  }
}