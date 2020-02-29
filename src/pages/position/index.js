import App from './position.vue'
import Vue from 'vue'

const app = new Vue(App)

app.$mount()

export default {
  config: {
    navigationBarBackgroundColor: '#1AAD19',
    navigationBarTextStyle: 'black',
    navigationBarTitleText: '定位选择',
    navigationStyle: 'custom',
    backgroundColor: '#ffffff'
  }
}