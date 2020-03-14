import App from './position.vue'
import Vue from 'vue'

const app = new Vue(App)

app.$mount()

export default {
  config: {
    navigationBarBackgroundColor: '#1D7FFD',
    navigationBarTextStyle: 'white',
    navigationBarTitleText: '定位选择',
    backgroundColor: '#2E60FE'
  }
}