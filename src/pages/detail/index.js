import App from './detail'
import Vue from 'vue'

const app = new Vue(App)

app.$mount()
export default {
  config: {
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTextStyle: 'black',
    navigationBarTitleText: '烦恼咨询服务说明',
    backgroundColor: '#ffffff'
  }
}