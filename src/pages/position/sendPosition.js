import App from './sendPosition.vue'
import Vue from 'vue'

const app = new Vue(App)

app.$mount()

export default {
  config: {
    navigationBarBackgroundColor: '#1AAD19',
    navigationBarTextStyle: 'white',
    navigationBarTitleText: '发送位置',
    navigationStyle: 'custom',
    backgroundColor: '#ffffff'
  }
}