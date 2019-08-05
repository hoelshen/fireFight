import App from './paySuccess'
import Vue from 'vue'

const app = new Vue(App)

app.$mount()

export default {
  config: {
    navigationBarBackgroundColor: '#1AAD19',
    navigationBarTextStyle: 'black',
    navigationBarTitleText: '美停',
    navigationStyle: 'custom',
    backgroundColor: '#ffffff'
  }
}