import App from './solutionDetail'
import Vue from 'vue'

const app = new Vue(App)

app.$mount()

export default {
  config: {
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTextStyle: 'black',
    navigationBarTitleText: '申请成为解答者',
    backgroundColor: '#ffffff'
  }
};