import App from './detail.vue'
import Vue from 'vue'

const app = new Vue(App)

app.$mount()

export default {
  config: {
    navigationBarBackgroundColor: '#2E60FE',
    navigationBarTextStyle: 'black',
    navigationBarTitleText: '搜索详情',
    backgroundColor: '#FFFEFB'
  }
}