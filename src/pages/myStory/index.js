import App from './myStory'
import Vue from 'vue'

const app = new Vue(App)

app.$mount()

export default {
  config: {
    navigationBarBackgroundColor: '#fffefb',
    navigationBarTextStyle: 'black',
    navigationBarTitleText: '讲诉我的故事',
    backgroundColor: '#81CBE2'
  }
};