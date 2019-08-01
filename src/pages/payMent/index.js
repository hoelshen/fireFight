import App from './payMent'
import Vue from 'vue'

const app = new Vue(App)

app.$mount()

export default {
  config: {
    navigationBarBackgroundColor: '#1AAD19',
    navigationBarTextStyle: 'black',
    navigationBarTitleText: '停车缴费',
    navigationStyle: 'custom',
    backgroundColor: '#ffffff'
  }
}