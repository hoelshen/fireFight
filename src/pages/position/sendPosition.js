import App from './sendPosition.vue'
import Vue from 'vue'

const app = new Vue(App)

app.$mount()

export default {
  config: {
    navigationBarBackgroundColor: '#1D7FFD',
    navigationBarTextStyle: 'white',
    navigationBarTitleText: '发送位置',
    navigationStyle: 'custom',
    backgroundColor: '#ffffff'
  }
}