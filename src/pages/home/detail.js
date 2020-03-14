import App from './detail.vue'
import Vue from 'vue'

const app = new Vue(App)

app.$mount()

export default {
  config: {
    navigationBarBackgroundColor: '#1D7FFD',
    navigationBarTextStyle: 'white',
    navigationBarTitleText: '搜索详情',
    backgroundColor: '#FFFEFB'
  }
}