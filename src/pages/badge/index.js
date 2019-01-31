import App from './badge'
import Vue from 'vue'

const app = new Vue(App)

app.$mount()
export default {
  config: {
    navigationBarBackgroundColor: '#fffefb',
    navigationBarTextStyle: 'black',
    navigationBarTitleText: '徽章',
    backgroundColor: '#FFFEFB'
  }
}